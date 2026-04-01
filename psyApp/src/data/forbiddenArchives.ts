// ─── Forbidden Archives ───────────────────────────────────────────────────────
// Nội dung chuyên sâu về các vụ án và thí nghiệm tâm lý gây tranh cãi nhất lịch sử.
// Người dùng phải dùng Gems để mở khóa từng hồ sơ.

export interface ArchiveFile {
  id: string;
  title: string;
  subtitle: string;
  caseCode: string;
  coverEmoji: string;
  summary: string;
  fullContent: string;
  lessons: string[];
  warning: string;
  isUnlocked?: boolean;
}

export const FORBIDDEN_ARCHIVES: ArchiveFile[] = [
  {
    id: 'arc_stanford',
    title: 'Thí nghiệm Nhà tù Stanford',
    subtitle: 'Khi ranh giới giữa người và quỷ bị xóa nhòa',
    caseCode: 'CASE-1971-ZIMBARDO',
    coverEmoji: '⛓️',
    summary: 'Philip Zimbardo đã biến những sinh viên bình thường thành cai ngục và tù nhân. Kết quả? Một cuộc thảm kịch tâm lý chỉ sau 6 ngày.',
    fullContent: `Năm 1971, tại tầng hầm của Đại học Stanford, một nhà tù giả lập đã được dựng lên. 24 sinh viên khỏe mạnh, tâm lý ổn định được chia ngẫu nhiên làm 2 nhóm: Cai ngục và Tù nhân.

Những người làm cai ngục được trao dùi cui, kính râm gương và quyền lực tuyệt đối. Những người làm tù nhân bị lột đồ, xịt thuốc khử trùng, và chỉ được gọi bằng số hiệu. 

Kết quả kinh hoàng: Chỉ trong vòng chưa đầy 36 giờ, một tù nhân đã bị suy sụp tinh thần cấp tính. Các cai ngục bắt đầu thực hiện các hành vi bạo lực, làm nhục và tra tấn tâm lý tù nhân một cách tự phát. Thí nghiệm dự kiến kéo dài 2 tuần đã phải hủy bỏ sau 6 ngày vì tình hình vượt ra khỏi tầm kiểm soát.`,
    lessons: [
      'Quyền lực tuyệt đối có thể biến bất kỳ ai thành kẻ ác.',
      'Môi trường và phục trang có tác động cực lớn đến nhân cách (Deindividuation).',
      'Con người có xu hướng tuân thủ vai trò xã hội mà họ được gán cho.'
    ],
    warning: 'Nội dung chứa các chi tiết về ngược đãi tâm lý.'
  },
  {
    id: 'arc_milgram',
    title: 'Thí nghiệm Milgram',
    subtitle: 'Bạn có dám sát hại người khác nếu được ra lệnh?',
    caseCode: 'CASE-1961-OBEDIENCE',
    coverEmoji: '⚡',
    summary: '65% người tham gia đã sẵn sàng nhấn nút giật điện chết người chỉ vì một "chuyên gia" yêu cầu họ làm thế.',
    fullContent: `Sau thế chiến II, Stanley Milgram muốn hiểu tại sao những người bình thường lại có thể thực hiện những tội ác diệt chủng theo lệnh của cấp trên.

Ông thiết kế một thiết bị phát điện giả. Người tham gia (người dạy) được yêu cầu giật điện một "người học" (thực chất là diễn viên) mỗi khi họ trả lời sai. Mức điện tăng dần từ 15V đến 450V (mức tử vong).

Mặc dù "người học" giả vờ gào thét đau đớn và van xin dừng lại, nhưng khi nhà khoa học áo trắng nói: "Thí nghiệm yêu cầu bạn phải tiếp tục", đa số mọi người đã tuân lệnh. Kết quả là 65% người tham gia đã nhấn đến mức điện cao nhất (450V), dù tay họ run rẩy và mồ hôi nhễ nhại vì căng thẳng.`,
    lessons: [
      'Sự tuân thủ mù quáng trước quyền lực (Obedience to Authority).',
      'Con người có xu hướng chối bỏ trách nhiệm cá nhân nếu họ cảm thấy mình chỉ là công cụ cho người khác.',
      'Sự tôn nghiêm của một bộ đồng phục hoặc chức danh có thể lấn át lương tâm.'
    ],
    warning: 'Nội dung về đạo đức và sự tuân thủ cực đoan.'
  },
  {
    id: 'arc_stockholm',
    title: 'Hội chứng Stockholm',
    subtitle: 'Tình yêu kỳ lạ sau họng súng',
    caseCode: 'CASE-1973-NORRMALMSTORG',
    coverEmoji: '🫂',
    summary: 'Tại sao các con tin tại ngân hàng ở Stockholm lại quay ra bảo vệ kẻ bắt cóc mình trước cảnh sát?',
    fullContent: `Năm 1973, một vụ cướp ngân hàng kéo dài 6 ngày tại Quảng trường Norrmalmstorg, Stockholm, Thụy Điển đã làm nảy sinh một khái thuật ngữ tâm lý mới.

Hai kẻ cướp có vũ trang đã bắt giữ 4 nhân viên ngân hàng làm con tin. Trong suốt 6 ngày bị giam cầm trong kho tiền, các con tin không những không ghét bỏ kẻ cướp mà còn bắt đầu có thiện cảm với chúng. 

Khi cảnh sát xông vào giải cứu, các con tin đã lấy thân mình che chắn cho kẻ cướp, từ chối làm chứng chống lại chúng và thậm chí còn gây quỹ để giúp kẻ cướp đóng tiền thuê luật sư. Nhà tâm lý học Nils Bejerot đã gọi đây là cơ chế phòng vệ của não bộ: Khi mạng sống nằm trong tay kẻ khác, não bộ tự động nảy sinh tình cảm với họ như một cách để sinh tồn.`,
    lessons: [
      'Não bộ tự động "yêu" kẻ mạnh để giảm bớt nỗi sợ hãi cái chết.',
      'Mối liên hệ cảm xúc hình thành trong nghịch cảnh cực độ.',
      'Sự nhận thức lệch lạc về lòng nhân từ của kẻ bắt cóc.'
    ],
    warning: 'Nghiên cứu về tâm lý sinh tồn và sự lệ thuộc cảm xúc.'
  },
  {
    id: 'arc_dunning_kruger',
    title: 'Hiệu ứng Dunning-Kruger',
    subtitle: 'Bẫy tự tin của kẻ thiếu năng lực',
    caseCode: 'CASE-1999-ILLUSION',
    coverEmoji: '🤡',
    summary: 'Tại sao những người kém cỏi nhất lại thường tin rằng họ là chuyên gia lỗi lạc nhất?',
    fullContent: `Năm 1999, David Dunning và Justin Kruger đã thực hiện một nghiên cứu chấn động về sự tự đánh giá sai lầm của con người. 

Họ phát hiện ra rằng những người có trình độ thấp trong một lĩnh vực cụ thể thường không có đủ kỹ năng để nhận ra sự yếu kém của chính mình. Kết quả là họ tự đánh giá năng lực của mình cao hơn thực tế rất nhiều. Ngược lại, những người thực sự giỏi lại có xu hướng khiêm tốn thái quá vì họ hiểu rõ thế giới rộng lớn đến nhường nào.

Trong thám tử, đây là bẫy nguy hiểm nhất: Khi một nghi phạm (hoặc chính thám tử) quá tự tin vào suy luận của mình mà bỏ qua những bằng chứng hiển nhiên trái ngược.`,
    lessons: [
      'Càng biết ít, con người càng có xu hướng tự tin thái quá.',
      'Tri thức thực sự nằm ở việc biết rõ ranh giới của những gì mình không biết.',
      'Luôn nghi ngờ sự tự tin từ những người không có chuyên môn sâu.'
    ],
    warning: 'Nghiên cứu về sự ảo tưởng năng lực nhận thức.'
  },
  {
    id: 'arc_bystander',
    title: 'Hiệu ứng Người đứng xem',
    subtitle: 'Sự thờ ơ chết chóc của đám đông',
    caseCode: 'CASE-1964-GENOVESE',
    coverEmoji: '🚶‍♂️',
    summary: 'Vụ án Kitty Genovese: 38 nhân chứng đã đứng nhìn một vụ sát hại mà không ai gọi cảnh sát.',
    fullContent: `Năm 1964, Kitty Genovese bị tấn công và sát hại ngay bên ngoài căn hộ của mình ở New York. Điều gây sốc không chỉ là vụ án, mà là báo cáo cho thấy có tới 38 người hàng xóm đã nghe thấy tiếng kêu cứu hoặc nhìn thấy vụ việc nhưng không ai can thiệp.

Hai nhà tâm lý học Bibb Latané và John Darley đã nghiên cứu và phát hiện ra hiện tượng "Khuếch tán trách nhiệm". Khi ở trong một đám đông, mỗi cá nhân đều nghĩ rằng: "Chắc chắn sẽ có ai đó khác làm điều gì đó", dẫn đến việc cuối cùng không ai làm gì cả.

Đây là bài học xương máu cho thám tử: Trong một đám đông nhân chứng, đừng mong chờ sự tự giác, hãy chỉ đích danh một người để yêu cầu hỗ trợ.`,
    lessons: [
      'Đám đông càng lớn, xác suất mỗi cá nhân giúp đỡ càng thấp (Khuếch tán trách nhiệm).',
      'Sự thờ ơ không phải do độc ác, mà do tâm lý bầy đàn.',
      'Để nhận được sự giúp đỡ, hãy phá vỡ sự im lặng bằng cách chỉ định mục tiêu cụ thể.'
    ],
    warning: 'Nội dung về sự vô tâm của xã hội và các tình huống khẩn cấp.'
  },
  {
    id: 'arc_pavlov',
    title: 'Phản xạ Pavlov',
    subtitle: 'Cách bộ não bị lập trình bởi tiếng chuông',
    caseCode: 'CASE-1890-CONDITIONING',
    coverEmoji: '🔔',
    summary: 'Iván Pavlov đã chứng minh rằng hành vi của sinh vật có thể bị điều khiển bởi các tín hiệu vô thưởng vô phạt.',
    fullContent: `Iván Pavlov, một nhà sinh lý học người Nga, đã phát hiện ra "Phản xạ có điều kiện" thông qua các thí nghiệm với loài chó. Mỗi khi cho chó ăn, ông đều rung một chiếc chuông. 

Sau một thời gian, chỉ cần nghe tiếng chuông, con chó đã bắt đầu tiết nước bọt ngay cả khi không có thức ăn. Bộ não của nó đã tự động hình thành một liên kết thần kinh giữa "tiếng chuông" và "phần thưởng".

Trong tâm lý tội phạm, kẻ thao túng thường dùng kỹ thuật này để "huấn luyện" nạn nhân, tạo ra các phản ứng sợ hãi hoặc phục tùng mỗi khi một tín hiệu cụ thể xuất hiện.`,
    lessons: [
      'Hành vi có thể bị thay đổi thông qua sự lặp lại của các kích thích.',
      'Nhiều thói quen của chúng ta thực chất là các phản xạ bị lập trình từ môi trường.',
      'Nhận diện các "tiếng chuông" trong cuộc sống giúp bạn giành lại quyền kiểm soát bản thân.'
    ],
    warning: 'Nghiên cứu về tâm lý học hành vi và sự điều kiện hóa.'
  },
  {
    id: 'arc_cognitive_dissonance',
    title: 'Bất hòa nhận thức',
    subtitle: 'Nghệ thuật tự bào chữa của đối tượng',
    caseCode: 'CASE-1957-FESTINGER',
    coverEmoji: '🦊',
    summary: 'Tại sao chúng ta lại tin vào những lời nói dối của chính mình để cảm thấy dễ chịu hơn?',
    fullContent: `Leon Festinger đã đưa ra lý thuyết "Bất hòa nhận thức" để giải thích sự khó chịu khi một người nắm giữ hai niềm tin mâu thuẫn nhau hoặc thực hiện hành động trái với lương tâm.

Để giảm bớt sự căng thẳng này, não bộ có xu hướng bóp méo sự thật hoặc tìm ra những lý do "hợp lý" để biện minh cho hành động sai trái. Giống như con cáo trong truyện ngụ ngôn, khi không hái được nho, nó nói rằng "nho còn xanh lắm".

Thám tử lỗi lạc luôn tìm ra những điểm "Bất hòa nhận thức" trong lời khai của nghi phạm để ép chúng phải đối diện với sự thật.`,
    lessons: [
      'Con người thà thay đổi niềm tin còn hơn thừa nhận mình sai.',
      'Sự tự lừa dối là cơ chế bảo vệ lòng tự trọng phổ biến nhất.',
      'Lắng nghe những lời biện hộ phi logic để tìm ra sự thật ẩn giấu.'
    ],
    warning: 'Nghiên cứu về mâu thuẫn nội tâm và sự hợp lý hóa hành vi.'
  },
  {
    id: 'arc_halo_effect',
    title: 'Hiệu ứng Hào quang',
    subtitle: 'Cạm bẫy diện mạo của thám tử',
    caseCode: 'CASE-1920-THORNDIKE',
    coverEmoji: '✨',
    summary: 'Tại sao chúng ta thường tin rằng những người đẹp đẽ và lịch lãm cũng là những người thông minh và đạo đức?',
    fullContent: `Hiệu ứng Hào quang (Halo Effect) là một thiên kiến nhận thức, nơi đánh giá tích cực về một khía cạnh của một người (như ngoại hình) ảnh hưởng đến việc đánh giá toàn diện nhân cách của họ.

Edward Thorndike phát hiện ra rằng nếu một người trông có vẻ chuyên nghiệp và thu hút, chúng ta tự động gán cho họ các đức tính như: trung thực, thông minh và nhân hậu mà không cần bằng chứng.

Nghi phạm nguy hiểm nhất thường là kẻ trông hiền lành và lịch duyệt nhất. Đừng để "hào quang" che mắt lý trí thám tử của bạn.`,
    lessons: [
      'Vẻ bề ngoài là vũ khí ngụy trang lợi hại nhất của tội phạm.',
      'Đừng đánh giá năng lực hay đạo đức chỉ qua một ấn tượng ban đầu tốt đẹp.',
      'Chia tách các yếu tố đánh giá để có cái nhìn khách quan nhất.'
    ],
    warning: 'Nghiên cứu về thiên kiến nhận thức và sự đánh giá con người.'
  }
];
