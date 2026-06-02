/**
 * PatrolLog AI - 순찰로그 AI
 * 해양경찰청 순찰 업무 지원 모바일 SPA
 */

// ═══════════════════════════════════════════
// GLOBAL STATE
// ═══════════════════════════════════════════
const State = {
    currentScreen: 'splash',
    selectedDate: { year: 2026, month: 5, day: 1 }, // Default June 1, 2026
    selectedYear: 2026,
    selectedMonth: 5, // June (0-indexed is 5)
    selectedMembers: [1, 2], // Default select 김민준(1), 박서연(2) like Image 2
    selectedPatrolType: '해안', // Default patrol type
    selectedCourse: '',
    selectedZones: [], // Selected zone codes, e.g. ['A', 'B', 'C']
    currentPatrol: null,
    patrolStarted: false,
    patrolPoints: [],
    currentZoneIdx: 0, // Active zone index during patrol progress
    patrolMap: null,
    patrolEndMap: null,
    watchId: null,
    currentLat: null,
    currentLng: null,
    elapsedSeconds: 8, // Start at 8 seconds for mockup high-fidelity
    timerInterval: null,
    showAllHistory: false, // For toggle show-all history list
    allPatrolsCached: []   // Saved patrols database cache
};

// ─── Demo Data ───
const DEMO_MEMBERS = [
    { id: 1, rank: '경사', name: '김민준' },
    { id: 2, rank: '순경', name: '박서연' },
    { id: 3, rank: '경장', name: '이지훈' },
    { id: 4, rank: '순경', name: '최수아' },
    { id: 5, rank: '경위', name: '정현우' }
];

const DEMO_ZONES = [
    { code: 'A', name: 'A구역', detail: '인항파출소 및 전용부두', lat: 37.4579, lng: 126.5986 },
    { code: 'B', name: 'B구역', detail: '연안부두 및 터미널', lat: 37.4536, lng: 126.5982 },
    { code: 'C', name: 'C구역', detail: '월미도 및 월미산책로', lat: 37.4720, lng: 126.5960 },
    { code: 'D', name: 'D구역', detail: '북성포구 및 만석부두', lat: 37.4810, lng: 126.6080 },
    { code: 'E', name: 'E구역', detail: '화수부두 및 인천내항', lat: 37.4870, lng: 126.6210 },
    { code: 'F', name: 'F구역', detail: '석탄부두 및 남항부두', lat: 37.4420, lng: 126.6020 },
    { code: 'G', name: 'G구역', detail: '국제여객터미널 및 송도', lat: 37.4260, lng: 126.5990 },
    { code: 'H', name: 'H구역', detail: '영종대교 및 물치도', lat: 37.5450, lng: 126.5980 },
    { code: 'I', name: 'I구역', detail: '인천대교 및 크루즈부두', lat: 37.4100, lng: 126.5500 }
];

// Course mapping to Zone codes
const COURSE_ZONES = {
    '해상1코스': ['A', 'C', 'D', 'E', 'H'],
    '해상2코스': ['A', 'B', 'F', 'G'],
    '해안1코스': ['A', 'C', 'D', 'E'],
    '해안2코스': ['A', 'B', 'F', 'G'],
    '해안3코스': ['A', 'B'],
    '순찰정 1코스': ['A', 'B'],
    '순찰정 2코스': ['A', 'F'],
    '순찰정 3코스': ['A', 'C', 'D', 'E', 'H'],
    '순찰정 4코스': ['A', 'C', 'H'],
    '순찰정 5코스': ['A', 'F', 'I'],
    '도보 1코스': ['A', 'B'],
    '도보 2코스': ['A', 'B']
};

const COURSE_POINTS = {
    '해상1코스': [
        { name: '전용부두 (인항파출소)', lat: 37.4579, lng: 126.5986 },
        { name: '월미도', lat: 37.4720, lng: 126.5960 },
        { name: 'GS칼텍스', lat: 37.4780, lng: 126.6040 },
        { name: '북성포구', lat: 37.4810, lng: 126.6080 },
        { name: '만석부두', lat: 37.4890, lng: 126.6170 },
        { name: '화수부두', lat: 37.4870, lng: 126.6210 },
        { name: '만석북항(목재·잡화)', lat: 37.4930, lng: 126.6250 },
        { name: '포스코에너지', lat: 37.5050, lng: 126.6290 },
        { name: '인천통합발전본부', lat: 37.5110, lng: 126.6270 },
        { name: '영종대교', lat: 37.5450, lng: 126.5980 },
        { name: '물치도(작약도)', lat: 37.4880, lng: 126.5810 },
        { name: '전용부두 (귀소)', lat: 37.4579, lng: 126.5986 }
    ],
    '해상2코스': [
        { name: '전용부두 (인항파출소)', lat: 37.4579, lng: 126.5986 },
        { name: '연안부두', lat: 37.4536, lng: 126.5982 },
        { name: '연안 여객선 터미널', lat: 37.4552, lng: 126.5960 },
        { name: '관공선부두', lat: 37.4540, lng: 126.5910 },
        { name: '석탄부두', lat: 37.4420, lng: 126.6020 },
        { name: '남항 유어선부두', lat: 37.4510, lng: 126.6040 },
        { name: '영진부두', lat: 37.4560, lng: 126.6060 },
        { name: '선광(E1)부두', lat: 37.4590, lng: 126.6080 },
        { name: '국제 여객터미널', lat: 37.4260, lng: 126.5990 },
        { name: '전용부두 (귀소)', lat: 37.4579, lng: 126.5986 }
    ],
    '해안1코스': [
        { name: '파출소 (인항파출소)', lat: 37.4579, lng: 126.5986 },
        { name: '인천내항', lat: 37.4640, lng: 126.6060 },
        { name: '화수부두', lat: 37.4870, lng: 126.6210 },
        { name: '만석부두', lat: 37.4890, lng: 126.6170 },
        { name: '화수산책로', lat: 37.4865, lng: 126.6190 },
        { name: '월미산책로', lat: 37.4760, lng: 126.5980 },
        { name: '인천내항', lat: 37.4640, lng: 126.6060 },
        { name: '파출소 (귀소)', lat: 37.4579, lng: 126.5986 }
    ],
    '해안2코스': [
        { name: '파출소 (인항파출소)', lat: 37.4579, lng: 126.5986 },
        { name: '연안 여객터미널', lat: 37.4552, lng: 126.5960 },
        { name: '관공선부두', lat: 37.4540, lng: 126.5910 },
        { name: '미래해운부두', lat: 37.4540, lng: 126.5910 },
        { name: '남항 유어선부두', lat: 37.4510, lng: 126.6040 },
        { name: '아암3교', lat: 37.4320, lng: 126.6210 },
        { name: '국제 여객터미널', lat: 37.4260, lng: 126.5990 },
        { name: '송도 마리나베이 산책로', lat: 37.3850, lng: 126.6180 },
        { name: '아암3교', lat: 37.4320, lng: 126.6210 },
        { name: '파출소 (귀소)', lat: 37.4579, lng: 126.5986 }
    ],
    '해안3코스': [
        { name: '파출소 (인항파출소)', lat: 37.4579, lng: 126.5986 },
        { name: '연안부두 1,2잔교', lat: 37.4536, lng: 126.5982 },
        { name: '연안부두 5,6,7잔교', lat: 37.4515, lng: 126.5980 }
    ],
    '순찰정 1코스': [
        { name: '전용부두 (인항파출소)', lat: 37.4579, lng: 126.5986 },
        { name: '연안부두', lat: 37.4536, lng: 126.5982 },
        { name: '여객선터미널', lat: 37.4552, lng: 126.5960 },
        { name: '관공선부두', lat: 37.4540, lng: 126.5910 },
        { name: '전용부두 (귀소)', lat: 37.4579, lng: 126.5986 }
    ],
    '순찰정 2코스': [
        { name: '전용부두 (인항파출소)', lat: 37.4579, lng: 126.5986 },
        { name: '석탄부두', lat: 37.4420, lng: 126.6020 },
        { name: '남항부두', lat: 37.4510, lng: 126.6040 },
        { name: '영진부두', lat: 37.4560, lng: 126.6060 },
        { name: '선광부두', lat: 37.4590, lng: 126.6080 },
        { name: '전용부두 (귀소)', lat: 37.4579, lng: 126.5986 }
    ],
    '순찰정 3코스': [
        { name: '전용부두 (인항파출소)', lat: 37.4579, lng: 126.5986 },
        { name: '월미도', lat: 37.4720, lng: 126.5960 },
        { name: '북성포구', lat: 37.4810, lng: 126.6080 },
        { name: '화수부두', lat: 37.4870, lng: 126.6210 },
        { name: '만석부두', lat: 37.4890, lng: 126.6170 },
        { name: '작약도', lat: 37.4880, lng: 126.5810 },
        { name: '전용부두 (귀소)', lat: 37.4579, lng: 126.5986 }
    ],
    '순찰정 4코스': [
        { name: '전용부두 (인항파출소)', lat: 37.4579, lng: 126.5986 },
        { name: '월미도', lat: 37.4720, lng: 126.5960 },
        { name: '영종대교', lat: 37.5450, lng: 126.5980 }
    ],
    '순찰정 5코스': [
        { name: '전용부두 (인항파출소)', lat: 37.4579, lng: 126.5986 },
        { name: '석탄부두', lat: 37.4420, lng: 126.6020 },
        { name: '크루즈부두', lat: 37.4300, lng: 126.5880 },
        { name: '인천대교', lat: 37.4100, lng: 126.5500 },
        { name: '전용부두 (귀소)', lat: 37.4579, lng: 126.5986 }
    ],
    '도보 1코스': [
        { name: '인항파출소', lat: 37.4579, lng: 126.5986 },
        { name: '연안부두', lat: 37.4536, lng: 126.5982 },
        { name: '여객선검문소', lat: 37.4550, lng: 126.5975 },
        { name: '인항파출소 (귀소)', lat: 37.4579, lng: 126.5986 }
    ],
    '도보 2코스': [
        { name: '인항파출소', lat: 37.4579, lng: 126.5986 },
        { name: '5,6,7 잔교', lat: 37.4515, lng: 126.5980 },
        { name: '인항파출소 (귀소)', lat: 37.4579, lng: 126.5986 }
    ]
};

// ═══════════════════════════════════════════
// DOM HELPERS
// ═══════════════════════════════════════════
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ═══════════════════════════════════════════
// SCREEN ROUTER
// ═══════════════════════════════════════════
function navigateTo(screenId) {
    const screens = $$('.screen');
    screens.forEach(s => s.classList.remove('active'));

    const target = $(`#screen${capitalize(screenId)}`);
    if (target) {
        target.classList.add('active');
        State.currentScreen = screenId;
    }

    // Initialize screen-specific logic
    switch (screenId) {
        case 'Dashboard':
            renderDashboard();
            break;
        case 'Schedule':
            renderScheduleScreen();
            break;
        case 'Patrol':
            initPatrolMap();
            break;
        case 'PatrolEnd':
            renderPatrolEnd();
            break;
        case 'Report':
            renderReport();
            break;
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function parseDateLabel(dateStr) {
    if (!dateStr) return '';
    // Support YYYY-MM-DD, YYYY.MM.DD, and YYYY/MM/DD formats
    const delimiters = ['-', '.', '/'];
    let parts = [];
    for (let delim of delimiters) {
        if (dateStr.includes(delim)) {
            parts = dateStr.split(delim);
            break;
        }
    }
    if (parts.length < 3) return dateStr;
    const m = parseInt(parts[1], 10);
    const d = parseInt(parts[2], 10);
    return `${m}월 ${d}일`;
}

// ═══════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    try {
        bindGlobalEvents();
    } catch (e) {
        console.error('Error binding global events:', e);
    }
    
    try {
        initTimeEditPopup();
    } catch (e) {
        console.error('Error initializing time edit popup:', e);
    }

    try {
        enableDragScroll('#courseChips');
    } catch (e) {
        console.error('Error enabling drag scroll:', e);
    }
    
    // Start at splash
    try {
        navigateTo('Splash');
    } catch (e) {
        console.error('Error navigating to Splash:', e);
    }
});

function bindGlobalEvents() {
    const safeBind = (sel, event, handler) => {
        try {
            const el = document.querySelector(sel);
            if (el) {
                el.addEventListener(event, handler);
            } else {
                console.warn(`[SafeBind] Element not found: ${sel}`);
            }
        } catch (e) {
            console.error(`[SafeBind] Error binding event ${event} on ${sel}:`, e);
        }
    };

    // Splash → Login
    safeBind('#btnSplashEnter', 'click', () => navigateTo('Login'));

    // Login
    safeBind('#loginForm', 'submit', handleLogin);

    // Dashboard Logout
    safeBind('#btnLogout', 'click', () => {
        showToast('로그아웃 되었습니다.', 'info');
        navigateTo('Login');
    });

    // Dashboard -> Schedule Setup
    safeBind('#btnDashboardStartPatrol', 'click', () => {
        navigateTo('Schedule');
    });

    // Setup Tabs switching
    try {
        $$('#scheduleTabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetTab = e.target.dataset.tab;
                switchSetupTab(targetTab);
            });
        });
    } catch (e) {
        console.error('Failed to bind scheduleTabs click:', e);
    }

    // Back to Dashboard
    safeBind('#btnScheduleBack', 'click', () => navigateTo('Dashboard'));

    // Setup: Step transitions
    safeBind('#btnToPatrolTypeTab', 'click', () => {
        if (State.selectedMembers.length === 0) {
            showToast('출동 인원을 한 명 이상 선택해주세요.', 'error');
            return;
        }
        switchSetupTab('patrolType');
    });

    safeBind('#btnToZonesTab', 'click', () => {
        switchSetupTab('zones');
    });

    // Setup: Patrol Type Card clicks
    try {
        $$('#patrolTypeList .patrol-type-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const cardEl = e.currentTarget;
                const type = cardEl.dataset.type;
                selectPatrolType(type);
            });
        });
    } catch (e) {
        console.error('Failed to bind patrol type cards click:', e);
    }

    // Setup: Final Patrol Start Button
    safeBind('#btnStartPatrolReal', 'click', handleScheduleSubmit);

    // Mini-Calendar month navigation
    safeBind('#btnPrevMonth', 'click', () => {
        State.selectedMonth--;
        if (State.selectedMonth < 0) {
            State.selectedMonth = 11;
            State.selectedYear--;
        }
        const titleEl = $('#calendarMonthTitle');
        if (titleEl) titleEl.textContent = `${State.selectedMonth + 1}월`;
        renderMiniCalendar();
    });
    
    safeBind('#btnNextMonth', 'click', () => {
        State.selectedMonth++;
        if (State.selectedMonth > 11) {
            State.selectedMonth = 0;
            State.selectedYear++;
        }
        const titleEl = $('#calendarMonthTitle');
        if (titleEl) titleEl.textContent = `${State.selectedMonth + 1}월`;
        renderMiniCalendar();
    });

    // Confirm Modal
    safeBind('#btnConfirmStart', 'click', () => {
        closeModal('modalConfirm');
        navigateTo('Schedule');
    });

    // Patrol
    safeBind('#btnPatrolBack', 'click', handlePatrolBack);

    // Patrol End
    safeBind('#btnPatrolEndBack', 'click', () => navigateTo('Dashboard'));
    safeBind('#btnPatrolEndToReport', 'click', () => navigateTo('Report'));
    safeBind('#btnPatrolEndExport', 'click', handleExportReport);
    safeBind('#btnPatrolEndPrint', 'click', handlePrintReportHTML);
    safeBind('#btnEditPatrolDate', 'click', handleEditPatrolDate);

    // Report
    safeBind('#btnReportBack', 'click', () => navigateTo('PatrolEnd'));
    safeBind('#btnExportReport', 'click', handleExportReport);
    safeBind('#btnReportPrint', 'click', handlePrintReportHTML);

    // Dashboard View All Toggle
    safeBind('#btnViewAllHistory', 'click', (e) => {
        if (e) e.preventDefault();
        State.showAllHistory = !State.showAllHistory;
        renderRecentHistory(State.allPatrolsCached || []);
    });
}

// ═══════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════
function handleLogin(e) {
    e.preventDefault();
    const email = $('#loginEmail').value;
    const password = $('#loginPassword').value;

    if (!email || !password) {
        showToast('아이디와 비밀번호를 입력해주세요.', 'error');
        return;
    }

    showToast('로그인 성공!', 'success');
    setTimeout(() => navigateTo('Dashboard'), 500);
}

// ═══════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════
async function renderDashboard() {
    // Current date format
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const now = new Date();
    const dateStr = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 (${days[now.getDay()]})`;
    $('#dashboardDateStr').textContent = dateStr;

    // Load recent history
    try {
        const resp = await fetch('/api/patrols');
        const data = await resp.json();
        if (data.success) {
            renderRecentHistory(data.patrols);
        }
    } catch (err) {
        console.error('순찰 내역 조회 실패:', err);
        // Fallback mockup
        renderRecentHistory([]);
    }
}

function renderRecentHistory(patrols) {
    const list = $('#dashboardHistoryList');
    list.innerHTML = '';

    // Cache database for View All Toggle
    State.allPatrolsCached = patrols;

    let displayPatrols = patrols.length > 0 ? [...patrols].reverse() : [
        { id: 'mock-1', date: '2026.05.31', members: ['경사 김민준', '순경 박서연'], status: 'completed', summary: { totalTime: 135, totalDistance: 6 } },
        { id: 'mock-2', date: '2026.05.30', members: ['경장 이지훈', '순경 최수아'], status: 'completed', summary: { totalTime: 110, totalDistance: 5 } },
        { id: 'mock-3', date: '2026.05.29', members: ['경사 김민준', '경위 정현우'], status: 'draft', summary: { totalTime: 160, totalDistance: 7 } }
    ];

    const viewAllBtn = $('#btnViewAllHistory');
    if (viewAllBtn) {
        if (!State.showAllHistory) {
            displayPatrols = displayPatrols.slice(0, 3);
            viewAllBtn.textContent = '전체 보기';
        } else {
            viewAllBtn.textContent = '접기';
        }
    }

    displayPatrols.forEach(p => {
        const card = document.createElement('div');
        card.className = 'history-card';
        
        const isCompleted = p.status === 'completed';
        const badgeClass = isCompleted ? 'completed' : 'draft';
        const badgeLabel = isCompleted ? '완료' : '임시저장';
        
        const hours = Math.floor(p.summary.totalTime / 60);
        const mins = p.summary.totalTime % 60;
        const timeLabel = hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;

        const deleteBtnHtml = !p.id.startsWith('mock') ? `
            <button class="btn-delete-patrol" title="순찰 기록 삭제" aria-label="순찰 기록 삭제" style="background: none; border: none; color: var(--navy-300); cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; transition: color 0.2s;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        ` : '';

        card.innerHTML = `
            <div class="history-card-header" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span class="history-date">${p.date}</span>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="history-status-badge ${badgeClass}">${badgeLabel}</span>
                    ${deleteBtnHtml}
                </div>
            </div>
            <div class="history-members">${p.members.join('·')}</div>
            <div class="history-card-footer">
                <div class="history-footer-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>${p.summary.totalDistance}개 구역</span>
                </div>
                <div class="history-footer-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>${timeLabel}</span>
                </div>
            </div>
        `;

        // Bind delete click event
        const deleteBtn = card.querySelector('.btn-delete-patrol');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', async (e) => {
                e.stopPropagation(); // 카드 클릭 이동 방지
                if (confirm(`${p.date} 순찰 기록을 영구히 삭제하시겠습니까?`)) {
                    try {
                        const resp = await fetch(`/api/patrols/${p.id}`, { method: 'DELETE' });
                        const resData = await resp.json();
                        if (resData.success) {
                            showToast('순찰 기록이 영구 삭제되었습니다.', 'success');
                            renderDashboard();
                        } else {
                            showToast(resData.error || '삭제 실패', 'error');
                        }
                    } catch (err) {
                        console.error('삭제 오류:', err);
                        showToast('삭제 중 오류가 발생했습니다.', 'error');
                    }
                }
            });
            
            // Hover styling dynamically or through CSS
            deleteBtn.addEventListener('mouseenter', () => { deleteBtn.style.color = '#e53935'; });
            deleteBtn.addEventListener('mouseleave', () => { deleteBtn.style.color = 'var(--navy-300)'; });
        }

        card.addEventListener('click', (e) => {
            if (e.target.closest('.btn-delete-patrol')) {
                return; // Prevent navigating when deleting
            }
            if (p.id.startsWith('mock')) {
                showToast('데모 순찰 로그는 상세 조회가 지원되지 않습니다.', 'info');
            } else {
                State.currentPatrol = p;
                State.patrolPoints = p.points || [];
                // 순찰의 실제 날짜로 State.selectedDate 동기화
                if (p.date) {
                    const delimiters = ['-', '.', '/'];
                    let parts = [];
                    for (let delim of delimiters) {
                        if (p.date.includes(delim)) {
                            parts = p.date.split(delim);
                            break;
                        }
                    }
                    if (parts.length >= 3) {
                        State.selectedDate = {
                            year: parseInt(parts[0], 10),
                            month: parseInt(parts[1], 10) - 1, // 0-indexed
                            day: parseInt(parts[2], 10)
                        };
                    }
                }
                navigateTo('PatrolEnd');
            }
        });

        list.appendChild(card);
    });
}

// ═══════════════════════════════════════════
// SCHEDULE FLOW (TABS & SETUP)
// ═══════════════════════════════════════════
function switchSetupTab(tabName) {
    // UI tabs update
    $$('#scheduleTabs .tab-btn').forEach(btn => {
        if (btn.dataset.tab === tabName) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    // Content panels hide/show
    $$('.tab-content').forEach(p => p.classList.add('hidden'));
    
    if (tabName === 'date') {
        $('#tabContentDate').classList.remove('hidden');
        renderMiniCalendar();
    } else if (tabName === 'members') {
        $('#tabContentMembers').classList.remove('hidden');
        renderPersonnelList();
    } else if (tabName === 'patrolType') {
        $('#tabContentPatrolType').classList.remove('hidden');
        renderPatrolTypeList();
    } else if (tabName === 'zones') {
        $('#tabContentZones').classList.remove('hidden');
        renderCourseChips();
        renderZonesList();
    }
}

// Tab 2.5: Patrol Type Setup
function renderPatrolTypeList() {
    try {
        const type = State.selectedPatrolType || '해안';
        $$('#patrolTypeList .patrol-type-card').forEach(card => {
            if (card.dataset.type === type) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    } catch (err) {
        console.error('Error rendering patrol type list:', err);
    }
}

function selectPatrolType(type) {
    State.selectedPatrolType = type;
    
    // Highlight selected card
    $$('#patrolTypeList .patrol-type-card').forEach(card => {
        if (card.dataset.type === type) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });

    // Reset course chip selection when patrol type changes
    State.selectedCourse = '';
    State.selectedZones = [];

    showToast(`${type} 순찰이 선택되었습니다.`, 'success');
}

// Render dynamic course chips in the Zones tab
function renderCourseChips() {
    try {
        const container = $('#courseChips');
        if (!container) return;
        container.innerHTML = '';

        const type = State.selectedPatrolType || '해안';
        let coursesToShow = [];
        
        if (type === '해상') {
            coursesToShow = ['해상1코스', '해상2코스', '순찰정 1코스', '순찰정 2코스', '순찰정 3코스', '순찰정 4코스', '순찰정 5코스'];
        } else {
            coursesToShow = ['해안1코스', '해안2코스', '해안3코스', '도보 1코스', '도보 2코스'];
        }

        coursesToShow.forEach(course => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `course-chip-btn ${State.selectedCourse === course ? 'selected' : ''}`;
            btn.dataset.course = course;
            btn.textContent = course;
            
            btn.addEventListener('click', (e) => {
                const targetCourse = e.target.dataset.course;
                selectCourseAndZones(targetCourse);
            });
            
            container.appendChild(btn);
        });
    } catch (err) {
        console.error('Error rendering course chips:', err);
    }
}

function renderScheduleScreen() {
    switchSetupTab('members'); // Default tab open
}


// Tab 1: Mini Calendar
function renderMiniCalendar() {
    const grid = $('#calendarGrid');
    grid.innerHTML = '';
    const year = State.selectedYear;
    const month = State.selectedMonth;

    $('#calendarMonthTitle').textContent = `${month + 1}월`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    // Prev month days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const dayNum = prevMonthLastDay - i;
        const el = createDayElement(dayNum, true, startDayOfWeek - 1 - i);
        grid.appendChild(el);
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
        const dayOfWeek = (startDayOfWeek + d - 1) % 7;
        const el = createDayElement(d, false, dayOfWeek);

        if (d === 1) el.classList.add('selected'); // Default mockup check June 1

        el.addEventListener('click', () => {
            $$('.calendar-day').forEach(cell => cell.classList.remove('selected'));
            el.classList.add('selected');
            State.selectedDate = { year, month, day: d };
        });

        grid.appendChild(el);
    }

    // Next month head
    const totalCells = grid.children.length;
    const remaining = 42 - totalCells;
    for (let i = 1; i <= remaining; i++) {
        const dayOfWeek = (totalCells + i - 1) % 7;
        const el = createDayElement(i, true, dayOfWeek);
        grid.appendChild(el);
    }
}

function createDayElement(dayNum, isOtherMonth, dayOfWeek) {
    const el = document.createElement('div');
    el.className = 'calendar-day';
    el.textContent = dayNum;
    if (isOtherMonth) el.classList.add('other-month');
    if (dayOfWeek === 0) el.classList.add('sunday');
    if (dayOfWeek === 6) el.classList.add('saturday');
    return el;
}

function closeModal(id) {
    const modal = $(`#${id}`);
    if (modal) modal.classList.remove('active');
}

// ═══════════════════════════════════════════
// SCHEDULE (NEW CARD-BASED SELECTION)
// ═══════════════════════════════════════════

// Tab 2: Personnel List Cards (Premium check cards)
function renderPersonnelList() {
    try {
        const container = $('#personnelList');
        if (!container) return;
        container.innerHTML = '';

        DEMO_MEMBERS.forEach(m => {
            const card = document.createElement('div');
            const isSelected = Array.isArray(State.selectedMembers) && State.selectedMembers.includes(m.id);
            card.className = `personnel-card ${isSelected ? 'selected' : ''}`;
            
            card.innerHTML = `
                <div class="personnel-left-info">
                    <div class="personnel-icon-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <span class="personnel-name">${m.rank} ${m.name}</span>
                </div>
                <div class="personnel-check-box"></div>
            `;

            card.addEventListener('click', () => {
                if (!Array.isArray(State.selectedMembers)) {
                    State.selectedMembers = [];
                }
                const idx = State.selectedMembers.indexOf(m.id);
                if (idx >= 0) {
                    State.selectedMembers.splice(idx, 1);
                    card.classList.remove('selected');
                } else {
                    State.selectedMembers.push(m.id);
                    card.classList.add('selected');
                }
            });

            container.appendChild(card);
        });
    } catch (err) {
        console.error('Error rendering personnel list:', err);
    }
}

// Tab 3: Zone Selection Cards
function renderZonesList() {
    try {
        const container = $('#zonesList');
        if (!container) return;
        container.innerHTML = '';

        DEMO_ZONES.forEach(z => {
            const card = document.createElement('div');
            const isSelected = Array.isArray(State.selectedZones) && State.selectedZones.includes(z.code);
            card.className = `zone-select-card ${isSelected ? 'selected' : ''}`;

            card.innerHTML = `
                <div class="zone-left-info">
                    <div class="zone-badge-box">${z.code}</div>
                    <div class="zone-details">
                        <span class="zone-name-title">${z.name}</span>
                        <span class="zone-subtitle-desc">${z.detail}</span>
                    </div>
                </div>
                <div class="zone-check-indicator"></div>
            `;

            card.addEventListener('click', () => {
                if (!Array.isArray(State.selectedZones)) {
                    State.selectedZones = [];
                }
                const idx = State.selectedZones.indexOf(z.code);
                if (idx >= 0) {
                    State.selectedZones.splice(idx, 1);
                    card.classList.remove('selected');
                } else {
                    State.selectedZones.push(z.code);
                    card.classList.add('selected');
                }
                // Clear course chip selection active status if zones modified manually
                $$('#courseChips .course-chip-btn').forEach(btn => btn.classList.remove('selected'));
                State.selectedCourse = '';
            });

            container.appendChild(card);
        });
    } catch (err) {
        console.error('Error rendering zones list:', err);
    }
}

// Automatic selection logic when clicking a course
function selectCourseAndZones(courseName) {
    State.selectedCourse = courseName;
    
    // Highlight course chip
    $$('#courseChips .course-chip-btn').forEach(btn => {
        if (btn.dataset.course === courseName) btn.classList.add('selected');
        else btn.classList.remove('selected');
    });

    // Auto-select corresponding zones
    const codes = COURSE_ZONES[courseName] || [];
    State.selectedZones = [...codes];

    // Re-render zones list to show them checked instantly!
    renderZonesList();
    showToast(`${courseName}에 해당하는 구역이 자동 선택되었습니다.`, 'success');
}

// Submit setup & transition to map screen
function handleScheduleSubmit(e) {
    if (e) e.preventDefault();

    if (!Array.isArray(State.selectedMembers) || State.selectedMembers.length === 0) {
        showToast('출동 인원을 선택해주세요.', 'error');
        return;
    }

    if (!Array.isArray(State.selectedZones) || State.selectedZones.length === 0) {
        showToast('순찰 구역을 선택해주세요.', 'error');
        return;
    }

    createPatrol();
}

async function createPatrol() {
    const { year, month, day } = State.selectedDate || { year: 2026, month: 5, day: 1 };
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const members = (State.selectedMembers || []).map(id => {
        const found = DEMO_MEMBERS.find(m => m.id === id);
        return found ? `${found.rank} ${found.name}` : '';
    }).filter(Boolean);

    // Map selected zones into points
    const mappedZones = (State.selectedZones || []).map(code => {
        return DEMO_ZONES.find(z => z.code === code);
    }).filter(Boolean);

    try {
        const resp = await fetch('/api/patrols', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: dateStr,
                members,
                course: State.selectedCourse || '맞춤 코스',
                coursePoints: mappedZones.map(mz => ({ name: `${mz.name}(${mz.detail})`, lat: mz.lat, lng: mz.lng }))
            })
        });

        const data = await resp.json();
        if (data.success) {
            State.currentPatrol = data.patrol;
            State.patrolStarted = true;
            State.currentZoneIdx = 0;
            State.patrolPoints = [];

            // Initialize point statuses
            mappedZones.forEach((mz, idx) => {
                State.patrolPoints.push({
                    id: `pt-${idx}-${Date.now()}`,
                    location: `${mz.name}(${mz.detail})`,
                    code: mz.code,
                    detail: mz.detail,
                    lat: mz.lat,
                    lng: mz.lng,
                    arrivalTime: idx === 0 ? formatTimeHM(new Date()) : '', // Auto arrive at first zone
                    departureTime: '',
                    memo: idx === 0 ? '해안순찰 전 안전교육 실시' : '', // Mock initial memo for first zone
                    completed: false
                });
            });

            // Set UI details
            const activeOfficersEl = $('#patrolActiveOfficers');
            if (activeOfficersEl) activeOfficersEl.textContent = members.join(' · ');
            const label = `${month + 1}월 ${day}일 순찰일지`;
            
            const opt1 = $('#patrolLogOption');
            if (opt1) opt1.textContent = label;
            const opt2 = $('#patrolEndLogOption');
            if (opt2) opt2.textContent = label;

            navigateTo('Patrol');
            showToast('순찰을 시작하겠습니다.', 'success');
        } else {
            showToast(data.error, 'error');
        }
    } catch (err) {
        showToast('순찰 시작에 실패했습니다.', 'error');
        console.error(err);
    }
}

// ═══════════════════════════════════════════
// PATROL MAP & PROGRESS
// ═══════════════════════════════════════════
function initPatrolMap() {
    if (State.patrolMap) {
        State.patrolMap.invalidateSize();
        updatePatrolMapMarkers();
        renderPatrolProgressUI();
        startElapsedTimer();
        setupPatrolBottomSheet();
        return;
    }

    // Default center: Inhang Police Box area
    const center = [37.4579, 126.5986];

    State.patrolMap = L.map('patrolMap', {
        center: center,
        zoom: 14,
        zoomControl: false,
        attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(State.patrolMap);

    updatePatrolMapMarkers();
    renderPatrolProgressUI();
    startElapsedTimer();
    setupPatrolBottomSheet();

    // Start GPS tracking
    startGPSTracking();
}

function updatePatrolMapMarkers() {
    if (!State.patrolMap) return;

    // Clear existing markers/polylines
    State.patrolMap.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            State.patrolMap.removeLayer(layer);
        }
    });

    // Add course point markers with status-based colors
    const coords = [];
    State.patrolPoints.forEach((pt, idx) => {
        if (pt.lat && pt.lng) {
            let markerColor = '#cbd5e1'; // Upcoming (Gray)
            
            if (idx === State.currentZoneIdx) {
                markerColor = '#ef4444'; // Active/Current (Red)
            } else if (pt.completed || idx < State.currentZoneIdx) {
                markerColor = '#1e3a6e'; // Completed (Navy)
            }

            const icon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                    width: 14px; height: 14px;
                    border-radius: 50%;
                    background: ${markerColor};
                    border: 2px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                "></div>`,
                iconSize: [14, 14],
                iconAnchor: [7, 7]
            });

            L.marker([pt.lat, pt.lng], { icon }).addTo(State.patrolMap);
            coords.push([pt.lat, pt.lng]);
        }
    });

    // Draw route polyline
    if (coords.length >= 2) {
        L.polyline(coords, {
            color: '#1e3a6e',
            weight: 3,
            opacity: 0.8,
            dashArray: '8, 6'
        }).addTo(State.patrolMap);
    }

    // Fit bounds
    if (coords.length > 0) {
        const bounds = L.latLngBounds(coords);
        State.patrolMap.fitBounds(bounds.pad(0.3));
    }
}

function startGPSTracking() {
    if (!navigator.geolocation) return;

    if (State.watchId) {
        navigator.geolocation.clearWatch(State.watchId);
    }

    State.watchId = navigator.geolocation.watchPosition(
        (pos) => {
            State.currentLat = pos.coords.latitude;
            State.currentLng = pos.coords.longitude;
        },
        (err) => console.warn('GPS 오류:', err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
    );
}

// ═══════════════════════════════════════════
// PATROL PROGRESS UI & ELAPSED TIMER
// ═══════════════════════════════════════════
function renderPatrolProgressUI() {
    const list = $('#patrolListItems');
    list.innerHTML = '';

    let completedCount = 0;
    State.patrolPoints.forEach((pt, idx) => {
        const item = document.createElement('div');
        const isActive = idx === State.currentZoneIdx;
        const isCompleted = pt.completed || idx < State.currentZoneIdx;

        let statusTag = '예정';
        let statusClass = 'upcoming';

        if (isActive) {
            statusTag = '현재';
            statusClass = 'active';
        } else if (isCompleted) {
            statusTag = '완료';
            statusClass = 'completed';
            completedCount++;
        }

        item.className = `patrol-zone-item-premium ${statusClass}`;

        item.innerHTML = `
            <div class="patrol-item-left">
                <div class="patrol-item-badge">${pt.code || String.fromCharCode(65 + idx)}</div>
                <div class="patrol-item-name">${escapeHtml(pt.location)}</div>
            </div>
            <span class="patrol-item-status-tag">${statusTag}</span>
        `;
        list.appendChild(item);
    });

    // Update Ratio & Progress Bar
    const total = State.patrolPoints.length;
    $('#patrolProgressRatio').textContent = `${completedCount}/${total} 구역`;
    const progressPercent = (completedCount / total) * 100;
    $('#patrolProgressBarFill').style.width = `${progressPercent}%`;

    // Load active zone memo into Bottom Sheet input
    const activeZone = State.patrolPoints[State.currentZoneIdx];
    if (activeZone) {
        $('#sheetMemoInput').value = activeZone.memo || '';
        // Set tag active based on value
        $$('#quickTags .quick-tag').forEach(btn => {
            if (activeZone.memo === btn.dataset.tag) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    // Adapt sheet button label on final zone
    if (State.currentZoneIdx === total - 1) {
        $('#btnSheetNextZone').textContent = '순찰 완료 및 종료';
    } else {
        $('#btnSheetNextZone').textContent = '다음 구역으로 이동';
    }
}

// Elapsed timer
function startElapsedTimer() {
    if (State.timerInterval) clearInterval(State.timerInterval);

    // Start at 8 seconds for mockup high-fidelity (Image 4 show 00:08)
    State.elapsedSeconds = 8;
    $('#patrolTimerVal').textContent = '00:08';

    State.timerInterval = setInterval(() => {
        State.elapsedSeconds++;
        const mins = Math.floor(State.elapsedSeconds / 60);
        const secs = State.elapsedSeconds % 60;
        $('#patrolTimerVal').textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

// Setup Bottom Sheet event handlers
function setupPatrolBottomSheet() {
    // Quick tags
    $$('#quickTags .quick-tag').forEach(btn => {
        // Remove old listeners by replacing node or simple replacement (avoid adding multiple handlers)
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', (e) => {
            const tag = e.target.dataset.tag;
            $('#sheetMemoInput').value = tag;

            // Set active class
            $$('#quickTags .quick-tag').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Save to active zone
            const activeZone = State.patrolPoints[State.currentZoneIdx];
            if (activeZone) activeZone.memo = tag;
        });
    });

    // Save memo on type
    const memoInput = $('#sheetMemoInput');
    const newMemoInput = memoInput.cloneNode(true);
    memoInput.parentNode.replaceChild(newMemoInput, memoInput);
    newMemoInput.addEventListener('input', (e) => {
        const activeZone = State.patrolPoints[State.currentZoneIdx];
        if (activeZone) activeZone.memo = e.target.value;
    });

    // Next zone button click
    const nextBtn = $('#btnSheetNextZone');
    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    newNextBtn.addEventListener('click', handleNextZoneTransition);
}

async function handleNextZoneTransition() {
    const now = new Date();
    const timeStr = formatTimeHM(now);

    const currentZone = State.patrolPoints[State.currentZoneIdx];
    if (currentZone) {
        currentZone.departureTime = timeStr;
        currentZone.completed = true;
    }

    State.currentZoneIdx++;

    // Check if patrol fully finished
    if (State.currentZoneIdx >= State.patrolPoints.length) {
        if (State.timerInterval) clearInterval(State.timerInterval);
        endPatrol();
        return;
    }

    // Initialize next zone
    const nextZone = State.patrolPoints[State.currentZoneIdx];
    if (nextZone) {
        nextZone.arrivalTime = timeStr;
        if (!nextZone.memo) {
            nextZone.memo = '이상 없음'; // Default memo
        }
    }

    renderPatrolProgressUI();
    updatePatrolMapMarkers();
    showToast(`${currentZone ? currentZone.location.split('(')[0] : '구역'} 순찰 완료. 다음 구역으로 이동합니다.`, 'success');

    savePatrolToServer();
}

async function endPatrol() {
    if (State.currentPatrol) {
        // Calculate summary
        const times = State.patrolPoints
            .filter(pt => pt.arrivalTime)
            .map(pt => pt.arrivalTime);

        const departures = State.patrolPoints
            .filter(pt => pt.departureTime)
            .map(pt => pt.departureTime);

        let totalMinutes = 0;
        if (times.length > 0 && departures.length > 0) {
            const first = parseTimeStr(times[0]);
            const last = parseTimeStr(departures[departures.length - 1]);
            totalMinutes = (last - first) / 60000;
        }

        State.currentPatrol.points = State.patrolPoints;
        State.currentPatrol.summary = {
            totalDistance: State.patrolPoints.length,
            totalTime: Math.round(totalMinutes) || Math.floor(State.elapsedSeconds / 60) || 2, // fallback to active timer duration or 2 min
            patrolMethod: '도보 및 차량',
            patrolCount: `${State.patrolPoints.length}곳`
        };
        State.currentPatrol.status = 'completed';

        await savePatrolToServer();
    }

    showToast('순찰이 모두 완료되어 종료되었습니다.', 'success');
    navigateTo('PatrolEnd');
}

async function savePatrolToServer() {
    if (!State.currentPatrol) return;

    try {
        await fetch(`/api/patrols/${State.currentPatrol.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                points: State.patrolPoints,
                summary: State.currentPatrol.summary,
                status: State.currentPatrol.status,
                date: State.currentPatrol.date,
                members: State.currentPatrol.members,
                course: State.currentPatrol.course
            })
        });
    } catch (err) {
        console.error('순찰 저장 오류:', err);
    }
}

function handlePatrolBack() {
    if (State.patrolStarted) {
        if (confirm('순찰을 종료하시겠습니까?')) {
            endPatrol();
        }
    } else {
        navigateTo('Schedule');
    }
}

// ═══════════════════════════════════════════
// PATROL END
// ═══════════════════════════════════════════
function renderPatrolEnd() {
    // Init map
    setTimeout(() => {
        if (State.patrolEndMap) {
            State.patrolEndMap.remove();
            State.patrolEndMap = null;
        }

        State.patrolEndMap = L.map('patrolEndMap', {
            center: [37.4579, 126.5986],
            zoom: 14,
            zoomControl: false,
            attributionControl: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(State.patrolEndMap);

        // Add markers and route
        const coords = [];
        State.patrolPoints.forEach((pt) => {
            if (pt.lat && pt.lng) {
                const icon = L.divIcon({
                    className: 'custom-marker',
                    html: `<div style="
                        width: 12px; height: 12px;
                        border-radius: 50%;
                        background: #c62828;
                        border: 2px solid white;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    "></div>`,
                    iconSize: [12, 12],
                    iconAnchor: [6, 6]
                });
                L.marker([pt.lat, pt.lng], { icon }).addTo(State.patrolEndMap);
                coords.push([pt.lat, pt.lng]);
            }
        });

        if (coords.length >= 2) {
            L.polyline(coords, {
                color: '#c62828',
                weight: 3,
                opacity: 0.8
            }).addTo(State.patrolEndMap);
            State.patrolEndMap.fitBounds(L.latLngBounds(coords).pad(0.3));
        }
    }, 100);

    // 순찰 날짜 표시 업데이트
    if (State.currentPatrol && State.currentPatrol.date) {
        const dateLabel = parseDateLabel(State.currentPatrol.date);
        const label = `${dateLabel} 순찰일지`;
        const optEnd = $('#patrolEndLogOption');
        if (optEnd) optEnd.textContent = label;
    }

    // 드롭다운 채우기 및 이벤트 바인딩
    renderPatrolLogDropdown();

    // Render summary
    renderPatrolEndSummary();
    renderPatrolEndTimeline();
}

function renderPatrolLogDropdown() {
    try {
        const selectEl = $('.patrol-log-select');
        if (!selectEl) return;
        selectEl.innerHTML = '';

        const patrols = State.allPatrolsCached || [];
        
        if (patrols.length === 0) {
            const opt = document.createElement('option');
            opt.textContent = '순찰 기록 없음';
            selectEl.appendChild(opt);
            return;
        }

        // Sort patrols by date in descending order (newest first)
        const sortedPatrols = [...patrols].reverse();

        sortedPatrols.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            
            const dateLabel = parseDateLabel(p.date);
            opt.textContent = `${dateLabel} 순찰일지`;
            
            if (State.currentPatrol && p.id === State.currentPatrol.id) {
                opt.selected = true;
            }
            selectEl.appendChild(opt);
        });

        selectEl.onchange = (e) => {
            const selectedId = e.target.value;
            const targetPatrol = patrols.find(p => p.id === selectedId);
            if (targetPatrol) {
                State.currentPatrol = targetPatrol;
                State.patrolPoints = targetPatrol.points || [];
                
                if (targetPatrol.date) {
                    const delimiters = ['-', '.', '/'];
                    let parts = [];
                    for (let delim of delimiters) {
                        if (targetPatrol.date.includes(delim)) {
                            parts = targetPatrol.date.split(delim);
                            break;
                        }
                    }
                    if (parts.length >= 3) {
                        State.selectedDate = {
                            year: parseInt(parts[0], 10),
                            month: parseInt(parts[1], 10) - 1,
                            day: parseInt(parts[2], 10)
                        };
                    }
                }
                
                renderPatrolEnd();
            }
        };
    } catch (err) {
        console.error('Error rendering patrol log dropdown:', err);
    }
}

function renderPatrolEndSummary() {
    const container = $('#patrolEndSummary');
    const patrol = State.currentPatrol;
    if (!patrol) return;

    const summary = patrol.summary || {};
    const members = patrol.members || State.selectedMembers.map(id => {
        const found = DEMO_MEMBERS.find(m => m.id === id);
        return found ? `${found.rank} ${found.name}` : '';
    }).filter(Boolean);

    container.innerHTML = `
        <div class="patrol-end-summary-card">
            <h3>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                </svg>
                순찰 요약 (클릭하여 편집)
            </h3>
            <dl class="summary-grid">
                <dt>인원</dt>
                <dd id="summaryEndMembers" style="cursor: pointer; text-decoration: underline dotted var(--navy-300);" title="클릭하여 출동 대원 수정">${escapeHtml(members.join(', '))}</dd>
                <dt>코스</dt>
                <dd id="summaryEndCourse" style="cursor: pointer; text-decoration: underline dotted var(--navy-300);" title="클릭하여 순찰 코스 수정">${escapeHtml(patrol.course || State.selectedCourse)}</dd>
                <dt>순찰수단</dt>
                <dd id="summaryEndMethod" style="cursor: pointer; text-decoration: underline dotted var(--navy-300);" title="클릭하여 순찰 수단 수정">${escapeHtml(summary.patrolMethod || '도보 및 차량')}</dd>
                <dt>순찰거리(km)</dt>
                <dd id="summaryEndDistance" style="cursor: pointer; text-decoration: underline dotted var(--navy-300);" title="클릭하여 순찰 거리 수정">${summary.totalDistance || 0}</dd>
                <dt>순찰소요시간(분)</dt>
                <dd id="summaryEndTime" style="cursor: pointer; text-decoration: underline dotted var(--navy-300);" title="클릭하여 순찰 시간 수정">${summary.totalTime || 0}</dd>
            </dl>
        </div>
    `;

    // Bind clicks
    const bindEdit = (sel, promptMsg, key, isPatrolField = false, isSummaryField = false, num = false) => {
        const el = container.querySelector(sel);
        if (el) {
            el.addEventListener('click', () => {
                const oldVal = isPatrolField ? patrol[key] : (isSummaryField ? summary[key] : el.textContent);
                const newVal = prompt(promptMsg, Array.isArray(oldVal) ? oldVal.join(', ') : oldVal);
                if (newVal !== null) {
                    let finalVal = newVal.trim();
                    if (num) finalVal = parseFloat(finalVal) || 0;

                    if (key === 'members') {
                        patrol.members = finalVal.split(',').map(s => s.trim()).filter(Boolean);
                    } else if (isPatrolField) {
                        patrol[key] = finalVal;
                    } else if (isSummaryField) {
                        summary[key] = finalVal;
                    }
                    
                    savePatrolToServer();
                    renderPatrolEnd();
                    showToast('순찰 정보가 수정되었습니다.', 'success');
                }
            });
        }
    };

    bindEdit('#summaryEndMembers', '출동 대원을 수정하십시오 (쉼표로 구분):', 'members', true);
    bindEdit('#summaryEndCourse', '순찰 코스명을 수정하십시오:', 'course', true);
    bindEdit('#summaryEndMethod', '순찰 수단을 수정하십시오:', 'patrolMethod', false, true);
    bindEdit('#summaryEndDistance', '순찰 거리를 수정하십시오 (km):', 'totalDistance', false, true, true);
    bindEdit('#summaryEndTime', '순찰 소요 시간을 수정하십시오 (분):', 'totalTime', false, true, true);
}

function renderPatrolEndTimeline() {
    const container = $('#patrolEndTimeline');
    container.innerHTML = '<h3>순찰 상세 기록 (항목별 클릭하여 편집)</h3>';

    State.patrolPoints.forEach((pt, idx) => {
        if (!pt.arrivalTime) return;

        const timeRange = pt.departureTime
            ? `${pt.arrivalTime} ~ ${pt.departureTime}`
            : pt.arrivalTime;

        const item = document.createElement('div');
        item.className = 'detail-timeline-item';
        item.innerHTML = `
            <div class="detail-timeline-dot"></div>
            <div class="detail-timeline-content">
                <div class="detail-timeline-time">
                    <span class="btn-edit-time-trigger" style="cursor: pointer; text-decoration: underline dotted var(--navy-300);" title="시간 수정">${timeRange}</span> | 
                    <span class="btn-edit-location-trigger" style="cursor: pointer; text-decoration: underline dotted var(--navy-300);" title="순찰 지명 수정">${escapeHtml(pt.location)}</span>
                </div>
                <div class="detail-timeline-desc btn-edit-memo-trigger" style="cursor: pointer; text-decoration: underline dotted var(--navy-300);" title="특이사항 메모 수정">${escapeHtml(pt.memo || '특이사항 없음')}</div>
            </div>
        `;

        // Bind clicks
        const timeBtn = item.querySelector('.btn-edit-time-trigger');
        timeBtn.addEventListener('click', () => {
            openTimeEditPopup(idx);
        });

        const locBtn = item.querySelector('.btn-edit-location-trigger');
        locBtn.addEventListener('click', () => {
            const newVal = prompt("순찰 지명을 수정하십시오:", pt.location);
            if (newVal !== null) {
                pt.location = newVal.trim() || pt.location;
                savePatrolToServer();
                renderPatrolEnd();
                showToast('지명이 수정되었습니다.', 'success');
            }
        });

        const memoBtn = item.querySelector('.btn-edit-memo-trigger');
        memoBtn.addEventListener('click', () => {
            const newVal = prompt("특이사항 메모를 수정하십시오:", pt.memo || "");
            if (newVal !== null) {
                pt.memo = newVal.trim();
                savePatrolToServer();
                renderPatrolEnd();
                showToast('메모가 수정되었습니다.', 'success');
            }
        });

        container.appendChild(item);
    });
}

// ═══════════════════════════════════════════
// REPORT
// ═══════════════════════════════════════════
function renderReport() {
    const patrol = State.currentPatrol;
    if (!patrol) return;

    // patrol.date에서 직접 날짜 파싱 (State.selectedDate 대신)
    const dateLabel = parseDateLabel(patrol.date);

    const titleEl = $('#reportTitle');
    titleEl.textContent = `${dateLabel} - 보고서 미리보기 (클릭하여 날짜 수정)`;
    titleEl.style.cursor = 'pointer';
    titleEl.title = '순찰 날짜 수정';
    titleEl.onclick = handleEditPatrolDate;

    // Members
    const members = patrol.members || State.selectedMembers.map(id => {
        const found = DEMO_MEMBERS.find(m => m.id === id);
        return found ? `${found.rank} ${found.name}` : '';
    }).filter(Boolean);
    $('#reportMembers').textContent = members.join(', ');

    // Bind edit members click
    const membersField = $('#reportMembers').parentElement.parentElement;
    if (membersField) {
        const editIcon = membersField.querySelector('.edit-icon');
        if (editIcon) {
            editIcon.style.cursor = 'pointer';
            editIcon.title = '대원명 수정';
            editIcon.onclick = () => {
                const newVal = prompt("출동 대원을 수정하십시오 (쉼표로 구분):", members.join(', '));
                if (newVal !== null) {
                    patrol.members = newVal.split(',').map(s => s.trim()).filter(Boolean);
                    savePatrolToServer();
                    renderReport();
                    showToast('출동 대원이 수정되었습니다.', 'success');
                }
            };
        }
    }

    // Time range
    const times = State.patrolPoints.filter(pt => pt.arrivalTime).map(pt => pt.arrivalTime);
    const departures = State.patrolPoints.filter(pt => pt.departureTime).map(pt => pt.departureTime);
    const firstTime = times[0] || '--:--';
    const lastTime = departures[departures.length - 1] || times[times.length - 1] || '--:--';
    $('#reportTime').textContent = `${firstTime}~${lastTime}`;

    // Bind edit time click
    const timeField = $('#reportTime').parentElement.parentElement;
    if (timeField) {
        const editIcon = timeField.querySelector('.edit-icon');
        if (editIcon) {
            editIcon.style.cursor = 'pointer';
            editIcon.title = '시간 설명';
            editIcon.onclick = () => {
                showToast('아래 각 개별 순찰 기록의 시간 영역을 클릭하면 시간을 정밀 수정할 수 있습니다.', 'info');
            };
        }
    }

    // Places
    const places = State.patrolPoints.map(pt => pt.location);
    $('#reportPlaces').textContent = places.join('→');

    // Bind edit places (course) click
    const placesField = $('#reportPlaces').parentElement.parentElement;
    if (placesField) {
        const editIcon = placesField.querySelector('.edit-icon');
        if (editIcon) {
            editIcon.style.cursor = 'pointer';
            editIcon.title = '순찰 코스 수정';
            editIcon.onclick = () => {
                const newVal = prompt("순찰 코스명을 수정하십시오:", patrol.course || "맞춤 코스");
                if (newVal !== null) {
                    patrol.course = newVal.trim() || "맞춤 코스";
                    savePatrolToServer();
                    renderReport();
                    showToast('순찰 코스명이 수정되었습니다.', 'success');
                }
            };
        }
    }

    // Activity cards
    const activitiesContainer = $('#reportActivities');
    activitiesContainer.innerHTML = '';

    State.patrolPoints.forEach((pt, idx) => {
        if (!pt.arrivalTime) return;

        const timeRange = pt.departureTime
            ? `${pt.arrivalTime} ~ ${pt.departureTime}`
            : pt.arrivalTime;

        const card = document.createElement('div');
        card.className = 'report-activity-card';
        card.innerHTML = `
            <div class="report-activity-header">
                <span class="report-activity-time" style="cursor: pointer; text-decoration: underline dotted var(--navy-300);" title="시간 수정">${timeRange}</span> | 
                <span class="report-activity-location" style="cursor: pointer; text-decoration: underline dotted var(--navy-300);" title="순찰 지명 수정">${escapeHtml(pt.location)}</span>
                <svg class="edit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="cursor: pointer; display: inline-block; margin-left: auto;" title="지명 수정">
                    <circle cx="12" cy="12" r="10"/>
                </svg>
            </div>
            <div class="report-activity-desc" style="cursor: pointer; text-decoration: underline dotted var(--navy-300);" title="특이사항 메모 수정">${escapeHtml(pt.memo || '특이사항 없음')}</div>
        `;

        // Bind timeline card clicks
        const timeBtn = card.querySelector('.report-activity-time');
        timeBtn.addEventListener('click', () => {
            openTimeEditPopup(idx);
        });

        const locBtn = card.querySelector('.report-activity-location');
        locBtn.addEventListener('click', () => {
            const newVal = prompt("순찰 지명을 수정하십시오:", pt.location);
            if (newVal !== null) {
                pt.location = newVal.trim() || pt.location;
                savePatrolToServer();
                renderReport();
                showToast('순찰 지명이 수정되었습니다.', 'success');
            }
        });

        const cardEditIcon = card.querySelector('.edit-icon');
        cardEditIcon.addEventListener('click', () => {
            const newVal = prompt("순찰 지명을 수정하십시오:", pt.location);
            if (newVal !== null) {
                pt.location = newVal.trim() || pt.location;
                savePatrolToServer();
                renderReport();
                showToast('순찰 지명이 수정되었습니다.', 'success');
            }
        });

        const descBtn = card.querySelector('.report-activity-desc');
        descBtn.addEventListener('click', () => {
            const newVal = prompt("특이사항 메모를 수정하십시오:", pt.memo || "");
            if (newVal !== null) {
                pt.memo = newVal.trim();
                savePatrolToServer();
                renderReport();
                showToast('메모가 수정되었습니다.', 'success');
            }
        });

        activitiesContainer.appendChild(card);
    });
}

async function handleExportReport() {
    if (!State.currentPatrol) {
        showToast('내보낼 순찰 기록이 없습니다.', 'error');
        return;
    }

    const btn = $('#btnExportReport');
    btn.disabled = true;
    btn.innerHTML = '<div class="loading-spinner"></div> 보고서 생성 중...';

    try {
        const resp = await fetch(`/api/patrols/${State.currentPatrol.id}/report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!resp.ok) {
            const errData = await resp.json();
            throw new Error(errData.error || '보고서 생성 실패');
        }

        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        const disposition = resp.headers.get('Content-Disposition');
        let filename = '순찰일지.hwpx';
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

        showToast(`보고서가 생성되었습니다: ${filename}`, 'success');
    } catch (err) {
        showToast(err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            보고서 내보내기
        `;
    }
}

function handlePrintReportHTML() {
    if (!State.currentPatrol) {
        showToast('인쇄할 순찰 기록이 없습니다.', 'error');
        return;
    }

    const patrol = State.currentPatrol;
    const pts = patrol.points || [];
    if (pts.length === 0) {
        showToast('순찰 기록 포인트가 존재하지 않습니다.', 'error');
        return;
    }

    const rawDate = patrol.date || new Date().toISOString().split('T')[0];
    const dateVal = rawDate.replace(/-/g, '. ');

    const firstPt = pts[0] || {};
    const lastPt = pts[pts.length - 1] || firstPt;
    const timeVal = `${firstPt.arrivalTime || '00:00'} ~ ${lastPt.departureTime || lastPt.arrivalTime || '00:00'}`;
    const typeVal = '해안순찰';

    const courseName = patrol.course || '1코스';
    const pathAddresses = pts.map(pt => pt.location || '').filter(Boolean);
    const pathRoute = pathAddresses.filter((val, index, self) => self.indexOf(val) === index).join(' - ');
    const placeVal = `${courseName}: ${pathRoute}`;

    const officerVal = (patrol.members || []).join(', ') || '경사 홍길동, 경장 윤봉길, 순경 안중근';

    // 1. 전체 시간대별 순찰 특이사항 리스트 행 생성
    let timelineRows = '';
    pts.forEach(pt => {
        const rowTime = `${pt.arrivalTime || '00:00'} ~ ${pt.departureTime || pt.arrivalTime || '00:00'}`;
        const rowPlace = pt.location || '';
        const rowActivity = pt.memo || '이상 없음';

        timelineRows += `
            <tr>
                <td style="text-align: center; padding: 10px; border: 1px solid #000; font-size: 14px;">${escapeHtml(rowTime)}</td>
                <td style="text-align: center; padding: 10px; border: 1px solid #000; font-size: 14px;">${escapeHtml(rowPlace)}</td>
                <td style="text-align: left; padding: 10px; border: 1px solid #000; font-size: 14px;">${escapeHtml(rowActivity)}</td>
            </tr>
        `;
    });

    // 2. 유의미한 특이사항 데이터만 정밀 추출 (이상 없음/순찰/공란 제외)
    const incidentPts = pts.filter(pt => {
        const act = pt.memo ? pt.memo.trim() : '';
        return act !== '이상 없음' && act !== '이상없음' && act !== '순찰' && act !== '';
    });

    let incidentTimelineRows = '';
    if (incidentPts.length > 0) {
        incidentPts.forEach(pt => {
            const rowTime = pt.arrivalTime || '00:00';
            const rowPlace = pt.location || '';
            const rowActivity = pt.memo || '';

            incidentTimelineRows += `
                <tr>
                    <td style="text-align: center; padding: 10px; border: 1px solid #000; font-size: 14px;">${escapeHtml(rowTime)}</td>
                    <td style="text-align: center; padding: 10px; border: 1px solid #000; font-size: 14px;">${escapeHtml(rowPlace)}</td>
                    <td style="text-align: left; padding: 10px; border: 1px solid #000; font-size: 14px;">${escapeHtml(rowActivity)}</td>
                </tr>
            `;
        });
    } else {
        // 특이사항이 없을 경우 2개의 기본 공란 행 배치
        incidentTimelineRows += `
            <tr>
                <td style="text-align: center; padding: 10px; border: 1px solid #000; font-size: 14px; color: #888;">00:00</td>
                <td style="text-align: center; padding: 10px; border: 1px solid #000; font-size: 14px; color: #888;">-</td>
                <td style="text-align: center; padding: 10px; border: 1px solid #000; font-size: 14px; color: #888;">-</td>
            </tr>
            <tr>
                <td style="text-align: center; padding: 10px; border: 1px solid #000; font-size: 14px; color: #888;">00:00</td>
                <td style="text-align: center; padding: 10px; border: 1px solid #000; font-size: 14px; color: #888;">-</td>
                <td style="text-align: center; padding: 10px; border: 1px solid #000; font-size: 14px; color: #888;">-</td>
            </tr>
        `;
    }

    const printWindow = window.open('', '_blank', 'width=850,height=900');
    if (!printWindow) {
        showToast('팝업 차단이 설정되어 있습니다. 팝업 허용을 해주시기 바랍니다.', 'error');
        return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>순찰일지 인쇄</title>
    <style>
        @media print {
            body { margin: 0; padding: 20px; }
            .no-print { display: none; }
        }
        body {
            font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
            color: #000;
            background-color: #fff;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
        }
        .title {
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            margin-bottom: 30px;
            margin-top: 20px;
            text-indent: 8px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        th, td {
            border: 1px solid #000;
            padding: 10px;
            vertical-align: middle;
        }
        .bg-grey {
            background-color: #F0F2F5 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            text-align: center;
            font-weight: bold;
            font-size: 14px;
        }
        .center {
            text-align: center;
            font-size: 14px;
        }
        .left {
            text-align: left;
            font-size: 14px;
        }
        .btn-area {
            text-align: right;
            margin-bottom: 20px;
        }
        .print-btn {
            background: #1a2f52;
            color: #fff;
            border: none;
            padding: 12px 24px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 6px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(26, 47, 82, 0.2);
            transition: all 0.2s ease;
        }
        .print-btn:hover {
            background: #101d33;
            transform: translateY(-1px);
        }
    </style>
</head>
<body>
    <div class="btn-area no-print">
        <button class="print-btn" onclick="window.print()">인쇄 / PDF로 저장</button>
    </div>
    <div class="title">순 찰 일 지</div>
    
    <!-- 1. 기본 정보 표 -->
    <table>
        <colgroup>
            <col width="12%">
            <col width="21%">
            <col width="12%">
            <col width="21%">
            <col width="12%">
            <col width="22%">
        </colgroup>
        <tr>
            <td class="bg-grey">근무일자</td>
            <td class="center">${escapeHtml(dateVal)}</td>
            <td class="bg-grey">시간</td>
            <td class="center">${escapeHtml(timeVal)}</td>
            <td class="bg-grey">구분</td>
            <td class="center">${escapeHtml(typeVal)}</td>
        </tr>
        <tr>
            <td class="bg-grey">순찰 장소</td>
            <td class="left" colspan="5">${escapeHtml(placeVal)}</td>
        </tr>
        <tr>
            <td class="bg-grey">인원</td>
            <td class="left" colspan="5">${escapeHtml(officerVal)}</td>
        </tr>
    </table>
    
    <!-- 2. 시간대별 순찰 특이사항 표 -->
    <table>
        <colgroup>
            <col width="20%">
            <col width="25%">
            <col width="55%">
        </colgroup>
        <thead>
            <tr>
                <td class="bg-grey">시간</td>
                <td class="bg-grey">장소</td>
                <td class="bg-grey">특이사항</td>
            </tr>
        </thead>
        <tbody>
            ${timelineRows}
        </tbody>
    </table>
    
    <!-- 3. 특이사항 내역 표 -->
    <table>
        <colgroup>
            <col width="20%">
            <col width="25%">
            <col width="55%">
        </colgroup>
        <tr>
            <td class="bg-grey" colspan="3">특이사항 내역</td>
        </tr>
        ${incidentTimelineRows}
    </table>
    
</body>
</html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
}

/**
 * 마우스 드래그 가로 스크롤 (Drag to Scroll) 인터랙션 헬퍼
 */
function enableDragScroll(selector) {
    const slider = document.querySelector(selector);
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'pointer';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'pointer';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // 스크롤 감도 배율
        slider.scrollLeft = scrollLeft - walk;
    });
    
    // 기본 cursor 모양 세팅
    slider.style.cursor = 'pointer';
}

// ═══════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function formatTimeHM(date) {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function parseTimeStr(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d.getTime();
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function showToast(message, type = 'info') {
    const container = $('#toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = { success: '✓', error: '✕', info: 'ℹ' };
    toast.innerHTML = `<span>${icons[type] || ''}</span> ${escapeHtml(message)}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
}

// ─── Time Edit Popup Control (Figma Modal) ───
let currentTimeEditIdx = null;

function initTimeEditPopup() {
    // Populate minutes select options (00 to 59)
    const startMin = $('#selectStartMin');
    const endMin = $('#selectEndMin');
    
    startMin.innerHTML = '';
    endMin.innerHTML = '';
    
    for (let i = 0; i < 60; i++) {
        const val = String(i).padStart(2, '0');
        const optStart = document.createElement('option');
        optStart.value = val;
        optStart.textContent = `${val}분`;
        startMin.appendChild(optStart);
        
        const optEnd = document.createElement('option');
        optEnd.value = val;
        optEnd.textContent = `${val}분`;
        endMin.appendChild(optEnd);
    }
    
    // Bind overlay click events
    $('#btnTimeEditCancel').addEventListener('click', closeTimeEditPopup);
    $('#btnTimeEditSubmit').addEventListener('click', submitTimeEdit);
    
    // Also close on background overlay click
    $('#timeEditOverlay').addEventListener('click', (e) => {
        if (e.target === $('#timeEditOverlay')) closeTimeEditPopup();
    });
}

function openTimeEditPopup(idx) {
    currentTimeEditIdx = idx;
    const pt = State.patrolPoints[idx];
    
    // Set default select values based on pt.arrivalTime
    if (pt.arrivalTime) {
        const parsed = parseTimeHMStr(pt.arrivalTime);
        $('#selectStartHour').value = parsed.hour;
        $('#selectStartMin').value = parsed.min;
        $('#selectStartAmpm').value = parsed.ampm;
    }
    
    // Set default select values based on pt.departureTime
    if (pt.departureTime) {
        const parsed = parseTimeHMStr(pt.departureTime);
        $('#selectEndHour').value = parsed.hour;
        $('#selectEndMin').value = parsed.min;
        $('#selectEndAmpm').value = parsed.ampm;
    } else if (pt.arrivalTime) {
        // Fallback: copy start time
        const parsed = parseTimeHMStr(pt.arrivalTime);
        $('#selectEndHour').value = parsed.hour;
        $('#selectEndMin').value = parsed.min;
        $('#selectEndAmpm').value = parsed.ampm;
    }
    
    $('#timeEditOverlay').classList.add('active');
}

function closeTimeEditPopup() {
    $('#timeEditOverlay').classList.remove('active');
    currentTimeEditIdx = null;
}

function submitTimeEdit() {
    if (currentTimeEditIdx === null) return;
    
    const startH = $('#selectStartHour').value;
    const startM = $('#selectStartMin').value;
    const startA = $('#selectStartAmpm').value;
    
    const endH = $('#selectEndHour').value;
    const endM = $('#selectEndMin').value;
    const endA = $('#selectEndAmpm').value;
    
    // Format to HH:MM format
    const startTime24 = convertTo24h(startH, startM, startA);
    const endTime24 = convertTo24h(endH, endM, endA);
    
    State.patrolPoints[currentTimeEditIdx].arrivalTime = startTime24;
    State.patrolPoints[currentTimeEditIdx].departureTime = endTime24;
    
    // Recalculate summary totalTime based on new point times
    if (State.currentPatrol) {
        const times = State.patrolPoints.filter(pt => pt.arrivalTime).map(pt => pt.arrivalTime);
        const departures = State.patrolPoints.filter(pt => pt.departureTime).map(pt => pt.departureTime);
        if (times.length > 0 && departures.length > 0) {
            const first = parseTimeStr(times[0]);
            const last = parseTimeStr(departures[departures.length - 1]);
            const totalMinutes = (last - first) / 60000;
            if (totalMinutes > 0 && State.currentPatrol.summary) {
                State.currentPatrol.summary.totalTime = Math.round(totalMinutes);
            }
        }
        State.currentPatrol.points = State.patrolPoints;
    }
    
    closeTimeEditPopup();
    
    // Save to server
    savePatrolToServer();

    // Dynamically refresh the current screen
    if (State.currentScreen === 'PatrolEnd') {
        renderPatrolEnd();
    } else if (State.currentScreen === 'Report') {
        renderReport();
    } else {
        if (typeof renderPatrolTimeline === 'function') {
            renderPatrolTimeline();
        }
        updatePatrolMapMarkers();
    }
    
    showToast('시간이 수정되었습니다.', 'success');
}

// ─── Utilities for Time ───
function parseTimeHMStr(timeStr) {
    // Input format: HH:MM (24h)
    const [hStr, mStr] = timeStr.split(':');
    let h = parseInt(hStr);
    const min = mStr;
    let ampm = 'AM';
    
    if (h >= 12) {
        ampm = 'PM';
        if (h > 12) h -= 12;
    } else if (h === 0) {
        h = 12;
    }
    
    return {
        hour: String(h).padStart(2, '0'),
        min: min,
        ampm: ampm
    };
}

function convertTo24h(hStr, mStr, ampm) {
    let h = parseInt(hStr);
    if (ampm === 'PM' && h < 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${mStr}`;
}

async function handleEditPatrolDate() {
    if (!State.currentPatrol) return;
    const newVal = prompt("순찰 날짜를 수정하십시오 (YYYY-MM-DD):", State.currentPatrol.date);
    if (newVal !== null) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (dateRegex.test(newVal.trim())) {
            State.currentPatrol.date = newVal.trim();
            
            // Save to server
            await savePatrolToServer();
            
            // Update UI
            const parsed = new Date(State.currentPatrol.date);
            const m = parsed.getMonth() + 1;
            const d = parsed.getDate();
            const label = `${m}월 ${d}일 순찰일지`;
            
            const optEnd = $('#patrolEndLogOption');
            if (optEnd) optEnd.textContent = label;
            
            const optProgress = $('#patrolLogOption');
            if (optProgress) optProgress.textContent = label;
            
            if (State.currentScreen === 'PatrolEnd') {
                renderPatrolEnd();
            } else if (State.currentScreen === 'Report') {
                renderReport();
            }
            
            showToast('순찰 날짜가 수정되었습니다.', 'success');
        } else {
            showToast('올바른 날짜 형식(YYYY-MM-DD)으로 입력하십시오.', 'error');
        }
    }
}
