const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { generateHwpx } = require('./hwpx-generator');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'records.json');
const PATROLS_FILE = path.join(__dirname, 'data', 'patrols.json');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    }
}));

// 데이터 파일 및 리포트 폴더가 없으면 생성
function ensureDirectories() {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
    if (!fs.existsSync(PATROLS_FILE)) fs.writeFileSync(PATROLS_FILE, '[]', 'utf8');

    const reportDir = path.join(__dirname, 'reports');
    if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
}

// 기록 읽기/쓰기
function readRecords() {
    ensureDirectories();
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeRecords(records) {
    ensureDirectories();
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf8');
}

// 순찰 읽기/쓰기
function readPatrols() {
    ensureDirectories();
    return JSON.parse(fs.readFileSync(PATROLS_FILE, 'utf8'));
}

function writePatrols(patrols) {
    ensureDirectories();
    fs.writeFileSync(PATROLS_FILE, JSON.stringify(patrols, null, 2), 'utf8');
}

// ─── 기존 Records API (하위 호환) ───

app.get('/api/records', (req, res) => {
    try {
        const records = readRecords();
        res.json({ success: true, records });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/records', (req, res) => {
    try {
        const { latitude, longitude, address, startTime, endTime, activity, note } = req.body;
        if (!latitude || !longitude || !startTime || !endTime || !activity) {
            return res.status(400).json({
                success: false,
                error: '필수 항목을 모두 입력해주세요.'
            });
        }

        const record = {
            id: uuidv4(),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            address: address || '',
            startTime, endTime, activity,
            note: note || '',
            createdAt: new Date().toISOString()
        };

        const records = readRecords();
        records.push(record);
        writeRecords(records);
        res.json({ success: true, record });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/api/records/:id', (req, res) => {
    try {
        let records = readRecords();
        const before = records.length;
        records = records.filter(r => r.id !== req.params.id);
        if (records.length === before) {
            return res.status(404).json({ success: false, error: '해당 기록을 찾을 수 없습니다.' });
        }
        writeRecords(records);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ─── 순찰 관리 API ───

// GET /api/patrols — 순찰 목록 조회
app.get('/api/patrols', (req, res) => {
    try {
        const patrols = readPatrols();
        res.json({ success: true, patrols });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/patrols/:id — 순찰 상세 조회
app.get('/api/patrols/:id', (req, res) => {
    try {
        const patrols = readPatrols();
        const patrol = patrols.find(p => p.id === req.params.id);
        if (!patrol) {
            return res.status(404).json({ success: false, error: '순찰을 찾을 수 없습니다.' });
        }
        res.json({ success: true, patrol });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/patrols — 새 순찰 시작
app.post('/api/patrols', (req, res) => {
    try {
        const { date, members, course, coursePoints, organization } = req.body;

        if (!date || !members || !course) {
            return res.status(400).json({
                success: false,
                error: '날짜, 인원, 코스를 모두 입력해주세요.'
            });
        }

        const patrol = {
            id: uuidv4(),
            date,
            members: members || [],
            course,
            coursePoints: coursePoints || [],
            organization: organization || '해양경찰청 중부지방해양경찰청 인천해양경찰서 인항파출소',
            status: 'in_progress',
            points: [],
            summary: {
                totalDistance: 0,
                totalTime: 0,
                patrolMethod: '도보 및 차량'
            },
            createdAt: new Date().toISOString()
        };

        const patrols = readPatrols();
        patrols.push(patrol);
        writePatrols(patrols);
        res.json({ success: true, patrol });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// PUT /api/patrols/:id — 순찰 업데이트 (포인트 추가 등)
app.put('/api/patrols/:id', (req, res) => {
    try {
        const patrols = readPatrols();
        const idx = patrols.findIndex(p => p.id === req.params.id);
        if (idx === -1) {
            return res.status(404).json({ success: false, error: '순찰을 찾을 수 없습니다.' });
        }

        const updates = req.body;
        // 허용되는 필드만 업데이트 (날짜 편집 지원을 위해 date 추가, GPS 트래킹을 위해 관련 필드 추가)
        const allowedFields = ['points', 'summary', 'status', 'members', 'course', 'coursePoints', 'date', 'visitLog', 'gpsTrackPoints', 'gpsSummary'];
        allowedFields.forEach(field => {
            if (updates[field] !== undefined) {
                patrols[idx][field] = updates[field];
            }
        });
        patrols[idx].updatedAt = new Date().toISOString();

        writePatrols(patrols);
        res.json({ success: true, patrol: patrols[idx] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE /api/patrols/:id — 순찰 삭제
app.delete('/api/patrols/:id', (req, res) => {
    try {
        let patrols = readPatrols();
        const before = patrols.length;
        patrols = patrols.filter(p => p.id !== req.params.id);
        if (patrols.length === before) {
            return res.status(404).json({ success: false, error: '해당 순찰 기록을 찾을 수 없습니다.' });
        }
        writePatrols(patrols);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// PUT /api/patrols/:id/end — 순찰 종료
app.put('/api/patrols/:id/end', (req, res) => {
    try {
        const patrols = readPatrols();
        const idx = patrols.findIndex(p => p.id === req.params.id);
        if (idx === -1) {
            return res.status(404).json({ success: false, error: '순찰을 찾을 수 없습니다.' });
        }

        patrols[idx].status = 'completed';
        patrols[idx].completedAt = new Date().toISOString();

        // 요약 정보 업데이트
        if (req.body.summary) {
            patrols[idx].summary = { ...patrols[idx].summary, ...req.body.summary };
        }

        writePatrols(patrols);
        res.json({ success: true, patrol: patrols[idx] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/patrols/:id/report — 순찰 보고서 HWPX 생성
app.post('/api/patrols/:id/report', async (req, res) => {
    try {
        const patrols = readPatrols();
        const patrol = patrols.find(p => p.id === req.params.id);
        if (!patrol) {
            return res.status(404).json({ success: false, error: '순찰을 찾을 수 없습니다.' });
        }

        // 순찰 포인트를 records 형태로 변환
        const records = patrol.points.map(pt => ({
            latitude: pt.lat || 0,
            longitude: pt.lng || 0,
            address: pt.location || '',
            startTime: `${patrol.date}T${pt.arrivalTime || '00:00'}:00.000Z`,
            endTime: `${patrol.date}T${pt.departureTime || pt.arrivalTime || '00:00'}:00.000Z`,
            activity: pt.memo || '순찰',
            note: ''
        }));

        if (records.length === 0) {
            return res.status(400).json({ success: false, error: '순찰 기록이 없습니다.' });
        }

        records.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        const authorName = patrol.members.join(', ');
        const reportDate = new Date().toISOString();
        const hwpxBuffer = await generateHwpx(records, authorName, reportDate, patrol.course);

        const filename = `순찰일지_${patrol.date}.hwpx`;
        const reportPath = path.join(__dirname, 'reports', filename);
        fs.writeFileSync(reportPath, hwpxBuffer);
        console.log(`✅ 순찰 보고서 저장됨: ${reportPath}`);

        res.setHeader('Content-Type', 'application/hwp+zip');
        res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
        res.setHeader('Content-Length', hwpxBuffer.length);
        res.send(hwpxBuffer);
    } catch (err) {
        console.error('보고서 생성 오류:', err);
        res.status(500).json({ success: false, error: '보고서 생성에 실패했습니다: ' + err.message });
    }
});

// 기존 보고서 생성 (하위 호환)
app.post('/api/generate-report', async (req, res) => {
    try {
        const { recordIds, authorName } = req.body;
        const allRecords = readRecords();

        let selectedRecords;
        if (recordIds && recordIds.length > 0) {
            selectedRecords = allRecords.filter(r => recordIds.includes(r.id));
        } else {
            selectedRecords = allRecords;
        }

        if (selectedRecords.length === 0) {
            return res.status(400).json({ success: false, error: '보고서에 포함할 기록이 없습니다.' });
        }

        selectedRecords.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        const reportDate = new Date().toISOString();
        const hwpxBuffer = await generateHwpx(selectedRecords, authorName || '', reportDate, selectedRecords[0]?.course || '1코스');

        const today = new Date();
        const dateStr = today.getFullYear() +
            String(today.getMonth() + 1).padStart(2, '0') +
            String(today.getDate()).padStart(2, '0') + '_' +
            String(today.getHours()).padStart(2, '0') +
            String(today.getMinutes()).padStart(2, '0') +
            String(today.getSeconds()).padStart(2, '0');
        const filename = `일지보고서_${dateStr}.hwpx`;

        const reportPath = path.join(__dirname, 'reports', filename);
        fs.writeFileSync(reportPath, hwpxBuffer);
        console.log(`✅ 보고서 저장됨: ${reportPath}`);

        res.setHeader('Content-Type', 'application/hwp+zip');
        res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
        res.setHeader('Content-Length', hwpxBuffer.length);
        res.setHeader('X-Report-Path', encodeURIComponent(reportPath));
        res.send(hwpxBuffer);
    } catch (err) {
        console.error('보고서 생성 오류:', err);
        res.status(500).json({ success: false, error: '보고서 생성에 실패했습니다: ' + err.message });
    }
});

// ─── AI 엔진 ───

// 1. AI 특이사항 분류 엔진 (키워드 매칭 기반)
const AI_CATEGORIES = {
    '안전계도': {
        keywords: ['구명조끼', '미착용', '계도', '안전', '주취자', '음주', '위험행위', '위험', '낚시객', '수영', '입수', '안전교육', '안전장비', '안전수칙', '경고', '주의', '해수욕', '물놀이'],
        icon: '🛡️',
        color: '#3182ce'
    },
    '위험요소 발견': {
        keywords: ['파손', '누수', '균열', '붕괴', '위험', '고장', '손상', '노후', '침수', '유출', '기름', '오염', '표류', '부유물', '표류물', '장애물'],
        icon: '⚠️',
        color: '#e53e3e'
    },
    '민원 대응': {
        keywords: ['민원', '신고', '소음', '불법주차', '주차', '항의', '분쟁', '갈등', '소란', '진정', '요청', '요구', '불만', '피해', '악취'],
        icon: '📋',
        color: '#d69e2e'
    },
    '시설 점검': {
        keywords: ['점검', '시설', '방파제', '부두', '잔교', '난간', '조명', 'CCTV', '소화기', '구명환', '계류', '정박', '보수', '정비', '수리'],
        icon: '🔧',
        color: '#38a169'
    },
    '단속 활동': {
        keywords: ['단속', '불법', '무허가', '어업', '밀수', '밀입국', '불법조업', '무면허', '과적', '위반', '적발', '검거', '체포', '수색', '조사'],
        icon: '🚨',
        color: '#805ad5'
    }
};

function classifyMemo(memoText) {
    const trimmed = (memoText || '').trim();
    if (!trimmed || trimmed === '' || trimmed === '이상 없음' || trimmed === '이상없음' || trimmed === '내용을 입력해주세요') {
        return { category: '이상 없음', confidence: 1.0, icon: '✅', color: '#a0aec0' };
    }

    const text = memoText.toLowerCase();
    let bestCategory = null;
    let bestScore = 0;

    for (const [category, config] of Object.entries(AI_CATEGORIES)) {
        let score = 0;
        for (const keyword of config.keywords) {
            if (text.includes(keyword.toLowerCase())) {
                score += 1;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestCategory = category;
        }
    }

    if (bestCategory && bestScore > 0) {
        const config = AI_CATEGORIES[bestCategory];
        return {
            category: bestCategory,
            confidence: Math.min(0.95, 0.5 + bestScore * 0.15),
            icon: config.icon,
            color: config.color
        };
    }

    // 기본 분류: 키워드 매치 없으면 안전계도로 분류 (순찰 중 발견한 사항)
    return { category: '안전계도', confidence: 0.6, icon: '🛡️', color: '#3182ce' };
}

// 2. AI 순찰일지 자동 생성 엔진 (템플릿 기반, 기관 표준 문체)
function generateAIReport(patrol) {
    if (!patrol) return '';

    const pts = patrol.points || [];
    if (pts.length === 0) return '';

    const rawDate = patrol.date || new Date().toISOString().split('T')[0];
    const dateParts = rawDate.split('-');
    const dateFormatted = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]}`;

    const firstPt = pts[0] || {};
    const lastPt = pts[pts.length - 1] || firstPt;
    const startTime = firstPt.arrivalTime || '00:00';
    const endTime = lastPt.departureTime || lastPt.arrivalTime || '00:00';

    const courseName = patrol.course || '순찰 코스';
    const members = patrol.members || [];
    const memberStr = members.join(', ');

    // 구역명 추출
    const locations = pts.map(pt => {
        const loc = pt.location || '';
        const match = loc.match(/\(([^)]+)\)/);
        return match ? match[1] : loc;
    }).filter(Boolean);
    const uniqueLocations = [...new Set(locations)];
    const locationStr = uniqueLocations.join(' 및 ');

    // 특이사항 분류 통계
    const classifiedMemos = pts
        .filter(pt => pt.memo && pt.memo !== '이상 없음' && pt.memo !== '이상없음' && pt.memo !== '' && pt.memo !== '해안순찰 전 안전교육 실시' && pt.memo !== '내용을 입력해주세요')
        .map(pt => ({
            ...pt,
            classification: classifyMemo(pt.memo)
        }));

    const categoryCount = {};
    classifiedMemos.forEach(m => {
        const cat = m.classification.category;
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    // 순찰일지 본문 생성 (기관 표준 문체: ~함, ~실시함, ~조치함)
    let report = `${dateFormatted} ${startTime}~${endTime} `;
    report += `${patrol.organization || '인항파출소'} 관할구역 ${courseName} 순찰 실시. `;
    report += `${memberStr} ${pts.length}개 구역(${locationStr}) 일대를 점검하였으며`;

    if (classifiedMemos.length > 0) {
        const details = [];
        for (const [cat, count] of Object.entries(categoryCount)) {
            details.push(`${cat} ${count}건`);
        }
        report += `, ${details.join(', ')}을 처리함. `;

        // 상세 내역 추가
        classifiedMemos.forEach(m => {
            const locName = m.location ? m.location.split('(')[0] : '';
            report += `${locName} ${m.memo} 조치 완료. `;
        });
    } else {
        report += '. 특이사항 없음. ';
    }

    // GPS 기반 시간대별 경로 요약 추가
    const visitLog = patrol.visitLog || [];
    if (visitLog.length > 0) {
        const routeParts = [];
        const seenCodes = new Set();
        visitLog.forEach((entry, idx) => {
            const key = `${entry.code}-${entry.arrivalTime}`;
            if (!seenCodes.has(key)) {
                seenCodes.add(key);
                const name = (entry.locationName || '').split('(')[0].trim();
                if (idx === 0) {
                    routeParts.push(`${entry.arrivalTime} ${name} 출발`);
                } else {
                    routeParts.push(`${entry.arrivalTime} ${name} 도착`);
                }
            }
        });
        if (routeParts.length > 0) {
            report += `[GPS 순찰 경로] ${routeParts.join(' → ')}. `;
        }
    } else if (patrol.gpsSummary) {
        report += `[GPS 순찰 경로] ${patrol.gpsSummary}. `;
    }

    const distanceStr = patrol.summary?.totalDistance || 0;
    report += `순찰 소요시간 약 ${patrol.summary?.totalTime || 0}분, 이동거리 약 ${distanceStr}km, 이상 없음.`;

    return report;
}

// 3. AI 패턴 분석 엔진 (누적 데이터 분석)
function analyzePatterns(patrols) {
    const completedPatrols = patrols.filter(p => p.status === 'completed');
    if (completedPatrols.length === 0) {
        return { insights: [], stats: {} };
    }

    const insights = [];
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // 구역별 특이사항 빈도 분석
    const zoneIncidents = {};
    const zoneMemoMap = {};
    const zonePatrolCount = {};

    completedPatrols.forEach(p => {
        (p.points || []).forEach(pt => {
            const loc = pt.location || '알 수 없음';
            const zoneCode = pt.code || loc.charAt(0);

            if (!zonePatrolCount[zoneCode]) zonePatrolCount[zoneCode] = { count: 0, name: loc };
            zonePatrolCount[zoneCode].count++;

            if (pt.memo && pt.memo !== '이상 없음' && pt.memo !== '이상없음' && pt.memo !== '' && pt.memo !== '해안순찰 전 안전교육 실시' && pt.memo !== '내용을 입력해주세요') {
                if (!zoneIncidents[zoneCode]) zoneIncidents[zoneCode] = { count: 0, name: loc, memos: [] };
                zoneIncidents[zoneCode].count++;
                zoneIncidents[zoneCode].memos.push(pt.memo);

                // 메모별 분류 카운트
                const classification = classifyMemo(pt.memo);
                if (!zoneMemoMap[zoneCode]) zoneMemoMap[zoneCode] = {};
                zoneMemoMap[zoneCode][classification.category] = (zoneMemoMap[zoneCode][classification.category] || 0) + 1;
            }
        });
    });

    // 인사이트 1: 반복 발생 패턴
    for (const [code, data] of Object.entries(zoneIncidents)) {
        if (data.count >= 2) {
            const topCategories = zoneMemoMap[code] ? Object.entries(zoneMemoMap[code]).sort((a, b) => b[1] - a[1]) : [];
            const topCat = topCategories[0];
            if (topCat) {
                insights.push({
                    type: 'warning',
                    icon: '🔄',
                    title: '반복 발생 패턴 감지',
                    message: `${data.name.split('(')[0]}에서 '${topCat[0]}' 관련 특이사항이 ${data.count}회 반복 발생하고 있습니다.`,
                    priority: 'high'
                });
            }
        }
    }

    // 인사이트 2: 순찰 빈도 분석 (최근 순찰이 적은 구역)
    const allZoneCodes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const recentPatrols = completedPatrols.filter(p => new Date(p.date) >= thirtyDaysAgo);
    const recentZoneCounts = {};

    recentPatrols.forEach(p => {
        (p.points || []).forEach(pt => {
            const code = pt.code || '';
            recentZoneCounts[code] = (recentZoneCounts[code] || 0) + 1;
        });
    });

    allZoneCodes.forEach(code => {
        const total = zonePatrolCount[code]?.count || 0;
        const recent = recentZoneCounts[code] || 0;
        if (total > 0 && recent === 0) {
            insights.push({
                type: 'info',
                icon: '📉',
                title: '순찰 빈도 감소',
                message: `${zonePatrolCount[code]?.name?.split('(')[0] || code + '구역'}은 최근 30일간 순찰이 실시되지 않았습니다. 순찰 강화를 권고합니다.`,
                priority: 'medium'
            });
        }
    });

    // 인사이트 3: 전체 통계
    const totalCategories = {};
    completedPatrols.forEach(p => {
        (p.points || []).forEach(pt => {
            if (pt.memo && pt.memo !== '이상 없음' && pt.memo !== '이상없음' && pt.memo !== '' && pt.memo !== '해안순찰 전 안전교육 실시' && pt.memo !== '내용을 입력해주세요') {
                const cls = classifyMemo(pt.memo);
                totalCategories[cls.category] = (totalCategories[cls.category] || 0) + 1;
            }
        });
    });

    // 인사이트 4: 가장 많은 카테고리
    const sortedCategories = Object.entries(totalCategories).sort((a, b) => b[1] - a[1]);
    if (sortedCategories.length > 0) {
        const [topCat, topCount] = sortedCategories[0];
        insights.push({
            type: 'success',
            icon: '📊',
            title: '주요 활동 분석',
            message: `전체 순찰 기간 중 '${topCat}' 활동이 ${topCount}건으로 가장 많이 발생하였습니다.`,
            priority: 'low'
        });
    }

    return {
        insights,
        stats: {
            totalPatrols: completedPatrols.length,
            totalPoints: completedPatrols.reduce((sum, p) => sum + (p.points?.length || 0), 0),
            categoryBreakdown: totalCategories,
            zoneIncidentCounts: Object.fromEntries(
                Object.entries(zoneIncidents).map(([k, v]) => [k, { count: v.count, name: v.name }])
            )
        }
    };
}

// 4. AI 품질 점검 엔진
function checkQuality(patrol) {
    let score = 100;
    const checks = [
        { name: '순찰 일시', status: 'success', message: '순찰 일시 기재 완료' },
        { name: '순찰 장소', status: 'success', message: '순찰 장소 기재 완료' },
        { name: '순찰 유형', status: 'success', message: '순찰 유형 선택 완료' },
        { name: '특이사항', status: 'success', message: '특이사항 기재 완료' },
        { name: '조치 내용', status: 'success', message: '조치 결과 기재 완료' },
        { name: '순찰 결과', status: 'success', message: '순찰 결과 기재 완료' }
    ];
    const suggestions = [];

    if (!patrol) {
        return {
            score: 0,
            checks: checks.map(c => ({ ...c, status: 'error', message: '데이터 누락' })),
            suggestions: ['순찰 데이터가 전달되지 않았습니다.'],
            styleCheck: { status: 'warning', message: '점검 불가' }
        };
    }

    // 1. 순찰 일시 검증
    if (!patrol.date) {
        score -= 15;
        checks[0].status = 'warning';
        checks[0].message = '순찰 날짜 누락';
        suggestions.push('순찰 날짜가 기재되지 않았습니다.');
    }
    const pts = patrol.points || [];
    const hasTimes = pts.some(pt => pt.arrivalTime || pt.departureTime);
    if (!hasTimes) {
        score -= 10;
        checks[0].status = 'warning';
        checks[0].message = '순찰 시간 정보 부족';
        suggestions.push('순찰 지점별 도착/출발 시간이 누락되었습니다.');
    }

    // 2. 순찰 장소 검증
    if (pts.length === 0) {
        score -= 20;
        checks[1].status = 'warning';
        checks[1].message = '순찰 지점 없음';
        suggestions.push('순찰한 장소(경로 지점)가 등록되지 않았습니다.');
    } else {
        const missingLocationNames = pts.some(pt => !pt.location);
        if (missingLocationNames) {
            score -= 5;
            checks[1].status = 'warning';
            checks[1].message = '일부 지명 누락';
            suggestions.push('순찰 경로 지점의 상세 명칭을 모두 기재해 주세요.');
        }
    }

    // 3. 순찰 유형 검증
    const patrolType = patrol.patrolType || patrol.patrolMethod || (patrol.summary && patrol.summary.patrolMethod) || patrol.course;
    if (!patrolType) {
        score -= 15;
        checks[2].status = 'warning';
        checks[2].message = '순찰 유형 누락';
        suggestions.push('도보, 차량, 해안, 해상 등 순찰 수단/종류를 선택해 주세요.');
    }

    // 4. 특이사항 검증
    const allMemos = pts.map(pt => pt.memo || '').join(' ').trim();
    const hasValidMemo = pts.some(pt => pt.memo && pt.memo.trim() !== '' && !pt.memo.includes('특이사항 없음'));
    if (!allMemos || allMemos.length === 0) {
        score -= 15;
        checks[3].status = 'warning';
        checks[3].message = '특이사항 미입력';
        suggestions.push('순찰 중 발생한 특이사항 또는 점검 내용을 상세히 기재해 주세요.');
    } else if (!hasValidMemo) {
        score -= 5;
        checks[3].status = 'info';
        checks[3].message = '단순 특이사항 없음';
        suggestions.push('구체적인 점검 항목(예: 시설 파손 여부, 주차 상태 등)을 보완하는 것을 권장합니다.');
    }

    // 5. 조치 내용 검증 (개별 메모 단위 검증)
    const actionKeywords = ['계도', '조치', '안내', '대응', '처리', '통제', '이동', '훈방', '단속', '점검', '수리', '보수', '전달', '보고', '신고', '요청', '완료', '실시'];
    // 문제 상황을 나타내는 카테고리 (조치 내용이 반드시 함께 기재되어야 하는 분류)
    const problemCategories = ['위험요소 발견', '민원 대응'];

    // 각 메모별로 분류 후, 문제 카테고리에 해당하는 메모에 조치 내용이 있는지 개별 검증
    const missingActionMemos = [];
    const shortActionMemos = [];
    let hasAnyAction = false;

    pts.forEach(pt => {
        const memo = (pt.memo || '').trim();
        if (!memo || memo === '이상 없음' || memo === '이상없음' || memo === '내용을 입력해주세요') return;

        const classification = classifyMemo(memo);
        const memoHasAction = actionKeywords.some(kw => memo.includes(kw));

        if (memoHasAction) hasAnyAction = true;

        // 문제 카테고리(위험요소 발견, 민원 대응)인 경우 해당 메모 안에 조치 키워드가 있어야 함
        if (problemCategories.includes(classification.category)) {
            if (!memoHasAction) {
                // 위험/민원을 발견했으나 조치 내용이 전혀 없음
                missingActionMemos.push({ location: pt.location || '미상', memo, category: classification.category });
            } else if (memo.length < 20) {
                // 조치 키워드는 있지만 너무 짧아 구체성 부족
                shortActionMemos.push({ location: pt.location || '미상', memo, category: classification.category });
            }
        }
    });

    if (missingActionMemos.length > 0) {
        // 문제 발견 후 조치 내용 미기재 (심각)
        score -= 15;
        checks[4].status = 'warning';
        checks[4].message = `조치 결과 미기재 (${missingActionMemos.length}건)`;
        const details = missingActionMemos.map(m => `"${m.memo}" (${m.category})`).join(', ');
        suggestions.push(`다음 특이사항에 대한 조치 결과가 누락되었습니다: ${details}. 발견 후 어떻게 조치했는지(보고, 수리 요청, 통제 등)를 반드시 기재해 주세요.`);
    } else if (shortActionMemos.length > 0) {
        // 조치 키워드는 있으나 구체성 부족
        score -= 10;
        checks[4].status = 'info';
        checks[4].message = '조치 키워드 확인되나 상세 내용 부족';
        suggestions.push('조치 키워드(대응, 조치 등)는 확인되지만, 구체적인 해결 방식이나 결과를 보다 상세히 기재해 주세요. (예: "어떻게 대응했는지", "결과가 어떠했는지")');
    } else if (!hasAnyAction && allMemos.length > 0) {
        // 전체적으로 조치 관련 내용 없음
        score -= 15;
        checks[4].status = 'warning';
        checks[4].message = '조치 결과 미기재';
        suggestions.push('순찰 중 발생한 사항에 대한 조치 결과(계도 건수, 조치 내용 등)를 구체적으로 추가해 주세요.');
    }

    // 6. 순찰 결과 검증
    if (pts.length > 0 && pts.every(pt => !pt.arrivalTime && !pt.departureTime)) {
        score -= 10;
        checks[5].status = 'warning';
        checks[5].message = '순찰 결과 미완성';
        suggestions.push('순찰 활동의 최종 결과를 완성하기 위해 시간 정보를 확인해 주세요.');
    }

    // 7. 문체 표준화 및 표현 통일 점검
    let hasConversational = false;
    const conversationalRegex = /(습니다|니다|해요|지요|네요|고요|합니다|했습니다)/;
    if (conversationalRegex.test(allMemos)) {
        hasConversational = true;
    }

    const styleCheck = {
        status: 'success',
        message: '표준 문체 적용 완료 및 표현 통일 완료'
    };

    if (hasConversational) {
        score -= 10;
        styleCheck.status = 'warning';
        styleCheck.message = '구어체 감지: 공문서 표준 문체 적용 필요';
        suggestions.push('보고서에 구어체(~습니다, ~해요)가 포함되어 있습니다. 공문서형 표준 종결어미(~함, ~실시함, ~조치함)로 통일하는 것이 좋습니다.');
    }

    // 시간 순서 검증
    let hasTimeOrderError = false;
    for (let i = 1; i < pts.length; i++) {
        if (pts[i].arrivalTime && pts[i - 1].departureTime) {
            if (pts[i].arrivalTime < pts[i - 1].departureTime) {
                hasTimeOrderError = true;
            }
        }
    }
    if (hasTimeOrderError) {
        score -= 10;
        suggestions.push('도착 시간이 이전 구역의 출발 시간보다 앞선 지점이 존재합니다. 시간 순서를 검토해 주세요.');
    }

    return {
        score: Math.max(0, score),
        checks,
        suggestions,
        styleCheck
    };
}

// ─── AI API 엔드포인트 ───

// POST /api/ai/classify — 특이사항 분류
app.post('/api/ai/classify', (req, res) => {
    try {
        const { memo } = req.body;
        const result = classifyMemo(memo);
        res.json({ success: true, result });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/ai/generate-report — 순찰일지 자동 생성
app.post('/api/ai/generate-report', (req, res) => {
    try {
        const { patrolId } = req.body;
        let patrol = null;

        if (patrolId) {
            const patrols = readPatrols();
            patrol = patrols.find(p => p.id === patrolId);
        } else {
            patrol = req.body.patrol;
        }

        if (!patrol) {
            return res.status(404).json({ success: false, error: '순찰 데이터를 찾을 수 없습니다.' });
        }

        const report = generateAIReport(patrol);

        // 각 포인트별 분류 결과도 함께 반환
        const classifications = (patrol.points || []).map(pt => ({
            location: pt.location,
            memo: pt.memo,
            classification: classifyMemo(pt.memo)
        }));

        res.json({ success: true, report, classifications });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// GET /api/ai/pattern-analysis — 패턴 분석
app.get('/api/ai/pattern-analysis', (req, res) => {
    try {
        const patrols = readPatrols();
        const analysis = analyzePatterns(patrols);
        res.json({ success: true, analysis });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/ai/quality-check — 품질 점검
app.post('/api/ai/quality-check', (req, res) => {
    try {
        const { patrolId } = req.body;
        let patrol = null;

        if (patrolId) {
            const patrols = readPatrols();
            patrol = patrols.find(p => p.id === patrolId);
        } else {
            patrol = req.body.patrol;
        }

        if (!patrol) {
            return res.status(404).json({ success: false, error: '순찰 데이터를 찾을 수 없습니다.' });
        }

        const alerts = checkQuality(patrol);
        res.json({ success: true, alerts });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 메인 페이지
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`\n🚢 ORCA 서비스 실행 중`);
    console.log(`   http://localhost:${PORT}\n`);
});
