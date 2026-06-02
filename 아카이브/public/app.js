/**
 * 일지보고서 생성 서비스 - 클라이언트 애플리케이션
 */

// ─── 상태 ───
let currentLat = null;
let currentLng = null;
let currentAddress = '';
let records = [];
let deferredPrompt = null;


// ─── DOM 요소 ───
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
    headerTime: $('#headerTime'),
    currentAddress: $('#currentAddress'),
    currentCoords: $('#currentCoords'),
    currentTime: $('#currentTime'),
    currentDate: $('#currentDate'),
    btnRefreshLocation: $('#btnRefreshLocation'),
    btnUseCurrentTime: $('#btnUseCurrentTime'),
    btnAddRecord: $('#btnAddRecord'),
    btnGenerate: $('#btnGenerate'),
    recordForm: $('#recordForm'),
    startTime: $('#startTime'),
    endTime: $('#endTime'),
    activity: $('#activity'),
    addressInput: $('#addressInput'),
    note: $('#note'),
    latitude: $('#latitude'),
    longitude: $('#longitude'),
    recordsBody: $('#recordsBody'),
    recordCount: $('#recordCount'),
    emptyState: $('#emptyState'),
    selectAll: $('#selectAll'),
    selectAllHead: $('#selectAllHead'),
    authorName: $('#authorName'),
    toastContainer: $('#toastContainer'),
    // 퀵 입력 버튼
    btnStartTimeNow: $('#btnStartTimeNow'),
    btnEndTimeNow: $('#btnEndTimeNow'),
    btnRefreshFormLocation: $('#btnRefreshFormLocation'),
    // 모바일/PWA 요소
    mobileNavItems: $$('.mobile-nav-item'),
    sections: $$('.main > section'),
    installBanner: $('#installBanner'),
    installBtn: $('#installBtn'),
    installDismiss: $('#installDismiss')
};

// ─── 초기화 ───
document.addEventListener('DOMContentLoaded', () => {
    startClock();
    getLocation();
    loadRecords();
    bindEvents();
    initPWA();
    initMobileNav();
});

// ─── 시간 ───
function startClock() {
    const update = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ko-KR', { hour12: false });
        const dateStr = now.toLocaleDateString('ko-KR', {
            year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
        });

        dom.currentTime.textContent = timeStr;
        dom.currentDate.textContent = dateStr;
        dom.headerTime.textContent = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${timeStr}`;
    };
    update();
    setInterval(update, 1000);
}

// ─── 위치 ───
function getLocation() {
    dom.currentAddress.innerHTML = '<span class="loading-pulse">위치를 확인하는 중...</span>';

    if (!navigator.geolocation) {
        dom.currentAddress.textContent = '이 브라우저는 위치 서비스를 지원하지 않습니다.';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            currentLat = pos.coords.latitude;
            currentLng = pos.coords.longitude;
            dom.currentCoords.textContent = `위도: ${currentLat.toFixed(6)} / 경도: ${currentLng.toFixed(6)}`;
            dom.latitude.value = currentLat;
            dom.longitude.value = currentLng;

            // 역지오코딩
            await reverseGeocode(currentLat, currentLng);
        },
        (err) => {
            console.warn('위치 오류:', err);
            dom.currentAddress.textContent = '위치를 가져올 수 없습니다. 위치 권한을 확인해주세요.';
            dom.currentCoords.textContent = `오류: ${err.message}`;
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
}

async function reverseGeocode(lat, lng) {
    try {
        const resp = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ko&zoom=18`,
            { headers: { 'User-Agent': 'LocationReportService/1.0' } }
        );
        const data = await resp.json();

        if (data && data.display_name) {
            // 한국 주소 구성
            const addr = data.address || {};
            let parts = [];

            if (addr.province || addr.state) parts.push(addr.province || addr.state);
            if (addr.city || addr.county) parts.push(addr.city || addr.county);
            if (addr.borough || addr.suburb || addr.town || addr.village) {
                parts.push(addr.borough || addr.suburb || addr.town || addr.village);
            }
            if (addr.quarter || addr.neighbourhood) parts.push(addr.quarter || addr.neighbourhood);
            if (addr.road) parts.push(addr.road);

            currentAddress = parts.length > 0 ? parts.join(' ') : data.display_name;
            dom.currentAddress.textContent = currentAddress;
            dom.addressInput.value = currentAddress;
        } else {
            currentAddress = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
            dom.currentAddress.textContent = currentAddress;
            dom.addressInput.value = currentAddress;
        }
    } catch (err) {
        console.warn('역지오코딩 오류:', err);
        currentAddress = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        dom.currentAddress.textContent = currentAddress;
        dom.addressInput.value = currentAddress;
    }
}

// ─── 이벤트 바인딩 ───
function bindEvents() {
    dom.btnRefreshLocation.addEventListener('click', getLocation);
    dom.btnUseCurrentTime.addEventListener('click', useCurrentTime);
    dom.recordForm.addEventListener('submit', addRecord);
    dom.btnGenerate.addEventListener('click', generateReport);

    dom.selectAll.addEventListener('change', toggleSelectAll);
    dom.selectAllHead.addEventListener('change', toggleSelectAll);

    // 퀵 입력 이벤트
    dom.btnStartTimeNow.addEventListener('click', () => setTimeNow('startTime'));
    dom.btnEndTimeNow.addEventListener('click', () => setTimeNow('endTime'));
    dom.btnRefreshFormLocation.addEventListener('click', getLocation);
}

/**
 * 헬퍼: 현재 시각을 input(datetime-local)에 세팅
 */
function setTimeNow(inputId) {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60 * 1000);
    const str = local.toISOString().slice(0, 16);
    $(`#${inputId}`).value = str;

    const label = inputId === 'startTime' ? '시작' : '종료';
    showToast(`${label} 시각이 현재로 설정되었습니다.`, 'info');
}

function useCurrentTime() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60 * 1000);
    const str = local.toISOString().slice(0, 16);

    dom.startTime.value = str;

    // 종료 시각은 1시간 후
    const end = new Date(now.getTime() - offset * 60 * 1000 + 3600000);
    dom.endTime.value = end.toISOString().slice(0, 16);

    showToast('현재 시각이 입력되었습니다.', 'info');
}

// ─── 기록 CRUD ───
async function loadRecords() {
    try {
        const resp = await fetch('/api/records');
        const data = await resp.json();
        if (data.success) {
            records = data.records;
            renderRecords();
        }
    } catch (err) {
        console.error('기록 조회 오류:', err);
    }
}

async function addRecord(e) {
    e.preventDefault();

    if (!dom.latitude.value || !dom.longitude.value) {
        showToast('위치 정보가 없습니다. 위치 권한을 확인해주세요.', 'error');
        return;
    }

    const body = {
        latitude: dom.latitude.value,
        longitude: dom.longitude.value,
        address: dom.addressInput.value,
        startTime: new Date(dom.startTime.value).toISOString(),
        endTime: new Date(dom.endTime.value).toISOString(),
        activity: dom.activity.value,
        note: dom.note.value
    };

    try {
        const resp = await fetch('/api/records', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await resp.json();

        if (data.success) {
            records.push(data.record);
            renderRecords();
            dom.recordForm.reset();
            dom.addressInput.value = currentAddress;
            dom.latitude.value = currentLat;
            dom.longitude.value = currentLng;
            showToast('활동 기록이 추가되었습니다.', 'success');
        } else {
            showToast(data.error, 'error');
        }
    } catch (err) {
        showToast('기록 추가에 실패했습니다.', 'error');
    }
}

async function deleteRecord(id) {
    if (!confirm('이 기록을 삭제하시겠습니까?')) return;

    try {
        const resp = await fetch(`/api/records/${id}`, { method: 'DELETE' });
        const data = await resp.json();

        if (data.success) {
            records = records.filter(r => r.id !== id);
            renderRecords();
            showToast('기록이 삭제되었습니다.', 'success');
        } else {
            showToast(data.error, 'error');
        }
    } catch (err) {
        showToast('삭제에 실패했습니다.', 'error');
    }
}

function renderRecords() {
    const tbody = dom.recordsBody;
    tbody.innerHTML = '';

    if (records.length === 0) {
        dom.emptyState.classList.add('show');
        dom.recordCount.textContent = '0건';
        document.querySelector('.records-table-wrapper').style.borderColor = 'transparent';
        return;
    }

    dom.emptyState.classList.remove('show');
    document.querySelector('.records-table-wrapper').style.borderColor = '';
    dom.recordCount.textContent = `${records.length}건`;

    // 시간순 정렬
    const sorted = [...records].sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    sorted.forEach(r => {
        const tr = document.createElement('tr');
        tr.dataset.id = r.id;

        const startDate = new Date(r.startTime);
        const endDate = new Date(r.endTime);
        const dateStr = `${startDate.getFullYear()}.${String(startDate.getMonth() + 1).padStart(2, '0')}.${String(startDate.getDate()).padStart(2, '0')}`;
        const timeStr = `${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')} ~ ${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
        const location = r.address || `${r.latitude.toFixed(4)}, ${r.longitude.toFixed(4)}`;

        tr.innerHTML = `
      <td class="col-check"><input type="checkbox" class="record-check" data-id="${r.id}" checked></td>
      <td>${dateStr}</td>
      <td>${timeStr}</td>
      <td>${escapeHtml(location)}</td>
      <td>${escapeHtml(r.activity)}</td>
      <td>${escapeHtml(r.note || '-')}</td>
      <td class="col-action">
        <button class="btn-delete" onclick="deleteRecord('${r.id}')" title="삭제">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </td>
    `;

        tbody.appendChild(tr);
    });
}

// ─── 전체 선택 ───
function toggleSelectAll(e) {
    const checked = e.target.checked;
    $$('.record-check').forEach(cb => cb.checked = checked);
    dom.selectAll.checked = checked;
    dom.selectAllHead.checked = checked;
}

// ─── 보고서 생성 ───
async function generateReport() {
    const checkedBoxes = $$('.record-check:checked');
    const selectedIds = Array.from(checkedBoxes).map(cb => cb.dataset.id);

    if (selectedIds.length === 0) {
        showToast('보고서에 포함할 기록을 선택해주세요.', 'error');
        return;
    }

    dom.btnGenerate.disabled = true;
    dom.btnGenerate.innerHTML = `
    <svg class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
    </svg>
    보고서 생성 중...
  `;

    try {
        const resp = await fetch('/api/generate-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recordIds: selectedIds,
                authorName: dom.authorName.value
            })
        });

        if (!resp.ok) {
            const errData = await resp.json();
            throw new Error(errData.error || '보고서 생성 실패');
        }

        // 파일 다운로드
        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        // Content-Disposition에서 파일명 추출
        const disposition = resp.headers.get('Content-Disposition');
        let filename = '일지보고서.hwpx';
        if (disposition) {
            const match = disposition.match(/filename\*=UTF-8''(.+)/);
            if (match) filename = decodeURIComponent(match[1]);
        }

        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        const serverPath = resp.headers.get('X-Report-Path');
        let successMsg = `보고서가 생성되었습니다: ${filename}`;
        if (serverPath) {
            const decodedPath = decodeURIComponent(serverPath);
            successMsg += `\n(프로젝트 내 reports 폴더에도 저장되었습니다)`;
            console.log(`서버 저장 경로: ${decodedPath}`);
        }
        showToast(successMsg, 'success');
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        dom.btnGenerate.disabled = false;
        dom.btnGenerate.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14,2 14,8 20,8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
      한글파일(.hwpx) 보고서 생성 및 다운로드
    `;
    }
}

// ─── 유틸리티 ───
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    toast.innerHTML = `<span>${icons[type] || ''}</span> ${escapeHtml(message)}`;
    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3500);
}
// ─── 모바일 네비게이션 ───
function initMobileNav() {
    // 모바일인 경우 첫 번째 섹션만 표시
    if (window.innerWidth <= 768) {
        dom.sections.forEach((s, i) => {
            if (i === 0) s.classList.add('active-section');
            else s.classList.remove('active-section');
        });
    }

    dom.mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');

            // 버튼 활성화 상태 변경
            dom.mobileNavItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // 섹션 변경
            dom.sections.forEach(section => {
                if (section.classList.contains(target)) {
                    section.classList.add('active-section');
                } else {
                    section.classList.remove('active-section');
                }
            });

            // 상단으로 스크롤
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// ─── PWA ───
function initPWA() {
    // 서비스 워커 등록
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('ServiceWorker registered'))
                .catch(err => console.log('ServiceWorker registration failed', err));
        });
    }

    // 설치 프롬프트 처리
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // 10초 후에 설치 배너 표시 (사용자 경험 고려)
        if (!localStorage.getItem('pwa_dismissed')) {
            setTimeout(() => {
                dom.installBanner.classList.add('show');
            }, 5000);
        }
    });

    dom.installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;

        dom.installBanner.classList.remove('show');
        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
    });

    dom.installDismiss.addEventListener('click', () => {
        dom.installBanner.classList.remove('show');
        localStorage.setItem('pwa_dismissed', 'true');
    });
}
