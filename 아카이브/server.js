const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { generateHwpx } = require('./hwpx-generator');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'records.json');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 데이터 파일 및 리포트 폴더가 없으면 생성
function ensureDirectories() {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');

    const reportDir = path.join(__dirname, 'reports');
    if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
}

// 기록 읽기
function readRecords() {
    ensureDirectories();
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
}

// 기록 쓰기
function writeRecords(records) {
    ensureDirectories();
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf8');
}

// ─── API 엔드포인트 ───

// GET /api/records — 전체 기록 조회
app.get('/api/records', (req, res) => {
    try {
        const records = readRecords();
        res.json({ success: true, records });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/records — 새 기록 추가
app.post('/api/records', (req, res) => {
    try {
        const { latitude, longitude, address, startTime, endTime, activity, note } = req.body;

        if (!latitude || !longitude || !startTime || !endTime || !activity) {
            return res.status(400).json({
                success: false,
                error: '필수 항목을 모두 입력해주세요. (위치, 시작시간, 종료시간, 활동내용)'
            });
        }

        const record = {
            id: uuidv4(),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            address: address || '',
            startTime,
            endTime,
            activity,
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

// DELETE /api/records/:id — 기록 삭제
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

// POST /api/generate-report — HWPX 보고서 생성 및 다운로드
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

        // 시간순 정렬
        selectedRecords.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

        const reportDate = new Date().toISOString();
        const hwpxBuffer = await generateHwpx(selectedRecords, authorName || '', reportDate);

        const today = new Date();
        const dateStr = today.getFullYear() +
            String(today.getMonth() + 1).padStart(2, '0') +
            String(today.getDate()).padStart(2, '0') + '_' +
            String(today.getHours()).padStart(2, '0') +
            String(today.getMinutes()).padStart(2, '0') +
            String(today.getSeconds()).padStart(2, '0');
        const filename = `일지보고서_${dateStr}.hwpx`;

        // 서버 로컬 디렉토리에 저장 (사용자 편의용)
        const reportPath = path.join(__dirname, 'reports', filename);
        fs.writeFileSync(reportPath, hwpxBuffer);
        console.log(`✅ 보고서 저장됨: ${reportPath}`);

        res.setHeader('Content-Type', 'application/hwp+zip');
        res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
        res.setHeader('Content-Length', hwpxBuffer.length);
        res.setHeader('X-Report-Path', encodeURIComponent(reportPath)); // 경로 정보 전달
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
    console.log(`\n🚢 일지보고서 생성 서비스 실행 중`);
    console.log(`   http://localhost:${PORT}\n`);
});
