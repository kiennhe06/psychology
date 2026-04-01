import { Quiz, QuizQuestion } from './quizzes';

// ─── Daily Quiz Data — Phiên bản "Thám Tử Đời Thường" ─────────────────────────
// Đặc điểm: 7-8 câu hỏi, 100% tình huống thực tế, bớt lý thuyết, tăng độ "Wow"

export const DAILY_CHALLENGES: Quiz[] = [
  {
    id: 'd1',
    title: 'Một Ngày Của Thám Tử',
    regionId: 'special', // Special flag
    requiredLevel: 1,
    xpReward: 100,
    gemReward: 10,
    questions: [
      {
        id: 'd1_1',
        type: 'scenario',
        question: 'Tại sao bạn lại có xu hướng làm vậy?',
        scenario: 'Bạn bước vào một trung tâm mua sắm và thấy mọi người đều đang xếp hàng cực dài trước một tiệm bánh mới. Dù không biết bánh ở đó có ngon không, bạn vẫn tự động đi vào xếp hàng theo.',
        options: [
            'Vì bạn đang rất đói',
            'Vì bạn tin rằng "đông người chắc chắn là tốt" (Hiệu ứng Đám đông)',
            'Vì bạn thích cảm giác xếp hàng',
            'Vì bạn bị "thôi miên" bởi mùi bánh'
        ],
        correctIndex: 1,
        explanation: 'Đây là Hiệu ứng Đám đông (Bandwagon Effect). Chúng ta thường tin tưởng vào sự lựa chọn của số đông khi thiếu thông tin cụ thể.',
        timeLimit: 20,
      },
      {
        id: 'd1_2',
        type: 'scenario',
        question: 'Con số 10 triệu đã đóng vai trò gì?',
        scenario: 'Bạn đi mua xe máy cũ. Người bán hét giá 10 triệu. Dù bạn biết giá trị thực chỉ 7 triệu, bạn vẫn cảm thấy 8.5 triệu là một món hời sau khi trả giá.',
        options: [
            'Làm vật trang trí cho cuộc hội thoại',
            'Làm "mỏ neo" tâm lý khiến bạn so sánh mọi mức giá sau đó với số 10 triệu (Anchoring)',
            'Làm bạn sợ hãi và muốn bỏ về ngay',
            'Làm người bán trông có vẻ uy tín hơn'
        ],
        correctIndex: 1,
        explanation: 'Con số đầu tiên xuất hiện sẽ trở thành "mỏ neo" (Anchoring Bias). Nó chi phối hoàn toàn việc bạn đánh giá mức giá tiếp theo là đắt hay rẻ.',
        timeLimit: 20,
      },
      {
        id: 'd1_3',
        type: 'scenario',
        question: 'Bạn nên hành động thế nào để được giúp đỡ nhanh nhất?',
        scenario: 'Bạn bị trượt chân ngã trên một con phố cực kỳ đông đúc. Mọi người đều nhìn bạn rồi... đi tiếp, vì ai cũng nghĩ "chắc sẽ có người khác giúp thôi".',
        options: [
            'Hét to: "Ai đó giúp tôi với!"',
            'Chỉ tay vào một người cụ thể: "Anh mặc áo đỏ ơi, kéo tôi dậy với!"',
            'Im lặng tự đứng dậy dù rất đau',
            'Giả vờ ngất xỉu để thu hút sự chú ý'
        ],
        correctIndex: 1,
        explanation: 'Để phá vỡ Hiệu ứng Người ngoài cuộc (Bystander Effect), bạn phải chỉ định trách nhiệm cho một người cụ thể, thay vì để nó phân tán cho đám đông.',
        timeLimit: 25,
      },
      {
        id: 'd1_4',
        type: 'scenario',
        question: 'Tại sao chiếc giá sách này lại "đẹp" đến thế?',
        scenario: 'Bạn vừa dành 4 tiếng đồng hồ để tự lắp ráp một chiếc giá sách gỗ bị lệch nhẹ và trầy xước. Tuy nhiên, bạn thấy nó đẹp hơn bất kỳ chiếc kệ đắt tiền nào trong showroom.',
        options: [
            'Vì showroom kia ánh sáng không tốt',
            'Vì bạn bị "Hiệu ứng IKEA" – yêu quý sản phẩm hơn vì công sức mình bỏ ra',
            'Vì gỗ lậu thường đẹp hơn gỗ thường',
            'Vì bạn có mắt thẩm mỹ khác người'
        ],
        correctIndex: 1,
        explanation: 'Hiệu ứng IKEA khiến chúng ta đánh giá quá cao giá trị của những thứ mình tự tay làm ra, bất chấp chất lượng thực tế.',
        timeLimit: 20,
      },
      {
        id: 'd1_5',
        type: 'scenario',
        question: 'Bạn đang bị thiên lệch gì chi phối?',
        scenario: 'Bạn tin rằng ăn tỏi giúp chữa bách bệnh. Bạn chỉ tìm đọc những bài báo khen tỏi và phớt lờ hoàn toàn các nghiên cứu khoa học phản bác điều đó.',
        options: [
            'Thiên lệch Sợ mất mát',
            'Thiên lệch Xác nhận (Confirmation Bias)',
            'Hiệu ứng Hào quang',
            'Hiệu ứng Dunning-Kruger'
        ],
        correctIndex: 1,
        explanation: 'Thiên lệch xác nhận khiến chúng ta chỉ chú ý đến thông tin ủng hộ niềm tin có sẵn của mình và bỏ qua mọi thứ trái chiều.',
        timeLimit: 20,
      },
      {
        id: 'd1_6',
        type: 'scenario',
        question: 'Hào quang nào đang bao trùm trí óc bạn?',
        scenario: 'Gặp một người lạ mặc vest chỉnh tề, đi giày hiệu và nói chuyện điềm đạm. Bạn lập tức cho rằng anh ta là một chuyên gia tài chính thông minh và đáng tin cậy.',
        options: [
            'Hiệu ứng Đám đông',
            'Hiệu ứng Hào quang (Halo Effect)',
            'Thiên lệch Sinh tồn',
            'Ngụy biện Chi phí chìm'
        ],
        correctIndex: 1,
        explanation: 'Hiệu ứng Hào quang xảy ra khi một đặc điểm tích cực (vẻ ngoài) lan tỏa sang toàn bộ đánh giá về nhân cách và năng lực của một người.',
        timeLimit: 20,
      },
      {
        id: 'd1_7',
        type: 'scenario',
        question: 'Tại sao bạn lại cố ăn hết tô phở dở tệ đó?',
        scenario: 'Bạn gọi một bát phở 100k nhưng nó cực kỳ dở. Dù đã no và thấy không ngon, bạn vẫn cố ăn hết vì nghĩ: "Tiếc quá, đã bỏ 100k rồi, không ăn thì phí".',
        options: [
            'Vì bạn là người tiết kiệm',
            'Vì bạn mắc bẫy Chi phí chìm (Sunk Cost Fallacy)',
            'Vì phở dở vẫn là phở',
            'Vì bạn sợ người bán hàng buồn'
        ],
        correctIndex: 1,
        explanation: 'Chi phí chìm là những gì đã bỏ ra và không thể lấy lại. Quyết định đúng đắn là dừng lại để không mất thêm (sức khỏe/thời gian), thay vì cố đấm ăn xôi vì số tiền đã mất.',
        timeLimit: 25,
      }
    ]
  },
  {
    id: 'd2',
    title: 'Cạm Bẫy Chốn Công Sở',
    regionId: 'special',
    requiredLevel: 2,
    xpReward: 120,
    gemReward: 12,
    questions: [
      {
        id: 'd2_1',
        type: 'scenario',
        question: 'Sếp của bạn đang vô hình chung sử dụng hiệu ứng gì?',
        scenario: 'Sếp mới giao việc cho bạn và nói: "Tôi tin em là một thám tử tài năng, việc này chắc chắn em sẽ làm xuất sắc". Nhờ lời khích lệ đó, bạn thực sự làm việc năng suất hơn hẳn bình thường.',
        options: [
          'Hiệu ứng Pygmalion (Kỳ vọng tạo nên thực tại)',
          'Hiệu ứng Hào quang',
          'Hiệu ứng IKEA',
          'Thiên lệch Xác nhận'
        ],
        correctIndex: 0,
        explanation: 'Hiệu ứng Pygmalion chỉ ra rằng kỳ vọng cao của người khác (đặc biệt là cấp trên) có thể trực tiếp làm tăng năng lực thực tế của đối tượng.',
        timeLimit: 25,
      },
      {
        id: 'd2_2',
        type: 'scenario',
        question: 'Đồng nghiệp của bạn đang ở giai đoạn nào?',
        scenario: 'Một đồng nghiệp vừa học xong 2 tiếng khóa học thám tử cấp tốc trên mạng. Anh ta lập tức đi khắp văn phòng và dạy bảo mọi người như một chuyên gia thực thụ.',
        options: [
          'Giai đoạn "Đỉnh cao của sự ngu dốt" (Hiệu ứng Dunning-Kruger)',
          'Giai đoạn Chuyên gia lâu năm',
          'Giai đoạn Thung lũng Tuyệt vọng',
          'Giai đoạn Khiêm tốn giả tạo'
        ],
        correctIndex: 0,
        explanation: 'Hiệu ứng Dunning-Kruger khiến những người thiếu năng lực thường đánh giá quá cao bản thân vì họ không đủ kiến thức để biết mình đang thiếu cái gì.',
        timeLimit: 25,
      },
      {
        id: 'd2_3',
        type: 'scenario',
        question: 'Tại sao việc gọi đồ ăn trưa lại làm bạn đau đầu?',
        scenario: 'Văn phòng quyết định gọi đồ ăn trưa. App giao hàng đưa ra menu với 200 món khác nhau. Bạn mất 45 phút vẫn không chọn được món nào và cảm thấy mệt mỏi hơn ban đầu.',
        options: [
          'Vì bạn là người cầu toàn',
          'Vì Paradox of Choice (Nghịch lý của sự lựa chọn)',
          'Vì bạn không thực sự đói',
          'Vì sếp đang quan sát bạn'
        ],
        correctIndex: 1,
        explanation: 'Quá nhiều lựa chọn không làm ta hạnh phúc hơn mà gây ra sự tê liệt quyết định (Decision Paralysis) và lo lắng mình sẽ chọn sai.',
        timeLimit: 20,
      },
      {
        id: 'd2_4',
        type: 'scenario',
        question: 'Bạn đang bị tâm lý gì chi phối?',
        scenario: 'Dù biết dự án đang làm không có tương lai, nhưng vì đã dành 6 tháng trời "cày cuốc", bạn kiên quyết không hủy bỏ vì thấy phí công lao sức lực.',
        options: [
          'Thiên lệch Xác nhận',
          'Ngụy biện Chi phí chìm (Sunk Cost Fallacy)',
          'Hiệu ứng IKEA',
          'Hiệu ứng Người ngoài cuộc'
        ],
        correctIndex: 1,
        explanation: 'Sunk Cost Fallacy khiến ta tiếp tục đầu tư vào thứ tồi tệ chỉ vì không muốn chấp nhận rằng công sức trong quá khứ đã bị lãng phí.',
        timeLimit: 25,
      },
      {
        id: 'd2_5',
        type: 'scenario',
        question: 'Tại sao bạn lại cảm thấy mình buộc phải giúp đồng nghiệp này?',
        scenario: 'Đồng nghiệp mang cho bạn một tách cà phê buổi sáng (dù bạn không nhờ). Chiều hôm đó, anh ta nhờ bạn làm giúp mội báo cáo nặng nhọc và bạn thấy rất khó để từ chối.',
        options: [
          'Vì bạn là người tốt bụng',
          'Vì Quy luật Đáp đền tiếp nối (Reciprocity)',
          'Vì Hiệu ứng Hào quang',
          'Vì bạn sợ anh ta'
        ],
        correctIndex: 1,
        explanation: 'Con người có áp lực tâm lý mạnh mẽ phải trả nợ những hành động tử tế của người khác, ngay cả khi món quà ban đầu là thứ ta không mong muốn.',
        timeLimit: 20,
      },
      {
        id: 'd2_6',
        type: 'scenario',
        question: 'Bạn đang mắc phải thiên lệch gì?',
        scenario: 'Một đồng nghiệp đi muộn 15 phút. Bạn nghĩ: "Hắn ta thật lười biếng và vô kỷ luật". Tuần sau, bạn cũng đi muộn 15 phút, nhưng bạn nghĩ: "Do kẹt xe và cái báo thức chết tiệt!"',
        options: [
          'Hiệu ứng Hào quang',
          'Thiên lệch Quy kết Cơ bản (Fundamental Attribution Error)',
          'Hiệu ứng IKEA',
          'Thiên lệch Xác nhận'
        ],
        correctIndex: 1,
        explanation: 'Chúng ta thường quy kết lỗi lầm của người khác cho tính cách của họ, nhưng lại quy kết lỗi lầm của mình cho hoàn cảnh bên ngoài.',
        timeLimit: 25,
      },
      {
        id: 'd2_7',
        type: 'scenario',
        question: 'Sếp đang sử dụng chiến thuật tâm lý nào?',
        scenario: 'Sếp đề nghị bạn làm thêm vào cả thứ 7 và Chủ nhật. Bạn từ chối. Sau đó sếp nói: "Vậy ít nhất hãy làm thêm 2 tiếng ngày hôm nay nhé?". Bạn đồng ý ngay lập tức.',
        options: [
          'Chiến thuật "Cánh cửa đóng sầm" (Door-in-the-Face)',
          'Chiến thuật "Đặt chân vào cửa"',
          'Hiệu ứng Đám đông',
          'Hiệu ứng Halo'
        ],
        correctIndex: 0,
        explanation: 'Bằng cách đưa ra một yêu cầu quá đáng để bị từ chối, yêu cầu thực sự (nhỏ hơn) sau đó sẽ mang tính chất "nhượng bộ", khiến bạn dễ chấp nhận hơn.',
        timeLimit: 25,
      }
    ]
  }
];
