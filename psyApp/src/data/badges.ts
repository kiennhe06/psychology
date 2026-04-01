export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  condition: string;
}

export const BADGES: Badge[] = [
  {
    id: 'b1',
    name: 'Tân Binh',
    emoji: '🎓',
    description: 'Chào mừng bạn đến với thế giới tâm lý học!',
    condition: 'Hoàn thành quiz đầu tiên',
  },
  {
    id: 'b2',
    name: 'Kiên Trì',
    emoji: '🔥',
    description: 'Sự kiên trì là chìa khóa của tri thức.',
    condition: 'Giữ streak 3 ngày liên tiếp',
  },
  {
    id: 'b3',
    name: 'Hoàn Hảo',
    emoji: '⭐',
    description: 'Trả lời đúng tất cả câu hỏi trong một quiz.',
    condition: 'Đạt 100% trong một quiz',
  },
  {
    id: 'b4',
    name: 'Chinh Phục',
    emoji: '🏆',
    description: 'Bạn đã chinh phục trọn vẹn một vùng đất kiến thức!',
    condition: 'Hoàn thành tất cả quiz trong 1 khu vực',
  },
  {
    id: 'b5',
    name: 'Triệu Phú',
    emoji: '💎',
    description: 'Kho báu trí tuệ của bạn đã đầy ắp!',
    condition: 'Tích lũy 100 gem',
  },
  {
    id: 'b6',
    name: 'Bác Học',
    emoji: '🧠',
    description: 'Bạn đã trở thành chuyên gia tâm lý học!',
    condition: 'Đạt Level 5',
  },
  {
    id: 'b7',
    name: 'Chiến Binh Bền Bỉ',
    emoji: '🤺',
    description: 'Sự kỷ luật thép trong việc rèn luyện tâm trí.',
    condition: 'Giữ streak 7 ngày liên tiếp',
  },
  {
    id: 'b8',
    name: 'Huyền Thoại Streak',
    emoji: '🐉',
    description: 'Bản lĩnh của một bậc thầy kiên định.',
    condition: 'Giữ streak 30 ngày liên tiếp',
  },
  {
    id: 'b9',
    name: 'Triết Gia',
    emoji: '📜',
    description: 'Càng hiểu biết, tâm ta càng tĩnh lặng.',
    condition: 'Đọc hết toàn bộ 15 bài học chuyên sâu',
  },
  {
    id: 'b10',
    name: 'Nhà Sưu Tầm',
    emoji: '🧥',
    description: 'Phong thái của một nhà tâm lý học đa tài.',
    condition: 'Mở khóa tất cả trang phục của Dr. Psy',
  },
  {
    id: 'b11',
    name: 'Thống Trị Bản Đồ',
    emoji: '🗺️',
    description: 'Không một ngóc ngách nào của tâm trí mà bạn chưa đi qua.',
    condition: 'Hoàn thành tất cả Quiz trên bản đồ hành trình',
  },
  {
    id: 'b12',
    name: 'Đỉnh Cao Trí Tuệ',
    emoji: '🏔️',
    description: 'Bạn đã đạt đến cảnh giới cao nhất của sự thông tuệ.',
    condition: 'Đạt Level 10',
  },
  {
    id: 'b13',
    name: 'Tín Đồ Bóng Tối',
    emoji: '🖤',
    description: 'Bạn đã dám đối mặt với những góc khuất nhất của tâm hồn.',
    condition: 'Mở khóa tất cả các bài học Premium',
  },
  {
    id: 'b14',
    name: 'Vô Đối',
    emoji: '⚔️',
    description: 'Sự chính xác tuyệt đối trong mọi tình huống.',
    condition: 'Đạt 100% điểm trong 5 bài Quiz khác nhau',
  },
  {
    id: 'b15',
    name: 'Thợ Săn Kho Báu',
    emoji: '🏴‍☠️',
    description: 'Bạn luôn biết cách tìm ra những điều quý giá nhất.',
    condition: 'Mở Rương Bí Ẩn 5 lần',
  },
  {
    id: 'b16',
    name: 'Đại Gia Tâm Lý',
    emoji: '💰',
    description: 'Sự thịnh vượng đi kèm với tri thức.',
    condition: 'Tích lũy tổng cộng 1000 Gems',
  },
  {
    id: 'b_field_agent',
    name: 'Đệ Tử Thực Chiến',
    emoji: '🔍',
    description: 'Bước chân đầu tiên vào những góc khuất của thực tại.',
    condition: 'Hoàn thành 1 nhiệm vụ thực địa',
  },
  {
    id: 'b_mission_expert',
    name: 'Đặc Vụ Kỳ Cựu',
    emoji: '🕵️‍♂️',
    description: 'Bản lĩnh thám tử đã được tôi luyện qua nhiều phi vụ.',
    condition: 'Hoàn thành 5 nhiệm vụ thực địa',
  },
  {
    id: 'b_silent_hunter',
    name: 'Thợ Săn Bóng Đêm',
    emoji: '🎯',
    description: 'Kẻ chinh phục mọi thử thách thực tế khó khăn nhất.',
    condition: 'Hoàn thành tất cả 10 nhiệm vụ thực địa',
  },
  {
    id: 'b_persona_master',
    name: 'Bậc Thầy Đa Nhân Cách',
    emoji: '🎭',
    description: 'Sở hữu trí tuệ tập hợp từ tất cả các vị sư phụ quái kiệt.',
    condition: 'Chiêu mộ thành công tất cả giảng viên',
  },
];
