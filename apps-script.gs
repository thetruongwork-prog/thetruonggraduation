// Google Apps Script – nhận câu trả lời từ thiệp mời và ghi vào Google Sheet.
// Dán toàn bộ file này vào Apps Script của Google Sheet (xem HUONG-DAN.md).

const SHEET_NAME = 'RSVP';
const TRANG_THAI = { 'co': 'Sẽ đến', 'chua-chac': 'Chưa chắc', 'khong': 'Không đến được' };

function safe(v, max) {
  let s = String(v == null ? '' : v).slice(0, max);
  // chặn công thức độc hại khi mở trong Sheets/Excel
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Thời gian', 'Tên', 'Trạng thái', 'Số người', 'Lời chúc', 'Link riêng (ten=)']);
      sh.setFrozenRows(1);
    }
    const n = Math.max(0, Math.min(10, parseInt(d.songuoi, 10) || 0));
    sh.appendRow([
      new Date(),
      safe(d.ten, 60),
      TRANG_THAI[d.trangthai] || 'Chưa rõ',
      n,
      safe(d.loichuc, 400),
      safe(d.ref, 60)
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
