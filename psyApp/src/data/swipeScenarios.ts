export interface SwipeImpact {
  sanity: number;
  energy: number;
  social: number;
  wealth: number;
  effectName?: string;
}

export interface SwipeScenario {
  id: string;
  situation: string;
  leftChoice: string;
  rightChoice: string;
  leftImpact: SwipeImpact;
  rightImpact: SwipeImpact;
  crowdPercentageLabel?: string;
  theme: 'office' | 'love' | 'family' | 'social_media' | 'money';
}

export interface RandomEvent {
  id: string;
  description: string;
  emoji: string;
  impact: SwipeImpact;
  type: 'lucky' | 'curse';
}

export type DifficultyTier = 'easy' | 'normal' | 'hard' | 'nightmare';

export interface DifficultyConfig {
  id: DifficultyTier;
  name: string;
  emoji: string;
  startStats: number;
  cardCount: number;
  multiplier: number;
  curseChance: number; // 0-1
  gemRewardPerCard: number;
  bonusGems: number; // Bonus khi sống sót hết
  description: string;
}

export const DIFFICULTY_CONFIGS: DifficultyConfig[] = [
  { id: 'easy', name: 'Tập Sự', emoji: '🟢', startStats: 70, cardCount: 10, multiplier: 1, curseChance: 0, gemRewardPerCard: 1, bonusGems: 5, description: 'Nhẹ nhàng làm quen' },
  { id: 'normal', name: 'Thực Chiến', emoji: '🟡', startStats: 60, cardCount: 15, multiplier: 1, curseChance: 0.15, gemRewardPerCard: 2, bonusGems: 15, description: 'Cân bằng & thử thách' },
  { id: 'hard', name: 'Khắc Nghiệt', emoji: '🔴', startStats: 50, cardCount: 18, multiplier: 1.5, curseChance: 0.25, gemRewardPerCard: 3, bonusGems: 30, description: 'Hệ số x1.5 & Thẻ Đen' },
  { id: 'nightmare', name: 'Địa Ngục', emoji: '💀', startStats: 40, cardCount: 20, multiplier: 2, curseChance: 0.35, gemRewardPerCard: 5, bonusGems: 50, description: 'Hệ số x2, Thẻ Đen dày đặc' },
];

export interface PersonaBuff {
  personaId: string;
  name: string;
  emoji: string;
  description: string;
  statBonus: { sanity: number; energy: number; social: number; wealth: number };
  specialAbility?: string;
}

export const PERSONA_BUFFS: PersonaBuff[] = [
  { personaId: 'default', name: 'Mặc định', emoji: '🐱', description: 'Không buff, không debuff', statBonus: { sanity: 0, energy: 0, social: 0, wealth: 0 } },
  { personaId: 'killer', name: 'Sát Thủ', emoji: '💀', description: '+20 Energy, -10 Social', statBonus: { sanity: 0, energy: 20, social: -10, wealth: 0 }, specialAbility: 'Miễn nhiễm Thẻ Đen Energy' },
  { personaId: 'philosopher', name: 'Triết Gia', emoji: '📜', description: '+15 Sanity, -10 Wealth', statBonus: { sanity: 15, energy: 0, social: 0, wealth: -10 }, specialAbility: 'Giảm 50% sát thương Sanity' },
  { personaId: 'sherlock', name: 'Sherlock', emoji: '🕵️', description: 'Nhìn thấy hệ số ẩn', statBonus: { sanity: 5, energy: -5, social: 0, wealth: 0 }, specialAbility: 'Xem trước hệ số +/- trước khi quẹt' },
  { personaId: 'mystic', name: 'Huyền Bí', emoji: '🔮', description: '+10 tất cả, -15 Wealth', statBonus: { sanity: 10, energy: 10, social: 10, wealth: -15 }, specialAbility: 'Rút thêm 1 Thẻ Vàng may mắn' },
  { personaId: 'mastermind', name: 'Bậc Thầy', emoji: '🕴️', description: '+20 Wealth, -15 Social', statBonus: { sanity: 0, energy: 0, social: -15, wealth: 20 }, specialAbility: 'Gems x2 khi sống sót' },
  { personaId: 'manipulator', name: 'Kẻ Giật Dây', emoji: '⛓️', description: '+15 Social, -10 Sanity', statBonus: { sanity: -10, energy: 0, social: 15, wealth: 0 }, specialAbility: 'Quẹt dối trá ít bị phạt Social' },
];

// ═══════════════════════════════════════════════
//  RANDOM EVENTS (Thẻ Vàng & Thẻ Đen)
// ═══════════════════════════════════════════════
export const RANDOM_EVENTS: RandomEvent[] = [
  // LUCKY (Thẻ Vàng)
  { id: 'lucky1', description: 'Bạn được sếp khen trước toàn công ty!', emoji: '🌟', impact: { sanity: 10, energy: 5, social: 15, wealth: 10 }, type: 'lucky' },
  { id: 'lucky2', description: 'Trúng xổ số 10 triệu! Ngày đẹp trời thật!', emoji: '🎰', impact: { sanity: 5, energy: 5, social: 0, wealth: 25 }, type: 'lucky' },
  { id: 'lucky3', description: 'Người yêu bất ngờ tổ chức sinh nhật cho bạn.', emoji: '🎂', impact: { sanity: 15, energy: 10, social: 20, wealth: -5 }, type: 'lucky' },
  { id: 'lucky4', description: 'Được nghỉ phép 3 ngày không báo trước!', emoji: '🏖️', impact: { sanity: 20, energy: 25, social: 0, wealth: 0 }, type: 'lucky' },
  { id: 'lucky5', description: 'Bài viết của bạn viral trên mạng xã hội!', emoji: '📱', impact: { sanity: 5, energy: -5, social: 20, wealth: 10 }, type: 'lucky' },
  { id: 'lucky6', description: 'Bạn thân gửi tặng gói cà phê ngon tuyệt vời.', emoji: '☕', impact: { sanity: 10, energy: 15, social: 10, wealth: 0 }, type: 'lucky' },

  // CURSE (Thẻ Đen)
  { id: 'curse1', description: 'Tin đồn ác ý về bạn lan khắp văn phòng.', emoji: '🐍', impact: { sanity: -15, energy: -5, social: -20, wealth: 0 }, type: 'curse' },
  { id: 'curse2', description: 'Xe bạn bị hỏng giữa đường đi làm. Tốn kém!', emoji: '🚗', impact: { sanity: -10, energy: -15, social: 0, wealth: -20 }, type: 'curse' },
  { id: 'curse3', description: 'Mất ngủ 3 đêm liên tiếp vì lo lắng.', emoji: '😵', impact: { sanity: -20, energy: -25, social: -5, wealth: 0 }, type: 'curse' },
  { id: 'curse4', description: 'Bạn thân phản bội, kể chuyện riêng tư cho người khác.', emoji: '🗡️', impact: { sanity: -15, energy: -5, social: -25, wealth: 0 }, type: 'curse' },
  { id: 'curse5', description: 'Cú scam online cuốn mất vài triệu đồng.', emoji: '💸', impact: { sanity: -10, energy: -5, social: -5, wealth: -30 }, type: 'curse' },
  { id: 'curse6', description: 'Bị food poisoning sau bữa ăn team building.', emoji: '🤢', impact: { sanity: -5, energy: -30, social: -5, wealth: -10 }, type: 'curse' },
];

// ═══════════════════════════════════════════════
//  BỘ BÀI KHỔNG LỒ (40+ kịch bản)
// ═══════════════════════════════════════════════
export const SWIPE_SCENARIOS: SwipeScenario[] = [
  // ─── CÔNG SỞ (Office) ───
  {
    id: "o1", theme: 'office',
    situation: "Sếp giao một dự án khổng lồ vào tối thứ 6. Bạn đã kiệt sức cả tuần rồi.",
    leftChoice: "Phản kháng & Từ chối", rightChoice: "Cắn răng nhận làm",
    leftImpact: { sanity: 15, energy: 10, social: -25, wealth: -15, effectName: "Hiệu ứng Chống đối (Reactance)" },
    rightImpact: { sanity: -20, energy: -30, social: 10, wealth: 15, effectName: "Hội chứng People Pleasing" },
    crowdPercentageLabel: "82% người chơi đã hèn nhát chọn ôm việc vào người."
  },
  {
    id: "o2", theme: 'office',
    situation: "Đồng nghiệp mới luôn claim công của bạn trong các buổi họp.",
    leftChoice: "Đối chất công khai", rightChoice: "Im lặng chịu đựng",
    leftImpact: { sanity: 10, energy: -15, social: -10, wealth: 5, effectName: "Tự vệ ranh giới (Boundary Setting)" },
    rightImpact: { sanity: -25, energy: -10, social: 5, wealth: -10, effectName: "Hiệu ứng Bàng quan (Bystander)" },
    crowdPercentageLabel: "65% chọn im lặng vì sợ mất hòa khí."
  },
  {
    id: "o3", theme: 'office',
    situation: "Bạn phát hiện sếp đang thao túng số liệu KPI để lấy thành tích.",
    leftChoice: "Tố cáo lên cấp trên", rightChoice: "Giả vờ không biết",
    leftImpact: { sanity: 15, energy: -30, social: -35, wealth: -20, effectName: "Ngã rẽ Đạo đức (Moral Dilemma)" },
    rightImpact: { sanity: -30, energy: 10, social: 15, wealth: 10, effectName: "Willful Blindness" },
    crowdPercentageLabel: "91% nhắm mắt bảo toàn bản thân."
  },
  {
    id: "o4", theme: 'office',
    situation: "Cơ hội thăng chức xuất hiện nhưng phải chuyển thành phố khác.",
    leftChoice: "Từ chối, ở lại", rightChoice: "Chấp nhận chuyển đi",
    leftImpact: { sanity: 5, energy: 10, social: 15, wealth: -20, effectName: "Thiên kiến Hiện trạng (Status Quo Bias)" },
    rightImpact: { sanity: -10, energy: -15, social: -25, wealth: 30, effectName: "Phá vỡ vùng an toàn" },
    crowdPercentageLabel: "72% chọn ở lại vì quen thuộc, dù biết đó không phải lựa chọn tối ưu."
  },
  {
    id: "o5", theme: 'office',
    situation: "Intern mới mắc lỗi nghiêm trọng. Sếp hỏi ai làm. Bạn có thể đổ cho intern.",
    leftChoice: "Đổ lỗi cho intern", rightChoice: "Nhận trách nhiệm",
    leftImpact: { sanity: -20, energy: 5, social: -15, wealth: 10, effectName: "Lỗi Tự phục vụ (Self-serving Bias)" },
    rightImpact: { sanity: 15, energy: -10, social: 20, wealth: -15, effectName: "Lãnh đạo trách nhiệm" },
    crowdPercentageLabel: "54% chọn đổ lỗi để bảo vệ bản thân."
  },
  {
    id: "o6", theme: 'office',
    situation: "Email gửi nhầm thông tin lương cho toàn bộ phòng. Bạn thấy đồng nghiệp lương cao hơn 2 lần.",
    leftChoice: "Đòi tăng lương ngay", rightChoice: "Bỏ qua, tiếp tục làm",
    leftImpact: { sanity: 5, energy: -10, social: -20, wealth: 15, effectName: "Hiệu ứng So sánh Xã hội (Social Comparison)" },
    rightImpact: { sanity: -25, energy: -15, social: 10, wealth: -5, effectName: "Chấp nhận bất công (Learned Helplessness)" },
    crowdPercentageLabel: "63% cảm thấy tức giận nhưng không dám lên tiếng."
  },
  {
    id: "o7", theme: 'office',
    situation: "Sáng thứ Hai, trời mưa bão, bạn không muốn đi làm một chút nào.",
    leftChoice: "Nghỉ giả vờ ốm", rightChoice: "Mặc áo mưa đi làm",
    leftImpact: { sanity: -5, energy: 25, social: -15, wealth: -15, effectName: "Thiên kiến Hiện tại (Present Bias)" },
    rightImpact: { sanity: -15, energy: -25, social: 15, wealth: 20, effectName: "Hustle Culture Victim" },
    crowdPercentageLabel: "95% muốn nghỉ, nhưng 80% vẫn đi vì sợ."
  },
  {
    id: "o8", theme: 'office',
    situation: "Nhóm họp brainstorm. Ý tưởng của bạn bị bác bỏ. Bạn tin nó đúng.",
    leftChoice: "Kiên quyết bảo vệ", rightChoice: "Theo số đông",
    leftImpact: { sanity: 10, energy: -15, social: -20, wealth: 5, effectName: "Tư duy độc lập" },
    rightImpact: { sanity: -15, energy: 5, social: 15, wealth: -5, effectName: "Hiệu ứng Đoàn tàu (Bandwagon Effect)" },
    crowdPercentageLabel: "78% đầu hàng trước áp lực nhóm."
  },

  // ─── TÌNH YÊU (Love) ───
  {
    id: "l1", theme: 'love',
    situation: "Người yêu đọc trộm tin nhắn điện thoại của bạn và ghen tuông vô cớ.",
    leftChoice: "Chấp nhận cho xem", rightChoice: "Từ chối, giữ quyền riêng tư",
    leftImpact: { sanity: -20, energy: -5, social: 15, wealth: 0, effectName: "Mất ranh giới cá nhân (Boundary Erosion)" },
    rightImpact: { sanity: 15, energy: -10, social: -20, wealth: 0, effectName: "Bảo vệ ranh giới lành mạnh" },
    crowdPercentageLabel: "67% nhượng bộ vì sợ mất người yêu."
  },
  {
    id: "l2", theme: 'love',
    situation: "Phát hiện nửa kia nói dối về việc đi đâu tối qua.",
    leftChoice: "Bỏ qua, tin tưởng", rightChoice: "Tra hỏi đến cùng",
    leftImpact: { sanity: -20, energy: 5, social: 10, wealth: 0, effectName: "Hiệu ứng Đà điểu (Ostrich Effect)" },
    rightImpact: { sanity: 5, energy: -20, social: -25, wealth: 0, effectName: "Thiên kiến Xác nhận (Confirmation Bias)" },
    crowdPercentageLabel: "55% chọn tin tưởng dù trực giác nói khác."
  },
  {
    id: "l3", theme: 'love',
    situation: "Mối quan hệ 3 năm nhàm chán. Xuất hiện crush mới ở công ty.",
    leftChoice: "Nhắn tin tán tỉnh crush", rightChoice: "Tập trung sửa chữa MQH",
    leftImpact: { sanity: -15, energy: 10, social: -30, wealth: 0, effectName: "Hiệu ứng Cỏ bên kia xanh hơn (Grass is Greener)" },
    rightImpact: { sanity: 10, energy: -15, social: 15, wealth: -5, effectName: "Đầu tư cảm xúc dài hạn" },
    crowdPercentageLabel: "42% lén nhắn tin dù đang có người yêu."
  },
  {
    id: "l4", theme: 'love',
    situation: "Người yêu bảo 'Em thay đổi vì anh/chị'. Bạn phải từ bỏ sở thích cá nhân.",
    leftChoice: "Từ bỏ sở thích", rightChoice: "Giữ sở thích, nói rõ ranh giới",
    leftImpact: { sanity: -30, energy: -10, social: 10, wealth: 0, effectName: "Mất bản sắc (Identity Erosion)" },
    rightImpact: { sanity: 15, energy: 5, social: -15, wealth: 0, effectName: "Tự trọng lành mạnh" },
    crowdPercentageLabel: "58% dần mất đi chính mình trong tình yêu."
  },
  {
    id: "l5", theme: 'love',
    situation: "Cãi nhau gay gắt. Bạn biết mình sai nhưng cái tôi quá lớn.",
    leftChoice: "Cãi cùn tới cùng", rightChoice: "Hạ mình xin lỗi",
    leftImpact: { sanity: -20, energy: -15, social: -30, wealth: 0, effectName: "Dissonance Reduction" },
    rightImpact: { sanity: 15, energy: -10, social: 25, wealth: 0, effectName: "Tư duy mở (Open-mindedness)" },
    crowdPercentageLabel: "88% mờ mắt vì cái tôi."
  },
  {
    id: "l6", theme: 'love',
    situation: "Người yêu cũ nhắn tin lúc 2h sáng: 'Anh/Chị nhớ em'. Bạn đang hạnh phúc với người mới.",
    leftChoice: "Trả lời, xem tình hình", rightChoice: "Block ngay lập tức",
    leftImpact: { sanity: -15, energy: -10, social: -20, wealth: 0, effectName: "Hiệu ứng Hoài niệm (Nostalgia Bias)" },
    rightImpact: { sanity: 15, energy: 5, social: 10, wealth: 0, effectName: "Ranh giới cảm xúc rõ ràng" },
    crowdPercentageLabel: "61% không cưỡng nổi sự tò mò."
  },

  // ─── GIA ĐÌNH (Family) ───
  {
    id: "f1", theme: 'family',
    situation: "Bố mẹ ép bạn lấy vợ/chồng sớm dù bạn chưa sẵn sàng.",
    leftChoice: "Nghe lời bố mẹ", rightChoice: "Từ chối, sống theo ý mình",
    leftImpact: { sanity: -25, energy: -10, social: 20, wealth: 0, effectName: "Áp lực Xã hội (Social Pressure)" },
    rightImpact: { sanity: 15, energy: 5, social: -25, wealth: 0, effectName: "Tự chủ cuộc đời" },
    crowdPercentageLabel: "73% cuối cùng chiều theo gia đình."
  },
  {
    id: "f2", theme: 'family',
    situation: "Anh chị em mượn tiền lần thứ 5 mà chưa bao giờ trả.",
    leftChoice: "Cho mượn lần nữa", rightChoice: "Từ chối dứt khoát",
    leftImpact: { sanity: -15, energy: -5, social: 10, wealth: -25, effectName: "Không dám nói Không (Boundary Deficit)" },
    rightImpact: { sanity: 10, energy: 5, social: -20, wealth: 15, effectName: "Xây dựng ranh giới tài chính" },
    crowdPercentageLabel: "68% cảm thấy có lỗi khi từ chối gia đình."
  },
  {
    id: "f3", theme: 'family',
    situation: "Bố mẹ so sánh bạn với 'con nhà người ta' liên tục.",
    leftChoice: "Phản bác gay gắt", rightChoice: "Im lặng nuốt nước mắt",
    leftImpact: { sanity: 5, energy: -20, social: -25, wealth: 0, effectName: "Bùng nổ cảm xúc tích tụ" },
    rightImpact: { sanity: -25, energy: -15, social: 10, wealth: 0, effectName: "Tự ti so sánh (Inferiority Complex)" },
    crowdPercentageLabel: "79% nhà nào cũng vậy, mà không ai dám phản kháng."
  },
  {
    id: "f4", theme: 'family',
    situation: "Mẹ gọi điện mỗi ngày 3 lần hỏi thăm khi bạn đã 28 tuổi.",
    leftChoice: "Chặn bớt cuộc gọi", rightChoice: "Vẫn nghe hết mọi cuộc",
    leftImpact: { sanity: 15, energy: 10, social: -15, wealth: 0, effectName: "Thiết lập ranh giới lành mạnh" },
    rightImpact: { sanity: -10, energy: -15, social: 15, wealth: 0, effectName: "Phụ thuộc cảm xúc (Emotional Codependency)" },
    crowdPercentageLabel: "64% không dám từ chối bố mẹ dù đã trưởng thành."
  },
  {
    id: "f5", theme: 'family',
    situation: "Gia đình muốn bạn tiếp quản công ty gia đình, nhưng bạn đam mê nghệ thuật.",
    leftChoice: "Theo đam mê riêng", rightChoice: "Nghe lời, tiếp quản",
    leftImpact: { sanity: 20, energy: 10, social: -30, wealth: -25, effectName: "Tự thực hiện hóa (Self-Actualization)" },
    rightImpact: { sanity: -20, energy: -10, social: 25, wealth: 25, effectName: "Hy sinh bản sắc vì bổn phận" },
    crowdPercentageLabel: "56% từ bỏ ước mơ cá nhân vì áp lực gia tộc."
  },

  // ─── MẠNG XÃ HỘI (Social Media) ───
  {
    id: "sm1", theme: 'social_media',
    situation: "Clip Tóp-Tóp nói 'Dấu hiệu bạn bị Trầm cảm' và bạn thấy cực khớp.",
    leftChoice: "Tự chẩn đoán & mua thuốc", rightChoice: "Dẹp điện thoại & Đi ngủ",
    leftImpact: { sanity: -35, energy: -10, social: 0, wealth: -20, effectName: "Hiệu ứng Forer/Barnum" },
    rightImpact: { sanity: 20, energy: 25, social: 0, wealth: 5, effectName: "Từ chối Rác thông tin" },
    crowdPercentageLabel: "60% tự biến mình thành bệnh nhân vì lướt mạng."
  },
  {
    id: "sm2", theme: 'social_media',
    situation: "Người nổi tiếng khuyên đầu tư Crypto lạ. Nhìn rất hấp dẫn.",
    leftChoice: "All-in theo idol", rightChoice: "Bỏ qua & nghiên cứu",
    leftImpact: { sanity: -25, energy: 5, social: 5, wealth: -40, effectName: "Hiệu ứng Hào quang (Halo Effect)" },
    rightImpact: { sanity: 15, energy: 0, social: 0, wealth: 15, effectName: "Tư duy phản biện" },
    crowdPercentageLabel: "Đám đông quá dễ bị dắt mũi bởi vẻ hào nhoáng."
  },
  {
    id: "sm3", theme: 'social_media',
    situation: "Bạn bè trên Facebook đồng loạt khoe du lịch châu Âu. Bạn chỉ đi Đà Lạt.",
    leftChoice: "Photoshop ảnh, sống ảo", rightChoice: "Đăng ảnh thật, tự hào",
    leftImpact: { sanity: -20, energy: -10, social: 10, wealth: -5, effectName: "FOMO & So sánh Xã hội" },
    rightImpact: { sanity: 15, energy: 5, social: -5, wealth: 5, effectName: "Tự tin bản thân (Self-Acceptance)" },
    crowdPercentageLabel: "47% thừa nhận đã từng chỉnh sửa ảnh để 'đẹp hơn đời thật'."
  },
  {
    id: "sm4", theme: 'social_media',
    situation: "Bình luận ác ý của người lạ dưới bài đăng cá nhân của bạn.",
    leftChoice: "Chửi lại cay cú", rightChoice: "Xóa bình luận, bỏ qua",
    leftImpact: { sanity: -20, energy: -15, social: -15, wealth: 0, effectName: "Phản ứng Chiến-Chạy (Fight Response)" },
    rightImpact: { sanity: 10, energy: 5, social: 5, wealth: 0, effectName: "Trưởng thành cảm xúc" },
    crowdPercentageLabel: "57% sa vào vòng xoáy cãi nhau với người lạ trên mạng."
  },
  {
    id: "sm5", theme: 'social_media',
    situation: "Lướt TikTok 4 tiếng rồi mà 'chỉ thêm 5 phút nữa thôi'.",
    leftChoice: "Tiếp tục lướt", rightChoice: "Tắt app, ra ngoài đi bộ",
    leftImpact: { sanity: -15, energy: -20, social: -5, wealth: -10, effectName: "Vòng Dopamine (Dopamine Loop)" },
    rightImpact: { sanity: 15, energy: 15, social: 5, wealth: 5, effectName: "Kiểm soát xung động" },
    crowdPercentageLabel: "89% nói '5 phút nữa' rồi lướt thêm 2 tiếng."
  },
  {
    id: "sm6", theme: 'social_media',
    situation: "Một trend viral yêu cầu chia sẻ thông tin cá nhân nhạy cảm.",
    leftChoice: "Tham gia trend", rightChoice: "Bỏ qua, bảo vệ dữ liệu",
    leftImpact: { sanity: -10, energy: 5, social: 15, wealth: -15, effectName: "Hiệu ứng Đoàn tàu (Bandwagon)" },
    rightImpact: { sanity: 15, energy: 0, social: -10, wealth: 10, effectName: "Tư duy bảo mật" },
    crowdPercentageLabel: "44% sẵn sàng đánh đổi riêng tư để được like."
  },

  // ─── TIỀN BẠC (Money) ───
  {
    id: "m1", theme: 'money',
    situation: "Khóa học 20 triệu mua rồi nhưng học không vào. Bỏ thì tiếc tiền.",
    leftChoice: "Bỏ ngang, nhẹ đầu", rightChoice: "Gồng mình học tiếp",
    leftImpact: { sanity: 20, energy: 20, social: 0, wealth: -25, effectName: "Vượt qua Chi phí chìm (Sunk Cost)" },
    rightImpact: { sanity: -30, energy: -20, social: 0, wealth: -10, effectName: "Nạn nhân Sunk Cost Fallacy" },
    crowdPercentageLabel: "91% tiếp tục tự hành hạ vì xót tiền."
  },
  {
    id: "m2", theme: 'money',
    situation: "Bạn thân rủ hùn vốn mở quán cà phê. Bạn có 100 triệu tiết kiệm.",
    leftChoice: "All-in 100 triệu", rightChoice: "Từ chối hoặc đầu tư ít",
    leftImpact: { sanity: -10, energy: -5, social: 15, wealth: -35, effectName: "Risk Aversion ngược lại" },
    rightImpact: { sanity: 10, energy: 5, social: -15, wealth: 10, effectName: "Quản lý rủi ro thông minh" },
    crowdPercentageLabel: "38% mất tiền vì đầu tư theo cảm xúc thay vì lý trí."
  },
  {
    id: "m3", theme: 'money',
    situation: "Sale 11/11! Giảm 70%! Bạn không cần thứ gì nhưng 'giảm sâu quá'.",
    leftChoice: "Mua sạch giỏ hàng", rightChoice: "Đóng app mua sắm",
    leftImpact: { sanity: -10, energy: 5, social: 0, wealth: -30, effectName: "Hiệu ứng khan hiếm (Scarcity Effect)" },
    rightImpact: { sanity: 15, energy: 0, social: 0, wealth: 15, effectName: "Tiêu dùng có ý thức" },
    crowdPercentageLabel: "85% mua đồ sale mà về nhà không bao giờ dùng."
  },
  {
    id: "m4", theme: 'money',
    situation: "Đồng nghiệp mời ăn nhà hàng sang nhưng bạn đang tiết kiệm.",
    leftChoice: "Từ chối thẳng", rightChoice: "Đi để giữ thể diện",
    leftImpact: { sanity: 10, energy: 10, social: -20, wealth: 15, effectName: "Tự bảo vệ tài chính" },
    rightImpact: { sanity: -10, energy: -10, social: 15, wealth: -25, effectName: "Lạm phát Lối sống (Lifestyle Inflation)" },
    crowdPercentageLabel: "71% chi tiền vượt khả năng vì sợ bị đánh giá."
  },
  {
    id: "m5", theme: 'money',
    situation: "Lương tháng này vừa về, bạn muốn mua iPhone mới dù cái cũ vẫn dùng tốt.",
    leftChoice: "Mua ngay, YOLO!", rightChoice: "Giữ máy cũ, tiết kiệm",
    leftImpact: { sanity: 5, energy: 5, social: 10, wealth: -35, effectName: "Mua sắm bốc đồng (Impulse Buying)" },
    rightImpact: { sanity: 10, energy: 0, social: -5, wealth: 20, effectName: "Delayed Gratification" },
    crowdPercentageLabel: "52% thừa nhận từng mua đồ công nghệ chỉ vì 'muốn'."
  },
  {
    id: "m6", theme: 'money',
    situation: "Nhìn thấy vụ xô xát ngoài đường, không ai can ngăn. Bước ra?",
    leftChoice: "Quay lưng bỏ đi", rightChoice: "Bước ra can thiệp",
    leftImpact: { sanity: -15, energy: 10, social: -20, wealth: 0, effectName: "Hiệu ứng Bàng quan (Bystander)" },
    rightImpact: { sanity: 10, energy: -30, social: 25, wealth: -10, effectName: "Hội chứng Cứu rỗi (Savior Complex)" },
    crowdPercentageLabel: "63% nghĩ 'Sẽ có người khác giúp thôi'."
  },
  {
    id: "m7", theme: 'money',
    situation: "Nhóm được khen thưởng, nhưng công lớn nhất là của bạn.",
    leftChoice: "Nhận hết về mình", rightChoice: "Chia đều cho nhóm",
    leftImpact: { sanity: -5, energy: 0, social: -35, wealth: 30, effectName: "Self-serving Bias" },
    rightImpact: { sanity: 15, energy: -5, social: 25, wealth: -15, effectName: "Thiên vị Vị tha" },
    crowdPercentageLabel: "71% chia sẻ vì sợ bị ghét."
  },
  {
    id: "m8", theme: 'money',
    situation: "Bạn có thể gian lận thuế và không ai biết. Tiết kiệm 50 triệu.",
    leftChoice: "Gian lận", rightChoice: "Khai báo trung thực",
    leftImpact: { sanity: -25, energy: 5, social: 0, wealth: 30, effectName: "Thiên kiến Đạo đức linh hoạt (Moral Licensing)" },
    rightImpact: { sanity: 15, energy: -5, social: 10, wealth: -15, effectName: "Liêm chính tài chính" },
    crowdPercentageLabel: "40% thừa nhận từng 'linh hoạt' với thuế."
  },
];
