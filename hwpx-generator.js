const archiver = require('archiver');
const { PassThrough } = require('stream');

/**
 * HWPX 일지보고서 생성기
 * OWPML(Open Word-Processor Markup Language) KS X 6101 표준 준수
 */

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

/**
 * 표 셀 XML 생성 (가로/세로 병합 및 테두리/배경색 리드 추가)
 */
function createCellXml(text, col, row, charPrId = '0', paraPrId = '0', colSpan = 1, rowSpan = 1, borderFillId = 1) {
    const escapedText = escapeXml(text);
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

function escapeXml(str) {
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

/**
 * Section0.xml 생성 (본문 내용)
 */
function generateSection0Xml(records, authorName, reportDate, courseName = '1코스') {
    // 1. 기본 데이터 가공 및 포맷
    const firstRecord = records[0] || {};
    const lastRecord = records[records.length - 1] || firstRecord;

    const dateVal = firstRecord.startTime ? formatDate(firstRecord.startTime) : formatDate(new Date().toISOString());
    
    // 시간 범위 파싱 (예: 10:20 ~ 11:20)
    const startTimeStr = firstRecord.startTime ? formatTime(firstRecord.startTime) : '00:00';
    const endTimeStr = lastRecord.endTime ? formatTime(lastRecord.endTime) : startTimeStr;
    const timeVal = `${startTimeStr} ~ ${endTimeStr}`;

    const typeVal = '해안순찰';

    // 순찰 코스 및 방문 경로 조합
    const pathAddresses = records
        .map(r => r.address || `${r.latitude.toFixed(4)}, ${r.longitude.toFixed(4)}`)
        .filter((val, index, self) => self.indexOf(val) === index); // 중복 제거
    const pathRoute = pathAddresses.join(' - ');
    const placeVal = `${courseName}: ${pathRoute}`;

    const officerVal = authorName || '경사 홍길동, 경장 윤봉길, 순경 안중근';

    // 2. 시간대별 순찰 특이사항 표 본문 행 생성
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

    // 3. 특이사항 내역 필터링 및 조립 (이상 없음/이상없음/순찰/공란 제외)
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
        // 특이사항이 없는 경우 서식 유지를 위해 2개의 기본 공란 행 배치
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
  <!-- 타이틀: 순찰일지 -->
  <hp:p paraPrIdRef="1">
    <hp:run charPrIdRef="3">
      <hp:t>순 찰 일 지</hp:t>
    </hp:run>
  </hp:p>
  <hp:p/>

  <!-- 1. 기본 정보 표 (6열, 3행) -->
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

  <!-- 2. 시간대별 순찰 특이사항 표 (3열, N+1행) -->
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

  <!-- 3. 특이사항 내역 표 (3열, incidentRowCnt+1행) -->
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

/**
 * HWPX 파일 생성 (Buffer 반환)
 */
async function generateHwpx(records, authorName, reportDate, courseName = '1코스') {
    return new Promise((resolve, reject) => {
        const buffers = [];
        const passthrough = new PassThrough();

        passthrough.on('data', chunk => buffers.push(chunk));
        passthrough.on('end', () => resolve(Buffer.concat(buffers)));
        passthrough.on('error', reject);

        const archive = archiver('zip', { zlib: { level: 9 } });
        archive.on('error', reject);
        archive.pipe(passthrough);

        // mimetype (비압축, 첫 번째 엔트리)
        archive.append(generateMimetype(), { name: 'mimetype', store: true });

        // META-INF
        archive.append(generateContainerXml(), { name: 'META-INF/container.xml' });
        archive.append(generateManifestXml(), { name: 'META-INF/manifest.xml' });

        // version.xml
        archive.append(generateVersionXml(), { name: 'version.xml' });

        // Contents
        archive.append(generateContentHpf(), { name: 'Contents/content.hpf' });
        archive.append(generateHeaderXml(), { name: 'Contents/header.xml' });
        archive.append(generateSection0Xml(records, authorName, reportDate, courseName), { name: 'Contents/section0.xml' });

        archive.finalize();
    });
}

module.exports = { generateHwpx };
