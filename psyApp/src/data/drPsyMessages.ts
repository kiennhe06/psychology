// ─── Dr. Psy Persona-based Messages ──────────────────────────────────────────

export type PersonaType = 'default' | 'killer' | 'philosopher' | 'sherlock' | 'mystic' | 'mastermind' | 'manipulator';

interface PersonaContent {
  greetings: string[];
  tips: string[];
  quizComments: {
    perfect: string[];
    great: string[];
    good: string[];
    needsWork: string[];
  };
  testComments: string[];
  levelUp: string[];
}

export const PERSONA_MESSAGES: Record<PersonaType, PersonaContent> = {
  default: {
    greetings: [
      'Chào buổi sáng! Hôm nay ta khám phá gì nào? ☀️',
      'Mỗi hiệu ứng mới là một bí mật về não bộ! 🧠',
      'Tiến sĩ Psy rất vui được gặp lại bạn! 😸',
    ],
    tips: [
      'Bạn vừa thêm một vũ khí mới vào kho trí tuệ! 🧠✨',
      'Giờ bạn đã biết cách não bộ "lừa" mình rồi đấy! 😼',
    ],
    quizComments: {
      perfect: ['TUYỆT VỜI! Bạn là thiên tài tâm lý học! 🏆'],
      great: ['Xuất sắc! Chỉ cần thêm chút nữa là hoàn hảo rồi! 🌟'],
      good: ['Tốt lắm! Hãy ôn tập thêm vài điểm nhỏ nhé! 📚'],
      needsWork: ['Đừng nản! Hãy đọc lại bài học rồi thử lại nhé! 📖'],
    },
    testComments: [
      'Câu này thú vị đấy! 😼',
      'Hãy trả lời thật lòng nhé, thám tử! 🕵️‍♂️',
      'Học viện đang ghi nhận dữ liệu của bạn... 📈',
    ],
    levelUp: ['Não bộ đang tiến hóa! Bạn vừa lên Level mới! 🧬'],
  },
  killer: {
    greetings: [
      'Ngươi lại đến à? Đừng lãng phí thời gian của ta. 🗡️',
      'Não bộ là vũ khí. Ngươi đã mài dũa nó chưa? 💀',
      'Kiến thức là sức mạnh, và sức mạnh là tất cả. Bắt đầu đi.',
    ],
    tips: [
      'Đã nắm thóp được đối thủ chưa? 👁️',
      'Dùng kiến thức này để thao túng cuộc chơi của ngươi đi.',
    ],
    quizComments: {
      perfect: ['Khá đấy. Ngươi bắt đầu làm ta thấy thú vị rồi đấy. 🌑'],
      great: ['Tạm chấp nhận được. Nhưng trong một vụ án, 80% nghĩa là chết.'],
      good: ['Quá tầm thường. Ngươi định sống sót bằng đống kiến thức nửa vời này sao?'],
      needsWork: ['Thật thảm hại. Đừng vác bộ não rỗng tuếch đó đến gặp ta lần nữa.'],
    },
    testComments: [
      'Sự thật đau đớn lắm, ngươi chịu được không? 💀',
      'Ngươi đang cố che giấu bản chất thật à? Đừng hòng.',
      'Trả lời đi, đừng để ta phải chờ đợi lâu.',
    ],
    levelUp: ['Ngươi vừa trở nên nguy hiểm hơn một chút rồi đấy. 🔥'],
  },
  philosopher: {
    greetings: [
      'Chào hiền hữu. Hôm nay tâm trí bạn có bình an không? 📜',
      'Chúng ta chỉ là những hạt bụi đang cố hiểu về vũ trụ bên trong mình.',
      'Sự thông thái bắt đầu từ việc thừa nhận mình không biết gì cả.',
    ],
    tips: [
      'Hãy quán chiếu điều này vào sâu trong tâm thức của bạn. ✨',
      'Tri thức không nằm ở trang sách, mà ở cách bạn nhìn nhận thế giới.',
    ],
    quizComments: {
      perfect: ['Bạn đã chạm được vào chân lý của sự hiểu biết. Thật đáng quý. 🙏'],
      great: ['Sự nỗ lực của bạn đang đơm hoa kết trái. Rất tốt.'],
      good: ['Hãy kiên nhẫn. Kiến thức cần thời gian để ngấm vào linh hồn.'],
      needsWork: ['Mọi thất bại đều là một bài học để ta khiêm nhường hơn.'],
    },
    testComments: [
      'Mỗi lựa chọn là một mảnh ghép của linh hồn... ✨',
      'Hãy nhìn sâu vào bên trong bạn, đừng vội vã.',
      'Sự chân thật là con đường duy nhất dẫn đến giác ngộ.',
    ],
    levelUp: ['Tâm hồn bạn vừa mở rộng thêm một tầng không gian mới. 🏔️'],
  },
  sherlock: {
    greetings: [
      'Dữ liệu! Dữ liệu! Tôi không thể làm gạch mà không có đất sét. 🕵️‍♂️',
      'Chào thám tử. Đừng quan sát, hãy nhìn thấu sự việc.',
      'Một vụ án mới? Hy vọng nó không quá tầm thường.',
    ],
    tips: [
      'Loại bỏ những gì không thể, thứ còn lại dù vô lý đến đâu cũng là sự thật.',
      'Trí não là một căn phòng trống, hãy lấp đầy nó bằng những công cụ hữu ích.',
    ],
    quizComments: {
      perfect: ['Khấu trừ logic hoàn hảo. Bạn bắt đầu có dáng dấp thám tử rồi đấy.'],
      great: ['Khá tốt, nhưng bạn đã bỏ lỡ một vài chi tiết nhỏ ở hiện trường.'],
      good: ['Lập luận của bạn còn nhiều lỗ hổng. Hãy tập trung hơn.'],
      needsWork: ['Thật tẻ nhạt. Bạn đang nhìn nhưng không hề quan sát.'],
    },
    testComments: [
      'Dữ liệu đang dần khớp với giả thuyết của tôi... 🕵️‍♂️',
      'Nhịp tim của bạn có vẻ đang tăng lên? Thú vị thật.',
      'Tôi đang thấy dấu vết của một nhân cách rất thú vị.',
    ],
    levelUp: ['Căn phòng trí tuệ của bạn vừa được nâng cấp thêm một tầng lầu.'],
  },
  mystic: {
    greetings: [
      'Ta đã thấy bạn trong những giấc mơ về vũ trụ... 🌌',
      'Năng lượng hôm nay thật kỳ lạ. Hãy lắng nghe trực giác của bạn.',
      'Sự thật không nằm ở con mắt, nó nằm ở con mắt thứ ba của bạn. 🔮',
    ],
    tips: [
      'Tâm trí bạn đang rung động cùng tần số với tri thức cổ xưa.',
      'Hãy để vũ trụ dẫn lối, câu trả lời đã nằm sẵn trong bạn.',
    ],
    quizComments: {
      perfect: ['Trực giác của bạn đã hòa làm một với chân lý vũ trụ. ✨'],
      great: ['Tần số rung động của bạn rất cao. Hãy tiếp tục duy trì.'],
      good: ['Tâm trí bạn còn hơi xao nhãng. Hãy thiền định thêm.'],
      needsWork: ['Những đám mây mù đang che khuất linh hồn bạn. Hãy thanh tẩy nó.'],
    },
    testComments: [
      'Vũ trụ đang lắng nghe từng nhịp đập tâm trí bạn... 🔮',
      'Năng lượng của câu hỏi này đang bao trùm lấy bạn.',
      'Hãy để linh hồn cất tiếng nói, đừng dùng lý trí.',
    ],
    levelUp: ['Vòng tròn năng lượng của bạn vừa mở rộng. Bạn đang thăng hoa!'],
  },
  mastermind: {
    greetings: [
      'Ngươi đã nhìn thấy toàn bộ bàn cờ chưa? 🕴️',
      'Chào quân cờ quan trọng nhất của ta. Bắt đầu nước đi thôi.',
      'Chiến thuật tối thượng là gì nếu không có sự thực thi hoàn hảo?',
    ],
    tips: [
      'Đừng chỉ nhìn vào một nước đi, hãy nhìn vào mười bước kế tiếp.',
      'Mọi hành động của ngươi phải phục vụ cho mục tiêu cuối cùng.',
    ],
    quizComments: {
      perfect: ['Sự tính toán chuẩn xác. Không một sai sót nhỏ nào. 🎯'],
      great: ['Khá tốt, nhưng một chiến lược gia không được phép sai lầm.'],
      good: ['Ngươi đang chơi cờ vây bằng tư duy cờ tướng à? Cần bao quát hơn.'],
      needsWork: ['Tầm nhìn quá hạn hẹp. Ngươi định làm quân tốt thí cho kẻ khác sao?'],
    },
    testComments: [
      'Câu trả lời này nằm trong dự tính của ta... 🕴️',
      'Đừng để lộ sơ hở trong tính cách của ngươi.',
      'Ta đang thấy một mô thức hành vi rất thú vị.',
    ],
    levelUp: ['Ngươi vừa tiến hóa từ một quân tốt thành một quân xe trên bàn cờ này. 🏰'],
  },
  manipulator: {
    greetings: [
      'Sợi dây đã sẵn sàng. Ngươi đã biết cách giật dây chưa? ⛓️',
      'Ngươi muốn người khác làm theo ý mình? Ta sẽ dạy ngươi.',
      'Chào mừng kẻ săn mồi tâm lý mới. Đừng để lộ bộ mặt thật.',
    ],
    tips: [
      'Sự thật chỉ là khái niệm tương đối. Ngươi mới là kẻ tạo ra sự thật.',
      'Thao túng không phải là ép buộc, mà là khiến họ tự nguyện đi vào bẫy.',
    ],
    quizComments: {
      perfect: ['Bậc thầy thao túng tri thức. Ta bắt đầu thấy nể ngươi rồi đấy. ⛓️'],
      great: ['Sắc sảo. Ngươi biết cách chọn lọc thông tin rất tốt.'],
      good: ['Lèo lái thông tin chưa đủ mượt mà. Cố gắng thêm đi.'],
      needsWork: ['Ngươi còn quá ngây thơ. Như thế này thì chỉ làm nạn nhân thôi.'],
    },
    testComments: [
      'Ta đang nhìn thấy những góc khuất tăm tối nhất của ngươi... 🧠',
      'Hãy thành thật với chính mình, dù nó có đáng sợ đến đâu.',
      'Ngươi đang bị ta đọc vị, biết không?',
    ],
    levelUp: ['Ngươi vừa sở hữu thêm một sợi xích vô hình để kiểm soát thế giới. 🔥'],
  }
};

// ─── Backward Compatibility Helpers ──────────────────────────────────────────
export const DR_PSY = { avatar: '🐱', name: 'Tiến sĩ Psy' };
export const HOME_GREETINGS = PERSONA_MESSAGES.default.greetings;
export const DETAIL_TIPS = PERSONA_MESSAGES.default.tips;
export const LEVEL_UP_MESSAGES = PERSONA_MESSAGES.default.levelUp;
export const BADGE_UNLOCK_MESSAGES = ['Một huy hiệu mới đã được thêm vào bộ sưu tập! 🎖️'];
export const STREAK_MESSAGES = { 
  day3: '🔥 3 ngày streak!',
  day7: '🔥🔥 7 ngày streak!',
  day14: '🔥🔥🔥 14 ngày streak!',
  day30: '🌟🔥 30 ngày streak! Huyền thoại!'
};

export const getRandomMessage = (messages: string[]): string => {
  return messages[Math.floor(Math.random() * messages.length)];
};

export const getQuizComment = (scorePercent: number): string => {
  return getQuizCommentByPersona('default', scorePercent);
};

// ─── New Persona Helpers ─────────────────────────────────────────────────────
export const getRandomMessageByPersona = (
  persona: PersonaType, 
  category: keyof PersonaContent
): string => {
  const messages = PERSONA_MESSAGES[persona || 'default'][category] as string[];
  return messages[Math.floor(Math.random() * messages.length)];
};

export const getQuizCommentByPersona = (
  persona: PersonaType,
  scorePercent: number
): string => {
  const comments = PERSONA_MESSAGES[persona || 'default'].quizComments;
  let list: string[];
  
  if (scorePercent === 100) list = comments.perfect;
  else if (scorePercent >= 80) list = comments.great;
  else if (scorePercent >= 50) list = comments.good;
  else list = comments.needsWork;

  return list[Math.floor(Math.random() * list.length)];
};
