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
  // VÙNG 2 tiếp theo
  {
    id: 'q12',
    title: 'Cảm xúc',
    regionId: 'r2',
    requiredLevel: 12,
    xpReward: 140,
    gemReward: 7,
    questions: [
      { id: 'q12_1', type: 'scenario', scenario: 'Đúng lúc đang hưng phấn vì được thưởng, bạn quyết định mua sắm sạch túi.', options: ['Cảm xúc tốt làm mình xứng đáng được thưởng.', 'Vui quá nên lý trí tạm nghỉ, dễ chi tiêu bốc đồng.', 'Tiền để dành cũng để tiêu, mua gì chẳng được.', 'Cơ hội tốt không nên bỏ lỡ khi đang có hứng.'], correctIndex: 1, explanation: 'Vui quá là lúc lý trí nghỉ giải lao.' },
      { id: 'q12_2', type: 'scenario', scenario: 'Bạn đang bực mình nên dự án sếp giao bạn thấy toàn rủi ro.', options: ['Tâm trạng tiêu cực làm phóng đại nguy cơ.', 'Dự án mới nào cũng có rủi ro cần đánh giá.', 'Cảm xúc cá nhân ảnh hưởng đến góc nhìn về công việc.', 'Sự tức giận khiến mình thiếu khách quan.'], correctIndex: 0, explanation: 'Tâm trạng xấu bóp méo đánh giá rủi ro.' },
      { id: 'q12_3', type: 'scenario', scenario: 'Quảng cáo xe có cảnh gia đình cười hạnh phúc, bạn muốn mua ngay.', options: ['Xe tốt vì được quảng cáo với hình ảnh đẹp.', 'Cảm xúc vui vẻ từ quảng cáo gắn liền với sản phẩm.', 'Gia đình hạnh phúc là điều ai cũng mong muốn.', 'Xe hơi là phương tiện quan trọng cho gia đình.'], correctIndex: 1, explanation: 'Cảm xúc "hạnh phúc" bị dính vào cái xe.' },
      { id: 'q12_4', type: 'scenario', scenario: 'Bạn thù ghét một hãng điện thoại nên họ làm gì bạn cũng chê.', options: ['Cảm xúc tiêu cực chi phối cách đánh giá.', 'Hãng đó thực sự có chất lượng kém hơn.', 'Cạnh tranh trên thị trường tạo thành kiến.', 'Trải nghiệm tồi trước đây ảnh hưởng nhận định.'], correctIndex: 0, explanation: 'Sự yêu/ghét đi trước mọi phân tích.' },
      { id: 'q12_5', type: 'scenario', scenario: 'Chốt đơn vì “Thích thì nhích” bất chấp nợ nần.', options: ['Đam mê là quan trọng nhất.', 'Cảm xúc nhất thời dẫn đến quyết định thiếu cân nhắc.', 'Không nên để lo lắng tài chính cản trở niềm vui.', 'Cơ hội tốt cần nắm bắt ngay.'], correctIndex: 1, explanation: 'Quyết định theo rung động.' },
      { id: 'q12_6', type: 'scenario', scenario: 'Tại sao quán nhậu hay bật nhạc sôi động?', options: ['Âm nhạc tạo không khí vui, kích thích khách gọi nhiều hơn.', 'Khách thích không gian náo nhiệt khi tụ tập.', 'Âm thanh lớn làm giảm khả năng kiểm soát hành vi.', 'Tạo ấn tượng quán trẻ trung, năng động.'], correctIndex: 0, explanation: 'Âm nhạc là vũ khí thao túng phán đoán.' },
      { id: 'q12_7', type: 'scenario', scenario: 'Bạn đồng ý cho vay tiền sau khi vừa được ăn một bữa ngon tuyệt.', options: ['Cảm xúc tích cực làm tăng tính hào phóng.', 'Bữa ăn ngon thể hiện sự tử tế của người mời.', 'Lòng biết ơn khiến sẵn sàng đáp lại.', 'Mối quan hệ tốt nên được vun đắp qua giúp đỡ.'], correctIndex: 0, explanation: 'Dạ dày no, lý trí lỏng lẻo.' },
      { id: 'q12_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án kinh dị, thấy buồn nôn và muốn về ngay.', options: ['Phản ứng cảm xúc mạnh cản trở quan sát khách quan.', 'Hiện trường rùng rợn thường khiến điều tra viên mất bình tĩnh.', 'Sợ hãi là phản ứng tự nhiên trước cái chết thương tâm.', 'Cần giữ khoảng cách để tránh ám ảnh tâm lý.'], correctIndex: 0, explanation: 'Phải gạt bỏ cảm xúc mới thấy được manh mối.' }
    ]
  },
  {
    id: 'q13',
    title: 'Tê liệt',
    regionId: 'r2',
    requiredLevel: 13,
    xpReward: 160,
    gemReward: 8,
    questions: [
      { id: 'q13_1', type: 'scenario', scenario: 'Đứng trước 100 vị trà sữa, bạn mất 15 phút chưa chọn được gì.', options: ['Quá nhiều lựa chọn khiến việc quyết định khó khăn.', 'Bạn cầu toàn nên cần cân nhắc kỹ.', 'Sở thích đa dạng nên khó chọn một thứ.', 'Các quán có chất lượng không đồng đều.'], correctIndex: 0, explanation: 'Càng nhiều lựa chọn càng gây tê liệt.' },
      { id: 'q13_2', type: 'scenario', scenario: 'Sau khi mua 1 cái áo trong số 50 cái, bạn cứ nghĩ “biết thế mua cái kia”.', options: ['Luôn có sự so sánh sau khi quyết định.', 'Tâm lý tiếc nuối khi có quá nhiều phương án.', 'Sản phẩm chọn không đáp ứng kỳ vọng.', 'Bạn dễ bị ảnh hưởng bởi ý kiến người khác.'], correctIndex: 1, explanation: 'Nhiều lựa chọn làm giảm sự hài lòng.' },
      { id: 'q13_3', type: 'scenario', scenario: 'Menu quán Michelin chỉ có 3 món và bạn thấy rất yên tâm.', options: ['Số lượng ít thể hiện tập trung vào chất lượng.', 'Quyết định dễ dàng hơn khi có ít lựa chọn.', 'Thực đơn đơn giản phù hợp ẩm thực cao cấp.', 'Nhà hàng uy tín chỉ phục vụ món thế mạnh.'], correctIndex: 1, explanation: 'Ít là nhiều.' },
      { id: 'q13_4', type: 'scenario', scenario: 'Lướt Netflix 30 phút rồi… tắt máy đi ngủ.', options: ['Nội dung không đủ hấp dẫn.', 'Quá nhiều phim khiến không biết chọn xem gì.', 'Mệt mỏi trước khi quyết định được bộ phim.', 'Thời gian tìm kiếm chiếm hết thời gian xem.'], correctIndex: 1, explanation: 'Não đình công trước ma trận tùy chọn.' },
      { id: 'q13_5', type: 'scenario', scenario: 'Tại sao các gói cước mobile hay chỉ có 3-4 mức giá chính?', options: ['Giúp khách dễ so sánh và lựa chọn.', 'Doanh nghiệp tiết kiệm chi phí quản lý.', 'Số lượng ít làm tăng khả năng chốt đơn.', 'Thị trường viễn thông có quy định số lượng.'], correctIndex: 0, explanation: 'Đơn giản hóa để chốt đơn nhanh.' },
      { id: 'q13_6', type: 'scenario', scenario: 'Bạn thấy hạnh phúc khi được tặng quà ngẫu nhiên hơn là tự đi chọn.', options: ['Sự bất ngờ mang lại cảm xúc tích cực.', 'Được tặng quà thể hiện sự quan tâm.', 'Việc chọn lựa gây áp lực và lo lắng.', 'Quà tặng có giá trị tinh thần cao hơn.'], correctIndex: 2, explanation: 'Lựa chọn là một gánh nặng tâm lý.' },
      { id: 'q13_7', type: 'scenario', scenario: 'Tại sao Mark Zuckerberg hay mặc đúng một kiểu áo xám?', options: ['Tiết kiệm thời gian cho quyết định quan trọng.', 'Phong cách tối giản là xu hướng công nghệ.', 'Chọn trang phục hàng ngày gây hao tổn tinh thần.', 'Đồng phục giúp tạo dựng hình ảnh cá nhân.'], correctIndex: 0, explanation: 'Để dành não cho việc quan trọng.' },
      { id: 'q13_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án có 1000 nghi phạm.', options: ['Số lượng lớn làm phức tạp điều tra.', 'Cần thu hẹp phạm vi để tập trung nguồn lực.', 'Khối lượng công việc lớn dễ gây tê liệt phân tích.', 'Phân loại và ưu tiên đối tượng là bước đầu.'], correctIndex: 2, explanation: 'Phải thu hẹp phạm vi mới tìm được hung thủ.' }
    ]
  },
  {
    id: 'q14',
    title: 'Kỳ vọng',
    regionId: 'r2',
    requiredLevel: 14,
    xpReward: 180,
    gemReward: 9,
    questions: [
      { id: 'q14_1', type: 'scenario', scenario: 'Sếp bảo: “Anh tin em tài năng”, thế là em phá án nhanh gấp đôi.', options: ['Lời động viên tạo động lực làm việc.', 'Sự kỳ vọng từ cấp trên thúc đẩy nỗ lực.', 'Niềm tin vào bản thân được củng cố.', 'Trách nhiệm với sự tin tưởng khiến cố gắng hết sức.'], correctIndex: 1, explanation: 'Kỳ vọng tích cực đẩy giới hạn con người.' },
      { id: 'q14_2', type: 'scenario', scenario: 'Bố mẹ luôn bảo con vô dụng, sau này con thành… vô dụng thật.', options: ['Lời nói cha mẹ ảnh hưởng lớn đến trẻ.', 'Đánh giá tiêu cực lặp lại hình thành niềm tin sai.', 'Trẻ em dễ bị ảnh hưởng bởi kỳ vọng người lớn.', 'Sự thiếu tin tưởng làm giảm động lực phấn đấu.'], correctIndex: 1, explanation: 'Gán nhãn tương lai cho một đứa trẻ.' },
      { id: 'q14_3', type: 'scenario', scenario: 'Bạn dạy chó và tin nó thông minh nhất xóm, nó học cực nhanh.', options: ['Niềm tin của người dạy ảnh hưởng cách huấn luyện.', 'Kỳ vọng tích cực tạo môi trường học tốt.', 'Chó cảm nhận được thái độ của chủ.', 'Phương pháp huấn luyện thay đổi theo niềm tin.'], correctIndex: 1, explanation: 'Năng lượng tích cực truyền sang đối tượng.' },
      { id: 'q14_4', type: 'scenario', scenario: 'Bác sĩ nói “Thuốc này cực xịn”, bạn uống thấy đỡ hẳn dù là thuốc cảm thường.', options: ['Niềm tin vào hiệu quả thuốc tạo tác động tích cực.', 'Sự tin tưởng vào chuyên môn bác sĩ giúp điều trị hiệu quả.', 'Tâm lý thoải mái khi được dùng thuốc tốt hỗ trợ hồi phục.', 'Kỳ vọng kết quả ảnh hưởng đến cảm nhận cơ thể.'], correctIndex: 0, explanation: 'Niềm tin chữa lành cơ thể.' },
      { id: 'q14_5', type: 'scenario', scenario: 'Trong thí nghiệm, chuột “Thần đồng” chạy nhanh hơn chuột “Thường” dù giống hệt.', options: ['Kỳ vọng người thực hiện ảnh hưởng cách đối xử.', 'Chuột được gắn nhãn tích cực nhận chăm sóc tốt hơn.', 'Thái độ quan sát vô thức tác động kết quả thí nghiệm.', 'Kỳ vọng tạo thay đổi hành vi người thực hiện.'], correctIndex: 0, explanation: 'Thái độ quan sát định hình kết quả.' },
      { id: 'q14_6', type: 'scenario', scenario: 'Bạn dán nhãn đồng nghiệp là “Cú đêm”, họ bắt đầu làm tốt hơn vào tối.', options: ['Nhãn hiệu ảnh hưởng cách người khác nhìn nhận.', 'Con người điều chỉnh hành vi để phù hợp kỳ vọng.', 'Kỳ vọng tạo cơ hội thể hiện đúng nhãn.', 'Cảm giác được công nhận thúc đẩy nỗ lực.'], correctIndex: 1, explanation: 'Con người có xu hướng khớp với nhãn.' },
      { id: 'q14_7', type: 'scenario', scenario: 'Một lời động viên đúng lúc trị giá hơn ngàn vàng.', options: ['Sự công nhận có tác dụng thúc đẩy tinh thần.', 'Lời khích lệ giúp người nhận tin vào khả năng.', 'Động lực từ bên ngoài tạo hiệu ứng tích cực.', 'Sự quan tâm đúng lúc tạo ảnh hưởng lớn.'], correctIndex: 1, explanation: 'Kỳ vọng là cú hích tâm lý mạnh nhất.' },
      { id: 'q14_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án bế tắc và tự nhủ “Mình sẽ không bao giờ tìm ra”.', options: ['Suy nghĩ tiêu cực làm giảm động lực và nỗ lực.', 'Tự tạo áp lực dẫn đến chán nản, bỏ cuộc.', 'Niềm tin thất bại khiến không cố gắng hết sức.', 'Dự đoán xấu ảnh hưởng cách tiếp cận vấn đề.'], correctIndex: 0, explanation: 'Kỳ vọng thấp dẫn đến nỗ lực thấp.' }
    ]
  },
  {
    id: 'q15',
    title: 'Spotlight',
    regionId: 'r2',
    requiredLevel: 15,
    xpReward: 200,
    gemReward: 10,
    questions: [
      { id: 'q15_1', type: 'scenario', scenario: 'Bạn dính vết bẩn trên áo và thề là cả thiên hạ đang nhìn chằm chằm.', options: ['Mọi người chú ý đến điểm bất thường trên người khác.', 'Chúng ta nghĩ mình là trung tâm của sự chú ý.', 'Vết bẩn dễ bị phát hiện nhất.', 'Sự tự ti khiến phóng đại mức độ quan tâm.'], correctIndex: 1, explanation: 'Ta luôn nghĩ mình là tâm điểm, thực ra chả ai quan tâm.' },
      { id: 'q15_2', type: 'scenario', scenario: 'Lỡ miệng nói hố, bạn mất ngủ 3 đêm vì nhục, trong khi mọi người đã quên.', options: ['Sai lầm của bản thân có tác động lớn hơn thực tế.', 'Người khác ít khi nhớ lâu về lỗi lầm của ta.', 'Xấu hổ khiến ta tập trung quá mức vào sai lầm.', 'Mọi người bận rộn với cuộc sống của họ.'], correctIndex: 1, explanation: 'Cái tôi quá lớn nên tưởng lỗi lầm nào cũng vĩ đại.' },
      { id: 'q15_3', type: 'scenario', scenario: 'Bạn đi gym và sợ mọi người cười vì mình tập sai tư thế.', options: ['Người tập gym hay quan sát đánh giá kỹ thuật người khác.', 'Nỗi sợ bị đánh giá khiến cảm thấy mọi ánh mắt hướng về mình.', 'Tập sai tư thế là vấn đề phổ biến của người mới.', 'Phòng tập là nơi mọi người thường so sánh.'], correctIndex: 1, explanation: 'Sự thật: Ai cũng bận nhìn mình trong gương rồi.' },
      { id: 'q15_4', type: 'scenario', scenario: 'Thuyết trình xong bạn thấy mình tệ, dù khán giả thấy ổn.', options: ['Tự đánh giá khắt khe hơn người ngoài.', 'Khán giả không đủ chuyên môn đánh giá.', 'Bạn tập trung vào sai sót nhỏ người khác không để ý.', 'Lo lắng làm sai lệch nhận thức về hiệu suất.'], correctIndex: 2, explanation: 'Tự soi mình quá kỹ.' },
      { id: 'q15_5', type: 'scenario', scenario: 'Tại sao người ta hay đỏ mặt khi bị lộ một lỗi nhỏ?', options: ['Phản ứng cơ thể trước cảm giác bị phơi bày.', 'Sợ bị đánh giá thấp vì sai lầm nhỏ.', 'Xấu hổ khi nghĩ mọi người đang chú ý.', 'Lo lắng về hậu quả dù không quan trọng.'], correctIndex: 2, explanation: 'Vỡ trận tâm lý do tưởng mình bị soi.' },
      { id: 'q15_6', type: 'scenario', scenario: 'Bạn mặc lại bộ đồ cũ và lo đồng nghiệp biết, thực ra họ chả nhớ.', options: ['Mọi người quá bận với công việc riêng.', 'Trang phục người khác không phải điều đáng nhớ.', 'Tự ti về ngoại hình khiến nghĩ người khác cũng để ý.', 'Phóng đại tầm quan trọng của bản thân trong mắt người khác.'], correctIndex: 3, explanation: 'Thế giới xoay quanh chính họ, không phải bạn.' },
      { id: 'q15_7', type: 'scenario', scenario: 'Để bớt run khi đứng trước đám đông, bạn nên nhớ:', options: ['Mọi người đến để nghe nội dung, không đánh giá bạn.', 'Khán giả tập trung vào thông điệp hơn người trình bày.', 'Hầu hết mọi người bận tâm đến bản thân để chú ý bạn.', 'Sai sót nhỏ không ảnh hưởng chất lượng bài thuyết trình.'], correctIndex: 2, explanation: 'Phá vỡ ánh đèn sân khấu ảo.' },
      { id: 'q15_8', type: 'scenario', scenario: 'Thám tử làm đổ một ly nước, cảm thấy rất xấu hổ.', options: ['Xấu hổ làm phân tâm khỏi mục tiêu chính.', 'Cần tập trung vào nhiệm vụ thay vì lo lắng sai sót.', 'Vụng về có thể xảy ra với bất kỳ ai.', 'Đừng để chuyện nhỏ ảnh hưởng hiệu quả công việc.'], correctIndex: 1, explanation: 'Quên cái tôi đi mới thấy được cái chung.' }
    ]
  },
  {
    id: 'q16',
    title: 'Của mình',
    regionId: 'r2',
    requiredLevel: 16,
    xpReward: 220,
    gemReward: 12,
    questions: [
      { id: 'q16_1', type: 'scenario', scenario: 'Bạn đòi bán áo rách giá 200k, dù giá mới 100k, vì “áo kỷ niệm”.', options: ['Đồ vật gắn kỷ niệm có giá trị tinh thần cao.', 'Người sở hữu đánh giá cao đồ của mình hơn người khác.', 'Áo kỷ niệm không thể thay thế.', 'Giá trị cảm xúc khiến khó định giá khách quan.'], correctIndex: 1, explanation: 'Sở hữu thứ gì là ta tự nâng giá nó lên.' },
      { id: 'q16_2', type: 'scenario', scenario: 'Cho mượn xe máy, bạn lo họ làm hỏng dù xe cũ mèm.', options: ['Người khác không cẩn thận với đồ không phải của họ.', 'Giá trị đồ vật tăng lên trong mắt người sở hữu.', 'Xe cũ vẫn có giá trị sử dụng và tình cảm gắn bó.', 'Lo lắng về tài sản cá nhân là điều dễ hiểu.'], correctIndex: 1, explanation: 'Quý trọng tài sản cá nhân phi lý.' },
      { id: 'q16_3', type: 'scenario', scenario: 'Tại sao các app hay cho dùng thử miễn phí 30 ngày?', options: ['Giúp người dùng trải nghiệm đầy đủ tính năng.', 'Sau thời gian dùng, người dùng khó từ bỏ sản phẩm.', 'Thói quen sử dụng hình thành sau 30 ngày.', 'Người dùng thấy mất mát khi không còn được dùng miễn phí.'], correctIndex: 1, explanation: 'Nắm giữ 30 ngày là coi như của mình rồi.' },
      { id: 'q16_4', type: 'scenario', scenario: 'Bạn từ chối đổi điện thoại mới dù được tặng, vì “quen tay”.', options: ['Sự quen thuộc tạo cảm giác an toàn, khó thay đổi.', 'Điện thoại mới có nhiều tính năng không cần thiết.', 'Chuyển dữ liệu và làm quen thiết bị mới tốn thời gian.', 'Gắn bó với vật dụng khiến đánh giá cao hơn giá trị thực.'], correctIndex: 3, explanation: 'Sự gắn kết làm mờ đi lợi ích mới.' },
      { id: 'q16_5', type: 'scenario', scenario: 'Khi bán nhà, chủ luôn hét giá cao hơn 20-30% thị trường.', options: ['Nhà đất luôn có tiềm năng tăng giá.', 'Người bán tính cả giá trị tình cảm và kỷ niệm.', 'Mỗi ngôi nhà có đặc điểm riêng khó định giá.', 'Chi phí cải tạo nhà thường bị người mua bỏ qua.'], correctIndex: 1, explanation: 'Họ cộng thêm giá trị cảm xúc cho người mua.' },
      { id: 'q16_6', type: 'scenario', scenario: 'Bạn đau lòng khi vứt bỏ một tờ lịch cũ.', options: ['Đồ vật gắn bó lâu tạo cảm giác khó rời xa.', 'Mỗi vật dụng đều có kỷ niệm riêng.', 'Vứt đồ đồng nghĩa từ bỏ quá khứ.', 'Tiếc nuối khi mất thứ mình sở hữu là cảm xúc tự nhiên.'], correctIndex: 3, explanation: 'Tâm lý không muốn đánh mất sở hữu.' },
      { id: 'q16_7', type: 'scenario', scenario: 'Phần thưởng cho việc nắm giữ cái cũ là gì?', options: ['Cảm giác an toàn với những gì quen thuộc.', 'Sự tiếc nuối khi bỏ lỡ cơ hội đổi mới.', 'Giá trị tinh thần từ kỷ niệm gắn liền.', 'Cơ hội trải nghiệm mới bị bỏ lỡ.'], correctIndex: 3, explanation: 'Bẫy tâm lý ngăn cản nâng cấp.' },
      { id: 'q16_8', type: 'scenario', scenario: 'Thám tử bước vào nhà nghi phạm và mượn một món đồ vật.', options: ['Mượn đồ để tạo áp lực tâm lý.', 'Đồ vật có thể chứa thông tin quan trọng.', 'Mượn đồ khiến nghi phạm lo lắng về tài sản.', 'Quan sát phản ứng khi bị lấy đi đồ vật.'], correctIndex: 2, explanation: 'Vật cũ có thể khui ra nhiều bí mật.' }
    ]
  },

  // ===================== VÙNG 3: DẮT MŨI =====================
  {
    id: 'q17',
    title: 'Bầy đàn',
    regionId: 'r3',
    requiredLevel: 17,
    xpReward: 240,
    gemReward: 4,
    questions: [
      { id: 'q17_1', type: 'scenario', scenario: 'Thấy hàng dài xếp mua bánh mì, dù không đói bạn vẫn xếp hàng theo.', options: ['Hàng đông là dấu hiệu sản phẩm chất lượng.', 'Tò mò về thứ thu hút đám đông.', 'Muốn trải nghiệm xem sản phẩm có tốt không.', 'Nhiều người cùng làm tạo cảm giác an toàn, đúng đắn.'], correctIndex: 3, explanation: 'Người ta làm thì mình cũng làm – tâm lý bầy đàn.' },
      { id: 'q17_2', type: 'scenario', scenario: 'Bạn mua cổ phiếu X vì thấy ai cũng nhắc trên mạng.', options: ['Thông tin cộng đồng là nguồn tham khảo đáng tin.', 'Số đông thường đúng trong quyết định đầu tư.', 'Sự quan tâm nhiều cho thấy tiềm năng.', 'Bị ảnh hưởng bởi xu hướng mà không phân tích.'], correctIndex: 3, explanation: 'Bỏ qua phân tích để theo số đông.' },
      { id: 'q17_3', type: 'scenario', scenario: 'Cuộc họp ai cũng đồng ý với sếp, bạn dù thấy sai vẫn giơ tay.', options: ['Đồng thuận giúp cuộc họp kết thúc nhanh.', 'Không muốn là người duy nhất có ý kiến khác.', 'Sếp có kinh nghiệm, quyết định đúng.', 'Áp lực hòa nhập khiến che giấu quan điểm.'], correctIndex: 3, explanation: 'Sợ khác biệt so với nhóm.' },
      { id: 'q17_4', type: 'scenario', scenario: 'Tại sao video TikTok hay hiện số lượt xem khủng?', options: ['Hiển thị số lớn để thu hút thêm người xem.', 'Số lượt xem là thước đo chất lượng.', 'Người dùng có xu hướng xem video đã được nhiều người xem.', 'Số cao tạo hiệu ứng lan truyền mạnh.'], correctIndex: 2, explanation: 'Số đông là bằng chứng giá trị ảo.' },
      { id: 'q17_5', type: 'scenario', scenario: 'Bạn đổi kiểu tóc kỳ quặc vì “giới trẻ đang chuộng”.', options: ['Muốn hòa nhập với xu hướng cộng đồng.', 'Kiểu mới thể hiện năng động, bắt kịp thời đại.', 'Thay đổi theo số đông để tránh bị đánh giá lỗi thời.', 'Dễ bị ảnh hưởng bởi những gì đang phổ biến.'], correctIndex: 3, explanation: 'Đu trend bất chấp bản sắc.' },
      { id: 'q17_6', type: 'scenario', scenario: 'Quán vắng bạn không vào, quán đông bạn sẵn sàng chờ 1 tiếng.', options: ['Quán đông chứng tỏ đồ ngon, dịch vụ tốt.', 'Sự đông đúc tạo cảm giác yên tâm.', 'Tin số đông đánh giá chính xác hơn.', 'Quyết định dựa trên hành vi người khác giảm rủi ro.'], correctIndex: 3, explanation: 'Đông người là bằng chứng an toàn ảo.' },
      { id: 'q17_7', type: 'scenario', scenario: 'Hiệu ứng đoàn tàu thường dẫn đến hậu quả gì?', options: ['Tạo quyết định sáng suốt nhờ học hỏi số đông.', 'Mọi người mất khả năng đánh giá độc lập.', 'Lan tỏa thông tin hữu ích trong cộng đồng.', 'Thúc đẩy gắn kết và đồng thuận xã hội.'], correctIndex: 1, explanation: 'Mất khả năng tư duy độc lập.' },
      { id: 'q17_8', type: 'scenario', scenario: 'Thám tử bước vào đám đông đang hô hào đuổi bắt một người.', options: ['Cần can thiệp ngăn chặn hành vi quá khích.', 'Đám đông dễ bị kích động và thiếu khách quan.', 'Phải xác minh thông tin trước khi kết luận.', 'Sự việc cần xử lý theo quy trình pháp luật.'], correctIndex: 1, explanation: 'Đám đông thường hung hãn và thiếu lý trí.' }
    ]
  },
  {
    id: 'q18',
    title: 'Một chân',
    regionId: 'r3',
    requiredLevel: 18,
    xpReward: 260,
    gemReward: 5,
    questions: [
      { id: 'q18_1', type: 'scenario', scenario: 'Ai đó nhờ bạn giữ hộ đồ 1 phút, sau đó nhờ bạn trông hộ 1 tiếng. Bạn đồng ý.', options: ['Bạn tốt bụng, sẵn sàng giúp đỡ.', 'Việc nhỏ dễ đồng ý, sau khó từ chối việc lớn.', 'Không muốn phá vỡ hình ảnh người tốt.', 'Lòng tốt khiến khước từ lời nhờ vả chính đáng.'], correctIndex: 1, explanation: 'Đồng ý việc nhỏ dẫn đến việc lớn.' },
      { id: 'q18_2', type: 'scenario', scenario: 'App bắt bạn đăng ký dùng thử 0đ, sau 7 ngày nó tự trừ 1 triệu.', options: ['Đã đồng ý điều khoản khi đăng ký.', 'Bắt đầu sử dụng tạo cảm giác khó dừng.', 'Cảm thấy đã cam kết nên phải thanh toán.', 'App khai thác tâm lý muốn nhất quán với hành động ban đầu.'], correctIndex: 1, explanation: 'Một khi đã “mở cửa” thì rất khó đóng lại.' },
      { id: 'q18_3', type: 'scenario', scenario: 'Bạn đồng ý ký tên ủng hộ môi trường, sau đó họ nhờ bạn quyên góp.', options: ['Sau cam kết, muốn hành động nhất quán.', 'Quyên góp là cơ hội thể hiện trách nhiệm xã hội.', 'Không muốn bị coi là không giữ lời hứa.', 'Ủng hộ ban đầu khiến dễ đồng ý yêu cầu tiếp theo.'], correctIndex: 3, explanation: 'Hành động nhỏ tạo ra trách nhiệm lớn.' },
      { id: 'q18_4', type: 'scenario', scenario: 'Người bán hàng nhờ bạn mặc thử áo, sau đó ép bạn mua.', options: ['Thử đồ tạo cảm giác sở hữu tạm thời, khó trả lại.', 'Ngại khi đã làm phiền mà không mua.', 'Sau khi thử, dễ bị thuyết phục về sự phù hợp.', 'Cảm giác có trách nhiệm với sản phẩm đã thử.'], correctIndex: 1, explanation: 'Đã thử là đã bắt đầu “đồng ý”.' },
      { id: 'q18_5', type: 'scenario', scenario: 'Để mượn 10 triệu, bạn nên mượn 100k trước.', options: ['Xây dựng thói quen cho vay số nhỏ trước.', 'Người cho vay dễ đồng ý khoản nhỏ, sau khó từ chối khoản lớn.', 'Tạo lòng tin qua giao dịch nhỏ.', 'Sự nhất quán trong hành vi giúp thuyết phục.'], correctIndex: 1, explanation: 'Xây dựng thói quen “đồng ý” cho đối phương.' },
      { id: 'q18_6', type: 'scenario', scenario: 'Tại sao khảo sát hay bắt đầu bằng câu hỏi Có/Không dễ dàng?', options: ['Giúp người tham gia làm quen với hình thức.', 'Tạo thói quen trả lời “có” trước khi vào câu hỏi chính.', 'Lọc người thực sự quan tâm.', 'Câu dễ giúp người tham gia tự tin hơn.'], correctIndex: 1, explanation: 'Giam bạn vào guồng quay câu trả lời.' },
      { id: 'q18_7', type: 'scenario', scenario: 'Khi đã trót làm một việc nhỏ, ta thường cảm thấy…', options: ['Hài lòng và muốn dừng lại.', 'Có trách nhiệm phải làm tiếp việc liên quan.', 'Muốn thay đổi hướng để tránh ràng buộc.', 'Áp lực từ sự nhất quán của bản thân.'], correctIndex: 3, explanation: 'Áp lực của sự nhất quán nội tại.' },
      { id: 'q18_8', type: 'scenario', scenario: 'Thám tử bước vào phòng thẩm vấn và mời nghi phạm một điếu thuốc.', options: ['Tạo không khí thân thiện để nghi phạm thoải mái.', 'Sự tiếp nhận nhỏ mở đường cho hợp tác lớn hơn.', 'Xây dựng quan hệ trước khi vào vấn đề chính.', 'Hành động nhỏ thể hiện thiện chí.'], correctIndex: 1, explanation: 'Một sự nhận lời nhỏ mở đường cho lời khai.' }
    ]
  },
  {
    id: 'q19',
    title: 'Cửa mặt',
    regionId: 'r3',
    requiredLevel: 19,
    xpReward: 280,
    gemReward: 6,
    questions: [
      { id: 'q19_1', type: 'scenario', scenario: 'Bạn nhờ vay 1 tỷ, người ta từ chối, bạn xin vay 10 triệu và họ đồng ý ngay.', options: ['Yêu cầu lớn làm yêu cầu nhỏ sau có vẻ hợp lý.', 'Người nghe đã từ chối một lần nên khó từ chối lần hai.', 'Sự nhượng bộ khiến đối phương cảm thấy có lỗi.', 'So với 1 tỷ, 10 triệu là con số quá nhỏ.'], correctIndex: 0, explanation: 'Yêu cầu cực lớn làm yêu cầu nhỏ trở nên hợp lý.' },
      { id: 'q19_2', type: 'scenario', scenario: 'Con đòi mua iPhone 15 Pro Max, mẹ mắng, con xin mua cái ốp lưng 100k.', options: ['Mẹ vừa từ chối việc lớn nên dễ đồng ý việc nhỏ.', 'Ốp lưng là phụ kiện cần thiết.', 'Con biết thương lượng để đạt mục tiêu.', 'Sự thay đổi yêu cầu khiến mẹ thấy con biết điều.'], correctIndex: 0, explanation: 'Mẹ thấy mình vừa từ chối việc to nên tặc lưỡi cho việc nhỏ.' },
      { id: 'q19_3', type: 'scenario', scenario: 'Tại sao các shop hay treo bảng sale 70% nhưng thực tế toàn sale 10%?', options: ['70% tạo ấn tượng giảm sâu, thu hút chú ý.', 'Khách thấy giảm 10% là chấp nhận sau khi thấy 70% “quá đáng”.', 'Đây là chiêu để khách vào shop.', 'Sự tương phản giữa các mức giảm làm tăng cảm giác hời.'], correctIndex: 3, explanation: 'Sự tương phản làm giảm sự phản kháng.' },
      { id: 'q19_4', type: 'scenario', scenario: 'Sếp bắt làm 10 báo cáo cuối tuần, bạn kêu khổ, sếp bảo “Thôi làm 2 cái thôi”.', options: ['Sếp thực chất chỉ muốn 2 báo cáo từ đầu.', 'Sự phản đối khiến sếp điều chỉnh.', 'Đề xuất yêu cầu cao trước khiến yêu cầu thực tế dễ được chấp nhận.', 'Sếp muốn tạo cảm giác nhượng bộ để bạn vui vẻ.'], correctIndex: 2, explanation: 'Thực ra sếp chỉ cần bạn làm 2 cái.' },
      { id: 'q19_5', type: 'scenario', scenario: 'Người lạ nhờ bạn giúp 1 ngày, bạn từ chối, họ nhờ giúp 5 phút.', options: ['Cảm thấy có lỗi khi từ chối lần đầu nên dễ đồng ý lần sau.', 'Yêu cầu 5 phút quá nhỏ để từ chối sau khi đã từ chối 1 ngày.', 'Sự linh hoạt thể hiện tôn trọng thời gian bạn.', 'Muốn giữ hình ảnh người tốt sau khi từ chối.'], correctIndex: 1, explanation: 'Nhượng bộ tạo ra áp lực đáp lại.' },
      { id: 'q19_6', type: 'scenario', scenario: 'Để thuyết phục thám tử khác, hãy đưa ra phương án điên rồ nhất trước.', options: ['Phương án điên rồ làm giảm sức đề kháng với phương án thực tế.', 'Đối phương thấy phương án thứ hai hợp lý khi so sánh.', 'Tạo ấn tượng bạn đã nghiêm túc xem xét mọi khả năng.', 'Sự khác biệt lớn giữa hai phương án làm mờ điểm yếu của phương án sau.'], correctIndex: 3, explanation: 'Hạ nhiệt sự phòng thủ của đối phương.' },
      { id: 'q19_7', type: 'scenario', scenario: 'Hậu quả của việc bị dính bẫy tương phản là gì?', options: ['Quyết định dựa trên so sánh thay vì giá trị thực.', 'Đồng ý với điều mình không thực sự muốn.', 'Mất khả năng đánh giá khách quan.', 'Bị thao túng để chấp nhận phương án có lợi cho người khác.'], correctIndex: 1, explanation: 'Rơi vào ma trận so sánh giả tạo.' },
      { id: 'q19_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án và yêu cầu “Bắt tất cả mọi người!”', options: ['Yêu cầu vô lý tạo áp lực để đạt sự thỏa hiệp.', 'Sự cực đoan làm lộ diện người có liên quan.', 'Thăm dò phản ứng nghi phạm.', 'Yêu cầu không khả thi dẫn đến đề xuất phương án khả thi hơn.'], correctIndex: 0, explanation: 'Tạo áp lực cực đại để nhận lấy sự thỏa hiệp.' }
    ]
  },
  {
    id: 'q20',
    title: 'Phe ta',
    regionId: 'r3',
    requiredLevel: 20,
    xpReward: 300,
    gemReward: 7,
    questions: [
      { id: 'q20_1', type: 'scenario', scenario: 'Bạn thấy bạn mình sai nhưng vì “cùng phe” nên vẫn bênh chằm chặp.', options: ['Tình bạn quan trọng hơn đúng sai.', 'Thiên vị người cùng nhóm là điều tự nhiên.', 'Không muốn mất lòng bạn.', 'Sai thì cũng phải bảo vệ nhau.'], correctIndex: 1, explanation: 'Thiên vị người cùng nhóm.' },
      { id: 'q20_2', type: 'scenario', scenario: 'Nhân viên cũ ghét nhân viên mới dù họ chưa làm gì sai.', options: ['Ma cũ bắt nạt ma mới là chuyện thường.', 'Não tự tạo ranh giới bọn ta – bọn nó.', 'Nhân viên mới thường kém năng lực.', 'Sợ bị thay thế nên có thái độ.'], correctIndex: 1, explanation: 'Não tự tạo ranh giới bọn ta – bọn nó.' },
      { id: 'q20_3', type: 'scenario', scenario: 'Tại sao các fanclub hay cãi nhau tay đôi trên mạng?', options: ['Hâm mộ cuồng nhiệt dẫn đến xung đột.', 'Cơ chế bảo vệ phe ta (In-group).', 'Mạng xã hội khuyến khích tranh luận.', 'Muốn chứng tỏ lòng trung thành.'], correctIndex: 1, explanation: 'Tăng bản sắc cá nhân nhờ thành tích nhóm.' },
      { id: 'q20_4', type: 'scenario', scenario: 'Bạn tin rằng quê mình là nơi nhiều người tài nhất thế giới.', options: ['Đúng thế, quê mình có nhiều nhân tài.', 'Tự tôn địa phương thái quá.', 'Tình yêu quê hương là điều tốt.', 'Mình lớn lên ở đó nên tự hào.'], correctIndex: 1, explanation: 'Bias địa phương.' },
      { id: 'q20_5', type: 'scenario', scenario: 'Sếp chỉ tuyển người cùng trường đại học với mình.', options: ['Ủng hộ trường cũ là điều nên làm.', 'Bẫy In-group bias trong tuyển dụng.', 'Người cùng trường có chất lượng tốt.', 'Dễ tin tưởng người có cùng xuất thân.'], correctIndex: 1, explanation: 'Bỏ qua nhân tài khác vì sự thân thuộc.' },
      { id: 'q20_6', type: 'scenario', scenario: 'Trong bóng đá, fan đội nhà luôn thấy trọng tài ép đội mình.', options: ['Trọng tài thường thiên vị đội khách.', 'Góc nhìn bị bóp méo bởi màu áo.', 'Đội nhà bị ép thật.', 'Sự bất công luôn hiện hữu.'], correctIndex: 1, explanation: 'Góc nhìn bị bóp méo bởi màu áo.' },
      { id: 'q20_7', type: 'scenario', scenario: 'Để chung sống hòa bình, ta cần làm gì?', options: ['Xóa bỏ các nhóm.', 'Tìm mục tiêu chung cho cả hai nhóm.', 'Nghỉ chơi với nhóm kia.', 'Đánh nhau để phân thắng bại.'], correctIndex: 1, explanation: 'Sát nhập hai nhóm thành một “Phe ta” lớn hơn.' },
      { id: 'q20_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án chia phe phái trong gia đình.', options: ['Khó phá vì lời khai bị chi phối.', 'Cảnh giác với lời khai thiên vị từ phe cánh.', 'Cần hòa giải trước khi điều tra.', 'Nghe lời khai từ cả hai phía.'], correctIndex: 1, explanation: 'Lời khai bị nhuộm màu bởi sự trung thành mù quáng.' }
    ]
  },
  {
    id: 'q21',
    title: 'Kẻ lạ',
    regionId: 'r3',
    requiredLevel: 21,
    xpReward: 320,
    gemReward: 8,
    questions: [
      { id: 'q21_1', type: 'scenario', scenario: 'Bạn mặc định những người từ nước X là… lừa đảo.', options: ['Đúng vậy, nhiều vụ lừa đảo từ nước X.', 'Coi mọi người trong nhóm khác đều giống hệt nhau.', 'Bạn có thông tin đáng tin cậy.', 'Phòng thủ trước người lạ là cần thiết.'], correctIndex: 1, explanation: 'Coi mọi người trong nhóm khác đều giống hệt nhau.' },
      { id: 'q21_2', type: 'scenario', scenario: 'Thanh niên nghĩ “Người già toàn bọn bảo thủ và lú lẫn”.', options: ['Đúng, người già khó thay đổi.', 'Bẫy đánh đồng nhóm ngoài.', 'Có nhiều người già như vậy.', 'Tuổi tác ảnh hưởng đến tư duy.'], correctIndex: 1, explanation: 'Xóa nhòa sự khác biệt cá nhân của kẻ lạ.' },
      { id: 'q21_3', type: 'scenario', scenario: 'Tại sao chúng ta hay vơ đũa cả nắm khi nói về đối thủ?', options: ['Cho nhanh, khỏi mất công phân tích.', 'Não lười phân tích cá thể hóa.', 'Họ thực sự giống nhau.', 'Đơn giản hóa để dễ bề ghét bỏ.'], correctIndex: 1, explanation: 'Đơn giản hóa để dễ bề ghét bỏ.' },
      { id: 'q21_4', type: 'scenario', scenario: 'Bạn thấy một người ăn xin và thề họ là lừa đảo không cần điều tra.', options: ['Tỉnh táo vì nhiều người giả mạo.', 'Định kiến với nhóm không thuộc về ta.', 'Họ thường có tổ chức lừa đảo.', 'Kinh nghiệm bản thân cho thấy vậy.'], correctIndex: 1, explanation: 'Gán mác xấu cho nhóm không thuộc về ta.' },
      { id: 'q21_5', type: 'scenario', scenario: 'Càng ghét nhóm khác, chúng ta càng thấy họ…', options: ['Đáng thương.', 'Giống nhau như đúc.', 'Khác biệt rõ ràng.', 'Thông minh hơn mình.'], correctIndex: 1, explanation: 'Vô hiệu hóa sự phức tạp của nhóm địch.' },
      { id: 'q21_6', type: 'scenario', scenario: 'Hậu quả của sự vơ đũa cả nắm là gì?', options: ['An toàn hơn.', 'Xung đột và kỳ thị vô căn cứ.', 'Hạnh phúc hơn.', 'Dễ dàng kết bạn.'], correctIndex: 1, explanation: 'Mầm mống của sự chia rẽ.' },
      { id: 'q21_7', type: 'scenario', scenario: 'Để công bằng, thám tử cần nhìn nghi phạm như thế nào?', options: ['Một kẻ tội đồ điển hình.', 'Một cá thể độc lập không đại diện cho nhóm của họ.', 'Người lạ cần đề phòng.', 'Dựa vào hồ sơ nhóm để phán đoán.'], correctIndex: 1, explanation: 'Phá vỡ rào cản định kiến.' },
      { id: 'q21_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án mạng nơi hung thủ bị cho là “tất cả mọi người”.', options: ['Bắt hết.', 'Cảnh giác với bẫy đánh đồng nhóm ngoài.', 'Ngủ đi.', 'Hỏi ý kiến đám đông.'], correctIndex: 1, explanation: 'Mỗi cá nhân là một bí ẩn, không phải một con số.' }
    ]
  },
  {
    id: 'q22',
    title: 'Không ai',
    regionId: 'r3',
    requiredLevel: 22,
    xpReward: 340,
    gemReward: 9,
    questions: [
      { id: 'q22_1', type: 'scenario', scenario: 'Thấy người bị nạn trên đường đông, ai cũng nhìn rồi đi qua vì nghĩ “người khác sẽ cứu”.', options: ['Họ vô tâm.', 'Trách nhiệm bị phân tán trong đám đông.', 'Họ bận việc riêng.', 'Sợ bị liên lụy.'], correctIndex: 1, explanation: 'Trách nhiệm bị phân tán trong đám đông.' },
      { id: 'q22_2', type: 'scenario', scenario: 'Trong nhóm chat 100 người, hỏi “Ai làm việc này không?” và chả ai trả lời.', options: ['Mọi người lười.', 'Khuếch tán trách nhiệm.', 'Họ bận thật.', 'Do sếp chưa chỉ đạo.'], correctIndex: 1, explanation: 'Càng đông người, càng ít nỗ lực cá nhân.' },
      { id: 'q22_3', type: 'scenario', scenario: 'Nếu bị nạn giữa đám đông, thám tử khuyên bạn nên làm gì?', options: ['Hét to “CỨU VỚI”.', 'Chỉ đích danh một người: “Anh áo đỏ hãy giúp tôi!”', 'Im lặng chờ ai đó giúp.', 'Khóc lóc để gây chú ý.'], correctIndex: 1, explanation: 'Chỉ định trách nhiệm để ngăn chặn bẫy đám đông.' },
      { id: 'q22_4', type: 'scenario', scenario: 'Tại sao ở làng quê, người bị nạn lại được cứu nhanh hơn ở phố thị?', options: ['Người quê tốt hơn.', 'Đám đông ở phố làm loãng trách nhiệm.', 'Ở quê ít người nên dễ thấy.', 'Ở quê có thói quen giúp đỡ hàng xóm.'], correctIndex: 1, explanation: 'Số lượng ít làm tăng trọng số cá nhân.' },
      { id: 'q22_5', type: 'scenario', scenario: 'Bạn thấy khói bốc lên từ nhà hàng xóm nhưng thấy cả xóm im lìm nên bạn cũng… đi ngủ.', options: ['Bạn bình tĩnh.', 'Bẫy sự thờ ơ tập thể.', 'Cháy nhẹ, không đáng lo.', 'Tưởng họ đã gọi cứu hỏa.'], correctIndex: 1, explanation: 'Mọi người đang nhìn nhau để xem tình hình.' },
      { id: 'q22_6', type: 'scenario', scenario: 'Căn phòng càng đông người chứng kiến vụ án, cơ hội bắt hung thủ càng…', options: ['Cao hơn.', 'Thấp hơn do hỗn loạn và ỷ lại.', 'Bình thường.', 'Không liên quan.'], correctIndex: 1, explanation: 'Người này tưởng người kia đã báo cảnh sát.' },
      { id: 'q22_7', type: 'scenario', scenario: 'Điều gì phá vỡ Bystander effect?', options: ['Thêm người.', 'Sự xuất hiện của một người xung phong đầu tiên.', 'Im lặng.', 'Đi về.'], correctIndex: 1, explanation: 'Hành động mồi kích hoạt ý thức cộng đồng.' },
      { id: 'q22_8', type: 'scenario', scenario: 'Thám tử bước vào đám đông đang bao quanh một người bị đánh.', options: ['Vào xem ké.', 'Giải tán và phân công nhiệm vụ cho từng người.', 'Hô hào mọi người đánh tiếp.', 'Đứng nhìn.'], correctIndex: 1, explanation: 'Xác định lại trách nhiệm cho từng cá nhân.' }
    ]
  },
  {
    id: 'q23',
    title: 'Ỷ lại',
    regionId: 'r3',
    requiredLevel: 23,
    xpReward: 360,
    gemReward: 10,
    questions: [
      { id: 'q23_1', type: 'scenario', scenario: 'Làm việc nhóm 10 người, bạn lén lút làm ít hơn so với khi làm 1 mình.', options: ['Bạn lười.', 'Nỗ lực giảm khi công lao bị hòa tan.', 'Bạn bận.', 'Tại mọi người không làm.'], correctIndex: 1, explanation: 'Nỗ lực giảm khi công lao bị hòa tan.' },
      { id: 'q23_2', type: 'scenario', scenario: 'Kéo co đội 20 người, bạn chỉ dùng 50% sức vì “có ai biết đâu”.', options: ['Khôn lỏi.', 'Bẫy ỷ lại xã hội.', 'Bạn yếu.', 'Tiết kiệm sức.'], correctIndex: 1, explanation: 'Mất động lực khi thiếu sự giám sát cá nhân.' },
      { id: 'q23_3', type: 'scenario', scenario: 'Tại sao các dự án nhóm thường bị chậm deadline?', options: ['Nhiều việc quá.', 'Bệnh ỷ lại tập thể.', 'Tại sếp giao nhiều.', 'Do mạng chậm.'], correctIndex: 1, explanation: 'Ai cũng nghĩ mình không quan trọng.' },
      { id: 'q23_4', type: 'scenario', scenario: 'Để trị Social loafing, thám tử nên làm gì?', options: ['Mắng cả nhóm.', 'Đánh giá điểm và công việc của từng người công khai.', 'Nghỉ làm.', 'Đi ngủ.'], correctIndex: 1, explanation: 'Cá nhân hóa trách nhiệm và thành quả.' },
      { id: 'q23_5', type: 'scenario', scenario: 'Bạn thề là mình rất chăm, nhưng vào nhóm bạn lại… đi chơi game.', options: ['Game hay.', 'Cơ chế lười biếng vô thức của nhóm.', 'Bạn hèn.', 'Do duyên.'], correctIndex: 1, explanation: 'Sự bí ẩn của đám đông cổ vũ sự lười.' },
      { id: 'q23_6', type: 'scenario', scenario: 'Trong buổi brainstorming, chỉ có 2 người nói, 8 người im lặng gật đầu.', options: ['Họ thông minh.', 'Sự ỷ lại tư duy.', 'Họ mệt.', 'Không có ý tưởng.'], correctIndex: 1, explanation: 'Đừng để tiếng nói số đông lấn át nỗ lực cá nhân.' },
      { id: 'q23_7', type: 'scenario', scenario: 'Lợi ích của việc làm việc cá nhân so với làm nhóm 10 người là?', options: ['Nhàn hơn.', 'Năng suất trên từng người cao hơn.', 'Vui hơn.', 'Được khen nhiều hơn.'], correctIndex: 1, explanation: 'Càng đông hiệu suất càng giảm nếu không quản lý tốt.' },
      { id: 'q23_8', type: 'scenario', scenario: 'Thám tử bước vào văn phòng nơi ai cũng đang “chờ lệnh”.', options: ['Ra lệnh.', 'Phân chia nhiệm vụ độc lập cho mỗi thám tử.', 'Im lặng.', 'Đi về.'], correctIndex: 1, explanation: 'Xóa bỏ sự ỷ lại bằng trách nhiệm rạch ròi.' }
    ]
  },
  {
    id: 'q24',
    title: 'Thành phố',
    regionId: 'r3',
    requiredLevel: 24,
    xpReward: 400,
    gemReward: 15,
    questions: [
      { id: 'q24_1', type: 'scenario', scenario: 'Bạn bước vào tòa nhà bỏ hoang, một người mặc đồ đen nói “Đừng bao giờ quay đầu lại”.', options: ['Quay lại luôn.', 'Sập bẫy tò mò phản kháng.', 'Chạy mất dép.', 'Nghiêm túc nghe theo.'], correctIndex: 1, explanation: 'Lệnh cấm kích thích sự vi phạm.' },
      { id: 'q24_2', type: 'scenario', scenario: 'Hung thủ đang điều khiển đám đông bằng những lời mật ngọt.', options: ['Nghe theo.', 'Dùng tư duy thám tử bóc tách từng lớp dối trá.', 'Chạy trốn.', 'May mắn.'], correctIndex: 1, explanation: 'Sức mạnh của lời nói thao túng số đông.' },
      { id: 'q24_3', type: 'scenario', scenario: 'Vũ khí mạnh nhất để chống lại sự “Dắt mũi” ở Phố Thị?', options: ['Súng.', 'Kiến thức về các thiên kiến tâm lý.', 'Tiền.', 'Mối quan hệ.'], correctIndex: 1, explanation: 'Hiểu bẫy là bước đầu để thoát bẫy.' },
      { id: 'q24_4', type: 'scenario', scenario: 'Bạn cảm thấy mình thật nhỏ bé giữa các tòa nhà cao tầng.', options: ['Đúng thế.', 'Hiệu ứng môi trường ảnh hưởng vị thế cá nhân.', 'Bạn thấp thật.', 'Hợp lý.'], correctIndex: 1, explanation: 'Không gian định nghĩa cảm xúc.' },
      { id: 'q24_5', type: 'scenario', scenario: 'Tại sao kẻ gian thường đóng giả người quyền lực?', options: ['Cho oai.', 'Lợi dụng bẫy uy quyền.', 'Họ giàu.', 'Sự thật.'], correctIndex: 1, explanation: 'Não bộ tự động vâng lời bộ quân phục.' },
      { id: 'q24_6', type: 'scenario', scenario: 'Để thoát khỏi mê cung phố thị, thám tử cần điều gì?', options: ['Bản đồ.', 'Sự tỉnh táo trước mọi lời dụ dỗ đám đông.', 'La bàn.', 'Xe nhanh.'], correctIndex: 1, explanation: 'Bản đồ nằm trong tâm trí của bạn.' },
      { id: 'q24_7', type: 'scenario', scenario: 'Kẻ dắt mũi sợ nhất điều gì?', options: ['Cảnh sát.', 'Người đặt câu hỏi “Tại sao?”.', 'Tiền.', 'Bị lộ.'], correctIndex: 1, explanation: 'Câu hỏi phá vỡ vòng lặp thao túng.' },
      { id: 'q24_8', type: 'scenario', scenario: 'Thám tử đứng trước ngã tư Phố Thị, nơi mọi con đường đều có bẫy.', options: ['Đi đại.', 'Phân tích các lực đẩy tâm lý xung quanh để chọn lối đi.', 'Quay đầu.', 'May mắn.'], correctIndex: 1, explanation: 'Quyết định dựa trên logic thực nghiệm.' }
    ]
  },

  // ===================== VÙNG 4: LÚ LẪN =====================
  {
    id: 'q25',
    title: 'Dở dang',
    regionId: 'r4',
    requiredLevel: 25,
    xpReward: 300,
    gemReward: 4,
    questions: [
      { id: 'q25_1', type: 'scenario', scenario: 'Đang xem phim hay thì mất điện, cả đêm bạn không ngủ được vì cứ nghĩ về đoạn kết.', options: ['Bạn yêu phim.', 'Não ưu tiên ghi nhớ việc chưa hoàn thành.', 'Sợ bóng tối.', 'Do phim đỉnh.'], correctIndex: 1, explanation: 'Não bộ ưu tiên ghi nhớ những việc chưa hoàn thành.' },
      { id: 'q25_2', type: 'scenario', scenario: 'Bài hát cứ lặp đi lặp lại trong đầu vì bạn chỉ thuộc đúng một câu.', options: ['Sâu tai.', 'Não “vòng lặp” để cố kết thúc thông tin.', 'Bạn yêu nhạc.', 'Tâm thần.'], correctIndex: 1, explanation: 'Não “vòng lặp” để cố gắng kết thúc thông tin.' },
      { id: 'q25_3', type: 'scenario', scenario: 'Tại sao các shop hay cho tích điểm “Mua 8 tặng 1” và đã tích sẵn 2 điểm?', options: ['Họ tốt.', 'Tạo cảm giác dự án đã bắt đầu và cần hoàn thiện.', 'Lừa đảo.', 'Khuyến mãi.'], correctIndex: 1, explanation: 'Kích hoạt nhu cầu lấp đầy chỗ trống.' },
      { id: 'q25_4', type: 'scenario', scenario: 'Học bù đầu 10 chương, thi xong bạn quên sạch sành sanh.', options: ['Bạn lười.', 'Nhiệm vụ hoàn thành nên não “xóa bộ nhớ”.', 'Học vẹt.', 'Mất trí.'], correctIndex: 1, explanation: 'Khi xong việc, Zeigarnik effect biến mất.' },
      { id: 'q25_5', type: 'scenario', scenario: 'Để nhớ lâu một kiến thức, thám tử khuyên bạn nên làm gì?', options: ['Học liên tục 10 tiếng.', 'Học ngắt quãng để tạo sự “dở dang” giả cho não.', 'Đi ngủ.', 'Bỏ học.'], correctIndex: 1, explanation: 'Ngắt quãng đúng lúc làm não bám sát thông tin hơn.' },
      { id: 'q25_6', type: 'scenario', scenario: 'Người yêu cũ luôn là người khó quên nhất vì…', options: ['Họ đẹp.', 'Mối tình chưa đi đến hồi kết (dở dang).', 'Bạn chung thủy.', 'Do duyên.'], correctIndex: 1, explanation: 'Một câu hỏi không có đáp án là câu hỏi ám ảnh nhất.' },
      { id: 'q25_7', type: 'scenario', scenario: 'Tại sao các game hay có thanh tiến trình (progress bar)?', options: ['Cho đẹp.', 'Tận dụng để thôi thúc bạn làm nốt.', 'Máy tính tự hiện.', 'Trend.'], correctIndex: 1, explanation: 'Nhìn thấy sự dở dang làm ta bứt rứt.' },
      { id: 'q25_8', type: 'scenario', scenario: 'Thám tử đứng trước một vụ án bị bỏ dở từ 10 năm trước.', options: ['Bỏ qua.', 'Sức mạnh ám ảnh của “việc chưa xong” thúc đẩy điều tra.', 'Khó quá.', 'May mắn.'], correctIndex: 1, explanation: 'Hồ sơ chưa đóng là động lực mạnh nhất của thám tử.' }
    ]
  },
  {
    id: 'q26',
    title: 'Ký ức ảo',
    regionId: 'r4',
    requiredLevel: 26,
    xpReward: 320,
    gemReward: 5,
    questions: [
      { id: 'q26_1', type: 'scenario', scenario: 'Bạn thề là mình đã khóa cửa, nhưng thực tế là chưa.', options: ['Bạn già.', 'Não tự lấp đầy lỗ hổng bằng thứ “nên có”.', 'Quên.', 'Có trộm.'], correctIndex: 1, explanation: 'Não tự lấp đầy lỗ hổng bằng thứ “nên có”.' },
      { id: 'q26_2', type: 'scenario', scenario: 'Hàng ngàn người thề thấy Pikachu có vệt đen ở đuôi (thực tế là không).', options: ['Pikachu đổi mẫu.', 'Mandela effect.', 'Họ nhầm.', 'Ảo giác.'], correctIndex: 1, explanation: 'Trí nhớ là thứ có thể bị “xào nấu” tập thể.' },
      { id: 'q26_3', type: 'scenario', scenario: 'Tại sao nhân chứng thường khai sai màu áo hung thủ sau 1 tuần?', options: ['Họ nói dối.', 'Trí nhớ bị biến đổi theo thời gian.', 'Họ cận.', 'Hung thủ thay áo.'], correctIndex: 1, explanation: 'Mỗi lần nhớ lại là một lần não… viết lại kịch bản.' },
      { id: 'q26_4', type: 'scenario', scenario: 'Bạn nhớ mình bị lạc ở siêu thị hồi 5 tuổi dù mẹ bảo “làm gì có”.', options: ['Bạn nhớ đúng.', 'Ký ức bị cấy.', 'Mẹ quên.', 'Bịa đặt.'], correctIndex: 1, explanation: 'Nghe kể nhiều quá nên não tự biến thành “trải nghiệm”.' },
      { id: 'q26_5', type: 'scenario', scenario: 'Trong phòng thẩm vấn, thám tử hỏi “Cái xe đỏ chạy nhanh không?” dù xe màu xanh.', options: ['Hỏi ngu.', 'Bẫy thông tin sai lạc.', 'Thám tử mù màu.', 'May mắn.'], correctIndex: 1, explanation: 'Câu hỏi định hướng cài cắm ký ức giả cho nhân chứng.' },
      { id: 'q26_6', type: 'scenario', scenario: 'Bạn quả quyết mình đã ăn cơm rồi, dù bụng đang kêu.', options: ['No ảo.', 'Ký ức giả do thói quen.', 'Bạn hâm.', 'Do mạng.'], correctIndex: 1, explanation: 'Hành động lặp đi lặp lại làm não lẫn lộn.' },
      { id: 'q26_7', type: 'scenario', scenario: 'Để kiểm chứng trí nhớ, cách tốt nhất là?', options: ['Suy nghĩ kỹ.', 'Xem lại bằng chứng vật lý.', 'Hỏi bạn bè.', 'Đi ngủ.'], correctIndex: 1, explanation: 'Đừng bao giờ tin 100% vào bộ não của mình.' },
      { id: 'q26_8', type: 'scenario', scenario: 'Thám tử tìm thấy một nhật ký viết sai sự thật một cách vô ý.', options: ['Tội phạm xảo quyệt.', 'Nghi phạm bị bẫy ký ức giả.', 'Nhật ký rác.', 'May mắn.'], correctIndex: 1, explanation: 'Sự thật nằm ở chứng cứ, không phải cảm nhận.' }
    ]
  },
  {
    id: 'q27',
    title: 'Đạo văn',
    regionId: 'r4',
    requiredLevel: 27,
    xpReward: 340,
    gemReward: 6,
    questions: [
      { id: 'q27_1', type: 'scenario', scenario: 'Bạn nghĩ ra một giai điệu cực hay, sau đó phát hiện nó là nhạc chuông của bạn thân.', options: ['Ý tưởng lớn gặp nhau.', 'Não nhớ giai điệu nhưng quên nguồn gốc.', 'Bạn giỏi.', 'Trùng hợp.'], correctIndex: 1, explanation: 'Não nhớ giai điệu nhưng quên nguồn gốc.' },
      { id: 'q27_2', type: 'scenario', scenario: 'Nhà văn viết một câu triết lý và thề là mình tự nghĩ ra, dù nó có trong sách SGK.', options: ['Thiên tài.', 'Bẫy Cryptomnesia.', 'Hợp lý.', 'Ảo tưởng.'], correctIndex: 1, explanation: 'Ký ức cũ hiện ra như ý tưởng mới.' },
      { id: 'q27_3', type: 'scenario', scenario: 'Tại sao các ca sĩ hay bị dính scandal “đạo nhạc” dù họ thề là không biết?', options: ['Họ nói dối.', 'Cơ chế ghi nhớ tiềm thức lừa dối họ.', 'Họ hâm.', 'May mắn.'], correctIndex: 1, explanation: 'Tai nghe – não giữ – tay viết lại như của mình.' },
      { id: 'q27_4', type: 'scenario', scenario: 'Bạn kể một câu chuyện cười cho chính người đã kể nó cho bạn nghe.', options: ['Bạn vui tính.', 'Quên nguồn gốc thông tin.', 'Bạn hâm.', 'Do duyên.'], correctIndex: 1, explanation: 'Đỉnh cao của sự “ngáo” trí nhớ.' },
      { id: 'q27_5', type: 'scenario', scenario: 'Làm sao để tránh đạo văn vô thức?', options: ['Đừng đọc gì cả.', 'Ghi chú nguồn gốc mọi thứ bạn học được.', 'Đi chơi.', 'May mắn.'], correctIndex: 1, explanation: 'Quản lý nguồn tin là cách duy nhất.' },
      { id: 'q27_6', type: 'scenario', scenario: 'Não bộ thích lưu trữ “nội dung” hơn là “nguồn gốc”. Đúng hay sai?', options: ['Sai.', 'Đúng.', 'Tùy người.', 'Hợp lý.'], correctIndex: 1, explanation: 'Cái gì quan trọng (nội dung) thì giữ, ai nói (nguồn) thì vứt.' },
      { id: 'q27_7', type: 'scenario', scenario: 'Bạn thấy ý tưởng của mình bị người khác nói ra trong cuộc họp.', options: ['Họ ăn cắp.', 'Có thể họ cũng bị Cryptomnesia.', 'Bạn nói quá chậm.', 'May mắn.'], correctIndex: 1, explanation: 'Đừng vội kết tội khi chưa hiểu bộ não.' },
      { id: 'q27_8', type: 'scenario', scenario: 'Thám tử bắt gặp một vụ án giống hệt vụ án nổi tiếng trong tiểu thuyết.', options: ['Bắt chước.', 'Kẻ thủ ác bị ám thị Cryptomnesia.', 'Trùng hợp.', 'May mắn.'], correctIndex: 1, explanation: 'Thực tế đôi khi là bản sao vô thức của hư cấu.' }
    ]
  },
  {
    id: 'q28',
    title: 'Nhầm nguồn',
    regionId: 'r4',
    requiredLevel: 28,
    xpReward: 360,
    gemReward: 7,
    questions: [
      { id: 'q28_1', type: 'scenario', scenario: 'Bạn thề là sếp nói cho nghỉ thứ 6, nhưng hóa ra là… sếp trong mơ.', options: ['Bạn mơ ngủ.', 'Nhầm lẫn giữa thực và mộng.', 'Sếp ác.', 'Hết cứu.'], correctIndex: 1, explanation: 'Nhầm lẫn giữa thực và mộng.' },
      { id: 'q28_2', type: 'scenario', scenario: 'Tin rằng cà rốt giúp mắt sáng như đèn pha vì nghe bà kể (thực tế là do tuyên truyền thế chiến).', options: ['Bà đúng.', 'Lỗi nguồn tin lịch sử.', 'Sự thật.', 'Bạn tin người.'], correctIndex: 1, explanation: 'Tin đồn biến thành kiến thức thường thức.' },
      { id: 'q28_3', type: 'scenario', scenario: 'Tại sao tin giả (fake news) lại sống dai?', options: ['Vì nó hay.', 'Vì ta quên mất nguồn là từ “bài đăng nhảm” và chỉ nhớ nội dung.', 'Do mạng.', 'Hợp lý.'], correctIndex: 1, explanation: 'Sleeper effect: Nội dung ở lại, nguồn ra đi.' },
      { id: 'q28_4', type: 'scenario', scenario: 'Bạn nhớ mang máng đã đọc tin này trên báo lớn, hóa ra là trên… lá cải.', options: ['Bạn nhầm.', 'Bẫy Source monitoring.', 'Báo nào chả thế.', 'Do mắt.'], correctIndex: 1, explanation: 'Nâng cấp nguồn tin theo ý muốn của não.' },
      { id: 'q28_5', type: 'scenario', scenario: 'Làm thế nào để thám tử không bị nhầm nguồn tin?', options: ['Tin sếp.', 'Luôn kiểm tra chéo (cross–verify).', 'Đi ngủ.', 'May mắn.'], correctIndex: 1, explanation: 'Một nguồn là không nguồn.' },
      { id: 'q28_6', type: 'scenario', scenario: 'Bạn mắng con vì tội lười, sau đó nhớ ra là mình… mắng nhầm đứa khác.', options: ['Bạn già.', 'Lỗi giám sát nguồn đối tượng.', 'Con lười thiệt mà.', 'Hợp lý.'], correctIndex: 1, explanation: 'Nhầm chủ thể của ký ức.' },
      { id: 'q28_7', type: 'scenario', scenario: 'Sleeper effect là gì?', options: ['Hiệu ứng ngủ gật.', 'Thông tin từ nguồn không tin cậy càng lâu càng dễ tin.', 'Game hay.', 'Ảo giác.'], correctIndex: 1, explanation: 'Thời gian xóa nhòa sự cảnh giác về nguồn gốc.' },
      { id: 'q28_8', type: 'scenario', scenario: 'Thám tử đối mặt với nhân chứng thề là “Thấy tận mắt”.', options: ['Tin luôn.', 'Cảnh giác với sự nhầm lẫn giữa tận mắt và nghe kể.', 'Bắt hung thủ.', 'May mắn.'], correctIndex: 1, explanation: 'Trí nhớ là kẻ nói dối tài ba.' }
    ]
  },
  {
    id: 'q29',
    title: 'Tin đồn',
    regionId: 'r4',
    requiredLevel: 29,
    xpReward: 380,
    gemReward: 8,
    questions: [
      { id: 'q29_1', type: 'scenario', scenario: 'Ai cũng bảo ăn món X bị ung thư, bạn vứt luôn thùng món X dù báo chí chưa nói.', options: ['Bạn cẩn thận.', 'Thông tin ngoài lề đè bẹp sự thực.', 'Món X dở.', 'Do lo sợ.'], correctIndex: 1, explanation: 'Thông tin ngoài lề đè bẹp sự thực.' },
      { id: 'q29_2', type: 'scenario', scenario: 'Clip cắt ghép làm bạn tin ca sĩ A là người xấu.', options: ['Cắt ghép đỉnh.', 'Não tin vào hình ảnh trước khi tin vào logic.', 'Sự thật.', 'Xử lý kém.'], correctIndex: 1, explanation: 'Não bộ tin vào hình ảnh trước khi tin vào logic.' },
      { id: 'q29_3', type: 'scenario', scenario: 'Tại sao tin đồn trong công ty lại lan nhanh hơn thông báo chính thức?', options: ['Nó ly kỳ.', 'Đáp ứng nhu cầu giải tỏa tâm lý và kết nối.', 'Thông báo sếp dở.', 'Do rảnh.'], correctIndex: 1, explanation: 'Tin đồn là keo dán xã hội (dù độc hại).' },
      { id: 'q29_4', type: 'scenario', scenario: 'Bạn thấy người ta bảo “Trái đất phẳng” và bắt đầu nghi ngờ khoa học.', options: ['Bạn thông minh.', 'Dính bẫy tin đồn cực đoan.', 'Khoa học sai thật.', 'Ảo giác.'], correctIndex: 1, explanation: 'Sự lặp lại tạo ra cảm giác về chân lý.' },
      { id: 'q29_5', type: 'scenario', scenario: 'Cách dập tắt tin đồn hiệu quả nhất?', options: ['Im lặng.', 'Cung cấp thông tin minh bạch và trung thực ngay.', 'Mắng người đồn.', 'Đi chơi.'], correctIndex: 1, explanation: 'Chân lý là thuốc độc của tin đồn.' },
      { id: 'q29_6', type: 'scenario', scenario: 'Sức mạnh của lời đồn nằm ở đâu?', options: ['Sự thật.', 'Sự sợ hãi và tò mò.', 'Người đồn giàu.', 'May mắn.'], correctIndex: 1, explanation: 'Càng sợ người ta càng đồn.' },
      { id: 'q29_7', type: 'scenario', scenario: 'Tại sao thám tử không được nghe tin đồn từ hàng xóm?', options: ['Họ nói dối.', 'Tin đồn biến dạng qua mỗi người kể.', 'Họ bận.', 'Tiết kiệm thời gian.'], correctIndex: 1, explanation: 'Thông tin tam sao thất bản.' },
      { id: 'q29_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án mạng nôn nao cả khu phố.', options: ['Hỏi dân.', 'Gạt bỏ mọi lời đồn, chỉ tin vào chứng cứ pháp y.', 'Đi về.', 'May mắn.'], correctIndex: 1, explanation: 'Đám đông luôn phóng đại sự thật.' }
    ]
  },
  {
    id: 'q30',
    title: 'Déjà vu',
    regionId: 'r4',
    requiredLevel: 30,
    xpReward: 400,
    gemReward: 9,
    questions: [
      { id: 'q30_1', type: 'scenario', scenario: 'Đang ăn cơm, bạn khựng lại: “Cảnh này mình thấy ở đâu rồi!”', options: ['Tiền kiếp.', 'Não xử lý nhầm thông tin hiện tại thành ký ức.', 'Mơ ngủ.', 'Trùng hợp.'], correctIndex: 1, explanation: 'Não xử lý nhầm thông tin hiện tại thành ký ức.' },
      { id: 'q30_2', type: 'scenario', scenario: 'Gặp người lạ mà cứ thề là bạn thân từ thuở nào dù mới gặp lần đầu.', options: ['Nhân duyên.', 'Ảo giác quen thuộc.', 'Họ giống ai đó.', 'Bạn hâm.'], correctIndex: 1, explanation: 'Lỗi đồng bộ của hai bán cầu não.' },
      { id: 'q30_3', type: 'scenario', scenario: 'Ngược lại với Déjà vu, nhìn đồ vật thân thuộc mà thấy lạ hoắc.', options: ['Mất trí.', 'Jamais vu.', 'Đồ vật mới.', 'Do nhìn lâu quá.'], correctIndex: 1, explanation: 'Mất cảm giác quen thuộc với thứ đã biết.' },
      { id: 'q30_4', type: 'scenario', scenario: 'Tại sao ta hay gặp Déjà vu khi… mệt mỏi?', options: ['Thần kinh yếu.', 'Não bộ bị trễ nhịp xử lý (lag).', 'Hợp lý.', 'Ảo ảnh.'], correctIndex: 1, explanation: 'Não bộ “lag” nên ghi đè dữ liệu sai vị trí.' },
      { id: 'q30_5', type: 'scenario', scenario: 'Bạn đọc một từ mãi và thấy nó… chẳng có ý nghĩa gì nữa.', options: ['Từ đó sai.', 'Semantic satiation.', 'Bạn mệt.', 'Hết chữ.'], correctIndex: 1, explanation: 'Lặp lại quá nhiều làm tế bào thần kinh trơ lỳ.' },
      { id: 'q30_6', type: 'scenario', scenario: 'Khi gặp Déjà vu, thám tử nên làm gì?', options: ['Tin vào định mệnh.', 'Bình tĩnh kiểm tra thực tế, coi đó là lỗi thần kinh.', 'Sợ hãi.', 'May mắn.'], correctIndex: 1, explanation: 'Đừng để cảm giác dắt mũi logic.' },
      { id: 'q30_7', type: 'scenario', scenario: 'Déjà vu có phải là bằng chứng của dòng thời gian song song?', options: ['Đúng thế.', 'Chưa có bằng chứng khoa học, chỉ là giả thuyết.', 'Hâm.', 'May mắn.'], correctIndex: 1, explanation: 'Khoa học thiên về giải thích sinh học hơn.' },
      { id: 'q30_8', type: 'scenario', scenario: 'Thám tử bước vào căn phòng xa lạ nhưng thấy quen thuộc đến lạ kỳ.', options: ['Nhà mình.', 'Cảnh giác với bẫy Déjà vu hoặc ký ức tiềm ẩn.', 'Ngủ đi.', 'May mắn.'], correctIndex: 1, explanation: 'Có thể bạn đã thấy nó trong một bức ảnh cũ.' }
    ]
  },
  {
    id: 'q31',
    title: 'Quên cửa',
    regionId: 'r4',
    requiredLevel: 31,
    xpReward: 420,
    gemReward: 10,
    questions: [
      { id: 'q31_1', type: 'scenario', scenario: 'Vừa bước qua cửa phòng để lấy đồ, bỗng quên mất mình định lấy gì.', options: ['Bạn già.', 'Cánh cửa đóng lại một bối cảnh bộ nhớ của não.', 'Đồ vật chạy mất.', 'Ảo giác.'], correctIndex: 1, explanation: 'Cánh cửa đóng lại một bối cảnh bộ nhớ của não.' },
      { id: 'q31_2', type: 'scenario', scenario: 'Đang nói chuyện hay bỗng có người cắt ngang, thế là quên tiệt định nói gì.', options: ['Bạn lú.', 'Lỗi bộ nhớ đệm (working memory).', 'Người kia ác.', 'Do mạng.'], correctIndex: 1, explanation: 'Bộ nhớ tạm thời bị ghi đè.' },
      { id: 'q31_3', type: 'scenario', scenario: 'Tại sao thám tử hay mang theo sổ tay thay vì tin vào đầu mình?', options: ['Cho oai.', 'Chống lại sự rơi rụng của working memory.', 'Nghiệp vụ.', 'May mắn.'], correctIndex: 1, explanation: 'Bút mực mờ hơn trí nhớ tốt.' },
      { id: 'q31_4', type: 'scenario', scenario: 'Bạn nhớ số điện thoại trong 5 giây, sau đó quên sạch.', options: ['Bình thường.', 'Cơ chế xóa rác của bộ nhớ ngắn hạn.', 'Bạn kém.', 'Do số khó.'], correctIndex: 1, explanation: 'Não không muốn giữ thứ vô dụng lâu.' },
      { id: 'q31_5', type: 'scenario', scenario: 'Để nhớ lại thứ vừa quên sau khi đi qua cửa, bạn nên làm gì?', options: ['Vò đầu.', 'Quay lại vị trí cũ trước khi đi qua cửa.', 'Đi ngủ.', 'Khóc.'], correctIndex: 1, explanation: 'Khôi phục bối cảnh gốc của ký ức.' },
      { id: 'q31_6', type: 'scenario', scenario: 'Não bộ có thể giữ bao nhiêu món đồ trong bộ nhớ ngắn hạn cùng lúc?', options: ['Vô hạn.', 'Khoảng 7 (cộng trừ 2).', '100.', '1.'], correctIndex: 1, explanation: 'Định luật Miller về giới hạn bộ nhớ.' },
      { id: 'q31_7', type: 'scenario', scenario: 'Hậu quả của việc quá tải thông tin là gì?', options: ['Thông minh hơn.', 'Mất khả năng ghi nhớ và ra quyết định.', 'Vui vẻ.', 'May mắn.'], correctIndex: 1, explanation: 'Não bộ sẽ “treo máy” như máy tính.' },
      { id: 'q31_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án với quá nhiều nghi phạm và dữ liệu.', options: ['Bắt hết.', 'Phân nhóm thông tin để tránh quá tải bộ nhớ.', 'Đi về.', 'May mắn.'], correctIndex: 1, explanation: 'Chia nhỏ để trị.' }
    ]
  },
  {
    id: 'q32',
    title: 'Mê cung',
    regionId: 'r4',
    requiredLevel: 32,
    xpReward: 500,
    gemReward: 20,
    questions: [
      { id: 'q32_1', type: 'scenario', scenario: 'Bạn lạc trong mê cung và thấy một bảng chỉ dẫn: “Đừng tin vào ký ức của bạn”.', options: ['Vất bảng đi.', 'Nghiệm ra chân lý về sự sai lạc của bộ não.', 'Sợ quá.', 'May mắn.'], correctIndex: 1, explanation: 'Bài học lớn nhất của vùng này.' },
      { id: 'q32_2', type: 'scenario', scenario: 'Vũ khí mạnh nhất để chống lại sự “Lú lẫn” là gì?', options: ['La bàn.', 'Sự ghi chép và kiểm chứng trực quan.', 'Đèn pin.', 'Tiền.'], correctIndex: 1, explanation: 'Chứng cứ vật lý không biết nói dối.' },
      { id: 'q32_3', type: 'scenario', scenario: 'Kẻ thù lớn nhất trong Mê Cung Lú Lẫn là ai?', options: ['Hung thủ.', 'Chính bộ não hay tự huyễn hoặc của ta.', 'Con quái vật.', 'Sếp.'], correctIndex: 1, explanation: 'Kẻ thù nằm trong gương.' },
      { id: 'q32_4', type: 'scenario', scenario: 'Tại sao những câu chuyện cổ tích lại hay có đoạn lặp lại?', options: ['Tác giả lười.', 'Để cấy ký ức lâu dài vào não trẻ em.', 'Trend.', 'Hợp lý.'], correctIndex: 1, explanation: 'Sự lặp lại là mẹ của ký ức.' },
      { id: 'q32_5', type: 'scenario', scenario: 'Bạn cảm thấy thời gian trôi nhanh hơn khi về già.', options: ['Đúng thế.', 'Do não ít trải nghiệm mới (logarithmic time).', 'Bạn già thật.', 'Ảo giác.'], correctIndex: 1, explanation: 'Trải nghiệm mới làm chậm dòng thời gian.' },
      { id: 'q32_6', type: 'scenario', scenario: 'Để thoát mê cung, thám tử cần điều gì ngoài bản đồ?', options: ['Lòng dũng cảm.', 'Tư duy phản biện lại chính kinh nghiệm của mình.', 'Thịt bò khô.', 'May mắn.'], correctIndex: 1, explanation: 'Kinh nghiệm đôi khi là cái bẫy.' },
      { id: 'q32_7', type: 'scenario', scenario: 'Điều gì xảy ra nếu bạn thoát được Mê Cung?', options: ['Trở thành thần.', 'Lên level mới và mở khóa vùng 5.', 'Hết game.', 'Được tiền.'], correctIndex: 1, explanation: 'Phần thưởng là sự trưởng thành trong tư duy.' },
      { id: 'q32_8', type: 'scenario', scenario: 'Thám tử bước ra khỏi cửa Mê Cung và thấy ánh sáng.', options: ['Nhắm mắt.', 'Tận hưởng sự tỉnh táo sau một hành trình “hack não”.', 'Quay lại.', 'May mắn.'], correctIndex: 1, explanation: 'Chào mừng bạn đến với thế giới thực.' }
    ]
  },

  // ===================== VÙNG 5: NGÁO QUYẾT ĐỊNH =====================
  {
    id: 'q33',
    title: 'Cố đấm',
    regionId: 'r5',
    requiredLevel: 33,
    xpReward: 420,
    gemReward: 4,
    questions: [
      { id: 'q33_1', type: 'scenario', scenario: 'Bạn mua vé xem phim 100k, phim dở tệ nhưng bạn vẫn ngồi xem hết “vì tiếc tiền vé”.', options: ['Bạn kiên nhẫn.', 'Tiền đã mất không thể lấy lại, đừng mất thêm thời gian.', 'Bạn yêu phim.', 'Do điện ảnh.'], correctIndex: 1, explanation: 'Tiền đã mất không thể lấy lại, đừng mất thêm thời gian.' },
      { id: 'q33_2', type: 'scenario', scenario: 'Yêu một người độc hại 5 năm, bạn không dám chia tay vì “tiếc công sức thanh xuân”.', options: ['Tình yêu cao thượng.', 'Quá khứ không nên là cái cùm cho tương lai.', 'Bạn chung thủy.', 'Do duyên số.'], correctIndex: 1, explanation: 'Quá khứ không nên là cái cùm cho tương lai.' },
      { id: 'q33_3', type: 'scenario', scenario: 'Cố ăn hết bát cơm dù đã no lòi mắt vì “tiếc công nấu”.', options: ['Bạn tiết kiệm.', 'Ăn quá no sẽ tốn thêm tiền thuốc.', 'Bạn đói.', 'Ngon quá.'], correctIndex: 1, explanation: 'Ăn quá no sẽ tốn thêm tiền thuốc.' },
      { id: 'q33_4', type: 'scenario', scenario: 'Startup thua lỗ 1 tỷ, bạn đổ thêm 1 tỷ nữa “để cứu vãn danh dự”.', options: ['Bạn dũng cảm.', 'Đừng ném tiền tốt theo tiền xấu.', 'Bạn giàu.', 'Do thị trường.'], correctIndex: 1, explanation: 'Đừng ném tiền tốt theo tiền xấu.' },
      { id: 'q33_5', type: 'scenario', scenario: 'Tại sao các dự án nhà nước hay bị kéo dài và đội vốn?', options: ['Nhiều việc quá.', 'Tâm lý không nỡ từ bỏ những gì đã đầu tư.', 'Do thời tiết.', 'Hợp lý.'], correctIndex: 1, explanation: 'Càng đổ nhiều tiền càng khó dừng lại.' },
      { id: 'q33_6', type: 'scenario', scenario: 'Bạn cầm một cổ phiếu đang chia 10 nhưng không bán vì “chờ về bờ”.', options: ['Bạn kiên định.', 'Hy vọng viển vông dựa trên nỗi đau quá khứ.', 'Bạn thông minh.', 'Do sàn lỗi.'], correctIndex: 1, explanation: 'Hy vọng viển vông dựa trên nỗi đau quá khứ.' },
      { id: 'q33_7', type: 'scenario', scenario: 'Cách tốt nhất để thoát bẫy sunk cost?', options: ['Tiết kiệm hơn.', 'Hỏi: Nếu bây giờ mới bắt đầu, mình có làm việc này không?', 'Cố thêm tí nữa.', 'May mắn.'], correctIndex: 1, explanation: 'Tập trung vào lợi ích tương lai, lờ đi chi phí quá khứ.' },
      { id: 'q33_8', type: 'scenario', scenario: 'Thám tử phát hiện mình đã điều tra sai hướng suốt 1 tháng.', options: ['Cố bẻ lái sang hướng đó.', 'Can đảm bỏ hết làm lại từ đầu.', 'Lấp liếm.', 'May mắn.'], correctIndex: 1, explanation: 'Sự thật quan trọng hơn cái tôi.' }
    ]
  },
  {
    id: 'q34',
    title: 'Sợ mất',
    regionId: 'r5',
    requiredLevel: 34,
    xpReward: 440,
    gemReward: 5,
    questions: [
      { id: 'q34_1', type: 'scenario', scenario: 'Bạn thấy đau khổ khi mất 100k gấp đôi niềm vui khi được 100k.', options: ['Bạn nghèo.', 'Nỗi đau mất mát luôn nặng nề hơn niềm vui tương đương.', 'Bình thường.', 'Do tiền.'], correctIndex: 1, explanation: 'Nỗi đau mất mát luôn nặng nề hơn niềm vui tương đương.' },
      { id: 'q34_2', type: 'scenario', scenario: 'Shop bảo “Mua ngay kẻo hết”, bạn chốt đơn vì sợ mất cơ hội.', options: ['Săn sale.', 'Nỗi sợ mất món hời thúc đẩy hành động.', 'Đồ xịn.', 'Do sếp.'], correctIndex: 1, explanation: 'Nỗi sợ mất món hời thúc đẩy hành động.' },
      { id: 'q34_3', type: 'scenario', scenario: 'Bạn không dám đầu tư chứng khoán vì sợ mất tiền, dù khả năng thắng cao.', options: ['Bạn cẩn thận.', 'Sợ thua làm ta bỏ lỡ mọi cơ hội thắng.', 'Bạn thông minh.', 'Do sàn.'], correctIndex: 1, explanation: 'Sợ thua làm ta bỏ lỡ mọi cơ hội thắng.' },
      { id: 'q34_4', type: 'scenario', scenario: 'Tại sao các app hay có chế độ “Dùng thử 7 ngày”?', options: ['Họ tốt.', 'Khi đã có, ta sẽ làm mọi cách để không mất.', 'Trend.', 'May mắn.'], correctIndex: 1, explanation: 'Khi đã có, ta sẽ làm mọi cách để không mất.' },
      { id: 'q34_5', type: 'scenario', scenario: 'Trong đàm phán, nhấn mạnh vào “Điều bạn sẽ MẤT” hiệu quả hơn “Điều bạn được”. Đúng hay sai?', options: ['Sai.', 'Đúng.', 'Tùy người.', 'Hợp lý.'], correctIndex: 1, explanation: 'Con người nhạy cảm với sự đe dọa mất mát.' },
      { id: 'q34_6', type: 'scenario', scenario: 'Tại sao người ta hay giữ những đồ vật cũ kỹ vô dụng?', options: ['Kỷ niệm.', 'Sợ cảm giác mất đi quyền sở hữu.', 'Lười vứt.', 'Hợp lý.'], correctIndex: 1, explanation: 'Vứt đồ là một dạng tổn thất tâm lý.' },
      { id: 'q34_7', type: 'scenario', scenario: 'Hậu quả của loss aversion trong trading?', options: ['Lãi to.', 'Gồng lỗ đến chết nhưng chốt lời cực non.', 'Vui vẻ.', 'May mắn.'], correctIndex: 1, explanation: 'Sợ chốt lỗ nên chấp nhận rủi ro lớn hơn.' },
      { id: 'q34_8', type: 'scenario', scenario: 'Thám tử đe dọa nghi phạm: “Nếu không khai, anh sẽ MẤT cơ hội giảm án”.', options: ['Ác quá.', 'Đòn tâm lý đánh vào nỗi sợ bị tước đoạt.', 'Bình thường.', 'May mắn.'], correctIndex: 1, explanation: 'Đòn tâm lý đánh vào nỗi sợ bị tước đoạt.' }
    ]
  },
  {
    id: 'q35',
    title: 'Đóng khung',
    regionId: 'r5',
    requiredLevel: 35,
    xpReward: 460,
    gemReward: 6,
    questions: [
      { id: 'q35_1', type: 'scenario', scenario: 'Sữa ghi “99% không béo” bạn mua ngay, sữa ghi “1% béo” bạn chê.', options: ['Bạn sành ăn.', 'Cách trình bày thay đổi hoàn toàn phán đoán.', 'Sự thật khác nhau.', 'Do hãng.'], correctIndex: 1, explanation: 'Cách trình bày thay đổi hoàn toàn phán đoán.' },
      { id: 'q35_2', type: 'scenario', scenario: 'Bác sĩ bảo “Tỷ lệ sống là 90%”, bạn yên tâm mổ. Nếu bảo “Tỷ lệ chết 10%”, bạn chạy mất dép.', options: ['Bạn sợ chết.', 'Cùng một con số, góc nhìn khác nhau gây cảm xúc khác.', 'Y học đỉnh.', 'May mắn.'], correctIndex: 1, explanation: 'Cùng một con số, góc nhìn khác nhau gây cảm xúc khác.' },
      { id: 'q35_3', type: 'scenario', scenario: 'Tại sao món ăn 100k lại ghi là 99k?', options: ['Rẻ hơn 1k.', 'Não đọc số đầu tiên và gán mác rẻ.', 'Hết tiền lẻ.', 'Trend.'], correctIndex: 1, explanation: 'Não đọc số đầu tiên và gán mác rẻ.' },
      { id: 'q35_4', type: 'scenario', scenario: 'Bạn khen cô gái: “Em trông đỡ béo hơn hôm qua”. Bạn sẽ nhận được gì?', options: ['Cái tát.', 'Lời cảm ơn.', 'Sự hâm mộ.', 'May mắn.'], correctIndex: 0, explanation: 'Đóng khung tiêu cực dù ý đồ tốt.' },
      { id: 'q35_5', type: 'scenario', scenario: 'Trong tranh luận, thám tử nên “đóng khung” sự thật như thế nào?', options: ['Nói hết ra.', 'Chọn góc nhìn có lợi cho việc lấy lời khai.', 'Im lặng.', 'May mắn.'], correctIndex: 1, explanation: 'Sự thật là đất nặn trong tay người khéo léo.' },
      { id: 'q35_6', type: 'scenario', scenario: 'Công ty thông báo “Giảm lương 10%” và “Tặng thưởng 90% lương cũ”. Cái nào dễ nghe hơn?', options: ['Cả hai như nhau.', 'Cái số 2 (dù thực tế tệ hơn).', 'Cái số 1.', 'May mắn.'], correctIndex: 1, explanation: 'Ngôn từ “tặng thưởng” che mờ sự thật “giảm”.' },
      { id: 'q35_7', type: 'scenario', scenario: 'Lợi ích của hiệu ứng đóng khung trong marketing?', options: ['Lừa khách.', 'Làm sản phẩm trông hấp dẫn hơn mà không cần đổi chất lượng.', 'Vui.', 'May mắn.'], correctIndex: 1, explanation: 'Thay vỏ đổi đời.' },
      { id: 'q35_8', type: 'scenario', scenario: 'Thám tử bước vào hiện trường và gọi nó là “Một tác phẩm nghệ thuật”.', options: ['Biến thái.', 'Đóng khung để giữ bình tĩnh điều tra.', 'Hâm.', 'May mắn.'], correctIndex: 1, explanation: 'Cách bạn gọi tên thế giới định nghĩa thái độ của bạn.' }
    ]
  },
  {
    id: 'q36',
    title: 'Đơn vị',
    regionId: 'r5',
    requiredLevel: 36,
    xpReward: 480,
    gemReward: 7,
    questions: [
      { id: 'q36_1', type: 'scenario', scenario: 'Bát phở to gấp đôi bình thường, bạn cố ăn hết dù đã no từ giữa chừng.', options: ['Ăn khỏe.', 'Ta có xu hướng hoàn thành 1 đơn vị được giao bất kể kích cỡ.', 'Ngon quá.', 'Tiết kiệm.'], correctIndex: 1, explanation: 'Ta có xu hướng hoàn thành 1 đơn vị được giao bất kể kích cỡ.' },
      { id: 'q36_2', type: 'scenario', scenario: 'Tại sao kẹo trong gói to lại làm bạn ăn nhiều hơn kẹo gói nhỏ?', options: ['Gói to rẻ hơn.', 'Một gói là một mục tiêu, kích cỡ mục tiêu thay đổi lượng ăn.', 'Do kẹo ngon.', 'Ngẫu nhiên.'], correctIndex: 1, explanation: 'Một gói là một mục tiêu, kích cỡ mục tiêu thay đổi lượng ăn.' },
      { id: 'q36_3', type: 'scenario', scenario: 'Bạn đọc hết một quyển sách dở chỉ vì “trót đọc rồi phải xong”.', options: ['Yêu sách.', 'Nhu cầu hoàn thành một chỉnh thể.', 'Lười vứt.', 'May mắn.'], correctIndex: 1, explanation: 'Nhu cầu hoàn thành một chỉnh thể.' },
      { id: 'q36_4', type: 'scenario', scenario: 'Để giảm cân, thám tử khuyên bạn dùng bát đĩa như thế nào?', options: ['Bát to.', 'Bát đĩa nhỏ hơn.', 'Không dùng bát.', 'Ăn bốc.'], correctIndex: 1, explanation: 'Đánh lừa não bộ về một “đơn vị đầy đủ”.' },
      { id: 'q36_5', type: 'scenario', scenario: 'Tại sao các app hay chia nhỏ bài học thành từng đoạn ngắn?', options: ['Dễ học.', 'Tạo ra nhiều cảm giác chiến thắng nhỏ.', 'Lười viết dài.', 'May mắn.'], correctIndex: 1, explanation: 'Tạo ra nhiều cảm giác chiến thắng nhỏ.' },
      { id: 'q36_6', type: 'scenario', scenario: 'Bạn uống hết chai nước 1.5 lít chỉ vì “mở nắp rồi”.', options: ['Khát nước.', 'Khi đơn vị quá lớn, ta dễ bị quá tải nhưng vẫn cố.', 'Bạn khỏe.', 'Do nước.'], correctIndex: 1, explanation: 'Khi đơn vị quá lớn, ta dễ bị quá tải nhưng vẫn cố.' },
      { id: 'q36_7', type: 'scenario', scenario: 'Cách tốt nhất để tiết kiệm tiền là chia nhỏ tiền vào nhiều hũ.', options: ['Lằng nhằng.', 'Đúng (tạo ra nhiều đơn vị để cân nhắc).', 'Sai.', 'Hợp lý.'], correctIndex: 1, explanation: 'Lấy tiền ra khỏi một hũ “đơn vị” khó hơn tiêu tiền từ một cọc lớn.' },
      { id: 'q36_8', type: 'scenario', scenario: 'Thám tử bước vào hiện trường mê cung và chia nó thành từng ô gạch.', options: ['Rảnh.', 'Dùng unit bias để không bỏ sót mét vuông nào.', 'Vui tính.', 'May mắn.'], correctIndex: 1, explanation: 'Kiểm soát bằng cách định nghĩa lại đơn vị.' }
    ]
  },
  {
    id: 'q37',
    title: 'Sướng trước',
    regionId: 'r5',
    requiredLevel: 37,
    xpReward: 500,
    gemReward: 8,
    questions: [
      { id: 'q37_1', type: 'scenario', scenario: 'Chọn nhận 1 triệu ngay bây giờ thay vì 2 triệu sau 1 năm.', options: ['Bạn thông minh.', 'Não ưu tiên phần thưởng tức thì bất chấp giá trị nhỏ.', 'Bạn cần tiền gấp.', 'Do lạm phát.'], correctIndex: 1, explanation: 'Não ưu tiên phần thưởng tức thì bất chấp giá trị nhỏ.' },
      { id: 'q37_2', type: 'scenario', scenario: 'Bạn thức đêm xem phim dù biết mai đi làm sẽ gật gù.', options: ['Phim hay.', 'Vui bây giờ, khổ kệ tôi mai.', 'Bạn khỏe.', 'Do bận.'], correctIndex: 1, explanation: 'Vui bây giờ, khổ kệ tôi mai.' },
      { id: 'q37_3', type: 'scenario', scenario: 'Tại sao người ta hay quẹt thẻ tín dụng bừa bãi?', options: ['Giàu.', 'Sướng lúc mua, nỗi đau trả tiền bị đẩy lùi xa.', 'Tiện lợi.', 'May mắn.'], correctIndex: 1, explanation: 'Hành động và hậu quả bị tách rời về thời gian.' },
      { id: 'q37_4', type: 'scenario', scenario: 'Bạn hứa “Mai sẽ tập gym” nhưng mai đến bạn lại bảo “Mai nữa”.', options: ['Bạn lười.', 'Tương lai là một con người khác, không phải tôi bây giờ.', 'Máy tập hỏng.', 'Do mưa.'], correctIndex: 1, explanation: 'Tương lai là một con người khác, không phải tôi bây giờ.' },
      { id: 'q37_5', type: 'scenario', scenario: 'Cách để trị bệnh trì hoãn là?', options: ['Tự mắng mình.', 'Chia nhỏ phần thưởng và trả ngay lập tức.', 'Ngủ nhiều hơn.', 'May mắn.'], correctIndex: 1, explanation: 'Dụ dỗ con thú “Hiện tại” trong bạn.' },
      { id: 'q37_6', type: 'scenario', scenario: 'Tại sao đồ ăn nhanh (junk food) lại khó cưỡng?', options: ['Ngon.', 'Thỏa mãn tức thì cơn đói và ham muốn vị giác.', 'Rẻ.', 'May mắn.'], correctIndex: 1, explanation: 'Phần thưởng hóa học ngay lập tức.' },
      { id: 'q37_7', type: 'scenario', scenario: 'Hậu quả của việc luôn chọn “Ngay bây giờ” là gì?', options: ['Hạnh phúc.', 'Nghèo khó và sức khỏe kém về lâu dài.', 'Thông minh.', 'May mắn.'], correctIndex: 1, explanation: 'Sự kiên nhẫn định nghĩa thành công.' },
      { id: 'q37_8', type: 'scenario', scenario: 'Thám tử từ chối lời hối lộ 1 tỷ hôm nay để giữ danh dự cả đời.', options: ['Anh hùng.', 'Khả năng trì hoãn sự thỏa mãn siêu hạng.', 'Hâm.', 'May mắn.'], correctIndex: 1, explanation: 'Chỉ thám tử thực thụ mới thấy giá trị của tương lai.' }
    ]
  },
  {
    id: 'q38',
    title: 'Xác suất',
    regionId: 'r5',
    requiredLevel: 38,
    xpReward: 520,
    gemReward: 9,
    questions: [
      { id: 'q38_1', type: 'scenario', scenario: 'Tung đồng xu 10 lần ra mặt ngửa, bạn thề lần 11 sẽ ra sấp.', options: ['Bạn giỏi tính.', 'Mỗi lần tung là hoàn toàn độc lập, não đừng tự vẽ.', 'Lẽ thường.', 'Do đồng xu.'], correctIndex: 1, explanation: 'Mỗi lần tung là hoàn toàn độc lập, não đừng tự vẽ.' },
      { id: 'q38_2', type: 'scenario', scenario: 'Con đầu là trai, con hai là trai, bạn tin con ba “chắc chắn” là gái.', options: ['Cầu được ước thấy.', 'Tự nhiên không có bộ nhớ để “bù đắp” cho bạn.', 'Duyên số.', 'Hợp lý.'], correctIndex: 1, explanation: 'Tự nhiên không có bộ nhớ để “bù đắp” cho bạn.' },
      { id: 'q38_3', type: 'scenario', scenario: 'Tại sao các sòng bài hay hiện bảng lịch sử các ván trước?', options: ['Cho khách xem.', 'Để dụ khách dính bẫy gambler’s fallacy.', 'Minh bạch.', 'May mắn.'], correctIndex: 1, explanation: 'Lừa não bộ tìm quy luật trong sự ngẫu nhiên.' },
      { id: 'q38_4', type: 'scenario', scenario: 'Bạn thi thử được 10, thi thật được 8, bạn bảo “do xui”.', options: ['Xui thật.', 'Phong độ cực cao thường không kéo dài lâu.', 'Học tài thi phận.', 'Do đề.'], correctIndex: 1, explanation: 'Phong độ cực cao thường không kéo dài lâu.' },
      { id: 'q38_5', type: 'scenario', scenario: 'Mắng nhân viên khi họ làm tệ làm họ làm tốt hơn (thực tế là do họ tự hồi quy).', options: ['Bạn uy quyền.', 'Lần sau họ tốt hơn đơn giản vì lần trước đã quá tệ.', 'Họ sợ.', 'May mắn.'], correctIndex: 1, explanation: 'Lần sau họ tốt hơn đơn giản vì lần trước đã quá tệ.' },
      { id: 'q38_6', type: 'scenario', scenario: 'Khen nhân viên làm họ làm dở đi vào lần sau.', options: ['Khen làm họ kiêu.', 'Năng lực đột biến luôn có xu hướng quay về mức cũ.', 'Họ lười.', 'May mắn.'], correctIndex: 1, explanation: 'Năng lực đột biến luôn có xu hướng quay về mức cũ.' },
      { id: 'q38_7', type: 'scenario', scenario: 'Làm thế nào để thám tử không bị số liệu lừa?', options: ['Tin trực giác.', 'Hiểu về xác suất và sự ngẫu nhiên.', 'Hỏi chuyên gia.', 'May mắn.'], correctIndex: 1, explanation: 'Quy luật số lớn không áp dụng cho số nhỏ.' },
      { id: 'q38_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án mạng xảy ra liên tiếp 3 ngày.', options: ['Chắc chắn hnay có tiếp.', 'Cảnh giác với sự trùng hợp ngẫu nhiên.', 'Bắt hung thủ.', 'May mắn.'], correctIndex: 1, explanation: 'Quy luật chỉ xuất hiện khi có bằng chứng, không phải sự đoán mò.' }
    ]
  },
  {
    id: 'q39',
    title: 'Kiểm soát',
    regionId: 'r5',
    requiredLevel: 39,
    xpReward: 300,
    gemReward: 10,
    questions: [
      { id: 'q39_1', type: 'scenario', scenario: 'Bạn nhấn nút đi bộ ở ngã tư liên tục và tin nó sẽ làm đèn xanh nhanh hơn (dù nút đó hỏng).', options: ['Bạn nhiệt tình.', 'Hành động tạo cảm giác ta đang làm chủ tình hình.', 'Nút đó xịn.', 'Do may.'], correctIndex: 1, explanation: 'Hành động tạo cảm giác ta đang làm chủ tình hình.' },
      { id: 'q39_2', type: 'scenario', scenario: 'Tự tay chọn số Vietlott và thấy tự tin thắng hơn là máy chọn.', options: ['Bạn có thần hộ mệnh.', 'Xác suất như nhau, nhưng cái tôi làm bạn thấy mình khác biệt.', 'Số đẹp.', 'Sự thật.'], correctIndex: 1, explanation: 'Xác suất như nhau, nhưng cái tôi làm bạn thấy mình khác biệt.' },
      { id: 'q39_3', type: 'scenario', scenario: 'Tại sao các nút “Đóng cửa” trong thang máy thường không có tác dụng?', options: ['Lỗi kỹ thuật.', 'Placebo button cho tâm trí bớt sốt ruột.', 'Hết tác dụng.', 'May mắn.'], correctIndex: 1, explanation: 'Placebo button cho tâm trí bớt sốt ruột.' },
      { id: 'q39_4', type: 'scenario', scenario: 'Cầu thủ mặc lại “chiếc tất may mắn” để đảm bảo chiến thắng.', options: ['Cẩn thận.', 'Mối liên hệ nhân quả ảo.', 'Tất đẹp.', 'Sự thật.'], correctIndex: 1, explanation: 'Mối liên hệ nhân quả ảo.' },
      { id: 'q39_5', type: 'scenario', scenario: 'Tại sao sếp hay bắt sửa những chi tiết nhỏ vô nghĩa trong báo cáo?', options: ['Sếp kỹ tính.', 'Để khẳng định quyền kiểm soát dự án.', 'Sếp rảnh.', 'Do bạn sai.'], correctIndex: 1, explanation: 'Sửa để thấy mình đang “làm việc”.' },
      { id: 'q39_6', type: 'scenario', scenario: 'Bạn tin mình có thể dự báo thời tiết bằng cách… nhìn mây theo kiểu riêng.', options: ['Bạn là thiên tài.', 'Gán quy luật cho sự hỗn loạn.', 'Mây nói thật.', 'May mắn.'], correctIndex: 1, explanation: 'Gán quy luật cho sự hỗn loạn.' },
      { id: 'q39_7', type: 'scenario', scenario: 'Hậu quả của illusion of control trong kinh doanh?', options: ['Thành công rực rỡ.', 'Chủ quan và bỏ qua các rủi ro khách quan.', 'Vui vẻ.', 'May mắn.'], correctIndex: 1, explanation: 'Tự tin quá mức dẫn đến thảm họa.' },
      { id: 'q39_8', type: 'scenario', scenario: 'Thám tử lắc xúc xắc mạnh tay để mong ra số to.', options: ['Khỏe tay.', 'Lực tay không thay đổi được số phận của hạt nhựa.', 'Do xúc xắc.', 'May mắn.'], correctIndex: 1, explanation: 'Lực tay không thay đổi được số phận của hạt nhựa.' }
    ]
  },
  {
    id: 'q40',
    title: 'Sàn đấu',
    regionId: 'r5',
    requiredLevel: 40,
    xpReward: 600,
    gemReward: 25,
    questions: [
      { id: 'q40_1', type: 'scenario', scenario: 'Phần thưởng cuối cùng của Sàn Đấu Ngáo Quyết Định là gì?', options: ['Tiền vàng.', 'Sự tự do khỏi những lựa chọn ngu ngốc.', 'Cúp.', 'Được khen.'], correctIndex: 1, explanation: 'Lý trí là tự do.' },
      { id: 'q40_2', type: 'scenario', scenario: 'Kẻ chiến thắng ở vùng này cần điều gì nhất?', options: ['Tiền.', 'Tư duy “Số 0”: Luôn bắt đầu từ con số 0 để đánh giá.', 'Máu lạnh.', 'Sự may mắn.'], correctIndex: 1, explanation: 'Quên quá khứ để nhìn vào sự thực.' },
      { id: 'q40_3', type: 'scenario', scenario: 'Bạn bước ra khỏi sàn đấu và thấy mình… vẫn nghèo.', options: ['Đúng thế.', 'Giàu kiến thức là bước đầu của giàu tiền bạc.', 'Game lừa.', 'Ảo giác.'], correctIndex: 1, explanation: 'Kiến thức cần thời gian để đơm hoa.' },
      { id: 'q40_4', type: 'scenario', scenario: 'Vũ khí bí mật của thám tử để không bao giờ “Ngáo”?', options: ['Súng.', 'Luôn dùng bộ não hệ thống 2 để phân tích.', 'Kính lúp.', 'Tiền.'], correctIndex: 1, explanation: 'Chậm lại để đúng hơn.' },
      { id: 'q40_5', type: 'scenario', scenario: 'Tại sao vùng này lại có tên là “Sàn Đấu”?', options: ['Cho oai.', 'Vì bạn phải đấu tranh với chính bản năng của mình.', 'Có quái vật.', 'Gợi cảm hứng.'], correctIndex: 1, explanation: 'Kẻ thù lớn nhất là bản thân.' },
      { id: 'q40_6', type: 'scenario', scenario: 'Chúc mừng bạn đã hoàn thành 40 kỳ án!', options: ['Cảm ơn.', 'Quyết tâm mở khóa vùng cuối cùng.', 'Nghỉ thôi.', 'Mệt quá.'], correctIndex: 1, explanation: 'Đỉnh cao vẫy gọi.' },
      { id: 'q40_7', type: 'scenario', scenario: 'Bạn cảm thấy mình thông minh lên 200%.', options: ['Đúng thế.', 'Cẩn thận với Dunning–Kruger (vùng 1).', 'Ảo giác.', 'May mắn.'], correctIndex: 1, explanation: 'Vừa học xong là lúc dễ ảo tưởng nhất.' },
      { id: 'q40_8', type: 'scenario', scenario: 'Thám tử bước vào thang máy đi lên tầng cao nhất.', options: ['Đóng cửa.', 'Sẵn sàng cho Tháp Thao Túng.', 'Đi xuống.', 'May mắn.'], correctIndex: 1, explanation: 'Chặng đường cuối cùng bắt đầu.' }
    ]
  },

  // ===================== VÙNG 6: THAO TÚNG =====================

];