# Hướng dẫn đưa thiệp lên GitHub Pages + nhận xác nhận tham dự

## A. Nối form với Google Sheet (làm 1 lần, ~5 phút)
1. Tạo Google Sheet mới, đặt tên tuỳ ý (ví dụ "Xác nhận tham dự lễ tốt nghiệp").
2. Menu **Tiện ích mở rộng → Apps Script**.
3. Xoá code mẫu, dán toàn bộ nội dung file `apps-script.gs` vào, bấm lưu.
4. Bấm **Triển khai → Tùy chọn triển khai mới → loại "Ứng dụng web"**:
   - Thực thi dưới tên: **Tôi**
   - Ai có quyền truy cập: **Bất kỳ ai**
5. Bấm Triển khai, cấp quyền khi Google hỏi, rồi **copy URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).
6. Mở `index.html`, tìm dòng `const SCRIPT_URL = "";` và dán URL vào giữa hai dấu ngoặc kép.

Câu trả lời sẽ hiện ở tab **RSVP** trong Sheet: thời gian, tên, trạng thái, số người, lời chúc.
Nếu sau này sửa code Apps Script, nhớ **Triển khai → Quản lý triển khai → Sửa → Phiên bản mới**.

## B. Đưa lên GitHub Pages
1. Tạo repo mới trên GitHub (ví dụ `thiep-moi`), để Public.
2. Upload **toàn bộ** nội dung thư mục này (`index.html`, thư mục `images/`, ...) lên nhánh `main`.
3. Vào **Settings → Pages → Build and deployment → Source: Deploy from a branch**, chọn `main` và thư mục `/ (root)`, bấm Save.
4. Chờ 1–2 phút, link sẽ là `https://<tên-github>.github.io/thiep-moi/`.

## C. Gửi link riêng cho từng người (tuỳ chọn)
Thêm `?ten=` vào cuối link để ô tên được điền sẵn, ví dụ:
`https://<tên-github>.github.io/thiep-moi/?ten=Cô%20Lan`
Tên này cũng được ghi vào cột "Link riêng" trong Sheet để bạn biết ai đã trả lời.

## D. Thử trước khi gửi
Khi `SCRIPT_URL` còn trống, form chạy ở chế độ thử (hiện thông báo thành công nhưng không lưu). Sau khi dán URL, hãy tự gửi 1 câu trả lời thử rồi xoá dòng đó trong Sheet.
