// ═══════════════════════════════════════════
//  IMPOSTOR GAME DATA - "AI ĐANG NÓI DỐI?"
// ═══════════════════════════════════════════

export interface ImpostorCharacter {
  name: string;
  emoji: string;
  statement: string;
  isImpostor: boolean;
}

export interface ImpostorScenario {
  id: string;
  difficulty: 1 | 2 | 3; // 1=easy, 2=medium, 3=hard
  theme: string;
  themeEmoji: string;
  situation: string;
  characters: ImpostorCharacter[];
  tactic: string;
  tacticOptions: string[];
  explanation: string;
  tip: string;
}

export const IMPOSTOR_SCENARIOS: ImpostorScenario[] = [
  // ─── ROUND 1-3: DỄ (4 người, 1 impostor, rõ ràng) ───
  {
    id: 'imp1', difficulty: 1, theme: 'Công sở', themeEmoji: '💼',
    situation: 'Dự án thất bại. Sếp triệu tập họp để tìm nguyên nhân.',
    characters: [
      { name: 'Minh', emoji: '👨‍💼', statement: 'Tôi đã cảnh báo deadline quá gấp từ đầu, nhưng không ai nghe.', isImpostor: false },
      { name: 'Lan', emoji: '👩‍💻', statement: 'Phần tôi hoàn thành đúng hạn. Có thể do phối hợp nhóm chưa tốt.', isImpostor: false },
      { name: 'Hùng', emoji: '🧔', statement: 'Nếu Lan làm phần của cô ấy tốt hơn thì đã không thế này. Tôi luôn phải gánh team.', isImpostor: true },
      { name: 'Trang', emoji: '👩‍🔬', statement: 'Tôi nghĩ chúng ta nên rút kinh nghiệm thay vì đổ lỗi.', isImpostor: false },
    ],
    tactic: 'Đổ lỗi nạn nhân (Victim Blaming)',
    tacticOptions: ['Gaslighting', 'Đổ lỗi nạn nhân (Victim Blaming)', 'Love Bombing', 'Silent Treatment'],
    explanation: 'Hùng đổ lỗi cho Lan trong khi không có bằng chứng, và tự nâng mình lên ("luôn phải gánh team"). Đây là chiêu Victim Blaming kinh điển — biến người khác thành nguyên nhân để tránh trách nhiệm.',
    tip: 'Khi ai đó đổ lỗi mà không đưa bằng chứng cụ thể + tự khen mình → đó là red flag. Hãy hỏi: "Cụ thể phần nào của Lan gây ra vấn đề?"',
  },
  {
    id: 'imp2', difficulty: 1, theme: 'Tình yêu', themeEmoji: '❤️',
    situation: 'Hai người yêu nhau cãi nhau. Bạn bè ngồi nghe cả hai kể.',
    characters: [
      { name: 'An', emoji: '👱‍♂️', statement: 'Em nói rõ ràng hôm đó không muốn đi, nhưng anh ấy bảo em nhớ nhầm, em chưa bao giờ nói vậy.', isImpostor: false },
      { name: 'Bảo', emoji: '👨‍🦱', statement: 'Cô ấy hay tưởng tượng ra mọi thứ. Tôi thề tôi không nói gì sai cả. Có khi cô ấy cần đi khám.', isImpostor: true },
      { name: 'Chi', emoji: '👩', statement: 'Tôi thấy hai bạn nên ngồi nói chuyện bình tĩnh hơn.', isImpostor: false },
      { name: 'Duy', emoji: '🧑', statement: 'Mỗi người có góc nhìn khác nhau, chuyện bình thường thôi.', isImpostor: false },
    ],
    tactic: 'Gaslighting',
    tacticOptions: ['Guilt Tripping', 'Fear Mongering', 'Gaslighting', 'Nịnh bợ (Flattery)'],
    explanation: 'Bảo phủ nhận lời An nói, khiến An nghi ngờ trí nhớ của chính mình, rồi gợi ý An "cần đi khám" — đây là Gaslighting chuẩn giáo khoa. Mục đích: khiến nạn nhân mất niềm tin vào bản thân.',
    tip: 'Nếu ai liên tục nói bạn "nhớ nhầm" hoặc "tưởng tượng" → tin vào trí nhớ của bạn. Viết nhật ký để có bằng chứng.',
  },
  {
    id: 'imp3', difficulty: 1, theme: 'Gia đình', themeEmoji: '👪',
    situation: 'Con trai muốn chuyển ra ở riêng. Gia đình họp bàn.',
    characters: [
      { name: 'Bố', emoji: '👴', statement: 'Con lớn rồi, bố tôn trọng quyết định của con.', isImpostor: false },
      { name: 'Mẹ', emoji: '👵', statement: 'Con đi rồi ai chăm mẹ? Mẹ già rồi, bệnh nhiều. Con bỏ mẹ đi sao? Mẹ nuôi con bao nhiêu năm...', isImpostor: true },
      { name: 'Chị Hai', emoji: '👩', statement: 'Em cứ thử đi, không hợp thì về.', isImpostor: false },
      { name: 'Chú', emoji: '🧔', statement: 'Hồi tao bằng tuổi mày tao cũng muốn ra riêng. Bình thường thôi.', isImpostor: false },
    ],
    tactic: 'Guilt Tripping (Tạo cảm giác tội lỗi)',
    tacticOptions: ['Gaslighting', 'Silent Treatment', 'Guilt Tripping (Tạo cảm giác tội lỗi)', 'DARVO'],
    explanation: 'Mẹ không phản đối bằng lý lẽ mà dùng cảm xúc: "bỏ mẹ", "mẹ già bệnh", "nuôi bao năm" — tất cả nhằm khiến con cảm thấy TỘI LỖI nếu rời đi. Đây là Guilt Tripping.',
    tip: 'Yêu thương ≠ kiểm soát. Nếu quyết định của bạn bị phản đối THUẦN bằng cảm xúc (không có lý lẽ) → đó là manipulation.',
  },
  {
    id: 'imp4', difficulty: 1, theme: 'Bạn bè', themeEmoji: '👫',
    situation: 'Nhóm bạn bàn nhau đi du lịch Đà Lạt. Một người không muốn đi.',
    characters: [
      { name: 'Phúc', emoji: '😎', statement: 'Tụi mình đi hết rồi, mỗi mày không đi thì kỳ lắm. Ai cũng đóng tiền rồi, mày không đi là phá nhóm đấy.', isImpostor: true },
      { name: 'Hà', emoji: '👧', statement: 'Nếu bạn không tiện thì không sao, lần sau đi cũng được.', isImpostor: false },
      { name: 'Tuấn', emoji: '🧑', statement: 'Tao hiểu, tiền bạc là vấn đề thật. Đừng ép nhau.', isImpostor: false },
      { name: 'Mai', emoji: '👩‍🦰', statement: 'Mình có thể chọn chỗ rẻ hơn để mọi người đều đi được.', isImpostor: false },
    ],
    tactic: 'Peer Pressure (Áp lực đám đông)',
    tacticOptions: ['Peer Pressure (Áp lực đám đông)', 'Love Bombing', 'Đổ lỗi nạn nhân', 'Fear Mongering'],
    explanation: 'Phúc dùng áp lực nhóm: "ai cũng đi rồi", "phá nhóm" — khiến người không đi cảm thấy bị cô lập nếu từ chối. Đây là Peer Pressure — ép bằng số đông thay vì thuyết phục.',
    tip: 'Bạn thật sẽ tôn trọng quyết định của bạn. Nếu bị nói "phá nhóm" chỉ vì từ chối → đó không phải tình bạn lành mạnh.',
  },

  // ─── ROUND 4-6: TRUNG BÌNH (5 người, tinh vi hơn) ───
  {
    id: 'imp5', difficulty: 2, theme: 'Công sở', themeEmoji: '💼',
    situation: 'Nhân viên mới được khen trước team. Đồng nghiệp phản ứng.',
    characters: [
      { name: 'Sếp Trung', emoji: '👨‍💼', statement: 'Bạn Linh làm rất tốt tuần này. Mọi người nên học hỏi.', isImpostor: false },
      { name: 'Linh', emoji: '👩‍💻', statement: 'Cảm ơn anh, em cố gắng thêm.', isImpostor: false },
      { name: 'Khoa', emoji: '🧔', statement: 'Ừ giỏi thật, nhưng hồi tôi mới vào tôi còn giỏi hơn. Mà thôi, tôi không thích khoe.', isImpostor: true },
      { name: 'Thảo', emoji: '👩', statement: 'Chúc mừng Linh nhé!', isImpostor: false },
      { name: 'Nam', emoji: '🧑', statement: 'Tốt quá, team mình có thêm người giỏi.', isImpostor: false },
    ],
    tactic: 'Backhanded Compliment (Khen đểu)',
    tacticOptions: ['Gaslighting', 'Backhanded Compliment (Khen đểu)', 'Guilt Tripping', 'Peer Pressure'],
    explanation: 'Khoa "khen" Linh nhưng ngay lập tức so sánh với bản thân ("tôi còn giỏi hơn") rồi giả khiêm tốn ("không thích khoe"). Đây là Backhanded Compliment — khen để chà đạp.',
    tip: 'Nếu lời khen khiến bạn thấy TỆ hơn thay vì vui → đó không phải lời khen. Đó là manipulation.',
  },
  {
    id: 'imp6', difficulty: 2, theme: 'Mạng xã hội', themeEmoji: '📱',
    situation: 'Group chat lớp đang bàn về bạn A vắng mặt.',
    characters: [
      { name: 'Hiền', emoji: '👧', statement: 'Bạn A dạo này ít online nhỉ, không biết có chuyện gì không.', isImpostor: false },
      { name: 'Đức', emoji: '🧑', statement: 'Tao nghe nói bạn A có vấn đề gia đình. Nhưng đừng nói tao nói nhé, tao chỉ lo cho bạn ấy thôi.', isImpostor: true },
      { name: 'Vy', emoji: '👩', statement: 'Nếu lo thì nhắn tin hỏi thăm riêng đi.', isImpostor: false },
      { name: 'Quân', emoji: '😎', statement: 'Ừ, để tao gọi cho bạn ấy xem sao.', isImpostor: false },
      { name: 'Ngọc', emoji: '👩‍🦰', statement: 'Mọi người đừng suy diễn, chắc bạn ấy bận thôi.', isImpostor: false },
    ],
    tactic: 'Gossip núp bóng quan tâm',
    tacticOptions: ['Silent Treatment', 'Gossip núp bóng quan tâm', 'Fear Mongering', 'Đổ lỗi nạn nhân'],
    explanation: 'Đức rò rỉ thông tin riêng tư của A rồi nói "đừng nói tao nói" + "tao chỉ lo thôi". Đây là gossip trá hình — dùng vỏ bọc "quan tâm" để phát tán chuyện người khác.',
    tip: 'Người thật sự quan tâm sẽ liên hệ TRỰC TIẾP, không kể chuyện riêng của bạn trong group chat.',
  },
  {
    id: 'imp7', difficulty: 2, theme: 'Kinh doanh', themeEmoji: '💰',
    situation: 'Một người bạn rủ bạn đầu tư vào dự án.',
    characters: [
      { name: 'Hoàng', emoji: '🤵', statement: 'Dự án này cam kết lợi nhuận 30%/tháng. Anh em trong nhóm ai cũng vào rồi, chỉ còn chỗ cho 2 người nữa thôi. Quyết nhanh nhé!', isImpostor: true },
      { name: 'Thanh', emoji: '👨‍💼', statement: 'Tôi thấy cần xem kỹ hợp đồng và kiểm tra pháp lý trước.', isImpostor: false },
      { name: 'Hương', emoji: '👩', statement: 'Lợi nhuận 30%/tháng hơi cao nhỉ, có gì đảm bảo không?', isImpostor: false },
      { name: 'Khánh', emoji: '🧑', statement: 'Tôi sẽ tìm hiểu thêm rồi trả lời sau.', isImpostor: false },
      { name: 'Yến', emoji: '👩‍🦰', statement: 'Mình nên Google xem công ty này có uy tín không đã.', isImpostor: false },
    ],
    tactic: 'FOMO + Scarcity (Khan hiếm giả)',
    tacticOptions: ['Guilt Tripping', 'Gaslighting', 'FOMO + Scarcity (Khan hiếm giả)', 'Backhanded Compliment'],
    explanation: 'Hoàng dùng 3 chiêu cùng lúc: (1) Cam kết lợi nhuận phi thực tế, (2) "Ai cũng vào rồi" = đám đông, (3) "Chỉ còn 2 chỗ" = khan hiếm giả tạo urgency. Đây là combo FOMO + Scarcity kinh điển.',
    tip: 'Cơ hội thật không bao giờ ép bạn "quyết nhanh". Nếu bạn không có thời gian suy nghĩ → đó là red flag.',
  },

  // ─── ROUND 7+: KHÓ (6 người, 2 impostors) ───
  {
    id: 'imp8', difficulty: 3, theme: 'Công sở', themeEmoji: '💼',
    situation: 'Họp đánh giá cuối năm. Nhân viên Linh bị đánh giá thấp.',
    characters: [
      { name: 'Sếp Hà', emoji: '👩‍💼', statement: 'Linh à, em làm cũng được, nhưng so với kỳ vọng thì chưa đủ. Mà thôi, chị cũng quá bận nên có khi chị chưa hướng dẫn em kỹ.', isImpostor: true },
      { name: 'Linh', emoji: '👩‍💻', statement: 'Em đã hoàn thành 12/15 KPI, em nghĩ kết quả khá tốt...', isImpostor: false },
      { name: 'Khôi', emoji: '🧔', statement: 'Linh ơi, chị Hà nói đúng đấy. Mình đừng tự ái, xem xét lại đi. Chị Hà luôn công bằng mà.', isImpostor: true },
      { name: 'Tâm', emoji: '👩', statement: 'Tôi thấy 12/15 KPI là tốt mà, tiêu chí đánh giá cần minh bạch hơn.', isImpostor: false },
      { name: 'Dũng', emoji: '🧑', statement: 'Đánh giá nên dựa trên số liệu, không phải cảm nhận chủ quan.', isImpostor: false },
      { name: 'Phương', emoji: '👩‍🦰', statement: 'Mình nên có rubric rõ ràng cho lần sau.', isImpostor: false },
    ],
    tactic: 'DARVO + Flying Monkey',
    tacticOptions: ['Peer Pressure', 'DARVO + Flying Monkey', 'FOMO', 'Backhanded Compliment'],
    explanation: 'Sếp Hà dùng DARVO: đánh giá thấp Linh rồi giả nhận lỗi ("chị quá bận") để tỏ ra hợp lý. Khôi là "Flying Monkey" — người bênh vực kẻ thao túng ("chị Hà luôn công bằng") và quay sang ép Linh chấp nhận.',
    tip: 'DARVO = Phủ nhận → Tấn công → Đảo vai nạn nhân. Flying Monkey = người vô tình/cố ý bênh kẻ thao túng. Cảnh giác cả hai!',
  },
  {
    id: 'imp9', difficulty: 3, theme: 'Tình yêu', themeEmoji: '❤️',
    situation: 'Nhóm bạn thân nói về mối quan hệ của Hà. Bạn trai Hà (Toàn) cũng có mặt.',
    characters: [
      { name: 'Hà', emoji: '👩', statement: 'Dạo này em thấy mệt mỏi, không biết tại sao em cứ cảm thấy mình sai hoài...', isImpostor: false },
      { name: 'Toàn', emoji: '👨‍🦱', statement: 'Anh yêu em nhất trên đời em biết mà. Anh mua cho em bao nhiêu thứ rồi. Anh chỉ muốn tốt cho em thôi, em đừng nghe ai xúi.', isImpostor: true },
      { name: 'Linh', emoji: '👧', statement: 'Hà ơi, mình thấy bạn thay đổi nhiều kể từ khi yêu. Bạn ít gặp tụi mình hơn.', isImpostor: false },
      { name: 'Minh', emoji: '🧑', statement: 'Tao thấy Toàn tốt mà. Mấy đứa đừng xen vào chuyện người ta.', isImpostor: true },
      { name: 'Quỳnh', emoji: '👩‍🦰', statement: 'Hà, bạn cảm thấy thế nào mới là quan trọng, không phải ai mua gì cho bạn.', isImpostor: false },
      { name: 'Đạt', emoji: '😎', statement: 'Mối quan hệ lành mạnh thì cả hai đều vui, không ai phải mệt mỏi.', isImpostor: false },
    ],
    tactic: 'Love Bombing + Flying Monkey',
    tacticOptions: ['Guilt Tripping', 'Gaslighting', 'Peer Pressure', 'Love Bombing + Flying Monkey'],
    explanation: 'Toàn dùng Love Bombing: liên tục nhắc "anh yêu em", "mua cho em" để biện minh cho hành vi kiểm soát. Minh là Flying Monkey — bênh Toàn và cô lập Hà khỏi bạn bè ("đừng xen vào").',
    tip: 'Yêu thương thật không cần liên tục nhắc. Nếu ai dùng quà tặng/lời ngọt để CHẶN bạn suy nghĩ → đó là Love Bombing.',
  },
  {
    id: 'imp10', difficulty: 3, theme: 'Mạng xã hội', themeEmoji: '📱',
    situation: 'Forum online tranh luận về 1 sản phẩm bị tố lừa đảo.',
    characters: [
      { name: 'User_ThanhTu', emoji: '🧑‍💻', statement: 'Tôi mua rồi, không hiệu quả gì cả. Đòi refund thì bị block.', isImpostor: false },
      { name: 'User_StarReview', emoji: '⭐', statement: 'Mọi người đừng tin mấy review xấu. Tôi dùng 2 tuần thấy da đẹp hẳn. Chắc do bạn kia dùng sai cách thôi. Link mua ở bio tôi nhé!', isImpostor: true },
      { name: 'User_DocTor99', emoji: '🧑‍⚕️', statement: 'Thành phần sản phẩm này không có gì đặc biệt, giá quá cao so với thị trường.', isImpostor: false },
      { name: 'User_HappyMom', emoji: '👩', statement: 'Ai chê thì chê, tôi thấy ok mà. Mà sao mấy bạn chưa mua mà cũng chê? Ganh tị à?', isImpostor: true },
      { name: 'User_Neko', emoji: '🐱', statement: 'Mình trung lập, nhưng thấy nhiều red flag quá. Cẩn thận mọi người.', isImpostor: false },
      { name: 'User_Jack', emoji: '🎧', statement: 'Có ai check được giấy phép kinh doanh của cty này không?', isImpostor: false },
    ],
    tactic: 'Shill Marketing + Ad Hominem',
    tacticOptions: ['Shill Marketing + Ad Hominem', 'DARVO', 'Guilt Tripping', 'Silent Treatment'],
    explanation: 'StarReview là shill (quảng cáo ngầm: "link ở bio") + đổ lỗi người dùng ("dùng sai cách"). HappyMom dùng Ad Hominem — thay vì phản biện, tấn công người chê ("ganh tị à?"). Cả hai đều bảo vệ sản phẩm bằng chiêu trò thay vì bằng chứng.',
    tip: 'Red flags online: (1) Link bán hàng trong comment "review", (2) Tấn công người chê thay vì đưa bằng chứng, (3) "Bạn dùng sai" khi sản phẩm không hiệu quả.',
  },
];
