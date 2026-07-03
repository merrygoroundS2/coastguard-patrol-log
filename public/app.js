/**
 * ORCA
 * 해양경찰청 순찰 업무 지원 모바일 SPA
 */

// ═══════════════════════════════════════════
// API MOCK INTERCEPTOR FOR OFFLINE / DEPLOYED ENVIRONMENTS
// ═══════════════════════════════════════════
(function() {
    const isGitHubPages = window.location.hostname.includes('github.io');
    const isFileProtocol = window.location.protocol === 'file:';
    let forceMock = isGitHubPages || isFileProtocol;

    // Seed data from server's patrols.json
    const SEED_PATROLS = [
      {
        "id": "f5e9c85c-25f5-47d3-9880-e29821efd436",
        "date": "2026-06-01",
        "members": ["경사 김민준", "순경 박서연"],
        "course": "해상1코스",
        "coursePoints": [
          { "name": "A구역(인항파출소 및 전용부두)", "lat": 37.4579, "lng": 126.5986 },
          { "name": "C구역(월미도 및 월미산책로)", "lat": 37.472, "lng": 126.596 },
          { "name": "D구역(북성포구 및 만석부두)", "lat": 37.481, "lng": 126.608 },
          { "name": "E구역(화수부두 및 인천내항)", "lat": 37.487, "lng": 126.621 },
          { "name": "H구역(영종대교 및 물치도)", "lat": 37.545, "lng": 126.598 }
        ],
        "organization": "해양경찰청 중부지방해양경찰청 인천해양경찰서 인항파출소",
        "status": "completed",
        "points": [
          { "id": "pt-0-1780380326843", "location": "A구역(인항파출소 및 전용부두)", "code": "A", "detail": "인항파출소 및 전용부두", "lat": 37.4579, "lng": 126.5986, "arrivalTime": "15:05", "departureTime": "15:05", "memo": "해안순찰 전 안전교육 실시", "completed": true },
          { "id": "pt-1-1780380326843", "location": "C구역(월미도 및 월미산책로)", "code": "C", "detail": "월미도 및 월미산책로", "lat": 37.472, "lng": 126.596, "arrivalTime": "15:05", "departureTime": "15:05", "memo": "주취자", "completed": true },
          { "id": "pt-2-1780380326843", "location": "D구역(북성포구 및 만석부두)", "code": "D", "detail": "북성포구 및 만석부두", "lat": 37.481, "lng": 126.608, "arrivalTime": "15:05", "departureTime": "15:05", "memo": "불법주차", "completed": true },
          { "id": "pt-3-1780380326843", "location": "E구역(화수부두 및 인천내항)", "code": "E", "detail": "화수부두 및 인천내항", "lat": 37.487, "lng": 126.621, "arrivalTime": "15:05", "departureTime": "15:05", "memo": "소음신고", "completed": true },
          { "id": "pt-4-1780380326843", "location": "H구역(영종대교 및 물치도)", "code": "H", "detail": "영종대교 및 물치도", "lat": 37.545, "lng": 126.598, "arrivalTime": "15:05", "departureTime": "15:05", "memo": "이상 없음", "completed": true }
        ],
        "summary": { "totalDistance": 5, "totalTime": 2, "patrolMethod": "도보 및 차량", "patrolCount": "5곳" },
        "createdAt": "2026-06-02T06:05:26.839Z",
        "updatedAt": "2026-06-02T06:05:40.070Z"
      },
      {
        "id": "8364ecaa-1d81-42ca-b5d2-db0a659d15ce",
        "date": "2026-06-22",
        "members": ["경사 김민준", "순경 박서연", "경장 이지훈"],
        "course": "해상2코스",
        "coursePoints": [
          { "name": "A구역(인항파출소 및 전용부두)", "lat": 37.4579, "lng": 126.5986 },
          { "name": "B구역(연안부두 및 터미널)", "lat": 37.4536, "lng": 126.5982 },
          { "name": "F구역(석탄부두 및 남항부두)", "lat": 37.442, "lng": 126.602 },
          { "name": "G구역(국제여객터미널 및 송도)", "lat": 37.426, "lng": 126.599 }
        ],
        "organization": "해양경찰청 중부지방해양경찰청 인천해양경찰서 인항파출소",
        "status": "completed",
        "points": [
          { "id": "pt-0-1782110032245", "location": "A구역(인항파출소 및 전용부두)", "code": "A", "detail": "인항파출소 및 전용부두", "lat": 37.4579, "lng": 126.5986, "arrivalTime": "15:33", "departureTime": "15:33", "memo": "해안순찰 전 안전교육 실시", "completed": true },
          { "id": "pt-1-1782110032245", "location": "B구역(연안부두 및 터미널)", "code": "B", "detail": "연안부두 및 터미널", "lat": 37.4536, "lng": 126.5982, "arrivalTime": "15:33", "departureTime": "15:34", "memo": "주취자 2명 발견", "completed": true },
          { "id": "pt-2-1782110032245", "location": "F구역(석탄부두 및 남항부두)", "code": "F", "detail": "석탄부두 및 남항부두", "lat": 37.442, "lng": 126.602, "arrivalTime": "15:34", "departureTime": "15:34", "memo": "불법주차 차량 단속조취", "completed": true },
          { "id": "pt-3-1782110032245", "location": "G구역(국제여객터미널 및 송도)", "code": "G", "detail": "국제여객터미널 및 송도", "lat": 37.426, "lng": 126.599, "arrivalTime": "15:34", "departureTime": "15:34", "memo": "오토바이 소음신고로 인해 방문", "completed": true }
        ],
        "summary": { "totalDistance": 4, "totalTime": 1, "patrolMethod": "도보 및 차량", "patrolCount": "4곳" },
        "createdAt": "2026-06-22T06:33:52.239Z",
        "updatedAt": "2026-06-22T06:34:31.871Z"
      },
      {
        "id": "53d1040b-fa98-462d-ac05-3a093361d697",
        "date": "2026-06-23",
        "members": ["경위 정현우", "순경 최수아", "경장 이지훈"],
        "course": "해상2코스",
        "coursePoints": [
          { "name": "A구역(인항파출소 및 전용부두)", "lat": 37.4579, "lng": 126.5986 },
          { "name": "B구역(연안부두 및 터미널)", "lat": 37.4536, "lng": 126.5982 },
          { "name": "F구역(석탄부두 및 남항부두)", "lat": 37.442, "lng": 126.602 },
          { "name": "G구역(국제여객터미널 및 송도)", "lat": 37.426, "lng": 126.599 }
        ],
        "organization": "해양경찰청 중부지방해양경찰청 인천해양경찰서 인항파출소",
        "status": "completed",
        "points": [
          { "id": "pt-0-1782200558703", "location": "A구역(인항파출소 및 전용부두)", "code": "A", "detail": "인항파출소 및 전용부두", "lat": 37.4579, "lng": 126.5986, "arrivalTime": "16:42", "departureTime": "16:45", "memo": "해안순찰 전 안전교육 실시", "completed": true },
          { "id": "pt-1-1782200558703", "location": "B구역(연안부두 및 터미널)", "code": "B", "detail": "연안부두 및 터미널", "lat": 37.4536, "lng": 126.5982, "arrivalTime": "16:46", "departureTime": "16:48", "memo": "낚시객 구명조끼 착용 여부 점검 및 안전계도 완료", "completed": true },
          { "id": "pt-2-1782200558703", "location": "F구역(석탄부두 및 남항부두)", "code": "F", "detail": "석탄부두 및 남항부두", "lat": 37.442, "lng": 126.602, "arrivalTime": "16:49", "departureTime": "16:50", "memo": "이상 없음", "completed": true },
          { "id": "pt-3-1782200558703", "location": "G구역(국제여객터미널 및 송도)", "code": "G", "detail": "국제여객터미널 및 송도", "lat": 37.426, "lng": 126.599, "arrivalTime": "16:51", "departureTime": "16:52", "memo": "이상 없음", "completed": true }
        ],
        "summary": { "totalDistance": 4, "totalTime": 10, "patrolMethod": "도보 및 차량", "patrolCount": "4곳" },
        "createdAt": "2026-06-23T07:42:38.700Z",
        "updatedAt": "2026-06-23T07:43:27.526Z"
      },
      {
        "id": "aefa2625-0140-43b3-8565-57a502a75cdb",
        "date": "2026-06-24",
        "members": ["경장 이지훈", "순경 최수아"],
        "course": "해상2코스",
        "coursePoints": [
          { "name": "A구역(인항파출소 및 전용부두)", "lat": 37.4579, "lng": 126.5986 },
          { "name": "B구역(연안부두 및 터미널)", "lat": 37.4536, "lng": 126.5982 },
          { "name": "F구역(석탄부두 및 남항부두)", "lat": 37.442, "lng": 126.602 },
          { "name": "G구역(국제여객터미널 및 송도)", "lat": 37.426, "lng": 126.599 }
        ],
        "organization": "해양경찰청 중부지방해양경찰청 인천해양경찰서 인항파출소",
        "status": "completed",
        "points": [
          { "id": "pt-0-1782259995805", "location": "A구역(인항파출소 및 전용부두)", "code": "A", "detail": "인항파출소 및 전용부두", "lat": 37.4579, "lng": 126.5986, "arrivalTime": "09:13", "departureTime": "09:14", "memo": "금지구역 불법 낚시 단속 활동", "completed": true },
          { "id": "pt-1-1782259995805", "location": "B구역(연안부두 및 터미널)", "code": "B", "detail": "연안부두 및 터미널", "lat": 37.4536, "lng": 126.5982, "arrivalTime": "09:14", "departureTime": "09:14", "memo": "낚시객 안전계도 실시", "completed": true },
          { "id": "pt-2-1782259995805", "location": "F구역(석탄부두 및 남항부두)", "code": "F", "detail": "석탄부두 및 남항부두", "lat": 37.442, "lng": 126.602, "arrivalTime": "09:14", "departureTime": "09:14", "memo": "이상 없음", "completed": true },
          { "id": "pt-3-1782259995805", "location": "G구역(국제여객터미널 및 송도)", "code": "G", "detail": "국제여객터미널 및 송도", "lat": 37.426, "lng": 126.599, "arrivalTime": "09:14", "departureTime": "09:14", "memo": "방파제 테트라포드 균열 발견", "completed": true }
        ],
        "summary": { "totalDistance": 4, "totalTime": 1, "patrolMethod": "도보 및 차량", "patrolCount": "4곳" },
        "createdAt": "2026-06-24T00:13:15.799Z",
        "updatedAt": "2026-06-24T00:14:58.371Z"
      }
    ];

    function getPatrols() {
        let data = localStorage.getItem('orca_patrols');
        if (!data) {
            localStorage.setItem('orca_patrols', JSON.stringify(SEED_PATROLS));
            return SEED_PATROLS;
        }
        try {
            return JSON.parse(data);
        } catch (e) {
            localStorage.setItem('orca_patrols', JSON.stringify(SEED_PATROLS));
            return SEED_PATROLS;
        }
    }

    function savePatrols(patrols) {
        localStorage.setItem('orca_patrols', JSON.stringify(patrols));
    }

    // Intercept Fetch API globally
    const originalFetch = window.fetch;
    window.fetch = async function(resource, options) {
        let url = typeof resource === 'string' ? resource : resource.url;
        
        if (url.includes('/api/') || url.includes('api/')) {
            let cleanPath = url;
            if (url.includes('://')) {
                try {
                    cleanPath = new URL(url).pathname;
                } catch (e) {
                    const idx = url.indexOf('/api/');
                    if (idx !== -1) cleanPath = url.substring(idx);
                }
            }
            
            if (cleanPath.includes('/api/')) {
                cleanPath = cleanPath.substring(cleanPath.indexOf('/api/'));
            } else if (cleanPath.startsWith('api/')) {
                cleanPath = '/' + cleanPath;
            }
            
            if (forceMock) {
                return mockFetch(cleanPath, options);
            }
            
            try {
                const response = await originalFetch(resource, options);
                return response;
            } catch (err) {
                console.warn('Real server connection failed. Switched to local storage mock.', err);
                forceMock = true;
                return mockFetch(cleanPath, options);
            }
        }
        
        return originalFetch(resource, options);
    };

    function mockResponse(data, status = 200, headers = {}) {
        return new Response(JSON.stringify(data), {
            status: status,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });
    }

    async function mockFetch(url, options = {}) {
        const method = (options.method || 'GET').toUpperCase();
        let body = null;
        if (options.body) {
            try {
                body = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
            } catch (e) {
                console.error('Failed to parse mock body:', e);
            }
        }
        
        console.log(`[Mock API Router] ${method} ${url}`, body);

        // 1. GET /api/patrols
        if (url === '/api/patrols' && method === 'GET') {
            const patrols = getPatrols();
            return mockResponse({ success: true, patrols });
        }

        // 2. POST /api/patrols
        if (url === '/api/patrols' && method === 'POST') {
            const { date, members, course, coursePoints, organization } = body;
            if (!date || !members || !course) {
                return mockResponse({ success: false, error: '날짜, 인원, 코스를 모두 입력해주세요.' }, 400);
            }

            const newPatrol = {
                id: 'pt-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
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

            const patrols = getPatrols();
            patrols.push(newPatrol);
            savePatrols(patrols);

            return mockResponse({ success: true, patrol: newPatrol });
        }

        // 3. PUT /api/patrols/:id
        const putPatrolMatch = url.match(/^\/api\/patrols\/([^\/]+)$/);
        if (putPatrolMatch && method === 'PUT') {
            const id = putPatrolMatch[1];
            const patrols = getPatrols();
            const idx = patrols.findIndex(p => p.id === id);
            if (idx === -1) {
                return mockResponse({ success: false, error: '순찰을 찾을 수 없습니다.' }, 404);
            }

            const updates = body;
            const allowedFields = ['points', 'summary', 'status', 'members', 'course', 'coursePoints', 'date', 'visitLog', 'gpsTrackPoints', 'gpsSummary'];
            allowedFields.forEach(field => {
                if (updates[field] !== undefined) {
                    patrols[idx][field] = updates[field];
                }
            });
            patrols[idx].updatedAt = new Date().toISOString();
            
            savePatrols(patrols);
            return mockResponse({ success: true, patrol: patrols[idx] });
        }

        // 4. DELETE /api/patrols/:id
        const deletePatrolMatch = url.match(/^\/api\/patrols\/([^\/]+)$/);
        if (deletePatrolMatch && method === 'DELETE') {
            const id = deletePatrolMatch[1];
            let patrols = getPatrols();
            const before = patrols.length;
            patrols = patrols.filter(p => p.id !== id);
            if (patrols.length === before) {
                return mockResponse({ success: false, error: '해당 순찰 기록을 찾을 수 없습니다.' }, 404);
            }
            savePatrols(patrols);
            return mockResponse({ success: true });
        }

        // 5. GET /api/patrols/:id
        const getPatrolMatch = url.match(/^\/api\/patrols\/([^\/]+)$/);
        if (getPatrolMatch && method === 'GET') {
            const id = getPatrolMatch[1];
            const patrols = getPatrols();
            const patrol = patrols.find(p => p.id === id);
            if (!patrol) {
                return mockResponse({ success: false, error: '순찰을 찾을 수 없습니다.' }, 404);
            }
            return mockResponse({ success: true, patrol });
        }

        // 6. GET /api/ai/pattern-analysis
        if (url === '/api/ai/pattern-analysis' && method === 'GET') {
            const patrols = getPatrols();
            const analysis = analyzePatternsClient(patrols);
            return mockResponse({ success: true, analysis });
        }

        // 7. POST /api/ai/quality-check
        if (url === '/api/ai/quality-check' && method === 'POST') {
            let patrol = body.patrol;
            if (body.patrolId) {
                const patrols = getPatrols();
                patrol = patrols.find(p => p.id === body.patrolId);
            }
            if (!patrol) {
                return mockResponse({ success: false, error: '순찰 데이터를 찾을 수 없습니다.' }, 404);
            }
            const alerts = checkQualityClient(patrol);
            return mockResponse({ success: true, alerts });
        }

        // 8. POST /api/ai/generate-report
        if (url === '/api/ai/generate-report' && method === 'POST') {
            let patrol = body.patrol;
            if (body.patrolId) {
                const patrols = getPatrols();
                patrol = patrols.find(p => p.id === body.patrolId);
            }
            if (!patrol) {
                return mockResponse({ success: false, error: '순찰 데이터를 찾을 수 없습니다.' }, 404);
            }
            const report = generateAIReportClient(patrol);
            const classifications = (patrol.points || []).map(pt => ({
                location: pt.location,
                memo: pt.memo,
                classification: classifyMemoClient(pt.memo)
            }));
            return mockResponse({ success: true, report, classifications });
        }

        // 9. POST /api/patrols/:id/report (HWPX Download)
        const reportMatch = url.match(/^\/api\/patrols\/([^\/]+)\/report$/);
        if (reportMatch && method === 'POST') {
            const id = reportMatch[1];
            const patrols = getPatrols();
            const patrol = patrols.find(p => p.id === id);
            if (!patrol) {
                return mockResponse({ success: false, error: '순찰을 찾을 수 없습니다.' }, 404);
            }
            
            try {
                const blob = await generateHwpxBlobClient(patrol);
                const filename = `순찰일지_${patrol.date}.hwpx`;
                return new Response(blob, {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/hwp+zip',
                        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`
                    }
                });
            } catch (err) {
                console.error('Client-side HWPX export failed:', err);
                return mockResponse({ success: false, error: '보고서 생성 중 오류가 발생했습니다: ' + err.message }, 500);
            }
        }

        return mockResponse({ success: false, error: 'Not Found' }, 404);
    }

    // Dynamic JSZip Loading
    async function loadJSZip() {
        if (window.JSZip) return window.JSZip;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
            script.onload = () => resolve(window.JSZip);
            script.onerror = (e) => reject(new Error('JSZip 로드 실패: ' + e.message));
            document.head.appendChild(script);
        });
    }

    // HWPX client generator logic
    const NS_HP = 'http://www.hancom.com/2011/hwpx';

    function generateMimetype() {
        return 'application/hwp+zip';
    }

    function generateVersionXml() {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<hv:HWPVersion xmlns:hv="${NS_HP}" Major="1" Minor="1" Micro="0" BuildNumber="0"/>`;
    }

    function generateContainerXml() {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="Contents/content.hpf" media-type="application/hwp+xml"/>
  </rootfiles>
</container>`;
    }

    function generateManifestXml() {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<odf:manifest xmlns:odf="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
  <odf:file-entry odf:media-type="application/hwp+zip" odf:full-path="/"/>
  <odf:file-entry odf:media-type="text/xml" odf:full-path="Contents/content.hpf"/>
  <odf:file-entry odf:media-type="text/xml" odf:full-path="Contents/header.xml"/>
  <odf:file-entry odf:media-type="text/xml" odf:full-path="Contents/section0.xml"/>
</odf:manifest>`;
    }

    function generateContentHpf() {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<hp:package xmlns:hp="${NS_HP}" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
  <hp:metadata>
    <dc:title>일지보고서</dc:title>
    <dc:language>ko</dc:language>
  </hp:metadata>
  <hp:manifest>
    <hp:item id="header" href="header.xml" media-type="application/hwp+xml"/>
    <hp:item id="section0" href="section0.xml" media-type="application/hwp+xml"/>
  </hp:manifest>
  <hp:spine>
    <hp:itemref idref="section0"/>
  </hp:spine>
</hp:package>`;
    }

    function generateHeaderXml() {
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<hp:header xmlns:hp="${NS_HP}">
  <hp:beginNum page="1" footNote="1" endNote="1" pic="1" tbl="1" equation="1"/>
  <hp:borderFills count="3">
    <hp:borderFill id="1" threeD="0" shadow="0">
      <hp:slash type="none"/>
      <hp:backSlash type="none"/>
      <hp:leftEdge><hp:line type="solid" width="0.12mm" color="000000"/></hp:leftEdge>
      <hp:rightEdge><hp:line type="solid" width="0.12mm" color="000000"/></hp:rightEdge>
      <hp:topEdge><hp:line type="solid" width="0.12mm" color="000000"/></hp:topEdge>
      <hp:bottomEdge><hp:line type="solid" width="0.12mm" color="000000"/></hp:bottomEdge>
      <hp:diagonal type="none"/>
    </hp:borderFill>
    <hp:borderFill id="2" threeD="0" shadow="0">
      <hp:slash type="none"/>
      <hp:backSlash type="none"/>
      <hp:leftEdge><hp:line type="solid" width="0.12mm" color="000000"/></hp:leftEdge>
      <hp:rightEdge><hp:line type="solid" width="0.12mm" color="000000"/></hp:rightEdge>
      <hp:topEdge><hp:line type="solid" width="0.12mm" color="000000"/></hp:topEdge>
      <hp:bottomEdge><hp:line type="solid" width="0.12mm" color="000000"/></hp:bottomEdge>
      <hp:diagonal type="none"/>
      <hp:fillPr>
        <hp:solidFill>
          <hp:color value="F0F2F5"/>
        </hp:solidFill>
      </hp:fillPr>
    </hp:borderFill>
  </hp:borderFills>
  <hp:charProps>
    <hp:charPr id="0" height="1000" fontIdRef="0"/>
    <hp:charPr id="1" height="1600" fontIdRef="0" bold="1"/>
    <hp:charPr id="2" height="1100" fontIdRef="0" bold="1"/>
    <hp:charPr id="3" height="2400" fontIdRef="0" bold="1"/>
  </hp:charProps>
  <hp:paraProps>
    <hp:paraPr id="0" align="justify"/>
    <hp:paraPr id="1" align="center"/>
    <hp:paraPr id="2" align="left"/>
    <hp:paraPr id="3" align="right"/>
  </hp:paraProps>
  <hp:fontFaces>
    <hp:fontFace id="0" lang="hangul" face="함초롬바탕"/>
  </hp:fontFaces>
</hp:header>`;
    }

    function createCellXml(text, col, row, charPrId = '0', paraPrId = '0', colSpan = 1, rowSpan = 1, borderFillId = 1) {
        const escapedText = escapeXmlLocal(text);
        return `<hp:tc>
                <hp:tcPr>
                  <hp:cellAddr colAddr="${col}" rowAddr="${row}"/>
                  <hp:cellSpan colSpan="${colSpan}" rowSpan="${rowSpan}"/>
                  <hp:borderFillID ref="${borderFillId}"/>
                </hp:tcPr>
                <hp:p paraPrIdRef="${paraPrId}">
                  <hp:run charPrIdRef="${charPrId}">
                    <hp:t>${escapedText}</hp:t>
                  </hp:run>
                </hp:p>
              </hp:tc>`;
    }

    function escapeXmlLocal(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

    function formatDate(dateStr) {
        const d = new Date(dateStr);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}.${m}.${day}`;
    }

    function formatTime(dateStr) {
        const d = new Date(dateStr);
        const h = String(d.getHours()).padStart(2, '0');
        const m = String(d.getMinutes()).padStart(2, '0');
        return `${h}:${m}`;
    }

    function generateSection0Xml(records, authorName, reportDate, courseName = '1코스') {
        const firstRecord = records[0] || {};
        const lastRecord = records[records.length - 1] || firstRecord;

        const dateVal = firstRecord.startTime ? formatDate(firstRecord.startTime) : formatDate(new Date().toISOString());
        const startTimeStr = firstRecord.startTime ? formatTime(firstRecord.startTime) : '00:00';
        const endTimeStr = lastRecord.endTime ? formatTime(lastRecord.endTime) : startTimeStr;
        const timeVal = `${startTimeStr} ~ ${endTimeStr}`;

        const typeVal = '해안순찰';

        const pathAddresses = records
            .map(r => r.address || `${r.latitude.toFixed(4)}, ${r.longitude.toFixed(4)}`)
            .filter((val, index, self) => self.indexOf(val) === index);
        const pathRoute = pathAddresses.join(' - ');
        const placeVal = `${courseName}: ${pathRoute}`;

        const officerVal = authorName || '경사 홍길동, 경장 윤봉길, 순경 안중근';

        let timelineRows = '';
        records.forEach((r, idx) => {
            const rowIdx = idx + 1;
            const rowTime = `${formatTime(r.startTime)} ~ ${formatTime(r.endTime)}`;
            const rowPlace = r.address || `${r.latitude.toFixed(4)}, ${r.longitude.toFixed(4)}`;
            const rowActivity = r.activity || '이상 없음';

            timelineRows += `
        <hp:tr>
          ${createCellXml(rowTime, 0, rowIdx, '0', '1', 1, 1, 1)}
          ${createCellXml(rowPlace, 1, rowIdx, '0', '1', 1, 1, 1)}
          ${createCellXml(rowActivity, 2, rowIdx, '0', '2', 1, 1, 1)}
        </hp:tr>`;
        });

        const incidentRecords = records.filter(r => {
            const act = r.activity ? r.activity.trim() : '';
            return act !== '이상 없음' && act !== '이상없음' && act !== '순찰' && act !== '';
        });

        let incidentRows = '';
        const incidentRowCnt = incidentRecords.length > 0 ? incidentRecords.length : 2;

        if (incidentRecords.length > 0) {
            incidentRecords.forEach((r, idx) => {
                const rowIdx = idx + 1;
                const rowTime = formatTime(r.startTime);
                const rowPlace = r.address || `${r.latitude.toFixed(4)}, ${r.longitude.toFixed(4)}`;
                const rowActivity = r.activity || '';

                incidentRows += `
            <hp:tr>
              ${createCellXml(rowTime, 0, rowIdx, '0', '1', 1, 1, 1)}
              ${createCellXml(rowPlace, 1, rowIdx, '0', '1', 1, 1, 1)}
              ${createCellXml(rowActivity, 2, rowIdx, '0', '2', 1, 1, 1)}
            </hp:tr>`;
            });
        } else {
            incidentRows += `
        <hp:tr>
          ${createCellXml('00:00', 0, 1, '0', '1', 1, 1, 1)}
          ${createCellXml('-', 1, 1, '0', '1', 1, 1, 1)}
          ${createCellXml('-', 2, 1, '0', '1', 1, 1, 1)}
        </hp:tr>
        <hp:tr>
          ${createCellXml('00:00', 0, 2, '0', '1', 1, 1, 1)}
          ${createCellXml('-', 1, 2, '0', '1', 1, 1, 1)}
          ${createCellXml('-', 2, 2, '0', '1', 1, 1, 1)}
        </hp:tr>`;
        }

        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<hp:section xmlns:hp="${NS_HP}">
  <hp:p paraPrIdRef="1">
    <hp:run charPrIdRef="3">
      <hp:t>순 찰 일 지</hp:t>
    </hp:run>
  </hp:p>
  <hp:p/>
  <hp:tbl rowCnt="3" colCnt="6" borderFillIDRef="1" zOrder="0" textWrap="square" treatAsChar="true">
    <hp:sz width="14800" height="0"/>
    <hp:pos relativeTo="para" align="center" flowWithText="true" allowOverlap="false" holdAnchorAndPostion="false"/>
    <hp:tblPr>
      <hp:borderFillID ref="1"/>
    </hp:tblPr>
    <hp:colWidths count="6">
      <hp:colWidth>1800</hp:colWidth>
      <hp:colWidth>3100</hp:colWidth>
      <hp:colWidth>1800</hp:colWidth>
      <hp:colWidth>3100</hp:colWidth>
      <hp:colWidth>1800</hp:colWidth>
      <hp:colWidth>3200</hp:colWidth>
    </hp:colWidths>
    <hp:tr>
      ${createCellXml('근무일자', 0, 0, '2', '1', 1, 1, 2)}
      ${createCellXml(dateVal, 1, 0, '0', '1', 1, 1, 1)}
      ${createCellXml('시간', 2, 0, '2', '1', 1, 1, 2)}
      ${createCellXml(timeVal, 3, 0, '0', '1', 1, 1, 1)}
      ${createCellXml('구분', 4, 0, '2', '1', 1, 1, 2)}
      ${createCellXml(typeVal, 5, 0, '0', '1', 1, 1, 1)}
    </hp:tr>
    <hp:tr>
      ${createCellXml('순찰 장소', 0, 1, '2', '1', 1, 1, 2)}
      ${createCellXml(placeVal, 1, 1, '0', '1', 5, 1, 1)}
    </hp:tr>
    <hp:tr>
      ${createCellXml('인원', 0, 2, '2', '1', 1, 1, 2)}
      ${createCellXml(officerVal, 1, 2, '0', '1', 5, 1, 1)}
    </hp:tr>
  </hp:tbl>
  <hp:p/>
  <hp:tbl rowCnt="${records.length + 1}" colCnt="3" borderFillIDRef="1" zOrder="0" textWrap="square" treatAsChar="true">
    <hp:sz width="14800" height="0"/>
    <hp:pos relativeTo="para" align="center" flowWithText="true" allowOverlap="false" holdAnchorAndPostion="false"/>
    <hp:tblPr>
      <hp:borderFillID ref="1"/>
    </hp:tblPr>
    <hp:colWidths count="3">
      <hp:colWidth>3000</hp:colWidth>
      <hp:colWidth>3800</hp:colWidth>
      <hp:colWidth>8000</hp:colWidth>
    </hp:colWidths>
    <hp:tr>
      ${createCellXml('시간', 0, 0, '2', '1', 1, 1, 2)}
      ${createCellXml('장소', 1, 0, '2', '1', 1, 1, 2)}
      ${createCellXml('특이사항', 2, 0, '2', '1', 1, 1, 2)}
    </hp:tr>
    ${timelineRows}
  </hp:tbl>
  <hp:p/>
  <hp:tbl rowCnt="${incidentRowCnt + 1}" colCnt="3" borderFillIDRef="1" zOrder="0" textWrap="square" treatAsChar="true">
    <hp:sz width="14800" height="0"/>
    <hp:pos relativeTo="para" align="center" flowWithText="true" allowOverlap="false" holdAnchorAndPostion="false"/>
    <hp:tblPr>
      <hp:borderFillID ref="1"/>
    </hp:tblPr>
    <hp:colWidths count="3">
      <hp:colWidth>3000</hp:colWidth>
      <hp:colWidth>3800</hp:colWidth>
      <hp:colWidth>8000</hp:colWidth>
    </hp:colWidths>
    <hp:tr>
      ${createCellXml('특이사항 내역', 0, 0, '2', '1', 3, 1, 2)}
    </hp:tr>
    ${incidentRows}
  </hp:tbl>
</hp:section>`;
    }

    async function generateHwpxBlobClient(patrol) {
        const JSZip = await loadJSZip();
        
        const pts = [...(patrol.points || [])];
        const records = pts.map(pt => ({
            latitude: pt.lat || 0,
            longitude: pt.lng || 0,
            address: pt.location || '',
            startTime: `${patrol.date}T${pt.arrivalTime || '00:00'}:00.000Z`,
            endTime: `${patrol.date}T${pt.departureTime || pt.arrivalTime || '00:00'}:00.000Z`,
            activity: pt.memo || '순찰',
            note: ''
        }));

        records.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        const authorName = patrol.members.join(', ');
        const reportDate = new Date().toISOString();

        const zip = new JSZip();
        zip.file("mimetype", "application/hwp+zip", { compression: "STORE" });
        zip.file("META-INF/container.xml", generateContainerXml());
        zip.file("META-INF/manifest.xml", generateManifestXml());
        zip.file("version.xml", generateVersionXml());
        zip.file("Contents/content.hpf", generateContentHpf());
        zip.file("Contents/header.xml", generateHeaderXml());
        zip.file("Contents/section0.xml", generateSection0Xml(records, authorName, reportDate, patrol.course));

        return await zip.generateAsync({ type: "blob" });
    }

    // AI summary generator logic
    function generateAIReportClient(patrol) {
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

        const locations = pts.map(pt => {
            const loc = pt.location || '';
            const match = loc.match(/\(([^)]+)\)/);
            return match ? match[1] : loc;
        }).filter(Boolean);
        const uniqueLocations = [...new Set(locations)];
        const locationStr = uniqueLocations.join(' 및 ');

        const classifiedMemos = pts
            .filter(pt => pt.memo && pt.memo !== '이상 없음' && pt.memo !== '이상없음' && pt.memo !== '' && pt.memo !== '해안순찰 전 안전교육 실시' && pt.memo !== '내용을 입력해주세요')
            .map(pt => ({
                ...pt,
                classification: classifyMemoClient(pt.memo)
            }));

        const categoryCount = {};
        classifiedMemos.forEach(m => {
            const cat = m.classification.category;
            categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        });

        let report = `${dateFormatted} ${startTime}~${endTime} `;
        report += `${patrol.organization || '인항파출소'} 관할구역 ${courseName} 순찰 실시. `;
        report += `${memberStr} ${pts.length}개 구역(${locationStr}) 일대를 점검하였으며`;

        if (classifiedMemos.length > 0) {
            const details = [];
            for (const [cat, count] of Object.entries(categoryCount)) {
                details.push(`${cat} ${count}건`);
            }
            report += `, ${details.join(', ')}을 처리함. `;

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

    // AI Classification logic
    const AI_CATEGORIES_LOCAL_MOCK = {
        '안전계도': ['구명조끼', '미착용', '계도', '안전', '주취자', '음주', '위험행위', '위험', '낚시객', '수영', '입수', '안전교육', '안전장비', '안전수칙', '경고', '주의', '해수욕', '물놀이'],
        '위험요소 발견': ['파손', '누수', '균열', '붕괴', '위험', '고장', '손상', '노후', '침수', '유출', '기름', '오염', '표류', '부유물', '표류물', '장애물'],
        '민원 대응': ['민원', '신고', '소음', '불법주차', '주차', '항의', '분쟁', '갈등', '소란', '진정', '요청', '요구', '불만', '피해', '악취'],
        '시설 점검': ['점검', '시설', '방파제', '부두', '잔교', '난간', '조명', 'cctv', '소화기', '구명환', '계류', '정박', '보수', '정비', '수리'],
        '단속 활동': ['단속', '불법', '무허가', '어업', '밀수', '밀입국', '불법조업', '무면허', '과적', '위반', '적발', '검거', '체포', '수색', '조사']
    };

    function classifyMemoClient(memoText) {
        const trimmed = (memoText || '').trim();
        if (!trimmed || trimmed === '' || trimmed === '이상 없음' || trimmed === '이상없음' || trimmed === '내용을 입력해주세요') {
            return { category: '이상 없음', confidence: 1.0, icon: '✅', color: '#a0aec0' };
        }

        const text = memoText.toLowerCase();
        let bestCategory = null;
        let bestScore = 0;

        for (const [category, keywords] of Object.entries(AI_CATEGORIES_LOCAL_MOCK)) {
            let score = 0;
            for (const keyword of keywords) {
                if (text.includes(keyword.toLowerCase())) {
                    score += 1;
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestCategory = category;
            }
        }

        const iconMap = { '안전계도': '🛡️', '위험요소 발견': '⚠️', '민원 대응': '📋', '시설 점검': '🔧', '단속 활동': '🚨' };
        const colorMap = { '안전계도': '#3182ce', '위험요소 발견': '#e53e3e', '민원 대응': '#d69e2e', '시설 점검': '#38a169', '단속 활동': '#805ad5' };

        if (bestCategory && bestScore > 0) {
            return {
                category: bestCategory,
                confidence: Math.min(0.95, 0.5 + bestScore * 0.15),
                icon: iconMap[bestCategory] || '🛡️',
                color: colorMap[bestCategory] || '#3182ce'
            };
        }

        return { category: '안전계도', confidence: 0.6, icon: '🛡️', color: '#3182ce' };
    }

    // AI Quality Check logic
    function checkQualityClient(patrol) {
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

        const patrolType = patrol.patrolType || patrol.patrolMethod || (patrol.summary && patrol.summary.patrolMethod) || patrol.course;
        if (!patrolType) {
            score -= 15;
            checks[2].status = 'warning';
            checks[2].message = '순찰 유형 누락';
            suggestions.push('도보, 차량, 해안, 해상 등 순찰 수단/종류를 선택해 주세요.');
        }

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

        const actionKeywords = ['계도', '조치', '안내', '대응', '처리', '통제', '이동', '훈방', '단속', '점검', '수리', '보수', '전달', '보고', '신고', '요청', '완료', '실시'];
        const problemCategories = ['위험요소 발견', '민원 대응'];

        const missingActionMemos = [];
        const shortActionMemos = [];
        let hasAnyAction = false;

        pts.forEach(pt => {
            const memo = (pt.memo || '').trim();
            if (!memo || memo === '이상 없음' || memo === '이상없음' || memo === '내용을 입력해주세요') return;

            const classification = classifyMemoClient(memo);
            const memoHasAction = actionKeywords.some(kw => memo.includes(kw));

            if (memoHasAction) hasAnyAction = true;

            if (problemCategories.includes(classification.category)) {
                if (!memoHasAction) {
                    missingActionMemos.push({ location: pt.location || '미상', memo, category: classification.category });
                } else if (memo.length < 20) {
                    shortActionMemos.push({ location: pt.location || '미상', memo, category: classification.category });
                }
            }
        });

        if (missingActionMemos.length > 0) {
            score -= 15;
            checks[4].status = 'warning';
            checks[4].message = `조치 결과 미기재 (${missingActionMemos.length}건)`;
            const details = missingActionMemos.map(m => `"${m.memo}" (${m.category})`).join(', ');
            suggestions.push(`다음 특이사항에 대한 조치 결과가 누락되었습니다: ${details}. 발견 후 어떻게 조치했는지(보고, 수리 요청, 통제 등)를 반드시 기재해 주세요.`);
        } else if (shortActionMemos.length > 0) {
            score -= 10;
            checks[4].status = 'info';
            checks[4].message = '조치 키워드 확인되나 상세 내용 부족';
            suggestions.push('조치 키워드(대응, 조치 등)는 확인되지만, 구체적인 해결 방식이나 결과를 보다 상세히 기재해 주세요. (예: "어떻게 대응했는지", "결과가 어떠했는지")');
        } else if (!hasAnyAction && allMemos.length > 0) {
            score -= 15;
            checks[4].status = 'warning';
            checks[4].message = '조치 결과 미기재';
            suggestions.push('순찰 중 발생한 사항에 대한 조치 결과(계도 건수, 조치 내용 등)를 구체적으로 추가해 주세요.');
        }

        if (pts.length > 0 && pts.every(pt => !pt.arrivalTime && !pt.departureTime)) {
            score -= 10;
            checks[5].status = 'warning';
            checks[5].message = '순찰 결과 미완성';
            suggestions.push('순찰 활동의 최종 결과를 완성하기 위해 시간 정보를 확인해 주세요.');
        }

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

    // AI Patterns logic
    function analyzePatternsClient(patrols) {
        const completedPatrols = patrols.filter(p => p.status === 'completed');
        if (completedPatrols.length === 0) {
            return { insights: [], stats: { totalPatrols: 0, totalPoints: 0, categoryBreakdown: {}, zoneIncidentCounts: {} } };
        }

        const insights = [];
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

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

                    const classification = classifyMemoClient(pt.memo);
                    if (!zoneMemoMap[zoneCode]) zoneMemoMap[zoneCode] = {};
                    zoneMemoMap[zoneCode][classification.category] = (zoneMemoMap[zoneCode][classification.category] || 0) + 1;
                }
            });
        });

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

        const totalCategories = {};
        completedPatrols.forEach(p => {
            (p.points || []).forEach(pt => {
                if (pt.memo && pt.memo !== '이상 없음' && pt.memo !== '이상없음' && pt.memo !== '' && pt.memo !== '해안순찰 전 안전교육 실시' && pt.memo !== '내용을 입력해주세요') {
                    const cls = classifyMemoClient(pt.memo);
                    totalCategories[cls.category] = (totalCategories[cls.category] || 0) + 1;
                }
            });
        });

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
})();

// ═══════════════════════════════════════════
// GLOBAL STATE
// ═══════════════════════════════════════════
const initDate = new Date();
const State = {
    currentScreen: 'splash',
    selectedDate: { year: initDate.getFullYear(), month: initDate.getMonth(), day: initDate.getDate() }, // Defaults to today
    selectedYear: initDate.getFullYear(),
    selectedMonth: initDate.getMonth(),
    selectedMembers: [], // 기본 선택 없음 — 사용자가 직접 선택
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
    allPatrolsCached: [],   // Saved patrols database cache

    // GPS Patrol Screen states
    patrolWalkedPath: [],
    patrolSimulated: false,
    userLocationMarker: null,

    // GPS Geofencing & Tracking
    gpsTrackPoints: [],          // Full GPS history: [{lat, lng, timestamp}]
    visitLog: [],                // Visit records: [{locationName, code, lat, lng, arrivalTime, departureTime, stayDuration}]
    currentLocationName: '',     // Current geofence location name
    isInsideGeofence: false,     // Whether user is inside any geofence
    lastGeofenceZoneCode: null,  // Last geofence zone code entered
    lastGeofenceEntryTime: null, // When the user entered the current geofence
    patrolStartTime: null,       // Patrol start timestamp
    geofenceCircles: [],         // Leaflet circle references for geofences
    GEOFENCE_RADIUS: 100         // Geofence radius in meters
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

    // Bottom Sheet Header Toggle & Swipe Gestures (터치 드래그 및 헤더 클릭)
    try {
        const sheetHeader = $('#bottomSheetHeader');
        const sheet = $('#memoBottomSheet');
        
        if (sheetHeader && sheet) {
            sheetHeader.addEventListener('click', (e) => {
                if (e.target.closest('#sheetMemoInput') || e.target.closest('.quick-tag')) return;
                sheet.classList.toggle('collapsed');
            });

            let touchStartY = 0;
            let touchEndY = 0;

            sheetHeader.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            sheetHeader.addEventListener('touchend', (e) => {
                touchEndY = e.changedTouches[0].clientY;
                const swipeDistance = touchEndY - touchStartY;
                const threshold = 40;

                if (swipeDistance > threshold) {
                    sheet.classList.add('collapsed');
                } else if (swipeDistance < -threshold) {
                    sheet.classList.remove('collapsed');
                }
            }, { passive: true });
        }
    } catch (err) {
        console.error('Failed to bind bottom sheet header events:', err);
    }

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

    // Active Patrol: Add Zone popup bindings
    safeBind('#btnPatrolAddZone', 'click', openZoneAddPopup);
    safeBind('#btnZoneAddCancel', 'click', closeZoneAddPopup);
    safeBind('#btnZoneAddClose', 'click', closeZoneAddPopup);
    safeBind('#btnZoneAddSubmit', 'click', submitZoneAdd);

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
    safeBind('#btnPatrolEndPrint', 'click', handlePrintReportHTML);
    safeBind('#btnEditPatrolDate', 'click', handleEditPatrolDate);

    // Report
    safeBind('#btnReportBack', 'click', () => navigateTo('PatrolEnd'));
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

    if (email !== 'orca' || password !== '1234') {
        showToast('아이디 또는 비밀번호가 올바르지 않습니다.', 'error');
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
            updateDashboardStats(data.patrols);
        }
    } catch (err) {
        console.error('순찰 내역 조회 실패:', err);
        // Fallback mockup
        renderRecentHistory([]);
        updateDashboardStats([]);
    }

    // AI 대시보드 렌더링
    renderAIDashboard();
}

// 대시보드 통계 동적 업데이트 (실제 순찰 데이터 기반)
function updateDashboardStats(patrols) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-based

    // 이번 달 순찰 횟수
    let monthlyCount = 0;
    // 총 순찰 시간 (분 단위 합산 후 시간 변환)
    let totalMinutes = 0;
    // 완료 일지 개수
    let completedCount = 0;

    patrols.forEach(p => {
        // 날짜 파싱 (YYYY-MM-DD, YYYY.MM.DD 등 지원)
        let pYear, pMonth;
        if (p.date) {
            const delimiters = ['-', '.', '/'];
            for (let delim of delimiters) {
                if (p.date.includes(delim)) {
                    const parts = p.date.split(delim).map(Number);
                    pYear = parts[0];
                    pMonth = parts[1] - 1; // 0-based
                    break;
                }
            }
        }

        // 이번 달 순찰 횟수 카운트
        if (pYear === currentYear && pMonth === currentMonth) {
            monthlyCount++;
        }

        // 총 순찰 시간 합산
        if (p.summary && p.summary.totalTime) {
            totalMinutes += p.summary.totalTime;
        }

        // 완료 일지 카운트
        if (p.status === 'completed') {
            completedCount++;
        }
    });

    // DOM 업데이트
    const elMonthly = $('#dashboardStatMonthlyCount');
    const elHours = $('#dashboardStatTotalHours');
    const elCompleted = $('#dashboardStatCompletedReports');

    if (elMonthly) elMonthly.textContent = monthlyCount;
    if (elHours) {
        const totalHours = totalMinutes / 60;
        elHours.textContent = totalHours % 1 === 0 ? totalHours.toFixed(0) : totalHours.toFixed(1);
    }
    if (elCompleted) elCompleted.textContent = completedCount;
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
        const type = State.selectedPatrolType || '';
        $$('#patrolTypeList .patrol-type-card').forEach(card => {
            if (type && card.dataset.type === type) {
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

        const type = State.selectedPatrolType || '';
        let coursesToShow = [];

        if (!type) {
            container.innerHTML = '<p style="color: var(--navy-300); font-size: 13px; text-align: center; padding: 12px 0;">순찰 종류를 먼저 선택해 주세요.</p>';
            return;
        }

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
    // 순찰 설정 진입 시 이전 설정 초기화
    const now = new Date();
    State.selectedDate = { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() };
    State.selectedYear = now.getFullYear();
    State.selectedMonth = now.getMonth();
    State.selectedMembers = [];
    State.selectedPatrolType = '';
    State.selectedCourse = '';
    State.selectedZones = [];
    State.userLocationMarker = null;

    // 순찰 종류 카드 선택 해제 (UI)
    $$('#patrolTypeList .patrol-type-card').forEach(card => card.classList.remove('selected'));

    switchSetupTab('date'); // Default tab open
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

        // Highlight today or selected date automatically
        if (State.selectedDate &&
            State.selectedDate.year === year &&
            State.selectedDate.month === month &&
            State.selectedDate.day === d) {
            el.classList.add('selected');
        }

        el.addEventListener('click', () => {
            $$('.calendar-day').forEach(cell => cell.classList.remove('selected'));
            el.classList.add('selected');
            State.selectedDate = { year, month, day: d };

            // Auto transition to "Dispatch Members" tab after a tiny feedback delay!
            setTimeout(() => {
                switchSetupTab('members');
            }, 250);
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

    if (!State.selectedPatrolType) {
        showToast('순찰 종류(해안/해상)를 선택해주세요.', 'error');
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
                    arrivalTime: '', // GPS 지오펜스 진입 시 자동 설정됨
                    departureTime: '',
                    memo: '', // GPS 도착 전에는 비어있음
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

    // Clear existing markers/polylines/circles (but keep tile layer)
    State.patrolMap.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.Circle || layer instanceof L.CircleMarker) {
            State.patrolMap.removeLayer(layer);
        }
    });
    State.userLocationMarker = null; // Reset reference since we cleared all

    // Add geofence circles and course point markers
    const coords = [];
    State.patrolPoints.forEach((pt, idx) => {
        if (pt.lat && pt.lng) {
            let markerColor = '#cbd5e1'; // Upcoming (Gray)
            let geofenceColor = '#94a3b8';
            let isActive = idx === State.currentZoneIdx;
            let isCompleted = pt.completed || idx < State.currentZoneIdx;

            if (isActive) {
                markerColor = '#ef4444'; // Active/Current (Red)
                geofenceColor = '#ef4444';
            } else if (isCompleted) {
                markerColor = '#1e3a6e'; // Completed (Navy)
                geofenceColor = '#1e3a6e';
            }

            // Draw geofence radius circle
            L.circle([pt.lat, pt.lng], {
                radius: State.GEOFENCE_RADIUS,
                color: geofenceColor,
                fillColor: geofenceColor,
                fillOpacity: isActive ? 0.08 : 0.04,
                weight: isActive ? 2 : 1,
                dashArray: isActive ? '' : '4, 4',
                interactive: false
            }).addTo(State.patrolMap);

            // Create labeled marker with zone code
            const code = pt.code || String.fromCharCode(65 + idx);
            const icon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <div style="
                        width: 24px; height: 24px;
                        border-radius: 50%;
                        background: ${markerColor};
                        border: 2.5px solid white;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 10px;
                        font-weight: 800;
                        color: white;
                        font-family: -apple-system, sans-serif;
                    ">${code}</div>
                </div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            const marker = L.marker([pt.lat, pt.lng], { icon }).addTo(State.patrolMap);
            
            // Add popup with zone details
            const statusText = isCompleted ? '✅ 방문 완료' : isActive ? '📍 현재 구역' : '⏳ 예정';
            const timeInfo = pt.arrivalTime ? `도착: ${pt.arrivalTime}` : '';
            marker.bindPopup(`<b>${pt.location}</b><br>${statusText}<br>${timeInfo}`);

            coords.push([pt.lat, pt.lng]);
        }
    });

    // Draw planned route polyline (dashed)
    if (coords.length >= 2) {
        L.polyline(coords, {
            color: '#1e3a6e',
            weight: 2,
            opacity: 0.4,
            dashArray: '6, 8'
        }).addTo(State.patrolMap);
    }

    // Fit bounds
    if (coords.length > 0) {
        const bounds = L.latLngBounds(coords);
        // Include user position in bounds if available
        if (State.currentLat && State.currentLng) {
            bounds.extend([State.currentLat, State.currentLng]);
        }
        State.patrolMap.fitBounds(bounds.pad(0.2));
    }

    // Draw walked path (actual GPS trail)
    if (State.patrolWalkedPath && State.patrolWalkedPath.length >= 2) {
        L.polyline(State.patrolWalkedPath, {
            color: '#2563eb',
            weight: 4,
            opacity: 0.85,
            lineJoin: 'round',
            lineCap: 'round'
        }).addTo(State.patrolMap);
    }

    // Draw user position marker with pulse animation
    const userLat = State.currentLat || 37.394248;
    const userLng = State.currentLng || 126.639352;
    
    const pulseIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="position: relative;">
            <div class="leaflet-marker-pulse" style="
                width: 16px; height: 16px;
                border-radius: 50%;
                background: #2563eb;
                border: 3px solid white;
                box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.5);
            "></div>
            <div style="
                position: absolute;
                top: -1px; left: -1px;
                width: 18px; height: 18px;
                border-radius: 50%;
                border: 2px solid rgba(37, 99, 235, 0.3);
                animation: markerPulse 2s ease-out infinite;
            "></div>
        </div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
    });

    State.userLocationMarker = L.marker([userLat, userLng], { icon: pulseIcon, zIndexOffset: 1000 })
        .addTo(State.patrolMap)
        .bindPopup(`<b>현재 나의 위치</b><br>${State.currentLocationName || '위치 확인 중...'}`);
}

function startGPSTracking() {
    if (!navigator.geolocation) {
        updateGPSStatusBanner('off', 'GPS 미지원', '');
        return;
    }

    if (State.watchId) {
        navigator.geolocation.clearWatch(State.watchId);
    }

    // Initialize GPS tracking state
    State.patrolWalkedPath = [];
    State.patrolSimulated = false;
    State.gpsTrackPoints = [];
    State.visitLog = [];
    State.currentLocationName = '';
    State.isInsideGeofence = false;
    State.lastGeofenceZoneCode = null;
    State.lastGeofenceEntryTime = null;
    State.patrolStartTime = new Date();

    updateGPSStatusBanner('weak', '위치 확인 중...', '');

    State.watchId = navigator.geolocation.watchPosition(
        (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            const accuracy = pos.coords.accuracy;
            State.currentLat = lat;
            State.currentLng = lng;

            // Update GPS signal indicator
            const signalStrength = accuracy < 30 ? 'strong' : accuracy < 100 ? 'weak' : 'off';
            const signalDot = $('#gpsSignalDot');
            if (signalDot) {
                signalDot.className = 'gps-signal-dot' + (signalStrength === 'strong' ? '' : signalStrength === 'weak' ? ' weak' : ' off');
            }

            // Update coordinates display
            const coordsEl = $('#gpsLocationCoords');
            if (coordsEl) {
                coordsEl.textContent = `${lat.toFixed(6)}°N, ${lng.toFixed(6)}°E`;
            }

            handlePatrolGPSUpdate(lat, lng);
        },
        (err) => {
            console.warn('GPS 오류:', err);
            updateGPSStatusBanner('off', 'GPS 신호 없음', '');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

// ═══════════════════════════════════════════
// PATROL PROGRESS UI & ELAPSED TIMER
// ═══════════════════════════════════════════
function renderPatrolProgressUI() {
    const completedList = $('#patrolListCompletedItems');
    const upcomingList = $('#patrolListUpcomingItems');
    
    if (completedList) completedList.innerHTML = '';
    if (upcomingList) upcomingList.innerHTML = '';

    let completedCount = 0;
    const total = State.patrolPoints.length;

    State.patrolPoints.forEach((pt, idx) => {
        const item = document.createElement('div');
        const isActive = idx === State.currentZoneIdx;
        const isCompleted = pt.completed || idx < State.currentZoneIdx;

        let statusTag = '예정';
        let statusClass = 'upcoming';

        if (isActive) {
            if (pt.arrivalTime) {
                statusTag = '현재';
                statusClass = 'active';
            } else {
                statusTag = '📡 GPS 대기';
                statusClass = 'active';
            }
        } else if (isCompleted) {
            statusTag = '완료';
            statusClass = 'completed';
            completedCount++;
        }

        item.className = `patrol-zone-item-premium ${statusClass}`;
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';

        item.innerHTML = `
            <div class="patrol-item-left" style="display: flex; align-items: center; gap: 10px;">
                <div class="patrol-item-badge">${pt.code || String.fromCharCode(65 + idx)}</div>
                <div class="patrol-item-name">${escapeHtml(pt.location)}</div>
            </div>
            <div class="patrol-item-right-actions" style="display: flex; align-items: center; gap: 8px;">
                <span class="patrol-item-status-tag">${statusTag}</span>
                <button type="button" class="btn-zone-delete" data-idx="${idx}" title="구역 삭제" style="background: none; border: none; color: #ef4444; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; outline: none;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;

        // Bind delete action
        const delBtn = item.querySelector('.btn-zone-delete');
        if (delBtn) {
            delBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                handleDeleteZone(idx);
            });
        }

        // Distribute to corresponding group list
        if (isCompleted) {
            if (completedList) completedList.appendChild(item);
        } else {
            if (upcomingList) upcomingList.appendChild(item);
        }
    });

    // Update Ratio & Progress Bar
    if ($('#patrolProgressRatio')) {
        $('#patrolProgressRatio').textContent = `${completedCount}/${total} 구역`;
    }
    if ($('#patrolProgressBarFill') && total > 0) {
        const progressPercent = (completedCount / total) * 100;
        $('#patrolProgressBarFill').style.width = `${progressPercent}%`;
    }

    // 3. 예상 완료 시간 연산
    const estEl = $('#patrolEstimatedCompletion');
    if (estEl) {
        if (completedCount === total) {
            estEl.textContent = `순찰 완료`;
        } else {
            const now = new Date();
            if (completedCount === 0) {
                // 아직 완료된 구역이 없는 경우: 구역당 10분 소요로 가정
                const estimatedLeftSeconds = total * 10 * 60;
                now.setSeconds(now.getSeconds() + estimatedLeftSeconds);
                estEl.textContent = `예상 완료 시간: 약 ${formatTimeHM(now)}`;
            } else {
                // 1구역 당 평균 소요 시간 (경과 시간 기준)
                const avgSecondsPerZone = State.elapsedSeconds / completedCount;
                const remainingZones = total - completedCount;
                const estimatedLeftSeconds = avgSecondsPerZone * remainingZones;
                now.setSeconds(now.getSeconds() + estimatedLeftSeconds);
                estEl.textContent = `예상 완료 시간: 약 ${formatTimeHM(now)}`;
            }
        }
    }

    // Load active zone memo into Bottom Sheet input
    const activeZone = State.patrolPoints[State.currentZoneIdx];
    if (activeZone) {
        if ($('#sheetMemoInput')) {
            $('#sheetMemoInput').value = activeZone.memo || '';
        }
        // Set tag active based on value
        $$('#quickTags .quick-tag').forEach(btn => {
            if (activeZone.memo === btn.dataset.tag) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    // Adapt sheet button label on final zone
    if (State.currentZoneIdx === total - 1) {
        if ($('#btnSheetNextZone')) $('#btnSheetNextZone').textContent = '순찰 완료 및 종료';
    } else {
        if ($('#btnSheetNextZone')) $('#btnSheetNextZone').textContent = '다음 구역으로 이동';
    }
}

// GPS 자동 전환 시 바텀시트를 현재 활성 구역에 맞게 갱신
function updateBottomSheetForCurrentZone() {
    const activeZone = State.patrolPoints[State.currentZoneIdx];
    if (!activeZone) return;

    // Update memo input
    const memoInput = $('#sheetMemoInput');
    if (memoInput) {
        memoInput.value = activeZone.memo || '';
    }

    // Update quick tags active state
    $$('#quickTags .quick-tag').forEach(btn => {
        if (activeZone.memo === btn.dataset.tag) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    // Update button label
    const total = State.patrolPoints.length;
    const nextBtn = $('#btnSheetNextZone');
    if (nextBtn) {
        if (State.currentZoneIdx === total - 1) {
            nextBtn.textContent = '순찰 완료 및 종료';
        } else {
            nextBtn.textContent = '다음 구역으로 이동';
        }
    }
}

// 구역 삭제
function handleDeleteZone(targetIdx) {
    const targetZone = State.patrolPoints[targetIdx];
    if (!targetZone) return;

    if (State.patrolPoints.length <= 1) {
        showToast('순찰 구역은 최소 1개 이상 존재해야 합니다.', 'error');
        return;
    }

    if (!confirm(`'${targetZone.location}' 구역을 순찰 경로에서 삭제하시겠습니까?`)) {
        return;
    }

    // 1. 현재 순찰 중인 활성 구역(State.currentZoneIdx)인 경우
    if (targetIdx === State.currentZoneIdx) {
        if (State.currentZoneIdx === State.patrolPoints.length - 1) {
            // 마지막 구역이었으면 인덱스를 한 칸 앞으로 당김
            State.currentZoneIdx--;
        } else {
            // 마지막이 아니면 인덱스는 그대로 두고 다음 구역이 활성화되도록 함
            const nextZone = State.patrolPoints[State.currentZoneIdx + 1];
            if (nextZone && !nextZone.arrivalTime) {
                nextZone.arrivalTime = formatTimeHM(new Date());
            }
        }
    } else if (targetIdx < State.currentZoneIdx) {
        // 현재 인덱스보다 앞선 구역이 삭제되면 인덱스를 하나 줄임
        State.currentZoneIdx--;
    }

    // 2. 구역 삭제
    State.patrolPoints.splice(targetIdx, 1);

    // 3. UI 및 데이터 저장
    renderPatrolProgressUI();
    updatePatrolMapMarkers();
    savePatrolToServer();
    showToast('구역이 삭제되었습니다.', 'success');
}

// 구역 추가 팝업 열기
function openZoneAddPopup() {
    const currentCodes = State.patrolPoints.map(pt => pt.code);
    const select = $('#selectNewZone');
    if (!select) return;

    select.innerHTML = '';
    const availableZones = DEMO_ZONES.filter(z => !currentCodes.includes(z.code));

    if (availableZones.length === 0) {
        showToast('더 이상 추가할 수 있는 구역이 없습니다.', 'info');
        return;
    }

    availableZones.forEach(z => {
        const opt = document.createElement('option');
        opt.value = z.code;
        opt.textContent = `${z.name} (${z.detail})`;
        select.appendChild(opt);
    });

    const overlay = $('#zoneAddOverlay');
    if (overlay) overlay.classList.add('active');
}

// 구역 추가 팝업 닫기
function closeZoneAddPopup() {
    const overlay = $('#zoneAddOverlay');
    if (overlay) overlay.classList.remove('active');
}

// 구역 추가 완료 제출
function submitZoneAdd() {
    const select = $('#selectNewZone');
    if (!select) return;
    const code = select.value;
    if (!code) {
        showToast('구역을 선택해주세요.', 'error');
        return;
    }

    const zone = DEMO_ZONES.find(z => z.code === code);
    if (!zone) return;

    const nextIdx = State.patrolPoints.length;
    State.patrolPoints.push({
        id: `pt-${nextIdx}-${Date.now()}`,
        location: `${zone.name}(${zone.detail})`,
        code: zone.code,
        detail: zone.detail,
        lat: zone.lat,
        lng: zone.lng,
        arrivalTime: '',
        departureTime: '',
        memo: '',
        completed: false
    });

    closeZoneAddPopup();
    renderPatrolProgressUI();
    updatePatrolMapMarkers();
    savePatrolToServer();
    showToast(`'${zone.name}' 구역이 추가되었습니다.`, 'success');
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

            // AI 분류 업데이트
            updateAIClassifyFromTag(tag);
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

    // AI 메모 실시간 분류 설정
    setupAIMemoClassification();
}

async function handleNextZoneTransition() {
    const now = new Date();
    const timeStr = formatTimeHM(now);

    const currentZone = State.patrolPoints[State.currentZoneIdx];
    
    // ─── GPS 도착 검증: 현재 구역에 GPS로 도착하지 않았으면 차단 ───
    if (currentZone && !currentZone.arrivalTime) {
        // GPS 기반 도착이 아직 확인되지 않음
        const zoneName = (currentZone.location || '').split('(')[0] || '현재 구역';
        
        // 강제 진행 여부 확인 (GPS 신호가 약한 상황 등)
        const forceConfirm = confirm(
            `⚠️ GPS 위치 확인 미완료\n\n${zoneName}에 아직 도착하지 않은 것으로 감지됩니다.\n\n` +
            `현재 구역 반경(${State.GEOFENCE_RADIUS}m) 내로 이동하시면 자동으로 도착 판정됩니다.\n\n` +
            `그래도 강제로 다음 구역으로 이동하시겠습니까?\n(GPS 신호가 약한 경우에만 사용)`
        );
        
        if (!forceConfirm) {
            showToast(`📍 ${zoneName} 반경 내로 이동해야 다음 구역으로 진행할 수 있습니다.`, 'success');
            return;
        }
        
        // 강제 진행 시 현재 시각으로 도착/출발 기록
        currentZone.arrivalTime = timeStr;
        showToast(`⚠️ ${zoneName} GPS 미확인 상태에서 강제 진행합니다.`, 'warning');
    }
    
    if (currentZone) {
        if (!currentZone.departureTime) {
            currentZone.departureTime = timeStr;
        }
        currentZone.completed = true;
    }

    State.currentZoneIdx++;

    // Check if patrol fully finished
    if (State.currentZoneIdx >= State.patrolPoints.length) {
        if (State.timerInterval) clearInterval(State.timerInterval);
        endPatrol();
        return;
    }

    // 다음 구역 초기화 — arrivalTime은 설정하지 않음 (GPS 도착 시 자동 설정)
    const nextZone = State.patrolPoints[State.currentZoneIdx];
    if (nextZone) {
        // arrivalTime은 GPS 지오펜스 진입 시 자동으로 설정됨
        if (!nextZone.memo) {
            nextZone.memo = '이상 없음'; // Default memo
        }
    }

    renderPatrolProgressUI();
    updatePatrolMapMarkers();
    
    const nextName = nextZone ? nextZone.location.split('(')[0] : '다음 구역';
    showToast(`${currentZone ? currentZone.location.split('(')[0] : '구역'} 순찰 완료 → ${nextName}(으)로 이동하세요.`, 'success');

    savePatrolToServer();
}

async function endPatrol() {
    // Stop GPS tracking
    if (State.watchId) {
        navigator.geolocation.clearWatch(State.watchId);
        State.watchId = null;
    }

    // Record departure from current geofence if still inside
    if (State.isInsideGeofence && State.lastGeofenceZoneCode) {
        recordGeofenceDeparture(formatTimeHM(new Date()));
    }

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

        // Calculate GPS-based total distance
        let gpsDistance = 0;
        const trackPts = State.gpsTrackPoints || [];
        for (let i = 1; i < trackPts.length; i++) {
            gpsDistance += getVerifyDistance(
                trackPts[i - 1].lat, trackPts[i - 1].lng,
                trackPts[i].lat, trackPts[i].lng
            );
        }

        State.currentPatrol.points = State.patrolPoints;
        const visitedPoints = State.patrolPoints.filter(pt => pt.arrivalTime);
        State.currentPatrol.summary = {
            totalDistance: gpsDistance > 0 ? parseFloat((gpsDistance / 1000).toFixed(1)) : visitedPoints.length,
            totalTime: Math.round(totalMinutes) || Math.floor(State.elapsedSeconds / 60) || 2,
            patrolMethod: '도보 및 차량',
            patrolCount: `${visitedPoints.length}곳`
        };
        State.currentPatrol.status = 'completed';

        // Include GPS tracking data in patrol record
        State.currentPatrol.visitLog = State.visitLog || [];
        State.currentPatrol.gpsTrackPoints = State.gpsTrackPoints || [];
        State.currentPatrol.gpsSummary = generateGPSPatrolSummary();

        await savePatrolToServer();
    }

    showToast('순찰이 모두 완료되어 종료되었습니다.', 'success');
    State.userLocationMarker = null;
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
                course: State.currentPatrol.course,
                visitLog: State.currentPatrol.visitLog || State.visitLog || [],
                gpsTrackPoints: State.currentPatrol.gpsTrackPoints || State.gpsTrackPoints || [],
                gpsSummary: State.currentPatrol.gpsSummary || generateGPSPatrolSummary()
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
async function renderPatrolEnd() {
    // 1. 순찰 목록 캐시를 서버로부터 최신화하여 오늘 생성된 순찰일지도 드롭다운에 노출되도록 보장!
    try {
        const resp = await fetch('/api/patrols');
        const data = await resp.json();
        if (data.success) {
            State.allPatrolsCached = data.patrols;
        }
    } catch (err) {
        console.error('순찰 목록 갱신 실패:', err);
    }

    // 2. 순찰 날짜 표시 업데이트
    if (State.currentPatrol && State.currentPatrol.date) {
        const dateLabel = parseDateLabel(State.currentPatrol.date);
        const label = `${dateLabel} 순찰일지`;
        const optEnd = $('#patrolEndLogOption');
        if (optEnd) optEnd.textContent = label;
    }

    // 3. 드롭다운 채우기 및 이벤트 바인딩 (최신화 완료 후!)
    renderPatrolLogDropdown();

    // 4. Render summary
    renderPatrolEndSummary();
    renderPatrolEndTimeline();

    // 4.5. GPS Route Summary
    renderGPSRouteSummary();

    // 4.6. AI 섹션 렌더링
    renderAIPatrolEndSections();

    // 5. Init map (100ms 뒤에 안전하게 렌더링)
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

        // Add geofence circles and labeled markers
        const coords = [];
        State.patrolPoints.forEach((pt, idx) => {
            if (pt.lat && pt.lng) {
                const code = pt.code || String.fromCharCode(65 + idx);
                const isVisited = !!pt.arrivalTime;
                const markerColor = isVisited ? '#1e3a6e' : '#cbd5e1';

                // Geofence circle
                L.circle([pt.lat, pt.lng], {
                    radius: State.GEOFENCE_RADIUS || 100,
                    color: markerColor,
                    fillColor: markerColor,
                    fillOpacity: 0.05,
                    weight: 1,
                    dashArray: '4, 4',
                    interactive: false
                }).addTo(State.patrolEndMap);

                const icon = L.divIcon({
                    className: 'custom-marker',
                    html: `<div style="
                        width: 22px; height: 22px;
                        border-radius: 50%;
                        background: ${markerColor};
                        border: 2px solid white;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 9px;
                        font-weight: 800;
                        color: white;
                        font-family: -apple-system, sans-serif;
                    ">${code}</div>`,
                    iconSize: [22, 22],
                    iconAnchor: [11, 11]
                });
                const marker = L.marker([pt.lat, pt.lng], { icon }).addTo(State.patrolEndMap);
                const timeInfo = pt.arrivalTime ? `${pt.arrivalTime}${pt.departureTime ? ' ~ ' + pt.departureTime : ''}` : '미방문';
                marker.bindPopup(`<b>${pt.location}</b><br>${timeInfo}`);
                coords.push([pt.lat, pt.lng]);
            }
        });

        // Draw walked path (GPS trail) if available
        const walkedPath = State.currentPatrol?.gpsTrackPoints || State.patrolWalkedPath || [];
        if (walkedPath.length >= 2) {
            const walkedCoords = walkedPath.map(p => p.lat ? [p.lat, p.lng] : p);
            L.polyline(walkedCoords, {
                color: '#2563eb',
                weight: 4,
                opacity: 0.8,
                lineJoin: 'round',
                lineCap: 'round'
            }).addTo(State.patrolEndMap);

            // Extend bounds to include walked path
            const allCoords = [...coords, ...walkedCoords];
            if (allCoords.length > 0) {
                State.patrolEndMap.fitBounds(L.latLngBounds(allCoords).pad(0.2));
            }
        } else if (coords.length >= 2) {
            // Fallback: draw planned route
            L.polyline(coords, {
                color: '#1e3a6e',
                weight: 2,
                opacity: 0.6,
                dashArray: '6, 8'
            }).addTo(State.patrolEndMap);
            State.patrolEndMap.fitBounds(L.latLngBounds(coords).pad(0.3));
        }
    }, 100);
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

    // Places — prefer GPS visit log order when available
    const visitLog = patrol.visitLog || State.visitLog || [];
    let placesText = '';
    if (visitLog.length > 0) {
        const visitedNames = [];
        const seenCodes = new Set();
        visitLog.forEach(v => {
            if (!seenCodes.has(v.code)) {
                seenCodes.add(v.code);
                visitedNames.push(v.locationName.split('(')[0].trim());
            }
        });
        placesText = visitedNames.join('→');
    } else {
        const visitedPlaces = State.patrolPoints.filter(pt => pt.arrivalTime).map(pt => pt.location);
        placesText = visitedPlaces.length > 0 ? visitedPlaces.join('→') : '방문 구역 없음';
    }
    $('#reportPlaces').textContent = placesText;

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
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<div class="loading-spinner"></div> 보고서 생성 중...';
    }

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
        if (btn) {
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

// ═══════════════════════════════════════════
// AI ENGINE (CLIENT-SIDE)
// ═══════════════════════════════════════════

// 클라이언트 측 AI 분류기 (서버 호출 없이 즉시 분류)
const AI_CATEGORIES_CLIENT = {
    '안전계도': {
        keywords: ['구명조끼', '미착용', '계도', '안전', '주취자', '음주', '위험행위', '위험', '낚시객', '수영', '입수', '안전교육', '안전장비', '안전수칙', '경고', '주의', '해수욕', '물놀이'],
        icon: '🛡️', color: '#3182ce', cssClass: 'cat-safety'
    },
    '위험요소 발견': {
        keywords: ['파손', '누수', '균열', '붕괴', '위험', '고장', '손상', '노후', '침수', '유출', '기름', '오염', '표류', '부유물', '표류물', '장애물'],
        icon: '⚠️', color: '#e53e3e', cssClass: 'cat-danger'
    },
    '민원 대응': {
        keywords: ['민원', '신고', '소음', '불법주차', '주차', '항의', '분쟁', '갈등', '소란', '진정', '요청', '요구', '불만', '피해', '악취'],
        icon: '📋', color: '#d69e2e', cssClass: 'cat-complaint'
    },
    '시설 점검': {
        keywords: ['점검', '시설', '방파제', '부두', '잔교', '난간', '조명', 'cctv', '소화기', '구명환', '계류', '정박', '보수', '정비', '수리'],
        icon: '🔧', color: '#38a169', cssClass: 'cat-facility'
    },
    '단속 활동': {
        keywords: ['단속', '불법', '무허가', '어업', '밀수', '밀입국', '불법조업', '무면허', '과적', '위반', '적발', '검거', '체포', '수색', '조사'],
        icon: '🚨', color: '#805ad5', cssClass: 'cat-enforcement'
    }
};

function aiClassifyLocal(memoText) {
    const trimmed = (memoText || '').trim();
    if (!trimmed || trimmed === '' || trimmed === '이상 없음' || trimmed === '이상없음' || trimmed === '내용을 입력해주세요') {
        return { category: '이상 없음', icon: '✅', color: '#a0aec0', cssClass: 'cat-normal', confidence: 1.0 };
    }

    const text = memoText.toLowerCase();
    let bestCategory = null;
    let bestScore = 0;

    for (const [category, config] of Object.entries(AI_CATEGORIES_CLIENT)) {
        let score = 0;
        for (const kw of config.keywords) {
            if (text.includes(kw)) score++;
        }
        if (score > bestScore) {
            bestScore = score;
            bestCategory = category;
        }
    }

    if (bestCategory && bestScore > 0) {
        const config = AI_CATEGORIES_CLIENT[bestCategory];
        return { category: bestCategory, icon: config.icon, color: config.color, cssClass: config.cssClass, confidence: Math.min(0.95, 0.5 + bestScore * 0.15) };
    }

    return { category: '안전계도', icon: '🛡️', color: '#3182ce', cssClass: 'cat-safety', confidence: 0.6 };
}

function getCategoryBadgeClass(category) {
    const map = {
        '안전계도': 'cat-safety',
        '위험요소 발견': 'cat-danger',
        '민원 대응': 'cat-complaint',
        '시설 점검': 'cat-facility',
        '단속 활동': 'cat-enforcement',
        '이상 없음': 'cat-normal'
    };
    return map[category] || 'cat-normal';
}

// ═══════════════════════════════════════════
// AI DASHBOARD RENDERING
// ═══════════════════════════════════════════

async function renderAIDashboard() {
    try {
        await renderAICategorySummary();
        await renderAIPatternInsights();
    } catch (err) {
        console.error('AI 대시보드 렌더링 오류:', err);
    }
}

async function renderAICategorySummary() {
    const grid = $('#aiCategoryGrid');
    if (!grid) return;

    // 서버에서 패턴 분석 데이터 가져오기
    try {
        const resp = await fetch('/api/ai/pattern-analysis');
        const data = await resp.json();

        if (!data.success || !data.analysis) {
            grid.innerHTML = '<div class="ai-empty-state">순찰 데이터가 없습니다.</div>';
            return;
        }

        const breakdown = data.analysis.stats.categoryBreakdown || {};
        const categories = [
            { name: '안전계도', icon: '🛡️', color: '#3182ce' },
            { name: '위험요소 발견', icon: '⚠️', color: '#e53e3e' },
            { name: '민원 대응', icon: '📋', color: '#d69e2e' },
            { name: '시설 점검', icon: '🔧', color: '#38a169' },
            { name: '단속 활동', icon: '🚨', color: '#805ad5' }
        ];

        // 총 건수 표시 카드도 추가
        const totalCount = Object.values(breakdown).reduce((s, v) => s + v, 0);

        let html = `
            <div class="ai-category-card" style="border-color: rgba(102,126,234,0.2);">
                <span class="ai-category-icon">📊</span>
                <span class="ai-category-name">전체 특이사항</span>
                <span class="ai-category-count" style="color: #667eea;">${totalCount}</span>
                <span class="ai-category-unit">건</span>
            </div>
        `;

        categories.forEach(cat => {
            const count = breakdown[cat.name] || 0;
            html += `
                <div class="ai-category-card" style="border-color: ${cat.color}20;">
                    <span class="ai-category-icon">${cat.icon}</span>
                    <span class="ai-category-name">${cat.name}</span>
                    <span class="ai-category-count" style="color: ${cat.color};">${count}</span>
                    <span class="ai-category-unit">건</span>
                </div>
            `;
        });

        grid.innerHTML = html;
    } catch (err) {
        console.error('AI 카테고리 요약 오류:', err);
        grid.innerHTML = '<div class="ai-empty-state">AI 분석 데이터를 불러올 수 없습니다.</div>';
    }
}

async function renderAIPatternInsights() {
    const list = $('#aiInsightsList');
    if (!list) return;

    try {
        const resp = await fetch('/api/ai/pattern-analysis');
        const data = await resp.json();

        if (!data.success || !data.analysis || data.analysis.insights.length === 0) {
            list.innerHTML = '<div class="ai-empty-state">분석 가능한 패턴이 아직 없습니다.</div>';
            return;
        }

        let html = '';
        data.analysis.insights.forEach(insight => {
            html += `
                <div class="ai-insight-card ${insight.type}">
                    <span class="ai-insight-icon">${insight.icon}</span>
                    <div class="ai-insight-body">
                        <div class="ai-insight-title">${escapeHtml(insight.title)}</div>
                        <div class="ai-insight-message">${escapeHtml(insight.message)}</div>
                    </div>
                </div>
            `;
        });

        list.innerHTML = html;
    } catch (err) {
        console.error('AI 인사이트 렌더링 오류:', err);
        list.innerHTML = '<div class="ai-empty-state">AI 인사이트를 불러올 수 없습니다.</div>';
    }
}

// ═══════════════════════════════════════════
// AI PATROL END RENDERING
// ═══════════════════════════════════════════

async function renderAIPatrolEndSections() {
    try {
        await renderAIQualityCheck();
        await renderAIGeneratedReport();
    } catch (err) {
        console.error('AI 순찰 종료 렌더링 오류:', err);
    }
}

async function renderAIQualityCheck() {
    const container = $('#aiQualitySection');
    if (!container) return;

    const patrol = State.currentPatrol;
    if (!patrol) {
        container.innerHTML = '';
        return;
    }

    try {
        const resp = await fetch('/api/ai/quality-check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patrol })
        });
        const data = await resp.json();

        if (!data.success) {
            container.innerHTML = '';
            return;
        }

        const checkData = data.alerts || {};
        const score = checkData.score || 0;
        const checks = checkData.checks || [];
        const suggestions = checkData.suggestions || [];
        const styleCheck = checkData.styleCheck || { status: 'success', message: '표준 문체 적용 완료' };

        // Calculate stroke dashoffset for score gauge (radius 28, stroke-dasharray 176)
        const circumference = 176;
        const offset = circumference - (circumference * score) / 100;

        const scoreDesc = score >= 90 ? '매우 우수함 (즉시 제출 가능)' : score >= 75 ? '양호 (보완 후 제출 권장)' : '보완 필요 (필수 항목 누락)';
        const scoreColor = score >= 90 ? '#10b981' : score >= 75 ? '#d97706' : '#ef4444';

        // Map status to icon and class
        const checkIcons = {
            'success': '✅',
            'warning': '⚠️',
            'error': '❌',
            'info': 'ℹ️'
        };

        let checklistHtml = '';
        checks.forEach(c => {
            checklistHtml += `
                <div class="ai-checklist-item ${c.status}" title="${escapeHtml(c.message)}">
                    <span class="ai-checklist-icon">${checkIcons[c.status] || 'ℹ️'}</span>
                    <span class="ai-checklist-text">${escapeHtml(c.name)}</span>
                </div>
            `;
        });

        let suggestionsHtml = '';
        if (suggestions.length > 0) {
            suggestionsHtml = `
                <div class="ai-quality-suggestions-box">
                    <div class="suggestions-title">
                        <span>💡</span> AI 품질 개선 제안
                    </div>
                    <ul class="suggestions-list">
                        ${suggestions.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
                    </ul>
                </div>
            `;
        } else {
            suggestionsHtml = `
                <div class="ai-quality-suggestions-box" style="border-color: #a7f3d0; background: #f0fdf4;">
                    <div class="suggestions-title" style="color: #065f46;">
                        <span>🎉</span> AI 품질 점검 완료
                    </div>
                    <p style="font-size: 12px; color: #047857; margin: 0;">모든 필수 항목이 완벽하게 작성되었으며 표준 문체를 준수하고 있습니다.</p>
                </div>
            `;
        }

        const styleBadgeClass = styleCheck.status === 'success' ? 'style-check-success' : 'style-check-warning';
        const styleBadgeIcon = styleCheck.status === 'success' ? '✓' : '⚠';

        container.innerHTML = `
            <div class="ai-quality-card-premium">
                <div class="ai-quality-card-header">
                    <div class="ai-quality-header-title">
                        <span class="ai-quality-header-icon">🛡️</span>
                        <span>AI 보고서 품질 검사</span>
                    </div>
                    <span class="${styleBadgeClass}">${styleBadgeIcon} ${escapeHtml(styleCheck.message)}</span>
                </div>

                <div class="ai-quality-score-row">
                    <div class="quality-gauge-container">
                        <svg class="gauge-svg" width="64" height="64">
                            <circle class="gauge-circle-bg" stroke-width="4.5" fill="transparent" r="28" cx="32" cy="32"/>
                            <circle class="gauge-circle-fill" stroke="${scoreColor}" stroke-width="4.5" fill="transparent" r="28" cx="32" cy="32" 
                                    style="stroke-dashoffset: ${offset};"/>
                        </svg>
                        <div class="gauge-score-text">${score}점</div>
                    </div>
                    <div class="ai-quality-score-info">
                        <div class="ai-quality-score-label">보고서 품질 점수</div>
                        <div class="ai-quality-score-desc" style="color: ${scoreColor}; font-weight: 700;">${scoreDesc}</div>
                    </div>
                </div>

                <div class="ai-quality-checklist">
                    ${checklistHtml}
                </div>

                ${suggestionsHtml}
            </div>
        `;
    } catch (err) {
        console.error('AI 품질 점검 렌더링 오류:', err);
        container.innerHTML = '<div class="ai-empty-state">품질 점검 데이터를 불러올 수 없습니다.</div>';
    }
}

async function renderAIGeneratedReport() {
    const contentEl = $('#aiReportContent');
    const classEl = $('#aiClassifications');
    if (!contentEl || !classEl) return;

    const patrol = State.currentPatrol;
    if (!patrol || !patrol.points || patrol.points.length === 0) {
        contentEl.innerHTML = '<div class="ai-typing-placeholder">순찰 기록이 없어 일지를 생성할 수 없습니다.</div>';
        classEl.innerHTML = '';
        return;
    }

    // 로딩 상태
    contentEl.innerHTML = '<div class="ai-typing-placeholder">AI가 순찰일지를 작성하고 있습니다...</div>';
    classEl.innerHTML = '';

    try {
        const resp = await fetch('/api/ai/generate-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patrol })
        });
        const data = await resp.json();

        if (!data.success) {
            contentEl.innerHTML = '<div class="ai-typing-placeholder">일지 생성에 실패하였습니다.</div>';
            return;
        }

        // 타이핑 애니메이션으로 보고서 텍스트 표시
        setTimeout(() => {
            contentEl.innerHTML = `<div class="ai-report-text">${escapeHtml(data.report)}</div>`;
        }, 500);

        // 분류 뱃지 렌더링
        if (data.classifications && data.classifications.length > 0) {
            let badgesHtml = '';
            data.classifications.forEach((cls, idx) => {
                if (cls.classification.category === '이상 없음' && ((cls.memo || '').trim() === '해안순찰 전 안전교육 실시' || (cls.memo || '').trim() === '내용을 입력해주세요' || (cls.memo || '').trim() === '이상 없음' || (cls.memo || '').trim() === '이상없음' || (cls.memo || '').trim() === '')) return;
                const badgeClass = getCategoryBadgeClass(cls.classification.category);
                badgesHtml += `
                    <span class="ai-class-badge ${badgeClass}" style="animation-delay: ${idx * 0.1}s;">
                        <span class="ai-class-badge-icon">${cls.classification.icon}</span>
                        ${escapeHtml(cls.classification.category)}
                        ${cls.memo ? ` · ${escapeHtml(cls.memo.substring(0, 15))}` : ''}
                    </span>
                `;
            });
            classEl.innerHTML = badgesHtml;
        }
    } catch (err) {
        console.error('AI 보고서 생성 오류:', err);
        contentEl.innerHTML = '<div class="ai-typing-placeholder">AI 서버 연결에 실패하였습니다.</div>';
    }
}

// ═══════════════════════════════════════════
// AI MEMO REALTIME CLASSIFICATION
// ═══════════════════════════════════════════

let aiClassifyTimeout = null;

function setupAIMemoClassification() {
    const memoInput = $('#sheetMemoInput');
    const badge = $('#aiClassifyBadge');
    if (!memoInput || !badge) return;

    // 입력 이벤트에 디바운스된 AI 분류 호출
    memoInput.addEventListener('input', (e) => {
        const text = e.target.value;

        if (aiClassifyTimeout) clearTimeout(aiClassifyTimeout);

        aiClassifyTimeout = setTimeout(() => {
            if (!text || text.trim() === '') {
                badge.textContent = '입력 대기 중';
                badge.style.background = 'var(--gray-100)';
                badge.style.color = 'var(--gray-500)';
                badge.classList.remove('active');
                return;
            }

            const result = aiClassifyLocal(text);
            badge.textContent = `${result.icon} ${result.category}`;
            badge.style.background = `${result.color}15`;
            badge.style.color = result.color;
            badge.classList.remove('active');
            // Force reflow for re-animation
            void badge.offsetWidth;
            badge.classList.add('active');
        }, 300);
    });
}

// Quick tag 클릭 시에도 AI 분류 업데이트
function updateAIClassifyFromTag(tagText) {
    const badge = $('#aiClassifyBadge');
    if (!badge) return;

    const result = aiClassifyLocal(tagText);
    badge.textContent = `${result.icon} ${result.category}`;
    badge.style.background = `${result.color}15`;
    badge.style.color = result.color;
    badge.classList.remove('active');
    void badge.offsetWidth;
    badge.classList.add('active');
}


// ═══════════════════════════════════════════
// ACTIVE PATROL GPS ENGINE — GEOFENCING SYSTEM
// ═══════════════════════════════════════════

function handlePatrolGPSUpdate(lat, lng) {
    if (State.currentScreen !== 'Patrol') return;

    State.currentLat = lat;
    State.currentLng = lng;

    if (!State.patrolWalkedPath) {
        State.patrolWalkedPath = [];
    }

    // Throttle GPS track point storage: only store if moved 10m+ or 5s+ elapsed
    const now = Date.now();
    const lastTrack = State.gpsTrackPoints[State.gpsTrackPoints.length - 1];
    let shouldStore = false;

    if (!lastTrack) {
        shouldStore = true;
    } else {
        const timeDiff = now - lastTrack.timestamp;
        const distDiff = getVerifyDistance(lat, lng, lastTrack.lat, lastTrack.lng);
        if (timeDiff >= 5000 || distDiff >= 10) {
            shouldStore = true;
        }
    }

    if (shouldStore) {
        State.gpsTrackPoints.push({ lat, lng, timestamp: now });
        // Also add to walked path for polyline
        const lastPt = State.patrolWalkedPath[State.patrolWalkedPath.length - 1];
        if (!lastPt || lastPt[0] !== lat || lastPt[1] !== lng) {
            State.patrolWalkedPath.push([lat, lng]);
        }
    }

    // ─── GEOFENCING: Check ALL registered zones ───
    let closestZone = null;
    let closestDist = Infinity;
    let insideAnyGeofence = false;

    // Check all patrol points (registered zones for this patrol)
    const allZonesToCheck = State.patrolPoints;

    allZonesToCheck.forEach(zone => {
        if (!zone.lat || !zone.lng) return;
        const dist = getVerifyDistance(lat, lng, zone.lat, zone.lng);
        if (dist < closestDist) {
            closestDist = dist;
            closestZone = zone;
        }
        if (dist <= State.GEOFENCE_RADIUS) {
            insideAnyGeofence = true;
        }
    });

    // ─── Geofence Enter/Exit Detection ───
    const timeStr = formatTimeHM(new Date());
    
    if (insideAnyGeofence && closestZone && closestDist <= State.GEOFENCE_RADIUS) {
        const zoneCode = closestZone.code;
        const zoneName = closestZone.location || closestZone.name || zoneCode;

        if (!State.isInsideGeofence || State.lastGeofenceZoneCode !== zoneCode) {
            // ── ENTERED a new geofence zone ──
            
            // If we were in another zone, record departure from previous
            if (State.isInsideGeofence && State.lastGeofenceZoneCode && State.lastGeofenceZoneCode !== zoneCode) {
                recordGeofenceDeparture(timeStr);
            }

            // Check re-visit cooldown (5 min)
            const lastVisitToThisZone = [...State.visitLog].reverse().find(v => v.code === zoneCode);
            const canRecord = !lastVisitToThisZone || 
                (now - new Date(lastVisitToThisZone.arrivalTimestamp).getTime() > 5 * 60 * 1000);

            if (canRecord) {
                // Record arrival in visit log
                State.visitLog.push({
                    locationName: zoneName,
                    code: zoneCode,
                    lat: closestZone.lat,
                    lng: closestZone.lng,
                    arrivalTime: timeStr,
                    arrivalTimestamp: new Date().toISOString(),
                    departureTime: null,
                    departureTimestamp: null,
                    stayDuration: null,
                    type: 'arrival'
                });

                // Auto-mark patrol point as arrived if it hasn't been
                const patrolPt = State.patrolPoints.find(pt => pt.code === zoneCode);
                if (patrolPt && !patrolPt.arrivalTime) {
                    patrolPt.arrivalTime = timeStr;
                }

                // ─── 핵심: GPS 기반 자동 구역 전환 ───
                // 진입한 구역의 인덱스를 찾아서 currentZoneIdx를 적절히 전환
                const enteredZoneIdx = State.patrolPoints.findIndex(pt => pt.code === zoneCode);
                
                if (enteredZoneIdx >= 0) {
                    const currentIdx = State.currentZoneIdx;
                    
                    if (enteredZoneIdx === currentIdx) {
                        // 현재 활성 구역에 도착 — 도착만 기록 (사용자가 메모 입력 후 다음으로)
                        showToast(`📍 ${zoneName.split('(')[0]}에 도착하였습니다 (${timeStr})`, 'success');
                    } else if (enteredZoneIdx > currentIdx) {
                        // 다음 구역(또는 그 이후 구역)에 도착 — 이전 구역들을 자동 완료 처리
                        for (let i = currentIdx; i < enteredZoneIdx; i++) {
                            const skippedZone = State.patrolPoints[i];
                            if (skippedZone && !skippedZone.completed) {
                                if (!skippedZone.arrivalTime) skippedZone.arrivalTime = timeStr;
                                if (!skippedZone.departureTime) skippedZone.departureTime = timeStr;
                                skippedZone.completed = true;
                            }
                        }
                        State.currentZoneIdx = enteredZoneIdx;
                        showToast(`📍 ${zoneName.split('(')[0]}에 도착하였습니다 — 자동 전환 (${timeStr})`, 'success');
                    } else {
                        // 이미 지나온 구역에 재진입 — 재방문 기록만 남김
                        showToast(`🔄 ${zoneName.split('(')[0]} 재방문 (${timeStr})`, 'info');
                    }
                } else {
                    showToast(`📍 ${zoneName.split('(')[0]}에 진입하였습니다 (${timeStr})`, 'success');
                }

                renderVisitLogTimeline();
                renderPatrolProgressUI();
                updateBottomSheetForCurrentZone();
            }

            State.lastGeofenceZoneCode = zoneCode;
            State.lastGeofenceEntryTime = now;
            State.currentLocationName = zoneName.split('(')[0];
        }

        State.isInsideGeofence = true;
        updateGPSStatusBanner('strong', State.currentLocationName, 'inside');
    } else {
        // Outside all geofences
        if (State.isInsideGeofence && State.lastGeofenceZoneCode) {
            // ── EXITED the geofence zone ──
            recordGeofenceDeparture(timeStr);
            State.currentLocationName = '';
        }

        State.isInsideGeofence = false;
        State.lastGeofenceZoneCode = null;

        // Show nearest zone info
        if (closestZone) {
            const nearName = (closestZone.location || closestZone.name || '').split('(')[0];
            const distKm = closestDist >= 1000 ? `${(closestDist / 1000).toFixed(1)}km` : `${Math.round(closestDist)}m`;
            updateGPSStatusBanner('strong', `${nearName} 방향 이동 중 (${distKm})`, 'moving');
        } else {
            updateGPSStatusBanner('strong', '순찰 구역 외 이동 중', 'outside');
        }
    }

    updatePatrolMapMarkers();
}

function recordGeofenceDeparture(timeStr) {
    // Find the last visit log entry for the departing zone
    const lastEntry = [...State.visitLog].reverse().find(
        v => v.code === State.lastGeofenceZoneCode && !v.departureTime
    );
    
    if (lastEntry) {
        lastEntry.departureTime = timeStr;
        lastEntry.departureTimestamp = new Date().toISOString();
        
        // Calculate stay duration
        if (State.lastGeofenceEntryTime) {
            const stayMs = Date.now() - State.lastGeofenceEntryTime;
            lastEntry.stayDuration = Math.round(stayMs / 1000); // in seconds
        }
    }

    // Also update patrol point departure time
    const patrolPt = State.patrolPoints.find(pt => pt.code === State.lastGeofenceZoneCode);
    if (patrolPt && patrolPt.arrivalTime && !patrolPt.departureTime) {
        patrolPt.departureTime = timeStr;
    }

    const departureName = (patrolPt ? patrolPt.location : State.lastGeofenceZoneCode || '').split('(')[0];
    showToast(`🚶 ${departureName}에서 이탈하였습니다 (${timeStr})`, 'info');
    renderVisitLogTimeline();
}

// ═══════════════════════════════════════════
// GPS UI HELPER FUNCTIONS
// ═══════════════════════════════════════════

function updateGPSStatusBanner(signal, locationName, geofenceState) {
    const signalDot = $('#gpsSignalDot');
    const signalLabel = $('#gpsSignalLabel');
    const locationEl = $('#gpsLocationName');
    const badge = $('#gpsGeofenceBadge');

    if (signalDot) {
        signalDot.className = 'gps-signal-dot' + (signal === 'strong' ? '' : signal === 'weak' ? ' weak' : ' off');
    }
    if (signalLabel) {
        signalLabel.textContent = signal === 'strong' ? 'GPS' : signal === 'weak' ? '탐색' : '끊김';
    }
    if (locationEl) {
        locationEl.innerHTML = `<span class="location-icon">📍</span> ${locationName || '위치 확인 중...'}`;
    }
    if (badge) {
        badge.className = 'gps-geofence-badge ' + (geofenceState || 'outside');
        if (geofenceState === 'inside') {
            badge.textContent = '구역 내';
        } else if (geofenceState === 'moving') {
            badge.textContent = '이동 중';
        } else {
            badge.textContent = '탐색 중';
        }
    }
}

function renderVisitLogTimeline() {
    const timeline = $('#visitLogTimeline');
    const countEl = $('#visitLogCount');
    if (!timeline) return;

    const log = State.visitLog || [];
    
    if (countEl) {
        countEl.textContent = `${log.length}건`;
    }

    if (log.length === 0) {
        timeline.innerHTML = '<div class="visit-log-empty">순찰을 시작하면 방문 기록이 표시됩니다.</div>';
        return;
    }

    let html = '';
    // Show in reverse order (newest first)
    [...log].reverse().forEach((entry, idx) => {
        const isLatest = idx === 0;
        const hasDeparted = !!entry.departureTime;
        const dotClass = isLatest && !hasDeparted ? 'current' : hasDeparted ? 'departed' : 'arrived';
        
        let badgeHtml = '';
        if (isLatest && !hasDeparted) {
            badgeHtml = '<span class="visit-log-badge staying">체류 중</span>';
        } else if (hasDeparted) {
            const stayText = entry.stayDuration ? formatStayDuration(entry.stayDuration) : '';
            badgeHtml = `<span class="visit-log-badge departure">출발${stayText ? ' · ' + stayText : ''}</span>`;
        } else {
            badgeHtml = '<span class="visit-log-badge arrival">도착</span>';
        }

        const timeText = hasDeparted ? 
            `${entry.arrivalTime} → ${entry.departureTime}` : 
            `${entry.arrivalTime} ~`;

        html += `
            <div class="visit-log-item">
                <div class="visit-log-dot ${dotClass}"></div>
                <div class="visit-log-content">
                    <div class="visit-log-location">${escapeHtml(entry.locationName.split('(')[0])}</div>
                    <div class="visit-log-time">${timeText}</div>
                </div>
                ${badgeHtml}
            </div>
        `;
    });

    timeline.innerHTML = html;
    // Auto-scroll to top (newest entry)
    timeline.scrollTop = 0;
}

function formatStayDuration(seconds) {
    if (seconds < 60) return `${seconds}초`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins < 60) return `${mins}분${secs > 0 ? ' ' + secs + '초' : ''}`;
    const hrs = Math.floor(mins / 60);
    const remainMins = mins % 60;
    return `${hrs}시간 ${remainMins}분`;
}

// ═══════════════════════════════════════════
// GPS PATROL SUMMARY GENERATION
// ═══════════════════════════════════════════

function generateGPSPatrolSummary() {
    const log = State.visitLog || [];
    if (log.length === 0) return '';

    // Group by unique visits (arrival records)
    const visitEntries = [];
    const seen = new Set();

    log.forEach(entry => {
        const key = `${entry.code}-${entry.arrivalTime}`;
        if (!seen.has(key)) {
            seen.add(key);
            visitEntries.push(entry);
        }
    });

    if (visitEntries.length === 0) return '';

    // Build summary string: "09:47 본청 출발 → 09:55 A구역 도착 → 10:03 B구역 점검"
    const parts = [];
    visitEntries.forEach((entry, idx) => {
        const name = entry.locationName.split('(')[0].trim();
        if (idx === 0) {
            parts.push(`${entry.arrivalTime} ${name} 출발`);
        } else {
            parts.push(`${entry.arrivalTime} ${name} 도착`);
        }
        if (entry.departureTime && idx < visitEntries.length - 1) {
            parts.push(`${entry.departureTime} ${name} 출발`);
        }
    });

    return parts.join(' → ');
}

function generateGPSPatrolSummaryHTML() {
    const log = State.visitLog || [];
    if (log.length === 0) return '<span style="color: #64748b;">GPS 경로 데이터 없음</span>';

    const parts = [];
    const visitEntries = [];
    const seen = new Set();

    log.forEach(entry => {
        const key = `${entry.code}-${entry.arrivalTime}`;
        if (!seen.has(key)) {
            seen.add(key);
            visitEntries.push(entry);
        }
    });

    visitEntries.forEach((entry, idx) => {
        const name = entry.locationName.split('(')[0].trim();
        if (idx > 0) {
            parts.push('<span class="route-arrow">→</span>');
        }
        const action = idx === 0 ? '출발' : '도착';
        parts.push(`<span class="route-time">${entry.arrivalTime}</span> <span class="route-place">${escapeHtml(name)}</span> ${action}`);
    });

    return parts.join(' ');
}

function renderGPSRouteSummary() {
    const textEl = $('#gpsRouteSummaryText');
    const statsEl = $('#gpsStatsRow');
    if (!textEl) return;

    const log = State.visitLog || [];
    const trackPoints = State.gpsTrackPoints || [];

    if (log.length === 0) {
        textEl.innerHTML = '<span style="color: #64748b;">GPS 경로 데이터가 없습니다.</span>';
        if (statsEl) statsEl.innerHTML = '';
        return;
    }

    // Render summary text
    textEl.innerHTML = generateGPSPatrolSummaryHTML();

    // Calculate stats
    const totalVisits = new Set(log.map(e => e.code)).size;
    
    let totalDistance = 0;
    for (let i = 1; i < trackPoints.length; i++) {
        totalDistance += getVerifyDistance(
            trackPoints[i - 1].lat, trackPoints[i - 1].lng,
            trackPoints[i].lat, trackPoints[i].lng
        );
    }
    const distKm = (totalDistance / 1000).toFixed(1);

    const totalStayTime = log.reduce((sum, e) => sum + (e.stayDuration || 0), 0);
    const stayMins = Math.round(totalStayTime / 60);

    if (statsEl) {
        statsEl.innerHTML = `
            <div class="gps-stat-chip">
                <span class="stat-val">${totalVisits}</span>
                <span class="stat-lbl">방문 지점</span>
            </div>
            <div class="gps-stat-chip">
                <span class="stat-val">${distKm}km</span>
                <span class="stat-lbl">이동 거리</span>
            </div>
            <div class="gps-stat-chip">
                <span class="stat-val">${stayMins}분</span>
                <span class="stat-lbl">체류 시간</span>
            </div>
            <div class="gps-stat-chip">
                <span class="stat-val">${trackPoints.length}</span>
                <span class="stat-lbl">GPS 포인트</span>
            </div>
        `;
    }
}

function getVerifyDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // meters
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const deltaPhi = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

