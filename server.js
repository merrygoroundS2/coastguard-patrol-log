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
app.use(express.static(path.join(__dirname, 'public')));

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
        // 허용되는 필드만 업데이트 (날짜 편집 지원을 위해 date 추가)
        const allowedFields = ['points', 'summary', 'status', 'members', 'course', 'coursePoints', 'date'];
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

// 메인 페이지
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`\n🚢 순찰로그 AI 서비스 실행 중`);
    console.log(`   http://localhost:${PORT}\n`);
});
