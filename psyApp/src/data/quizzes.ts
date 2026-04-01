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

// ─── Quizzes ─────────────────────────────────────────────────────────────────

export const QUIZZES: Quiz[] = [
  // ===================== VÙNG 1: LÃNH ĐỊA "TƯỞNG BỞ" =====================
  {
    id: 'q1',
    title: 'Cao thủ 24h – Sự tự tin mù quáng',
    regionId: 'r1',
    requiredLevel: 1,
    xpReward: 60,
    gemReward: 4,
    questions: [
      { id: 'q1_1', type: 'scenario', scenario: 'Vừa học được vài hợp âm guitar cơ bản, bạn đã lập tức chi số tiền lớn để đặt lịch biểu diễn tại phòng trà.', options: ['Tin rằng năng lực bản thân đã đủ để trình diễn chuyên nghiệp.', 'Mong muốn được trình diễn trên các sân khấu lớn và đẳng cấp.', 'Hy vọng việc gia nhập ban nhạc sẽ thúc đẩy quá trình luyện tập.', 'Cho rằng sở hữu nhạc cụ tốt là yếu tố then chốt cho thành công.'], correctIndex: 0, explanation: 'Khi mới bắt đầu, chúng ta thường có xu hướng đánh giá quá cao năng lực của bản thân.' },
      { id: 'q1_2', type: 'scenario', scenario: 'Hết ngày thực tập đầu tiên, bạn đã chủ động yêu cầu sếp thay đổi hoàn toàn quy trình làm việc hiện tại.', options: ['Cho rằng kinh nghiệm cá nhân của mình vượt trội hơn tập thể.', 'Muốn đóng góp những ý tưởng mới mẻ để cải thiện môi trường.', 'Cảm thấy quy trình cũ không còn phù hợp với xu hướng hiện đại.', 'Hy vọng hành động này sẽ giúp bản thân sớm được ghi nhận công.'], correctIndex: 0, explanation: 'Người chưa có kinh nghiệm thực tế thường khó nhận thấy độ phức tạp của công việc.' },
      { id: 'q1_3', type: 'scenario', scenario: 'Một chuyên gia có thâm niên 20 năm trong ngành thường chia sẻ rằng mình vẫn còn rất nhiều kiến thức cần học hỏi.', options: ['Cố gắng duy trì hình ảnh khiêm tốn trước đồng nghiệp cấp dưới.', 'Thực sự nhận thức được sự rộng lớn và phức tạp của chuyên môn.', 'Cảm thấy lo lắng về sự xuất hiện của các công nghệ mới hiện nay.', 'Muốn khuyến khích các nhân viên trẻ tích cực trau dồi bản thân.'], correctIndex: 1, explanation: 'Càng hiểu sâu về một lĩnh vực, chúng ta càng thấy được những giới hạn của trí tuệ.' },
      { id: 'q1_4', type: 'scenario', scenario: 'Chỉ sau vài buổi tập thể hình, bạn đã tự tin thách đấu với những người có thâm niên trong phòng tập.', options: ['Cảm thấy cơ thể đã có sự thay đổi rõ rệt về sức mạnh cơ bắp.', 'Nhầm lẫn giữa sự hưng phấn nhất thời và năng lực thực tế.', 'Muốn kiểm tra giới hạn chịu đựng của bản thân qua các thử thách.', 'Tin rằng ý chí quyết tâm có thể bù đắp cho sự thiếu hụt kỹ năng.'], correctIndex: 1, explanation: 'Sự tự tin thường gia tăng nhanh chóng trong giai đoạn đầu học tập một kỹ năng mới.' },
      { id: 'q1_5', type: 'scenario', scenario: 'Một người thường xuyên đưa ra các nhận định chắc chắn về những lĩnh vực mà họ không có chuyên môn sâu.', options: ['Có khả năng tổng hợp thông tin nhanh nhạy từ nhiều nguồn khác.', 'Thiếu khả năng tự nhận thức để thấy được sự hạn chế của mình.', 'Sở hữu trí thông minh đa dạng và tầm nhìn bao quát vấn đề.', 'Muốn tạo ấn tượng với người xung quanh về sự hiểu biết rộng.'], correctIndex: 1, explanation: 'Người thiếu năng lực thường thiếu luôn khả năng nhận ra sự thiếu hụt của chính họ.' },
      { id: 'q1_6', type: 'scenario', scenario: 'Sau khi tự sửa thành công một lỗi phần mềm nhỏ, bạn tin rằng mình có thể đảm nhận các dự án bảo mật lớn.', options: ['Cân nhắc việc chuyển hướng sự nghiệp sang lĩnh vực an ninh mạng.', 'Dựa vào một thành công nhỏ để khẳng định trình độ chuyên môn.', 'Muốn thử thách bản thân ở những lĩnh vực có độ khó cao hơn.', 'Cho rằng niềm đam mê là yếu tố quan trọng nhất để thành công.'], correctIndex: 1, explanation: 'Một kết quả thuận lợi ngẫu nhiên dễ khiến chúng ta đánh giá sai về độ khó thực tế.' },
      { id: 'q1_7', type: 'scenario', scenario: 'Khi xem một chương trình nghệ thuật phức tạp, bạn cho rằng mình có thực hiện lại một cách dễ dàng và hoàn hảo hơn.', options: ['Sở hữu năng khiếu bẩm sinh chưa được khai phá hết tiềm năng.', 'Chưa hiểu rõ những kỹ thuật và công sức đứng sau tác phẩm.', 'Muốn tìm kiếm hướng đi mới mẻ hơn cho các sản phẩm nghệ thuật.', 'Cảm thấy phong cách hiện tại của chương trình chưa thực sự tốt.'], correctIndex: 1, explanation: 'Khoảng cách giữa việc quan sát và thực hiện thực tế thường bị chúng ta phớt lờ.' },
      { id: 'q1_8', type: 'scenario', scenario: 'Dấu hiệu nào cho thấy một người bắt đầu thoát khỏi sự tự tin mù quáng để tiến tới sự thông thái thực sự?', options: ['Nhận được nhiều lời khen ngợi và sự ủng hộ từ những người xung quanh.', 'Bắt đầu nhận thấy những sai sót và giới hạn trong cách làm của mình.', 'Đạt được những thành tựu nhất định và có chỗ đứng trong cộng đồng.', 'Xây dựng được một mạng lưới các mối quan hệ với những người giỏi.'], correctIndex: 1, explanation: 'Sự tỉnh ngộ bắt đầu khi chúng ta chấp nhận rằng bản thân còn nhiều điều phải học.' }
    ]
  },
  {
    id: 'q2',
    title: 'Sức mạnh gợi ý – Ảnh hưởng của thông tin đầu tiên',
    regionId: 'r1',
    requiredLevel: 2,
    xpReward: 80,
    gemReward: 6,
    questions: [
      { id: 'q2_1', type: 'scenario', scenario: 'Khi nghe báo giá một chiếc túi xách là 5 triệu đồng, bạn sẵn sàng mua ngay khi người bán hạ giá xuống còn 3 triệu đồng.', options: ['Cảm thấy bản thân đã thực hiện được một giao dịch có lợi.', 'Nhận định rằng chất lượng của túi xách tương xứng với số tiền.', 'Muốn sở hữu nhanh chóng để tránh việc bị người khác mua mất.', 'Cho rằng 3 triệu đồng là mức giá trung bình của thị trường hiện nay.'], correctIndex: 0, explanation: 'Con số 5 triệu đã trở thành điểm tham chiếu khiến mức giá 3 triệu trở nên hấp dẫn.' },
      { id: 'q2_2', type: 'scenario', scenario: 'Một cửa hàng niêm yết thẻ giảm giá "Tiết kiệm 500.000đ" cho đơn hàng 2 triệu đồng thay vì ghi giá cuối cùng là 1,5 triệu đồng.', options: ['Giúp khách hàng dễ dàng tính toán số tiền họ cần phải thanh toán.', 'Tập trung sự chú ý vào lợi ích đạt được thay vì số tiền bỏ ra.', 'Muốn giới thiệu thêm các chương trình ưu đãi khác của cửa hàng.', 'Tạo điều kiện để người mua có thể lựa chọn nhiều mặt hàng hơn.'], correctIndex: 1, explanation: 'Con số giảm giá lớn tạo ấn tượng mạnh mẽ về giá trị mà khách hàng nhận được.' },
      { id: 'q2_3', type: 'scenario', scenario: 'Trong buổi họp đầu năm, lãnh đạo tuyên bố mục tiêu doanh thu tăng 300% khiến mọi người cảm thấy áp lực lớn.', options: ['Cảm thấy lo lắng về khả năng hoàn thành công việc của đội ngũ.', 'Lấy con số cao nhất làm mốc để đánh giá các kết quả sau này.', 'Muốn tìm kiếm các giải pháp đột phá để cải thiện quy trình làm.', 'Cho rằng đây là chiến lược phát triển đầy tham vọng của công ty.'], correctIndex: 1, explanation: 'Một mục tiêu cực đoan sẽ định hình lại toàn bộ kỳ vọng và nỗ lực của nhân viên.' },
      { id: 'q2_4', type: 'scenario', scenario: 'Người bán hàng hỏi: "Anh muốn chọn gói dịch vụ 12 tháng hay 24 tháng?" thay vì hỏi bạn có muốn đăng ký hay không.', options: ['Cố gắng hỗ trợ khách hàng tìm kiếm giải pháp thanh toán phù hợp nhất.', 'Định hướng sự lựa chọn của đối trọng vào các phương án có lợi cho mình.', 'Giúp người mua cảm thấy có quyền tự quyết trong quá trình giao dịch.', 'Tối ưu hóa thời gian tư vấn bằng cách đi thẳng vào các mốc thời gian.'], correctIndex: 1, explanation: 'Việc giới hạn sự lựa chọn trong một khung có sẵn làm giảm khả năng từ chối.' },
      { id: 'q2_5', type: 'scenario', scenario: 'Trong một cuộc đấu giá, người điều hành đưa ra mức giá khởi điểm rất cao cho một món đồ bình thường.', options: ['Tạo ra sự khan hiếm giả tạo để tăng thêm giá trị cho vật phẩm.', 'Thiết lập một mốc đánh giá cao để lôi kéo các mức giá sau đó.', 'Muốn sàng lọc những người tham gia thực sự có năng lực tài chính.', 'Đảm bảo doanh thu tối thiểu cho đơn vị tổ chức và người ký gửi.'], correctIndex: 1, explanation: 'Mức giá đầu tiên thường chi phối mạnh mẽ các nhận định về giá trị sau đó.' },
      { id: 'q2_6', type: 'scenario', scenario: 'Bạn nhìn thấy một biển quảng cáo: "Chỉ giới hạn 3 món đồ cho mỗi khách hàng" dù cửa hàng vẫn còn rất nhiều hàng.', options: ['Khuyến khích mọi người mua sắm có trách nhiệm để chia sẻ cho người khác.', 'Tận dụng con số giới hạn để kích thích nhu cầu sở hữu của mọi người.', 'Định hướng người dùng tập trung vào những mặt hàng thiết yếu nhất.', 'Giúp cửa hàng kiểm soát được lượng tồn kho thực tế trong ngày.'], correctIndex: 1, explanation: 'Các con số giới hạn thường trở thành mỏ neo thúc đẩy hành vi mua nhiều hơn.' },
      { id: 'q2_7', type: 'scenario', scenario: 'Tại sao việc thương lượng lương nên là người đưa ra con số đầu tiên thay vì chờ đợi phía đối tác?', options: ['Thể hiện sự tự tin và năng lực chủ động trong mọi tình huống giao tiếp.', 'Để biến con số đó thành tâm điểm cho mọi sự điều chỉnh về sau.', 'Giúp tiết kiệm thời gian cho cả hai bên trong các buổi phỏng vấn.', 'Tạo thiện cảm với nhà tuyển dụng về sự minh bạch trong mong muốn.'], correctIndex: 1, explanation: 'Con số đầu tiên đưa ra sẽ trở thành "mỏ neo" cho toàn bộ cuộc thương thảo.' },
      { id: 'q2_8', type: 'scenario', scenario: 'Thám tử phát hiện một bằng chứng nhỏ ở hiện trường và ngay lập tức tập trung mọi hướng điều tra vào đó.', options: ['Bằng chứng này có độ tin cậy cao nhất trong số các dữ liệu thu thập.', 'Thông tin ban đầu thường gây ấn tượng mạnh và khó bị thay đổi.', 'Cơ quan điều tra ưu tiên xử lý các manh mối có tính logic rõ ràng.', 'Mọi người tin rằng những chi tiết đầu tiên luôn chứa đựng sự thật.'], correctIndex: 1, explanation: 'Ấn tượng ban đầu có thể làm lệch hướng tư duy đa chiều của người điều tra.' }
    ]
  },
  {
    id: 'q3',
    title: 'Sự chọn lọc thông tin – Nhìn thấy điều mình muốn thấy',
    regionId: 'r1',
    requiredLevel: 3,
    xpReward: 100,
    gemReward: 8,
    questions: [
      { id: 'q3_1', type: 'scenario', scenario: 'Khi nghe tin đồn không hay về một người mà bạn rất yêu quý, bạn chỉ tập trung tìm kiếm những bằng chứng minh oan cho họ.', options: ['Thể hiện sự tin tưởng tuyệt đối và lòng trung thành trong tình bạn.', 'Chỉ tiếp nhận những dữ liệu phù hợp với quan điểm tốt đẹp sẵn có.', 'Cảm thấy lo lắng cho danh tiếng và tương lai của người bạn đó.', 'Muốn tìm ra sự thật khách quan nhất để bảo vệ lẽ phải của mình.'], correctIndex: 1, explanation: 'Chúng ta có xu hướng ủng hộ những niềm tin sẵn có và phớt lờ các thông tin đối lập.' },
      { id: 'q3_2', type: 'scenario', scenario: 'Bạn vốn không có thiện cảm với một đồng nghiệp, nên bất cứ hành động nào của họ cũng làm bạn cảm thấy khó chịu.', options: ['Nhận thấy phong cách làm việc của họ hoàn toàn không đạt yêu cầu.', 'Gán ghép những ý nghĩa tiêu cực cho mọi hành vi của đối phương.', 'Cảm thấy môi trường làm việc bị ảnh hưởng bởi thái độ của họ.', 'Mong muốn cấp trên có những biện pháp xử lý công bằng và thỏa đáng.'], correctIndex: 1, explanation: 'Định kiến khiến chúng ta chỉ lọc ra những hành vi tiêu cực để củng cố cảm xúc bực bội.' },
      { id: 'q3_3', type: 'scenario', scenario: 'Tin rằng hôm nay là một ngày xui xẻo, bạn cho rằng việc gặp đèn đỏ liên tục là bằng chứng cho dự cảm của mình.', options: ['Thấu hiểu quy luật vận hành của sự may rủi trong đời sống thực tế.', 'Cố ý kết nối các sự kiện ngẫu nhiên để khớp với suy nghĩ ban đầu.', 'Cảm thấy cần phải thận trọng hơn trong mọi quyết định thực hiện.', 'Cho rằng những yếu tố môi trường đang phản ảnh tâm trạng cá nhân.'], correctIndex: 1, explanation: 'Mọi sự kiện bình thường đều có thể được diễn giải thành điềm báo nếu bạn đã tin vào nó.' },
      { id: 'q3_4', type: 'scenario', scenario: 'Dù dự án kinh doanh đang thua lỗ, bạn vẫn chỉ dành thời gian đọc những báo cáo dự báo thị trường sẽ khởi sắc.', options: ['Duy trì tinh thần lạc quan để tiếp tục nỗ lực trong giai đoạn khó.', 'Lựa chọn thông tin có tính an ủi để tránh đối mặt với sự thất bại.', 'Xây dựng các kế hoạch dự phòng nhằm giảm thiểu rủi ro tài chính.', 'Tin tưởng vào kinh nghiệm xử lý tình huống của đội ngũ lãnh đạo.'], correctIndex: 1, explanation: 'Việc tránh né sự thật giúp chúng ta cảm thấy dễ chịu hơn nhưng không giải quyết được vấn đề.' },
      { id: 'q3_5', type: 'scenario', scenario: 'Bạn đang dành sự quan tâm đặc biệt cho một người và tin rằng mỗi hành động nhỏ của họ đều dành cho mình.', options: ['Cảm nhận được sự kết nối tâm hồn và đồng điệu trong giao tiếp.', 'Diễn giải những hành vi vô tình theo mong muốn chủ quan của mình.', 'Cho rằng thời điểm hiện tại rất phù hợp để bắt đầu một mối quan hệ.', 'Mong muốn đối phương sớm có những phản hồi rõ ràng về cảm xúc.'], correctIndex: 1, explanation: 'Mong ước cá nhân thường là cái kính lọc bóp méo ý nghĩa thực sự của hành động.' },
      { id: 'q3_6', type: 'scenario', scenario: 'Các ứng dụng mạng xã hội liên tục hiển thị những bài viết có cùng quan điểm với những gì bạn thường xuyên chia sẻ.', options: ['Giúp người dùng dễ dàng tìm kiếm những nội dung mà mình yêu thích.', 'Tạo ra một không gian đóng kín chỉ chứa các ý kiến tương đồng.', 'Cỗ máy củng cố thiên lệch thông qua việc lọc dữ liệu cá nhân.', 'Khuyến khích việc kết nối với những người bạn có chung sở thích.'], correctIndex: 1, explanation: 'Thuật toán củng cố những gì bạn đã thích, khiến bạn ngày càng xa rời những luồng tư duy khác.' },
      { id: 'q3_7', type: 'scenario', scenario: 'Trong các cuộc tranh luận, hai bên thường chỉ đưa ra những lý lẽ ủng hộ mình và bác bỏ hoàn toàn dữ liệu từ đối phương.', options: ['Thể hiện sự kiên định và tin tưởng vào chân lý mà mình đang nắm giữ.', 'Không có khả năng xem xét vấn đề từ các góc nhìn khác biệt hơn.', 'Cảm thấy cần phải bảo vệ cái tôi cá nhân trước áp lực của tập thể.', 'Mong muốn đạt được sự đồng thuận nhanh chóng để kết thúc buổi họp.'], correctIndex: 1, explanation: 'Thiên lệch xác nhận khiến cuộc đối thoại trở thành hai màn độc thoại không có điểm chung.' },
      { id: 'q3_8', type: 'scenario', scenario: 'Phương pháp hiệu quả nhất để một thám tử không bị rơi vào cái bẫy của những giả thuyết có sẵn là gì?', options: ['Luôn tin tưởng vào trực giác và những kinh nghiệm phá án trước đây.', 'Chủ động tìm kiếm những bằng chứng có khả năng bác bỏ giả thuyết.', 'Tham khảo ý kiến của số đông để đảm bảo tính khách quan của vụ án.', 'Chờ đợi những chỉ thị chính thức từ phía các cơ quan điều tra cấp cao.'], correctIndex: 1, explanation: 'Chỉ khi dám chứng minh mình sai, thám tử mới có thể tìm thấy sự thật thực sự.' }
    ]
  },
  {
    id: 'q4',
    title: 'Phân chia thành công – Cách chúng ta nhìn nhận kết quả',
    regionId: 'r1',
    requiredLevel: 4,
    xpReward: 120,
    gemReward: 10,
    questions: [
      { id: 'q4_1', type: 'scenario', scenario: 'Khi giành chiến thắng trong một trò chơi, bạn khẳng định đó là nhờ kỹ năng; nhưng khi thua, bạn đổ lỗi cho đường truyền.', options: ['Đánh giá một cách khách quan về các tác động ngoại cảnh của trận đấu.', 'Cố gắng bảo vệ hình ảnh năng lực của bản thân trước các thất bại.', 'Nhận thấy sự chuẩn bị về mặt kỹ thuật còn nhiều sơ hở cần khắc phục.', 'Mong muốn nhận được sự đồng cảm từ những người tham gia cùng lúc.'], correctIndex: 1, explanation: 'Chúng ta thường vơ lấy công trạng nhưng lại đẩy đi những trách nhiệm khi kết quả không tốt.' },
      { id: 'q4_2', type: 'scenario', scenario: 'Bạn đạt điểm cao trong kỳ thi và cho rằng mình thông minh, nhưng khi điểm thấp, bạn nói đề thi quá khó.', options: ['Xác định được những điểm mạnh và điểm yếu trong quá trình học tập.', 'Gán nguyên nhân thành công cho bản thân và thất bại cho hoàn cảnh.', 'Cảm thấy giáo viên chưa thực sự công bằng trong việc đặt câu hỏi.', 'Hy vọng vào một kết quả tốt hơn trong những kỳ kiểm tra sắp tới.'], correctIndex: 1, explanation: 'Cách nhìn nhận này giúp chúng ta duy trì sự tự tôn nhưng lại cản trở việc nhìn lại lỗi sai.' },
      { id: 'q4_3', type: 'scenario', scenario: 'Một nhà quản lý khen ngợi sự chỉ đạo của mình khi dự án thành công, nhưng chỉ trích nhân viên khi dự án thất bại.', options: ['Thể hiện cái nhìn toàn diện về vai trò của lãnh đạo trong tập thể.', 'Tự đề cao đóng góp cá nhân và trốn tránh trách nhiệm khi có lỗi.', 'Cảm thấy đội ngũ nhân sự hiện tại cần được đào tạo chuyên sâu hơn.', 'Mong muốn tìm ra các phương án tối ưu để cải thiện năng suất làm.'], correctIndex: 1, explanation: 'Đây là thói quen tâm lý phổ biến nhằm giữ vững quyền uy của người đứng đầu.' },
      { id: 'q4_4', type: 'scenario', scenario: 'Xảy ra va chạm giao thông, bạn tin rằng mình lái xe rất cẩn thận và lỗi hoàn toàn thuộc về người lái phía đối diện.', options: ['Cho rằng môi trường giao thông hiện giờ quá phức tạp và nguy hiểm.', 'Tự động loại bỏ khả năng sai sót của chính mình trong sự cố này.', 'Cảm thấy cần phải có những quy định khắt khe hơn để đảm bảo an toàn.', 'Mong muốn nhận được sự bồi thường xứng đáng cho những thiệt hại.'], correctIndex: 1, explanation: 'Ít ai có đủ dũng cảm để thừa nhận lỗi lầm của mình ngay trong những tình huống bất ngờ.' },
      { id: 'q4_5', type: 'scenario', scenario: 'Một người thắng bạc tin rằng mình có chiến thuật tốt, nhưng khi thua họ lại cho rằng hôm nay là ngày đen đủi.', options: ['Thấy được giá trị của việc nghiên cứu kỹ lưỡng các quy luật may rủi.', 'Hợp thức hóa các biến cố ngẫu nhiên theo hướng có lợi cho cái tôi.', 'Cảm thấy hối hận vì đã không dừng lại đúng lúc để bảo toàn vốn.', 'Cho rằng hệ thống máy móc của sòng bạc có những sai lệch nhất định.'], correctIndex: 1, explanation: 'Sự tự lừa dối này khiến người chơi có niềm tin giả tạo vào khả năng kiểm soát may rủi.' },
      { id: 'q4_6', type: 'scenario', scenario: 'Sau một mối quan hệ đổ vỡ, một người khẳng định rằng tất cả các vấn đề đều bắt nguồn từ tính cách của đối phương.', options: ['Nhận ra những mâu thuẫn không thể hàn gắn giữa hai bên trong cuộc sống.', 'Phớt lờ những thiếu sót của bản thân để giảm bớt sự tổn thương lòng.', 'Cảm thấy cần có thời gian để chữa lành những nỗi đau về mặt cảm xúc.', 'Mong muốn tìm kiếm một đối tượng mới phù hợp hơn với quan điểm mình.'], correctIndex: 1, explanation: 'Việc đổ lỗi hoàn toàn cho người khác là cách não bộ giảm nhẹ áp lực tội lỗi.' },
      { id: 'q4_7', type: 'scenario', scenario: 'Một dự án khởi nghiệp thất bại và người sáng lập đổ lỗi hoàn toàn cho sự biến động tiêu cực của thị trường.', options: ['Nhận thấy tầm ảnh hưởng của các yếu tố kinh tế vĩ mô đối với doanh nghiệp.', 'Từ chối xem xét những lỗ hổng trong công tác quản trị và vận hành.', 'Cảm thấy cần có những chiến lược thích ứng linh hoạt hơn với thực tế.', 'Cho rằng đây là một bài học đắt giá cho các kế hoạch phát triển sau.'], correctIndex: 1, explanation: 'Hoàn cảnh luôn là cái cớ hoàn hảo để che đậy những sai lầm trong tính toán cá nhân.' },
      { id: 'q4_8', type: 'scenario', scenario: 'Khi không tìm ra hung thủ, một thám tử báo cáo rằng kẻ phạm tội là một thiên tài với những thủ đoạn quá tinh vi.', options: ['Đánh giá cao kỹ năng của đối thủ để nâng tầm quan trọng của vụ án.', 'Dùng sự xuất sắc của đối phương để biện minh cho sự bế tắc hiện tại.', 'Cảm thấy cần phải tăng cường thêm quân số cho các hoạt động điều tra.', 'Cho rằng manh mối hiện tại chưa đủ để đưa ra bất kỳ kết luận nào.'], correctIndex: 1, explanation: 'Tôn vinh kẻ thù đôi khi chỉ là một cách để xoa dịu thất bại của chính mình.' }
    ]
  },
  {
    id: 'q5',
    title: 'Tác động của thông tin nổi bật',
    regionId: 'r1',
    requiredLevel: 5,
    xpReward: 60,
    gemReward: 2,
    questions: [
      { id: 'q5_1', type: 'scenario', scenario: 'Sau khi xem liên tiếp các bản tin về tai nạn máy bay, nhiều người cảm thấy đi máy bay nguy hiểm hơn đi ô tô.', options: ['Những sự kiện tương tự dễ dàng được truy xuất từ trí nhớ thường làm gia tăng cảm nhận về rủi ro thực tế.', 'Hàng không là lĩnh vực đòi hỏi các tiêu chuẩn an toàn nghiêm ngặt nhất để bảo vệ tính mạng hành khách.', 'Mọi người tin rằng các phương tiện giao thông công cộng luôn có xác suất xảy ra sự cố cao hơn cá nhân.', 'Các phương tiện truyền thông thường tập trung khai thác những khía cạnh giật gân để thu hút người xem.'], correctIndex: 0, explanation: 'Tính sẵn có của thông tin trong tâm trí thường bị nhầm lẫn with xác suất thực tế.' },
      { id: 'q5_2', type: 'scenario', scenario: 'Tại sao chúng ta thường lo lắng về những sự cố hiếm gặp nhưng có hình ảnh kinh khủng hơn là các nguy cơ thường trực?', options: ['Những thông tin mang tính gợi hình mạnh mẽ thường để lại ấn tượng sâu đậm và dễ dàng nhớ lại hơn.', 'Các sự cố hiếm gặp luôn tiềm ẩn những hậu quả nghiêm trọng mà xã hội chưa thể tìm ra cách khắc phục.', 'Sự lo lắng là phản xạ tự nhiên giúp con người cảnh giác trước mọi biến động bất thường của môi trường.', 'Chúng ta thiếu đi các kỹ năng cần thiết để phân tích số liệu thống kê một cách khoa học và khách quan.'], correctIndex: 0, explanation: 'Căng thẳng tâm lý thường tỷ lệ thuận with độ rõ nét của thông tin trong bộ nhớ.' },
      { id: 'q5_3', type: 'scenario', scenario: 'Một người vừa trúng số ở khu phố khiến cư dân xung quanh tin rằng cơ hội trúng giải của mình cũng đang tăng lên.', options: ['Vận may thường có xu hướng lan tỏa trong một phạm vi không gian và thời gian cụ thể của cộng đồng.', 'Sự kiện vừa xảy ra tạo nên một mốc tham chiếu sống động khiến mọi người đánh giá sai về xác suất.', 'Niềm tin vào các quy luật ngẫu nhiên giúp duy trì trạng thái lạc quan và động lực trong đời sống.', 'Những thông tin tích cực về tài chính luôn có sức hút mạnh mẽ đối với mọi tầng lớp trong xã hội.'], correctIndex: 1, explanation: 'Ví dụ sống động ở gần khiến con người lờ đi các quy luật về mặt toán học.' },
      { id: 'q5_4', type: 'scenario', scenario: 'Trong quá trình đánh giá nhân viên, sếp thường nhớ rất rõ những lỗi sai vừa mới xảy ra trong tuần cuối cùng.', options: ['Những dữ liệu gần nhất về thời gian thường chiếm ưu thế trong quá trình xử lý và truy xuất thông tin.', 'Lỗi sai ở giai đoạn cuối dự án thường để lại những hệ quả trực tiếp đến kết quả kinh doanh của nhóm.', 'Người quản lý luôn đặt ra những tiêu chuẩn khắt khe nhất đối với hiệu suất làm việc vào cuối kỳ nghỉ.', 'Các sự cố mới phát sinh đòi hỏi sự tập trung tối đa của lãnh đạo để đưa ra các phương án xử lý kịp thời.'], correctIndex: 0, explanation: 'Thời điểm tiếp nhận thông tin ảnh hưởng lớn đến trọng số đánh giá của cá nhân.' },
      { id: 'q5_5', type: 'scenario', scenario: 'Làm thế nào để hạn chế việc đưa ra quyết định dựa trên những thông tin nổi bật nhưng không mang tính đại diện?', options: ['Chủ động tìm kiếm và phân tích các số liệu thống kê tổng thể thay vì chỉ dựa vào một vài ví dụ lẻ tẻ.', 'Tham khảo ý kiến của những người có cùng trải nghiệm để củng cố thêm niềm tin vào nhận định ban đầu.', 'Tin tưởng vào trực giác cá nhân vốn đã được rèn luyện qua nhiều tình huống tương tự trong quá khứ.', 'Lựa chọn những thông tin có độ tin cậy cao nhất từ các nguồn truyền thông chính thống tại địa phương.'], correctIndex: 0, explanation: 'Sự khách quan chỉ đạt được khi chúng ta nhìn vào bức tranh toàn cảnh rộng lớn.' },
      { id: 'q5_6', type: 'scenario', scenario: 'Bạn nghe nhiều người kể về việc thành công nhờ bỏ học và bắt đầu nghĩ rằng bằng cấp không còn quan trọng.', options: ['Những câu chuyện về trường hợp ngoại lệ thường gây ấn tượng mạnh và dễ bị nhầm là quy luật chung.', 'Sự nỗ lực cá nhân và khả năng thích nghi thực tế là yếu tố then chốt quyết định thành công của con người.', 'Thị trường lao động hiện đại đang dần chuyển dịch trọng tâm từ bằng cấp sang các kỹ năng làm việc thực.', 'Chúng ta nên học tập từ các tấm gương đi đầu để có thể tìm ra con đường phát triển ngắn nhất cho mình.'], correctIndex: 0, explanation: 'Sự nổi bật của các cá nhân tiêu biểu dễ tạo ra một cái nhìn lệch lạc về thực tế.' },
      { id: 'q5_7', type: 'scenario', scenario: 'Tại sao các vụ cá mập tấn công lại gây sợ hãi lớn dù xác suất xảy ra thấp hơn nhiều so với tai nạn xe máy?', options: ['Sự kịch tính và độ hiếm của sự việc khiến thông tin được lưu giữ bền vững và dễ bộc phát trong nhận thức.', 'Hành vi của động vật hoang dã luôn tiềm ẩn những yếu tố bất ngờ mà con người không thể kiểm soát được.', 'Cảm giác bất lực khi đối mặt with nguy hiểm từ thiên nhiên tạo ra những rào cản tâm lý cực kỳ nặng nề.', 'Các phương tiện truyền thông tập trung phản ánh những mặt tối của sự việc nhằm cảnh báo cho cộng đồng.'], correctIndex: 0, explanation: 'Chúng ta sợ hãi những gì chúng ta dễ dàng hình dung ra trong tâm trí mình.' },
      { id: 'q5_8', type: 'scenario', scenario: 'Thám tử thấy hiện trường có nhiều vỏ chai rượu nên cho rằng vụ án chắc chắn liên quan đến một kẻ nghiện ngập.', options: ['Sự hiện diện của các bằng chứng vật chất hiển nhiên thường dẫn dắt phán đoán theo hướng dễ thấy nhất.', 'Các vật dụng tại hiện trường là manh mối khách quan để dựng lại chân dung tâm lý của kẻ gây án.', 'Việc tập trung vào các đối tượng có hành vi lệch chuẩn giúp thu hẹp phạm vi tìm kiếm của cơ quan chức năng.', 'Kinh nghiệm điều tra cho thấy các vụ việc bộc phát thường gắn liền with sự thiếu kiểm soát cá nhân.'], correctIndex: 0, explanation: 'Thông tin nổi bật trước mắt thường trở thành cái bẫy ngăn cản tư duy đa chiều.' }
    ]
  },
  {
    id: 'q6',
    title: 'Lời tiên đoán màu nhiệm – Khi sự mơ hồ trở nên thuyết phục',
    regionId: 'r1',
    requiredLevel: 6,
    xpReward: 160,
    gemReward: 14,
    questions: [
      { id: 'q6_1', type: 'scenario', scenario: 'Thầy bói phán: "Bạn là người độc lập nhưng đôi khi cũng cần sự đồng cảm". Bạn gật gù vì thấy đúng.', options: ['Nhận ra thầy bói có khả năng thấu thị tâm hồn người khác.', 'Thiên hướng tin vào các mô tả chung chung và mang tính phổ quát.', 'Cảm thấy cần phải kết nối nhiều hơn with những người xung quanh.', 'Cho rằng đây là một lời khuyên chân thành cho tương lai của mình.'], correctIndex: 1, explanation: 'Lời phán chung chung đến 90% dân số đều có thể thấy đúng with bản thân.' },
      { id: 'q6_2', type: 'scenario', scenario: 'App cung hoàng đạo bảo "Sư tử hôm nay gặp may". Bạn nhặt được 5k và tin sái cổ.', options: ['Xác nhận rằng các bộ môn chiêm tinh có độ chính xác rất cao.', 'Gán ghép sự kiện ngẫu nhiên vào lời tiên đoán mơ hồ có sẵn.', 'Cảm thấy may mắn vì đã được các vì sao chỉ dẫn vào đầu ngày.', 'Muốn giới thiệu ứng dụng này cho bạn bè có cùng cung hoàng đạo.'], correctIndex: 1, explanation: 'Bạn tự ghép một biến cố nhỏ ngẫu nhiên vào một lời tiên đoán không rõ ràng.' },
      { id: 'q6_3', type: 'scenario', scenario: 'Biên bản mô tả nghi phạm: "Hắn có nội tâm phức tạp, vừa lạnh lùng vừa có những phút giây yếu lòng".', options: ['Đánh giá đây là một bản phân tích tâm lý tội phạm cực kỳ sâu sắc.', 'Những mô tả mâu thuẫn thường dễ được mọi người chấp nhận là đúng.', 'Cảm thấy đồng cảm with những góc khuất trong cuộc đời của nghi phạm.', 'Tin rằng kẻ phạm tội vẫn còn giữ được những bản tính lương thiện.'], correctIndex: 1, explanation: 'Những mô tả mang tính hai mặt thường khiến chúng ta thấy đúng trong mọi hoàn cảnh.' },
      { id: 'q6_4', type: 'scenario', scenario: 'Tại sao các bài trắc nghiệm tính cách trên mạng thường nhận được rất nhiều lượt chia sẻ và đánh giá cao?', options: ['Vì chúng phân tích chính xác từng đặc điểm riêng biệt của mỗi người.', 'Sử dụng các lời khen phổ quát khiến người dùng cảm thấy hài lòng.', 'Giúp mọi người thấu hiểu bản thân thông qua các thuật toán hiện đại.', 'Tạo ra một cộng đồng giao lưu cho những người có tính cách tương đồng.'], correctIndex: 1, explanation: 'Việc sử dụng những lời khen chung chung khiến người dùng thấy app "chuẩn" và muốn chia sẻ.' },
      { id: 'q6_5', type: 'scenario', scenario: 'Thầy phán: "Có một người trong quá khứ đang âm thầm quan tâm và muốn giúp đỡ con trong thời gian tới".', options: ['Cảm thấy xúc động và chờ đợi sự xuất hiện của quý nhân phù trợ.', 'Một khẳng định mơ hồ luôn có thể tìm thấy ví dụ thực tế để đối chiếu.', 'Muốn tìm lại tất cả những mối quan hệ cũ để gửi lời cảm ơn chân thành.', 'Tin tưởng tuyệt đối vào sự linh ứng của các bậc tiền nhân trong đời.'], correctIndex: 1, explanation: 'Một khẳng định không thể sai, vì thực tế ai cũng có ai đó từng giúp đỡ mình.' },
      { id: 'q6_6', type: 'scenario', scenario: 'Bạn đọc một cuốn sách tâm linh và thấy tác giả như đang viết về chính những góc khuất trong tâm hồn mình.', options: ['Kinh ngạc trước khả năng thấu hiểu tâm lý tuyệt vời của tác giả.', 'Chúng ta có xu hướng tự điền các chi tiết cá nhân vào khung có sẵn.', 'Cảm thấy được an ủi khi biết rằng mình không hề đơn độc trên đời.', 'Quyết định sẽ áp dụng tất cả các lời khuyên trong sách vào thực tế.'], correctIndex: 1, explanation: 'Bạn tự động lọc ra những ý phù hợp and bỏ qua những phần không khớp with mình.' },
      { id: 'q6_7', type: 'scenario', scenario: 'Mô tả về một nhóm người nói rằng họ: "Cẩn thận trong công việc nhưng đôi khi cũng có những quyết định bốc đồng".', options: ['Thấy rằng đây là một nhận định khách quan về tính cách con người.', 'Lời phán mang tính hai mặt bao hàm mọi khả năng nên khó có thể sai.', 'Mong muốn thay đổi những thói quen xấu để hoàn thiện bản thân hơn.', 'Cảm thấy tự hào vì mình sở hữu những phẩm chất linh hoạt trong việc.'], correctIndex: 1, explanation: 'Những khẳng định kiểu này luôn đúng vì nó bao hàm cả hai thái cực của hành vi.' },
      { id: 'q6_8', type: 'scenario', scenario: 'Làm thế nào để một thám tử không bị cuốn vào những lời mô tả tính cách quá chung chung của các nghi phạm?', options: ['Luôn tin tưởng vào trực giác và những cảm nhận đầu tiên của bản thân.', 'Yêu cầu các bằng chứng cụ thể and số liệu khách quan thay vì cảm tính.', 'Tham khảo ý kiến của những người xung quanh về tính cách nghi phạm.', 'Sử dụng các công cụ bói toán để tìm thêm các manh mối tâm linh mới.'], correctIndex: 1, explanation: 'Sự thật chỉ nằm ở những dữ liệu có thể chứng minh, không phải ở những lời phán.' }
    ]
  },
  {
    id: 'q7',
    title: 'Hiệu ứng "Biết rồi khổ lắm" – Khi quá khứ trở nên hiển nhiên',
    regionId: 'r1',
    requiredLevel: 7,
    xpReward: 180,
    gemReward: 16,
    questions: [
      { id: 'q7_1', type: 'scenario', scenario: 'Trận bóng kết thúc, bạn khẳng định mình đã biết chắc chắn đội nhà sẽ thắng dù trước đó rất lo lắng.', options: ['Thể hiện sự tin tưởng tuyệt đối vào khả năng vô địch của đội nhà.', 'Não bộ tự điều chỉnh ký ức để phù hợp with kết quả đã xảy ra.', 'Cảm thấy tự hào vì có khả năng dự đoán chính xác các sự kiện lớn.', 'Muốn chia sẻ niềm vui chiến thắng with những người hâm mộ xung quanh.'], correctIndex: 1, explanation: 'Tâm lý chúng ta thường tự vẽ lại quá khứ để thấy mình thông thái hơn thực tế.' },
      { id: 'q7_2', type: 'scenario', scenario: 'Sau khi một dự án thất bại, một người nói: "Tôi đã nhìn ra những rủi ro này từ ngày đầu tiên".', options: ['Ghi nhận sự nhạy bén và kinh nghiệm thực chiến của người đồng nghiệp.', 'Sự thật hiện hữu làm mờ đi những nhận định sai lầm trong quá khứ.', 'Cảm thấy tiếc nuối vì đã không lắng nghe lời khuyên đó sớm hơn.', 'Mong muốn có một quy trình kiểm soát rủi ro chặt chẽ hơn cho sau.'], correctIndex: 1, explanation: 'Sau khi sự việc xong xuôi, mọi người thường có xu hướng nói rằng mình đã biết trước.' },
      { id: 'q7_3', type: 'scenario', scenario: 'Thám tử nhìn lại hiện trường và cho rằng các manh mối quá rõ ràng, thật khó tin là mình đã bỏ qua.', options: ['Cảm thấy tự trách bản thân về sự thiếu sót trong quá trình điều tra.', 'Kiến thức về kết quả cuối cùng làm sự việc trông có vẻ đơn giản.', 'Quyết định sẽ rà soát lại toàn bộ quy trình thu thập các chứng cứ.', 'Tin rằng hung thủ đã cố tình để lại những dấu hiệu để trêu đùa mình.'], correctIndex: 1, explanation: 'Khi đã biết kết quả, chúng ta có xu hướng thấy mọi thứ đều logic and hiển nhiên.' },
      { id: 'q7_4', type: 'scenario', scenario: 'Bạn đầu tư thua lỗ và tự trách bản thân lẽ ra phải nhận thấy những dấu hiệu cảnh báo từ thị trường.', options: ['Cảm thấy hối hận vì đã không quyết đoán hơn trong việc cắt lỗ sớm.', 'Chúng ta thường đánh giá quá cao khả năng dự đoán của mình sau đó.', 'Nhận thấy bản thân cần được đào tạo chuyên sâu hơn về tài chính.', 'Cho rằng sự biến động của thị trường là điều không thể lường trước.'], correctIndex: 1, explanation: 'Kiến thức về lỗi sai chỉ thực sự xuất hiện rõ nét sau khi thiệt hại đã xảy ra.' },
      { id: 'q7_5', type: 'scenario', scenario: 'Sếp mắng: "Công việc đơn giản thế này mà cũng làm sai được à?" sau khi sếp đã biết kết quả cuối cùng.', options: ['Thừa nhận rằng năng lực cá nhân hiện tại vẫn còn nhiều hạn chế lớn.', 'Khi đã biết đáp án thì mọi quá trình tư duy đều trở nên dễ dàng.', 'Cảm thấy áp lực và lo lắng về tương lai của mình tại công ty này.', 'Mong muốn sếp hướng dẫn chi tiết hơn để không lặp lại lỗi cũ nữa.'], correctIndex: 1, explanation: 'Đây là bẫy nhận thức khiến người biết rồi thấy người chưa biết là kém cỏi.' },
      { id: 'q7_6', type: 'scenario', scenario: 'Một người dự báo thời tiết giải thích về cơn bão hôm qua như thể nó là một điều tất yếu phải xảy ra.', options: ['Tin tưởng vào sự phát triển của khoa học trong việc dự báo thiên tai.', 'Việc gán chuỗi logic cho sự kiện đã qua giúp chúng ta thấy an tâm.', 'Cảm thấy cần phải chuẩn bị kỹ lưỡng hơn cho các tình huống khẩn cấp.', 'Cho rằng thiên nhiên luôn vận hành theo những quy luật không thể đổi.'], correctIndex: 1, explanation: 'Chúng ta cố gắng tìm kiếm sự trật tự trong một thế giới đầy những biến cố ngẫu nhiên.' },
      { id: 'q7_7', type: 'scenario', scenario: 'Các nhà sử học viết về sự sụp đổ của một đế chế như một chuỗi các sự kiện logic không thể tránh khỏi.', options: ['Thấu hiểu sâu sắc những bài học kinh nghiệm quý báu từ tổ tiên để lại.', 'Sự kiện quá khứ luôn được cấu trúc lại để tạo ra câu chuyện nhân quả.', 'Cảm thấy tự hào về bề dày lịch sử và văn hóa của dân tộc qua các thời.', 'Cho rằng mọi đế chế đều phải trải qua các giai đoạn sinh lão bệnh tử.'], correctIndex: 1, explanation: 'Việc nhìn lại quá khứ luôn bị bóp méo bởi những gì chúng ta đã biết ở hiện tại.' },
      { id: 'q7_8', type: 'scenario', scenario: 'Làm thế nào để đánh giá một quyết định trong quá khứ mà không bị ảnh hưởng bởi kết quả thực tế?', options: ['Luôn tin tưởng vào kinh nghiệm và sự nhạy bén của các chuyên gia đầu.', 'Phải đặt mình vào đúng bối cảnh and những thông tin giới hạn lúc đó.', 'Tham khảo ý kiến của số đông để tìm ra tiếng nói chung của cộng đồng.', 'Chờ đợi một khoảng thời gian đủ dài để sự việc được lắng xuống hết.'], correctIndex: 1, explanation: 'Cách duy nhất để công bằng là nhìn vấn đề with dữ liệu của thời điểm chưa biết.' }
    ]
  },
  {
    id: 'q8',
    title: 'Cái bẫy của sự tự tin – Ảo tưởng về năng lực cá nhân',
    regionId: 'r1',
    requiredLevel: 8,
    xpReward: 200,
    gemReward: 20,
    questions: [
      { id: 'q8_1', type: 'scenario', scenario: 'Bạn tin rằng kỹ năng lái xe của mình tốt hơn hẳn and an toàn hơn so with đa số những người trên đường.', options: ['Cảm thấy tự hào vì bản thân đã rèn luyện được các phản xạ rất nhanh.', 'Mọi người thường có xu hướng đánh giá mình ở mức trên trung bình.', 'Nhận thấy môi trường giao thông hiện nay tiềm ẩn quá nhiều rủi ro lớn.', 'Mong muốn chia sẻ những kinh nghiệm lái xe an toàn cho những người mới.'], correctIndex: 1, explanation: 'Khoảng 80-90% mọi người đều tin rằng mình lái xe giỏi hơn những người khác.' },
      { id: 'q8_2', type: 'scenario', scenario: 'Hầu hết sinh viên đều đánh giá năng lực học tập của mình thuộc nhóm dẫn đầu của tập thể lớp.', options: ['Tin rằng sự chăm chỉ sẽ mang lại những kết quả xứng đáng trong kỳ thi.', 'Sự tự tin thái quá khiến chúng ta khó nhìn nhận đúng vị trí của mình.', 'Cảm thấy áp lực cạnh tranh trong môi trường học thuật ngày càng cao.', 'Mong muốn nhận được sự đánh giá công bằng từ phía các thầy cô giáo.'], correctIndex: 1, explanation: 'Đại đa số đều nghĩ mình thông minh hơn mức trung bình, một điều phi lý về mặt số.' },
      { id: 'q8_3', type: 'scenario', scenario: 'Một nhà quản lý cho rằng mình có khả năng chống lại các bẫy tâm lý tốt hơn nhiều so with các đồng nghiệp.', options: ['Thể hiện bản lĩnh và sự tỉnh táo trong việc đưa ra các quyết định lớn.', 'Việc tin mình không bị định kiến chính là một loại định kiến phổ biến.', 'Cảm thấy cần phải đào tạo thêm cho nhân viên về các kỹ năng tư duy.', 'Luôn sẵn sàng học hỏi những kiến thức mới để nâng cao hiệu suất làm.'], correctIndex: 1, explanation: 'Càng hiểu biết, chúng ta càng dễ tin rằng mình sẽ không bao giờ mắc sai lầm.' },
      { id: 'q8_4', type: 'scenario', scenario: 'Các cặp đôi thường tin rằng mối quan hệ của họ bền vững and ít rủi ro đổ vỡ hơn các cặp đôi khác.', options: ['Cảm nhận được sự gắn kết sâu sắc và tình yêu chân thành từ hai phía.', 'Ảo tưởng về sự vượt trội giúp duy trì sự tích cực nhưng dễ làm ngơ lỗi.', 'Cảm thấy cần phải có những cam kết lâu dài để bảo vệ hạnh phúc chung.', 'Luôn nỗ lực để thấu hiểu và chia sẻ với đối phương trong mọi chuyện.'], correctIndex: 1, explanation: 'Cơ chế này giúp con người duy trì hy vọng nhưng đôi khi làm họ thiếu cảnh giác.' },
      { id: 'q8_5', type: 'scenario', scenario: 'Bạn cảm thấy gu thẩm mỹ and phong cách thời trang của mình tinh tế hơn so with bạn bè đồng trang lứa.', options: ['Tự tin thể hiện cá tính riêng biệt thông qua cách lựa chọn trang phục.', 'Cái tôi luôn tìm kiếm những điểm ưu việt để khẳng định giá trị bản.', 'Cảm thấy cần phải cập nhật thêm các xu hướng mới từ các sàn diễn lớn.', 'Mong muốn nhận được những lời khen ngợi từ những người xung quanh.'], correctIndex: 1, explanation: 'Chúng ta luôn muốn thấy mình đặc biệt và cao cấp hơn những người còn lại.' },
      { id: 'q8_6', type: 'scenario', scenario: 'Khi làm việc nhóm, hầu như thành viên nào cũng tin rằng mình đã đóng góp nhiều công sức hơn các thành viên khác.', options: ['Thể hiện tinh thần trách nhiệm cao độ trong mọi nhiệm vụ được giao phó.', 'Chúng ta ghi nhớ nỗ lực bản thân tốt hơn là ghi nhận đóng góp người.', 'Cảm thấy cần phải có hệ thống đánh giá KPI minh bạch và công bằng hơn.', 'Mong muốn đội ngũ cùng nhau tiến bộ để đạt được các mục tiêu chung.'], correctIndex: 1, explanation: 'Mỗi người đều nhìn thấy khó khăn của mình nhưng lại phớt lờ vất vả của người khác.' },
      { id: 'q8_7', type: 'scenario', scenario: 'Đa số mọi người tự nhận thấy mình là người tử tế and có đạo đức cao hơn so with mức trung bình xã hội.', options: ['Tin tưởng vào bản chất thiện lương và lòng tốt luôn hiện hữu trong ta.', 'Tự đề cao phẩm chất cá nhân là cơ chế để duy trì sự tự tôn và kiêu hãnh.', 'Cảm thấy cần phải thực hiện nhiều hoạt động thiện nguyện để giúp đời.', 'Cho rằng xã hội hiện đại đang dần xuống cấp về các chuẩn mực đạo đức.'], correctIndex: 1, explanation: 'Chúng ta thường nới lỏng các tiêu chuẩn đạo đức cho mình hơn là cho người khác.' },
      { id: 'q8_8', type: 'scenario', scenario: 'Làm thế nào để một thám tử duy trì sự tỉnh táo and không đánh giá quá cao khả năng suy luận của mình?', options: ['Luôn tin tưởng vào trực giác sắc bén và những kinh nghiệm phá án cũ.', 'Đối chiếu các giả thuyết with số liệu khách quan and lắng nghe phản biện.', 'Tham khảo ý kiến của những người có uy tín trong ngành điều tra hình.', 'Dành nhiều thời gian hơn để nghiên cứu các hồ sơ vụ án kinh điển nhất.'], correctIndex: 1, explanation: 'Sự khiêm nhường trong nhận thức là chìa khóa để tránh được những sai lầm chết người.' }
    ]
  },

  // ===================== VÙNG 2: LÃNH ĐỊA "MỜ MẮT" =====================
  {
    id: 'q9',
    title: 'Mỹ nhân kế & hào quang',
    regionId: 'r2',
    requiredLevel: 9,
    xpReward: 90,
    gemReward: 4,
    questions: [
      { id: 'q9_1', type: 'scenario', scenario: 'Sếp mới xinh đẹp, bạn tự động cho rằng sếp vừa giỏi vừa tử tế.', options: ['Sếp đỉnh', 'Halo effect', 'Bạn dại gái', 'Hợp lý'], correctIndex: 1, explanation: 'Cái đẹp lấn át lý trí, tạo ảo tưởng về những phẩm chất khác.' },
      { id: 'q9_2', type: 'scenario', scenario: 'Bạn mua iPhone vì logo táo đẹp và tin nó bảo mật nhất.', options: ['Apple là nhất', 'Hào quang thiết kế', 'Bạn giàu', 'Quảng cáo'], correctIndex: 1, explanation: 'Yêu một điểm, bạn lan ra yêu cả bộ.' },
      { id: 'q9_3', type: 'scenario', scenario: 'Ứng viên đẹp trai được nhận dù chuyên môn trung bình.', options: ['Họ có tiềm năng', 'Sức mạnh hào quang', 'Nhân duyên', 'Công ty cần đẹp'], correctIndex: 1, explanation: 'Vẻ ngoài tạo niềm tin ảo về năng lực.' },
      { id: 'q9_4', type: 'scenario', scenario: 'Bạn tin người đeo kính chắc chắn học giỏi.', options: ['Cận thị thì học nhiều', 'Rập khuôn hào quang', 'Sự thật', 'May mắn'], correctIndex: 1, explanation: 'Biểu tượng trí thức bị đánh tráo.' },
      { id: 'q9_5', type: 'scenario', scenario: 'Người nổi tiếng quảng cáo thuốc đông y, bạn tin sái cổ.', options: ['Họ nổi tiếng mà', 'Hào quang nổi tiếng', 'Thuốc tốt', 'Do tivi'], correctIndex: 1, explanation: 'Nổi tiếng không đồng nghĩa chuyên môn y tế.' },
      { id: 'q9_6', type: 'scenario', scenario: 'Bạn thấy người béo thì mặc định họ lười biếng.', options: ['Đúng thế', 'Halo ngược (Horn effect)', 'Bạn khó tính', 'Tùy người'], correctIndex: 1, explanation: 'Ác cảm ngoại hình làm méo mó đánh giá.' },
      { id: 'q9_7', type: 'scenario', scenario: 'Nhà hàng trang trí đẹp, bạn tin món ăn chắc chắn ngon.', options: ['Ngon thật', 'Hào quang bối cảnh', 'Mắt thẩm mỹ', 'Sự thật'], correctIndex: 1, explanation: 'Không gian đánh lừa vị giác.' },
      { id: 'q9_8', type: 'scenario', scenario: 'Thám tử đối mặt nghi phạm có gương mặt hiền lành.', options: ['Họ vô tội', 'Đề phòng bẫy Halo effect', 'Họ sợ hãi', 'Bạn quá đa nghi'], correctIndex: 1, explanation: 'Ác quỷ thường mang mặt nạ thiên thần.' }
    ]
  },
  {
    id: 'q10',
    title: 'Một điểm ghét, vạn điểm chê',
    regionId: 'r2',
    requiredLevel: 10,
    xpReward: 100,
    gemReward: 5,
    questions: [
      { id: 'q10_1', type: 'scenario', scenario: 'Đồng nghiệp nói ngọng, bạn mặc định họ làm việc cũng cẩu thả.', options: ['Nói sao làm vậy', 'Horn effect', 'Bạn khó tính', 'Họ tệ thật'], correctIndex: 1, explanation: 'Một điểm trừ kéo tụt mọi giá trị khác.' },
      { id: 'q10_2', type: 'scenario', scenario: 'Bạn không thích app vì màu nền xấu, sau đó kết luận tính năng nó cũng rác.', options: ['Mắt thẩm mỹ', 'Horn effect lan tỏa', 'App rác thật', 'Do mạng'], correctIndex: 1, explanation: 'Ghét cái vỏ bỏ luôn cái ruột.' },
      { id: 'q10_3', type: 'scenario', scenario: 'Thấy người xăm trổ, bạn nghĩ ngay họ là dân gian giang hồ.', options: ['Nghĩ đúng', 'Định kiến từ Horn effect', 'Họ gấu thật', 'Xăm là xấu'], correctIndex: 1, explanation: 'Biểu tượng bị đánh đồng với nhân cách.' },
      { id: 'q10_4', type: 'scenario', scenario: 'Bạn ghét ca sĩ A nên họ làm từ thiện bạn bảo “Làm màu”.', options: ['Bạn sáng suốt', 'Bẫy cảm xúc ghét bỏ', 'Họ ác thật', 'Sự thật'], correctIndex: 1, explanation: 'Thông tin tích cực bị bộ lọc ghét bỏ triệt tiêu.' },
      { id: 'q10_5', type: 'scenario', scenario: 'Quán ăn bị bốt phốt 1 lần, bạn thề không bao giờ quay lại.', options: ['Bạn kỹ tính', 'Dấu ấn Horn effect', 'Quán dở', 'Do tốn tiền'], correctIndex: 1, explanation: 'Nỗi đau từ mỏ neo xấu cực kỳ khó xóa.' },
      { id: 'q10_6', type: 'scenario', scenario: 'Bạn thấy người ăn mặc xuề xòa đi xem xe hơi, bạn mặc định họ nghèo.', options: ['Ăn mặc nói lên tất cả', 'Bẫy Horn effect', 'Họ nghèo thật', 'Đúng rồi'], correctIndex: 1, explanation: 'Đừng nhìn mặt bắt hình dong.' },
      { id: 'q10_7', type: 'scenario', scenario: 'Sếp mắng bạn 1 lần, từ đó bạn thấy sếp làm gì cũng hắc ám.', options: ['Sếp ác thiệt', 'Màn sương Horn effect', 'Bạn thù dai', 'Duyên nợ'], correctIndex: 1, explanation: 'Cảm xúc tiêu cực bóp méo nhận thức.' },
      { id: 'q10_8', type: 'scenario', scenario: 'Thám tử đối mặt với nghi phạm có tiền án tiền sự.', options: ['Hắn chắc thủ phạm', 'Thoát khỏi bẫy Horn effect', 'Cẩn thận', 'Bắt luôn'], correctIndex: 1, explanation: 'Quá khứ xấu không có nghĩa là vụ này cũng sai.' }
    ]
  },
  {
    id: 'q11',
    title: 'Đồ tự làm là nhất – IKEA effect',
    regionId: 'r2',
    requiredLevel: 11,
    xpReward: 120,
    gemReward: 6,
    questions: [
      { id: 'q11_1', type: 'scenario', scenario: 'Mất 4 tiếng lắp cái kệ IKEA méo mó, bạn thề không bao giờ vứt nó.', options: ['Lãng mạn', 'IKEA effect', 'Hết tiền', 'Yêu mộc'], correctIndex: 1, explanation: 'Công sức tỉ lệ thuận với niềm tin giá trị.' },
      { id: 'q11_2', type: 'scenario', scenario: 'Bạn nấu mì tôm mặn chát vẫn thấy ngon hơn ngoài tiệm.', options: ['Ngoài tiệm dở', 'Bẫy IKEA trong ẩm thực', 'Đói quá', 'Bạn giỏi nấu'], correctIndex: 1, explanation: 'Não tự lừa vị giác vì công lao đã bỏ ra.' },
      { id: 'q11_3', type: 'scenario', scenario: 'Startup cho khách tự thiết kế giày, khách yêu đôi đó gấp 3.', options: ['Unique', 'IKEA effect', 'Mẫu đẹp', 'Trend'], correctIndex: 1, explanation: 'Sự tham gia tạo ra gắn kết.' },
      { id: 'q11_4', type: 'scenario', scenario: 'Bạn viết một đoạn văn dở tệ nhưng đọc lại thấy hay nức lòng.', options: ['Bạn thi sĩ', 'IKEA effect văn học', 'Ảo giác', 'Lời đẹp'], correctIndex: 1, explanation: 'Mình “đẻ” ra thì luôn thấy trân quý.' },
      { id: 'q11_5', type: 'scenario', scenario: 'Sao các app hay nhờ bạn hoàn thành hồ sơ từng bước?', options: ['Cần dữ liệu', 'Bẫy IKEA để không nỡ xóa app', 'Lịch sự', 'Thói quen'], correctIndex: 1, explanation: 'Khi đã tốn công, bạn sẽ khó từ bỏ.' },
      { id: 'q11_6', type: 'scenario', scenario: 'Bạn tự đóng cái bàn gỗ lệch chân và mang đi khoe cả xóm.', options: ['Vui tính', 'IKEA effect làm ảo tưởng', 'Bạn giỏi thật', 'Rảnh'], correctIndex: 1, explanation: 'Định giá cao phi thực tế.' },
      { id: 'q11_7', type: 'scenario', scenario: 'Tại sao đồ LEGO đắt mà vẫn được yêu thích?', options: ['Nhựa tốt', 'Kích hoạt IKEA effect', 'Trẻ thích', 'May mắn'], correctIndex: 1, explanation: 'Mỗi miếng ghép là một nỗ lực.' },
      { id: 'q11_8', type: 'scenario', scenario: 'Thám tử tự tay vẽ chân dung hung thủ.', options: ['Giỏi vẽ', 'Yêu bức vẽ sai do IKEA effect', 'Cẩn thận', 'Sở thích'], correctIndex: 1, explanation: 'Đừng quá yêu sản phẩm của chính mình.' }
    ]
  },
  {
    id: 'q12',
    title: 'Vui quá hóa khờ – Affect heuristic',
    regionId: 'r2',
    requiredLevel: 12,
    xpReward: 140,
    gemReward: 7,
    questions: [
      { id: 'q12_1', type: 'scenario', scenario: 'Đúng lúc đang hưng phấn vì được thưởng, bạn quyết định mua sắm sạch túi.', options: ['Xả láng', 'Affect heuristic', 'Giàu', 'Bù đắp'], correctIndex: 1, explanation: 'Vui quá là lúc lý trí nghỉ giải lao.' },
      { id: 'q12_2', type: 'scenario', scenario: 'Bạn đang bực mình nên dự án sếp giao bạn thấy toàn rủi ro.', options: ['Bực thật', 'Biên kiến từ cảm xúc tiêu cực', 'Giỏi phán đoán', 'Dự án rác'], correctIndex: 1, explanation: 'Tâm trạng xấu bóp méo đánh giá rủi ro.' },
      { id: 'q12_3', type: 'scenario', scenario: 'Quảng cáo xe có cảnh gia đình cười hạnh phúc, bạn muốn mua ngay.', options: ['Yêu gia đình', 'Affect heuristic tạo liên tưởng', 'Xe tốt', 'Marketing đỉnh'], correctIndex: 1, explanation: 'Cảm xúc “hạnh phúc” bị dính vào cái xe.' },
      { id: 'q12_4', type: 'scenario', scenario: 'Bạn thù ghét một hãng điện thoại nên họ làm gì bạn cũng chê.', options: ['Đúng thế', 'Bẫy Affect heuristic', 'Khó tính', 'Hãng dở'], correctIndex: 1, explanation: 'Sự yêu/ghét đi trước mọi phân tích.' },
      { id: 'q12_5', type: 'scenario', scenario: 'Chốt đơn vì “Thích thì nhích” bất chấp nợ nần.', options: ['Dân chơi', 'Nô lệ của cảm xúc', 'Có tiền', 'Ngẫu hứng'], correctIndex: 1, explanation: 'Quyết định theo rung động.' },
      { id: 'q12_6', type: 'scenario', scenario: 'Tại sao quán nhậu hay bật nhạc sôi động?', options: ['Vui', 'Kích thích cảm xúc để gọi nhiều đồ', 'Thói quen', 'Chủ thích'], correctIndex: 1, explanation: 'Âm nhạc là vũ khí thao túng phán đoán.' },
      { id: 'q12_7', type: 'scenario', scenario: 'Bạn đồng ý cho vay tiền sau khi vừa được ăn một bữa ngon tuyệt.', options: ['Tốt bụng', 'Nể nang do cảm xúc tốt', 'Bữa ăn đỉnh', 'Ảo tưởng'], correctIndex: 1, explanation: 'Dạ dày no, lý trí lỏng lẻo.' },
      { id: 'q12_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án kinh dị, thấy buồn nôn và muốn về ngay.', options: ['Yếu bóng vía', 'Bẫy cảm xúc che mờ quan sát', 'Vụ án quá ghê', 'Bình thường'], correctIndex: 1, explanation: 'Phải gạt bỏ cảm xúc mới thấy được manh mối.' }
    ]
  },
  {
    id: 'q13',
    title: 'Tê liệt tại quầy trà sữa – Paradox of choice',
    regionId: 'r2',
    requiredLevel: 13,
    xpReward: 160,
    gemReward: 8,
    questions: [
      { id: 'q13_1', type: 'scenario', scenario: 'Đứng trước 100 vị trà sữa, bạn mất 15 phút chưa chọn được gì.', options: ['Khó tính', 'Paradox of choice', 'Thèm hết', 'Hết tiền'], correctIndex: 1, explanation: 'Càng nhiều lựa chọn càng gây tê liệt.' },
      { id: 'q13_2', type: 'scenario', scenario: 'Sau khi mua 1 cái áo trong số 50 cái, bạn cứ nghĩ “biết thế mua cái kia”.', options: ['Tiếc của', 'Hối hận do quá nhiều phương án', 'Áo mua dở', 'Do quảng cáo'], correctIndex: 1, explanation: 'Nhiều lựa chọn làm giảm sự hài lòng.' },
      { id: 'q13_3', type: 'scenario', scenario: 'Menu quán Michelin chỉ có 3 món và bạn thấy rất yên tâm.', options: ['Ít đồ quá', 'Vùng an toàn ít lựa chọn', 'Quán sang', 'Lười đọc'], correctIndex: 1, explanation: 'Ít là nhiều.' },
      { id: 'q13_4', type: 'scenario', scenario: 'Lướt Netflix 30 phút rồi… tắt máy đi ngủ.', options: ['Lười xem', 'Bị tê liệt quyết định', 'Phim dở', 'Do bận'], correctIndex: 1, explanation: 'Não đình công trước ma trận tùy chọn.' },
      { id: 'q13_5', type: 'scenario', scenario: 'Tại sao các gói cước mobile hay chỉ có 3-4 mức giá chính?', options: ['Tiết kiệm', 'Để bạn dễ chọn', 'Quy định', 'Thói quen'], correctIndex: 1, explanation: 'Đơn giản hóa để chốt đơn nhanh.' },
      { id: 'q13_6', type: 'scenario', scenario: 'Bạn thấy hạnh phúc khi được tặng quà ngẫu nhiên hơn là tự đi chọn.', options: ['Được tặng thì sướng', 'Thoát áp lực chọn lựa', 'Tiết kiệm', 'Ảo tưởng'], correctIndex: 1, explanation: 'Lựa chọn là một gánh nặng tâm lý.' },
      { id: 'q13_7', type: 'scenario', scenario: 'Tại sao Mark Zuckerberg hay mặc đúng một kiểu áo xám?', options: ['Hết quần áo', 'Giảm decision fatigue', 'Sở thích', 'Tiết kiệm'], correctIndex: 1, explanation: 'Để dành não cho việc quan trọng.' },
      { id: 'q13_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án có 1000 nghi phạm.', options: ['Vụ án lớn', 'Rủi ro tê liệt phân tích', 'Hay ho', 'Bỏ nghề sớm'], correctIndex: 1, explanation: 'Phải thu hẹp phạm vi mới tìm được hung thủ.' }
    ]
  },
  {
    id: 'q14',
    title: 'Sức mạnh lời khen – Pygmalion effect',
    regionId: 'r2',
    requiredLevel: 14,
    xpReward: 180,
    gemReward: 9,
    questions: [
      { id: 'q14_1', type: 'scenario', scenario: 'Sếp bảo: “Anh tin em tài năng”, thế là em phá án nhanh gấp đôi.', options: ['Bạn giỏi', 'Pygmalion effect', 'Nhờ sếp', 'May mắn'], correctIndex: 1, explanation: 'Kỳ vọng tích cực đẩy giới hạn con người.' },
      { id: 'q14_2', type: 'scenario', scenario: 'Bố mẹ luôn bảo con vô dụng, sau này con thành… vô dụng thật.', options: ['Con dở', 'Hiệu ứng Golem', 'Xã hội ác', 'Sự thật'], correctIndex: 1, explanation: 'Gán nhãn tương lai cho một đứa trẻ.' },
      { id: 'q14_3', type: 'scenario', scenario: 'Bạn dạy chó và tin nó thông minh nhất xóm, nó học cực nhanh.', options: ['Chó xịn', 'Kỳ vọng chủ ảnh hưởng huấn luyện', 'Ảo giác', 'Hợp lý'], correctIndex: 1, explanation: 'Năng lượng tích cực truyền sang đối tượng.' },
      { id: 'q14_4', type: 'scenario', scenario: 'Bác sĩ nói “Thuốc này cực xịn”, bạn uống thấy đỡ hẳn dù là thuốc cảm thường.', options: ['Thuốc tiên', 'Placebo + Pygmalion', 'Bác sĩ giỏi', 'Bạn khỏi thật'], correctIndex: 1, explanation: 'Niềm tin chữa lành cơ thể.' },
      { id: 'q14_5', type: 'scenario', scenario: 'Trong thí nghiệm, chuột “Thần đồng” chạy nhanh hơn chuột “Thường” dù giống hệt.', options: ['Do tên', 'Kỳ vọng của người làm thí nghiệm', 'Ngẫu nhiên', 'Chuột biết chữ'], correctIndex: 1, explanation: 'Thái độ quan sát định hình kết quả.' },
      { id: 'q14_6', type: 'scenario', scenario: 'Bạn dán nhãn đồng nghiệp là “Cú đêm”, họ bắt đầu làm tốt hơn vào tối.', options: ['Là cú thật', 'Định khung Pygmalion', 'Tình cờ', 'Họ thích'], correctIndex: 1, explanation: 'Con người có xu hướng khớp với nhãn.' },
      { id: 'q14_7', type: 'scenario', scenario: 'Một lời động viên đúng lúc trị giá hơn ngàn vàng.', options: ['Đúng thế', 'Sức mạnh Pygmalion', 'Sáo rỗng', 'Tùy người'], correctIndex: 1, explanation: 'Kỳ vọng là cú hích tâm lý mạnh nhất.' },
      { id: 'q14_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án bế tắc và tự nhủ “Mình sẽ không bao giờ tìm ra”.', options: ['Đúng đấy', 'Sập bẫy Golem', 'Cẩn thận', 'Đi ngủ'], correctIndex: 1, explanation: 'Kỳ vọng thấp dẫn đến nỗ lực thấp.' }
    ]
  },
  {
    id: 'q15',
    title: 'Ngượng chín mặt – Spotlight effect',
    regionId: 'r2',
    requiredLevel: 15,
    xpReward: 200,
    gemReward: 10,
    questions: [
      { id: 'q15_1', type: 'scenario', scenario: 'Bạn dính vết bẩn trên áo và thề là cả thiên hạ đang nhìn chằm chằm.', options: ['Họ nhìn thiệt', 'Spotlight effect', 'Bị soi', 'Áo xấu'], correctIndex: 1, explanation: 'Ta luôn nghĩ mình là tâm điểm, thực ra chả ai quan tâm.' },
      { id: 'q15_2', type: 'scenario', scenario: 'Lỡ miệng nói hố, bạn mất ngủ 3 đêm vì nhục, trong khi mọi người đã quên.', options: ['Bạn nhạy cảm', 'Bẫy Spotlight effect', 'Họ vẫn nhớ', 'Do bạn'], correctIndex: 1, explanation: 'Cái tôi quá lớn nên tưởng lỗi lầm nào cũng vĩ đại.' },
      { id: 'q15_3', type: 'scenario', scenario: 'Bạn đi gym và sợ mọi người cười vì mình tập sai tư thế.', options: ['Họ cười thật', 'Spotlight ở phòng tập', 'Bị cười là chắc', 'Do gym'], correctIndex: 1, explanation: 'Sự thật: Ai cũng bận nhìn mình trong gương rồi.' },
      { id: 'q15_4', type: 'scenario', scenario: 'Thuyết trình xong bạn thấy mình tệ, dù khán giả thấy ổn.', options: ['Khiêm tốn', 'Hiệu ứng Spotlight ngược', 'Khán giả mù', 'Duyên'], correctIndex: 1, explanation: 'Tự soi mình quá kỹ.' },
      { id: 'q15_5', type: 'scenario', scenario: 'Tại sao người ta hay đỏ mặt khi bị lộ một lỗi nhỏ?', options: ['Vô tội', 'Phản ứng Spotlight ảo', 'Sợ hãi', 'Nóng'], correctIndex: 1, explanation: 'Vỡ trận tâm lý do tưởng mình bị soi.' },
      { id: 'q15_6', type: 'scenario', scenario: 'Bạn mặc lại bộ đồ cũ và lo đồng nghiệp biết, thực ra họ chả nhớ.', options: ['Họ nhớ dai', 'Spotlight bóp méo thực tế', 'Tiết kiệm', 'Lười'], correctIndex: 1, explanation: 'Thế giới xoay quanh chính họ, không phải bạn.' },
      { id: 'q15_7', type: 'scenario', scenario: 'Để bớt run khi đứng trước đám đông, bạn nên nhớ:', options: ['Họ là củ khoai', 'Không ai quan tâm mình đâu', 'Hét to', 'Nhắm mắt'], correctIndex: 1, explanation: 'Phá vỡ ánh đèn sân khấu ảo.' },
      { id: 'q15_8', type: 'scenario', scenario: 'Thám tử làm đổ một ly nước, cảm thấy rất xấu hổ.', options: ['Vụng về', 'Vượt bẫy Spotlight để tập trung', 'Mất mặt', 'Đi về'], correctIndex: 1, explanation: 'Quên cái tôi đi mới thấy được cái chung.' }
    ]
  },
  {
    id: 'q16',
    title: 'Cái cũ là vàng – Endowment effect',
    regionId: 'r2',
    requiredLevel: 16,
    xpReward: 220,
    gemReward: 12,
    questions: [
      { id: 'q16_1', type: 'scenario', scenario: 'Bạn đòi bán áo rách giá 200k, dù giá mới 100k, vì “áo kỷ niệm”.', options: ['Áo cổ điển', 'Endowment effect', 'Tham tiền', 'Đúng thế'], correctIndex: 1, explanation: 'Sở hữu thứ gì là ta tự nâng giá nó lên.' },
      { id: 'q16_2', type: 'scenario', scenario: 'Cho mượn xe máy, bạn lo họ làm hỏng dù xe cũ mèm.', options: ['Kỹ tính', 'Bẫy Endowment', 'Xe kỷ niệm', 'Họ lái dở'], correctIndex: 1, explanation: 'Quý trọng tài sản cá nhân phi lý.' },
      { id: 'q16_3', type: 'scenario', scenario: 'Tại sao các app hay cho dùng thử miễn phí 30 ngày?', options: ['Họ tốt', 'Để khách dính bẫy sở hữu', 'Trend', 'Lừa'], correctIndex: 1, explanation: 'Nắm giữ 30 ngày là coi như của mình rồi.' },
      { id: 'q16_4', type: 'scenario', scenario: 'Bạn từ chối đổi điện thoại mới dù được tặng, vì “quen tay”.', options: ['Chung thủy', 'Sức mạnh sở hữu', 'Máy cũ ngon', 'Lười copy'], correctIndex: 1, explanation: 'Sự gắn kết làm mờ đi lợi ích mới.' },
      { id: 'q16_5', type: 'scenario', scenario: 'Khi bán nhà, chủ luôn hét giá cao hơn 20-30% thị trường.', options: ['Tham', 'Dính Endowment effect', 'Nhà xịn', 'Đất tăng'], correctIndex: 1, explanation: 'Họ cộng thêm giá trị cảm xúc cho người mua.' },
      { id: 'q16_6', type: 'scenario', scenario: 'Bạn đau lòng khi vứt bỏ một tờ lịch cũ.', options: ['Yêu thời gian', 'Endowment effect', 'Rảnh', 'May mắn'], correctIndex: 1, explanation: 'Tâm lý không muốn đánh mất sở hữu.' },
      { id: 'q16_7', type: 'scenario', scenario: 'Phần thưởng cho việc nắm giữ cái cũ là gì?', options: ['Bình yên', 'Bỏ lỡ cơ hội mới', 'Tiền bạc', 'Được khen'], correctIndex: 1, explanation: 'Bẫy tâm lý ngăn cản nâng cấp.' },
      { id: 'q16_8', type: 'scenario', scenario: 'Thám tử bước vào nhà nghi phạm và mượn một món đồ vật.', options: ['Ăn trộm', 'Để nghi phạm lo do Endowment', 'Lấy vật chứng', 'Do thích'], correctIndex: 2, explanation: 'Vật cũ có thể khui ra nhiều bí mật.' }
    ]
  },

  // ===================== VÙNG 3: PHỐ THỊ "DẮT MŨI" =====================
  {
    id: 'q17',
    title: 'Hùa theo đám đông – Bandwagon effect',
    regionId: 'r3',
    requiredLevel: 17,
    xpReward: 240,
    gemReward: 4,
    questions: [
      { id: 'q17_1', type: 'scenario', scenario: 'Thấy hàng dài xếp mua bánh mì, dù không đói bạn vẫn xếp hàng theo.', options: ['Bánh mì ngon', 'Bandwagon effect', 'Bạn rảnh', 'Tình cờ'], correctIndex: 1, explanation: 'Người ta làm thì mình cũng làm – tâm lý bầy đàn.' },
      { id: 'q17_2', type: 'scenario', scenario: 'Bạn mua cổ phiếu X vì thấy ai cũng nhắc trên mạng.', options: ['Mã X đỉnh', 'Tâm lý bầy đàn', 'Bạn giỏi soi kèo', 'Ngẫu nhiên'], correctIndex: 1, explanation: 'Bỏ qua phân tích để theo số đông.' },
      { id: 'q17_3', type: 'scenario', scenario: 'Cuộc họp ai cũng đồng ý với sếp, bạn dù thấy sai vẫn giơ tay.', options: ['Bạn ngoan', 'Áp lực tuân thủ số đông', 'Sếp đúng', 'Sợ bị đuổi'], correctIndex: 1, explanation: 'Sợ khác biệt so với nhóm.' },
      { id: 'q17_4', type: 'scenario', scenario: 'Tại sao video TikTok hay hiện số lượt xem khủng?', options: ['Cho đẹp', 'Kích hoạt bẫy đám đông', 'Máy tự hiện', 'Trend'], correctIndex: 1, explanation: 'Số đông là bằng chứng giá trị ảo.' },
      { id: 'q17_5', type: 'scenario', scenario: 'Bạn đổi kiểu tóc kỳ quặc vì “giới trẻ đang chuộng”.', options: ['Bạn sành điệu', 'Bẫy Bandwagon', 'Tóc đẹp', 'Duyên'], correctIndex: 1, explanation: 'Đu trend bất chấp bản sắc.' },
      { id: 'q17_6', type: 'scenario', scenario: 'Quán vắng bạn không vào, quán đông bạn sẵn sàng chờ 1 tiếng.', options: ['Quán đông ngon hơn', 'Logic đám đông', 'Bạn kiên nhẫn', 'Do mạng'], correctIndex: 1, explanation: 'Đông người là bằng chứng an toàn ảo.' },
      { id: 'q17_7', type: 'scenario', scenario: 'Hiệu ứng đoàn tàu thường dẫn đến hậu quả gì?', options: ['Thành công rực rỡ', 'Bong bóng kinh tế và sai lầm hệ thống', 'Vui vẻ', 'Được khen'], correctIndex: 1, explanation: 'Mất khả năng tư duy độc lập.' },
      { id: 'q17_8', type: 'scenario', scenario: 'Thám tử bước vào đám đông đang hô hào đuổi bắt một người.', options: ['Chạy theo', 'Dừng lại quan sát khách quan', 'Hô cùng', 'May mắn'], correctIndex: 1, explanation: 'Đám đông thường hung hãn và thiếu lý trí.' }
    ]
  },
  {
    id: 'q18',
    title: 'Bước một chân qua cửa – Foot–in–the–door',
    regionId: 'r3',
    requiredLevel: 18,
    xpReward: 260,
    gemReward: 5,
    questions: [
      { id: 'q18_1', type: 'scenario', scenario: 'Ai đó nhờ bạn giữ hộ đồ 1 phút, sau đó nhờ bạn trông hộ 1 tiếng. Bạn đồng ý.', options: ['Bạn tốt', 'Foot–in–the–door', 'Họ đáng thương', 'Rảnh'], correctIndex: 1, explanation: 'Đồng ý việc nhỏ dẫn đến việc lớn.' },
      { id: 'q18_2', type: 'scenario', scenario: 'App bắt bạn đăng ký dùng thử 0đ, sau 7 ngày nó tự trừ 1 triệu.', options: ['Bạn quên', 'Bẫy dấn thân từng bước', 'App lừa', 'Hợp lý'], correctIndex: 1, explanation: 'Một khi đã “mở cửa” thì rất khó đóng lại.' },
      { id: 'q18_3', type: 'scenario', scenario: 'Bạn đồng ý ký tên ủng hộ môi trường, sau đó họ nhờ bạn quyên góp.', options: ['Yêu môi trường', 'Cơ chế nhất quán từ cam kết nhỏ', 'Duyên', 'Ảo tưởng'], correctIndex: 1, explanation: 'Hành động nhỏ tạo ra trách nhiệm lớn.' },
      { id: 'q18_4', type: 'scenario', scenario: 'Người bán hàng nhờ bạn mặc thử áo, sau đó ép bạn mua.', options: ['Áo đẹp', 'Dính bẫy Foot–in–the–door', 'Bạn hiền', 'Dễ tính'], correctIndex: 1, explanation: 'Đã thử là đã bắt đầu “đồng ý”.' },
      { id: 'q18_5', type: 'scenario', scenario: 'Để mượn 10 triệu, bạn nên mượn 100k trước.', options: ['Không nên', 'Chiến thuật dấn thân', 'Bạn nghèo', 'Do cần'], correctIndex: 1, explanation: 'Xây dựng thói quen “đồng ý” cho đối phương.' },
      { id: 'q18_6', type: 'scenario', scenario: 'Tại sao khảo sát hay bắt đầu bằng câu hỏi Có/Không dễ dàng?', options: ['Lọc dữ liệu', 'Khởi động sự nhất quán', 'Lịch sự', 'Trend'], correctIndex: 1, explanation: 'Giam bạn vào guồng quay câu trả lời.' },
      { id: 'q18_7', type: 'scenario', scenario: 'Khi đã trót làm một việc nhỏ, ta thường cảm thấy…', options: ['Mệt mỏi', 'Có trách nhiệm phải làm tiếp việc lớn', 'Hạnh phúc', 'Vô tội'], correctIndex: 1, explanation: 'Áp lực của sự nhất quán nội tại.' },
      { id: 'q18_8', type: 'scenario', scenario: 'Thám tử bước vào phòng thẩm vấn và mời nghi phạm một điếu thuốc.', options: ['Lòng tốt', 'Kích hoạt sự đồng ý nhỏ đầu tiên', 'Hết thuốc', 'May mắn'], correctIndex: 1, explanation: 'Một sự nhận lời nhỏ mở đường cho lời khai.' }
    ]
  },
  {
    id: 'q19',
    title: 'Vả vào mặt rồi xin lỗi – Door–in–the–face',
    regionId: 'r3',
    requiredLevel: 19,
    xpReward: 280,
    gemReward: 6,
    questions: [
      { id: 'q19_1', type: 'scenario', scenario: 'Bạn nhờ vay 1 tỷ, người ta từ chối, bạn xin vay 10 triệu và họ đồng ý ngay.', options: ['Họ tốt', 'Door–in–the–face', 'Họ giàu', 'Hợp lý'], correctIndex: 1, explanation: 'Yêu cầu cực lớn làm yêu cầu nhỏ trở nên hợp lý.' },
      { id: 'q19_2', type: 'scenario', scenario: 'Con đòi mua iPhone 15 Pro Max, mẹ mắng, con xin mua cái ốp lưng 100k.', options: ['Con ngoan', 'Chiến thuật nhượng bộ', 'Ốp lưng rẻ', 'Duyên'], correctIndex: 1, explanation: 'Mẹ thấy mình vừa từ chối việc to nên tặc lưỡi cho việc nhỏ.' },
      { id: 'q19_3', type: 'scenario', scenario: 'Tại sao các shop hay treo bảng sale 70% nhưng thực tế toàn sale 10%?', options: ['Lừa đảo', 'Dùng 70% làm mớ rau giả để chốt 10%', 'Hết hàng', 'May mắn'], correctIndex: 1, explanation: 'Sự tương phản làm giảm sự phản kháng.' },
      { id: 'q19_4', type: 'scenario', scenario: 'Sếp bắt làm 10 báo cáo cuối tuần, bạn kêu khổ, sếp bảo “Thôi làm 2 cái thôi”.', options: ['Sếp hiền', 'Bẫy Door–in–the–face của sếp', 'Bạn lười', 'May mắn'], correctIndex: 1, explanation: 'Thực ra sếp chỉ cần bạn làm 2 cái.' },
      { id: 'q19_5', type: 'scenario', scenario: 'Người lạ nhờ bạn giúp 1 ngày, bạn từ chối, họ nhờ giúp 5 phút.', options: ['Bạn tử tế', 'Sức mạnh nhượng bộ', 'Họ bận', 'Nhân duyên'], correctIndex: 1, explanation: 'Nhượng bộ tạo ra áp lực đáp lại.' },
      { id: 'q19_6', type: 'scenario', scenario: 'Để thuyết phục thám tử khác, hãy đưa ra phương án điên rồ nhất trước.', options: ['Mưu mẹo', 'Door–in–the–face tinh vi', 'Hâm', 'May mắn'], correctIndex: 1, explanation: 'Hạ nhiệt sự phòng thủ của đối phương.' },
      { id: 'q19_7', type: 'scenario', scenario: 'Hậu quả của việc bị dính bẫy tương phản là gì?', options: ['Mua được đồ rẻ', 'Đồng ý với điều mình không thực sự muốn', 'Hạnh phúc', 'Được khen'], correctIndex: 1, explanation: 'Rơi vào ma trận so sánh giả tạo.' },
      { id: 'q19_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án và yêu cầu “Bắt tất cả mọi người!”', options: ['Bạo chúa', 'Bắt đầu bằng yêu cầu vô lý để thu hẹp dần', 'Thủ đoạn', 'May mắn'], correctIndex: 1, explanation: 'Tạo áp lực cực đại để nhận lấy sự thỏa hiệp.' }
    ]
  },
  {
    id: 'q20',
    title: 'Phe ta là nhất – In–group bias',
    regionId: 'r3',
    requiredLevel: 20,
    xpReward: 300,
    gemReward: 7,
    questions: [
      { id: 'q20_1', type: 'scenario', scenario: 'Bạn thấy bạn mình sai nhưng vì “cùng phe” nên vẫn bênh chằm chặp.', options: ['Tình bạn', 'In–group bias', 'Họ đúng', 'Sự thật'], correctIndex: 1, explanation: 'Thiên vị người cùng nhóm.' },
      { id: 'q20_2', type: 'scenario', scenario: 'Nhân viên cũ ghét nhân viên mới dù họ chưa làm gì sai.', options: ['Ma cũ bắt nạt ma mới', 'Phân biệt Oppos–In/Out group', 'Họ xấu thật', 'Do sếp'], correctIndex: 1, explanation: 'Não tự tạo ranh giới bọn ta – bọn nó.' },
      { id: 'q20_3', type: 'scenario', scenario: 'Tại sao các fanclub hay cãi nhau tay đôi trên mạng?', options: ['Hâm mộ', 'Cơ chế bảo vệ phe ta (In–group)', 'Mạng chậm', 'Vô bổ'], correctIndex: 1, explanation: 'Tăng bản sắc cá nhân nhờ thành tích nhóm.' },
      { id: 'q20_4', type: 'scenario', scenario: 'Bạn tin rằng quê mình là nơi nhiều người tài nhất thế giới.', options: ['Đúng thế', 'Tự tôn dân tộc thái quá', 'Bạn thông minh', 'Duyên số'], correctIndex: 1, explanation: 'Bias địa phương.' },
      { id: 'q20_5', type: 'scenario', scenario: 'Sếp chỉ tuyển người cùng trường đại học với mình.', options: ['Ủng hộ trường', 'Bẫy In–group bias trong tuyển dụng', 'Họ tài thật', 'Do sếp rảnh'], correctIndex: 1, explanation: 'Bỏ qua nhân tài khác vì sự thân thuộc.' },
      { id: 'q20_6', type: 'scenario', scenario: 'Trong bóng đá, fan đội nhà luôn thấy trọng tài ép đội mình.', options: ['Trọng tài ác', 'Ám thị In–group', 'Họ đúng', 'Hợp lý'], correctIndex: 1, explanation: 'Góc nhìn bị bóp méo bởi màu áo.' },
      { id: 'q20_7', type: 'scenario', scenario: 'Để chung sống hòa bình, ta cần làm gì?', options: ['Xóa bỏ nhóm', 'Tìm mục tiêu chung cho cả hai nhóm', 'Nghỉ chơi', 'Đánh nhau'], correctIndex: 1, explanation: 'Sát nhập hai nhóm thành một “Phe ta” lớn hơn.' },
      { id: 'q20_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án chia phe phái trong gia đình.', options: ['Khó phá', 'Cảnh giác với lời khai thiên vị từ phe cánh', 'Hết cách', 'May mắn'], correctIndex: 1, explanation: 'Lời khai bị nhuộm màu bởi sự trung thành mù quáng.' }
    ]
  },
  {
    id: 'q21',
    title: 'Kẻ lạ đáng ghét – Outgroup homogeneity',
    regionId: 'r3',
    requiredLevel: 21,
    xpReward: 320,
    gemReward: 8,
    questions: [
      { id: 'q21_1', type: 'scenario', scenario: 'Bạn mặc định những người từ nước X là… lừa đảo.', options: ['Đúng thế', 'Outgroup homogeneity', 'Bạn thông minh', 'Do tin đồn'], correctIndex: 1, explanation: 'Coi mọi người trong nhóm khác đều giống hệt nhau.' },
      { id: 'q21_2', type: 'scenario', scenario: 'Thanh niên nghĩ “Người già toàn bọn bảo thủ và lú lẫn”.', options: ['Đúng quá', 'Bẫy đánh đồng nhóm ngoài', 'Bạn láo', 'Sự thật'], correctIndex: 1, explanation: 'Xóa nhòa sự khác biệt cá nhân của kẻ lạ.' },
      { id: 'q21_3', type: 'scenario', scenario: 'Tại sao chúng ta hay vơ đũa cả nắm khi nói về đối thủ?', options: ['Cho nhanh', 'Não lười phân tích cá thể hóa', 'Họ dở thật', 'Hợp lý'], correctIndex: 1, explanation: 'Đơn giản hóa để dễ bề ghét bỏ.' },
      { id: 'q21_4', type: 'scenario', scenario: 'Bạn thấy một người ăn xin và thề họ là lừa đảo không cần điều tra.', options: ['Tỉnh táo', 'Định kiến Outgroup', 'Họ ác thật', 'Duyên nợ'], correctIndex: 1, explanation: 'Gán mác xấu cho nhóm không thuộc về ta.' },
      { id: 'q21_5', type: 'scenario', scenario: 'Càng ghét nhóm khác, chúng ta càng thấy họ…', options: ['Đáng thương', 'Giống nhau như đúc', 'Khác biệt', 'Thông thái'], correctIndex: 1, explanation: 'Vô hiệu hóa sự phức tạp của nhóm địch.' },
      { id: 'q21_6', type: 'scenario', scenario: 'Hậu quả của sự vơ đũa cả nắm là gì?', options: ['An toàn', 'Xung đột và kỳ thị vô căn cứ', 'Hạnh phúc', 'May mắn'], correctIndex: 1, explanation: 'Mầm mống của sự chia rẽ.' },
      { id: 'q21_7', type: 'scenario', scenario: 'Để công bằng, thám tử cần nhìn nghi phạm như thế nào?', options: ['Một kẻ tội đồ', 'Một cá thể độc lập không đại diện cho nhóm của họ', 'Người lạ', 'May mắn'], correctIndex: 1, explanation: 'Phá vỡ rào cản định kiến.' },
      { id: 'q21_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án mạng nơi hung thủ bị cho là “tất cả mọi người”.', options: ['Bắt hết', 'Cảnh giác với bẫy đánh đồng nhóm ngoài', 'Ngủ đi', 'May mắn'], correctIndex: 1, explanation: 'Mỗi cá nhân là một bí ẩn, không phải một con số.' }
    ]
  },
  {
    id: 'q22',
    title: 'Cha chung không ai khóc – Bystander effect',
    regionId: 'r3',
    requiredLevel: 22,
    xpReward: 340,
    gemReward: 9,
    questions: [
      { id: 'q22_1', type: 'scenario', scenario: 'Thấy người bị nạn trên đường đông, ai cũng nhìn rồi đi qua vì nghĩ “người khác sẽ cứu”.', options: ['Họ vô tâm', 'Bystander effect', 'Họ bận', 'Nhân đạo'], correctIndex: 1, explanation: 'Trách nhiệm bị phân tán trong đám đông.' },
      { id: 'q22_2', type: 'scenario', scenario: 'Trong nhóm chat 100 người, hỏi “Ai làm việc này không?” và chả ai trả lời.', options: ['Mọi người lười', 'Khuếch tán trách nhiệm', 'Họ bận thật', 'Do sếp'], correctIndex: 1, explanation: 'Càng đông người, càng ít nỗ lực cá nhân.' },
      { id: 'q22_3', type: 'scenario', scenario: 'Nếu bị nạn giữa đám đông, thám tử khuyên bạn nên làm gì?', options: ['Hét to “CỨU VỚI”', 'Chỉ đích danh một người: “Anh áo đỏ hãy giúp tôi!”', 'Im lặng', 'Khóc'], correctIndex: 1, explanation: 'Chỉ định trách nhiệm để ngăn chặn bẫy đám đông.' },
      { id: 'q22_4', type: 'scenario', scenario: 'Tại sao ở làng quê, người bị nạn lại được cứu nhanh hơn ở phố thị?', options: ['Họ tốt hơn', 'Đám đông ở phố làm loãng trách nhiệm', 'Hết cách', 'May mắn'], correctIndex: 1, explanation: 'Số lượng ít làm tăng trọng số cá nhân.' },
      { id: 'q22_5', type: 'scenario', scenario: 'Bạn thấy khói bốc lên từ nhà hàng xóm nhưng thấy cả xóm im lìm nên bạn cũng… đi ngủ.', options: ['Bạn bình tĩnh', 'Bẫy sự thờ ơ tập thể', 'Cháy nhẹ', 'May mắn'], correctIndex: 1, explanation: 'Mọi người đang nhìn nhau để xem tình hình.' },
      { id: 'q22_6', type: 'scenario', scenario: 'Căn phòng càng đông người chứng kiến vụ án, cơ hội bắt hung thủ càng…', options: ['Cao hơn', 'Thấp hơn do hỗn loạn và ỷ lại', 'Bình thường', 'Hợp lý'], correctIndex: 1, explanation: 'Người này tưởng người kia đã báo cảnh sát.' },
      { id: 'q22_7', type: 'scenario', scenario: 'Điều gì phá vỡ Bystander effect?', options: ['Thêm người', 'Sự xuất hiện của một người xung phong đầu tiên', 'Im lặng', 'Đi về'], correctIndex: 1, explanation: 'Hành động mồi kích hoạt ý thức cộng đồng.' },
      { id: 'q22_8', type: 'scenario', scenario: 'Thám tử bước vào đám đông đang bao quanh một người bị đánh.', options: ['Vào xem ké', 'Giải tán và phân công nhiệm vụ cho từng người', 'Hô hào', 'May mắn'], correctIndex: 1, explanation: 'Xác định lại trách nhiệm cho từng cá nhân.' }
    ]
  },
  {
    id: 'q23',
    title: 'Kẻ lười trong nhóm – Social loafing',
    regionId: 'r3',
    requiredLevel: 23,
    xpReward: 360,
    gemReward: 10,
    questions: [
      { id: 'q23_1', type: 'scenario', scenario: 'Làm việc nhóm 10 người, bạn lén lút làm ít hơn so với khi làm 1 mình.', options: ['Bạn lười', 'Social loafing', 'Bạn bận', 'Tại mọi người'], correctIndex: 1, explanation: 'Nỗ lực giảm khi công lao bị hòa tan.' },
      { id: 'q23_2', type: 'scenario', scenario: 'Kéo co đội 20 người, bạn chỉ dùng 50% sức vì “có ai biết đâu”.', options: ['Khôn lỏi', 'Bẫy ỷ lại xã hội', 'Bạn yếu', 'Trend'], correctIndex: 1, explanation: 'Mất động lực khi thiếu sự giám sát cá nhân.' },
      { id: 'q23_3', type: 'scenario', scenario: 'Tại sao các dự án nhóm thường bị chậm deadline?', options: ['Nhiều việc quá', 'Bệnh ỷ lại tập thể', 'Tại sếp', 'Do mạng'], correctIndex: 1, explanation: 'Ai cũng nghĩ mình không quan trọng.' },
      { id: 'q23_4', type: 'scenario', scenario: 'Để trị Social loafing, thám tử nên làm gì?', options: ['Mắng cả nhóm', 'Đánh giá điểm và công việc của từng người công khai', 'Nghỉ làm', 'Đi ngủ'], correctIndex: 1, explanation: 'Cá nhân hóa trách nhiệm và thành quả.' },
      { id: 'q23_5', type: 'scenario', scenario: 'Bạn thề là mình rất chăm, nhưng vào nhóm bạn lại… đi chơi game.', options: ['Game hay', 'Cơ chế lười biếng vô thức của nhóm', 'Bạn hèn', 'Do duyên'], correctIndex: 1, explanation: 'Sự bí ẩn của đám đông cổ vũ sự lười.' },
      { id: 'q23_6', type: 'scenario', scenario: 'Trong buổi brainstorming, chỉ có 2 người nói, 8 người im lặng gật đầu.', options: ['Họ thông minh', 'Sự ỷ lại tư duy', 'Họ mệt', 'May mắn'], correctIndex: 1, explanation: 'Đừng để tiếng nói số đông lấn át nỗ lực cá nhân.' },
      { id: 'q23_7', type: 'scenario', scenario: 'Lợi ích của việc làm việc cá nhân so với làm nhóm 10 người là?', options: ['Nhàn hơn', 'Năng suất trên từng người cao hơn (Ringelmann effect)', 'Vui hơn', 'Được khen'], correctIndex: 1, explanation: 'Càng đông hiệu suất càng giảm nếu không quản lý tốt.' },
      { id: 'q23_8', type: 'scenario', scenario: 'Thám tử bước vào văn phòng nơi ai cũng đang “chờ lệnh”.', options: ['Ra lệnh', 'Phân chia nhiệm vụ độc lập cho mỗi thám tử', 'Im lặng', 'Đi về'], correctIndex: 1, explanation: 'Xóa bỏ sự ỷ lại bằng trách nhiệm rạch ròi.' }
    ]
  },
  {
    id: 'q24',
    title: 'Lời thề nguyền thành phố – Tổng kết vùng 3',
    regionId: 'r3',
    requiredLevel: 24,
    xpReward: 400,
    gemReward: 15,
    questions: [
      { id: 'q24_1', type: 'scenario', scenario: 'Bạn bước vào tòa nhà bỏ hoang, một người mặc đồ đen nói “Đừng bao giờ quay đầu lại”.', options: ['Quay lại luôn', 'Sập bẫy tò mò phản kháng', 'Chạy mất dép', 'Nghiêm túc nghe theo'], correctIndex: 1, explanation: 'Lệnh cấm kích thích sự vi phạm.' },
      { id: 'q24_2', type: 'scenario', scenario: 'Hung thủ đang điều khiển đám đông bằng những lời mật ngọt.', options: ['Nghe theo', 'Dùng tư duy thám tử bóc tách từng lớp dối trá', 'Chạy trốn', 'May mắn'], correctIndex: 1, explanation: 'Sức mạnh của lời nói thao túng số đông.' },
      { id: 'q24_3', type: 'scenario', scenario: 'Vũ khí mạnh nhất để chống lại sự “Dắt mũi” ở Phố Thị?', options: ['Súng', 'Kiến thức về các thiên kiến tâm lý', 'Tiền', 'Mối quan hệ'], correctIndex: 1, explanation: 'Hiểu bẫy là bước đầu để thoát bẫy.' },
      { id: 'q24_4', type: 'scenario', scenario: 'Bạn cảm thấy mình thật nhỏ bé giữa các tòa nhà cao tầng.', options: ['Đúng thế', 'Hiệu ứng môi trường ảnh hưởng vị thế cá nhân', 'Bạn thấp thật', 'Hợp lý'], correctIndex: 1, explanation: 'Không gian định nghĩa cảm xúc.' },
      { id: 'q24_5', type: 'scenario', scenario: 'Tại sao kẻ gian thường đóng giả người quyền lực?', options: ['Cho oai', 'Lợi dụng bẫy uy quyền', 'Họ giàu', 'Sự thật'], correctIndex: 1, explanation: 'Não bộ tự động vâng lời bộ quân phục.' },
      { id: 'q24_6', type: 'scenario', scenario: 'Để thoát khỏi mê cung phố thị, thám tử cần điều gì?', options: ['Bản đồ', 'Sự tỉnh táo trước mọi lời dụ dỗ đám đông', 'La bàn', 'Xe nhanh'], correctIndex: 1, explanation: 'Bản đồ nằm trong tâm trí của bạn.' },
      { id: 'q24_7', type: 'scenario', scenario: 'Kẻ dắt mũi sợ nhất điều gì?', options: ['Cảnh sát', 'Người đặt câu hỏi “Tại sao?”', 'Tiền', 'Bị lộ'], correctIndex: 1, explanation: 'Câu hỏi phá vỡ vòng lặp thao túng.' },
      { id: 'q24_8', type: 'scenario', scenario: 'Thám tử đứng trước ngã tư Phố Thị, nơi mọi con đường đều có bẫy.', options: ['Đi đại', 'Phân tích các lực đẩy tâm lý xung quanh để chọn lối đi', 'Quay đầu', 'May mắn'], correctIndex: 1, explanation: 'Quyết định dựa trên logic thực nghiệm.' }
    ]
  },

  // ===================== VÙNG 4: MÊ CUNG "LÚ LẪN" =====================
  {
    id: 'q25',
    title: 'Nỗi ám ảnh dở dang – Zeigarnik effect',
    regionId: 'r4',
    requiredLevel: 25,
    xpReward: 300,
    gemReward: 4,
    questions: [
      { id: 'q25_1', type: 'scenario', scenario: 'Đang xem phim hay thì mất điện, cả đêm bạn không ngủ được vì cứ nghĩ về đoạn kết.', options: ['Bạn yêu phim', 'Zeigarnik effect', 'Sợ bóng tối', 'Do phim đỉnh'], correctIndex: 1, explanation: 'Não bộ ưu tiên ghi nhớ những việc chưa hoàn thành.' },
      { id: 'q25_2', type: 'scenario', scenario: 'Bài hát cứ lặp đi lặp lại trong đầu vì bạn chỉ thuộc đúng một câu.', options: ['Sâu tai', 'Hệ quả của sự dở dang', 'Bạn yêu nhạc', 'Tâm thần'], correctIndex: 1, explanation: 'Não “vòng lặp” để cố gắng kết thúc thông tin.' },
      { id: 'q25_3', type: 'scenario', scenario: 'Tại sao các shop hay cho tích điểm “Mua 8 tặng 1” và đã tích sẵn 2 điểm?', options: ['Họ tốt', 'Tạo cảm giác dự án đã bắt đầu và cần hoàn thiện', 'Lừa đảo', 'Khuyến mãi'], correctIndex: 1, explanation: 'Kích hoạt nhu cầu lấp đầy chỗ trống.' },
      { id: 'q25_4', type: 'scenario', scenario: 'Học bù đầu 10 chương, thi xong bạn quên sạch sành sanh.', options: ['Bạn lười', 'Nhiệm vụ đã hoàn thành nên não “xóa bộ nhớ”', 'Học vẹt', 'Mất trí'], correctIndex: 1, explanation: 'Khi xong việc, Zeigarnik effect biến mất.' },
      { id: 'q25_5', type: 'scenario', scenario: 'Để nhớ lâu một kiến thức, thám tử khuyên bạn nên làm gì?', options: ['Học liên tục 10 tiếng', 'Học ngắt quãng để tạo sự “dở dang” giả cho não', 'Đi ngủ', 'Bỏ học'], correctIndex: 1, explanation: 'Ngắt quãng đúng lúc làm não bám sát thông tin hơn.' },
      { id: 'q25_6', type: 'scenario', scenario: 'Người yêu cũ luôn là người khó quên nhất vì…', options: ['Họ đẹp', 'Mối tình chưa đi đến hồi kết (dở dang)', 'Bạn chung thủy', 'Do duyên'], correctIndex: 1, explanation: 'Một câu hỏi không có đáp án là câu hỏi ám ảnh nhất.' },
      { id: 'q25_7', type: 'scenario', scenario: 'Tại sao các game hay có thanh tiến trình (progress bar)?', options: ['Cho đẹp', 'Tận dụng Zeigarnik để thôi thúc bạn làm nốt', 'Máy tính tự hiện', 'Trend'], correctIndex: 1, explanation: 'Nhìn thấy sự dở dang làm ta bứt rứt.' },
      { id: 'q25_8', type: 'scenario', scenario: 'Thám tử đứng trước một vụ án bị bỏ dở từ 10 năm trước.', options: ['Bỏ qua', 'Sức mạnh ám ảnh của “việc chưa xong” thúc đẩy điều tra', 'Khó quá', 'May mắn'], correctIndex: 1, explanation: 'Hồ sơ chưa đóng là động lực mạnh nhất của thám tử.' }
    ]
  },
  {
    id: 'q26',
    title: 'Ký ức giả – False memory',
    regionId: 'r4',
    requiredLevel: 26,
    xpReward: 320,
    gemReward: 5,
    questions: [
      { id: 'q26_1', type: 'scenario', scenario: 'Bạn thề là mình đã khóa cửa, nhưng thực tế là chưa.', options: ['Bạn già', 'False memory', 'Quên', 'Có trộm'], correctIndex: 1, explanation: 'Não tự lấp đầy lỗ hổng bằng thứ “nên có”.' },
      { id: 'q26_2', type: 'scenario', scenario: 'Hàng ngàn người thề thấy Pikachu có vệt đen ở đuôi (thực tế là không).', options: ['Pikachu đổi mẫu', 'Mandela effect', 'Họ nhầm', 'Ảo giác'], correctIndex: 1, explanation: 'Trí nhớ là thứ có thể bị “xào nấu” tập thể.' },
      { id: 'q26_3', type: 'scenario', scenario: 'Tại sao nhân chứng thường khai sai màu áo hung thủ sau 1 tuần?', options: ['Họ nói dối', 'Trí nhớ bị biến đổi theo thời gian', 'Họ cận', 'Hung thủ thay áo'], correctIndex: 1, explanation: 'Mỗi lần nhớ lại là một lần não… viết lại kịch bản.' },
      { id: 'q26_4', type: 'scenario', scenario: 'Bạn nhớ mình bị lạc ở siêu thị hồi 5 tuổi dù mẹ bảo “làm gì có”.', options: ['Bạn nhớ đúng', 'Ký ức bị cấy', 'Mẹ quên', 'Bịa đặt'], correctIndex: 1, explanation: 'Nghe kể nhiều quá nên não tự biến thành “trải nghiệm”.' },
      { id: 'q26_5', type: 'scenario', scenario: 'Trong phòng thẩm vấn, thám tử hỏi “Cái xe đỏ chạy nhanh không?” dù xe màu xanh.', options: ['Hỏi ngu', 'Bẫy thông tin sai lạc', 'Thám tử mù màu', 'May mắn'], correctIndex: 1, explanation: 'Câu hỏi định hướng cài cắm ký ức giả cho nhân chứng.' },
      { id: 'q26_6', type: 'scenario', scenario: 'Bạn quả quyết mình đã ăn cơm rồi, dù bụng đang kêu.', options: ['No ảo', 'Ký ức giả do thói quen', 'Bạn hâm', 'Do mạng'], correctIndex: 1, explanation: 'Hành động lặp đi lặp lại làm não lẫn lộn.' },
      { id: 'q26_7', type: 'scenario', scenario: 'Để kiểm chứng trí nhớ, cách tốt nhất là?', options: ['Suy nghĩ kỹ', 'Xem lại bằng chứng vật lý', 'Hỏi bạn bè', 'Đi ngủ'], correctIndex: 1, explanation: 'Đừng bao giờ tin 100% vào bộ não của mình.' },
      { id: 'q26_8', type: 'scenario', scenario: 'Thám tử tìm thấy một nhật ký viết sai sự thật một cách vô ý.', options: ['Tội phạm xảo quyệt', 'Nghi phạm bị bẫy ký ức giả', 'Nhật ký rác', 'May mắn'], correctIndex: 1, explanation: 'Sự thật nằm ở chứng cứ, không phải cảm nhận.' }
    ]
  },
  {
    id: 'q27',
    title: 'Đạo văn vô thức – Cryptomnesia',
    regionId: 'r4',
    requiredLevel: 27,
    xpReward: 340,
    gemReward: 6,
    questions: [
      { id: 'q27_1', type: 'scenario', scenario: 'Bạn nghĩ ra một giai điệu cực hay, sau đó phát hiện nó là nhạc chuông của bạn thân.', options: ['Ý tưởng lớn gặp nhau', 'Cryptomnesia', 'Bạn giỏi', 'Trùng hợp'], correctIndex: 1, explanation: 'Não nhớ giai điệu nhưng quên nguồn gốc.' },
      { id: 'q27_2', type: 'scenario', scenario: 'Nhà văn viết một câu triết lý và thề là mình tự nghĩ ra, dù nó có trong sách SGK.', options: ['Thiên tài', 'Bẫy Cryptomnesia', 'Hợp lý', 'Ảo tưởng'], correctIndex: 1, explanation: 'Ký ức cũ hiện ra như ý tưởng mới.' },
      { id: 'q27_3', type: 'scenario', scenario: 'Tại sao các ca sĩ hay bị dính scandal “đạo nhạc” dù họ thề là không biết?', options: ['Họ nói dối', 'Cơ chế ghi nhớ tiềm thức lừa dối họ', 'Họ hâm', 'May mắn'], correctIndex: 1, explanation: 'Tai nghe – não giữ – tay viết lại như của mình.' },
      { id: 'q27_4', type: 'scenario', scenario: 'Bạn kể một câu chuyện cười cho chính người đã kể nó cho bạn nghe.', options: ['Bạn vui tính', 'Quên nguồn gốc thông tin', 'Bạn hâm', 'Do duyên'], correctIndex: 1, explanation: 'Đỉnh cao của sự “ngáo” trí nhớ.' },
      { id: 'q27_5', type: 'scenario', scenario: 'Làm sao để tránh đạo văn vô thức?', options: ['Đừng đọc gì cả', 'Ghi chú nguồn gốc mọi thứ bạn học được', 'Đi chơi', 'May mắn'], correctIndex: 1, explanation: 'Quản lý nguồn tin là cách duy nhất.' },
      { id: 'q27_6', type: 'scenario', scenario: 'Não bộ thích lưu trữ “nội dung” hơn là “nguồn gốc”. Đúng hay sai?', options: ['Sai', 'Đúng', 'Tùy người', 'Hợp lý'], correctIndex: 1, explanation: 'Cái gì quan trọng (nội dung) thì giữ, ai nói (nguồn) thì vứt.' },
      { id: 'q27_7', type: 'scenario', scenario: 'Bạn thấy ý tưởng của mình bị người khác nói ra trong cuộc họp.', options: ['Họ ăn cắp', 'Có thể họ cũng bị Cryptomnesia', 'Bạn nói quá chậm', 'May mắn'], correctIndex: 1, explanation: 'Đừng vội kết tội khi chưa hiểu bộ não.' },
      { id: 'q27_8', type: 'scenario', scenario: 'Thám tử bắt gặp một vụ án giống hệt vụ án nổi tiếng trong tiểu thuyết.', options: ['Bắt chước', 'Kẻ thủ ác bị ám thị Cryptomnesia', 'Trùng hợp', 'May mắn'], correctIndex: 1, explanation: 'Thực tế đôi khi là bản sao vô thức của hư cấu.' }
    ]
  },
  {
    id: 'q28',
    title: 'Nhầm nguồn tin – Source monitoring error',
    regionId: 'r4',
    requiredLevel: 28,
    xpReward: 360,
    gemReward: 7,
    questions: [
      { id: 'q28_1', type: 'scenario', scenario: 'Bạn thề là sếp nói cho nghỉ thứ 6, nhưng hóa ra là… sếp trong mơ.', options: ['Bạn mơ ngủ', 'Source monitoring error', 'Sếp ác', 'Hết cứu'], correctIndex: 1, explanation: 'Nhầm lẫn giữa thực và mộng.' },
      { id: 'q28_2', type: 'scenario', scenario: 'Tin rằng cà rốt giúp mắt sáng như đèn pha vì nghe bà kể (thực tế là do tuyên truyền thế chiến).', options: ['Bà đúng', 'Lỗi nguồn tin lịch sử', 'Sự thật', 'Bạn tin người'], correctIndex: 1, explanation: 'Tin đồn biến thành kiến thức thường thức.' },
      { id: 'q28_3', type: 'scenario', scenario: 'Tại sao tin giả (fake news) lại sống dai?', options: ['Vì nó hay', 'Vì ta quên mất nguồn là từ “bài đăng nhảm” và chỉ nhớ nội dung', 'Do mạng', 'Hợp lý'], correctIndex: 1, explanation: 'Sleeper effect: Nội dung ở lại, nguồn ra đi.' },
      { id: 'q28_4', type: 'scenario', scenario: 'Bạn nhớ mang máng đã đọc tin này trên báo lớn, hóa ra là trên… lá cải.', options: ['Bạn nhầm', 'Bẫy Source monitoring', 'Báo nào chả thế', 'Do mắt'], correctIndex: 1, explanation: 'Nâng cấp nguồn tin theo ý muốn của não.' },
      { id: 'q28_5', type: 'scenario', scenario: 'Làm thế nào để thám tử không bị nhầm nguồn tin?', options: ['Tin sếp', 'Luôn kiểm tra chéo (cross–verify)', 'Đi ngủ', 'May mắn'], correctIndex: 1, explanation: 'Một nguồn là không nguồn.' },
      { id: 'q28_6', type: 'scenario', scenario: 'Bạn mắng con vì tội lười, sau đó nhớ ra là mình… mắng nhầm đứa khác.', options: ['Bạn già', 'Lỗi giám sát nguồn đối tượng', 'Con lười thiệt mà', 'Hợp lý'], correctIndex: 1, explanation: 'Nhầm chủ thể của ký ức.' },
      { id: 'q28_7', type: 'scenario', scenario: 'Sleeper effect là gì?', options: ['Hiệu ứng ngủ gật', 'Thông tin từ nguồn không tin cậy càng lâu càng dễ tin', 'Game hay', 'Ảo giác'], correctIndex: 1, explanation: 'Thời gian xóa nhòa sự cảnh giác về nguồn gốc.' },
      { id: 'q28_8', type: 'scenario', scenario: 'Thám tử đối mặt với nhân chứng thề là “Thấy tận mắt”.', options: ['Tin luôn', 'Cảnh giác với sự nhầm lẫn giữa tận mắt và nghe kể', 'Bắt hung thủ', 'May mắn'], correctIndex: 1, explanation: 'Trí nhớ là kẻ nói dối tài ba.' }
    ]
  },
  {
    id: 'q29',
    title: 'Bẫy tin đồn – Misinformation effect',
    regionId: 'r4',
    requiredLevel: 29,
    xpReward: 380,
    gemReward: 8,
    questions: [
      { id: 'q29_1', type: 'scenario', scenario: 'Ai cũng bảo ăn món X bị ung thư, bạn vứt luôn thùng món X dù báo chí chưa nói.', options: ['Bạn cẩn thận', 'Misinformation effect', 'Món X dở', 'Do lo sợ'], correctIndex: 1, explanation: 'Thông tin ngoài lề đè bẹp sự thực.' },
      { id: 'q29_2', type: 'scenario', scenario: 'Clip cắt ghép làm bạn tin ca sĩ A là người xấu.', options: ['Cắt ghép đỉnh', 'Bẫy định hướng thông tin', 'Sự thật', 'Xử lý kém'], correctIndex: 1, explanation: 'Não bộ tin vào hình ảnh trước khi tin vào logic.' },
      { id: 'q29_3', type: 'scenario', scenario: 'Tại sao tin đồn trong công ty lại lan nhanh hơn thông báo chính thức?', options: ['Nó ly kỳ', 'Đáp ứng nhu cầu giải tỏa tâm lý và kết nối', 'Thông báo sếp dở', 'Do rảnh'], correctIndex: 1, explanation: 'Tin đồn là keo dán xã hội (dù độc hại).' },
      { id: 'q29_4', type: 'scenario', scenario: 'Bạn thấy người ta bảo “Trái đất phẳng” và bắt đầu nghi ngờ khoa học.', options: ['Bạn thông minh', 'Dính bẫy tin đồn cực đoan', 'Khoa học sai thật', 'Ảo giác'], correctIndex: 1, explanation: 'Sự lặp lại tạo ra cảm giác về chân lý.' },
      { id: 'q29_5', type: 'scenario', scenario: 'Cách dập tắt tin đồn hiệu quả nhất?', options: ['Im lặng', 'Cung cấp thông tin minh bạch và trung thực ngay lập tức', 'Mắng người đồn', 'Đi chơi'], correctIndex: 1, explanation: 'Chân lý là thuốc độc của tin đồn.' },
      { id: 'q29_6', type: 'scenario', scenario: 'Sức mạnh của lời đồn nằm ở đâu?', options: ['Sự thật', 'Sự sợ hãi và tò mò', 'Người đồn giàu', 'May mắn'], correctIndex: 1, explanation: 'Càng sợ người ta càng đồn.' },
      { id: 'q29_7', type: 'scenario', scenario: 'Tại sao thám tử không được nghe tin đồn từ hàng xóm?', options: ['Họ nói dối', 'Tin đồn biến dạng qua mỗi người kể (lọc bớt, thêm thắt, đánh bóng)', 'Họ bận', 'Tiết kiệm thời gian'], correctIndex: 1, explanation: 'Thông tin tam sao thất bản.' },
      { id: 'q29_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án mạng nôn nao cả khu phố.', options: ['Hỏi dân', 'Gạt bỏ mọi lời đồn, chỉ tin vào chứng cứ pháp y', 'Đi về', 'May mắn'], correctIndex: 1, explanation: 'Đám đông luôn phóng đại sự thật.' }
    ]
  },
  {
    id: 'q30',
    title: 'Ảo giác quen thuộc – Déjà vu',
    regionId: 'r4',
    requiredLevel: 30,
    xpReward: 400,
    gemReward: 9,
    questions: [
      { id: 'q30_1', type: 'scenario', scenario: 'Đang ăn cơm, bạn khựng lại: “Cảnh này mình thấy ở đâu rồi!”', options: ['Tiền kiếp', 'Déjà vu', 'Mơ ngủ', 'Trùng hợp'], correctIndex: 1, explanation: 'Não xử lý nhầm thông tin hiện tại thành ký ức.' },
      { id: 'q30_2', type: 'scenario', scenario: 'Gặp người lạ mà cứ thề là bạn thân từ thuở nào dù mới gặp lần đầu.', options: ['Nhân duyên', 'Ảo giác quen thuộc (Déjà vu)', 'Họ giống ai đó', 'Bạn hâm'], correctIndex: 1, explanation: 'Lỗi đồng bộ của hai bán cầu não.' },
      { id: 'q30_3', type: 'scenario', scenario: 'Ngược lại với Déjà vu, nhìn đồ vật thân thuộc mà thấy lạ hoắc.', options: ['Mất trí', 'Jamais vu', 'Đồ vật mới', 'Do nhìn lâu quá'], correctIndex: 1, explanation: 'Mất cảm giác quen thuộc với thứ đã biết.' },
      { id: 'q30_4', type: 'scenario', scenario: 'Tại sao ta hay gặp Déjà vu khi… mệt mỏi?', options: ['Thần kinh yếu', 'Não bộ bị trễ nhịp xử lý (lag)', 'Hợp lý', 'Ảo ảnh'], correctIndex: 1, explanation: 'Não bộ “lag” nên ghi đè dữ liệu sai vị trí.' },
      { id: 'q30_5', type: 'scenario', scenario: 'Bạn đọc một từ mãi và thấy nó… chẳng có ý nghĩa gì nữa.', options: ['Từ đó sai', 'Semantic satiation', 'Bạn mệt', 'Hết chữ'], correctIndex: 1, explanation: 'Lặp lại quá nhiều làm tế bào thần kinh trơ lỳ.' },
      { id: 'q30_6', type: 'scenario', scenario: 'Khi gặp Déjà vu, thám tử nên làm gì?', options: ['Tin vào định mệnh', 'Bình tĩnh kiểm tra thực tế, coi đó là lỗi thần kinh', 'Sợ hãi', 'May mắn'], correctIndex: 1, explanation: 'Đừng để cảm giác dắt mũi logic.' },
      { id: 'q30_7', type: 'scenario', scenario: 'Déjà vu có phải là bằng chứng của dòng thời gian song song?', options: ['Đúng thế', 'Chưa có bằng chứng khoa học, chỉ là giả thuyết', 'Hâm', 'May mắn'], correctIndex: 1, explanation: 'Khoa học thiên về giải thích sinh học hơn.' },
      { id: 'q30_8', type: 'scenario', scenario: 'Thám tử bước vào căn phòng xa lạ nhưng thấy quen thuộc đến lạ kỳ.', options: ['Nhà mình', 'Cảnh giác với bẫy Déjà vu hoặc ký ức tiềm ẩn', 'Ngủ đi', 'May mắn'], correctIndex: 1, explanation: 'Có thể bạn đã thấy nó trong một bức ảnh cũ.' }
    ]
  },
  {
    id: 'q31',
    title: 'Quên trong nháy mắt – Doorway effect',
    regionId: 'r4',
    requiredLevel: 31,
    xpReward: 420,
    gemReward: 10,
    questions: [
      { id: 'q31_1', type: 'scenario', scenario: 'Vừa bước qua cửa phòng để lấy đồ, bỗng quên mất mình định lấy gì.', options: ['Bạn già', 'Doorway effect', 'Đồ vật chạy mất', 'Ảo giác'], correctIndex: 1, explanation: 'Cánh cửa đóng lại một bối cảnh bộ nhớ của não.' },
      { id: 'q31_2', type: 'scenario', scenario: 'Đang nói chuyện hay bỗng có người cắt ngang, thế là quên tiệt định nói gì.', options: ['Bạn lú', 'Lỗi bộ nhớ đệm (working memory)', 'Người kia ác', 'Do mạng'], correctIndex: 1, explanation: 'Bộ nhớ tạm thời bị ghi đè.' },
      { id: 'q31_3', type: 'scenario', scenario: 'Tại sao thám tử hay mang theo sổ tay thay vì tin vào đầu mình?', options: ['Cho oai', 'Chống lại sự rơi rụng của working memory', 'Nghiệp vụ', 'May mắn'], correctIndex: 1, explanation: 'Bút mực mờ hơn trí nhớ tốt.' },
      { id: 'q31_4', type: 'scenario', scenario: 'Bạn nhớ số điện thoại trong 5 giây, sau đó quên sạch.', options: ['Bình thường', 'Cơ chế xóa rác của bộ nhớ ngắn hạn', 'Bạn kém', 'Do số khó'], correctIndex: 1, explanation: 'Não không muốn giữ thứ vô dụng lâu.' },
      { id: 'q31_5', type: 'scenario', scenario: 'Để nhớ lại thứ vừa quên sau khi đi qua cửa, bạn nên làm gì?', options: ['Vò đầu', 'Quay lại vị trí cũ trước khi đi qua cửa', 'Đi ngủ', 'Khóc'], correctIndex: 1, explanation: 'Khôi phục bối cảnh gốc của ký ức.' },
      { id: 'q31_6', type: 'scenario', scenario: 'Não bộ có thể giữ bao nhiêu món đồ trong bộ nhớ ngắn hạn cùng lúc?', options: ['Vô hạn', 'Khoảng 7 (cộng trừ 2)', '100', '1'], correctIndex: 1, explanation: 'Định luật Miller về giới hạn bộ nhớ.' },
      { id: 'q31_7', type: 'scenario', scenario: 'Hậu quả của việc quá tải thông tin là gì?', options: ['Thông minh hơn', 'Mất khả năng ghi nhớ và ra quyết định', 'Vui vẻ', 'May mắn'], correctIndex: 1, explanation: 'Não bộ sẽ “treo máy” như máy tính.' },
      { id: 'q31_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án với quá nhiều nghi phạm và dữ liệu.', options: ['Bắt hết', 'Phân nhóm thông tin để tránh quá tải bộ nhớ', 'Đi về', 'May mắn'], correctIndex: 1, explanation: 'Chia nhỏ để trị.' }
    ]
  },
  {
    id: 'q32',
    title: 'Lời nguyền mê cung – Tổng kết vùng 4',
    regionId: 'r4',
    requiredLevel: 32,
    xpReward: 500,
    gemReward: 20,
    questions: [
      { id: 'q32_1', type: 'scenario', scenario: 'Bạn lạc trong mê cung và thấy một bảng chỉ dẫn: “Đừng tin vào ký ức của bạn”.', options: ['Vất bảng đi', 'Nghiệm ra chân lý về sự sai lạc của bộ não', 'Sợ quá', 'May mắn'], correctIndex: 1, explanation: 'Bài học lớn nhất của vùng này.' },
      { id: 'q32_2', type: 'scenario', scenario: 'Vũ khí mạnh nhất để chống lại sự “Lú lẫn” là gì?', options: ['La bàn', 'Sự ghi chép và kiểm chứng trực quan', 'Đèn pin', 'Tiền'], correctIndex: 1, explanation: 'Chứng cứ vật lý không biết nói dối.' },
      { id: 'q32_3', type: 'scenario', scenario: 'Kẻ thù lớn nhất trong Mê Cung Lú Lẫn là ai?', options: ['Hung thủ', 'Chính bộ não hay tự huyễn hoặc của ta', 'Con quái vật', 'Sếp'], correctIndex: 1, explanation: 'Kẻ thù nằm trong gương.' },
      { id: 'q32_4', type: 'scenario', scenario: 'Tại sao những câu chuyện cổ tích lại hay có đoạn lặp lại?', options: ['Tác giả lười', 'Để cấy ký ức lâu dài vào não trẻ em', 'Trend', 'Hợp lý'], correctIndex: 1, explanation: 'Sự lặp lại là mẹ của ký ức.' },
      { id: 'q32_5', type: 'scenario', scenario: 'Bạn cảm thấy thời gian trôi nhanh hơn khi về già.', options: ['Đúng thế', 'Do não ít trải nghiệm mới (logarithmic time)', 'Bạn già thật', 'Ảo giác'], correctIndex: 1, explanation: 'Trải nghiệm mới làm chậm dòng thời gian.' },
      { id: 'q32_6', type: 'scenario', scenario: 'Để thoát mê cung, thám tử cần điều gì ngoài bản đồ?', options: ['Lòng dũng cảm', 'Tư duy phản biện lại chính kinh nghiệm của mình', 'Thịt bò khô', 'May mắn'], correctIndex: 1, explanation: 'Kinh nghiệm đôi khi là cái bẫy.' },
      { id: 'q32_7', type: 'scenario', scenario: 'Điều gì xảy ra nếu bạn thoát được Mê Cung?', options: ['Trở thành thần', 'Lên level mới và mở khóa vùng 5', 'Hết game', 'Được tiền'], correctIndex: 1, explanation: 'Phần thưởng là sự trưởng thành trong tư duy.' },
      { id: 'q32_8', type: 'scenario', scenario: 'Thám tử bước ra khỏi cửa Mê Cung và thấy ánh sáng.', options: ['Nhắm mắt', 'Tận hưởng sự tỉnh táo sau một hành trình “hack não”', 'Quay lại', 'May mắn'], correctIndex: 1, explanation: 'Chào mừng bạn đến với thế giới thực.' }
    ]
  },

  // ===================== VÙNG 5: SÀN ĐẤU "NGÁO QUYẾT ĐỊNH" =====================
  {
    id: 'q33',
    title: 'Cố đấm ăn xôi – Sunk cost fallacy',
    regionId: 'r5',
    requiredLevel: 33,
    xpReward: 420,
    gemReward: 4,
    questions: [
      { id: 'q33_1', type: 'scenario', scenario: 'Bạn mua vé xem phim 100k, phim dở tệ nhưng bạn vẫn ngồi xem hết “vì tiếc tiền vé”.', options: ['Bạn kiên nhẫn', 'Sunk cost fallacy', 'Bạn yêu phim', 'Do điện ảnh'], correctIndex: 1, explanation: 'Tiền đã mất không thể lấy lại, đừng mất thêm thời gian.' },
      { id: 'q33_2', type: 'scenario', scenario: 'Yêu một người độc hại 5 năm, bạn không dám chia tay vì “tiếc công sức thanh xuân”.', options: ['Tình yêu cao thượng', 'Bẫy chi phí chìm', 'Bạn chung thủy', 'Do duyên số'], correctIndex: 1, explanation: 'Quá khứ không nên là cái cùm cho tương lai.' },
      { id: 'q33_3', type: 'scenario', scenario: 'Cố ăn hết bát cơm dù đã no lòi mắt vì “tiếc công nấu”.', options: ['Bạn tiết kiệm', 'Ngụy biện chi phí chìm trong ăn uống', 'Bạn đói', 'Ngon quá'], correctIndex: 1, explanation: 'Ăn quá no sẽ tốn thêm tiền thuốc.' },
      { id: 'q33_4', type: 'scenario', scenario: 'Startup thua lỗ 1 tỷ, bạn đổ thêm 1 tỷ nữa “để cứu vãn danh dự”.', options: ['Bạn dũng cảm', 'Bẫy dấn thân vào chi phí chìm', 'Bạn giàu', 'Do thị trường'], correctIndex: 1, explanation: 'Đừng ném tiền tốt theo tiền xấu.' },
      { id: 'q33_5', type: 'scenario', scenario: 'Tại sao các dự án nhà nước hay bị kéo dài và đội vốn?', options: ['Nhiều việc quá', 'Tâm lý không nỡ từ bỏ những gì đã đầu tư', 'Do thời tiết', 'Hợp lý'], correctIndex: 1, explanation: 'Càng đổ nhiều tiền càng khó dừng lại.' },
      { id: 'q33_6', type: 'scenario', scenario: 'Bạn cầm một cổ phiếu đang chia 10 nhưng không bán vì “chờ về bờ”.', options: ['Bạn kiên định', 'Nô lệ của chi phí chìm', 'Bạn thông minh', 'Do sàn lỗi'], correctIndex: 1, explanation: 'Hy vọng viển vông dựa trên nỗi đau quá khứ.' },
      { id: 'q33_7', type: 'scenario', scenario: 'Cách tốt nhất để thoát bẫy sunk cost?', options: ['Tiết kiệm hơn', 'Hỏi: Nếu bây giờ mới bắt đầu, mình có làm việc này không?', 'Cố thêm tí nữa', 'May mắn'], correctIndex: 1, explanation: 'Tập trung vào lợi ích tương lai, lờ đi chi phí quá khứ.' },
      { id: 'q33_8', type: 'scenario', scenario: 'Thám tử phát hiện mình đã điều tra sai hướng suốt 1 tháng.', options: ['Cố bẻ lái sang hướng đó', 'Can đảm bỏ hết làm lại từ đầu', 'Lấp liếm', 'May mắn'], correctIndex: 1, explanation: 'Sự thật quan trọng hơn cái tôi.' }
    ]
  },
  {
    id: 'q34',
    title: 'Sợ mất hơn được – Loss aversion',
    regionId: 'r5',
    requiredLevel: 34,
    xpReward: 440,
    gemReward: 5,
    questions: [
      { id: 'q34_1', type: 'scenario', scenario: 'Bạn thấy đau khổ khi mất 100k gấp đôi niềm vui khi được 100k.', options: ['Bạn nghèo', 'Loss aversion', 'Bình thường', 'Do tiền'], correctIndex: 1, explanation: 'Nỗi đau mất mát luôn nặng nề hơn niềm vui tương đương.' },
      { id: 'q34_2', type: 'scenario', scenario: 'Shop bảo “Mua ngay kẻo hết”, bạn chốt đơn vì sợ mất cơ hội.', options: ['Săn sale', 'Bẫy sợ mất', 'Đồ xịn', 'Do sếp'], correctIndex: 1, explanation: 'Nỗi sợ mất món hời thúc đẩy hành động.' },
      { id: 'q34_3', type: 'scenario', scenario: 'Bạn không dám đầu tư chứng khoán vì sợ mất tiền, dù khả năng thắng cao.', options: ['Bạn cẩn thận', 'Tê liệt do ghét tổn thất', 'Bạn thông minh', 'Do sàn'], correctIndex: 1, explanation: 'Sợ thua làm ta bỏ lỡ mọi cơ hội thắng.' },
      { id: 'q34_4', type: 'scenario', scenario: 'Tại sao các app hay có chế độ “Dùng thử 7 ngày”?', options: ['Họ tốt', 'Để bạn sở hữu và sợ bị tước đoạt sau 7 ngày', 'Trend', 'May mắn'], correctIndex: 1, explanation: 'Khi đã có, ta sẽ làm mọi cách để không mất.' },
      { id: 'q34_5', type: 'scenario', scenario: 'Trong đàm phán, nhấn mạnh vào “Điều bạn sẽ MẤT” hiệu quả hơn “Điều bạn được”. Đúng hay sai?', options: ['Sai', 'Đúng', 'Tùy người', 'Hợp lý'], correctIndex: 1, explanation: 'Con người nhạy cảm với sự đe dọa mất mát.' },
      { id: 'q34_6', type: 'scenario', scenario: 'Tại sao người ta hay giữ những đồ vật cũ kỹ vô dụng?', options: ['Kỷ niệm', 'Sợ cảm giác mất đi quyền sở hữu', 'Lười vứt', 'Hợp lý'], correctIndex: 1, explanation: 'Vứt đồ là một dạng tổn thất tâm lý.' },
      { id: 'q34_7', type: 'scenario', scenario: 'Hậu quả của loss aversion trong trading?', options: ['Lãi to', 'Gồng lỗ đến chết nhưng chốt lời cực non', 'Vui vẻ', 'May mắn'], correctIndex: 1, explanation: 'Sợ chốt lỗ nên chấp nhận rủi ro lớn hơn.' },
      { id: 'q34_8', type: 'scenario', scenario: 'Thám tử đe dọa nghi phạm: “Nếu không khai, anh sẽ MẤT cơ hội giảm án”.', options: ['Ác quá', 'Tận dụng loss aversion để ép cung', 'Bình thường', 'May mắn'], correctIndex: 1, explanation: 'Đòn tâm lý đánh vào nỗi sợ bị tước đoạt.' }
    ]
  },
  {
    id: 'q35',
    title: 'Nghệ thuật đóng khung – Framing effect',
    regionId: 'r5',
    requiredLevel: 35,
    xpReward: 460,
    gemReward: 6,
    questions: [
      { id: 'q35_1', type: 'scenario', scenario: 'Sữa ghi “99% không béo” bạn mua ngay, sữa ghi “1% béo” bạn chê.', options: ['Bạn sành ăn', 'Framing effect', 'Sự thật khác nhau', 'Do hãng'], correctIndex: 1, explanation: 'Cách trình bày thay đổi hoàn toàn phán đoán.' },
      { id: 'q35_2', type: 'scenario', scenario: 'Bác sĩ bảo “Tỷ lệ sống là 90%”, bạn yên tâm mổ. Nếu bảo “Tỷ lệ chết 10%”, bạn chạy mất dép.', options: ['Bạn sợ chết', 'Bẫy khung tích cực/tiêu cực', 'Y học đỉnh', 'May mắn'], correctIndex: 1, explanation: 'Cùng một con số, góc nhìn khác nhau gây cảm xúc khác.' },
      { id: 'q35_3', type: 'scenario', scenario: 'Tại sao món ăn 100k lại ghi là 99k?', options: ['Rẻ hơn 1k', 'Đóng khung con số bên trái nhỏ hơn', 'Hết tiền lẻ', 'Trend'], correctIndex: 1, explanation: 'Não đọc số đầu tiên và gán mác rẻ.' },
      { id: 'q35_4', type: 'scenario', scenario: 'Bạn khen cô gái: “Em trông đỡ béo hơn hôm qua”. Bạn sẽ nhận được gì?', options: ['Cái tát', 'Lời cảm ơn', 'Sự hâm mộ', 'May mắn'], correctIndex: 0, explanation: 'Đóng khung tiêu cực dù ý đồ tốt.' },
      { id: 'q35_5', type: 'scenario', scenario: 'Trong tranh luận, thám tử nên “đóng khung” sự thật như thế nào?', options: ['Nói hết ra', 'Chọn góc nhìn có lợi cho việc lấy lời khai', 'Im lặng', 'May mắn'], correctIndex: 1, explanation: 'Sự thật là đất nặn trong tay người khéo léo.' },
      { id: 'q35_6', type: 'scenario', scenario: 'Công ty thông báo “Giảm lương 10%” và “Tặng thưởng 90% lương cũ”. Cái nào dễ nghe hơn?', options: ['Cả hai như nhau', 'Cái số 2 (dù thực tế tệ hơn)', 'Cái số 1', 'May mắn'], correctIndex: 1, explanation: 'Ngôn từ “tặng thưởng” che mờ sự thật “giảm”.' },
      { id: 'q35_7', type: 'scenario', scenario: 'Lợi ích của hiệu ứng đóng khung trong marketing?', options: ['Lừa khách', 'Làm sản phẩm trông hấp dẫn hơn mà không cần đổi chất lượng', 'Vui', 'May mắn'], correctIndex: 1, explanation: 'Thay vỏ đổi đời.' },
      { id: 'q35_8', type: 'scenario', scenario: 'Thám tử bước vào hiện trường và gọi nó là “Một tác phẩm nghệ thuật”.', options: ['Biến thái', 'Đóng khung để giữ bình tĩnh điều tra', 'Hâm', 'May mắn'], correctIndex: 1, explanation: 'Cách bạn gọi tên thế giới định nghĩa thái độ của bạn.' }
    ]
  },
  {
    id: 'q36',
    title: 'Ăn cho hết – Unit bias',
    regionId: 'r5',
    requiredLevel: 36,
    xpReward: 480,
    gemReward: 7,
    questions: [
      { id: 'q36_1', type: 'scenario', scenario: 'Bát phở to gấp đôi bình thường, bạn cố ăn hết dù đã no từ giữa chừng.', options: ['Ăn khỏe', 'Unit bias', 'Ngon quá', 'Tiết kiệm'], correctIndex: 1, explanation: 'Ta có xu hướng hoàn thành 1 đơn vị được giao bất kể kích cỡ.' },
      { id: 'q36_2', type: 'scenario', scenario: 'Tại sao kẹo trong gói to lại làm bạn ăn nhiều hơn kẹo gói nhỏ?', options: ['Gói to rẻ hơn', 'Bẫy đơn vị tiêu thụ', 'Do kẹo ngon', 'Ngẫu nhiên'], correctIndex: 1, explanation: 'Một gói là một mục tiêu, kích cỡ mục tiêu thay đổi lượng ăn.' },
      { id: 'q36_3', type: 'scenario', scenario: 'Bạn đọc hết một quyển sách dở chỉ vì “trót đọc rồi phải xong”.', options: ['Yêu sách', 'Unit bias trong học thuật', 'Lười vứt', 'May mắn'], correctIndex: 1, explanation: 'Nhu cầu hoàn thành một chỉnh thể.' },
      { id: 'q36_4', type: 'scenario', scenario: 'Để giảm cân, thám tử khuyên bạn dùng bát đĩa như thế nào?', options: ['Bát to', 'Bát đĩa nhỏ hơn', 'Không dùng bát', 'Ăn bốc'], correctIndex: 1, explanation: 'Đánh lừa não bộ về một “đơn vị đầy đủ”.' },
      { id: 'q36_5', type: 'scenario', scenario: 'Tại sao các app hay chia nhỏ bài học thành từng đoạn ngắn?', options: ['Dễ học', 'Tận dụng unit bias để bạn hoàn thành liên tục', 'Lười viết dài', 'May mắn'], correctIndex: 1, explanation: 'Tạo ra nhiều cảm giác chiến thắng nhỏ.' },
      { id: 'q36_6', type: 'scenario', scenario: 'Bạn uống hết chai nước 1.5 lít chỉ vì “mở nắp rồi”.', options: ['Khát nước', 'Say mê đơn vị', 'Bạn khỏe', 'Do nước'], correctIndex: 1, explanation: 'Khi đơn vị quá lớn, ta dễ bị quá tải nhưng vẫn cố.' },
      { id: 'q36_7', type: 'scenario', scenario: 'Cách tốt nhất để tiết kiệm tiền là chia nhỏ tiền vào nhiều hũ.', options: ['Lằng nhằng', 'Đúng (tạo ra nhiều đơn vị để cân nhắc)', 'Sai', 'Hợp lý'], correctIndex: 1, explanation: 'Lấy tiền ra khỏi một hũ “đơn vị” khó hơn tiêu tiền từ một cọc lớn.' },
      { id: 'q36_8', type: 'scenario', scenario: 'Thám tử bước vào hiện trường mê cung và chia nó thành từng ô gạch.', options: ['Rảnh', 'Dùng unit bias để không bỏ sót mét vuông nào', 'Vui tính', 'May mắn'], correctIndex: 1, explanation: 'Kiểm soát bằng cách định nghĩa lại đơn vị.' }
    ]
  },
  {
    id: 'q37',
    title: 'Sướng trước khổ sau – Hyperbolic discounting',
    regionId: 'r5',
    requiredLevel: 37,
    xpReward: 500,
    gemReward: 8,
    questions: [
      { id: 'q37_1', type: 'scenario', scenario: 'Chọn nhận 1 triệu ngay bây giờ thay vì 2 triệu sau 1 năm.', options: ['Bạn thông minh', 'Hyperbolic discounting', 'Bạn cần tiền gấp', 'Do lạm phát'], correctIndex: 1, explanation: 'Não ưu tiên phần thưởng tức thì bất chấp giá trị nhỏ.' },
      { id: 'q37_2', type: 'scenario', scenario: 'Bạn thức đêm xem phim dù biết mai đi làm sẽ gật gù.', options: ['Phim hay', 'Bẫy hiện tại áp đảo tương lai', 'Bạn khỏe', 'Do bận'], correctIndex: 1, explanation: 'Vui bây giờ, khổ kệ tôi mai.' },
      { id: 'q37_3', type: 'scenario', scenario: 'Tại sao người ta hay quẹt thẻ tín dụng bừa bãi?', options: ['Giàu', 'Sướng lúc mua, nỗi đau trả tiền bị đẩy lùi xa', 'Tiện lợi', 'May mắn'], correctIndex: 1, explanation: 'Hành động và hậu quả bị tách rời về thời gian.' },
      { id: 'q37_4', type: 'scenario', scenario: 'Bạn hứa “Mai sẽ tập gym” nhưng mai đến bạn lại bảo “Mai nữa”.', options: ['Bạn lười', 'Mâu thuẫn giá trị giữa hiện tại và tương lai', 'Máy tập hỏng', 'Do mưa'], correctIndex: 1, explanation: 'Tương lai là một con người khác, không phải tôi bây giờ.' },
      { id: 'q37_5', type: 'scenario', scenario: 'Cách để trị bệnh trì hoãn là?', options: ['Tự mắng mình', 'Chia nhỏ phần thưởng và trả ngay lập tức', 'Ngủ nhiều hơn', 'May mắn'], correctIndex: 1, explanation: 'Dụ dỗ con thú “Hiện tại” trong bạn.' },
      { id: 'q37_6', type: 'scenario', scenario: 'Tại sao đồ ăn nhanh (junk food) lại khó cưỡng?', options: ['Ngon', 'Thỏa mãn tức thì cơn đói và ham muốn vị giác', 'Rẻ', 'May mắn'], correctIndex: 1, explanation: 'Phần thưởng hóa học ngay lập tức.' },
      { id: 'q37_7', type: 'scenario', scenario: 'Hậu quả của việc luôn chọn “Ngay bây giờ” là gì?', options: ['Hạnh phúc', 'Nghèo khó và sức khỏe kém về lâu dài', 'Thông minh', 'May mắn'], correctIndex: 1, explanation: 'Sự kiên nhẫn định nghĩa thành công.' },
      { id: 'q37_8', type: 'scenario', scenario: 'Thám tử từ chối lời hối lộ 1 tỷ hôm nay để giữ danh dự cả đời.', options: ['Anh hùng', 'Khả năng trì hoãn sự thỏa mãn siêu hạng', 'Hâm', 'May mắn'], correctIndex: 1, explanation: 'Chỉ thám tử thực thụ mới thấy giá trị của tương lai.' }
    ]
  },
  {
    id: 'q38',
    title: 'Bẫy số trung bình – Gambler’s fallacy',
    regionId: 'r5',
    requiredLevel: 38,
    xpReward: 520,
    gemReward: 9,
    questions: [
      { id: 'q38_1', type: 'scenario', scenario: 'Tung đồng xu 10 lần ra mặt ngửa, bạn thề lần 11 sẽ ra sấp.', options: ['Bạn giỏi tính', 'Gambler’s fallacy', 'Lẽ thường', 'Do đồng xu'], correctIndex: 1, explanation: 'Mỗi lần tung là hoàn toàn độc lập, não đừng tự vẽ.' },
      { id: 'q38_2', type: 'scenario', scenario: 'Con đầu là trai, con hai là trai, bạn tin con ba “chắc chắn” là gái.', options: ['Cầu được ước thấy', 'Bẫy xác suất cân bằng ảo', 'Duyên số', 'Hợp lý'], correctIndex: 1, explanation: 'Tự nhiên không có bộ nhớ để “bù đắp” cho bạn.' },
      { id: 'q38_3', type: 'scenario', scenario: 'Tại sao các sòng bài hay hiện bảng lịch sử các ván trước?', options: ['Cho khách xem', 'Để dụ khách dính bẫy gambler’s fallacy', 'Minh bạch', 'May mắn'], correctIndex: 1, explanation: 'Lừa não bộ tìm quy luật trong sự ngẫu nhiên.' },
      { id: 'q38_4', type: 'scenario', scenario: 'Bạn thi thử được 10, thi thật được 8, bạn bảo “do xui”.', options: ['Xui thật', 'Regression to the mean', 'Học tài thi phận', 'Do đề'], correctIndex: 1, explanation: 'Phong độ cực cao thường không kéo dài lâu.' },
      { id: 'q38_5', type: 'scenario', scenario: 'Mắng nhân viên khi họ làm tệ làm họ làm tốt hơn (thực tế là do họ tự hồi quy).', options: ['Bạn uy quyền', 'Lầm tưởng về tác dụng của sự trừng phạt', 'Họ sợ', 'May mắn'], correctIndex: 1, explanation: 'Lần sau họ tốt hơn đơn giản vì lần trước đã quá tệ.' },
      { id: 'q38_6', type: 'scenario', scenario: 'Khen nhân viên làm họ làm dở đi vào lần sau.', options: ['Khen làm họ kiêu', 'Regression to the mean', 'Họ lười', 'May mắn'], correctIndex: 1, explanation: 'Năng lực đột biến luôn có xu hướng quay về mức cũ.' },
      { id: 'q38_7', type: 'scenario', scenario: 'Làm thế nào để thám tử không bị số liệu lừa?', options: ['Tin trực giác', 'Hiểu về xác suất và sự ngẫu nhiên', 'Hỏi chuyên gia', 'May mắn'], correctIndex: 1, explanation: 'Quy luật số lớn không áp dụng cho số nhỏ.' },
      { id: 'q38_8', type: 'scenario', scenario: 'Thám tử bước vào vụ án mạng xảy ra liên tiếp 3 ngày.', options: ['Chắc chắn hnay có tiếp', 'Cảnh giác với sự trùng hợp ngẫu nhiên', 'Bắt hung thủ', 'May mắn'], correctIndex: 1, explanation: 'Quy luật chỉ xuất hiện khi có bằng chứng, không phải sự đoán mò.' }
    ]
  },
  {
    id: 'q39',
    title: 'Ảo giác kiểm soát – Illusion of control',
    regionId: 'r5',
    requiredLevel: 39,
    xpReward: 300,
    gemReward: 10,
    questions: [
      { id: 'q39_1', type: 'scenario', scenario: 'Bạn nhấn nút đi bộ ở ngã tư liên tục và tin nó sẽ làm đèn xanh nhanh hơn (dù nút đó hỏng).', options: ['Bạn nhiệt tình', 'Illusion of control', 'Nút đó xịn', 'Do may'], correctIndex: 1, explanation: 'Hành động tạo cảm giác ta đang làm chủ tình hình.' },
      { id: 'q39_2', type: 'scenario', scenario: 'Tự tay chọn số Vietlott và thấy tự tin thắng hơn là máy chọn.', options: ['Bạn có thần hộ mệnh', 'Bẫy kiểm soát sự ngẫu nhiên', 'Số đẹp', 'Sự thật'], correctIndex: 1, explanation: 'Xác suất như nhau, nhưng cái tôi làm bạn thấy mình khác biệt.' },
      { id: 'q39_3', type: 'scenario', scenario: 'Tại sao các nút “Đóng cửa” trong thang máy thường không có tác dụng?', options: ['Lỗi kỹ thuật', 'Linh kiện thừa để an ủi hành khách', 'Hết tác dụng', 'May mắn'], correctIndex: 1, explanation: 'Placebo button cho tâm trí bớt sốt ruột.' },
      { id: 'q39_4', type: 'scenario', scenario: 'Cầu thủ mặc lại “chiếc tất may mắn” để đảm bảo chiến thắng.', options: ['Cẩn thận', 'Ảo giác kiểm soát vận may', 'Tất đẹp', 'Sự thật'], correctIndex: 1, explanation: 'Mối liên hệ nhân quả ảo.' },
      { id: 'q39_5', type: 'scenario', scenario: 'Tại sao sếp hay bắt sửa những chi tiết nhỏ vô nghĩa trong báo cáo?', options: ['Sếp kỹ tính', 'Để khẳng định quyền kiểm soát dự án', 'Sếp rảnh', 'Do bạn sai'], correctIndex: 1, explanation: 'Sửa để thấy mình đang “làm việc”.' },
      { id: 'q39_6', type: 'scenario', scenario: 'Bạn tin mình có thể dự báo thời tiết bằng cách… nhìn mây theo kiểu riêng.', options: ['Bạn là thiên tài', 'Biên kiến kiểm soát tự nhiên', 'Mây nói thật', 'May mắn'], correctIndex: 1, explanation: 'Gán quy luật cho sự hỗn loạn.' },
      { id: 'q39_7', type: 'scenario', scenario: 'Hậu quả của illusion of control trong kinh doanh?', options: ['Thành công rực rỡ', 'Chủ quan và bỏ qua các rủi ro khách quan', 'Vui vẻ', 'May mắn'], correctIndex: 1, explanation: 'Tự tin quá mức dẫn đến thảm họa.' },
      { id: 'q39_8', type: 'scenario', scenario: 'Thám tử lắc xúc xắc mạnh tay để mong ra số to.', options: ['Khỏe tay', 'Dính bẫy ảo giác kiểm soát vật lý', 'Do xúc xắc', 'May mắn'], correctIndex: 1, explanation: 'Lực tay không thay đổi được số phận của hạt nhựa.' }
    ]
  },
  {
    id: 'q40',
    title: 'Sàn đấu tử thần – Tổng kết vùng 5',
    regionId: 'r5',
    requiredLevel: 40,
    xpReward: 600,
    gemReward: 25,
    questions: [
      { id: 'q40_1', type: 'scenario', scenario: 'Phần thưởng cuối cùng của Sàn Đấu Ngáo Quyết Định là gì?', options: ['Tiền vàng', 'Sự tự do khỏi những lựa chọn ngu ngốc', 'Cup', 'Được khen'], correctIndex: 1, explanation: 'Lý trí là tự do.' },
      { id: 'q40_2', type: 'scenario', scenario: 'Kẻ chiến thắng ở vùng này cần điều gì nhất?', options: ['Tiền', 'Tư duy “Số 0”: Luôn bắt đầu từ con số 0 để đánh giá', 'Máu lạnh', 'Sự may mắn'], correctIndex: 1, explanation: 'Quên quá khứ để nhìn vào sự thực.' },
      { id: 'q40_3', type: 'scenario', scenario: 'Bạn bước ra khỏi sàn đấu và thấy mình… vẫn nghèo.', options: ['Đúng thế', 'Giàu kiến thức là bước đầu của giàu tiền bạc', 'Game lừa', 'Ảo giác'], correctIndex: 1, explanation: 'Kiến thức cần thời gian để đơm hoa.' },
      { id: 'q40_4', type: 'scenario', scenario: 'Vũ khí bí mật của thám tử để không bao giờ “Ngáo”?', options: ['Súng', 'Luôn dùng bộ não hệ thống 2 để phân tích', 'Kính lúp', 'Tiền'], correctIndex: 1, explanation: 'Chậm lại để đúng hơn.' },
      { id: 'q40_5', type: 'scenario', scenario: 'Tại sao vùng này lại có tên là “Sàn Đấu”?', options: ['Cho oai', 'Vì bạn phải đấu tranh với chính bản năng của mình', 'Có quái vật', 'Gợi cảm hứng'], correctIndex: 1, explanation: 'Kẻ thù lớn nhất là bản thân.' },
      { id: 'q40_6', type: 'scenario', scenario: 'Chúc mừng bạn đã hoàn thành 40 kỳ án!', options: ['Cảm ơn', 'Quyết tâm mở khóa vùng cuối cùng', 'Nghỉ thôi', 'Mệt quá'], correctIndex: 1, explanation: 'Đỉnh cao vẫy gọi.' },
      { id: 'q40_7', type: 'scenario', scenario: 'Bạn cảm thấy mình thông minh lên 200%.', options: ['Đúng thế', 'Cẩn thận với Dunning–Kruger (vùng 1)', 'Ảo giác', 'May mắn'], correctIndex: 1, explanation: 'Vừa học xong là lúc dễ ảo tưởng nhất.' },
      { id: 'q40_8', type: 'scenario', scenario: 'Thám tử bước vào thang máy đi lên tầng cao nhất.', options: ['Đóng cửa', 'Sẵn sàng cho Tháp Thao Túng', 'Đi xuống', 'May mắn'], correctIndex: 1, explanation: 'Chặng đường cuối cùng bắt đầu.' }
    ]
  },

  // ===================== VÙNG 6: THÁP "THAO TÚNG" =====================
  {
    id: 'q41',
    title: 'Vì sắp hết nên quý – Scarcity effect',
    regionId: 'r6',
    requiredLevel: 41,
    xpReward: 550,
    gemReward: 4,
    questions: [
      { id: 'q41_1', type: 'scenario', scenario: 'Sàn TMĐT báo “Chỉ còn 1 sản phẩm cuối cùng”, bạn cuống cuồng đặt hàng.', options: ['Bạn cần đồ đó', 'Scarcity effect', 'Sự thật', 'Do may'], correctIndex: 1, explanation: 'Thứ gì khó có được thường được định giá cao hơn.' },
      { id: 'q41_2', type: 'scenario', scenario: 'Vé xem ca nhạc “Sold out” sau 1 phút, bạn sẵn sàng mua lại với giá gấp 5.', options: ['Bạn là fan cuồng', 'Bẫy giá trị từ sự khan hiếm', 'Bạn giàu', 'Do vé xịn'], correctIndex: 1, explanation: 'Sợ mất cơ hội (FOMO) kích hoạt sự chịu chi.' },
      { id: 'q41_3', type: 'scenario', scenario: 'Tại sao các hãng xe hay ra bản “Limited edition”?', options: ['Để tri ân khách', 'Kích hoạt tâm lý sở hữu đồ hiếm', 'Hết linh kiện', 'Trend'], correctIndex: 1, explanation: 'Sự duy nhất tạo ra đẳng cấp ảo.' },
      { id: 'q41_4', type: 'scenario', scenario: 'Bạn thấy một cô gái bình thường nhưng vì có 10 anh theo đuổi nên bạn thấy cô ấy cực hot.', options: ['Cô ấy xinh thật', 'Scarcity trong tình cảm', 'Bạn hâm', 'Do duyên'], correctIndex: 1, explanation: 'Cạnh tranh làm tăng giá trị đối tượng.' },
      { id: 'q41_5', type: 'scenario', scenario: 'Làm thế nào để trị bẫy khan hiếm?', options: ['Vay tiền mua luôn', 'Hỏi: Nếu món này có đầy đường, mình có mua nó không?', 'Nhắm mắt lại', 'May mắn'], correctIndex: 1, explanation: 'Tách rời giá trị sử dụng khỏi giá trị tâm lý.' },
      { id: 'q41_6', type: 'scenario', scenario: 'Tại sao thông báo “Chỉ dành cho hội viên” lại thu hút bạn?', options: ['Vì bạn là hội viên', 'Tâm lý đặc quyền từ sự loại trừ', 'Tiết kiệm', 'May mắn'], correctIndex: 1, explanation: 'Cảm giác mình thuộc số ít may mắn.' },
      { id: 'q41_7', type: 'scenario', scenario: 'Khan hiếm giả tạo là gì?', options: ['Hết hàng thật', 'Cố tình găm hàng hoặc đặt giới hạn thời gian ảo', 'Lừa đảo', 'May mắn'], correctIndex: 1, explanation: 'Vũ khí bán hàng kinh điển.' },
      { id: 'q41_8', type: 'scenario', scenario: 'Thám tử bước vào căn phòng chỉ có một manh mối duy nhất.', options: ['Cẩn thận', 'Cảnh giác với sự phóng đại giá trị của manh mối đó', 'Mừng quá', 'May mắn'], correctIndex: 1, explanation: 'Đừng để sự “duy nhất” làm mờ đi sự “đúng đắn”.' }
    ]
  },
  {
    id: 'q42',
    title: 'Ăn miếng trả miếng – Reciprocity',
    regionId: 'r6',
    requiredLevel: 42,
    xpReward: 560,
    gemReward: 5,
    questions: [
      { id: 'q42_1', type: 'scenario', scenario: 'Được mời ly cafe 20k, bạn thấy áy náy và sau đó mời lại bữa trưa 200k.', options: ['Bạn hào phóng', 'Reciprocity', 'Bạn giàu', 'Do cafe ngon'], correctIndex: 1, explanation: 'Nỗi khổ tâm khi mang nợ làm ta trả giá đắt hơn.' },
      { id: 'q42_2', type: 'scenario', scenario: 'Shop tặng bạn thỏi son nhỏ giá 0đ, bạn thấy ngại nên mua thêm bộ mỹ phẩm 2 triệu.', options: ['Mỹ phẩm xịn', 'Bẫy nợ nần tình cảm', 'Bạn dễ tính', 'May mắn'], correctIndex: 1, explanation: 'Quà tặng miễn phí không bao giờ là miễn phí.' },
      { id: 'q42_3', type: 'scenario', scenario: 'Tại sao các siêu thị hay có quầy “Ăn thử miễn phí”?', options: ['Cho khách no', 'Kích hoạt sự đáp trả bằng cách mua hàng', 'Hết hạn sử dụng', 'Trend'], correctIndex: 1, explanation: 'Đã nhận đồ của người ta thì khó bước đi tay không.' },
      { id: 'q42_4', type: 'scenario', scenario: 'Bạn giúp đồng nghiệp một việc nhỏ, tuần sau bạn nhờ họ làm hộ cả dự án.', options: ['Bạn khôn', 'Mở rộng quy luật đáp trả', 'Họ hiền', 'May mắn'], correctIndex: 1, explanation: 'Một hạt mầm giúp đỡ gieo xuống, một cái cây nợ nần mọc lên.' },
      { id: 'q42_5', type: 'scenario', scenario: 'Cách thoát khỏi bẫy đền ơn?', options: ['Không nhận gì cả', 'Phân biệt rõ: Quà là quà, giao dịch là giao dịch', 'Nhận rồi chạy', 'May mắn'], correctIndex: 1, explanation: 'Đừng để lòng biết ơn bị lợi dụng thành công cụ bán hàng.' },
      { id: 'q42_6', type: 'scenario', scenario: 'Trong ngoại giao, “nhượng bộ” cũng là một dạng quà tặng.', options: ['Sai', 'Đúng (Nhượng bộ để người kia phải nhượng bộ lại)', 'Tùy người', 'Hợp lý'], correctIndex: 1, explanation: 'Lùi một bước để tiến hai bước.' },
      { id: 'q42_7', type: 'scenario', scenario: 'Tại sao ta lại dễ dàng giúp đỡ người mình không thích nếu họ từng giúp mình?', options: ['Lòng tốt', 'Áp lực tuân thủ quy luật xã hội mạnh hơn cảm xúc cá nhân', 'Duyên nợ', 'Hợp lý'], correctIndex: 1, explanation: 'Quy luật đáp trả là bản năng sinh tồn của loài người.' },
      { id: 'q42_8', type: 'scenario', scenario: 'Thám tử được nghi phạm mời một bữa ăn thịnh soạn.', options: ['Ăn luôn', 'Từ chối để giữ sự khách quan tuyệt đối', 'Gói mang về', 'May mắn'], correctIndex: 1, explanation: 'Nợ tình cảm là nợ khó trả nhất của thám tử.' }
    ]
  },
  {
    id: 'q43',
    title: 'Vâng lời tuyệt đối – Authority bias',
    regionId: 'r6',
    requiredLevel: 43,
    xpReward: 580,
    gemReward: 6,
    questions: [
      { id: 'q43_1', type: 'scenario', scenario: 'Một người mặc áo blouse trắng bảo bạn “Uống nước muối đi cho khỏe”, và bạn uống thật.', options: ['Nước muối tốt', 'Authority bias', 'Bạn khát', 'Sự thật'], correctIndex: 1, explanation: 'Ta có xu hướng vâng lời các biểu tượng quyền lực vô điều kiện.' },
      { id: 'q43_2', type: 'scenario', scenario: 'Trong thí nghiệm Milgram, 65% người sẵn sàng nhấn nút điện giật chết người khác chỉ vì “Giám đốc bảo hãy làm đi”.', options: ['Họ ác', 'Sức mạnh thao túng của uy quyền', 'Họ điên', 'May mắn'], correctIndex: 1, explanation: 'Khi có lệnh, trách nhiệm cá nhân biến mất.' },
      { id: 'q43_3', type: 'scenario', scenario: 'Tại sao các quảng cáo hay mời người nổi tiếng hoặc chuyên gia?', options: ['Họ đẹp', 'Mượn uy quyền để bảo chứng cho sản phẩm', 'Hết tiền mời người thường', 'Trend'], correctIndex: 1, explanation: 'Sự nổi tiếng đánh lừa lý trí về chất lượng.' },
      { id: 'q43_4', type: 'scenario', scenario: 'Bạn tin lời sếp 100% dù sếp đang nói về một lĩnh vực sếp không biết gì.', options: ['Sếp giỏi toàn diện', 'Hào quang uy quyền lan tỏa', 'Sợ sếp', 'Do sếp giàu'], correctIndex: 1, explanation: 'Vị trí xã hội không đảm bảo kiến thức chuyên môn.' },
      { id: 'q43_5', type: 'scenario', scenario: 'Cách để thấu thị bẫy uy quyền?', options: ['Cãi vợi sếp', 'Hỏi: Người này có thực sự là chuyên gia trong lĩnh vực này không?', 'Im lặng', 'May mắn'], correctIndex: 1, explanation: 'Kiểm chứng bằng cấp và chuyên môn thực tế.' },
      { id: 'q43_6', type: 'scenario', scenario: 'Biểu tượng của uy quyền thường thấy là?', options: ['Quân phục, bằng cấp, sự sang trọng', 'Lòng tốt', 'Nụ cười', 'Sự im lặng'], correctIndex: 0, explanation: 'Những thứ đập vào mắt làm ta e sợ.' },
      { id: 'q43_7', type: 'scenario', scenario: 'Tại sao thám tử lại hay ghét “Cấp trên dốt nát”?', options: ['Do họ dốt thật', 'Vì lệnh sai của họ có thể phá nát vụ án do bẫy uy quyền', 'Ghen tỵ', 'May mắn'], correctIndex: 1, explanation: 'Lệnh sai từ trên cao là thảm họa.' },
      { id: 'q43_8', type: 'scenario', scenario: 'Thám tử đối mặt với một chính trị gia quyền lực đang ngăn cản điều tra.', options: ['Rút lui', 'Giữ vững sự thật khách quan bất chấp quân hàm', 'Sợ hãi', 'May mắn'], correctIndex: 1, explanation: 'Sự thật không phục tùng bất cứ ai.' }
    ]
  },
  {
    id: 'q44',
    title: 'Luật phải giống nhau – Commitment & consistency',
    regionId: 'r6',
    requiredLevel: 44,
    xpReward: 600,
    gemReward: 7,
    questions: [
      { id: 'q44_1', type: 'scenario', scenario: 'Bạn trót hứa sẽ đến dự tiệc dù đang sốt 39 độ, và bạn vẫn cố lết đi vì “lẽ nào lại thất hứa”.', options: ['Bạn nhiệt tình', 'Commitment and consistency', 'Bạn khỏe', 'Do sợ bị mắng'], correctIndex: 1, explanation: 'Não bộ muốn hành động khớp với lời nói trong quá khứ.' },
      { id: 'q44_2', type: 'scenario', scenario: 'Khách hàng đồng ý mua xe giá 500 triệu, sau khi sếp bảo “hết khuyến mãi, giá 520”, khách vẫn mua.', options: ['Khách giàu', 'Bẫy low–ball (cam kết đã dính nòng)', 'Xe đẹp', 'May mắn'], correctIndex: 1, explanation: 'Một khi đã nói “Mua”, con người khó rút lời dù điều kiện tệ đi.' },
      { id: 'q44_3', type: 'scenario', scenario: 'Tại sao các app hay bắt bạn “Bắt đầu bài học” bằng 1 câu hỏi dễ ợt?', options: ['Để bạn làm được', 'Để tạo cam kết nhỏ, khiến bạn làm tiếp bài khó', 'Lười viết', 'Trend'], correctIndex: 1, explanation: 'Mồi nhử nhất quán.' },
      { id: 'q44_4', type: 'scenario', scenario: 'Bạn thề sẽ giảm cân và thông báo lên Facebook để lấy động lực.', options: ['Sống ảo', 'Tận dụng áp lực nhất quán công khai', 'Bạn quyết tâm', 'May mắn'], correctIndex: 1, explanation: 'Thế giới nhìn vào nên bạn không dám lùi bước.' },
      { id: 'q44_5', type: 'scenario', scenario: 'Hậu quả của sự nhất quán mù quáng là gì?', options: ['Uy tín', 'Bám lấy sai lầm chỉ vì không dám nhận mình sai', 'Hạnh phúc', 'May mắn'], correctIndex: 1, explanation: 'Sự nhất quán là cái hầm trú ẩn của những kẻ lười tư duy.' },
      { id: 'q44_6', type: 'scenario', scenario: 'Cách thám tử bẻ gãy sự nhất quán của nghi phạm?', options: ['Đánh đập', 'Chỉ ra sự mâu thuẫn giữa lời khai trước và lời khai sau', 'Im lặng', 'May mắn'], correctIndex: 1, explanation: 'Sự thật luôn nhất quán, lời nói dối thì không.' },
      { id: 'q44_7', type: 'scenario', scenario: 'Tại sao người ta hay trung thành với một đảng phái dù đảng đó làm sai?', options: ['Yêu nước', 'Áp lực nhất quán với bản sắc đã chọn', 'Họ đúng', 'May mắn'], correctIndex: 1, explanation: 'Thay đổi lý tưởng là một cú tát vào quá khứ của chính mình.' },
      { id: 'q44_8', type: 'scenario', scenario: 'Thám tử tự nhủ “Mình đã thề sẽ tìm ra hung thủ”.', options: ['Gánh nặng', 'Động lực từ cam kết đạo đức', 'Sáo rỗng', 'May mắn'], correctIndex: 1, explanation: 'Nhất quán với lẽ phải là sức mạnh của thám tử.' }
    ]
  },
  {
    id: 'q45',
    title: 'Đẹp thì có quyền – Liking principle',
    regionId: 'r6',
    requiredLevel: 45,
    xpReward: 620,
    gemReward: 8,
    questions: [
      { id: 'q45_1', type: 'scenario', scenario: 'Bạn đồng ý làm hộ bài cho cô bạn xinh nhất lớp dù bạn đang bận ngập đầu.', options: ['Bạn tốt', 'Liking principle', 'Dại gái', 'Hợp lý'], correctIndex: 1, explanation: 'Ta dễ dàng nói “Có” với người ta yêu quý hoặc thấy hấp dẫn.' },
      { id: 'q45_2', type: 'scenario', scenario: 'Người bán hàng khen bạn “Anh có gu thời trang thật tinh tế”, và bạn mua luôn cái áo xấu.', options: ['Áo đẹp thật', 'Bẫy nịnh hót tạo thiện cảm', 'Bạn giàu', 'May mắn'], correctIndex: 1, explanation: 'Lời khen là thuốc mê cho ví tiền.' },
      { id: 'q45_3', type: 'scenario', scenario: 'Tại sao các ứng viên hay cố tìm “điểm chung” với nhà tuyển dụng?', options: ['Để xem có hợp không', 'Tạo thiện cảm từ sự tương đồng', 'Tình cờ', 'Hợp lý'], correctIndex: 1, explanation: 'Ta thích những người giống mình.' },
      { id: 'q45_4', type: 'scenario', scenario: 'Bạn thề là mình mua máy giặt vì tính năng, thực ra là vì anh bán hàng… quá nhiệt tình.', options: ['Sự thật', 'Thiện cảm lấn át tính năng', 'Máy tốt thật', 'Do mạng'], correctIndex: 1, explanation: 'Con người mua người bán trước khi mua món hàng.' },
      { id: 'q45_5', type: 'scenario', scenario: 'Chiến thuật “Good cop, bad cop” tận dụng nguyên tắc nào?', options: ['Sợ hãi', 'Thiện cảm với người “tốt” so với người “ác”', 'Hợp đồng', 'May mắn'], correctIndex: 1, explanation: 'Kẻ ác làm cho người “ít ác” trông như thiên thần.' },
      { id: 'q45_6', type: 'scenario', scenario: 'Làm sao để tỉnh táo trước sự thiện cảm?', options: ['Ghét tất cả mọi người', 'Tách biệt cảm xúc với người bán ra khỏi giá trị món hàng', 'Nhắm mắt', 'May mắn'], correctIndex: 1, explanation: 'Hỏi: Nếu thay người bán bằng một robot, mình có mua không?' },
      { id: 'q45_7', type: 'scenario', scenario: 'Sức mạnh của lời khen thành thật?', options: ['Giao tiếp tốt', 'Xây dựng mối quan hệ dựa trên thiện cảm bền vững', 'Sáo rỗng', 'Hợp lý'], correctIndex: 1, explanation: 'Thiện cảm là dầu bôi trơn xã hội.' },
      { id: 'q45_8', type: 'scenario', scenario: 'Thám tử bước vào phòng thẩm vấn và mời nghi phạm một ly trà đá.', options: ['Lòng tốt', 'Xây dựng thiện cảm để khai thác tin tức (rapport)', 'Khát nước', 'May mắn'], correctIndex: 1, explanation: 'Sự tử tế là chìa khóa mở miệng tội phạm.' }
    ]
  },
  {
    id: 'q46',
    title: 'Bẫy chân gỗ – Social proof',
    regionId: 'r6',
    requiredLevel: 46,
    xpReward: 640,
    gemReward: 9,
    questions: [
      { id: 'q46_1', type: 'scenario', scenario: 'Thấy 5 người đứng xem trò ảo thuật đường phố và thề nó thật, bạn cũng vào đặt cược.', options: ['Trò hay', 'Bẫy chân gỗ (social proof trong lừa đảo)', 'Bạn giàu', 'May mắn'], correctIndex: 1, explanation: 'Đám đông quanh bạn có thể là đồng bọn của hung thủ.' },
      { id: 'q46_2', type: 'scenario', scenario: 'Tại sao các shop hay tự tạo “Review ảo” 5 sao?', options: ['Sản phẩm tốt thật', 'Xây dựng bằng chứng xã hội giả tạo', 'Họ rảnh', 'May mắn'], correctIndex: 1, explanation: 'Ta tin vào đánh giá của “người dùng khác”.' },
      { id: 'q46_3', type: 'scenario', scenario: 'Bạn thấy mọi người chạy toán loạn ra khỏi tòa nhà, bạn cũng chạy theo mà không hỏi tại sao.', options: ['Bạn nhanh chân', 'Bằng chứng xã hội trong tình huống khẩn cấp', 'Bạn sợ', 'Trend'], correctIndex: 1, explanation: 'Hành động của người khác là chỉ dẫn sinh tồn nhanh nhất.' },
      { id: 'q46_4', type: 'scenario', scenario: 'Hiệu ứng người đứng xem (vùng 3) là một dạng tiêu cực của social proof. Đúng hay sai?', options: ['Sai', 'Đúng (nhìn mọi người im lặng nên mình cũng im lặng)', 'Tùy người', 'Hợp lý'], correctIndex: 1, explanation: 'Sự thờ ơ cũng là một hành vi bị bắt chước.' },
      { id: 'q46_5', type: 'scenario', scenario: 'Làm thế nào để thám tử nhận ra “Chân gỗ”?', options: ['Hỏi chứng minh thư', 'Quan sát sự tương tác quá mức nhịp nhàng của đám đông', 'Bắt hết', 'May mắn'], correctIndex: 1, explanation: 'Sự nhiệt tình thái quá thường là kịch bản.' },
      { id: 'q46_6', type: 'scenario', scenario: 'Tại sao ta hay mua những cuốn sách gắn mác “Best seller”?', options: ['Sách hay', 'Bẫy số đông (Ai cũng đọc thì mình phải đọc)', 'Rẻ', 'May mắn'], correctIndex: 1, explanation: 'Sự phổ biến là bằng chứng của giá trị (đôi khi giả).' },
      { id: 'q46_7', type: 'scenario', scenario: 'Sức mạnh của người đi tiên phong?', options: ['Làm gương', 'Phá vỡ vòng lặp social proof tiêu cực', 'Dũng cảm', 'May mắn'], correctIndex: 1, explanation: 'Một người đứng dậy, cả đám đông sẽ đứng dậy.' },
      { id: 'q46_8', type: 'scenario', scenario: 'Thám tử bước vào hiện trường nơi ai cũng thề là “Chưa thấy gì”.', options: ['Đi về', 'Cảnh giác với sự im lặng có hệ thống của nhóm (Omerta)', 'Bắt một người', 'May mắn'], correctIndex: 1, explanation: 'Social proof cũng có thể dùng để che giấu tội ác.' }
    ]
  },
  {
    id: 'q47',
    title: 'Tương phản cực đại – Contrast principle',
    regionId: 'r6',
    requiredLevel: 47,
    xpReward: 660,
    gemReward: 10,
    questions: [
      { id: 'q47_1', type: 'scenario', scenario: 'Vừa mua cái đồng hồ 20 triệu, bạn thấy cái dây đeo 1 triệu “rẻ quá” và mua luôn.', options: ['Bạn giàu', 'Contrast principle', 'Dây đeo xịn', 'May mắn'], correctIndex: 1, explanation: 'Số tiền nhỏ trông chẳng là gì cạnh số tiền lớn.' },
      { id: 'q47_2', type: 'scenario', scenario: 'Xách túi đồ 10kg, sau đó cầm quả cam thấy nó “nhẹ như lông hồng”.', options: ['Bạn khỏe', 'Ảo giác trọng lượng từ sự tương phản', 'Cam nhẹ thật', 'Sự thật'], correctIndex: 1, explanation: 'Cảm giác bị đánh lừa bởi thứ vừa trải qua.' },
      { id: 'q47_3', type: 'scenario', scenario: 'Tại sao môi giới hay dẫn bạn xem 2-3 căn nhà nát trước khi xem căn “ổn”?', options: ['Họ rảnh', 'Làm căn sau trông như thiên đường so với căn trước', 'Nhà nát đẹp', 'May mắn'], correctIndex: 1, explanation: 'Sự xấu xí làm nền cho sự bình thường trở nên tuyệt vời.' },
      { id: 'q47_4', type: 'scenario', scenario: 'Sếp mắng bạn tơi tả, sau đó khen một câu nhỏ làm bạn cảm động phát khóc.', options: ['Sếp tâm lý', 'Bẫy tương phản cảm xúc', 'Bạn yếu lòng', 'Sự thật'], correctIndex: 1, explanation: 'Nỗi đau làm tăng giá trị vị ngọt.' },
      { id: 'q47_5', type: 'scenario', scenario: 'Trong bán hàng, nên giới thiệu món đắt nhất hay rẻ nhất trước?', options: ['Rẻ nhất', 'Đắt nhất (để các món sau trông có vẻ hợp lý)', 'Trung bình', 'Ngẫu nhiên'], correctIndex: 1, explanation: 'Chiến thuật dắt mũi ví tiền.' },
      { id: 'q47_6', type: 'scenario', scenario: 'Cách thám tử dùng tương phản để lấy lời khai?', options: ['Đánh đập', 'Dùng sự tử tế đột ngột sau một đòn thẩm vấn gay gắt', 'Im lặng', 'May mắn'], correctIndex: 1, explanation: 'Phá vỡ phòng thủ bằng sự bất ngờ cảm xúc.' },
      { id: 'q47_7', type: 'scenario', scenario: 'Tương phản có thể làm mờ đi sự thật đúng hay sai?', options: ['Sai', 'Đúng (làm ta hài lòng với thứ trung bình)', 'Tùy người', 'Hợp lý'], correctIndex: 1, explanation: 'So sánh là kẻ trộm của hạnh phúc và sự công bằng.' },
      { id: 'q47_8', type: 'scenario', scenario: 'Thám tử đứng trước hai xác chết, một già một trẻ.', options: ['Buồn quá', 'Cảnh giác với sự thiên vị cảm xúc cho cái chết trẻ hơn', 'Khám tử thi', 'May mắn'], correctIndex: 1, explanation: 'Mọi mạng sống đều xứng đáng được tìm ra công lý.' }
    ]
  },
  {
    id: 'q48',
    title: 'Đỉnh tháp trí tuệ – Tổng kết',
    regionId: 'r6',
    requiredLevel: 48,
    xpReward: 1000,
    gemReward: 50,
    questions: [
      { id: 'q48_1', type: 'scenario', scenario: 'Bạn đã hoàn thành 48 kỳ án, cảm giác của bạn lúc này?', options: ['Mệt', 'Thông thái và sẵn sàng nhìn thấu mọi bẫy tâm lý', 'Bình thường', 'Game dễ'], correctIndex: 1, explanation: 'Kiến thức là vũ khí, trải nghiệm là bài học.' },
      { id: 'q48_2', type: 'scenario', scenario: 'Bài học quan trọng nhất xuyên suốt 6 vùng đất là gì?', options: ['Tiền là nhất', 'Đừng tin vào những gì não bộ tự diễn giải mà hãy kiểm chứng', 'Thám tử rất ngầu', 'Nghỉ thôi'], correctIndex: 1, explanation: 'Tư duy phản biện là gốc rễ của trí tuệ.' },
      { id: 'q48_3', type: 'scenario', scenario: 'Nếu gặp một bẫy tâm lý mới chưa học, thám tử sẽ làm gì?', options: ['Bỏ chạy', 'Dùng logic và sự quan sát khách quan để bóc tách', 'Cầu may', 'Hỏi Google'], correctIndex: 1, explanation: 'Phương pháp luận quan trọng hơn kiến thức đóng khung.' },
      { id: 'q48_4', type: 'scenario', scenario: 'Bạn có định chia sẻ App Dr. Psy cho bạn bè không?', options: ['Không, sợ họ khôn hơn mình', 'Có, để cùng nhau thoát khỏi hội “ngáo ngơ”', 'Tùy sếp', 'May mắn'], correctIndex: 1, explanation: 'Lan tỏa kiến thức là cách bảo vệ xã hội.' },
      { id: 'q48_5', type: 'scenario', scenario: 'Bí mật của một thám tử đại tài là?', options: ['Kính lúp xịn', 'Khả năng thấu cảm và đọc vị tâm lý con người', 'Chạy nhanh', 'Bắn súng giỏi'], correctIndex: 1, explanation: 'Vụ án nào cũng bắt đầu từ tâm trí con người.' },
      { id: 'q48_6', type: 'scenario', scenario: 'Đối thủ lớn nhất của bạn sau khi kết thúc 48 kỳ án?', options: ['Tội phạm', 'Sự chủ quan và cái tôi của chính mình', 'Thám tử khác', 'Boss cuối'], correctIndex: 1, explanation: 'Học không bao giờ là đủ.' },
      { id: 'q48_7', type: 'scenario', scenario: 'Bạn đã sẵn sàng để trở thành Dr. Psy thực thụ chưa?', options: ['Chưa', 'Sẵn sàng 200%!', 'Hơi lo', 'Để mai tính'], correctIndex: 1, explanation: 'Sự tự tin dựa trên kiến thức thực thụ.' },
      { id: 'q48_8', type: 'scenario', scenario: 'Thám tử bước ra khỏi tháp, nhìn lên bầu trời bao la.', options: ['Nhắm mắt', 'Mỉm cười vì thấy thế giới đã rõ ràng hơn bao giờ hết', 'Quay lại', 'May mắn'], correctIndex: 1, explanation: 'Hành trình kết thúc, cuộc sống mới bắt đầu.' }
    ]
  }
];