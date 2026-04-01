# Psychology Effects App (psyApp) - Trạng thái Dự án (Cập nhật 01/04/2026)

Tài liệu này lưu trữ toàn bộ các chức năng đã hoàn thiện và cấu trúc hiện tại của ứng dụng.

## 1. Tổng quan Dự án
Ứng dụng giáo dục tâm lý học được gamification (trò chơi hóa), giúp người dùng học về các thiên lệch nhận thức và hiệu ứng tâm lý thông qua việc đọc bài và làm trắc nghiệm tình huống để tích lũy XP, lên cấp và nhận huy hiệu.

## 2. Công nghệ Sử dụng
- **Cốt lõi**: React Native, TypeScript.
- **Điều hướng**: React Navigation (Tabs & Stack).
- **Lưu trữ**: AsyncStorage (Lưu tiến trình người dùng).
- **Trạng thái**: React Context (GameContext để quản lý XP, Level, Gems).

## 3. Các Chức năng Đã Hoàn thiện (DONE)

### ✅ Hệ thống Học tập (Reading)
- **Danh sách 15 Hiệu ứng**: Đã biên soạn nội dung chuyên sâu cho 15 hiệu ứng tâm lý hàng đầu (Dunning-Kruger, Halo, Bystander, Pygmalion, Anchoring, Sunk Cost, v.v.).
- **Phân loại (Categories)**: Chia bài học thành 3 nhóm: *Nhận thức*, *Cảm xúc*, và *Xã hội*.
- **Nội dung đa tầng**: Mỗi bài học gồm: Định nghĩa, Nguồn gốc, Thí nghiệm, Tác động thần kinh, Ví dụ thực tế và Cách phòng tránh.

### ✅ Hệ thống Trắc nghiệm (Gamified Quiz)
- **6 Vùng đất (Regions)**: Bài học được chia theo các vùng đất như *Vương quốc Thiên lệch*, *Rừng Cảm xúc*, *Mê cung Ký ức*, v.v.
- **Công cụ làm bài (Quiz Engine)**: 
    - Hỗ trợ câu hỏi Trắc nghiệm và Tình huống (Scenario).
    - Có thời gian đếm ngược (Timer) cho mỗi câu hỏi.
    - Phản hồi ngay lập tức (Correct/Wrong) kèm giải thích chi tiết.
- **Hệ thống Phần thưởng**: Nhận XP và Gems sau mỗi bài quiz thành công.

### ✅ Cơ chế Trò chơi (Game Mechanics)
- **Hệ thống Cấp độ (Leveling)**: Tích lũy XP để lên cấp, yêu cầu XP tăng dần theo cấp độ.
- **Hệ thống Chuỗi (Streak)**: Theo dõi số ngày học liên tục để khuyến khích thói quen.
- **Lưu trữ tiến trình**: Tự động lưu cấp độ, số gems, và danh sách các bài quiz đã hoàn thành vào máy.

### ✅ Giao diện & Trải nghiệm (UI/UX)
- **Premium Dark Mode**: Giao diện tối hiện đại, sử dụng màu sắc nhấn (accent colors) theo từng vùng đất.
- **Hiệu ứng chuyển động**: Sử dụng `Animated` API cho các thanh tiến trình, hiệu ứng xuất hiện câu hỏi mượt mà.

## 4. Cấu trúc Dữ liệu Quan trọng

### 📄 `src/data/effects.ts`
Chứa 15 bài học chi tiết với model `EffectModel`.
### 📄 `src/data/quizzes.ts`
Chứa dữ liệu cho hàng chục bài trắc nghiệm chia theo `QUEST_REGIONS`.
### 📄 `src/context/gameContext.tsx`
Quản lý toàn bộ "linh hồn" của game: XP, Level, Gems, Streak và logic lưu trữ.

### ✅ Profile, Theo dõi & Hoạt ảnh (Gamification)
- **Hồ sơ Cá nhân (ProfileScreen)**: Thay thế màn Bookmark cũ thành hub tổng quát. Hiển thị tổng quan Streak, XP, Gems và các bài học đã qua.
- **Lưu bài học (Bookmarks)**: Logic lưu bài vào tab "Hồ sơ" đã hoàn tất.
- **Hệ thống Huy hiệu (Badges)**: Đã có màn hình hiển thị bộ sưu tập huy hiệu đạt được (bên trong Profile).
- **Trợ lý Ảo (Dr. Psy)**: Lời thoại được tích hợp sâu (trên Home, QuizScreen, QuizResult, DetailScreen).
- **Celebration Animations**: Hiệu ứng tung confetti, rung lắc vòng sáng khi Thăng cấp (Level Up) hoặc Mở khóa Huy hiệu (Badge Unlocked).

### ✅ Cửa hàng & Kinh tế trong Game (Economy)
- **Cửa hàng Vật phẩm (ShopScreen)**: Thêm Tab Cửa hàng. Nơi cung cấp các vật phẩm có thể mua bằng số Gem kiếm được.
- **Premium Effects**: 3 bài học nội dung đặc biệt (Gaslighting, Stockholm, Nocebo) bị khóa ở trang chủ và chỉ có thể mở khóa thông qua Shop.
- **Trang phục Động (Dr. Psy Skins)**: Tùy chỉnh nhân vật Dr. Psy với các chức danh pháp sư, gia cát lượng v.v. bằng cách chi tiêu Gems.

### ✅ Phân tích Tình huống Thông minh (Hybrid AI Analysis)
- **Gemini AI Integration**: Tích hợp Gemini API để thực hiện phân tích 4 tầng sâu sắc (Nhận diện, Động lực, Sự thật phũ phàng, Lời khuyên chiến thuật).
- **Dual-Engine Strategy**: Hệ thống tự động chuyển đổi giữa AI (khi có mạng & API Key) và Rule-based (khi ngoại tuyến) để đảm bảo trải nghiệm không bao giờ gián đoạn.
- **Async API Management**: Lưu trữ API Key an toàn trên thiết bị thông qua `AsyncStorage`.

### ✅ Siêu Bộ Não Ngoại Tuyến (Expanded Offline Brain)
- **51 Quy luật Tâm lý**: Mở rộng lên 51 quy luật bao phủ Nhận thức, Cảm xúc, Xã hội, Thao túng, Ký ức, Quyết định và Kiểu gắn bó.
- **Chuyên sâu Tình yêu & Công việc**: Bổ sung các quy luật thực chiến mới như *Love Bombing, Gaslighting công sở, Burnout, Breadcrumbing, Red Flag, Attachment Styles*...
- **Hàng trăm Từ khóa thực tế**: Cập nhật từ lóng, thuật ngữ đời thường tiếng Việt để tăng độ nhạy khi "đọc vị" người dùng.

## 4. Cấu trúc Dữ liệu Quan trọng

### 📄 `src/data/analyzerRules.ts`
Cơ sở dữ liệu "não bộ" ngoại tuyến với 51 quy luật và hàng nghìn từ khóa trigger.
### 📄 `src/services/geminiService.ts`
Dịch vụ kết nối và xử lý logic AI phức tạp từ Gemini Pro.

---
*Tài liệu này được cập nhật để AI có thể nắm bắt nhanh tiến độ dự án.*
