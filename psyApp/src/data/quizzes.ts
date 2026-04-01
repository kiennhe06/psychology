// ─── Types ───────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'scenario';
  question?: string;
  scenario?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  timeLimit?: number;
}

export interface Quiz {
  id: string;
  title: string;
  regionId: string;
  requiredLevel: number;
  xpReward: number;
  gemReward: number;
  questions: QuizQuestion[];
}

export interface QuestRegion {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  quizIds: string[];
}

// ─── Regions ─────────────────────────────────────────────────────────────────

export const QUEST_REGIONS: QuestRegion[] = [
  {
    id: 'r1',
    name: 'Lãnh Địa “Tưởng Bở”',
    emoji: '🏰',
    color: '#6C63FF',
    description: 'Nơi những “cao thủ ảo tưởng” tự xưng vô địch chỉ sau một ngày học. Đối thủ của bạn… chính là cái tôi quá lớn của chính mình!',
    quizIds: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'],
  },
  {
    id: 'r2',
    name: 'Lãnh Địa “Mờ Mắt”',
    emoji: '🌲',
    color: '#4CAF50',
    description: 'Bạn sẽ bị lóa mắt bởi hào quang, cảm xúc và những chiếc kệ IKEA tự lắp. Liệu bạn có nhìn thấu sự thật?',
    quizIds: ['q9', 'q10', 'q11', 'q12', 'q13', 'q14', 'q15', 'q16'],
  },
  {
    id: 'r3',
    name: 'Phố Thị “Dắt Mũi”',
    emoji: '🏙️',
    color: '#FF6B6B',
    description: 'Đám đông, áp lực xã hội và những lời mời chào “không thể chối từ”. Giữa phố thị náo nhiệt, liệu bạn có còn là chính mình?',
    quizIds: ['q17', 'q18', 'q19', 'q20', 'q21', 'q22', 'q23', 'q24'],
  },
  {
    id: 'r4',
    name: 'Mê Cung “Lú Lẫn”',
    emoji: '🌀',
    color: '#FF9800',
    description: 'Ký ức của bạn… có thật? Những gì bạn nhớ đã bị “xào nấu” như thế nào? Hãy tìm lối thoát khỏi mê cung của chính bộ não.',
    quizIds: ['q25', 'q26', 'q27', 'q28', 'q29', 'q30', 'q31', 'q32'],
  },
  {
    id: 'r5',
    name: 'Sàn Đấu “Ngáo Quyết Định”',
    emoji: '⚔️',
    color: '#00BCD4',
    description: 'Hàng ngày bạn đưa ra vô số quyết định, nhưng có bao nhiêu phần trăm là lý trí? Đây là nơi bạn học cách không “ngáo” nữa.',
    quizIds: ['q33', 'q34', 'q35', 'q36', 'q37', 'q38', 'q39', 'q40'],
  },
  {
    id: 'r6',
    name: 'Tháp “Thao Túng”',
    emoji: '🗼',
    color: '#E91E63',
    description: 'Đỉnh cao của nghệ thuật ảnh hưởng – từ khan hiếm giả tạo đến sức mạnh của uy quyền. Thoát khỏi đây, bạn sẽ là bậc thầy chống thao túng.',
    quizIds: ['q41', 'q42', 'q43', 'q44', 'q45', 'q46', 'q47', 'q48'],
  },
];

export const QUIZZES: Quiz[] = [
  // ===================== VÙNG 1: TƯỞNG BỞ =====================
  {
    id: 'q1',
    title: 'Cao thủ 24h',
    regionId: 'r1',
    requiredLevel: 1,
    xpReward: 60,
    gemReward: 4,
    questions: [
      { id: 'q1_1', type: 'scenario', scenario: 'Học guitar được 2 ngày, bạn lên kế hoạch mở lớp dạy nhạc trên TikTok.', options: ['Tự tin vì có khiếu bẩm sinh chưa ai phát hiện.', 'Thấy mấy video dạy nhạc dễ quá, mình làm cũng được.', 'Cần kiếm tiền để mua cây đàn mới.', 'Muốn nổi tiếng nhanh, không cần chờ đợi.'], correctIndex: 1, explanation: 'Khi mới bắt đầu, chúng ta thường đánh giá quá cao khả năng thực sự của mình.' },
      { id: 'q1_2', type: 'scenario', scenario: 'Ngày đầu đi thực tập, bạn đề xuất thay đổi cả quy trình làm việc của công ty.', options: ['Công ty cũ quá lỗi thời, mình giúp hiện đại hóa.', 'Muốn gây ấn tượng với sếp bằng ý tưởng mới.', 'Chưa hiểu rõ độ phức tạp, nhưng nghĩ đơn giản là nên làm.', 'Đã học ở trường những mô hình tiên tiến hơn.'], correctIndex: 2, explanation: 'Người chưa có kinh nghiệm thực tế thường không thấy được những rào cản ẩn.' },
      { id: 'q1_3', type: 'scenario', scenario: 'Một chuyên gia 20 năm kinh nghiệm vẫn nói: “Mình còn nhiều thứ phải học”.', options: ['Ông ấy khiêm tốn quá mức.', 'Ngành nào cũng vậy, không ai giỏi hết.', 'Càng hiểu sâu càng thấy mình chưa biết nhiều.', 'Chuyên gia giỏi thì phải tự tin, không cần nói vậy.'], correctIndex: 2, explanation: 'Càng hiểu sâu về một lĩnh vực, chúng ta càng thấy được những giới hạn của trí tuệ.' },
      { id: 'q1_4', type: 'scenario', scenario: 'Tập gym được 3 buổi, bạn tự tin thách đấu anh PT đã tập 5 năm.', options: ['Muốn kiểm tra xem mình có tiến bộ nhanh không.', 'Hưng phấn vì cơ bắp hơi căng, nghĩ mình mạnh rồi.', 'Thử thách bản thân là cách tốt nhất để tiến bộ.', 'Anh PT chỉ hơn tuổi chứ không hơn sức.'], correctIndex: 1, explanation: 'Sự tự tin thường tăng vọt trong giai đoạn đầu, khi chưa đủ trải nghiệm.' },
      { id: 'q1_5', type: 'scenario', scenario: 'Một bạn thường xuyên bình luận chắc nịch về mọi lĩnh vực dù không học chuyên sâu.', options: ['Bạn ấy đọc nhiều, biết rộng, nên tự tin.', 'Người thiếu kiến thức thường không nhận ra mình thiếu.', 'Bạn ấy chỉ muốn thể hiện để được chú ý.', 'Thời đại nào cũng cần những người dám nói.'], correctIndex: 1, explanation: 'Người thiếu năng lực thường thiếu luôn khả năng nhận ra sự thiếu hụt của chính họ.' },
      { id: 'q1_6', type: 'scenario', scenario: 'Sửa được một lỗi code nhỏ, bạn nghĩ mình có thể làm bảo mật cho ngân hàng.', options: ['Công nghệ bây giờ dễ học, chỉ cần chăm chỉ.', 'Thành công nhỏ dễ khiến ta ảo tưởng về trình độ.', 'Đam mê là tất cả, bằng cấp không quan trọng.', 'Ai cũng phải bắt đầu từ những thứ nhỏ.'], correctIndex: 1, explanation: 'Một kết quả thuận lợi ngẫu nhiên dễ khiến chúng ta đánh giá sai về độ khó thực tế.' },
      { id: 'q1_7', type: 'scenario', scenario: 'Xem xong một video nhảy khó, bạn bảo “cái này dễ ợt, tui nhảy cũng được”.', options: ['Bạn có năng khiếu nhảy từ nhỏ.', 'Chưa thử nên không biết mức độ khó thực sự.', 'Chê để tỏ ra mình ngầu hơn người khác.', 'Xem nhiều nên nghĩ mình cũng làm được.'], correctIndex: 3, explanation: 'Khoảng cách giữa việc quan sát và thực hiện thực tế thường bị chúng ta phớt lờ.' },
      { id: 'q1_8', type: 'scenario', scenario: 'Dấu hiệu cho thấy một người bắt đầu thoát khỏi ảo tưởng và trở nên khôn ngoan hơn?', options: ['Được nhiều người khen là giỏi.', 'Nhận ra mình từng sai và còn nhiều điều chưa biết.', 'Có thành tích nổi bật trong lĩnh vực của mình.', 'Kết bạn với toàn người nổi tiếng.'], correctIndex: 1, explanation: 'Sự tỉnh ngộ bắt đầu khi chúng ta chấp nhận rằng bản thân còn nhiều điều phải học.' }
    ]
  },
  {
    id: 'q2',
    title: 'Mỏ neo',
    regionId: 'r1',
    requiredLevel: 2,
    xpReward: 80,
    gemReward: 6,
    questions: [
      { id: 'q2_1', type: 'scenario', scenario: 'Thấy áo khoác ghi giá 2 triệu, giảm còn 1 triệu, bạn mua ngay vì nghĩ “hời quá”.', options: ['Chất lượng chắc chắn tốt vì giá gốc cao.', 'So với 2 triệu thì 1 triệu là rẻ, dù thực tế có thể chỉ đáng 500k.', 'Shop uy tín, giảm giá thật nên không lo.', 'Bạn đang cần một chiếc áo khoác mới.'], correctIndex: 1, explanation: 'Con số 2 triệu đã trở thành điểm tham chiếu khiến mức giá 1 triệu trở nên hấp dẫn.' },
      { id: 'q2_2', type: 'scenario', scenario: 'Siêu thị treo bảng “Tiết kiệm 500k” thay vì ghi giá 1,5 triệu cho món hàng 2 triệu.', options: ['Họ muốn khách dễ tính tiền.', 'Tập trung vào lợi ích được hưởng thay vì số tiền phải trả.', 'Để so sánh với các chương trình khuyến mãi khác.', 'Họ sợ khách thấy giá 1,5 triệu là đắt.'], correctIndex: 1, explanation: 'Con số giảm giá lớn tạo ấn tượng mạnh mẽ về giá trị mà khách hàng nhận được.' },
      { id: 'q2_3', type: 'scenario', scenario: 'Sếp đặt mục tiêu doanh thu tăng 500% trong năm, ai cũng thấy áp lực.', options: ['Mục tiêu cao giúp nhân viên nỗ lực hơn.', 'Con số đó trở thành mốc để đánh giá mọi kết quả sau này.', 'Sếp muốn tạo động lực đột phá.', 'Công ty đang cần tăng trưởng nhanh.'], correctIndex: 3, explanation: 'Một mục tiêu cực đoan sẽ định hình lại toàn bộ kỳ vọng và nỗ lực của nhân viên.' },
      { id: 'q2_4', type: 'scenario', scenario: 'Người bán hỏi: “Anh muốn gói 6 tháng hay 12 tháng?” thay vì “Anh có muốn mua không?”.', options: ['Giúp khách hàng dễ lựa chọn hơn.', 'Định hướng khách vào các phương án có lợi cho người bán.', 'Tạo cảm giác khách có quyền quyết định.', 'Rút ngắn thời gian tư vấn.'], correctIndex: 1, explanation: 'Việc giới hạn sự lựa chọn trong một khung có sẵn làm giảm khả năng từ chối.' },
      { id: 'q2_5', type: 'scenario', scenario: 'Một cuộc đấu giá bắt đầu với mức giá rất cao cho món đồ bình thường.', options: ['Chủ nhân muốn tạo vẻ sang trọng.', 'Mức giá đầu tiên sẽ kéo theo các mức giá tiếp theo cao hơn.', 'Để lọc những người không đủ tiền.', 'Đảm bảo không bị lỗ.'], correctIndex: 1, explanation: 'Mức giá đầu tiên thường chi phối mạnh mẽ các nhận định về giá trị sau đó.' },
      { id: 'q2_6', type: 'scenario', scenario: 'Biển quảng cáo: “Mỗi khách chỉ mua tối đa 3 món” dù hàng còn nhiều.', options: ['Để tránh tình trạng đầu cơ.', 'Con số giới hạn kích thích nhu cầu mua sắm.', 'Hướng khách tập trung vào hàng thiết yếu.', 'Kiểm soát lượng hàng tồn kho.'], correctIndex: 0, explanation: 'Các con số giới hạn thường trở thành mỏ neo thúc đẩy hành vi mua nhiều hơn.' },
      { id: 'q2_7', type: 'scenario', scenario: 'Tại sao nên là người đưa ra con số lương đầu tiên khi thương lượng?', options: ['Thể hiện sự tự tin, chủ động.', 'Để con số đó trở thành tâm điểm điều chỉnh.', 'Giúp đỡ nhà tuyển dụng đỡ phải nghĩ.', 'Tạo ấn tượng minh bạch.'], correctIndex: 1, explanation: 'Con số đầu tiên đưa ra sẽ trở thành "mỏ neo" cho toàn bộ cuộc thương thảo.' },
      { id: 'q2_8', type: 'scenario', scenario: 'Thám tử thấy một mảnh giấy ở hiện trường và lập tức tập trung điều tra theo hướng đó.', options: ['Mảnh giấy rất quan trọng, phải là manh mối chính.', 'Thông tin đầu tiên dễ gây ấn tượng mạnh và chi phối suy nghĩ.', 'Cảnh sát thường ưu tiên bằng chứng dễ thấy.', 'Kinh nghiệm cho thấy manh mối đầu thường là đúng.'], correctIndex: 1, explanation: 'Ấn tượng ban đầu có thể làm lệch hướng tư duy đa chiều của người điều tra.' }
    ]
  },
  {
    id: 'q3',
    title: 'Lọc thông tin',
    regionId: 'r1',
    requiredLevel: 3,
    xpReward: 100,
    gemReward: 8,
    questions: [
      { id: 'q3_1', type: 'scenario', scenario: 'Nghe tin đồn xấu về một người bạn thân, bạn chỉ tìm kiếm những thông tin minh oan cho họ.', options: ['Bạn là người trung thành, luôn tin bạn bè.', 'Bạn chỉ tiếp nhận thông tin phù hợp với niềm tin sẵn có.', 'Bạn lo lắng cho danh tiếng của bạn.', 'Bạn muốn tìm sự thật nhưng thiên về bảo vệ bạn.'], correctIndex: 1, explanation: 'Chúng ta có xu hướng ủng hộ những niềm tin sẵn có và phớt lờ các thông tin đối lập.' },
      { id: 'q3_2', type: 'scenario', scenario: 'Bạn không ưa một đồng nghiệp, nên mọi hành động của họ đều làm bạn khó chịu.', options: ['Họ thực sự làm việc kém.', 'Bạn gán ghép ý nghĩa tiêu cực cho mọi hành vi của họ.', 'Môi trường làm việc bị ảnh hưởng bởi thái độ của họ.', 'Bạn muốn sếp xử lý họ.'], correctIndex: 1, explanation: 'Định kiến khiến chúng ta chỉ lọc ra những hành vi tiêu cực để củng cố cảm xúc bực bội.' },
      { id: 'q3_3', type: 'scenario', scenario: 'Bạn tin hôm nay là ngày xui, và khi gặp đèn đỏ liên tiếp, bạn cho rằng đó là bằng chứng.', options: ['Đèn đỏ là do thời tiết.', 'Bạn cố tình kết nối các sự kiện ngẫu nhiên để khớp với suy nghĩ ban đầu.', 'Bạn cần thận trọng hơn vì đúng là xui.', 'Môi trường phản ánh tâm trạng của bạn.'], correctIndex: 3, explanation: 'Mọi sự kiện bình thường đều có thể được diễn giải thành điềm báo nếu bạn đã tin vào nó.' },
      { id: 'q3_4', type: 'scenario', scenario: 'Dự án kinh doanh đang lỗ, bạn chỉ đọc những báo cáo lạc quan về thị trường.', options: ['Bạn muốn giữ tinh thần lạc quan để tiếp tục.', 'Bạn tránh đối mặt với sự thật khó chịu.', 'Bạn đang lên kế hoạch dự phòng.', 'Bạn tin vào đội ngũ lãnh đạo.'], correctIndex: 1, explanation: 'Việc tránh né sự thật giúp chúng ta cảm thấy dễ chịu hơn nhưng không giải quyết được vấn đề.' },
      { id: 'q3_5', type: 'scenario', scenario: 'Bạn đang thích một người và tin rằng mọi hành động nhỏ của họ đều có ý với bạn.', options: ['Bạn cảm thấy có sự kết nối đặc biệt.', 'Bạn diễn giải những hành vi vô tình theo mong muốn chủ quan.', 'Thời điểm này thích hợp để tỏ tình.', 'Bạn muốn đối phương phản hồi rõ ràng.'], correctIndex: 1, explanation: 'Mong ước cá nhân thường là cái kính lọc bóp méo ý nghĩa thực sự của hành động.' },
      { id: 'q3_6', type: 'scenario', scenario: 'Mạng xã hội liên tục gợi ý những bài viết giống quan điểm của bạn.', options: ['Giúp bạn dễ dàng tìm nội dung yêu thích.', 'Tạo ra một không gian chỉ toàn ý kiến tương đồng.', 'Thuật toán cá nhân hóa giúp kết nối cộng đồng.', 'Khuyến khích bạn kết nối với người có cùng sở thích.'], correctIndex: 1, explanation: 'Thuật toán củng cố những gì bạn đã thích, khiến bạn ngày càng xa rời những luồng tư duy khác.' },
      { id: 'q3_7', type: 'scenario', scenario: 'Trong các cuộc tranh luận, hai bên thường chỉ đưa ra lý lẽ ủng hộ mình và bác bỏ đối phương.', options: ['Thể hiện sự kiên định với chân lý của mình.', 'Không có khả năng xem xét vấn đề từ góc nhìn khác.', 'Cảm thấy cần bảo vệ cái tôi trước tập thể.', 'Mong muốn đạt đồng thuận nhanh để kết thúc buổi họp.'], correctIndex: 1, explanation: 'Thiên lệch xác nhận khiến cuộc đối thoại trở thành hai màn độc thoại không có điểm chung.' },
      { id: 'q3_8', type: 'scenario', scenario: 'Cách tốt nhất để thám tử không bị mắc bẫy của những giả thuyết có sẵn là gì?', options: ['Luôn tin vào trực giác và kinh nghiệm phá án cũ.', 'Chủ động tìm kiếm bằng chứng có khả năng bác bỏ giả thuyết.', 'Tham khảo ý kiến số đông để đảm bảo khách quan.', 'Chờ chỉ thị từ cơ quan điều tra cấp cao.'], correctIndex: 1, explanation: 'Chỉ khi dám chứng minh mình sai, thám tử mới có thể tìm thấy sự thật thực sự.' }
    ]
  },
  {
    id: 'q4',
    title: 'Đổ lỗi',
    regionId: 'r1',
    requiredLevel: 4,
    xpReward: 120,
    gemReward: 10,
    questions: [
      { id: 'q4_1', type: 'scenario', scenario: 'Thắng game thì bảo do skill, thua thì bảo do lag.', options: ['Đánh giá khách quan các tác động ngoại cảnh.', 'Cố gắng bảo vệ hình ảnh năng lực của bản thân.', 'Nhận ra sự chuẩn bị kỹ thuật còn nhiều sơ hở.', 'Muốn nhận được sự đồng cảm từ người chơi khác.'], correctIndex: 1, explanation: 'Chúng ta thường vơ lấy công trạng nhưng đẩy đi trách nhiệm khi kết quả không tốt.' },
      { id: 'q4_2', type: 'scenario', scenario: 'Điểm cao thì nghĩ mình thông minh, điểm thấp thì bảo đề khó.', options: ['Xác định được điểm mạnh, điểm yếu trong học tập.', 'Gán thành công cho bản thân, thất bại cho hoàn cảnh.', 'Cảm thấy giáo viên chưa công bằng khi ra đề.', 'Hy vọng kết quả tốt hơn ở kỳ thi sau.'], correctIndex: 1, explanation: 'Cách nhìn nhận này giúp duy trì sự tự tôn nhưng cản trở việc nhìn lại lỗi sai.' },
      { id: 'q4_3', type: 'scenario', scenario: 'Sếp khen mình khi dự án thành công, nhưng đổ lỗi cho nhân viên khi thất bại.', options: ['Thể hiện cái nhìn toàn diện về vai trò lãnh đạo.', 'Tự đề cao đóng góp và trốn tránh trách nhiệm.', 'Cảm thấy đội ngũ cần được đào tạo chuyên sâu hơn.', 'Muốn tìm giải pháp tối ưu để cải thiện năng suất.'], correctIndex: 1, explanation: 'Đây là thói quen tâm lý phổ biến nhằm giữ vững quyền uy của người đứng đầu.' },
      { id: 'q4_4', type: 'scenario', scenario: 'Va chạm giao thông, bạn khẳng định mình lái cẩn thận, lỗi là do người kia.', options: ['Môi trường giao thông quá phức tạp và nguy hiểm.', 'Tự động loại bỏ khả năng sai sót của chính mình.', 'Cần có quy định khắt khe hơn để đảm bảo an toàn.', 'Muốn được bồi thường xứng đáng cho thiệt hại.'], correctIndex: 1, explanation: 'Ít ai có đủ dũng cảm để thừa nhận lỗi lầm của mình ngay trong những tình huống bất ngờ.' },
      { id: 'q4_5', type: 'scenario', scenario: 'Thắng bạc thì bảo do chiến thuật, thua thì bảo do đen.', options: ['Thấy được giá trị nghiên cứu quy luật may rủi.', 'Hợp thức hóa biến cố ngẫu nhiên theo hướng có lợi cho cái tôi.', 'Hối hận vì không dừng lại đúng lúc để bảo toàn vốn.', 'Cho rằng hệ thống sòng bạc có sai lệch.'], correctIndex: 1, explanation: 'Sự tự lừa dối này khiến người chơi có niềm tin giả tạo vào khả năng kiểm soát may rủi.' },
      { id: 'q4_6', type: 'scenario', scenario: 'Chia tay xong, bạn khẳng định lỗi hoàn toàn do tính cách đối phương.', options: ['Nhận ra mâu thuẫn không thể hàn gắn.', 'Phớt lờ thiếu sót của bản thân để giảm tổn thương.', 'Cần thời gian để chữa lành nỗi đau cảm xúc.', 'Muốn tìm đối tượng mới phù hợp hơn.'], correctIndex: 1, explanation: 'Việc đổ lỗi hoàn toàn cho người khác là cách não bộ giảm nhẹ áp lực tội lỗi.' },
      { id: 'q4_7', type: 'scenario', scenario: 'Startup thất bại, ông chủ đổ lỗi cho biến động thị trường.', options: ['Nhận thấy tầm ảnh hưởng của kinh tế vĩ mô.', 'Từ chối xem xét lỗ hổng trong quản trị và vận hành.', 'Cần có chiến lược thích ứng linh hoạt hơn.', 'Cho rằng đây là bài học đắt giá cho các kế hoạch sau.'], correctIndex: 1, explanation: 'Hoàn cảnh luôn là cái cớ hoàn hảo để che đậy những sai lầm trong tính toán cá nhân.' },
      { id: 'q4_8', type: 'scenario', scenario: 'Không tìm ra hung thủ, thám tử báo cáo rằng kẻ phạm tội là thiên tài với thủ đoạn tinh vi.', options: ['Đánh giá cao kỹ năng của đối thủ để nâng tầm vụ án.', 'Dùng sự xuất sắc của đối phương để biện minh cho sự bế tắc.', 'Cần tăng cường quân số cho hoạt động điều tra.', 'Manh mối hiện tại chưa đủ để đưa ra kết luận.'], correctIndex: 1, explanation: 'Tôn vinh kẻ thù đôi khi chỉ là một cách để xoa dịu thất bại của chính mình.' }
    ]
  },
  {
    id: 'q5',
    title: 'Tin nổi bật',
    regionId: 'r1',
    requiredLevel: 5,
    xpReward: 60,
    gemReward: 2,
    questions: [
      { id: 'q5_1', type: 'scenario', scenario: 'Xem tin tai nạn máy bay liên tiếp, bạn thấy đi máy bay nguy hiểm hơn đi ô tô.', options: ['Những sự kiện dễ nhớ làm tăng cảm nhận về rủi ro.', 'Hàng không có tiêu chuẩn an toàn nghiêm ngặt nhất.', 'Phương tiện công cộng luôn có xác suất sự cố cao hơn.', 'Truyền thông hay khai thác khía cạnh giật gân.'], correctIndex: 0, explanation: 'Tính sẵn có của thông tin trong tâm trí thường bị nhầm lẫn với xác suất thực tế.' },
      { id: 'q5_2', type: 'scenario', scenario: 'Tại sao ta lo lắng về sự cố hiếm gặp nhưng hình ảnh kinh hoàng hơn nguy cơ thường trực?', options: ['Thông tin gợi hình mạnh để lại ấn tượng sâu, dễ nhớ lại.', 'Sự cố hiếm gặp tiềm ẩn hậu quả nghiêm trọng chưa có cách khắc phục.', 'Lo lắng là phản xạ tự nhiên giúp cảnh giác trước biến động.', 'Chúng ta thiếu kỹ năng phân tích số liệu thống kê.'], correctIndex: 0, explanation: 'Căng thẳng tâm lý thường tỷ lệ thuận với độ rõ nét của thông tin trong bộ nhớ.' },
      { id: 'q5_3', type: 'scenario', scenario: 'Có người trúng số ở khu phố, ai cũng tin cơ hội trúng của mình tăng lên.', options: ['Vận may có xu hướng lan tỏa trong không gian và thời gian.', 'Sự kiện vừa xảy ra tạo mốc tham chiếu sống động, đánh giá sai xác suất.', 'Niềm tin vào quy luật ngẫu nhiên giúp duy trì lạc quan.', 'Thông tin tích cực về tài chính luôn có sức hút mạnh.'], correctIndex: 1, explanation: 'Ví dụ sống động ở gần khiến con người lờ đi các quy luật về mặt toán học.' },
      { id: 'q5_4', type: 'scenario', scenario: 'Đánh giá nhân viên, sếp nhớ rõ lỗi sai vừa xảy ra trong tuần cuối.', options: ['Dữ liệu gần nhất chiếm ưu thế trong xử lý và truy xuất thông tin.', 'Lỗi ở giai đoạn cuối dự án ảnh hưởng trực tiếp đến kết quả kinh doanh.', 'Quản lý đặt tiêu chuẩn khắt khe nhất cho hiệu suất cuối kỳ.', 'Sự cố mới đòi hỏi tập trung tối đa để xử lý kịp thời.'], correctIndex: 0, explanation: 'Thời điểm tiếp nhận thông tin ảnh hưởng lớn đến trọng số đánh giá của cá nhân.' },
      { id: 'q5_5', type: 'scenario', scenario: 'Làm sao để hạn chế quyết định dựa trên thông tin nổi bật nhưng không đại diện?', options: ['Tìm kiếm và phân tích số liệu tổng thể thay vì chỉ vài ví dụ lẻ tẻ.', 'Tham khảo ý kiến người cùng trải nghiệm để củng cố niềm tin.', 'Tin vào trực giác đã rèn luyện qua nhiều tình huống tương tự.', 'Chọn thông tin có độ tin cậy cao từ truyền thông chính thống.'], correctIndex: 0, explanation: 'Sự khách quan chỉ đạt được khi chúng ta nhìn vào bức tranh toàn cảnh rộng lớn.' },
      { id: 'q5_6', type: 'scenario', scenario: 'Nghe nhiều câu chuyện thành công nhờ bỏ học, bạn nghĩ bằng cấp không quan trọng.', options: ['Câu chuyện ngoại lệ gây ấn tượng mạnh, dễ bị nhầm là quy luật chung.', 'Nỗ lực và thích nghi là yếu tố then chốt quyết định thành công.', 'Thị trường lao động đang chuyển trọng tâm từ bằng cấp sang kỹ năng.', 'Nên học tập từ tấm gương đi đầu để tìm con đường phát triển ngắn nhất.'], correctIndex: 0, explanation: 'Sự nổi bật của các cá nhân tiêu biểu dễ tạo ra một cái nhìn lệch lạc về thực tế.' },
      { id: 'q5_7', type: 'scenario', scenario: 'Tại sao cá mập tấn công gây sợ hãi lớn dù xác suất thấp hơn tai nạn xe máy?', options: ['Sự kịch tính và độ hiếm khiến thông tin được lưu giữ bền vững, dễ bộc phát.', 'Hành vi động vật hoang dã tiềm ẩn yếu tố bất ngờ không kiểm soát.', 'Cảm giác bất lực trước nguy hiểm từ thiên nhiên tạo rào cản tâm lý nặng nề.', 'Truyền thông tập trung phản ánh mặt tối để cảnh báo cộng đồng.'], correctIndex: 0, explanation: 'Chúng ta sợ hãi những gì chúng ta dễ dàng hình dung ra trong tâm trí mình.' },
      { id: 'q5_8', type: 'scenario', scenario: 'Thám tử thấy nhiều vỏ chai rượu ở hiện trường, liền nghĩ vụ án liên quan đến kẻ nghiện ngập.', options: ['Bằng chứng vật chất hiển nhiên dẫn dắt phán đoán theo hướng dễ thấy nhất.', 'Vật dụng tại hiện trường là manh mối khách quan để dựng chân dung tâm lý.', 'Tập trung vào đối tượng có hành vi lệch chuẩn giúp thu hẹp phạm vi tìm kiếm.', 'Kinh nghiệm điều tra cho thấy vụ việc bộc phát thường gắn với thiếu kiểm soát.'], correctIndex: 0, explanation: 'Thông tin nổi bật trước mắt thường trở thành cái bẫy ngăn cản tư duy đa chiều.' }
    ]
  },
  {
    id: 'q6',
    title: 'Lời tiên tri',
    regionId: 'r1',
    requiredLevel: 6,
    xpReward: 160,
    gemReward: 14,
    questions: [
      { id: 'q6_1', type: 'scenario', scenario: 'Thầy bói phán: “Bạn độc lập nhưng đôi khi cũng cần sự đồng cảm.” Bạn gật gù thấy đúng.', options: ['Thầy có khả năng thấu thị tâm hồn người khác.', 'Thiên hướng tin vào các mô tả chung chung, mang tính phổ quát.', 'Cảm thấy cần kết nối nhiều hơn với người xung quanh.', 'Cho rằng đây là lời khuyên chân thành cho tương lai.'], correctIndex: 1, explanation: 'Lời phán chung chung đến 90% dân số đều có thể thấy đúng với bản thân.' },
      { id: 'q6_2', type: 'scenario', scenario: 'App cung hoàng đạo bảo “Hôm nay gặp may”, bạn nhặt được 5k và tin sái cổ.', options: ['Xác nhận chiêm tinh có độ chính xác rất cao.', 'Gán ghép sự kiện ngẫu nhiên vào lời tiên đoán mơ hồ.', 'Cảm thấy may mắn vì được các vì sao chỉ dẫn.', 'Muốn giới thiệu app cho bạn bè cùng cung hoàng đạo.'], correctIndex: 1, explanation: 'Bạn tự ghép một biến cố nhỏ ngẫu nhiên vào một lời tiên đoán không rõ ràng.' },
      { id: 'q6_3', type: 'scenario', scenario: 'Biên bản mô tả nghi phạm: “Hắn nội tâm phức tạp, vừa lạnh lùng vừa có phút giây yếu lòng.”', options: ['Đánh giá đây là phân tích tâm lý tội phạm cực kỳ sâu sắc.', 'Những mô tả mâu thuẫn thường dễ được chấp nhận là đúng.', 'Cảm thấy đồng cảm với góc khuất trong đời nghi phạm.', 'Tin rằng kẻ phạm tội vẫn giữ được bản tính lương thiện.'], correctIndex: 1, explanation: 'Những mô tả mang tính hai mặt thường khiến chúng ta thấy đúng trong mọi hoàn cảnh.' },
      { id: 'q6_4', type: 'scenario', scenario: 'Tại sao bài trắc nghiệm tính cách trên mạng nhận nhiều lượt chia sẻ?', options: ['Vì phân tích chính xác từng đặc điểm riêng biệt.', 'Sử dụng lời khen phổ quát khiến người dùng hài lòng.', 'Giúp thấu hiểu bản thân qua thuật toán hiện đại.', 'Tạo cộng đồng giao lưu cho người có tính cách tương đồng.'], correctIndex: 1, explanation: 'Việc sử dụng những lời khen chung chung khiến người dùng thấy app "chuẩn" và muốn chia sẻ.' },
      { id: 'q6_5', type: 'scenario', scenario: 'Thầy phán: “Có người trong quá khứ đang âm thầm quan tâm và muốn giúp con.”', options: ['Cảm thấy xúc động, chờ quý nhân phù trợ.', 'Khẳng định mơ hồ luôn tìm được ví dụ thực tế để đối chiếu.', 'Muốn tìm lại mối quan hệ cũ để cảm ơn.', 'Tin tuyệt đối vào sự linh ứng của tiền nhân.'], correctIndex: 1, explanation: 'Một khẳng định không thể sai, vì thực tế ai cũng có ai đó từng giúp đỡ mình.' },
      { id: 'q6_6', type: 'scenario', scenario: 'Đọc sách tâm linh thấy tác giả như viết về góc khuất trong tâm hồn mình.', options: ['Kinh ngạc trước khả năng thấu hiểu tâm lý của tác giả.', 'Chúng ta tự điền chi tiết cá nhân vào khung có sẵn.', 'Cảm thấy an ủi vì không hề đơn độc trên đời.', 'Quyết định áp dụng mọi lời khuyên trong sách.'], correctIndex: 1, explanation: 'Bạn tự động lọc ra những ý phù hợp và bỏ qua những phần không khớp với mình.' },
      { id: 'q6_7', type: 'scenario', scenario: 'Mô tả nhóm người: “Cẩn thận trong công việc nhưng đôi khi cũng có quyết định bốc đồng.”', options: ['Thấy đây là nhận định khách quan về tính cách.', 'Lời phán hai mặt bao hàm mọi khả năng, khó có thể sai.', 'Muốn thay đổi thói quen xấu để hoàn thiện bản thân.', 'Tự hào vì sở hữu phẩm chất linh hoạt.'], correctIndex: 1, explanation: 'Những khẳng định kiểu này luôn đúng vì nó bao hàm cả hai thái cực của hành vi.' },
      { id: 'q6_8', type: 'scenario', scenario: 'Làm thế nào để thám tử không bị cuốn vào lời mô tả tính cách chung chung?', options: ['Luôn tin vào trực giác và cảm nhận đầu tiên.', 'Yêu cầu bằng chứng cụ thể và số liệu khách quan.', 'Tham khảo ý kiến người xung quanh về tính cách nghi phạm.', 'Dùng công cụ bói toán tìm manh mối tâm linh.'], correctIndex: 1, explanation: 'Sự thật chỉ nằm ở những dữ liệu có thể chứng minh, không phải ở những lời phán.' }
    ]
  },
  {
    id: 'q7',
    title: 'Biết rồi',
    regionId: 'r1',
    requiredLevel: 7,
    xpReward: 180,
    gemReward: 16,
    questions: [
      { id: 'q7_1', type: 'scenario', scenario: 'Sau khi xem lại trận đấu, bạn thấy kết quả thật dễ đoán, ai cũng biết điều đó.', options: ['Bạn có khả năng dự đoán tốt hơn mọi người.', 'Biết trước kết quả khiến bạn cảm thấy nó hiển nhiên hơn thực tế.', 'Những người xem khác đều có chung nhận xét với bạn.', 'Phân tích chuyên sâu giúp nhìn ra chi tiết người khác bỏ lỡ.'], correctIndex: 1, explanation: 'Sau khi biết kết quả, chúng ta có xu hướng nghĩ rằng mình đã biết điều đó từ trước.' },
      { id: 'q7_2', type: 'scenario', scenario: 'Đọc lại bài báo dự đoán giá vàng đúng, bạn cho rằng dự đoán đó quá hiển nhiên.', options: ['Bài báo phân tích sâu sắc và chi tiết.', 'Dự đoán đó được đánh giá là rủi ro vào thời điểm đưa ra.', 'Bất kỳ ai cũng đưa ra nhận định tương tự.', 'Thông tin bài báo có độ chính xác cao.'], correctIndex: 1, explanation: 'Khi đã biết kết quả, chúng ta thường đánh giá thấp độ khó của việc dự đoán.' },
      { id: 'q7_3', type: 'scenario', scenario: 'Sau sự kiện lớn, nhiều người khẳng định họ đã thấy trước điều đó.', options: ['Những người đó có tầm nhìn xa và phân tích tốt hơn.', 'Ký ức về dự đoán trước đó thường bị điều chỉnh để phù hợp với kết quả.', 'Sự kiện đã được dự báo bởi chuyên gia hàng đầu.', 'Thông tin sự kiện lan truyền rộng rãi trước khi xảy ra.'], correctIndex: 1, explanation: 'Chúng ta thường nhớ lại những suy nghĩ trước đây của mình một cách sai lệch để phù hợp với hiện tại.' },
      { id: 'q7_4', type: 'scenario', scenario: 'Đọc hồi ký doanh nhân thành đạt, thấy con đường của họ thật rõ ràng, không có gì bất ngờ.', options: ['Hồi ký được biên tập để làm nổi bật quyết định đúng đắn.', 'Thành công đến từ kế hoạch chi tiết và thực hiện nghiêm túc.', 'Con đường thành công thực sự không có nhiều rủi ro.', 'Người thành công có khả năng nhìn thấy cơ hội rõ ràng hơn.'], correctIndex: 0, explanation: 'Khi nhìn lại quá khứ, những khó khăn và bất định thường bị làm mờ đi để tạo thành câu chuyện mạch lạc.' },
      { id: 'q7_5', type: 'scenario', scenario: 'Cổ phiếu bạn theo dõi bất ngờ tăng mạnh, bạn nghĩ “mình đã biết nó sẽ tăng mà”.', options: ['Bạn đã phân tích kỹ lưỡng tiềm năng của cổ phiếu.', 'Thị trường chứng khoán vận hành theo quy luật có thể dự đoán.', 'Cảm giác biết trước xuất hiện sau khi sự việc xảy ra, không phải trước đó.', 'Biến động thị trường thường có dấu hiệu báo trước khá rõ.'], correctIndex: 2, explanation: 'Sau sự kiện, chúng ta dễ dàng tin rằng mình đã dự đoán được nó, dù thực tế không phải vậy.' },
      { id: 'q7_6', type: 'scenario', scenario: 'Trong phiên tòa, bồi thẩm đoàn cho rằng hung thủ để lại quá nhiều bằng chứng, khó không bị phát hiện.', options: ['Kẻ phạm tội thường mắc sai lầm cơ bản khi gây án.', 'Các bằng chứng trở nên hiển nhiên hơn sau khi đã tìm ra hung thủ.', 'Công tác điều tra của cảnh sát rất chuyên nghiệp.', 'Hung thủ chủ quan và không che giấu kỹ dấu vết.'], correctIndex: 1, explanation: 'Sau khi vụ án được giải quyết, các manh mối thường có vẻ dễ thấy hơn thực tế khi đang điều tra.' },
      { id: 'q7_7', type: 'scenario', scenario: 'Xem lại quyết định đầu tư thất bại, bạn nghĩ “sao lúc đó mình không thấy điều hiển nhiên này”.', options: ['Rủi ro tiềm ẩn trở nên rõ ràng hơn khi nhìn lại từ hiện tại.', 'Bạn thiếu kinh nghiệm và kiến thức để nhận ra dấu hiệu cảnh báo.', 'Thị trường thay đổi theo hướng không thể dự đoán lúc đó.', 'Chuyên gia đã đưa ra cảnh báo nhưng bạn bỏ qua.'], correctIndex: 0, explanation: 'Khi nhìn lại, chúng ta thường đánh giá cao hơn khả năng nhận biết các dấu hiệu trước đó của mình.' },
      { id: 'q7_8', type: 'scenario', scenario: 'Để tránh suy nghĩ rằng mọi thứ đều hiển nhiên sau khi biết kết quả, thám tử cần làm gì?', options: ['Ghi chép dự đoán và lý do trước khi biết kết quả thực tế.', 'Tập trung vào thông tin ủng hộ giả thuyết hiện tại.', 'Tin vào trực giác và cảm nhận đầu tiên.', 'Tham khảo ý kiến người có kinh nghiệm vụ án tương tự.'], correctIndex: 0, explanation: 'Việc ghi lại các suy nghĩ trước khi có kết quả giúp chúng ta đánh giá chính xác khả năng dự đoán của mình.' }
    ]
  },
  {
    id: 'q8',
    title: 'Tự tin ảo',
    regionId: 'r1',
    requiredLevel: 8,
    xpReward: 200,
    gemReward: 20,
    questions: [
      { id: 'q8_1', type: 'scenario', scenario: 'Bạn tin rằng kỹ năng lái xe của mình an toàn hơn đa số người trên đường.', options: ['Cảm thấy tự hào vì đã rèn được phản xạ nhanh.', 'Mọi người có xu hướng đánh giá mình ở mức trên trung bình.', 'Môi trường giao thông tiềm ẩn quá nhiều rủi ro.', 'Muốn chia sẻ kinh nghiệm lái an toàn cho người mới.'], correctIndex: 1, explanation: 'Khoảng 80-90% mọi người đều tin rằng mình lái xe giỏi hơn những người khác.' },
      { id: 'q8_2', type: 'scenario', scenario: 'Hầu hết sinh viên đều đánh giá năng lực học tập của mình thuộc nhóm dẫn đầu.', options: ['Tin rằng chăm chỉ sẽ mang lại kết quả xứng đáng.', 'Sự tự tin thái quá khiến khó nhìn nhận đúng vị trí.', 'Cảm thấy áp lực cạnh tranh trong học thuật ngày càng cao.', 'Muốn nhận được đánh giá công bằng từ thầy cô.'], correctIndex: 1, explanation: 'Đại đa số đều nghĩ mình thông minh hơn mức trung bình, một điều phi lý về mặt số.' },
      { id: 'q8_3', type: 'scenario', scenario: 'Một nhà quản lý cho rằng mình chống lại bẫy tâm lý tốt hơn đồng nghiệp.', options: ['Thể hiện bản lĩnh và sự tỉnh táo trong quyết định.', 'Việc tin mình không bị định kiến chính là một loại định kiến.', 'Cảm thấy cần đào tạo nhân viên về kỹ năng tư duy.', 'Luôn sẵn sàng học hỏi kiến thức mới để nâng cao hiệu suất.'], correctIndex: 1, explanation: 'Càng hiểu biết, chúng ta càng dễ tin rằng mình sẽ không bao giờ mắc sai lầm.' },
      { id: 'q8_4', type: 'scenario', scenario: 'Các cặp đôi tin rằng mối quan hệ của họ bền vững hơn các cặp khác.', options: ['Cảm nhận sự gắn kết sâu sắc và tình yêu chân thành.', 'Ảo tưởng vượt trội giúp duy trì tích cực nhưng dễ làm ngơ lỗi.', 'Cảm thấy cần cam kết lâu dài để bảo vệ hạnh phúc.', 'Luôn nỗ lực thấu hiểu và chia sẻ với đối phương.'], correctIndex: 1, explanation: 'Cơ chế này giúp con người duy trì hy vọng nhưng đôi khi làm họ thiếu cảnh giác.' },
      { id: 'q8_5', type: 'scenario', scenario: 'Bạn cảm thấy gu thẩm mỹ và phong cách thời trang của mình tinh tế hơn bạn bè.', options: ['Tự tin thể hiện cá tính qua cách chọn trang phục.', 'Cái tôi luôn tìm điểm ưu việt để khẳng định giá trị bản thân.', 'Cần cập nhật thêm xu hướng mới từ các sàn diễn.', 'Muốn nhận lời khen ngợi từ người xung quanh.'], correctIndex: 1, explanation: 'Chúng ta luôn muốn thấy mình đặc biệt và cao cấp hơn những người còn lại.' },
      { id: 'q8_6', type: 'scenario', scenario: 'Khi làm việc nhóm, hầu như ai cũng tin mình đóng góp nhiều hơn người khác.', options: ['Thể hiện tinh thần trách nhiệm cao trong nhiệm vụ.', 'Chúng ta ghi nhớ nỗ lực bản thân tốt hơn đóng góp của người.', 'Cần hệ thống đánh giá KPI minh bạch và công bằng.', 'Muốn đội ngũ cùng tiến bộ để đạt mục tiêu chung.'], correctIndex: 1, explanation: 'Mỗi người đều nhìn thấy khó khăn của mình nhưng lại phớt lờ vất vả của người khác.' },
      { id: 'q8_7', type: 'scenario', scenario: 'Đa số mọi người tự nhận mình tử tế và đạo đức hơn mức trung bình xã hội.', options: ['Tin vào bản chất thiện lương và lòng tốt hiện hữu.', 'Tự đề cao phẩm chất là cơ chế duy trì sự tự tôn.', 'Cần thực hiện nhiều hoạt động thiện nguyện để giúp đời.', 'Xã hội hiện đại đang xuống cấp về chuẩn mực đạo đức.'], correctIndex: 1, explanation: 'Chúng ta thường nới lỏng các tiêu chuẩn đạo đức cho mình hơn là cho người khác.' },
      { id: 'q8_8', type: 'scenario', scenario: 'Làm sao để thám tử duy trì tỉnh táo, không đánh giá quá cao khả năng suy luận của mình?', options: ['Luôn tin vào trực giác và kinh nghiệm phá án cũ.', 'Đối chiếu giả thuyết với số liệu khách quan và lắng nghe phản biện.', 'Tham khảo ý kiến người có uy tín trong ngành điều tra.', 'Dành nhiều thời gian nghiên cứu hồ sơ vụ án kinh điển.'], correctIndex: 1, explanation: 'Sự khiêm nhường trong nhận thức là chìa khóa để tránh được những sai lầm chết người.' }
    ]
  },

  // ===================== VÙNG 2: MỜ MẮT =====================
  {
    id: 'q9',
    title: 'Hào quang',
    regionId: 'r2',
    requiredLevel: 9,
    xpReward: 90,
    gemReward: 4,
    questions: [
      { id: 'q9_1', type: 'scenario', scenario: 'Sếp mới xinh đẹp, bạn tự động cho rằng sếp vừa giỏi vừa tử tế.', options: ['Người có ngoại hình tốt thường được đào tạo bài bản.', 'Sự hấp dẫn bên ngoài tạo ấn tượng tốt về các phẩm chất khác.', 'Công ty có tiêu chuẩn tuyển dụng cao về cả năng lực và hình thức.', 'Sếp được giới thiệu từ tập đoàn danh tiếng nên chắc chắn giỏi.'], correctIndex: 1, explanation: 'Cái đẹp lấn át lý trí, tạo ảo tưởng về những phẩm chất khác.' },
      { id: 'q9_2', type: 'scenario', scenario: 'Bạn mua iPhone vì logo táo đẹp và tin nó bảo mật nhất.', options: ['Thiết kế sản phẩm phản ánh chất lượng bên trong.', 'Thương hiệu nổi tiếng thường đi kèm với sản phẩm chất lượng.', 'Cảm nhận về một điểm mạnh lan sang đánh giá các điểm khác.', 'Sản phẩm đắt tiền luôn có tính năng vượt trội hơn hẳn.'], correctIndex: 2, explanation: 'Yêu một điểm, bạn lan ra yêu cả bộ.' },
      { id: 'q9_3', type: 'scenario', scenario: 'Ứng viên đẹp trai được nhận dù chuyên môn trung bình.', options: ['Vẻ ngoài chuyên nghiệp giúp tạo thiện cảm trong phỏng vấn.', 'Người đẹp thường tự tin và giao tiếp tốt hơn.', 'Ấn tượng ban đầu về ngoại hình ảnh hưởng đến đánh giá năng lực.', 'Công ty ưu tiên những người có khả năng đại diện thương hiệu.'], correctIndex: 2, explanation: 'Vẻ ngoài tạo niềm tin ảo về năng lực.' },
      { id: 'q9_4', type: 'scenario', scenario: 'Bạn tin người đeo kính chắc chắn học giỏi.', options: ['Người học nhiều thường bị cận thị, nên phải đeo kính.', 'Kính mắt là biểu tượng của sự tri thức và chăm chỉ.', 'Phụ huynh chỉ cho con đeo kính khi chúng thực sự học giỏi.', 'Những người đeo kính thường dành nhiều thời gian đọc sách.'], correctIndex: 1, explanation: 'Biểu tượng trí thức bị đánh tráo.' },
      { id: 'q9_5', type: 'scenario', scenario: 'Người nổi tiếng quảng cáo thuốc đông y, bạn tin sái cổ.', options: ['Người nổi tiếng có điều kiện kiểm chứng chất lượng.', 'Danh tiếng của họ là sự bảo chứng cho uy tín sản phẩm.', 'Họ sẽ không mạo hiểm danh dự để quảng cáo kém chất lượng.', 'Công ty đã đầu tư lớn để mời người nổi tiếng.'], correctIndex: 1, explanation: 'Nổi tiếng không đồng nghĩa chuyên môn y tế.' },
      { id: 'q9_6', type: 'scenario', scenario: 'Bạn thấy người béo thì mặc định họ lười biếng.', options: ['Ngoại hình phản ánh thói quen sinh hoạt.', 'Người thừa cân thường gặp vấn đề kiểm soát bản thân.', 'Ấn tượng tiêu cực về một đặc điểm lan sang đánh giá khác.', 'Xã hội có định kiến về mối liên hệ giữa cân nặng và tính cách.'], correctIndex: 2, explanation: 'Ác cảm ngoại hình làm méo mó đánh giá.' },
      { id: 'q9_7', type: 'scenario', scenario: 'Nhà hàng trang trí đẹp, bạn tin món ăn chắc chắn ngon.', options: ['Nhà hàng sang trọng có điều kiện đầu tư nguyên liệu tốt.', 'Không gian đẹp thường đi kèm dịch vụ và chất lượng cao.', 'Cảm nhận về không gian ảnh hưởng đến kỳ vọng về hương vị.', 'Nhà hàng chú trọng trang trí cũng chú trọng chất lượng món ăn.'], correctIndex: 2, explanation: 'Không gian đánh lừa vị giác.' },
      { id: 'q9_8', type: 'scenario', scenario: 'Thám tử đối mặt nghi phạm có gương mặt hiền lành.', options: ['Gương mặt phản ánh phần nào tính cách thật.', 'Người có ngoại hình hiền lành ít có khả năng phạm tội.', 'Không nên vội kết luận dựa trên vẻ bề ngoài.', 'Trực giác về sự nguy hiểm thường đến từ dấu hiệu bên ngoài.'], correctIndex: 2, explanation: 'Ác quỷ thường mang mặt nạ thiên thần.' }
    ]
  },
  {
    id: 'q10',
    title: 'Sừng',
    regionId: 'r2',
    requiredLevel: 10,
    xpReward: 100,
    gemReward: 5,
    questions: [
      { id: 'q10_1', type: 'scenario', scenario: 'Đồng nghiệp nói ngọng, bạn mặc định họ làm việc cũng cẩu thả.', options: ['Cách nói chuyện phản ánh sự cẩn trọng trong công việc.', 'Một khuyết điểm nhỏ dễ khiến ta đánh giá thấp các mặt khác.', 'Người nói ngọng thường thiếu tập trung và kỹ năng giao tiếp.', 'Thói quen xấu trong sinh hoạt ảnh hưởng đến chất lượng công việc.'], correctIndex: 1, explanation: 'Một điểm trừ kéo tụt mọi giá trị khác.' },
      { id: 'q10_2', type: 'scenario', scenario: 'Bạn không thích app vì màu nền xấu, sau đó kết luận tính năng nó cũng rác.', options: ['Giao diện xấu cho thấy nhà phát triển không chuyên nghiệp.', 'Ấn tượng tiêu cực ban đầu làm sai lệch đánh giá tổng thể.', 'Ứng dụng có thiết kế đẹp thường được đầu tư về tính năng.', 'Màu sắc ảnh hưởng đến trải nghiệm người dùng.'], correctIndex: 1, explanation: 'Ghét cái vỏ bỏ luôn cái ruột.' },
      { id: 'q10_3', type: 'scenario', scenario: 'Thấy người xăm trổ, bạn nghĩ ngay họ là dân gian giang hồ.', options: ['Hình xăm thường gắn với văn hóa giới giang hồ.', 'Xã hội có định kiến mạnh về mối liên hệ giữa xăm và tội phạm.', 'Sự xuất hiện của hình xăm tạo ấn tượng về con người nổi loạn.', 'Người xăm trổ thường có tâm lý bất ổn, dễ vi phạm pháp luật.'], correctIndex: 1, explanation: 'Biểu tượng bị đánh đồng với nhân cách.' },
      { id: 'q10_4', type: 'scenario', scenario: 'Bạn ghét ca sĩ A nên họ làm từ thiện bạn bảo "Làm màu".', options: ['Người nổi tiếng thường làm từ thiện để đánh bóng tên tuổi.', 'Cảm xúc tiêu cực khiến ta nghi ngờ mọi hành động của họ.', 'Hoạt động từ thiện của nghệ sĩ thường mang tính quảng cáo.', 'Những người có scandal thường dùng từ thiện để chuộc lỗi.'], correctIndex: 1, explanation: 'Thông tin tích cực bị bộ lọc ghét bỏ triệt tiêu.' },
      { id: 'q10_5', type: 'scenario', scenario: 'Quán ăn bị bốt phốt 1 lần, bạn thề không bao giờ quay lại.', options: ['Một lần sai sót cho thấy quán không đảm bảo vệ sinh.', 'Ấn tượng xấu từ một lần trải nghiệm rất khó để thay đổi.', 'Những quán bị phốt thường có vấn đề nghiêm trọng về chất lượng.', 'Người tiêu dùng cần tránh xa địa chỉ đã từng gây thất vọng.'], correctIndex: 1, explanation: 'Nỗi đau từ mỏ neo xấu cực kỳ khó xóa.' },
      { id: 'q10_6', type: 'scenario', scenario: 'Bạn thấy người ăn mặc xuề xòa đi xem xe hơi, bạn mặc định họ nghèo.', options: ['Cách ăn mặc phản ánh thu nhập và địa vị.', 'Người giàu có xu hướng chăm chút ngoại hình hơn.', 'Đánh giá dựa trên vẻ bề ngoài dễ dẫn đến kết luận sai lầm.', 'Khách hàng tiềm năng thường ăn mặc lịch sự khi đến showroom.'], correctIndex: 2, explanation: 'Đừng nhìn mặt bắt hình dong.' },
      { id: 'q10_7', type: 'scenario', scenario: 'Sếp mắng bạn 1 lần, từ đó bạn thấy sếp làm gì cũng hắc ám.', options: ['Sếp có tính cách độc đoán, hay gây áp lực.', 'Một trải nghiệm tiêu cực làm sai lệch nhận định về người đó.', 'Những người dễ nổi nóng thường có vấn đề về đạo đức.', 'Sếp đã thể hiện bản chất thật sau một lần mất bình tĩnh.'], correctIndex: 1, explanation: 'Cảm xúc tiêu cực bóp méo nhận thức.' },
      { id: 'q10_8', type: 'scenario', scenario: 'Thám tử đối mặt với nghi phạm có tiền án tiền sự.', options: ['Người có tiền án dễ tái phạm hơn người bình thường.', 'Quá khứ phạm tội là yếu tố quan trọng xác định nghi phạm.', 'Không nên vội kết luận chỉ dựa vào tiền sử của nghi phạm.', 'Hồ sơ tiền án cung cấp thông tin quan trọng về xu hướng hành vi.'], correctIndex: 2, explanation: 'Quá khứ xấu không có nghĩa là vụ này cũng sai.' }
    ]
  },
  {
    id: 'q11',
    title: 'IKEA',
    regionId: 'r2',
    requiredLevel: 11,
    xpReward: 120,
    gemReward: 6,
    questions: [
      { id: 'q11_1', type: 'scenario', scenario: 'Mất 4 tiếng lắp cái kệ IKEA méo mó, bạn thề không bao giờ vứt nó.', options: ['Đồ tự tay làm luôn có giá trị tinh thần đặc biệt.', 'Thời gian và công sức bỏ ra khiến ta gắn bó với sản phẩm.', 'Kệ IKEA có thiết kế thông minh và độ bền cao.', 'Món đồ đã dùng lâu ngày tạo cảm giác thân thuộc.'], correctIndex: 1, explanation: 'Công sức tỉ lệ thuận với niềm tin giá trị.' },
      { id: 'q11_2', type: 'scenario', scenario: 'Bạn nấu mì tôm mặn chát vẫn thấy ngon hơn ngoài tiệm.', options: ['Món tự nấu luôn hợp khẩu vị hơn đồ bên ngoài.', 'Cảm giác hài lòng khi tự tay chuẩn bị bữa ăn.', 'Nguyên liệu tự chọn lựa đảm bảo chất lượng hơn.', 'Không gian ăn uống tại nhà thoải mái, riêng tư.'], correctIndex: 1, explanation: 'Não tự lừa vị giác vì công lao đã bỏ ra.' },
      { id: 'q11_3', type: 'scenario', scenario: 'Startup cho khách tự thiết kế giày, khách yêu đôi đó gấp 3.', options: ['Sản phẩm cá nhân hóa phù hợp với sở thích riêng.', 'Quá trình tham gia thiết kế tạo sự gắn kết với sản phẩm.', 'Chất lượng giày tự thiết kế thường cao hơn giày có sẵn.', 'Khách hàng được trải nghiệm cảm giác sáng tạo thú vị.'], correctIndex: 1, explanation: 'Sự tham gia tạo ra gắn kết.' },
      { id: 'q11_4', type: 'scenario', scenario: 'Bạn viết một đoạn văn dở tệ nhưng đọc lại thấy hay nức lòng.', options: ['Tác phẩm của mình luôn có giá trị riêng không thể so sánh.', 'Công sức bỏ ra khiến ta đánh giá cao sản phẩm của mình.', 'Người viết thường có cái nhìn khách quan về tác phẩm.', 'Quá trình sáng tạo mang lại niềm vui và sự tự hào.'], correctIndex: 1, explanation: 'Mình "đẻ" ra thì luôn thấy trân quý.' },
      { id: 'q11_5', type: 'scenario', scenario: 'Sao các app hay nhờ bạn hoàn thành hồ sơ từng bước?', options: ['Giúp người dùng không bị quá tải thông tin khi đăng ký.', 'Chia nhỏ công việc để người dùng dễ bắt đầu và hoàn thành.', 'Thu thập dữ liệu từng phần để phân tích hành vi.', 'Tạo trải nghiệm tương tác thú vị và chuyên nghiệp.'], correctIndex: 1, explanation: 'Khi đã tốn công, bạn sẽ khó từ bỏ.' },
      { id: 'q11_6', type: 'scenario', scenario: 'Bạn tự đóng cái bàn gỗ lệch chân và mang đi khoe cả xóm.', options: ['Niềm vui khi tự tay tạo ra vật dụng hữu ích.', 'Sự tự hào về thành quả lao động của bản thân.', 'Muốn nhận được sự công nhận từ người xung quanh.', 'Cảm thấy sản phẩm tự làm có giá trị cao hơn thực tế.'], correctIndex: 3, explanation: 'Định giá cao phi thực tế.' },
      { id: 'q11_7', type: 'scenario', scenario: 'Tại sao đồ LEGO đắt mà vẫn được yêu thích?', options: ['Chất liệu nhựa an toàn và độ bền cao.', 'Trẻ em thích thú với việc tự tay lắp ráp mô hình.', 'Quá trình xây dựng tạo cảm giác thành tựu và gắn kết.', 'Sản phẩm có tính giáo dục và phát triển tư duy.'], correctIndex: 2, explanation: 'Mỗi miếng ghép là một nỗ lực.' },
      { id: 'q11_8', type: 'scenario', scenario: 'Thám tử tự tay vẽ chân dung hung thủ.', options: ['Phác thảo giúp hình dung rõ hơn về đối tượng.', 'Việc tự vẽ có thể khiến thám tử thiếu khách quan.', 'Chân dung được vẽ chi tiết hơn ảnh chụp từ camera.', 'Kỹ năng vẽ là công cụ hữu ích trong điều tra.'], correctIndex: 1, explanation: 'Đừng quá yêu sản phẩm của chính mình.' }
    ]
  },
  // ... (các quiz còn lại từ q12 đến q48 sẽ được viết tương tự với correctIndex phân bố ngẫu nhiên 0-3)
];