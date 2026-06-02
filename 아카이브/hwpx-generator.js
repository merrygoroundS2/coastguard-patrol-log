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
  <hp:borderFills count="2">
    <hp:borderFill id="1" threeD="0" shadow="0">
      <hp:slash type="none"/>
      <hp:backSlash type="none"/>
      <hp:leftEdge><hp:line type="solid" width="0.12mm" color="000000"/></hp:leftEdge>
      <hp:rightEdge><hp:line type="solid" width="0.12mm" color="000000"/></hp:rightEdge>
      <hp:topEdge><hp:line type="solid" width="0.12mm" color="000000"/></hp:topEdge>
      <hp:bottomEdge><hp:line type="solid" width="0.12mm" color="000000"/></hp:bottomEdge>
      <hp:diagonal type="none"/>
    </hp:borderFill>
  </hp:borderFills>
  <hp:charProps>
    <hp:charPr id="0" height="1000" fontIdRef="0"/>
    <hp:charPr id="1" height="1600" fontIdRef="0" bold="1"/>
    <hp:charPr id="2" height="1100" fontIdRef="0" bold="1"/>
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
 * 표 셀 XML 생성
 */
function createCellXml(text, col, row, charPrId = '0', paraPrId = '0') {
    const escapedText = escapeXml(text);
    return `<hp:tc>
            <hp:tcPr>
              <hp:cellAddr colAddr="${col}" rowAddr="${row}"/>
              <hp:cellSpan colSpan="1" rowSpan="1"/>
              <hp:borderFillID ref="1"/>
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
function generateSection0Xml(records, authorName, reportDate) {
    let tableRows = '';

    // 헤더 행
    tableRows += `
        <hp:tr>
          ${createCellXml('날짜', 0, 0, '2', '1')}
          ${createCellXml('시간', 1, 0, '2', '1')}
          ${createCellXml('위치', 2, 0, '2', '1')}
          ${createCellXml('활동 내용', 3, 0, '2', '1')}
          ${createCellXml('비고', 4, 0, '2', '1')}
        </hp:tr>`;

    // 데이터 행
    records.forEach((r, idx) => {
        const rowIdx = idx + 1;
        const dateStr = formatDate(r.startTime);
        const timeStr = `${formatTime(r.startTime)} ~ ${formatTime(r.endTime)}`;
        const location = r.address || `${r.latitude}, ${r.longitude}`;
        const activity = r.activity || '';
        const note = r.note || '';

        tableRows += `
        <hp:tr>
          ${createCellXml(dateStr, 0, rowIdx, '0', '1')}
          ${createCellXml(timeStr, 1, rowIdx, '0', '1')}
          ${createCellXml(location, 2, rowIdx, '0', '2')}
          ${createCellXml(activity, 3, rowIdx, '0', '2')}
          ${createCellXml(note, 4, rowIdx, '0', '2')}
        </hp:tr>`;
    });

    const formattedReportDate = reportDate ? formatDate(reportDate) : formatDate(new Date().toISOString());

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<hp:section xmlns:hp="${NS_HP}">
  <hp:p paraPrIdRef="1">
    <hp:run charPrIdRef="1">
      <hp:t>일 지 보 고 서</hp:t>
    </hp:run>
  </hp:p>
  <hp:p/>
  <hp:tbl rowCnt="${records.length + 1}" colCnt="5" borderFillIDRef="1">
    <hp:tblPr>
      <hp:borderFillID ref="1"/>
    </hp:tblPr>
    ${tableRows}
  </hp:tbl>
  <hp:p/>
  <hp:p paraPrIdRef="3">
    <hp:run charPrIdRef="0">
      <hp:t>작성자: ${escapeXml(authorName || '___________')}</hp:t>
    </hp:run>
  </hp:p>
  <hp:p paraPrIdRef="3">
    <hp:run charPrIdRef="0">
      <hp:t>작성일: ${formattedReportDate}</hp:t>
    </hp:run>
  </hp:p>
</hp:section>`;
}

/**
 * HWPX 파일 생성 (Buffer 반환)
 */
async function generateHwpx(records, authorName, reportDate) {
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
        archive.append(generateSection0Xml(records, authorName, reportDate), { name: 'Contents/section0.xml' });

        archive.finalize();
    });
}

module.exports = { generateHwpx };
