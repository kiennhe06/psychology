// ─── Psychometric Tests ───────────────────────────────────────────────────────
// Trắc nghiệm tâm lý tự nhận thức. Không có đúng/sai.
// Mỗi lựa chọn sẽ tích lũy điểm cho các "Traits" khác nhau.

export interface TestOption {
  text: string;
  traitScores: Record<string, number>; // Ví dụ: { resilience: 5, empathy: 2 }
}

export interface TestQuestion {
  id: string;
  question: string;
  options: TestOption[];
}

export interface PsychometricTest {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  questions: TestQuestion[];
  results: {
    traitId: string;
    threshold: number;
    title: string;
    description: string;
  }[];
}

export const PSYCHOMETRIC_TESTS: PsychometricTest[] = [
  {
    id: 'test_attachment_style',
    title: 'Kiểu Gắn Bó Trong Mối Quan Hệ',
    subtitle: 'Bạn là ai khi yêu?',
    description: 'Tìm hiểu xem bạn thuộc nhóm An toàn, Lo âu hay Né tránh trong các mối quan hệ thân thiết thông qua các tình huống giả lập.',
    questions: [
      {
        id: 'q1',
        question: 'Khi đối phương giữ im lặng quá lâu và không trả lời tin nhắn, bạn thường nghĩ gì?',
        options: [
          { text: 'Chắc họ đang bận việc gì đó thôi, mình cứ làm việc của mình.', traitScores: { secure: 10 } },
          { text: 'Họ đang chán mình à? Mình có làm gì sai không?', traitScores: { anxious: 10 } },
          { text: 'Thật thoải mái, mình cũng cần không gian riêng không bị làm phiền.', traitScores: { avoidant: 10 } },
        ]
      },
      {
        id: 'q2',
        question: 'Bạn cảm thấy thế nào khi một người bạn mới quen bắt đầu quá dựa dẫm vào bạn?',
        options: [
          { text: 'Sẵn lòng giúp đỡ nhưng vẫn giữ ranh giới cá nhân rõ ràng.', traitScores: { secure: 10 } },
          { text: 'Cảm thấy ngột ngạt và muốn tìm cách rút lui ngay lập tức.', traitScores: { avoidant: 10 } },
          { text: 'Cảm thấy được cần đến và muốn họ dựa dẫm nhiều hơn nữa.', traitScores: { anxious: 10 } },
        ]
      },
      {
        id: 'q3',
        question: 'Trong một cuộc tranh cãi căng thẳng, phản ứng tự nhiên của bạn là gì?',
        options: [
          { text: 'Cố gắng bày tỏ quan điểm và lắng nghe để giải quyết mâu thuẫn.', traitScores: { secure: 10 } },
          { text: 'Dùng sự im lặng hoặc bỏ đi để tránh phải đối mặt với xung đột.', traitScores: { avoidant: 10 } },
          { text: 'Liên tục đặt câu hỏi và cần sự cam kết ngay lập tức từ đối phương.', traitScores: { anxious: 10 } },
        ]
      },
      {
        id: 'q4',
        question: 'Bạn đánh giá thế nào về việc chia sẻ những bí mật thầm kín nhất của mình cho người khác?',
        options: [
          { text: 'Mở lòng là cách để kết nối sâu sắc hơn với những người tin cậy.', traitScores: { secure: 10 } },
          { text: 'Không bao giờ, giữ bí mật là cách để bảo vệ bản thân không bị tổn thương.', traitScores: { avoidant: 10 } },
          { text: 'Rất muốn chia sẻ nhưng luôn lo sợ họ sẽ dùng nó để rời bỏ mình.', traitScores: { anxious: 10 } },
        ]
      },
      {
        id: 'q5',
        question: 'Khi người yêu muốn dành cả cuối tuần đi chơi riêng với bạn bè của họ, bạn thấy sao?',
        options: [
          { text: 'Hoàn toàn ủng hộ, mình cũng sẽ dành thời gian cho sở thích riêng.', traitScores: { secure: 10 } },
          { text: 'Thấy nhẹ nhõm vì không phải ở bên cạnh họ quá lâu.', traitScores: { avoidant: 10 } },
          { text: 'Cảm thấy bị bỏ rơi và lo lắng họ không còn yêu mình nữa.', traitScores: { anxious: 10 } },
        ]
      },
      {
        id: 'q6',
        question: 'Bạn tin tưởng vào sự chung thủy và ổn định trong tình yêu như thế nào?',
        options: [
          { text: 'Tin rằng sự cam kết và nỗ lực từ hai phía sẽ bền vững.', traitScores: { secure: 10 } },
          { text: 'Luôn nghi ngờ, vì con người thường thay đổi theo thời gian.', traitScores: { avoidant: 10 } },
          { text: 'Luôn lo sợ mọi thứ tốt đẹp sẽ sớm kết thúc.', traitScores: { anxious: 10 } },
        ]
      }
    ],
    results: [
      { 
        traitId: 'secure', threshold: 35, title: 'Thám Tử An Toàn', 
        description: 'Bạn sở hữu sự tự tin nội tại mạnh mẽ và khả năng xây dựng niềm tin bền vững. Bạn là điểm tựa vững chắc cho bất kỳ ai đồng hành.' 
      },
      { 
        traitId: 'anxious', threshold: 35, title: 'Thám Tử Lo Âu', 
        description: 'Tâm hồn bạn nhạy cảm và luôn khao khát sự kết nối. Hãy học cách yêu thương bản thân để không còn phụ thuộc vào phản ứng của người khác.' 
      },
      { 
        traitId: 'avoidant', threshold: 35, title: 'Thám Tử Né Tránh', 
        description: 'Bạn là chuyên gia về sự độc lập, nhưng rào chắn quá cao đang ngăn cản bạn chạm đến những cảm xúc chân thực nhất.' 
      }
    ]
  },
  {
    id: 'test_dark_triad_mini',
    title: 'Góc Khuất Tâm Hồn (Mini Dark Triad)',
    subtitle: 'Đo lường mức độ ảnh hưởng của bóng tối',
    description: 'Nghiên cứu về các khía cạnh Machiavellianism (thủ đoạn), Narcissism (ái kỷ) và Psychopathy (thiếu thấu cảm).',
    questions: [
      {
        id: 'q1',
        question: 'Bạn nghĩ gì về câu nói: "Mục đích sau cùng luôn biện minh cho mọi phương tiện"?',
        options: [
          { text: 'Hoàn toàn đồng ý, kẻ thắng cuộc luôn có lý.', traitScores: { dark: 10 } },
          { text: 'Chỉ đúng trong một số tình trạng sinh tồn bắt buộc.', traitScores: { neutral: 5, dark: 5 } },
          { text: 'Không đồng ý, đạo đức phải đi trước kết quả.', traitScores: { light: 10 } },
        ]
      },
      {
        id: 'q2',
        question: 'Việc thao túng người khác để đạt được điều mình muốn là một kỹ năng hay tội lỗi?',
        options: [
          { text: 'Đó là một kỹ năng sinh tồn cần phải có.', traitScores: { dark: 10 } },
          { text: 'Là một hành vi không đẹp nhưng đôi khi cần dùng.', traitScores: { neutral: 10 } },
          { text: 'Là một tội lỗi làm tổn thương các giá trị nhân văn.', traitScores: { light: 10 } },
        ]
      },
      {
        id: 'q3',
        question: 'Bạn có cảm thấy hối hận khi vô tình làm tổn thương cảm xúc của người khác để hoàn thành công việc?',
        options: [
          { text: 'Không, công việc là công việc, cảm xúc không có chỗ ở đây.', traitScores: { dark: 10 } },
          { text: 'Cảm thấy hơi cắn rứt nhưng sẽ sớm quên đi.', traitScores: { neutral: 10 } },
          { text: 'Rất hối hận và sẽ tìm cách xin lỗi họ.', traitScores: { light: 10 } },
        ]
      },
      {
        id: 'q4',
        question: 'Trong một tập thể, bạn muốn mình là người như thế nào?',
        options: [
          { text: 'Người quyền lực nhất, nắm quyền sinh sát trong tay.', traitScores: { dark: 10 } },
          { text: 'Người có năng lực và được mọi người công nhận.', traitScores: { light: 5, dark: 2 } },
          { text: 'Người mang lại giá trị và sự hài hòa cho cộng đồng.', traitScores: { light: 10 } },
        ]
      },
      {
        id: 'q5',
        question: 'Bạn nghĩ sao về những người dễ bị lừa dối?',
        options: [
          { text: 'Đó là do họ quá ngốc, họ xứng đáng bị như vậy.', traitScores: { dark: 10 } },
          { text: 'Thật đáng tiếc cho họ, thế giới này vốn khắc nghiệt.', traitScores: { neutral: 10 } },
          { text: 'Mọi người đều xứng đáng được bảo vệ khỏi sự dối trá.', traitScores: { light: 10 } },
        ]
      },
      {
        id: 'q6',
        question: 'Khi biết được bí mật của người khác, bạn sẽ dùng nó làm gì?',
        options: [
          { text: 'Dùng nó làm đòn bẩy khi cần thiết để kiểm soát họ.', traitScores: { dark: 10 } },
          { text: 'Cất giữ nó như một loại dữ liệu bình thường.', traitScores: { neutral: 10 } },
          { text: 'Hoàn toàn giữ kín để tôn trọng quyền riêng tư của họ.', traitScores: { light: 10 } },
        ]
      }
    ],
    results: [
      { traitId: 'dark', threshold: 40, title: 'Chúa Tể Bóng Tối', description: 'Bạn sở hữu bộ óc chiến thuật sắc lẹm và sự tàn nhẫn cần thiết để leo lên đỉnh cao. Hãy cẩn thận kẻo bị bóng tối nuốt chửng.' },
      { traitId: 'light', threshold: 40, title: 'Thám Tử Ánh Sáng', description: 'Lòng trắc ẩn và đạo đức là tấm khiên bảo vệ tâm hồn bạn khỏi những cám dỗ tăm tối nhất.' },
      { traitId: 'neutral', threshold: 30, title: 'Người Quan Sát Xám', description: 'Bạn giữ thế cân bằng giữa lợi ích cá nhân và đạo đức cộng đồng.' }
    ]
  },
  {
    id: 'test_mbti_mini',
    title: 'MBTI Mini: Định Hướng Thám Tử',
    subtitle: 'Khám phá 4 chiều hướng cốt lõi',
    description: 'Chỉ số MBTI phiên bản tập trung vào phong cách thu thập bằng chứng và xử lý thông tin thám tử.',
    questions: [
      {
        id: 'q1',
        question: 'Khi bắt đầu một cuộc điều tra mới, bạn thường chọn cách nào?',
        options: [
          { text: 'Lập kế hoạch chi tiết, liệt kê mọi khả năng có thể xảy ra.', traitScores: { judging: 10 } },
          { text: 'Cứ lao vào thực địa, tùy cơ ứng biến theo tình hình.', traitScores: { perceiving: 10 } },
        ]
      },
      {
        id: 'q2',
        question: 'Bạn tin vào điều gì hơn khi đánh giá một lời khai?',
        options: [
          { text: 'Những bằng chứng vật lý, dấu vân tay, vật chứng rành rành.', traitScores: { sensing: 10 } },
          { text: 'Trực giác và những điều mâu thuẫn trong ánh mắt kẻ tình nghi.', traitScores: { intuition: 10 } },
        ]
      },
      {
        id: 'q3',
        question: 'Sau một ngày dài phá án mệt mỏi, cách nghỉ ngơi của bạn là gì?',
        options: [
          { text: 'Tụ tập bạn bè, chia sẻ chiến công tại quán rượu náo nhiệt.', traitScores: { extravert: 10 } },
          { text: 'Tắm nước nóng và đọc một cuốn sách trong sự yên tĩnh.', traitScores: { introvert: 10 } },
        ]
      },
      {
        id: 'q4',
        question: 'Trong lúc làm việc nhóm, bạn quan tâm điều gì hơn?',
        options: [
          { text: 'Hiệu quả công việc và tiến độ hoàn thành đúng hạn.', traitScores: { thinking: 10 } },
          { text: 'Sự gắn kết và cảm xúc của các thành viên trong đội.', traitScores: { feeling: 10 } },
        ]
      },
      {
        id: 'q5',
        question: 'Khi gặp một vụ án cực kỳ phức tạp chưa từng có tiền lệ...',
        options: [
          { text: 'Tôi áp dụng các quy tắc và kinh nghiệm truyền thống.', traitScores: { sensing: 10 } },
          { text: 'Tôi thử những cách tiếp cận phi logic và giả thuyết điên rồ nhất.', traitScores: { intuition: 10 } },
        ]
      },
      {
        id: 'q6',
        question: 'Nếu phải đưa ra phán quyết cuối cùng cho một phạm nhân có hoàn cảnh đáng thương...',
        options: [
          { text: 'Luật là luật, sai phạm phải bị trừng phạt nghiêm khắc.', traitScores: { thinking: 10 } },
          { text: 'Cần xem xét đến lý do và hoàn cảnh để có cái nhìn bao dung hơn.', traitScores: { feeling: 10 } },
        ]
      }
    ],
    results: [
      { traitId: 'extravert', threshold: 15, title: 'Thám Tử Hướng Ngoại', description: 'Năng lượng của đám đông là nhiên liệu cho bộ não của bạn.' },
      { traitId: 'introvert', threshold: 15, title: 'Sát Thủ Thầm Lặng', description: 'Sự tĩnh lặng giúp bạn nhìn thấu những điều người khác bỏ qua.' },
      { traitId: 'sensing', threshold: 15, title: 'Kỹ Sư Hiện Trường', description: 'Bạn thực tế và chỉ tin vào những gì mắt thấy tai nghe.' },
      { traitId: 'intuition', threshold: 15, title: 'Nhà Ngoại Cảm Tâm Lý', description: 'Bạn nhìn ra những mối liên hệ ẩn giấu giữa các sự kiện rời rạc.' },
      { traitId: 'thinking', threshold: 15, title: 'Máy Tính Logic', description: 'Cảm xúc không bao giờ làm mờ được lý trí thép của bạn.' },
      { traitId: 'feeling', threshold: 15, title: 'Nhà Tâm Lý Nhân Văn', description: 'Bạn phá án bằng sự thấu hiểu nồng ấm của trái tim.' },
      { traitId: 'judging', threshold: 15, title: 'Chuyên Gia Lập Kế Hoạch', description: 'Mọi thứ trong đời bạn phải luôn nằm trong tầm kiểm soát.' },
      { traitId: 'perceiving', threshold: 15, title: 'Nghệ Sĩ Tự Do', description: 'Sự linh hoạt là sức mạnh giúp bạn thích nghi với mọi môi trường.' }
    ]
  },
  {
    id: 'test_big_five_mini',
    title: 'Big Five: 5 Trụ Cột Tâm Lý',
    subtitle: 'Phân tích nhân cách toàn diện',
    description: 'Đánh giá chi tiết 5 khía cạnh lớn nhất của tâm trí con người: Cởi mở, Tận tâm, Hướng ngoại, Dễ chịu và Nhạy cảm.',
    questions: [
      {
        id: 'q1',
        question: 'Bạn có thường xuyên tìm kiếm những trải nghiệm mạo hiểm và mới lạ không?',
        options: [
          { text: 'Luôn luôn, tôi ghét sự lặp lại đơn điệu.', traitScores: { openness: 10 } },
          { text: 'Thỉnh thoảng nếu thấy thực sự cần thiết.', traitScores: { openness: 5 } },
          { text: 'Không, tôi thích sự ổn định và an toàn.', traitScores: { openness: 0 } },
        ]
      },
      {
        id: 'q2',
        question: 'Mức độ tỉ mỉ của bạn trong việc quản lý tài chính cá nhân là bao nhiêu?',
        options: [
          { text: 'Ghi chép từng đồng, luôn có kế hoạch chi tiêu rõ ràng.', traitScores: { conscientiousness: 10 } },
          { text: 'Chỉ nhớ các khoản lớn, còn lại tùy hứng.', traitScores: { conscientiousness: 5 } },
          { text: 'Tôi không bao giờ biết tiền của mình đã đi đâu.', traitScores: { conscientiousness: 0 } },
        ]
      },
      {
        id: 'q3',
        question: 'Trong các cuộc thảo luận nhóm, bạn thường là...',
        options: [
          { text: 'Người dẫn dắt và nói nhiều nhất phòng.', traitScores: { extroversion: 10 } },
          { text: 'Người lắng nghe và chỉ phát biểu khi cần.', traitScores: { extroversion: 2 } },
          { text: 'Chỉ ngồi im quan sát mọi chuyện diễn ra.', traitScores: { extroversion: 0 } },
        ]
      },
      {
        id: 'q4',
        question: 'Khi thấy người khác gặp khó khăn, phản ứng của bạn là?',
        options: [
          { text: 'Ngay lập tức giúp đỡ mà không tính toán.', traitScores: { agreeableness: 10 } },
          { text: 'Giúp đỡ nếu việc đó không làm ảnh hưởng tới mình.', traitScores: { agreeableness: 5 } },
          { text: 'Mặc kệ, mỗi người phải tự lo cho bản thân.', traitScores: { agreeableness: 0 } },
        ]
      },
      {
        id: 'q5',
        question: 'Bạn đối phó với những tin đồn và lời chỉ trích như thế nào?',
        options: [
          { text: 'Rất bình tĩnh, tôi biết giá trị của mình.', traitScores: { stability: 10 } },
          { text: 'Cảm thấy hơi buồn nhưng sẽ qua nhanh thôi.', traitScores: { stability: 5 } },
          { text: 'Mất ngủ và lo lắng cực độ trong nhiều ngày.', traitScores: { stability: 0 } },
        ]
      },
      {
        id: 'q6',
        question: 'Bạn có thích nghiên cứu về nghệ thuật hoặc các lý thuyết trừu tượng không?',
        options: [
          { text: 'Rất đam mê, chúng làm tâm trí tôi mở mang.', traitScores: { openness: 10 } },
          { text: 'Sẽ tìm hiểu nếu nó giúp ích cho công việc.', traitScores: { openness: 5 } },
          { text: 'Tôi chỉ quan tâm đến những thứ thực dụng trong đời sống.', traitScores: { openness: 0 } },
        ]
      }
    ],
    results: [
      { traitId: 'openness', threshold: 15, title: 'Nhà Thám Hiểm Tư Duy', description: 'Bạn sở hữu sự tò mò vô tận về thế giới xung quanh.' },
      { traitId: 'conscientiousness', threshold: 12, title: 'Thám Tử Kỷ Luật Thép', description: 'Sự kiên trì và ngăn nắp là chìa khóa thành công của bạn.' },
      { traitId: 'extroversion', threshold: 8, title: 'Thám Tử Đám Đông', description: 'Bạn tỏa sáng và thu hút nhất khi ở bên cạnh mọi người.' },
      { traitId: 'agreeableness', threshold: 8, title: 'Sứ Giả Hòa Bình', description: 'Lòng tốt của bạn hàn gắn mọi vết thương trong tập thể.' },
      { traitId: 'stability', threshold: 8, title: 'Thám Tử Bình Thản', description: 'Cơn bão cảm xúc không thể gục ngã được ý chí của bạn.' }
    ]
  },
  {
    id: 'test_aq',
    title: 'Chỉ số Vượt khó (AQ)',
    subtitle: 'Tâm thép hay Thủy tinh?',
    description: 'Đo lường năng lực đối đầu và vượt qua những nghịch cảnh bất ngờ trong cuộc sống và công việc.',
    questions: [
      {
        id: 'q1',
        question: 'Khi một kế hoạch quan trọng của bạn bị đổ bể phút chót do lỗi của người khác...',
        options: [
          { text: 'Ngay lập tức tìm giải pháp thay thế, không lãng phí thời gian đổ lỗi.', traitScores: { resilience: 10 } },
          { text: 'Cảm thấy rất bực bội và mất một lúc lâu mới có thể tập trung lại.', traitScores: { resilience: 5 } },
          { text: 'Muốn bỏ cuộc vì cảm thấy mọi nỗ lực đều vô nghĩa.', traitScores: { resilience: 0 } },
        ]
      },
      {
        id: 'q2',
        question: 'Bạn đối mặt với những lời chỉ trích nặng nề từ cấp trên như thế nào?',
        options: [
          { text: 'Lắng nghe khách quan, rút ra bài học và sửa đổi ngay.', traitScores: { resilience: 10 } },
          { text: 'Im lặng lắng nghe nhưng trong lòng thấy bị xúc phạm sâu sắc.', traitScores: { resilience: 4 } },
          { text: 'Phản kháng quyết liệt hoặc thu mình lại vì tự ái.', traitScores: { resilience: 0 } },
        ]
      },
      {
        id: 'q3',
        question: 'Trong tình huống khẩn cấp cần đưa ra quyết định sinh tử, bạn thường...',
        options: [
          { text: 'Giữ được sự bình tĩnh và đưa ra phán đoán logic nhất.', traitScores: { resilience: 10 } },
          { text: 'Cảm thấy hoảng loạn nhưng vẫn cố gắng làm theo hướng dẫn.', traitScores: { resilience: 6 } },
          { text: 'Bị "đóng băng" tâm lý và không thể làm gì.', traitScores: { resilience: 0 } },
        ]
      },
      {
        id: 'q4',
        question: 'Khi phải bắt đầu lại từ đầu ở một lĩnh vực hoàn toàn mới...',
        options: [
          { text: 'Cảm thấy hào hứng với thử thách và cơ hội mới.', traitScores: { resilience: 10 } },
          { text: 'Lo lắng nhưng vẫn kiên trì học hỏi từng bước.', traitScores: { resilience: 7 } },
          { text: 'Thấy mệt mỏi và chỉ muốn làm những gì quen thuộc.', traitScores: { resilience: 2 } },
        ]
      },
      {
        id: 'q5',
        question: 'Bạn nhìn nhận thất bại như thế nào trong sự nghiệp?',
        options: [
          { text: 'Là một phần tất yếu của quá trình trưởng thành.', traitScores: { resilience: 10 } },
          { text: 'Là một kỷ niệm buồn cần phải quên đi sớm.', traitScores: { resilience: 5 } },
          { text: 'Là bằng chứng cho thấy mình không đủ năng lực.', traitScores: { resilience: 0 } },
        ]
      },
      {
        id: 'q6',
        question: 'Khi gặp một chướng ngại vật dường như không thể vượt qua...',
        options: [
          { text: 'Tìm mọi cách để lách qua, leo lên hoặc phá vỡ nó.', traitScores: { resilience: 10 } },
          { text: 'Đứng lại quan sát và chờ đợi sự giúp đỡ.', traitScores: { resilience: 4 } },
          { text: 'Rút lui để tìm một con đường dễ dàng hơn.', traitScores: { resilience: 0 } },
        ]
      }
    ],
    results: [
      { traitId: 'resilience', threshold: 45, title: 'Thám Tử Tâm Thép', description: 'Nghịch cảnh chỉ là chất xúc tác để bạn tỏa sáng rực rỡ hơn.' },
      { traitId: 'resilience', threshold: 25, title: 'Người Leo Núi Kiên Trì', description: 'Bạn bền bỉ nhưng đôi khi cần sự linh hoạt hơn trước cơn bão.' },
      { traitId: 'resilience', threshold: 0, title: 'Linh Hồn Thủy Tinh', description: 'Bạn nhạy cảm và dễ tổn thương, hãy học cách xây dựng bộ giáp tâm lý.' }
    ]
  },
  {
    id: 'test_love_languages',
    title: '5 Ngôn Ngữ Tình Yêu',
    subtitle: 'Cách bạn kết nối trái tim',
    description: 'Khám phá cách thức cốt lõi mà bạn trao đi và mong muốn nhận lại tình yêu thương.',
    questions: [
      {
        id: 'q1',
        question: 'Điều gì khiến bạn cảm thấy được yêu thương nhất trong một ngày bình thường?',
        options: [
          { text: 'Những lời khen ngợi và động viên chân thành.', traitScores: { words: 10 } },
          { text: 'Một cái ôm ấm áp hoặc cái nắm tay nhẹ nhàng.', traitScores: { touch: 10 } },
          { text: 'Đối phương giúp bạn làm bớt việc nhà hoặc công việc.', traitScores: { acts: 10 } },
        ]
      },
      {
        id: 'q2',
        question: 'Bạn thích nhận món quà như thế nào từ người yêu?',
        options: [
          { text: 'Một món quà bất ngờ, dù nhỏ nhưng thể hiện sự quan tâm.', traitScores: { gifts: 10 } },
          { text: 'Một buổi tối trọn vẹn chỉ có hai người, không điện thoại.', traitScores: { quality_time: 10 } },
          { text: 'Họ dành thời gian sửa giúp bạn chiếc máy tính bị hỏng.', traitScores: { acts: 10 } },
        ]
      },
      {
        id: 'q3',
        question: 'Khi bạn gặp áp lực trong công việc, sếp mong đợi điều gì từ đối phương?',
        options: [
          { text: 'Họ nói với bạn: "Anh/Em tin sếp sẽ làm tốt mà!"', traitScores: { words: 10 } },
          { text: 'Họ lặng lẽ pha cho bạn một tách cà phê nóng.', traitScores: { acts: 10 } },
          { text: 'Họ chỉ cần ngồi cạnh lắng nghe bạn tâm sự.', traitScores: { quality_time: 10 } },
        ]
      },
      {
        id: 'q4',
        question: 'Kỷ niệm lý tưởng của bạn về một buổi hẹn hò là...',
        options: [
          { text: 'Cùng nhau đi dạo và trò chuyện sâu sắc suốt đêm.', traitScores: { quality_time: 10 } },
          { text: 'Tận hưởng những cử chỉ thân mật và gần gũi.', traitScores: { touch: 10 } },
          { text: 'Họ tự tay chuẩn bị một bữa tối thịnh soạn cho bạn.', traitScores: { gifts: 10 } },
        ]
      },
      {
        id: 'q5',
        question: 'Bạn thường bày tỏ tình cảm với người thân bằng cách nào?',
        options: [
          { text: 'Luôn nói lời "Con yêu mẹ/ba" mỗi khi có dịp.', traitScores: { words: 10 } },
          { text: 'Mua những món đồ thiết thực mà họ đang cần.', traitScores: { gifts: 10 } },
          { text: 'Xoa bóp vai hoặc ôm họ thật chặt.', traitScores: { touch: 10 } },
        ]
      },
      {
        id: 'q6',
        question: 'Điều gì khiến bạn cảm thấy bị tổn thương nhất trong mối quan hệ?',
        options: [
          { text: 'Những lời chỉ trích và phủ nhận nỗ lực của bạn.', traitScores: { words: 0 } },
          { text: 'Sự hời hợt, vừa ở bên cạnh vừa làm việc riêng.', traitScores: { quality_time: 0 } },
          { text: 'Sự lười biếng, không giúp đỡ bạn khi bạn đang quá tải.', traitScores: { acts: 0 } },
        ]
      }
    ],
    results: [
      { traitId: 'words', threshold: 15, title: 'Bậc Thầy Ngôn Từ', description: 'Lời nói của bạn có sức mạnh chữa lành và kết nối kỳ diệu.' },
      { traitId: 'touch', threshold: 15, title: 'Chiến Binh Xúc Giác', description: 'Sự gần gũi vật lý là ngôn ngữ nguyên thủy nhất của bạn.' },
      { traitId: 'acts', threshold: 15, title: 'Thám Tử Hành Động', description: 'Với bạn, tình yêu là sự hy sinh và chăm sóc bằng việc làm cụ thể.' },
      { traitId: 'gifts', threshold: 15, title: 'Người Trao Tặng Lòng Tin', description: 'Món quà là biểu tượng hữu hình cho tình cảm sâu đậm của bạn.' },
      { traitId: 'quality_time', threshold: 15, title: 'Kẻ Săn Tìm Khoảnh Khắc', description: 'Sự hiện diện trọn vẹn là món quà quý giá nhất bạn có thể trao đi.' }
    ]
  },
  {
    id: 'test_growth_mindset',
    title: 'Tư Duy Tăng Trưởng',
    subtitle: 'Khám phá tiềm năng tiến hóa',
    description: 'Kiểm tra xem bạn có tin vào khả năng thay đổi và phát triển của bản thân hay đang bị kìm hãm ở mức cố định.',
    questions: [
      {
        id: 'q1',
        question: 'Bạn nghĩ gì về trí thông minh của một người?',
        options: [
          { text: 'Là thứ có thể không ngừng rèn luyện và nâng cấp.', traitScores: { growth: 10 } },
          { text: 'Là thứ bẩm sinh, chúng ta chỉ có thể dùng những gì mình có.', traitScores: { fixed: 10 } },
        ]
      },
      {
        id: 'q2',
        question: 'Khi gặp một nhiệm vụ cực kỳ khó khăn vượt quá khả năng hiện tại...',
        options: [
          { text: 'Đây là cơ hội tuyệt vời để mình học được kỹ năng mới.', traitScores: { growth: 10 } },
          { text: 'Mình không đủ giỏi để làm việc này, nên để người khác làm.', traitScores: { fixed: 10 } },
        ]
      },
      {
        id: 'q3',
        question: 'Bạn cảm thấy thế nào khi thấy đồng nghiệp thành công vượt bậc?',
        options: [
          { text: 'Chúc mừng và tìm hiểu xem mình có thể học được gì từ họ.', traitScores: { growth: 10 } },
          { text: 'Cảm thấy tự ti và e sợ mình đang bị bỏ lại phía sau.', traitScores: { fixed: 10 } },
        ]
      },
      {
        id: 'q4',
        question: 'Lời phê bình trực diện từ người khác có ý nghĩa gì với bạn?',
        options: [
          { text: 'Là món quà quý giá để mình sửa đổi và tiến bộ.', traitScores: { growth: 10 } },
          { text: 'Là sự tấn công cá nhân làm tổn thương lòng tự trọng.', traitScores: { fixed: 10 } },
        ]
      },
      {
        id: 'q5',
        question: 'Nỗ lực và sự kiên trì đối với bạn là...',
        options: [
          { text: 'Con đường duy nhất dẫn đến sự uyên bác.', traitScores: { growth: 10 } },
          { text: 'Chỉ dành cho những người không có tài năng bẩm sinh.', traitScores: { fixed: 10 } },
        ]
      },
      {
        id: 'q6',
        question: 'Khi đối mặt với thất bại thảm hại, bạn thường...',
        options: [
          { text: 'Phân tích nguyên nhân và bắt đầu lại với chiến thuật mới.', traitScores: { growth: 10 } },
          { text: 'Chấp nhận rằng mình không có khiếu ở lĩnh vực này.', traitScores: { fixed: 10 } },
        ]
      }
    ],
    results: [
      { traitId: 'growth', threshold: 40, title: 'Thám Tử Tiến Hóa', description: 'Tâm trí bạn không có giới hạn, bạn là người kiến tạo tương lai cho chính mình.' },
      { traitId: 'fixed', threshold: 30, title: 'Thám Tử Cố Định', description: 'Hãy cẩn thận, những rào cản bạn tự đặt ra đang ngăn chặn thành công của bạn.' }
    ]
  },
  {
    id: 'test_eq',
    title: 'Chỉ số Thấu cảm (EQ)',
    subtitle: 'Đọc vị trái tim nhân loại',
    description: 'Đo lường khả năng nhận biết, thấu hiểu và quản lý cảm xúc của bản thân cũng như người xung quanh.',
    questions: [
      {
        id: 'q1',
        question: 'Một người bạn đang khóc nức nở vì vừa chia tay, sếp sẽ làm gì?',
        options: [
          { text: 'Lắng nghe lặng lẽ, cung cấp sự hiện diện và cảm thông.', traitScores: { empathy: 10 } },
          { text: 'Đưa ra ngay các lời khuyên logic để họ ngừng khóc.', traitScores: { empathy: 4 } },
          { text: 'Cảm thấy bối rối và muốn tìm cách rời đi thật nhanh.', traitScores: { empathy: 0 } },
        ]
      },
      {
        id: 'q2',
        question: 'Bạn có nhận ra sự thay đổi nhỏ trong thái độ của người khác khi họ đang không ổn?',
        options: [
          { text: 'Hầu như luôn luôn, chỉ qua một ánh mắt hoặc tiếng thở dài.', traitScores: { empathy: 10 } },
          { text: 'Đôi khi, nếu họ thực sự biểu lộ ra bên ngoài.', traitScores: { empathy: 6 } },
          { text: 'Không quan tâm lắm trừ khi họ trực tiếp lên tiếng.', traitScores: { empathy: 0 } },
        ]
      },
      {
        id: 'q3',
        question: 'Trong một cuộc tranh luận, bạn thường...',
        options: [
          { text: 'Cố gắng hiểu góc nhìn của đối phương trước khi phản biện.', traitScores: { empathy: 10 } },
          { text: 'Chỉ tập trung vào việc bảo vệ quan điểm của mình.', traitScores: { empathy: 2 } },
          { text: 'Để cảm xúc bùng nổ và nói những lời gây tổn thương.', traitScores: { empathy: 0 } },
        ]
      },
      {
        id: 'q4',
        question: 'Bạn quản lý cơn giận dữ của chính mình như thế nào?',
        options: [
          { text: 'Nhận diện nó, hít thở và giải quyết vấn đề một cách bình tĩnh.', traitScores: { empathy: 10 } },
          { text: 'Né tránh không đối mặt và để nó tích tụ bên trong.', traitScores: { empathy: 4 } },
          { text: 'Trút giận lên những người xung quanh cho bõ tức.', traitScores: { empathy: 0 } },
        ]
      },
      {
        id: 'q5',
        question: 'Lòng trắc ẩn đối với người lạ gặp hoạn nạn trong bạn như thế nào?',
        options: [
          { text: 'Rất mạnh mẽ, luôn muốn làm gì đó dù nhỏ bé để giúp họ.', traitScores: { empathy: 10 } },
          { text: 'Cảm thấy thương hại nhưng không muốn dính líu đến rắc rối.', traitScores: { empathy: 5 } },
          { text: 'Mặc kệ, việc ai nấy làm, đời ai nấy lo.', traitScores: { empathy: 0 } },
        ]
      },
      {
        id: 'q6',
        question: 'Bạn có tự tin mình có khả năng động viên và truyền cảm hứng cho người khác?',
        options: [
          { text: 'Có, tôi biết cách dùng lời nói để sưởi ấm lòng người.', traitScores: { empathy: 10 } },
          { text: 'Bình thường, tùy vào đối tượng là ai.', traitScores: { empathy: 5 } },
          { text: 'Không, tôi thấy việc đó thật gượng ép và giả tạo.', traitScores: { empathy: 0 } },
        ]
      }
    ],
    results: [
      { traitId: 'empathy', threshold: 45, title: 'Thám Tử Thấu Cảm', description: 'Bạn sở hữu siêu năng lực thấu hiểu tâm hồn con người.' },
      { traitId: 'empathy', threshold: 25, title: 'Người Quan Sát Tận Tụy', description: 'Bạn có lòng tốt nhưng cần học cách quản lý cảm xúc tốt hơn.' },
      { traitId: 'empathy', threshold: 0, title: 'Thám Tử Lạnh Lùng', description: 'Bạn thiên về logic đến mức đôi khi trở nên vô tâm.' }
    ]
  },
  {
    id: 'test_burnout',
    title: 'Chỉ Số Kiệt Sức (Burnout)',
    subtitle: 'Ngọn nến có đang dần cạn?',
    description: 'Đánh giá mức độ căng thẳng thần kinh và sự mệt mỏi về tâm lý để có giải pháp nghỉ ngơi kịp thời.',
    questions: [
      {
        id: 'q1',
        question: 'Gần đây, bạn cảm thấy thế nào mỗi khi thức dậy để chuẩn bị đi làm/đi học?',
        options: [
          { text: 'Tràn đầy năng lượng và sẵn lòng đón nhận ngày mới.', traitScores: { energy: 10 } },
          { text: 'Cảm thấy uể oải, chỉ muốn nằm thêm chút nữa.', traitScores: { energy: 5 } },
          { text: 'Kinh hoàng, cảm thấy kiệt quệ ngay khi vừa mở mắt.', traitScores: { energy: 0 } },
        ]
      },
      {
        id: 'q2',
        question: 'Khả năng tập trung vào công việc của bạn những ngày qua...',
        options: [
          { text: 'Sắc bén và hiệu quả như thường lệ.', traitScores: { energy: 10 } },
          { text: 'Hay bị sao nhãng bởi những việc vô bổ.', traitScores: { energy: 4 } },
          { text: 'Cảm thấy đầu óc trống rỗng và mờ mịt (Brain fog).', traitScores: { energy: 0 } },
        ]
      },
      {
        id: 'q3',
        question: 'Mức độ kiên nhẫn của bạn với những sai sót nhỏ của người xung quanh?',
        options: [
          { text: 'Vẫn điềm tĩnh và bao dung hỗ trợ họ.', traitScores: { energy: 10 } },
          { text: 'Hơi gắt gỏng hơn bình thường một chút.', traitScores: { energy: 4 } },
          { text: 'Dễ dàng bùng nổ cơn thịnh nộ vô cớ.', traitScores: { energy: 0 } },
        ]
      },
      {
        id: 'q4',
        question: 'Sở thích cá nhân (phim ảnh, sách báo, thể thao) có còn hấp dẫn bạn không?',
        options: [
          { text: 'Vẫn là nguồn cảm hứng và niềm vui lớn.', traitScores: { energy: 10 } },
          { text: 'Cảm thấy hơi lười vận động hoặc tìm hiểu.', traitScores: { energy: 3 } },
          { text: 'Hoàn toàn mất hứng thú, không còn thiết tha gì.', traitScores: { energy: 0 } },
        ]
      },
      {
        id: 'q5',
        question: 'Bạn có cảm thấy công việc mình đang làm thực sự vô nghĩa không?',
        options: [
          { text: 'Không, mình vẫn thấy giá trị mình mang lại.', traitScores: { energy: 10 } },
          { text: 'Đôi khi cũng tự hỏi mình đang làm gì ở đây.', traitScores: { energy: 2 } },
          { text: 'Mỗi ngày đều là một cuộc tra tấn vô nghĩa.', traitScores: { energy: 0 } },
        ]
      },
      {
        id: 'q6',
        question: 'Chất lượng giấc ngủ và sức khỏe thể chất gần đây?',
        options: [
          { text: 'Ngủ sâu, cơ thể khỏe mạnh và nhẹ nhõm.', traitScores: { energy: 10 } },
          { text: 'Khó ngủ hoặc hay mơ thấy công việc.', traitScores: { energy: 4 } },
          { text: 'Mệt mỏi kinh niên, đau đầu hoặc mất ngủ nặng.', traitScores: { energy: 0 } },
        ]
      }
    ],
    results: [
      { traitId: 'energy', threshold: 45, title: 'Pin Năng Lượng Đầy', description: 'Chúc mừng, sếp đang ở trạng thái tinh thần đỉnh cao!' },
      { traitId: 'energy', threshold: 25, title: 'Vạch Pin Màu Vàng', description: 'Cảnh báo: Sếp cần một kỳ nghỉ ngắn để nạp lại năng lượng.' },
      { traitId: 'energy', threshold: 0, title: 'Cạn Kiệt Hoàn Toàn', description: 'Dừng lại ngay! Sếp đang bị "cháy sạch" (Burnout), cần nghỉ ngơi lập tức.' }
    ]
  }
];
