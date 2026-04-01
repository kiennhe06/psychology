// ─── Detective Missions ───────────────────────────────────────────────────────
// Danh sách các nhiệm vụ thực hành tâm lý ngoài đời thực.
// Khi hoàn thành, người dùng nhấn "Xác nhận" để nhận Badge và XP.

export interface Mission {
  id: string;
  title: string;
  category: 'social' | 'persuasion' | 'self-observe' | 'courage';
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  description: string;
  task: string;
  rewardXp: number;
  rewardBadgeId?: string;
  drPsyQuote: string;
}

export const MISSIONS: Mission[] = [
  {
    id: 'ms_compliment',
    title: 'Phá Băng Cảm Xúc',
    category: 'social',
    difficulty: 'EASY',
    description: 'Sử dụng Lời khen chân thành để thay đổi bầu không khí.',
    task: 'Hôm nay hãy khen ngợi ít nhất 3 người khác nhau về những điều nhỏ nhặt nhưng chân thành (Ví dụ: Một đôi giày đẹp, một nụ cười tươi, hay một ý kiến hay). Hãy quan sát phản ứng của họ.',
    rewardXp: 50,
    drPsyQuote: 'Lời khen là chìa khóa vạn năng mở cửa trái tim, thám tử ạ.'
  },
  {
    id: 'ms_say_no',
    title: 'Ranh Giới Thép',
    category: 'persuasion',
    difficulty: 'MEDIUM',
    description: 'Rèn luyện khả năng từ chối để bảo vệ giá trị bản thân.',
    task: 'Hãy dũng cảm nói "Không" với ít nhất một lời đề nghị hoặc công việc mà bạn thực sự không muốn làm hoặc không có nghĩa vụ phải làm. Đừng giải thích quá nhiều.',
    rewardXp: 100,
    drPsyQuote: 'Người thám tử giỏi biết khi nào nên đóng cửa văn phòng của mình.'
  },
  {
    id: 'ms_public_speak',
    title: 'Đối Mặt Spotlight',
    category: 'courage',
    difficulty: 'HARD',
    description: 'Chiến thắng Hiệu ứng Tiêu điểm (Spotlight Effect).',
    task: 'Hãy cố tình làm một việc gì đó hơi "kỳ quặc" ở nơi công cộng (Ví dụ: Hát khe khẽ khi đi bộ, mặc một chiếc áo sặc sỡ). Bạn sẽ thấy thực ra chẳng ai quan tâm đến bạn như bạn tưởng đâu.',
    rewardXp: 200,
    rewardBadgeId: 'b_spotlight_survivor',
    drPsyQuote: 'Bạn chỉ là nhân vật chính trong bộ phim của riêng bạn, không phải của người khác.'
  },
  {
    id: 'ms_active_listening',
    title: 'Máy Ghi Âm Sống',
    category: 'social',
    difficulty: 'MEDIUM',
    description: 'Lắng nghe chủ động để thấu hiểu tiềm thức đối phương.',
    task: 'Hãy dành 10 phút lắng nghe một người bạn tâm sự mà KHÔNG ngắt lời, KHÔNG đưa ra lời khuyên, chỉ gật đầu và đặt câu hỏi gợi mở. Hãy ghi lại 3 điều bạn học được từ họ.',
    rewardXp: 100,
    drPsyQuote: 'Tai thám tử thính hơn miệng thám tử, nhớ lấy!'
  },
  {
    id: 'ms_reflection',
    title: 'Tháp Quan Sát',
    category: 'self-observe',
    difficulty: 'MEDIUM',
    description: 'Phân tích hành vi con người tại các điểm nóng xã hội.',
    task: 'Hãy ngồi tại một quán cafe hoặc công viên trong 15 phút mà KHÔNG dùng điện thoại. Ghi lại 3 tương tác xã hội thú vị mà bạn quan sát được (Ví dụ: Cách họ bắt tay, ánh mắt khi nói chuyện).',
    rewardXp: 150,
    drPsyQuote: 'Thế giới này đầy rẫy những điều hiển nhiên mà chẳng ai thèm quan sát.'
  },
  {
    id: 'ms_gratitude',
    title: 'Bản Ghi Chân Thành',
    category: 'social',
    difficulty: 'RARE' as any, // Temporary fix for type if needed
    description: 'Bài tập về lòng biết ơn để gắn kết các mối quan hệ mật thiết.',
    task: 'Hãy viết một tin nhắn hoặc bức thư ngắn chân thành cảm ơn một người đã từng giúp đỡ bạn mà bạn chưa có dịp đền đáp. Hãy nói rõ lý do bạn biết ơn họ.',
    rewardXp: 120,
    drPsyQuote: 'Lòng biết ơn là trí tuệ cao cấp nhất của tâm hồn.'
  },
  {
    id: 'ms_body_language',
    title: 'Đọc Vị Ánh Mắt',
    category: 'self-observe',
    difficulty: 'MEDIUM',
    description: 'Phân tích sự khác biệt giữa lời nói và ngôn ngữ cơ thể.',
    task: 'Hãy quan sát một cuộc trò chuyện từ xa (không nghe tiếng). Đoán xem họ đang nói về chủ đề vui hay buồn dựa trên khoảng cách giữa hai người, cử chỉ tay và hướng của bàn chân. Ghi lại phán đoán của bạn.',
    rewardXp: 180,
    drPsyQuote: 'Cơ thể không bao giờ biết nói dối, ngay cả khi cái miệng đang tuôn ra những lời mật ngọt.'
  },
  {
    id: 'ms_negotiation',
    title: 'Đàm Phán Cửa Hẹp',
    category: 'persuasion',
    difficulty: 'HARD',
    description: 'Thử nghiệm kỹ thuật "Foot-in-the-door" trong đời thực.',
    task: 'Hãy thử đàm phán một thay đổi nhỏ có lợi cho bạn (Ví dụ: Xin thêm một chút topping miễn phí, hoặc nhờ ai đó giữ chỗ giúp trong 1 phút). Bắt đầu bằng một yêu cầu cực nhỏ trước đó.',
    rewardXp: 250,
    drPsyQuote: 'Một thám tử giỏi không bao giờ chấp nhận câu trả lời đầu tiên nếu nó không theo ý mình.'
  },
  {
    id: 'ms_crowd_leader',
    title: 'Nhận Diện Thủ Lĩnh',
    category: 'social',
    difficulty: 'MEDIUM',
    description: 'Tìm kiếm người có sức ảnh hưởng ngầm trong một nhóm.',
    task: 'Trong một nhóm từ 4-5 người đang trò chuyện, hãy quan sát khi có ai đó cười: Mọi người thường nhìn về phía người mà họ tôn trọng nhất. Hãy xác định xem ai là "thủ lĩnh ngầm" của nhóm đó.',
    rewardXp: 160,
    drPsyQuote: 'Quyền lực thực sự thường không nằm ở người nói to nhất.'
  },
  {
    id: 'ms_trust_building',
    title: 'Sức Mạnh Đồng Điệu',
    category: 'social',
    difficulty: 'MEDIUM',
    description: 'Sử dụng kỹ thuật "Mirroring" để xây dựng lòng tin tức thì.',
    task: 'Hãy thử bắt chước một vài cử chỉ nhẹ nhàng của đối phương khi trò chuyện (Ví dụ: Cách họ nghiêng đầu, cách đặt tay). Quan sát xem họ có trở nên cởi mở và tin tưởng bạn hơn không.',
    rewardXp: 140,
    drPsyQuote: 'Chúng ta thích những người giống mình. Đó là bản năng sinh tồn cơ bản.'
  }
];
