export interface SwipeImpact {
  sanity: number;
  energy: number;
  social: number;
  wealth: number;
  effectName?: string;
}

export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface SwipeScenario {
  id: string;
  situation: string;
  leftChoice: string;
  rightChoice: string;
  leftImpact: SwipeImpact;
  rightImpact: SwipeImpact;
  crowdPercentageLabel?: string;
  theme: 'office' | 'love' | 'family' | 'social_media' | 'money';
  rarity: CardRarity;
  isBoss?: boolean;
}

export interface StoryChapter {
  id: string;
  title: string;
  emoji: string;
  description: string;
  scenarios: SwipeScenario[];
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
    rarity: 'common', crowdPercentageLabel: "82% người chơi đã hèn nhát chọn ôm việc vào người."
  },
  {
    id: "o2", theme: 'office',
    situation: "Đồng nghiệp mới luôn claim công của bạn trong các buổi họp.",
    leftChoice: "Đối chất công khai", rightChoice: "Im lặng chịu đựng",
    leftImpact: { sanity: 10, energy: -15, social: -10, wealth: 5, effectName: "Tự vệ ranh giới (Boundary Setting)" },
    rightImpact: { sanity: -25, energy: -10, social: 5, wealth: -10, effectName: "Hiệu ứng Bàng quan (Bystander)" },
    rarity: 'common', crowdPercentageLabel: "65% chọn im lặng vì sợ mất hòa khí."
  },
  {
    id: "o3", theme: 'office',
    situation: "Bạn phát hiện sếp đang thao túng số liệu KPI để lấy thành tích.",
    leftChoice: "Tố cáo lên cấp trên", rightChoice: "Giả vờ không biết",
    leftImpact: { sanity: 15, energy: -30, social: -35, wealth: -20, effectName: "Ngã rẽ Đạo đức (Moral Dilemma)" },
    rightImpact: { sanity: -30, energy: 10, social: 15, wealth: 10, effectName: "Willful Blindness" },
    rarity: 'common', crowdPercentageLabel: "91% nhắm mắt bảo toàn bản thân."
  },
  {
    id: "o4", theme: 'office',
    situation: "Cơ hội thăng chức xuất hiện nhưng phải chuyển thành phố khác.",
    leftChoice: "Từ chối, ở lại", rightChoice: "Chấp nhận chuyển đi",
    leftImpact: { sanity: 5, energy: 10, social: 15, wealth: -20, effectName: "Thiên kiến Hiện trạng (Status Quo Bias)" },
    rightImpact: { sanity: -10, energy: -15, social: -25, wealth: 30, effectName: "Phá vỡ vùng an toàn" },
    rarity: 'common', crowdPercentageLabel: "72% chọn ở lại vì quen thuộc, dù biết đó không phải lựa chọn tối ưu."
  },
  {
    id: "o5", theme: 'office',
    situation: "Intern mới mắc lỗi nghiêm trọng. Sếp hỏi ai làm. Bạn có thể đổ cho intern.",
    leftChoice: "Đổ lỗi cho intern", rightChoice: "Nhận trách nhiệm",
    leftImpact: { sanity: -20, energy: 5, social: -15, wealth: 10, effectName: "Lỗi Tự phục vụ (Self-serving Bias)" },
    rightImpact: { sanity: 15, energy: -10, social: 20, wealth: -15, effectName: "Lãnh đạo trách nhiệm" },
    rarity: 'common', crowdPercentageLabel: "54% chọn đổ lỗi để bảo vệ bản thân."
  },
  {
    id: "o6", theme: 'office',
    situation: "Email gửi nhầm thông tin lương cho toàn bộ phòng. Bạn thấy đồng nghiệp lương cao hơn 2 lần.",
    leftChoice: "Đòi tăng lương ngay", rightChoice: "Bỏ qua, tiếp tục làm",
    leftImpact: { sanity: 5, energy: -10, social: -20, wealth: 15, effectName: "Hiệu ứng So sánh Xã hội (Social Comparison)" },
    rightImpact: { sanity: -25, energy: -15, social: 10, wealth: -5, effectName: "Chấp nhận bất công (Learned Helplessness)" },
    rarity: 'common', crowdPercentageLabel: "63% cảm thấy tức giận nhưng không dám lên tiếng."
  },
  {
    id: "o7", theme: 'office',
    situation: "Sáng thứ Hai, trời mưa bão, bạn không muốn đi làm một chút nào.",
    leftChoice: "Nghỉ giả vờ ốm", rightChoice: "Mặc áo mưa đi làm",
    leftImpact: { sanity: -5, energy: 25, social: -15, wealth: -15, effectName: "Thiên kiến Hiện tại (Present Bias)" },
    rightImpact: { sanity: -15, energy: -25, social: 15, wealth: 20, effectName: "Hustle Culture Victim" },
    rarity: 'common', crowdPercentageLabel: "95% muốn nghỉ, nhưng 80% vẫn đi vì sợ."
  },
  {
    id: "o8", theme: 'office',
    situation: "Nhóm họp brainstorm. Ý tưởng của bạn bị bác bỏ. Bạn tin nó đúng.",
    leftChoice: "Kiên quyết bảo vệ", rightChoice: "Theo số đông",
    leftImpact: { sanity: 10, energy: -15, social: -20, wealth: 5, effectName: "Tư duy độc lập" },
    rightImpact: { sanity: -15, energy: 5, social: 15, wealth: -5, effectName: "Hiệu ứng Đoàn tàu (Bandwagon Effect)" },
    rarity: 'common', crowdPercentageLabel: "78% đầu hàng trước áp lực nhóm."
  },

  // ─── TÌNH YÊU (Love) ───
  {
    id: "l1", theme: 'love',
    situation: "Người yêu đọc trộm tin nhắn điện thoại của bạn và ghen tuông vô cớ.",
    leftChoice: "Chấp nhận cho xem", rightChoice: "Từ chối, giữ quyền riêng tư",
    leftImpact: { sanity: -20, energy: -5, social: 15, wealth: 0, effectName: "Mất ranh giới cá nhân (Boundary Erosion)" },
    rightImpact: { sanity: 15, energy: -10, social: -20, wealth: 0, effectName: "Bảo vệ ranh giới lành mạnh" },
    rarity: 'common', crowdPercentageLabel: "67% nhượng bộ vì sợ mất người yêu."
  },
  {
    id: "l2", theme: 'love',
    situation: "Phát hiện nửa kia nói dối về việc đi đâu tối qua.",
    leftChoice: "Bỏ qua, tin tưởng", rightChoice: "Tra hỏi đến cùng",
    leftImpact: { sanity: -20, energy: 5, social: 10, wealth: 0, effectName: "Hiệu ứng Đà điểu (Ostrich Effect)" },
    rightImpact: { sanity: 5, energy: -20, social: -25, wealth: 0, effectName: "Thiên kiến Xác nhận (Confirmation Bias)" },
    rarity: 'common', crowdPercentageLabel: "55% chọn tin tưởng dù trực giác nói khác."
  },
  {
    id: "l3", theme: 'love',
    situation: "Mối quan hệ 3 năm nhàm chán. Xuất hiện crush mới ở công ty.",
    leftChoice: "Nhắn tin tán tỉnh crush", rightChoice: "Tập trung sửa chữa MQH",
    leftImpact: { sanity: -15, energy: 10, social: -30, wealth: 0, effectName: "Hiệu ứng Cỏ bên kia xanh hơn (Grass is Greener)" },
    rightImpact: { sanity: 10, energy: -15, social: 15, wealth: -5, effectName: "Đầu tư cảm xúc dài hạn" },
    rarity: 'common', crowdPercentageLabel: "42% lén nhắn tin dù đang có người yêu."
  },
  {
    id: "l4", theme: 'love',
    situation: "Người yêu bảo 'Em thay đổi vì anh/chị'. Bạn phải từ bỏ sở thích cá nhân.",
    leftChoice: "Từ bỏ sở thích", rightChoice: "Giữ sở thích, nói rõ ranh giới",
    leftImpact: { sanity: -30, energy: -10, social: 10, wealth: 0, effectName: "Mất bản sắc (Identity Erosion)" },
    rightImpact: { sanity: 15, energy: 5, social: -15, wealth: 0, effectName: "Tự trọng lành mạnh" },
    rarity: 'common', crowdPercentageLabel: "58% dần mất đi chính mình trong tình yêu."
  },
  {
    id: "l5", theme: 'love',
    situation: "Cãi nhau gay gắt. Bạn biết mình sai nhưng cái tôi quá lớn.",
    leftChoice: "Cãi cùn tới cùng", rightChoice: "Hạ mình xin lỗi",
    leftImpact: { sanity: -20, energy: -15, social: -30, wealth: 0, effectName: "Dissonance Reduction" },
    rightImpact: { sanity: 15, energy: -10, social: 25, wealth: 0, effectName: "Tư duy mở (Open-mindedness)" },
    rarity: 'common', crowdPercentageLabel: "88% mờ mắt vì cái tôi."
  },
  {
    id: "l6", theme: 'love',
    situation: "Người yêu cũ nhắn tin lúc 2h sáng: 'Anh/Chị nhớ em'. Bạn đang hạnh phúc với người mới.",
    leftChoice: "Trả lời, xem tình hình", rightChoice: "Block ngay lập tức",
    leftImpact: { sanity: -15, energy: -10, social: -20, wealth: 0, effectName: "Hiệu ứng Hoài niệm (Nostalgia Bias)" },
    rightImpact: { sanity: 15, energy: 5, social: 10, wealth: 0, effectName: "Ranh giới cảm xúc rõ ràng" },
    rarity: 'common', crowdPercentageLabel: "61% không cưỡng nổi sự tò mò."
  },

  // ─── GIA ĐÌNH (Family) ───
  {
    id: "f1", theme: 'family',
    situation: "Bố mẹ ép bạn lấy vợ/chồng sớm dù bạn chưa sẵn sàng.",
    leftChoice: "Nghe lời bố mẹ", rightChoice: "Từ chối, sống theo ý mình",
    leftImpact: { sanity: -25, energy: -10, social: 20, wealth: 0, effectName: "Áp lực Xã hội (Social Pressure)" },
    rightImpact: { sanity: 15, energy: 5, social: -25, wealth: 0, effectName: "Tự chủ cuộc đời" },
    rarity: 'common', crowdPercentageLabel: "73% cuối cùng chiều theo gia đình."
  },
  {
    id: "f2", theme: 'family',
    situation: "Anh chị em mượn tiền lần thứ 5 mà chưa bao giờ trả.",
    leftChoice: "Cho mượn lần nữa", rightChoice: "Từ chối dứt khoát",
    leftImpact: { sanity: -15, energy: -5, social: 10, wealth: -25, effectName: "Không dám nói Không (Boundary Deficit)" },
    rightImpact: { sanity: 10, energy: 5, social: -20, wealth: 15, effectName: "Xây dựng ranh giới tài chính" },
    rarity: 'common', crowdPercentageLabel: "68% cảm thấy có lỗi khi từ chối gia đình."
  },
  {
    id: "f3", theme: 'family',
    situation: "Bố mẹ so sánh bạn với 'con nhà người ta' liên tục.",
    leftChoice: "Phản bác gay gắt", rightChoice: "Im lặng nuốt nước mắt",
    leftImpact: { sanity: 5, energy: -20, social: -25, wealth: 0, effectName: "Bùng nổ cảm xúc tích tụ" },
    rightImpact: { sanity: -25, energy: -15, social: 10, wealth: 0, effectName: "Tự ti so sánh (Inferiority Complex)" },
    rarity: 'common', crowdPercentageLabel: "79% nhà nào cũng vậy, mà không ai dám phản kháng."
  },
  {
    id: "f4", theme: 'family',
    situation: "Mẹ gọi điện mỗi ngày 3 lần hỏi thăm khi bạn đã 28 tuổi.",
    leftChoice: "Chặn bớt cuộc gọi", rightChoice: "Vẫn nghe hết mọi cuộc",
    leftImpact: { sanity: 15, energy: 10, social: -15, wealth: 0, effectName: "Thiết lập ranh giới lành mạnh" },
    rightImpact: { sanity: -10, energy: -15, social: 15, wealth: 0, effectName: "Phụ thuộc cảm xúc (Emotional Codependency)" },
    rarity: 'common', crowdPercentageLabel: "64% không dám từ chối bố mẹ dù đã trưởng thành."
  },
  {
    id: "f5", theme: 'family',
    situation: "Gia đình muốn bạn tiếp quản công ty gia đình, nhưng bạn đam mê nghệ thuật.",
    leftChoice: "Theo đam mê riêng", rightChoice: "Nghe lời, tiếp quản",
    leftImpact: { sanity: 20, energy: 10, social: -30, wealth: -25, effectName: "Tự thực hiện hóa (Self-Actualization)" },
    rightImpact: { sanity: -20, energy: -10, social: 25, wealth: 25, effectName: "Hy sinh bản sắc vì bổn phận" },
    rarity: 'common', crowdPercentageLabel: "56% từ bỏ ước mơ cá nhân vì áp lực gia tộc."
  },

  // ─── MẠNG XÃ HỘI (Social Media) ───
  {
    id: "sm1", theme: 'social_media',
    situation: "Clip Tóp-Tóp nói 'Dấu hiệu bạn bị Trầm cảm' và bạn thấy cực khớp.",
    leftChoice: "Tự chẩn đoán & mua thuốc", rightChoice: "Dẹp điện thoại & Đi ngủ",
    leftImpact: { sanity: -35, energy: -10, social: 0, wealth: -20, effectName: "Hiệu ứng Forer/Barnum" },
    rightImpact: { sanity: 20, energy: 25, social: 0, wealth: 5, effectName: "Từ chối Rác thông tin" },
    rarity: 'common', crowdPercentageLabel: "60% tự biến mình thành bệnh nhân vì lướt mạng."
  },
  {
    id: "sm2", theme: 'social_media',
    situation: "Người nổi tiếng khuyên đầu tư Crypto lạ. Nhìn rất hấp dẫn.",
    leftChoice: "All-in theo idol", rightChoice: "Bỏ qua & nghiên cứu",
    leftImpact: { sanity: -25, energy: 5, social: 5, wealth: -40, effectName: "Hiệu ứng Hào quang (Halo Effect)" },
    rightImpact: { sanity: 15, energy: 0, social: 0, wealth: 15, effectName: "Tư duy phản biện" },
    rarity: 'common', crowdPercentageLabel: "Đám đông quá dễ bị dắt mũi bởi vẻ hào nhoáng."
  },
  {
    id: "sm3", theme: 'social_media',
    situation: "Bạn bè trên Facebook đồng loạt khoe du lịch châu Âu. Bạn chỉ đi Đà Lạt.",
    leftChoice: "Photoshop ảnh, sống ảo", rightChoice: "Đăng ảnh thật, tự hào",
    leftImpact: { sanity: -20, energy: -10, social: 10, wealth: -5, effectName: "FOMO & So sánh Xã hội" },
    rightImpact: { sanity: 15, energy: 5, social: -5, wealth: 5, effectName: "Tự tin bản thân (Self-Acceptance)" },
    rarity: 'common', crowdPercentageLabel: "47% thừa nhận đã từng chỉnh sửa ảnh để 'đẹp hơn đời thật'."
  },
  {
    id: "sm4", theme: 'social_media',
    situation: "Bình luận ác ý của người lạ dưới bài đăng cá nhân của bạn.",
    leftChoice: "Chửi lại cay cú", rightChoice: "Xóa bình luận, bỏ qua",
    leftImpact: { sanity: -20, energy: -15, social: -15, wealth: 0, effectName: "Phản ứng Chiến-Chạy (Fight Response)" },
    rightImpact: { sanity: 10, energy: 5, social: 5, wealth: 0, effectName: "Trưởng thành cảm xúc" },
    rarity: 'common', crowdPercentageLabel: "57% sa vào vòng xoáy cãi nhau với người lạ trên mạng."
  },
  {
    id: "sm5", theme: 'social_media',
    situation: "Lướt TikTok 4 tiếng rồi mà 'chỉ thêm 5 phút nữa thôi'.",
    leftChoice: "Tiếp tục lướt", rightChoice: "Tắt app, ra ngoài đi bộ",
    leftImpact: { sanity: -15, energy: -20, social: -5, wealth: -10, effectName: "Vòng Dopamine (Dopamine Loop)" },
    rightImpact: { sanity: 15, energy: 15, social: 5, wealth: 5, effectName: "Kiểm soát xung động" },
    rarity: 'common', crowdPercentageLabel: "89% nói '5 phút nữa' rồi lướt thêm 2 tiếng."
  },
  {
    id: "sm6", theme: 'social_media',
    situation: "Một trend viral yêu cầu chia sẻ thông tin cá nhân nhạy cảm.",
    leftChoice: "Tham gia trend", rightChoice: "Bỏ qua, bảo vệ dữ liệu",
    leftImpact: { sanity: -10, energy: 5, social: 15, wealth: -15, effectName: "Hiệu ứng Đoàn tàu (Bandwagon)" },
    rightImpact: { sanity: 15, energy: 0, social: -10, wealth: 10, effectName: "Tư duy bảo mật" },
    rarity: 'common', crowdPercentageLabel: "44% sẵn sàng đánh đổi riêng tư để được like."
  },

  // ─── TIỀN BẠC (Money) ───
  {
    id: "m1", theme: 'money',
    situation: "Khóa học 20 triệu mua rồi nhưng học không vào. Bỏ thì tiếc tiền.",
    leftChoice: "Bỏ ngang, nhẹ đầu", rightChoice: "Gồng mình học tiếp",
    leftImpact: { sanity: 20, energy: 20, social: 0, wealth: -25, effectName: "Vượt qua Chi phí chìm (Sunk Cost)" },
    rightImpact: { sanity: -30, energy: -20, social: 0, wealth: -10, effectName: "Nạn nhân Sunk Cost Fallacy" },
    rarity: 'common', crowdPercentageLabel: "91% tiếp tục tự hành hạ vì xót tiền."
  },
  {
    id: "m2", theme: 'money',
    situation: "Bạn thân rủ hùn vốn mở quán cà phê. Bạn có 100 triệu tiết kiệm.",
    leftChoice: "All-in 100 triệu", rightChoice: "Từ chối hoặc đầu tư ít",
    leftImpact: { sanity: -10, energy: -5, social: 15, wealth: -35, effectName: "Risk Aversion ngược lại" },
    rightImpact: { sanity: 10, energy: 5, social: -15, wealth: 10, effectName: "Quản lý rủi ro thông minh" },
    rarity: 'common', crowdPercentageLabel: "38% mất tiền vì đầu tư theo cảm xúc thay vì lý trí."
  },
  {
    id: "m3", theme: 'money',
    situation: "Sale 11/11! Giảm 70%! Bạn không cần thứ gì nhưng 'giảm sâu quá'.",
    leftChoice: "Mua sạch giỏ hàng", rightChoice: "Đóng app mua sắm",
    leftImpact: { sanity: -10, energy: 5, social: 0, wealth: -30, effectName: "Hiệu ứng khan hiếm (Scarcity Effect)" },
    rightImpact: { sanity: 15, energy: 0, social: 0, wealth: 15, effectName: "Tiêu dùng có ý thức" },
    rarity: 'common', crowdPercentageLabel: "85% mua đồ sale mà về nhà không bao giờ dùng."
  },
  {
    id: "m4", theme: 'money',
    situation: "Đồng nghiệp mời ăn nhà hàng sang nhưng bạn đang tiết kiệm.",
    leftChoice: "Từ chối thẳng", rightChoice: "Đi để giữ thể diện",
    leftImpact: { sanity: 10, energy: 10, social: -20, wealth: 15, effectName: "Tự bảo vệ tài chính" },
    rightImpact: { sanity: -10, energy: -10, social: 15, wealth: -25, effectName: "Lạm phát Lối sống (Lifestyle Inflation)" },
    rarity: 'common', crowdPercentageLabel: "71% chi tiền vượt khả năng vì sợ bị đánh giá."
  },
  {
    id: "m5", theme: 'money',
    situation: "Lương tháng này vừa về, bạn muốn mua iPhone mới dù cái cũ vẫn dùng tốt.",
    leftChoice: "Mua ngay, YOLO!", rightChoice: "Giữ máy cũ, tiết kiệm",
    leftImpact: { sanity: 5, energy: 5, social: 10, wealth: -35, effectName: "Mua sắm bốc đồng (Impulse Buying)" },
    rightImpact: { sanity: 10, energy: 0, social: -5, wealth: 20, effectName: "Delayed Gratification" },
    rarity: 'common', crowdPercentageLabel: "52% thừa nhận từng mua đồ công nghệ chỉ vì 'muốn'."
  },
  {
    id: "m6", theme: 'money',
    situation: "Nhìn thấy vụ xô xát ngoài đường, không ai can ngăn. Bước ra?",
    leftChoice: "Quay lưng bỏ đi", rightChoice: "Bước ra can thiệp",
    leftImpact: { sanity: -15, energy: 10, social: -20, wealth: 0, effectName: "Hiệu ứng Bàng quan (Bystander)" },
    rightImpact: { sanity: 10, energy: -30, social: 25, wealth: -10, effectName: "Hội chứng Cứu rỗi (Savior Complex)" },
    rarity: 'common', crowdPercentageLabel: "63% nghĩ 'Sẽ có người khác giúp thôi'."
  },
  {
    id: "m7", theme: 'money',
    situation: "Nhóm được khen thưởng, nhưng công lớn nhất là của bạn.",
    leftChoice: "Nhận hết về mình", rightChoice: "Chia đều cho nhóm",
    leftImpact: { sanity: -5, energy: 0, social: -35, wealth: 30, effectName: "Self-serving Bias" },
    rightImpact: { sanity: 15, energy: -5, social: 25, wealth: -15, effectName: "Thiên vị Vị tha" },
    rarity: 'common', crowdPercentageLabel: "71% chia sẻ vì sợ bị ghét."
  },
  {
    id: "m8", theme: 'money',
    situation: "Bạn có thể gian lận thuế và không ai biết. Tiết kiệm 50 triệu.",
    leftChoice: "Gian lận", rightChoice: "Khai báo trung thực",
    leftImpact: { sanity: -25, energy: 5, social: 0, wealth: 30, effectName: "Thiên kiến Đạo đức linh hoạt (Moral Licensing)" },
    rightImpact: { sanity: 15, energy: -5, social: 10, wealth: -15, effectName: "Liêm chính tài chính" },
    rarity: 'legendary', crowdPercentageLabel: "40% thừa nhận từng 'linh hoạt' với thuế."
  },
];

// ═══════════════════════════════════════════════
//  BOSS CARDS (Xuất hiện mỗi 5 thẻ, cả 2 lựa chọn đều nguy hiểm)
// ═══════════════════════════════════════════════
export const BOSS_CARDS: SwipeScenario[] = [
  {
    id: "boss1", theme: 'office', rarity: 'legendary', isBoss: true,
    situation: "⚔️ BOSS: Công ty sắp sa thải 50%. Sếp bảo bạn viết danh sách cắt giảm — trong đó có bạn thân.",
    leftChoice: "Bảo vệ bạn thân, hy sinh người khác", rightChoice: "Công bằng: để bạn thân trong danh sách",
    leftImpact: { sanity: -20, energy: -10, social: -25, wealth: 10, effectName: "Thiên kiến Thân quen (In-group Bias)" },
    rightImpact: { sanity: -15, energy: -15, social: -20, wealth: 5, effectName: "Đạo đức khó khăn (Moral Injury)" },
    crowdPercentageLabel: "Không có lựa chọn an toàn. Đây là giá của quyền lực."
  },
  {
    id: "boss2", theme: 'love', rarity: 'legendary', isBoss: true,
    situation: "⚔️ BOSS: Người yêu phát hiện bạn đã nói dối một chuyện quan trọng suốt 2 năm.",
    leftChoice: "Tiếp tục giấu, đổ cho hiểu lầm", rightChoice: "Thú nhận tất cả, chấp nhận hậu quả",
    leftImpact: { sanity: -30, energy: -5, social: -10, wealth: 0, effectName: "Tự lừa dối (Self-Deception Spiral)" },
    rightImpact: { sanity: -10, energy: -20, social: -30, wealth: 0, effectName: "Cái giá của Trung thực" },
    crowdPercentageLabel: "Sự thật luôn đau đớn, nhưng dối trá còn tàn khốc hơn."
  },
  {
    id: "boss3", theme: 'money', rarity: 'legendary', isBoss: true,
    situation: "⚔️ BOSS: Bạn phát hiện công ty đang rửa tiền. Im lặng = thăng chức + lương gấp 3. Tố cáo = mất tất cả.",
    leftChoice: "Im lặng, nhận phần thưởng", rightChoice: "Tố cáo, chấp nhận mất việc",
    leftImpact: { sanity: -35, energy: 5, social: 10, wealth: 30, effectName: "Đồng phạm đạo đức (Moral Complicity)" },
    rightImpact: { sanity: 15, energy: -25, social: -30, wealth: -35, effectName: "Whistleblower Syndrome" },
    crowdPercentageLabel: "Bạn chọn túi tiền hay lương tâm?"
  },
  {
    id: "boss4", theme: 'family', rarity: 'legendary', isBoss: true,
    situation: "⚔️ BOSS: Bố mẹ già bệnh nặng. Bạn phải chọn: bỏ công việc mơ ước về quê chăm sóc, hay gửi tiền nhưng không có mặt.",
    leftChoice: "Bỏ sự nghiệp, về quê", rightChoice: "Ở lại, gửi tiền về",
    leftImpact: { sanity: -10, energy: -20, social: 20, wealth: -30, effectName: "Hy sinh bản ngã vì bổn phận" },
    rightImpact: { sanity: -25, energy: -5, social: -25, wealth: 10, effectName: "Cảm giác tội lỗi mãn tính (Chronic Guilt)" },
    crowdPercentageLabel: "Không có đáp án đúng. Chỉ có đáp án bạn chịu được."
  },
  {
    id: "boss5", theme: 'social_media', rarity: 'legendary', isBoss: true,
    situation: "⚔️ BOSS: Video riêng tư của bạn bị rò rỉ lên mạng. Đang viral với 1 triệu lượt xem.",
    leftChoice: "Tranh đấu pháp lý, công khai danh tính", rightChoice: "Ẩn nấp, xóa mọi tài khoản",
    leftImpact: { sanity: -20, energy: -25, social: -15, wealth: -20, effectName: "Chấn thương kỹ thuật số (Digital Trauma)" },
    rightImpact: { sanity: -25, energy: -10, social: -25, wealth: -10, effectName: "Cô lập tự nguyện (Voluntary Isolation)" },
    crowdPercentageLabel: "Internet không bao giờ quên. Bạn sẽ sống với nó thế nào?"
  },
  {
    id: "boss6", theme: 'office', rarity: 'legendary', isBoss: true,
    situation: "⚔️ BOSS: Bạn được đề bạt làm giám đốc, nhưng phải sa thải 20 nhân viên — nhiều người có gia đình khó khăn.",
    leftChoice: "Nhận chức, sa thải như yêu cầu", rightChoice: "Từ chối thăng chức",
    leftImpact: { sanity: -25, energy: -10, social: -30, wealth: 25, effectName: "Quyền lực tha hóa (Power Corruption)" },
    rightImpact: { sanity: -5, energy: -15, social: 15, wealth: -25, effectName: "Từ bỏ quyền lực" },
    crowdPercentageLabel: "Mỗi bước lên cao đều dẫm lên ai đó."
  },
];

// ═══════════════════════════════════════════════
//  STORY CHAPTERS (3 Chương truyện)
// ═══════════════════════════════════════════════
export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'ch1', title: 'Ngày Đầu Đi Làm', emoji: '💼', description: 'Chương 1: Bước vào thế giới công sở đầy cạm bẫy',
    scenarios: [
      { id: 'ch1_1', theme: 'office', rarity: 'common', situation: 'Ngày đầu tiên đi làm. HR hỏi bạn có biết Excel không — thực ra bạn chỉ biết cộng trừ.', leftChoice: 'Thú nhận không biết', rightChoice: 'Nói dối "Thành thạo"', leftImpact: { sanity: 10, energy: 0, social: -10, wealth: -5, effectName: 'Trung thực ban đầu' }, rightImpact: { sanity: -15, energy: -5, social: 10, wealth: 5, effectName: 'Hiệu ứng Dunning-Kruger' }, crowdPercentageLabel: '78% nói quá về kỹ năng trong CV.' },
      { id: 'ch1_2', theme: 'office', rarity: 'common', situation: 'Đồng nghiệp rủ đi ăn trưa nhóm, nhưng bạn mang cơm theo vì tiết kiệm.', leftChoice: 'Đi ăn cùng nhóm', rightChoice: 'Ở lại ăn cơm nhà', leftImpact: { sanity: 5, energy: -5, social: 15, wealth: -15 }, rightImpact: { sanity: -5, energy: 10, social: -15, wealth: 10 }, crowdPercentageLabel: '65% chấp nhận tốn tiền để hòa nhập.' },
      { id: 'ch1_3', theme: 'office', rarity: 'rare', situation: 'Sếp giao task gấp lúc 5h chiều. "Xong trước 8h tối nhé." Bạn đã có hẹn với bạn bè.', leftChoice: 'Từ chối, giữ hẹn', rightChoice: 'Hủy hẹn, OT', leftImpact: { sanity: 10, energy: 10, social: 5, wealth: -15, effectName: 'Ranh giới công việc' }, rightImpact: { sanity: -15, energy: -20, social: -10, wealth: 10, effectName: 'People Pleasing tại công sở' }, crowdPercentageLabel: '87% không dám nói không với sếp trong tuần đầu.' },
      { id: 'ch1_4', theme: 'office', rarity: 'common', situation: 'Nhóm đang gossip về manager. Bạn tình cờ nghe được. Họ rủ bạn tham gia.', leftChoice: 'Tham gia nói xấu', rightChoice: 'Bỏ đi, không tham gia', leftImpact: { sanity: -10, energy: 5, social: 15, wealth: 0, effectName: 'Social Bonding qua Gossip' }, rightImpact: { sanity: 10, energy: -5, social: -15, wealth: 0, effectName: 'Cô lập tự nguyện' }, crowdPercentageLabel: '72% tham gia gossip để hòa nhập nhóm.' },
      { id: 'ch1_5', theme: 'office', rarity: 'legendary', isBoss: true, situation: '⚔️ BOSS: Review 3 tháng — sếp nói bạn "chưa đạt kỳ vọng" và gợi ý nên tìm việc khác. Bạn biết mình đã cố gắng hết sức.', leftChoice: 'Phản biện, đưa bằng chứng', rightChoice: 'Chấp nhận, bắt đầu tìm việc mới', leftImpact: { sanity: -15, energy: -20, social: -15, wealth: 5, effectName: 'Chiến đấu cho công bằng' }, rightImpact: { sanity: -20, energy: -10, social: -5, wealth: -15, effectName: 'Chấp nhận đánh giá bất công' }, crowdPercentageLabel: 'Sếp không phải lúc nào cũng đúng, nhưng sếp là sếp.' },
      { id: 'ch1_6', theme: 'office', rarity: 'rare', situation: 'Được mời dự án lớn nhưng phải học công nghệ mới trong 2 tuần. Rủi ro cao.', leftChoice: 'Từ chối, an toàn', rightChoice: 'Nhận, liều mình', leftImpact: { sanity: 5, energy: 10, social: -10, wealth: -5 }, rightImpact: { sanity: -10, energy: -25, social: 15, wealth: 15, effectName: 'Growth Mindset' }, crowdPercentageLabel: '55% chọn an toàn thay vì rủi ro phát triển.' },
      { id: 'ch1_7', theme: 'office', rarity: 'common', situation: 'Đồng nghiệp liên tục xin bạn giúp việc của họ. Bạn đã quá tải.', leftChoice: 'Từ chối dứt khoát', rightChoice: 'Tiếp tục giúp', leftImpact: { sanity: 15, energy: 10, social: -20, wealth: 0, effectName: 'Thiết lập ranh giới' }, rightImpact: { sanity: -20, energy: -25, social: 10, wealth: -5, effectName: 'Doormat Syndrome' }, crowdPercentageLabel: '60% không biết nói không với đồng nghiệp.' },
      { id: 'ch1_8', theme: 'office', rarity: 'epic', situation: 'Phát hiện đồng nghiệp thân chỉnh sửa báo cáo để che giấu sai sót nghiêm trọng.', leftChoice: 'Báo cáo lên cấp trên', rightChoice: 'Giúp che đậy vì là bạn thân', leftImpact: { sanity: 10, energy: -15, social: -25, wealth: -10, effectName: 'Moral Courage' }, rightImpact: { sanity: -25, energy: -5, social: 10, wealth: 5, effectName: 'Đồng phạm vì tình bạn' }, crowdPercentageLabel: 'Tình bạn có giá bao nhiêu khi đạo đức bị thử thách?' },
      { id: 'ch1_9', theme: 'office', rarity: 'rare', situation: 'Đến cuối năm, bạn được chọn: thưởng tiền mặt 50tr HOẶC 2 tuần nghỉ phép.', leftChoice: 'Lấy tiền', rightChoice: 'Lấy nghỉ phép', leftImpact: { sanity: -10, energy: -15, social: 0, wealth: 25 }, rightImpact: { sanity: 20, energy: 25, social: 10, wealth: -15 }, crowdPercentageLabel: '70% chọn tiền, rồi burnout sang năm.' },
      { id: 'ch1_10', theme: 'office', rarity: 'legendary', isBoss: true, situation: '⚔️ BOSS CUỐI: Sau 1 năm, bạn nhận được offer lương gấp đôi ở startup mới. Nhưng team hiện tại sẽ sụp đổ nếu bạn đi.', leftChoice: 'Ở lại vì đồng đội', rightChoice: 'Nhảy việc, theo cơ hội', leftImpact: { sanity: -15, energy: -10, social: 20, wealth: -20, effectName: 'Trung thành mù quáng (Misplaced Loyalty)' }, rightImpact: { sanity: -10, energy: -15, social: -25, wealth: 25, effectName: 'Tự Đầu Tư Bản Thân' }, crowdPercentageLabel: 'Công ty không bao giờ trung thành với bạn như bạn trung thành với họ.' },
    ]
  },
  {
    id: 'ch2', title: 'Mưa Bão Tình Yêu', emoji: '❤️‍🔥', description: 'Chương 2: Khi trái tim dẫn dắt, lý trí trả giá',
    scenarios: [
      { id: 'ch2_1', theme: 'love', rarity: 'common', situation: 'Bạn match với một người cực kỳ hấp dẫn trên app hẹn hò. Hồ sơ quá hoàn hảo.', leftChoice: 'Chat ngay, hẹn gặp', rightChoice: 'Cảnh giác, research trước', leftImpact: { sanity: -5, energy: 10, social: 10, wealth: -10, effectName: 'Hiệu ứng Hào quang (Halo Effect)' }, rightImpact: { sanity: 10, energy: -5, social: -5, wealth: 5 }, crowdPercentageLabel: '80% swipe right vì ngoại hình mà không kiểm tra gì.' },
      { id: 'ch2_2', theme: 'love', rarity: 'common', situation: 'Buổi hẹn đầu tiên. Người ấy đến muộn 1 tiếng không xin lỗi.', leftChoice: 'Bỏ qua, vui vẻ tiếp', rightChoice: 'Nói rõ không hài lòng', leftImpact: { sanity: -10, energy: -5, social: 10, wealth: -10, effectName: 'Thiết lập tiêu chuẩn thấp' }, rightImpact: { sanity: 10, energy: -10, social: -10, wealth: 0, effectName: 'Ranh giới từ ngày đầu' }, crowdPercentageLabel: '65% bỏ qua red flag đầu tiên vì crush quá mạnh.' },
      { id: 'ch2_3', theme: 'love', rarity: 'rare', situation: 'Yêu nhau 3 tháng. Người ấy muốn bạn xóa hết bạn khác giới trên mạng.', leftChoice: 'Xóa hết, chiều người yêu', rightChoice: 'Từ chối, giữ bạn bè', leftImpact: { sanity: -20, energy: -5, social: -20, wealth: 0, effectName: 'Cô lập hóa (Isolation Tactic)' }, rightImpact: { sanity: 10, energy: -10, social: 5, wealth: 0, effectName: 'Bảo vệ mạng lưới xã hội' }, crowdPercentageLabel: '45% chấp nhận yêu cầu kiểm soát vì "yêu là tin tưởng".' },
      { id: 'ch2_4', theme: 'love', rarity: 'common', situation: 'Cãi nhau. Người ấy cold war 5 ngày không nói chuyện. Bạn rất khổ sở.', leftChoice: 'Nhắn tin xin lỗi trước', rightChoice: 'Chờ đợi, không nhượng bộ', leftImpact: { sanity: -15, energy: -10, social: 10, wealth: 0, effectName: 'Anxious Attachment' }, rightImpact: { sanity: -10, energy: -15, social: -15, wealth: 0, effectName: 'Avoidant Pattern' }, crowdPercentageLabel: '70% nhắn trước vì không chịu nổi sự im lặng.' },
      { id: 'ch2_5', theme: 'love', rarity: 'legendary', isBoss: true, situation: '⚔️ BOSS: Phát hiện người yêu nhắn tin mập mờ với người khác. Không rõ là lừa dối hay chỉ là bạn.', leftChoice: 'Đối chất ngay lập tức', rightChoice: 'Âm thầm theo dõi thêm', leftImpact: { sanity: -15, energy: -20, social: -20, wealth: 0, effectName: 'Đối mặt Sự thật Đau đớn' }, rightImpact: { sanity: -25, energy: -15, social: -10, wealth: 0, effectName: 'Paranoia & Kiểm soát' }, crowdPercentageLabel: 'Sự nghi ngờ sẽ ăn mòn bạn dù sự thật là gì.' },
      { id: 'ch2_6', theme: 'love', rarity: 'rare', situation: 'Bạn bè nói người yêu bạn "không xứng". Họ không sai hoàn toàn.', leftChoice: 'Nghe bạn, suy nghĩ lại', rightChoice: 'Phớt lờ, bảo vệ người yêu', leftImpact: { sanity: 5, energy: -10, social: 10, wealth: 0 }, rightImpact: { sanity: -10, energy: -5, social: -15, wealth: 0, effectName: 'Romeo & Juliet Effect' }, crowdPercentageLabel: '55% càng bị phản đối càng yêu mãnh liệt hơn.' },
      { id: 'ch2_7', theme: 'love', rarity: 'common', situation: 'Người yêu muốn bạn thay đổi phong cách ăn mặc theo ý họ.', leftChoice: 'Thay đổi để được yêu', rightChoice: 'Giữ phong cách riêng', leftImpact: { sanity: -20, energy: -5, social: 5, wealth: -10, effectName: 'Mất bản sắc (Identity Loss)' }, rightImpact: { sanity: 10, energy: 5, social: -10, wealth: 5, effectName: 'Bảo vệ bản ngã' }, crowdPercentageLabel: '40% thay đổi dần dần mà không nhận ra.' },
      { id: 'ch2_8', theme: 'love', rarity: 'epic', situation: 'Người yêu cũ quay lại, nói đã thay đổi. Người hiện tại ổn định nhưng nhàm chán.', leftChoice: 'Quay lại với người cũ', rightChoice: 'Ở lại với người hiện tại', leftImpact: { sanity: -20, energy: 10, social: -25, wealth: -5, effectName: 'Cỏ bên kia xanh hơn (Grass is Greener)' }, rightImpact: { sanity: -5, energy: -10, social: 10, wealth: 5, effectName: 'Chọn sự ổn định' }, crowdPercentageLabel: '35% quay lại với người cũ, 80% trong số đó hối hận.' },
      { id: 'ch2_9', theme: 'love', rarity: 'rare', situation: 'Người yêu đòi cưới. Bạn yêu họ nhưng chưa sẵn sàng về tài chính.', leftChoice: 'Cưới vội, tính sau', rightChoice: 'Nói thật, chờ thêm', leftImpact: { sanity: -10, energy: -10, social: 15, wealth: -30, effectName: 'Quyết định dưới áp lực' }, rightImpact: { sanity: 5, energy: -15, social: -20, wealth: 10, effectName: 'Kế hoạch dài hạn' }, crowdPercentageLabel: '50% cưới khi chưa sẵn sàng vì áp lực xã hội.' },
      { id: 'ch2_10', theme: 'love', rarity: 'legendary', isBoss: true, situation: '⚔️ BOSS CUỐI: Mối quan hệ tan vỡ. Người ấy nói "Anh/Em đã hủy hoại cuộc đời tôi." Bạn nhận ra mình có phần đúng.', leftChoice: 'Tự trách bản thân hoàn toàn', rightChoice: 'Chấp nhận lỗi 50-50, bước tiếp', leftImpact: { sanity: -30, energy: -20, social: -5, wealth: 0, effectName: 'Tự hủy hoại (Self-Blame Spiral)' }, rightImpact: { sanity: -10, energy: -15, social: -15, wealth: 0, effectName: 'Trưởng thành qua mất mát' }, crowdPercentageLabel: 'Chia tay không ai thắng. Chỉ có người bớt đau hơn.' },
    ]
  },
  {
    id: 'ch3', title: 'Bẫy Tài Chính', emoji: '💰', description: 'Chương 3: Tiền bạc — phép thử tàn khốc nhất của lý trí',
    scenarios: [
      { id: 'ch3_1', theme: 'money', rarity: 'common', situation: 'Lương đầu tiên: 12 triệu. Bố mẹ, bạn bè, và chính bạn đều muốn tiêu.', leftChoice: 'Tiêu xả láng ăn mừng', rightChoice: 'Tiết kiệm 50%, ăn mừng nhẹ', leftImpact: { sanity: 10, energy: 10, social: 15, wealth: -25 }, rightImpact: { sanity: 5, energy: -5, social: -10, wealth: 15, effectName: 'Kỷ luật tài chính' }, crowdPercentageLabel: '85% tiêu sạch lương đầu trong tuần đầu.' },
      { id: 'ch3_2', theme: 'money', rarity: 'common', situation: 'Đồng nghiệp rủ mua bảo hiểm "siêu lợi nhuận". Nghe rất hay nhưng bạn không hiểu rõ.', leftChoice: 'Mua ngay theo lời đồng nghiệp', rightChoice: 'Từ chối, tự tìm hiểu', leftImpact: { sanity: -15, energy: -5, social: 10, wealth: -20, effectName: 'Hiệu ứng Bầy đàn (Herd Behavior)' }, rightImpact: { sanity: 10, energy: -5, social: -10, wealth: 10 }, crowdPercentageLabel: '60% mua bảo hiểm vì tin lời người quen.' },
      { id: 'ch3_3', theme: 'money', rarity: 'rare', situation: 'App cho vay nhanh quảng cáo "0% lãi suất". Bạn cần tiền gấp cho xe máy mới.', leftChoice: 'Vay từ app', rightChoice: 'Đi xe cũ, tiết kiệm thêm', leftImpact: { sanity: -10, energy: 10, social: 5, wealth: -25, effectName: 'Bẫy Nợ tiêu dùng (Debt Trap)' }, rightImpact: { sanity: 10, energy: -10, social: -5, wealth: 15, effectName: 'Delayed Gratification' }, crowdPercentageLabel: '40% Gen Z có ít nhất 1 khoản nợ tín dụng.' },
      { id: 'ch3_4', theme: 'money', rarity: 'common', situation: 'Bạn thân mời góp vốn 50tr mở quán trà sữa. "Chắc chắn lãi!" — không có hợp đồng.', leftChoice: 'Góp vốn vì tin bạn', rightChoice: 'Yêu cầu hợp đồng, hoặc từ chối', leftImpact: { sanity: -10, energy: -5, social: 10, wealth: -25, effectName: 'Thiên kiến Lạc quan (Optimism Bias)' }, rightImpact: { sanity: 10, energy: -5, social: -15, wealth: 10, effectName: 'Tư duy kinh doanh' }, crowdPercentageLabel: '55% mất tiền vì kinh doanh theo cảm xúc.' },
      { id: 'ch3_5', theme: 'money', rarity: 'legendary', isBoss: true, situation: '⚔️ BOSS: Cổ phiếu bạn mua tăng 300%. Tất cả nói "giữ thêm". Nhưng bạn cần tiền trả nợ.', leftChoice: 'Bán chốt lời', rightChoice: 'Giữ, tin tưởng tăng tiếp', leftImpact: { sanity: 5, energy: 5, social: -15, wealth: -10, effectName: 'Tâm lý bầy đàn ngược (Contrarian Risk)' }, rightImpact: { sanity: -15, energy: -10, social: 10, wealth: -20, effectName: 'Tham lam (Greed Bias)' }, crowdPercentageLabel: 'Warren Buffett: "Hãy sợ khi mọi người tham lam."' },
      { id: 'ch3_6', theme: 'money', rarity: 'rare', situation: 'Bạn cùng phòng không trả tiền phòng 3 tháng. Nói "tháng sau trả". Bạn đang gánh hết.', leftChoice: 'Cho thêm cơ hội', rightChoice: 'Đuổi ra, tìm người mới', leftImpact: { sanity: -15, energy: -10, social: 5, wealth: -20, effectName: 'Doormat Syndrome' }, rightImpact: { sanity: 10, energy: -10, social: -20, wealth: 15, effectName: 'Ranh giới tài chính' }, crowdPercentageLabel: '50% không dám đuổi bạn cùng phòng vì ngại.' },
      { id: 'ch3_7', theme: 'money', rarity: 'epic', situation: 'Phát hiện giấy tờ bảo hiểm nhân thọ bố mẹ mua cho bạn từ nhỏ — bạn là người thụ hưởng 2 tỷ nếu bố mẹ mất.', leftChoice: 'Hủy bảo hiểm, không muốn liên quan', rightChoice: 'Giữ lại, coi như bảo hiểm bình thường', leftImpact: { sanity: 10, energy: -5, social: -10, wealth: -15, effectName: 'Đạo đức tuyệt đối' }, rightImpact: { sanity: -15, energy: 5, social: 5, wealth: 10, effectName: 'Thực dụng đạo đức (Moral Pragmatism)' }, crowdPercentageLabel: 'Tiền bạc đặt lương tâm lên bàn cân.' },
      { id: 'ch3_8', theme: 'money', rarity: 'common', situation: 'Tết đến. Gia đình truyền thống đòi lì xì khắp nơi. Ví bạn chỉ còn 2 triệu cho cả tháng.', leftChoice: 'Vay tiền để lì xì đầy đủ', rightChoice: 'Lì xì ít, giải thích thật', leftImpact: { sanity: -10, energy: -10, social: 15, wealth: -25, effectName: 'Thể diện xã hội (Social Face)' }, rightImpact: { sanity: 10, energy: 5, social: -20, wealth: 10, effectName: 'Trung thực tài chính' }, crowdPercentageLabel: '75% vay tiền lì xì để giữ thể diện.' },
      { id: 'ch3_9', theme: 'money', rarity: 'rare', situation: 'Công ty MLM mời bạn gia nhập. Người rủ là anh họ. Sản phẩm "chữa bách bệnh".', leftChoice: 'Tham gia vì anh họ', rightChoice: 'Từ chối, cảnh báo anh họ', leftImpact: { sanity: -20, energy: -10, social: -10, wealth: -30, effectName: 'Bẫy đa cấp (Pyramid Scheme)' }, rightImpact: { sanity: 15, energy: -5, social: -15, wealth: 10, effectName: 'Tư duy phản biện' }, crowdPercentageLabel: '30% từng bị dụ vào MLM bởi người thân.' },
      { id: 'ch3_10', theme: 'money', rarity: 'legendary', isBoss: true, situation: '⚔️ BOSS CUỐI: Phá sản. Nợ 200 triệu. Hai lựa chọn: khai phá sản (mất hết tín dụng) hoặc vay nóng trả nợ (lãi 20%/tháng).', leftChoice: 'Khai phá sản, làm lại từ đầu', rightChoice: 'Vay nóng, cố xoay xở', leftImpact: { sanity: -15, energy: -20, social: -20, wealth: -10, effectName: 'Chấp nhận Thất bại' }, rightImpact: { sanity: -25, energy: -15, social: -5, wealth: -30, effectName: 'Vòng xoáy Nợ nần (Debt Spiral)' }, crowdPercentageLabel: 'Khi nào nên dừng lại? Khi bạn đã hết lựa chọn an toàn.' },
    ]
  },
];
