// ─── AI Scenario Analyzer: Rule-based Keyword Database ───────────────────────
// Mỗi rule map một nhóm từ khóa → hiệu ứng tâm lý tương ứng
// Engine sẽ scan input text của user và match với các rules này

export interface AnalyzerRule {
  id: string;
  effectName: string;       // Tên hiệu ứng tâm lý
  effectEmoji: string;      // Emoji đại diện
  keywords: string[];       // Từ khóa trigger (lowercase)
  explanation: string;      // Giải thích ngắn gọn
  advice: string;           // Lời khuyên thám tử
  relatedEffectId?: string; // Link sang PSY_EFFECTS nếu có
  category: 'cognitive' | 'emotion' | 'social' | 'memory' | 'decision' | 'manipulation';
}

export const ANALYZER_RULES: AnalyzerRule[] = [
  // ── Nhận thức (Cognitive) ──────────────────────────────────────────────
  {
    id: 'ar1',
    effectName: 'Dunning-Kruger',
    effectEmoji: '🤡',
    keywords: ['tự tin quá', 'giỏi nhất', 'biết hết', 'chuyên gia', 'dumb', 'ngu mà tưởng giỏi', 'ảo tưởng', 'tưởng hay', 'tưởng mình giỏi', 'không biết gì mà nói nhiều', 'kiêu', 'chém gió', 'nổi tiếng', 'giỏi thật', 'học lõm', 'biết tuốt', 'tinh tướng', 'múa rìu'],
    explanation: 'Đây là dấu hiệu của Hiệu ứng Dunning-Kruger: người biết ít thường tự tin quá mức, trong khi chuyên gia thực thụ lại hay nghi ngờ bản thân.',
    advice: '🕵️ Lời khuyên: Hãy hỏi "Mình thực sự biết gì về lĩnh vực này?" trước khi phát biểu. Sự khiêm tốn trí tuệ là vũ khí của thám tử.',
    relatedEffectId: 'e1',
    category: 'cognitive',
  },
  {
    id: 'ar2',
    effectName: 'Confirmation Bias',
    effectEmoji: '🔍',
    keywords: ['chỉ tin', 'đúng ý mình', 'bỏ qua bằng chứng', 'không nghe', 'cố chấp', 'thiên kiến', 'chỉ đọc', 'chỉ xem', 'echo chamber', 'bong bóng', 'lọc tin', 'chỉ follow', 'ngang ngược', 'bảo thủ', 'không thay đổi', 'cãi cùn', 'đúng rồi', 'đúng hết'],
    explanation: 'Bạn đang rơi vào Confirmation Bias: chỉ tìm kiếm thông tin ủng hộ quan điểm sẵn có và lờ đi mọi bằng chứng ngược lại.',
    advice: '🕵️ Lời khuyên: Chủ động đọc các quan điểm NGƯỢC với bạn. Sự thật thường nằm giữa hai bên.',
    category: 'cognitive',
  },
  {
    id: 'ar3',
    effectName: 'Anchoring Effect',
    effectEmoji: '⚓',
    keywords: ['giá đầu', 'giá gốc', 'giảm giá', 'sale', 'khuyến mãi', 'so sánh giá', 'mắc quá', 'rẻ quá', 'hời', 'giá ban đầu', 'từ trước giá', 'giá niêm yết', 'mặc cả', 'trả giá', 'ép giá', 'giảm thêm'],
    explanation: 'Bạn đang bị Anchoring Effect: con số đầu tiên bạn nhìn thấy trở thành "mỏ neo" chi phối toàn bộ phán đoán sau đó.',
    advice: '🕵️ Lời khuyên: Tự nghiên cứu giá thị trường TRƯỚC khi xem giá bán. Đường để "giá gốc" thao túng bạn.',
    category: 'cognitive',
  },
  {
    id: 'ar4',
    effectName: 'Barnum Effect',
    effectEmoji: '🔮',
    keywords: ['tử vi', 'cung hoàng đạo', 'bói toán', 'tarot', 'tâm linh', 'số mệnh', 'giống mình', 'đúng quá', 'nói đúng', 'chiêm tinh', 'phong thủy', 'vận mệnh', 'số phận', 'linh ứng', 'trải bài', 'vận hạn'],
    explanation: 'Đây là Barnum Effect: các mô tả chung chung (như tử vi) được thiết kế đủ mơ hồ để ai đọc cũng thấy "đúng với mình".',
    advice: '🕵️ Lời khuyên: Thử đọc tử vi của cung khác, bạn sẽ thấy nó cũng... "đúng" luôn! 😂',
    category: 'cognitive',
  },
  {
    id: 'ar5',
    effectName: 'Hindsight Bias',
    effectEmoji: '🪞',
    keywords: ['biết trước rồi', 'nói mà không nghe', 'đã bảo mà', 'tôi nói rồi', 'thấy trước', 'lường trước', 'dự đoán được', 'đã biết sẽ thế', 'tiên đoán', 'đoán trúng'],
    explanation: 'Bạn đang bị Hindsight Bias: sau khi sự việc xảy ra, não bộ tự sửa lại ký ức để bạn cảm thấy "mình đã biết trước".',
    advice: '🕵️ Lời khuyên: Ghi nhật ký dự đoán TRƯỚC khi sự việc xảy ra. Bạn sẽ ngạc nhiên khi thấy mình sai nhiều hơn nghĩ.',
    category: 'cognitive',
  },

  // ── Cảm xúc (Emotion) ─────────────────────────────────────────────────
  {
    id: 'ar6',
    effectName: 'Halo Effect',
    effectEmoji: '😍',
    keywords: ['đẹp trai', 'xinh gái', 'đẹp nên', 'ngoại hình', 'crush', 'thần tượng', 'idol', 'fan', 'đẹp nên giỏi', 'nhìn mặt', 'ấn tượng đầu', 'first impression', 'dễ thương', 'hot boy', 'hot girl', 'lung linh', 'sáng sủa', 'nhan sắc'],
    explanation: 'Bạn đang bị Halo Effect: ấn tượng tốt ở một điểm (ngoại hình) khiến bạn tự động gán cho họ mọi phẩm chất tốt đẹp khác.',
    advice: '🕵️ Lời khuyên: Tách biệt ngoại hình và năng lực. Đánh giá người qua KẾT QUẢ công việc, không phải vẻ bề ngoài.',
    relatedEffectId: 'e2',
    category: 'emotion',
  },
  {
    id: 'ar7',
    effectName: 'IKEA Effect',
    effectEmoji: '🔨',
    keywords: ['tự làm', 'tự tay', 'handmade', 'diy', 'tự nấu', 'công sức', 'đổ mồ hôi', 'đứa con tinh thần', 'tác phẩm của tôi'],
    explanation: 'Bạn đang bị IKEA Effect: đánh giá cao bất thường những thứ mình tự tay làm ra, dù chất lượng có thể rất tệ.',
    advice: '🕵️ Lời khuyên: Nhờ người NGOÀI đánh giá sản phẩm. Bạn yêu nó vì bạn làm nó, chưa chắc vì nó tốt.',
    category: 'emotion',
  },
  {
    id: 'ar8',
    effectName: 'Endowment Effect',
    effectEmoji: '🏠',
    keywords: ['của tôi', 'đồ tôi', 'không bán', 'tiếc', 'bỏ không nỡ', 'giữ lại', 'sở hữu', 'đồ cũ', 'kỷ niệm', 'gắn bó'],
    explanation: 'Bạn rơi vào Endowment Effect: đánh giá đồ vật cao hơn chỉ vì bạn SỞ HỮU nó. Nếu không phải của bạn, bạn sẽ chẳng bao giờ mua nó.',
    advice: '🕵️ Lời khuyên: Hỏi "Nếu mình chưa có đồ này, mình có bỏ tiền mua không?" để đánh giá giá trị thực.',
    category: 'emotion',
  },
  {
    id: 'ar9',
    effectName: 'Spotlight Effect',
    effectEmoji: '💡',
    keywords: ['xấu hổ', 'ngại', 'mọi người nhìn', 'ai cũng thấy', 'mắc cỡ', 'quê', 'bẽ mặt', 'nhục', 'soi', 'chê cười', 'để ý', 'đánh giá', 'nhìn chằm chằm', 'ánh mắt', 'sợ sai', 'mọi người để ý'],
    explanation: 'Bạn đang bị Spotlight Effect: tưởng mọi người đang soi mói bạn, nhưng thực tế họ bận nghĩ về BẢN THÂN HỌ chứ chẳng ai care bạn đâu!',
    advice: '🕵️ Lời khuyên: Thử nhớ xem hôm qua đồng nghiệp mặc áo gì? Thấy chưa, bạn cũng chẳng nhớ ai mà!',
    category: 'emotion',
  },

  // ── Xã hội (Social) ───────────────────────────────────────────────────
  {
    id: 'ar10',
    effectName: 'Bandwagon Effect',
    effectEmoji: '🚃',
    keywords: ['ai cũng', 'mọi người đều', 'trend', 'viral', 'hot', 'đám đông', 'theo số đông', 'ai cũng mua', 'ai cũng làm', 'phong trào', 'xu hướng', 'bắt chước', 'theo kịp', 'fomo', 'bỏ lỡ'],
    explanation: 'Bạn bị cuốn vào Bandwagon Effect: làm theo đám đông không phải vì bạn muốn mà vì bạn SỢ bị lạc lõng.',
    advice: '🕵️ Lời khuyên: Hỏi "Nếu không ai làm điều này, mình có vẫn muốn làm không?" Câu trả lời sẽ cho bạn sự thật.',
    category: 'social',
  },
  {
    id: 'ar11',
    effectName: 'Bystander Effect',
    effectEmoji: '👥',
    keywords: ['không ai giúp', 'đứng nhìn', 'thờ ơ', 'vô cảm', 'kệ', 'ai cứu', 'tại sao không ai', 'lạnh lùng', 'bỏ mặc'],
    explanation: 'Đây là Bystander Effect: càng đông người chứng kiến, người ta càng ít có xu hướng giúp đỡ vì nghĩ "ai đó sẽ làm".',
    advice: '🕵️ Lời khuyên: Nếu cần giúp đỡ, CHỈ ĐÍCH DANH một người! "Anh áo xanh kia, gọi 115 giúp!" sẽ hiệu quả hơn "Ai giúp tôi với!"',
    category: 'social',
  },
  {
    id: 'ar12',
    effectName: 'Social Loafing',
    effectEmoji: '🦥',
    keywords: ['làm nhóm', 'teamwork', 'không ai làm', 'ỷ lại', 'free rider', 'ăn bám', 'gánh team', 'nhóm cùi', 'không công bằng'],
    explanation: 'Bạn đang chứng kiến Social Loafing: trong nhóm đông, mỗi cá nhân giảm nỗ lực vì nghĩ "người khác sẽ gánh".',
    advice: '🕵️ Lời khuyên: Chia nhỏ nhiệm vụ và GÁN TÊN cụ thể cho từng người. Minh bạch + trách nhiệm = không ai dám lười.',
    category: 'social',
  },
  {
    id: 'ar13',
    effectName: 'Authority Bias',
    effectEmoji: '👔',
    keywords: ['sếp nói', 'chuyên gia bảo', 'bác sĩ nói', 'giáo sư', 'cấp trên', 'người nổi tiếng', 'nghe theo', 'vâng lời', 'KOL', 'influencer', 'review'],
    explanation: 'Bạn đang bị Authority Bias: tin theo ai đó CHỈ VÌ họ có chức vụ/danh tiếng, chứ không kiểm chứng nội dung họ nói.',
    advice: '🕵️ Lời khuyên: Hỏi "Người này có thực sự là CHUYÊN GIA trong lĩnh vực ĐÓ không?" Bác sĩ giỏi chưa chắc biết về chứng khoán.',
    category: 'manipulation',
  },

  // ── Trí nhớ (Memory) ──────────────────────────────────────────────────
  {
    id: 'ar14',
    effectName: 'Zeigarnik Effect',
    effectEmoji: '⏳',
    keywords: ['dở dang', 'chưa xong', 'ám ảnh', 'nghĩ mãi', 'không quên được', 'bỏ dở', 'lãng quên', 'ex', 'người yêu cũ', 'chưa kết thúc', 'cliffhanger'],
    explanation: 'Bạn đang bị Zeigarnik Effect: não bộ bị ám ảnh bởi những thứ CHƯA HOÀN THÀNH hơn là những thứ đã xong.',
    advice: '🕵️ Lời khuyên: Viết ra giấy = "đóng gói" nỗi ám ảnh. Hoặc chủ động tìm cách kết thúc (closure) để giải phóng não.',
    category: 'memory',
  },
  {
    id: 'ar15',
    effectName: 'False Memory',
    effectEmoji: '🧩',
    keywords: ['nhớ nhầm', 'thề là', 'chắc chắn là', 'nhớ rõ', 'hồi đó', 'ký ức', 'mandela', 'lẫn lộn', 'nhớ sai'],
    explanation: 'Cẩn thận! Đây có thể là False Memory: não bộ tự "viết lại kịch bản" mỗi lần bạn nhớ lại, khiến ký ức ngày càng xa rời sự thật.',
    advice: '🕵️ Lời khuyên: Đừng bao giờ tin 100% vào trí nhớ. Kiểm chứng bằng bằng chứng vật lý (ảnh, video, nhật ký).',
    category: 'memory',
  },
  {
    id: 'ar16',
    effectName: 'Doorway Effect',
    effectEmoji: '🚪',
    keywords: ['quên', 'quên mất', 'định làm gì', 'đi qua cửa', 'vào phòng', 'quên tiệt', 'lú', 'đãng trí'],
    explanation: 'Bạn đang gặp Doorway Effect: bước qua một cánh cửa (vật lý hoặc tâm lý) làm não "reset" bộ nhớ ngắn hạn.',
    advice: '🕵️ Lời khuyên: Quay lại VỊ TRÍ CŨ trước khi bước qua cửa. Bối cảnh gốc sẽ giúp phục hồi ký ức.',
    category: 'memory',
  },
  {
    id: 'ar17',
    effectName: 'Deja Vu',
    effectEmoji: '🌀',
    keywords: ['deja vu', 'thấy quen', 'đã thấy rồi', 'cảnh này', 'quen thuộc', 'chỗ này quen', 'gặp rồi', 'tiền kiếp'],
    explanation: 'Đó là Deja Vu: não bộ xử lý nhầm thông tin hiện tại thành ký ức cũ, tạo ra ảo giác "đã từng trải qua".',
    advice: '🕵️ Lời khuyên: Bình tĩnh, đây chỉ là lỗi đồng bộ của hai bán cầu não, không phải tiền kiếp hay vũ trụ song song đâu!',
    category: 'memory',
  },

  // ── Quyết định (Decision) ─────────────────────────────────────────────
  {
    id: 'ar18',
    effectName: 'Sunk Cost Fallacy',
    effectEmoji: '💸',
    keywords: ['tiếc', 'đã bỏ tiền', 'đã đầu tư', 'bỏ không nỡ', 'tiếc công', 'đã lỡ', 'trót rồi', 'cố thêm', 'gỡ lại', 'đã vào sâu', 'thanh xuân', 'mấy năm rồi'],
    explanation: 'Bạn đang dính Sunk Cost Fallacy: tiếp tục đầu tư vào thứ thua lỗ chỉ vì tiếc công sức/tiền đã bỏ ra.',
    advice: '🕵️ Lời khuyên: Hỏi "Nếu BÂY GIỜ mới bắt đầu, mình có làm việc này không?" Quá khứ không nên cầm tù tương lai.',
    category: 'decision',
  },
  {
    id: 'ar19',
    effectName: 'Loss Aversion',
    effectEmoji: '😰',
    keywords: ['sợ mất', 'không dám', 'rủi ro', 'an toàn', 'chắc ăn', 'sợ lỗ', 'gồng lỗ', 'không dám bán', 'sợ thua', 'bảo thủ', 'mất cơ hội'],
    explanation: 'Bạn bị Loss Aversion: nỗi đau mất mát luôn MẠNH GẤP ĐÔI niềm vui nhận được tương đương. Điều này khiến bạn tê liệt.',
    advice: '🕵️ Lời khuyên: Tính toán RỦI RO vs LỢI ÍCH bằng số liệu cụ thể. Đừng để cảm xúc sợ hãi đè bẹp logic.',
    category: 'decision',
  },
  {
    id: 'ar20',
    effectName: 'Framing Effect',
    effectEmoji: '🖼️',
    keywords: ['cách nói', 'đóng khung', 'trình bày', 'marketing', 'quảng cáo', 'nghe hay', 'bọc đường', 'tô hồng', 'spin', 'góc nhìn', 'chiêu trò'],
    explanation: 'Cách trình bày (khung) đang chi phối phán đoán của bạn. Cùng một sự thật nhưng "đóng gói" khác nhau tạo ra phản ứng hoàn toàn khác.',
    advice: '🕵️ Lời khuyên: Tự "đảo ngược khung": Nếu ai nói "90% sống sót", hãy tự hỏi "10% TỬ VONG thì sao?"',
    category: 'decision',
  },
  {
    id: 'ar21',
    effectName: 'Hyperbolic Discounting',
    effectEmoji: '🍰',
    keywords: ['ngay bây giờ', 'muốn ngay', 'trì hoãn', 'lười', 'mai tính', 'thức khuya', 'ăn vặt', 'shopping', 'mua sắm', 'quẹt thẻ', 'nợ', 'tín dụng', 'sướng trước'],
    explanation: 'Bạn bị Hyperbolic Discounting: não ưu tiên phần thưởng TỨC THÌ dù nhỏ, bỏ qua phần thưởng LỚN HƠN trong tương lai.',
    advice: '🕵️ Lời khuyên: Chia nhỏ mục tiêu dài hạn thành phần thưởng ngắn hạn. "Tự thưởng 1 ly trà sữa mỗi khi tập gym xong" hiệu quả hơn "Tập 1 năm rồi khoe body".',
    category: 'decision',
  },
  {
    id: 'ar22',
    effectName: "Gambler's Fallacy",
    effectEmoji: '🎰',
    keywords: ['chắc chắn lần này', 'đến lượt rồi', 'sấp/ngửa', 'vận may', 'đen quá', 'xui', 'hên', 'số đỏ', 'gỡ', 'cá cược', 'đỏ đen'],
    explanation: "Bạn rơi vào Gambler's Fallacy: tin rằng kết quả ngẫu nhiên trong quá khứ sẽ ảnh hưởng đến tương lai. KHÔNG! Mỗi lần là độc lập.",
    advice: '🕵️ Lời khuyên: Mỗi sự kiện ngẫu nhiên là MỘT THẾ GIỚI RIÊNG. Tung đồng xu 100 lần sấp không có nghĩa lần 101 sẽ ngửa.',
    category: 'decision',
  },

  // ── Thao túng (Manipulation) ──────────────────────────────────────────
  {
    id: 'ar23',
    effectName: 'Scarcity Effect',
    effectEmoji: '⏰',
    keywords: ['sắp hết', 'còn ít', 'limited', 'cơ hội cuối', 'flash sale', 'FOMO', 'bỏ lỡ', 'sold out', 'hết hàng', 'số lượng có hạn', 'chỉ hôm nay', 'độc quyền', 'hiếm có', 'nhanh tay'],
    explanation: 'Bạn bị Scarcity Effect thao túng: thứ gì KHAN HIẾM (thật hoặc giả) đều tự động trở nên hấp dẫn hơn trong mắt bạn.',
    advice: '🕵️ Lời khuyên: Hỏi "Nếu món này đầy đường và không hết hạn, mình có mua không?" Khan hiếm giả tạo là vũ khí bán hàng #1.',
    category: 'manipulation',
  },
  {
    id: 'ar24',
    effectName: 'Reciprocity',
    effectEmoji: '🎁',
    keywords: ['tặng quà', 'mời ăn', 'miễn phí', 'cho không', 'áy náy', 'nể', 'ngại', 'đã nhận', 'phải trả', 'mang ơn', 'ân nghĩa'],
    explanation: 'Bạn đang bị Reciprocity thao túng: khi ai đó cho bạn thứ gì, bạn cảm thấy BẮT BUỘC phải đáp lại, dù không muốn.',
    advice: '🕵️ Lời khuyên: Quà miễn phí KHÔNG BAO GIỜ miễn phí. Phân biệt rõ: quà tặng chân thành vs chiến thuật bán hàng.',
    category: 'manipulation',
  },
  {
    id: 'ar25',
    effectName: 'Foot-in-the-door',
    effectEmoji: '👟',
    keywords: ['nhờ chút', 'việc nhỏ', 'giúp tí', 'help me', 'ban đầu', 'đầu tiên', 'dần dần', 'leo thang', 'từ từ', 'qua mặt'],
    explanation: 'Đây là chiến thuật Foot-in-the-door: bắt đầu bằng yêu cầu NHỎ, sau đó dần dần tăng lên yêu cầu LỚN khi bạn đã "dính nòng".',
    advice: '🕵️ Lời khuyên: Cảnh giác khi ai đó bắt đầu bằng yêu cầu quá nhỏ. Hỏi "Mục đích cuối cùng của họ là gì?"',
    category: 'manipulation',
  },
  {
    id: 'ar26',
    effectName: 'Gaslighting',
    effectEmoji: '🕯️',
    keywords: ['nói dối', 'bịa đặt', 'lật lọng', 'phủ nhận', 'điên à', 'bạn nhớ sai', 'không có chuyện đó', 'bạn tưởng tượng', 'toxic', 'độc hại', 'thao túng', 'manipulate', 'bị điên', 'nhớ nhầm', 'ảo à', 'ngáo à', 'xạo', 'điêu'],
    explanation: 'CỰC KỲ NGUY HIỂM! Bạn có thể đang bị Gaslighting: kẻ thao túng cố tình bóp méo sự thật để khiến bạn nghi ngờ CHÍNH MÌNH.',
    advice: '🕵️ Lời khuyên: GHI CHÉP mọi sự kiện. Nếu ai đó liên tục phủ nhận sự thật bạn biết rõ, HÃY TÌM KIẾM SỰ GIÚP ĐỠ. Bạn không điên.',
    category: 'manipulation',
  },
  {
    id: 'ar27',
    effectName: 'Contrast Principle',
    effectEmoji: '⚖️',
    keywords: ['so sánh', 'tệ hơn', 'tốt hơn', 'rẻ hơn so với', 'đắt hơn so với', 'nhìn ổn hơn', 'đỡ hơn', 'tương phản'],
    explanation: 'Cẩn thận! Bạn đang bị Contrast Principle: phán đoán bị bóp méo bởi thứ bạn vừa nhìn/nghe/trải qua trước đó.',
    advice: '🕵️ Lời khuyên: Đánh giá mỗi thứ ĐỘC LẬP, đừng so sánh. Một căn nhà ổn vẫn là ổn, đừng để 2 căn nát trước đó biến nó thành "thiên đường".',
    category: 'manipulation',
  },

  // ── Tầm quan trọng Xã hội / Mối quan hệ ──────────────────────────────
  {
    id: 'ar28',
    effectName: 'Pygmalion Effect',
    effectEmoji: '✨',
    keywords: ['kỳ vọng', 'tin tưởng', 'hy vọng', 'động viên', 'khích lệ', 'tin vào', 'bạn làm được', 'cố lên', 'giỏi lắm', 'support', 'ủng hộ', 'tin tưởng tuyệt đối'],
    explanation: 'Đây là Pygmalion Effect: khi bạn TIN ai đó giỏi, kỳ vọng đó vô thức khiến họ cố gắng hơn và THỰC SỰ giỏi hơn!',
    advice: '🕵️ Lời khuyên: Hãy tận dụng sức mạnh của kỳ vọng tích cực để nâng tầm cộng sự của bạn.',
    category: 'social',
  },
  {
    id: 'ar29',
    effectName: 'Liking Principle',
    effectEmoji: '💕',
    keywords: ['thích', 'yêu quý', 'dễ thương', 'duyên dáng', 'nịnh', 'khen', 'tâng bốc', 'thiện cảm', 'hảo cảm', 'ngọt ngào', 'mê trai', 'mê gái', 'crush nặng'],
    explanation: 'Bạn đang bị Liking Principle thao túng: ta có xu hướng nói "CÓ" với người ta yêu quý/thấy hấp dẫn, bất kể yêu cầu là gì.',
    advice: '🕵️ Lời khuyên: Hãy thử tưởng tượng người nói là một thám tử hôi hám, bạn có còn đồng ý không? Tách biệt người nói và nội dung.',
    category: 'manipulation',
  },
  {
    id: 'ar30',
    effectName: 'Paradox of Choice',
    effectEmoji: '😵',
    keywords: ['quá nhiều', 'không chọn được', 'phân vân', 'lúng túng', 'menu dài', 'lựa chọn', 'options', 'khó quyết', 'stress', 'loạn', 'không biết chọn cái nào'],
    explanation: 'Bạn gặp Paradox of Choice: quá nhiều lựa chọn khiến bạn TÊ LIỆT thay vì hạnh phúc. Ít hơn là nhiều hơn!',
    advice: '🕵️ Lời khuyên: Giới hạn xuống 3 lựa chọn tốt nhất. Quyết định "đủ tốt" là TUYỆT VỜI so với không quyết định gì.',
    category: 'decision',
  },
  {
    id: 'ar31',
    effectName: 'Spotlight Effect',
    effectEmoji: '🔦',
    keywords: ['ai cũng nhìn', 'xấu hổ', 'đánh giá mình', 'nhìn chằm chằm', 'để ý', 'soi mói', 'mắc cỡ', 'quê xém chết', 'nhục nhã', 'mọi người đều thấy'],
    explanation: 'Bạn đang bị Spotlight Effect: bạn tưởng mình là trung tâm vũ trụ, nhưng thực tế ai cũng bận soi... chính họ.',
    advice: '🕵️ Lời khuyên: Thư giãn đi thám tử, không ai nhớ nổi vết bẩn trên áo bạn sau 5 phút đâu.',
    category: 'emotion',
  },
  {
    id: 'ar32',
    effectName: 'Sycophancy (Nịnh hót)',
    effectEmoji: '🐝',
    keywords: ['nịnh', 'thảo mai', 'khen quá lời', 'tâng bốc', 'rót mật', 'ngọt sớt', 'dẻo mồm', 'chiều chuộng', 'lấy lòng', 'biết điều'],
    explanation: 'Cảnh giác với sự nịnh hót: kẻ nịnh hót thường muốn lấy lòng bạn để đạt được một lợi ích ẩn giấu phía sau.',
    advice: '🕵️ Lời khuyên: Hãy quan sát xem họ nói gì về người khác sau lưng. Kẻ khen bạn trước mặt thường chê bạn sau lưng.',
    category: 'manipulation',
  },

  // ── MỚI: Tình yêu / Mối quan hệ (Love & Dating) ───────────────────────
  {
    id: 'ar33',
    effectName: 'Love Bombing',
    effectEmoji: '💣',
    keywords: ['tặng quà nhiều', 'hứa hẹn', 'thề thốt', 'mật ngọt', 'dồn dập', 'quá nhanh', 'say đắm', 'anh yêu em ngay', 'cưới nhau đi', 'định mệnh', 'suốt ngày nhắn tin', 'kiểm soát bằng tình yêu', 'chiều chuộng quá'],
    explanation: 'Đó là Love Bombing: một chiến thuật thao túng bằng sự ngọt ngào dồn dập lúc đầu để sau này dễ dàng cô lập và kiểm soát bạn.',
    advice: '🕵️ Lời khuyên: Cẩn thận với những gì "quá nhanh, quá nguy hiểm". Tình yêu lành mạnh cần thời gian để lớn lên.',
    category: 'manipulation',
  },
  {
    id: 'ar34',
    effectName: 'Silent Treatment',
    effectEmoji: '🔇',
    keywords: ['im lặng', 'bơ', 'không thèm nói', 'block', 'không trả lời', 'lạnh lùng', 'chiến tranh lạnh', 'không thèm nhìn', 'ngó lơ', 'cắt đứt liên lạc', 'mất tích', 'tra tấn tinh thần'],
    explanation: 'Tình trạng Chiến tranh lạnh (Silent Treatment) là một dạng bạo hành tinh thần, dùng sự im lặng để ép đối phương phải phục tùng.',
    advice: '🕵️ Lời khuyên: Đừng cố nài nỉ. Hãy nêu rõ: "Khi nào bạn sẵn sàng nói chuyện một cách tôn trọng, tôi sẽ nghe." Đừng để sự im lặng bóp nghẹt lòng tự trọng của bạn.',
    category: 'manipulation',
  },
  {
    id: 'ar35',
    effectName: 'Triangulation',
    effectEmoji: '📐',
    keywords: ['người thứ 3', 'so sánh', 'bạn thân khác giới', 'anh trai mưa', 'em gái nuôi', 'so sánh với bồ cũ', 'người yêu cũ', 'người kia tốt hơn', 'làm ngơ vì người khác', 'khen người khác trước mặt mình'],
    explanation: 'Triangulation (Tam giác hóa): kẻ thao túng lôi kéo một người thứ 3 vào để tạo sự ghen tuông, khiến bạn phải nỗ lực "tranh giành" sự chú ý của họ.',
    advice: '🕵️ Lời khuyên: Đừng nhảy vào cuộc đua. Nếu họ yêu bạn, họ không cần so sánh bạn với bất kỳ ai.',
    category: 'manipulation',
  },
  {
    id: 'ar36',
    effectName: 'Breadcrumbing',
    effectEmoji: '🍞',
    keywords: ['thả thính', 'lúc ẩn lúc hiện', 'cho hy vọng', 'không cam kết', 'mập mờ', 'thỉnh thoảng nhắn', 'like dạo', 'không rõ ràng', 'waitlist', 'hẹn rồi thôi', 'không tới đâu'],
    explanation: 'Breadcrumbing (Thả vụn bánh mì): họ chỉ cho bạn đủ "vụn bánh" tình cảm để bạn không rời đi, nhưng họ không bao giờ muốn một mối quan hệ thực sự.',
    advice: '🕵️ Lời khuyên: Đừng ăn vụn bánh mì. Bạn xứng đáng với cả một ổ bánh! Hãy đặt ra giới hạn thời gian cho sự mập mờ này.',
    category: 'manipulation',
  },
  {
    id: 'ar37',
    effectName: 'Ghosting',
    effectEmoji: '👻',
    keywords: ['biến mất', 'im hơi lặng tiếng', 'không hồi âm', 'không lý do', 'hụt hẫng', 'biến mất đột ngột', 'unfriend', 'không vết tích', 'tắt máy', 'mất liên lạc'],
    explanation: 'Ghosting: hành vi biến mất đột ngột không lời giải thích. Đây là cách trốn tránh trách nhiệm thay vì đối diện với việc kết thúc.',
    advice: '🕵️ Lời khuyên: Đừng tự trách mình. Ghosting nói lên sự thiếu trưởng thành của họ, không phải giá trị của bạn.',
    category: 'social',
  },
  {
    id: 'ar38',
    effectName: 'Red Flag',
    effectEmoji: '🚩',
    keywords: ['dấu hiệu xấu', 'báo động', 'chạy ngay đi', 'cảm giác không ổn', 'độc hại', 'toxic', 'bất ổn', 'thô lỗ', 'kiểm soát điện thoại', 'say xỉn', 'gia trưởng', 'nóng tính quá mức'],
    explanation: 'Bạn đã nhận ra các Red Flag (Cờ đỏ): những dấu hiệu cảnh báo một mối quan hệ không lành mạnh hoặc nguy hiểm trong tương lai.',
    advice: '🕵️ Lời khuyên: Đừng cố "sửa" họ. Cờ đỏ là để sếp chạy, không phải để làm rèm cửa đâu nhé!',
    category: 'manipulation',
  },

  // ── MỚI: Công việc / Xã hội (Work & Social) ──────────────────────────
  {
    id: 'ar39',
    effectName: 'Narcissism (Ái kỷ)',
    effectEmoji: '🪞',
    keywords: ['trung tâm vũ trụ', 'kể về mình', 'không quan tâm người khác', 'khoe khoang', 'xem thường', 'chà đạp', 'không biết lỗi', 'tôi là nhất', 'vô ơn', 'thiếu đồng cảm', 'làm quá'],
    explanation: 'Hành vi này có dấu hiệu Ái kỷ: coi mình là trung tâm, thiếu sự đồng cảm và luôn cần sự ngưỡng mộ từ người khác.',
    advice: '🕵️ Lời khuyên: Giữ khoảng cách cảm xúc. Đừng mong đợi sự thấu hiểu từ người ái kỷ, hãy học cách bảo vệ bản thân.',
    category: 'social',
  },
  {
    id: 'ar40',
    effectName: 'Burnout (Kiệt sức)',
    effectEmoji: '😫',
    keywords: ['mệt mỏi', 'không muốn làm gì', 'chán nản', 'kiệt quệ', 'áp lực', 'quá tải', 'không thở nổi', 'muốn nghỉ việc', 'mất ngủ', 'stress', 'vắt kiệt sức lao động'],
    explanation: 'Bạn đang rơi vào trạng thái Burnout: cạn kiệt năng lượng cả về thể chất lẫn tinh thần do áp lực kéo dài.',
    advice: '🕵️ Lời khuyên: Nghỉ ngơi KHÔNG phải là lười biếng. Đó là bảo trì hệ thống. Hãy nghỉ phép ngay nếu có thể.',
    category: 'emotion',
  },
  {
    id: 'ar41',
    effectName: 'Imposter Syndrome',
    effectEmoji: '🎭',
    keywords: ['may mắn thôi', 'chưa đủ giỏi', 'sợ bị lộ', 'không xứng đáng', 'giả mạo', 'ăn may', 'kém cỏi', 'ai cũng giỏi hơn mình', 'tôi không giỏi thế đâu'],
    explanation: 'Hội chứng Kẻ giả mạo: bạn luôn lo sợ mình không tài năng như mọi người nghĩ và thành quả chỉ là do may mắn.',
    advice: '🕵️ Lời khuyên: Liệt kê các KẾT QUẢ cụ thể bạn đã đạt được. Số liệu không biết nói dối, và nó chứng minh năng lực của bạn.',
    category: 'cognitive',
  },
  {
    id: 'ar42',
    effectName: 'Micromanagement',
    effectEmoji: '🔍',
    keywords: ['kiểm soát', 'soi mói', 'từng chút một', 'báo cáo liên tục', 'mất tự do', 'sếp soi', 'check từng dòng', 'không tin tưởng', 'giám sát chặt chẽ'],
    explanation: 'Micromanagement (Quản lý vi mô): sự kiểm soát quá mức khiến nhân viên mất tính chủ động và cảm thấy bị bóp nghẹt.',
    advice: '🕵️ Lời khuyên: Hãy chủ động báo cáo TIẾN ĐỘ trước khi bị hỏi. Khi sếp thấy sếp nắm rõ thông tin, họ sẽ bớt soi mói hơn.',
    category: 'manipulation',
  },
  {
    id: 'ar43',
    effectName: 'Victim Mentality',
    effectEmoji: '😭',
    keywords: ['đóng vai nạn nhân', 'tội nghiệp', 'tại sao tôi', 'khổ quá', 'bất công', 'cả thế giới quay lưng', 'không ai hiểu tôi', 'tại họ nên tôi', 'tôi luôn là người chịu thiệt'],
    explanation: 'Tâm lý Nạn nhân: xu hướng đổ lỗi cho ngoại cảnh và người khác để tránh phải chịu trách nhiệm về cuộc đời mình.',
    advice: '🕵️ Lời khuyên: Chuyển từ "Tại sao việc này xảy ra với tôi?" sang "Tôi có thể làm gì để thay đổi tình hình?" Quyền lực nằm ở hành động.',
    category: 'social',
  },
  {
    id: 'ar44',
    effectName: 'Gaslighting công sở',
    effectEmoji: '🏢',
    keywords: ['việc nhẹ mà', 'làm quá lên', 'không ai thấy mệt', 'sếp bảo làm được', 'có gì đâu mà áp lực', 'lương thế là cao rồi', 'cống hiến đi', 'đừng đòi hỏi'],
    explanation: 'Gaslighting công sở: dùng văn hóa công ty hoặc áp lực đồng lứa để khiến bạn nghi ngờ về quyền lợi và cảm xúc chính đáng của mình.',
    advice: '🕵️ Lời khuyên: Tìm hiểu luật lao động và mặt bằng lương thị trường. Đừng để lòng trung thành bị lợi dụng.',
    category: 'manipulation',
  },
  {
    id: 'ar45',
    effectName: 'Projection (Phóng chiếu)',
    effectEmoji: '📽️',
    keywords: ['đổ lỗi', 'vừa ăn cướp vừa la làng', 'chối bay', 'tại bạn nên tôi mới', 'do người khác', 'gắp lửa bỏ tay người', 'đẩy trách nhiệm', 'tự nhìn lại mình đi'],
    explanation: 'Cơ chế Phóng chiếu: một người gán những suy nghĩ hoặc hành động xấu của chính họ cho người khác để bản thân cảm thấy tốt hơn.',
    advice: '🕵️ Lời khuyên: Đừng nhận lấy những lời buộc tội vô căn cứ. Giữ vững sự thật của bạn.',
    category: 'cognitive',
  },
  {
    id: 'ar46',
    effectName: 'Anxious Attachment (Gắn bó âu lo)',
    effectEmoji: '❤️‍🔥',
    keywords: ['sợ bị bỏ rơi', 'cần quan tâm', 'nhắn tin liên tục', 'lo sợ người yêu bỏ', 'ghen tuông vô cớ', 'check điện thoại', 'muốn ở bên cạnh suốt', 'không an tâm', 'sợ mất người yêu', 'lụy tình', 'kiểm soát'],
    explanation: 'Kiểu Gắn bó Âu lo: bạn luôn cảm thấy bất an và khao khát sự khẳng định tình cảm liên tục từ đối phương.',
    advice: '🕵️ Lời khuyên: Học cách xây dựng sự tự tin nội tại. Giá trị của bạn không phụ thuộc vào việc người khác có nhắn tin cho bạn ngay lập tức hay không.',
    category: 'emotion',
  },
  {
    id: 'ar47',
    effectName: 'Avoidant Attachment (Gắn bó né tránh)',
    effectEmoji: '🧊',
    keywords: ['cần không gian', 'ngột ngạt', 'né tránh xung đột', 'không muốn cam kết', 'độc lập quá mức', 'lạnh lùng đột ngột', 'đẩy ra xa', 'không chia sẻ cảm xúc', 'sợ ràng buộc', 'bí mật'],
    explanation: 'Kiểu Gắn bó Né tránh: đối phương (hoặc bạn) có xu hướng đẩy người khác ra xa khi mối quan hệ trở nên quá thân mật để bảo vệ sự độc lập bản thân.',
    advice: '🕵️ Lời khuyên: Đừng cố rượt đuổi người né tránh. Hãy cho họ không gian và tập trung vào cuộc sống của chính mình.',
    category: 'emotion',
  },
  {
    id: 'ar48',
    effectName: 'Cognitive Dissonance (Bất hòa nhận thức)',
    effectEmoji: '🎭',
    keywords: ['biết là sai nhưng vẫn làm', 'tự bào chữa', 'mâu thuẫn nội tâm', 'hợp lý hóa', 'ngụy biện cho bản thân', 'khó chấp nhận sự thật', 'thế mới đúng', 'tự lừa dối', 'cố đấm ăn xôi'],
    explanation: 'Bất hòa nhận thức: khi hành động mâu thuẫn với niềm tin, não bộ sẽ tự tạo ra các lý lẽ ngụy biện để giảm bớt sự khó chịu tâm lý.',
    advice: '🕵️ Lời khuyên: Hãy dũng cảm nhìn thẳng vào sự thật. Ngừng bào chữa cho những thói quen xấu nếu bạn thực sự muốn thay đổi.',
    category: 'cognitive',
  },
  {
    id: 'ar49',
    effectName: 'Survivorship Bias (Thiên kiến kẻ sống sót)',
    effectEmoji: '💰',
    keywords: ['nhìn gương người giàu', 'bỏ học vẫn thành công', 'chỉ nhìn vào người thắng', 'không thấy người thất bại', 'ảo tưởng thành công', 'người ta làm được mình cũng làm được', 'bí quyết thành công'],
    explanation: 'Thiên kiến kẻ sống sót: bạn chỉ tập trung vào những người/vật đã "vượt qua" và lờ đi hàng nghìn kẻ thất bại khác, dẫn đến những kết luận sai lầm.',
    advice: '🕵️ Lời khuyên: Khi học hỏi một mô hình thành công, hãy nghiên cứu cả những người đã THẤT BẠI ở mô hình đó để có cái nhìn toàn diện.',
    category: 'decision',
  },
  {
    id: 'ar50',
    effectName: 'Negativity Bias (Thiên kiến tiêu cực)',
    effectEmoji: '🌑',
    keywords: ['chỉ nhớ chuyện buồn', 'lo lắng thái quá', 'nhìn đâu cũng thấy rủi ro', 'bi quan', 'quên hết niềm vui', 'tập trung vào lỗi sai', 'chỉ trích', 'ám ảnh chuyện xấu'],
    explanation: 'Thiên kiến tiêu cực: não bộ có xu hướng ghi nhớ và phản ứng mạnh mẽ hơn với các thông tin tiêu cực so với thông tin tích cực.',
    advice: '🕵️ Lời khuyên: Thực hành lòng biết ơn hàng ngày. Chủ động liệt kê 3 điều tốt lành để "tái cấu trúc" lại sự tập trung của não bộ.',
    category: 'emotion',
  },
  {
    id: 'ar51',
    effectName: 'Self-Serving Bias (Thiên kiến tự đề cao)',
    effectEmoji: '📈',
    keywords: ['thành công là do mình', 'thất bại là do xui', 'tại hoàn cảnh', 'tại người khác', 'mình giỏi nên mới thế', 'không phải lỗi của tôi', 'đổ lỗi cho khách quan', 'giỏi hơn người khác'],
    explanation: 'Thiên kiến tự đề cao: xu hướng nhận vơ thành quả về mình nhưng lại đổ lỗi cho hoàn cảnh hoặc người khác khi gặp thất bại.',
    advice: '🕵️ Lời khuyên: Hãy can đảm nhận trách nhiệm về những thất bại của mình. Đó là cách duy nhất để bạn thực sự trưởng thành.',
    category: 'cognitive',
  },
];

// ─── Analyzer Engine ─────────────────────────────────────────────────────────

export interface AnalysisResult {
  matchedRules: AnalyzerRule[];
  awarenessScore: number; // 0-100
  drPsyVerdict: string;   // Phản ứng của Persona
  deepAnalysis: string;   // Phân tích chi tiết kiểu AI
  tacticalAdvice: string[]; // Lời khuyên chiến thuật bóc tách thành các bước
}

// Hàm sinh lời chào theo nhân cách
const getPersonaGreeting = (personaId: string): string => {
  switch (personaId) {
    case 'sherlock': return 'Thật sơ đẳng! Ta đã thấy rõ bản chất của sự việc này. ';
    case 'killer': return 'Con mồi này đang để lộ những kẽ hở chí mạng. Hãy nhìn xem... ';
    case 'mystic': return 'Vũ trụ đang thì thầm về những rung động bất thường này. ';
    case 'philosopher': return 'Sự thật thường ẩn mình dưới những lớp vỏ bọc tinh vi. Hãy cùng chiêm nghiệm. ';
    case 'mastermind': return 'Mọi quân cờ đều đang di chuyển theo đúng quỹ đạo mà ta đã định. ';
    case 'manipulator': return 'Sợi dây điều khiển đã nằm trong tay chúng ta. Chỉ cần một cú giật nhẹ... ';
    default: return 'Tôi đã hoàn tất việc quét dữ liệu hành vi. Đây là báo cáo của sếp: ';
  }
};

// Hàm sinh phân tích chiều sâu (Core AI Narrative)
const generateDeepAnalysis = (inputText: string, matchedRules: AnalyzerRule[], personaId: string): string => {
  if (matchedRules.length === 0) {
    return `Mặc dù chưa khớp với các quy luật tâm lý kinh điển trong kho dữ liệu, nhưng dựa trên phân tích ngôn ngữ học, hành vi này cho thấy một sự bất ổn ngầm trong giao tiếp xã hội. 
    Có thể đối phương đang sử dụng một cơ chế phòng vệ tự thân (Defense Mechanism) để che đậy một nỗi sợ hãi hoặc sự thiếu tự tin. 
    Để bóc tách kỹ hơn, sếp cần cung cấp thêm các chi tiết về phản ứng cơ thể hoặc tông giọng của họ khi nói ra những lời này. 
    Trong thám tử học, sự im lặng hoặc những câu nói vô định đôi khi lại là bằng chứng rõ nhất cho một kế hoạch đang được che giấu.`;
  }

  const mainRule = matchedRules[0];
  let narrative = `Dựa trên dữ liệu hành vi sếp cung cấp, tôi nhận thấy sự hiện diện cực kỳ rõ rệt của **${mainRule.effectName}**. ${mainRule.explanation}\n\n`;

  if (matchedRules.length > 1) {
    narrative += `Tình huống này không hề đơn giản. Nó là một sự "cộng hưởng" nguy hiểm giữa **${mainRule.effectName}** và các hiệu ứng khác như **${matchedRules.slice(1, 3).map(r => r.effectName).join(', ')}**. `;
    narrative += `Sự đan xen này tạo nên một cái bẫy tâm lý hoàn hảo, nơi đối phương không chỉ đánh lừa sếp mà còn đang tự đánh lừa chính bản thân họ. `;
  }

  narrative += `Phân tích sâu hơn về động cơ: Hành vi này thường xuất phát từ nhu cầu được khẳng định quyền lực hoặc để giảm bớt sự lo âu trong một mối quan hệ không cân bằng. `;
  
  switch (personaId) {
    case 'sherlock':
      narrative += `Nếu ta là kẻ đối diện, ta sẽ nhìn thẳng vào mắt chúng khi chúng nói ra điều đó. Sự thật luôn nằm ở những chi tiết mà kẻ nghiệp dư thường bỏ qua. `;
      break;
    case 'killer':
      narrative += `Điểm yếu của chúng là sự sợ hãi bị lãng quên. Hãy tấn công trực diện vào đó, sếp sẽ thấy chúng sụp đổ nhanh chóng. `;
      break;
    case 'manipulator':
      narrative += `Sếp hãy tạm thời chiều theo ý chúng, tạo cho chúng ảo giác rằng chúng đang làm chủ. Sau đó, hãy giật dây một cách đột ngột. `;
      break;
  }

  return narrative;
};

export const analyzeScenario = (inputText: string, personaId: string = 'default'): AnalysisResult => {
  const normalizedInput = inputText.toLowerCase().trim();

  if (normalizedInput.length < 5) {
    return {
      matchedRules: [],
      awarenessScore: 0,
      drPsyVerdict: 'Hãy mô tả tình huống chi tiết hơn để thám tử phân tích nhé! 🔍',
      deepAnalysis: 'Dữ liệu đầu vào quá nghèo nàn để có thể thực hiện một cuộc quét tâm lý chuyên sâu. Hãy cho tôi thêm manh mối thám tử ơi!',
      tacticalAdvice: ['Cung cấp thêm ít nhất 10-15 từ mô tả.', 'Nêu rõ bối cảnh diễn ra sự việc.'],
    };
  }

  // Matching logic
  const matchedRules = ANALYZER_RULES.filter(rule =>
    rule.keywords.some(keyword => {
      const regex = new RegExp(`(^|[^a-záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ])(${keyword})([^a-záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]|$)`, 'i');
      return regex.test(normalizedInput);
    })
  );

  const detailBonus = Math.min(normalizedInput.length / 5, 20); // Tăng tốc độ cộng điểm theo độ dài
  const matchBonus = matchedRules.length * 25;
  const awarenessScore = Math.min(Math.max(Math.round(detailBonus + matchBonus), 15), 100); // Floor tối thiểu 15%

  // 1. Phản ứng Persona (Verdict)
  const greeting = getPersonaGreeting(personaId);
  const verdictCore = matchedRules.length === 0 
    ? 'Dữ liệu có chút mờ ám, nhưng ta vẫn ngửi thấy mùi của một âm mưu."' 
    : `Ta đã tìm thấy ${matchedRules.length} điểm mù tâm lý trong câu chuyện này."`;

  // 2. Phân tích chuyên sâu (Deep Analysis Generator)
  const deepAnalysis = generateDeepAnalysis(inputText, matchedRules, personaId);

  // 3. Lời khuyên chiến thuật
  const tacticalAdvice = matchedRules.length > 0 
    ? matchedRules.flatMap(r => r.advice.split('.').filter(s => s.length > 10).map(s => s.trim()))
    : ['Giữ khoảng cách an toàn để quan sát đối phương.', 'Đừng để cảm xúc cá nhân chi phối phán đoán lúc này.', 'Ghi chép lại thời điểm họ bắt đầu lảng tránh ánh mắt.'];

  return { 
    matchedRules, 
    awarenessScore, 
    drPsyVerdict: greeting + verdictCore,
    deepAnalysis,
    tacticalAdvice: tacticalAdvice.slice(0, 5) 
  };
};
