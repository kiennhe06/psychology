export interface EffectModel {
  id: string;
  title: string;
  shortDescription: string;
  fullLesson: string;
  example: string;
  prevention: string;
  origin?: string;
  famousExperiment?: string;
  neuroImpact?: string;
  image?: any;
  category: string;
  isPremium?: boolean;
  premiumData?: {
    expertQuotes: string[];
    caseStudies: { title: string; content: string }[];
    tacticalBreakdown: { step: string; desc: string }[];
  }
}

export const PSY_EFFECTS: EffectModel[] = [
  {
    id: "e1",
    title: "Hiệu ứng Dunning-Kruger",
    shortDescription: "Ảo tưởng sức mạnh: Người kém cỏi thường đánh giá cao bản thân, trong khi người tài giỏi lại hay khiêm tốn.",
    fullLesson: "Hiệu ứng Dunning-Kruger mô tả một khuynh hướng nhận thức phổ biến. Những cá nhân có kiến thức hoặc năng lực thấp trong một lĩnh vực cụ thể thường gặp khó khăn trong việc đánh giá khách quan năng lực của chính mình. Sự thiếu hiểu biết này ngăn cản họ nhận ra những sai lầm cá nhân và khiến họ tự mãn. Ngược lại, những chuyên gia và người có kiến thức sâu rộng lại thường mắc hội chứng 'Kẻ mạo danh' (Imposter Syndrome) – họ cho rằng nếu một việc dễ với mình thì cũng sẽ dễ với người khác, từ đó đánh giá thấp năng lực của bản thân.",
    origin: "Được David Dunning và Justin Kruger thuộc Đại học Cornell mô tả khoa học lần đầu tiên vào năm 1999.",
    famousExperiment: "Trong một thử nghiệm nổi tiếng tại Đại học Cornell, sinh viên làm bài kiểm tra ngữ pháp, lô-gích và sự hài hước. Kết quả: Những sinh viên đạt điểm thấp nhất (tốp 12%) lại tự tin đánh giá mình nằm ở tốp xuất sắc nhất (tốp 62%).",
    neuroImpact: "Hiệu ứng này liên quan đến vùng vỏ não trước trán (Prefrontal Cortex) – nơi xử lý nhận thức siêu bản thân (Metacognition). Khi vùng này thiếu dữ kiện chuyên môn để phản tư, bộ não tự động lấp đầy khoảng trống bằng 'ảo tưởng tự tôn' như một cơ chế bảo vệ cái tôi (Ego defense).",
    example: "Một người vừa mới tham gia một khóa học đầu tư chứng khoán online trong 3 ngày đã tự tin rủ bạn bè hùn vốn mở quỹ, trong khi chuyên gia kinh tế 10 năm kinh nghiệm lại không dám dự đoán chắc chắn hướng đi của thị trường ngày mai.",
    prevention: "Hãy luôn tự nhủ rằng 'Càng học nhiều, ta càng thấy mình biết ít'. Hãy chủ động tìm kiếm các thông tin phản hồi từ những người có kinh nghiệm hơn và không ngừng tích lũy kiến thức.",
    image: require('../assets/images/Screenshot 2026-03-31 at 22.10.22.png'),
    category: "Nhận thức"
  },
  {
    id: "e2",
    title: "Hiệu ứng Hào quang (Halo Effect)",
    shortDescription: "Nhìn mặt bắt hình dong: Ấn tượng tốt ở một điểm khiến ta mặc định toàn bộ con người họ đều tốt.",
    fullLesson: "Hiệu ứng Hào quang (Halo Effect) là một dạng thành kiến nhận thức (cognitive bias), trong đó ấn tượng tổng thể về một người, một vật hoặc một thương hiệu ảnh hưởng trực tiếp đến cảm nhận, đánh giá của chúng ta về những nét tính cách hoặc tính năng cụ thể của người/vật đó. 'Hào quang' này làm che mờ sự thật, khiến ta dễ dàng bỏ qua hoặc biện minh cho những điểm yếu, khuyết điểm của đối tượng.",
    origin: "Thuật ngữ này được nhà tâm lý học Edward Thorndike đưa ra vào năm 1920 qua bài báo khoa học 'Lỗi thường gặp trong đánh giá tâm lý'.",
    famousExperiment: "Thorndike yêu cầu các sĩ quan chỉ huy đánh giá lính của họ về đa dạng các mặt: trí thông minh, thể chất, kỹ năng lãnh đạo. Kết quả là những người có 'ngoại hình và thể lực nổi bật' vô thức được sĩ quan đánh giá điểm rất cao cho mọi khía cạnh khác, dù chưa hề kiểm tra kỹ năng.",
    neuroImpact: "Não bộ con người luôn có xu hướng tiết kiệm năng lượng (Cognitive miser). Khi phát hiện ra một đặc điểm quá nổi bật và hấp dẫn, hạch hạnh nhân (Amygdala) và hệ viền kích hoạt cảm xúc tích cực mãnh liệt, chèn ép hoạt động phân tích logic của vỏ não, tự động kết luận các vùng thông tin khác.",
    example: "Khán giả thần tượng một diễn viên có ngoại hình đẹp và tự động tin rằng diễn viên đó cũng thông minh, tử tế chuẩn mực, dẫn đến việc họ bị sốc nặng và khó chấp nhận khi thần tượng đó vướng vòng lao lý hay bê bối lối sống.",
    prevention: "Nỗ lực phân tách các thuộc tính. Khi đánh giá năng lực một nhân sự, hãy nhìn vào số liệu khách quan, bảng mã nguồn, kết quả KPI thay vì đánh giá chỉ dựa trên phong thái tự tin hoặc ngoại hình sáng.",
    image: require('../assets/images/halo_effect_art_1774885089039.png'),
    category: "Cảm xúc"
  },
  {
    id: "e3",
    title: "Hiệu ứng Người ngoài cuộc (Bystander Effect)",
    shortDescription: "Phân tán trách nhiệm: Càng đông người, khả năng giúp đỡ một ai đó gặp nạn càng giảm.",
    fullLesson: "Hiệu ứng Người ngoài cuộc là một hiện tượng tâm lý xã hội nguy hiểm phá vỡ lòng trắc ẩn của đám đông. Nội dung chính của hiệu ứng là: Sự hiện diện của những người khác kìm hãm cá nhân trong việc can thiệp vào một tình huống khẩn cấp. Mỗi người trong đám đông đều tin rằng \"Ai đó khác có chuyên môn hơn, hoặc ở gần hơn sẽ can thiệp\", dẫn đến kết cục bi thảm là không một ai ra tay.",
    origin: "Được nghiên cứu mạnh mẽ và đặt tên sau vụ sát hại thảm khốc của cô gái Kitty Genovese năm 1964 tại New York, Mỹ.",
    famousExperiment: "Năm 1968, hai nhà tâm lý học John Darley và Bibb Latané thực hiện thí nghiệm cho khói tràn vào một căn phòng. Nếu chủ thể ở 1 mình, họ lập tức báo cáo trong vòng 2 phút. Nhưng nếu có thêm 2 diễn viên cố tình lờ đi coi như không có chuyện gì, thì chủ thể cũng sẽ ngồi im trong phòng có khói tới hơn 6 phút.",
    neuroImpact: "Khi gặp tình huống bất thường, não bắt đầu đánh giá tín hiệu xã hội (Social referencing). Nếu mắt thấy xung quanh ai cũng tỏ ra bình tĩnh (dù là giả tạo), não bộ diễn dịch rằng tín hiệu này không đủ nguy hiểm, từ đó giảm nhịp tim và không kích hoạt lượng Adrenaline cần thiết để hành động.",
    example: "Trông thấy một người đột quỵ trên phố đi bộ đông đúc, mọi người thường chạy chậm lại, cầm điện thoại quay phim hoặc nhìn lướt qua rồi đi tiếp dẫu biết họ đang gặp nguy hiểm tính mạng.",
    prevention: "Nếu bạn là nạn nhân: Đừng kêu cứu chung chung. Hãy chỉ định rành mạch một người cụ thể: 'Anh mặc áo đỏ đang đeo kính kia, xin giúp tôi gọi số cứu thương!'. Bạn sẽ phá vỡ sự phân tán trách nhiệm của người đó.",
    image: require('../assets/images/bystander_effect_art_1774885220936.png'),
    category: "Xã hội"
  },
  {
    id: "e4",
    title: "Hiệu ứng Pygmalion (Lời tiên tri Tự ứng nghiệm)",
    shortDescription: "Sự kỳ vọng cao của người khác có thể trực tiếp làm tăng năng lực và kết quả thực tế của một người.",
    fullLesson: "Pygmalion là hiệu ứng của sự kỳ vọng, mô tả sự thật rằng \"Bạn tin người khác ra sao, họ có xu hướng trở thành như thế ấy\". Những kỳ vọng tích cực thường mang lại hành vi tích cực. Sự vĩ đại của hiệu ứng này nằm ở quá trình tác động vi tế: Nếu bạn đánh giá cao học trò/nhân viên của mình, bạn sẽ vô thức trao cho họ ánh mắt tin tưởng hơn",
    origin: "Đặt theo tên của nhà điêu khắc Pygmalion trong thần thoại Hy Lạp, người yêu bức tượng mình tạc đến nỗi nó được thần linh ban cho sự sống.",
    famousExperiment: "Thí nghiệm Rosenthal-Jacobson ở trường học (1968): Các giáo viên được thông báo danh sách một nhóm học sinh 'có tiềm năng thiên tài rực rỡ' (thực chất chỉ là bốc thăm ngẫu nhiên). Chỉ sau một năm, đúng nhóm học sinh bình thường đó lại đạt chỉ số IQ tăng vọt vượt trội so với trường do cách giáo viên đối xử tin tưởng vô thức vào họ.",
    neuroImpact: "Sự tin tưởng và hỗ trợ của người khác giúp kích hoạt việc sản sinh hàm lượng Dopamine và Oxytocin trong não bộ, giảm stress, từ đó tăng độ mở của các vùng liên kết nơ-ron giúp người ta sáng tạo và ghi nhớ tuyệt vời hơn hẳn.",
    example: "Một quản lý dự án tin rằng anh lập trình viên mới là một 'thần đồng ẩn danh'. Người quản lý vô thức giao các dự án có tính thử thách cao và sẵn sàng lắng nghe lý luận của anh ta. Kết quả là lập trình viên đó phát triển thần tốc và trở thành nhân sự chủ chốt.",
    prevention: "Tuyệt đối cẩn trọng với mặt trái (Hiệu ứng Golem). Nếu bạn liên tục chỉ trích con cái bạn là 'đứa ngốc nghếch', chúng sẽ ngày một thui chột và thực sự hành xử ngốc nghếch chỉ để phù hợp với định kiến của bạn.",
    image: require('../assets/images/tientri.png'),
    category: "Cảm xúc"
  },
  {
    id: "e5",
    title: "Hiệu ứng Đám đông (Bandwagon Effect)",
    shortDescription: "Chúng ta thích đi theo số đông dẫu biết đôi lúc số đông sai lầm.",
    fullLesson: "Đây là một dạng thành kiến nhận thức liên quan đến tâm lý bầy đàn, trong đó tỷ lệ tiếp nhận niềm tin, xu hướng, hoặc trào lưu tăng tỷ lệ thuận với số người đã làm điều đó. Chúng ta bị thôi thúc bỏ học, mua sắm sai lệch, hay tin vào tin giả vì không chịu được áp lực trở thành kẻ đi ngược dòng.",
    example: "Xếp hàng đếm tiếng đồng hồ để mua một cốc trà sữa đang hot trên mạng xã hội dẫu không thực sự thích ngọt, chỉ vì thấy ai cũng 'check-in'.",
    prevention: "Tạm dừng 24 giờ trước khi ra bất cứ quyết định mua sắm hoặc gia nhập trào lưu gì. Hãy dùng 'logic bậc 2' để đánh giá.",
    image: require('../assets/images/đamong.png'),

    category: "Nhận thức"
  },
  // Thêm 10 hiệu ứng mới vào PSY_EFFECTS array

  {
    id: "e6",
    title: "Hiệu ứng Mỏ neo (Anchoring Effect)",
    shortDescription: "Con số đầu tiên bạn nghe sẽ vô thức trở thành 'mỏ neo' ảnh hưởng đến mọi quyết định tiếp theo.",
    fullLesson: "Hiệu ứng Mỏ neo mô tả xu hướng con người phụ thuộc quá nhiều vào thông tin đầu tiên được tiếp nhận (gọi là 'mỏ neo') khi đưa ra quyết định. Dù thông tin sau đó có đầy đủ và chính xác hơn, não bộ vẫn liên tục so sánh mọi thứ với cái mỏ neo ban đầu đó. Đây là vũ khí lợi hại mà các nhà kinh doanh, đàm phán và marketing sử dụng hàng ngày để dẫn dắt quyết định của khách hàng.",
    origin: "Được phát hiện bởi hai nhà tâm lý học Amos Tversky và Daniel Kahneman vào năm 1974 trong nghiên cứu về heuristics và thành kiến nhận thức.",
    famousExperiment: "Kahneman yêu cầu người tham gia quay một bánh xe số (được gian lận để chỉ dừng ở 10 hoặc 65), sau đó đoán tỷ lệ phần trăm các quốc gia châu Phi trong Liên Hợp Quốc. Những người thấy số 65 đưa ra con số trung bình là 45%, trong khi nhóm thấy số 10 chỉ đoán 25% — dù bánh xe hoàn toàn không liên quan.",
    neuroImpact: "Vùng vỏ não trước trán xử lý thông tin mới luôn bị 'kéo về' bởi ký ức ngắn hạn lưu trữ thông tin đầu tiên. Đây là cơ chế tiết kiệm năng lượng của não — thay vì xử lý từ đầu, não dùng mỏ neo như một điểm xuất phát để tính toán nhanh hơn.",
    example: "Một chiếc áo được ghi giá gốc 2.000.000đ, nay sale còn 800.000đ. Bạn cảm thấy hời dù thực ra 800.000đ vẫn là mức giá cao. Con số 2.000.000đ đã trở thành mỏ neo trong đầu bạn.",
    prevention: "Trước khi ra quyết định, hãy tự hỏi: 'Con số này xuất hiện từ đâu? Nó có thực sự liên quan đến giá trị thật không?' Hãy nghiên cứu mức giá thị trường độc lập trước khi bước vào bất kỳ cuộc đàm phán nào.",
    image: require('../assets/images/moNeo.png'),
   
    category: "Nhận thức"
  },
  {
    id: "e7",
    title: "Hiệu ứng Xác nhận (Confirmation Bias)",
    shortDescription: "Chúng ta vô thức chỉ tìm kiếm và tin vào những thông tin đồng ý với niềm tin sẵn có của mình.",
    fullLesson: "Confirmation Bias là xu hướng tìm kiếm, diễn giải, và ghi nhớ thông tin theo cách xác nhận hoặc hỗ trợ những niềm tin, quan điểm ban đầu của mình. Đây là một trong những thành kiến nhận thức nguy hiểm nhất vì nó hoạt động hoàn toàn vô thức và rất khó nhận ra ở bản thân. Nó là nguyên nhân chính dẫn đến những buồng vang (echo chamber) trên mạng xã hội và sự phân cực trong xã hội.",
    origin: "Khái niệm này được nhà tâm lý học Peter Wason nghiên cứu từ năm 1960 qua các thí nghiệm về lý luận và tư duy.",
    famousExperiment: "Thí nghiệm Wason Selection Task: Người tham gia được cho 4 lá bài và một quy tắc. Phần lớn chỉ lật những lá bài có thể 'xác nhận' quy tắc thay vì lật những lá có thể 'bác bỏ' nó — dù về mặt logic, bác bỏ mới là cách kiểm tra đúng.",
    neuroImpact: "Khi gặp thông tin trái chiều, hạch hạnh nhân (Amygdala) kích hoạt phản ứng đe dọa nhẹ. Não bộ trải nghiệm sự bất hòa nhận thức như một cơn đau nhẹ và tự động tìm cách giảm đau bằng cách bác bỏ thông tin đó.",
    example: "Một người tin rằng một loại thực phẩm chức năng có tác dụng kỳ diệu. Họ sẽ đọc kỹ mọi bài đánh giá 5 sao, nhưng gạt đi các nghiên cứu khoa học phủ nhận công dụng của nó là 'tin giả do đối thủ tung ra'.",
    prevention: "Hãy chủ động tìm kiếm những bằng chứng có thể bác bỏ niềm tin của bạn. Đặt câu hỏi: 'Điều gì sẽ khiến mình thay đổi quan điểm này?' Nếu không có câu trả lời, đó là dấu hiệu bạn đang bị Confirmation Bias chi phối.",
    image: require('../assets/images/xacnhan.png'),
    
    category: "Nhận thức"
  },
  {
    id: "e8",
    title: "Hiệu ứng Spotlight (Spotlight Effect)",
    shortDescription: "Bạn nghĩ mọi người đang chú ý đến bạn nhiều hơn thực tế — chiếc đèn sân khấu chỉ tồn tại trong đầu bạn.",
    fullLesson: "Hiệu ứng Spotlight mô tả xu hướng con người tin rằng mình đang bị người khác chú ý, quan sát và đánh giá nhiều hơn thực tế rất nhiều. Chúng ta đặt bản thân vào trung tâm của sân khấu tưởng tượng và mặc định mọi người đều đang 'chiếu đèn' vào mình. Thực tế, mỗi người đều đang bận rộn với vở kịch của riêng họ và hiếm khi thực sự chú ý đến bạn như bạn nghĩ.",
    origin: "Được nghiên cứu bởi Thomas Gilovich và Kenneth Savitsky tại Đại học Cornell vào năm 1999.",
    famousExperiment: "Sinh viên được yêu cầu mặc áo có in hình Barry Manilow (một nhân vật họ thấy 'xấu hổ') vào lớp học. Họ ước tính khoảng 50% bạn học sẽ nhận ra chiếc áo, nhưng thực tế chỉ có 25% để ý.",
    neuroImpact: "Não bộ có xu hướng lấy bản thân làm trung tâm tham chiếu (Egocentric bias). Vùng vỏ não liên quan đến nhận thức xã hội liên tục mô phỏng cái nhìn của người khác về mình, nhưng luôn phóng đại mức độ chú ý của họ.",
    example: "Bạn vấp ngã trên đường, mặt đỏ bừng và nghĩ cả phố đang nhìn và cười mình. Thực tế, hầu hết người đi đường đang mải nghĩ về bữa trưa hoặc deadline công việc của họ.",
    prevention: "Nhắc nhở bản thân: 'Mọi người đều đang bận với cuộc sống của họ'. Hãy quan sát xem bạn có thực sự nhớ những lần người khác vấp ngã hay mắc lỗi nhỏ mà bạn chứng kiến không — câu trả lời thường là không.",
    image: require('../assets/images/spolite.png'),
   
    category: "Cảm xúc"
  },
  {
    id: "e9",
    title: "Hiệu ứng Sunk Cost (Chi phí chìm)",
    shortDescription: "Chúng ta tiếp tục đầu tư vào thứ thua lỗ chỉ vì đã lỡ bỏ quá nhiều vào đó — dù biết càng đi càng lỗ.",
    fullLesson: "Sunk Cost Fallacy là xu hướng tiếp tục một hành động, dự án, hoặc mối quan hệ vì những nguồn lực đã bỏ ra (tiền bạc, thời gian, công sức) không thể lấy lại được, thay vì đánh giá tương lai một cách khách quan. Đây là cái bẫy cảm xúc khiến con người tiếp tục ném tiền vào một canh bạc thua, xem tiếp một bộ phim dở tệ, hoặc ở lại trong một mối quan hệ độc hại.",
    origin: "Khái niệm này xuất phát từ kinh tế học hành vi, được phổ biến qua nghiên cứu của Arkes và Blumer vào năm 1985.",
    famousExperiment: "Người tham gia được hỏi: 'Bạn đã mua vé trượt tuyết 100$ cho kỳ nghỉ tuần tới, nhưng hôm nay bạn mua được vé cho kỳ nghỉ đẹp hơn nhiều giá 50$. Bạn chọn cái nào?' Hầu hết chọn kỳ nghỉ đắt hơn dù kỳ nghỉ rẻ hơn thực sự tốt hơn — chỉ vì không muốn 'lãng phí' 100$.",
    neuroImpact: "Mất mát kích hoạt vùng Insula — vùng não liên quan đến đau đớn và ghê tởm. Não bộ xử lý 'lãng phí' như một cơn đau thực sự, khiến chúng ta liều lĩnh tiếp tục để tránh cảm giác đau đó.",
    example: "Bạn đã học một ngành đại học 3 năm và nhận ra mình không có đam mê với nó, nhưng vẫn tiếp tục học hết vì 'đã mất 3 năm rồi'. Thực ra, 3 năm đó đã mất rồi — điều quan trọng là 1-2 năm tiếp theo bạn sẽ làm gì.",
    prevention: "Hỏi bản thân: 'Nếu hôm nay là ngày đầu tiên mình biết đến dự án/mối quan hệ này, mình có bắt đầu lại không?' Nếu câu trả lời là không, hãy dũng cảm cắt lỗ và bắt đầu lại.",
    image: require('../assets/images/chiphi.png'),
    
    category: "Nhận thức"
  },
  // ─── Premium Effects (Shop Unlockable) ──────────────────────────────────
  {
    id: "arc_stockholm",
    title: "Hội Chứng Stockholm",
    shortDescription: "Vì sao nạn nhân lại nảy sinh tình cảm và đồng cảm với kẻ bắt cóc hoặc bạo hành mình?",
    fullLesson: "Hội chứng Stockholm là một phản ứng tâm lý kỳ lạ trong đó nạn nhân phát triển sự gắn kết và lòng trung thành với kẻ đã giam giữ hoặc bạo hành họ. Dưới áp lực sinh tồn tột độ và sự cô lập hoàn toàn, trí não nạn nhân tự động thiết lập một cơ chế phòng vệ: việc kẻ thù không giết mình được coi như một 'hành động nhân từ', từ đó sinh ra lòng biết ơn và sự phụ thuộc.",
    origin: "Tên gọi xuất phát từ vụ cướp ngân hàng Kreditbanken tại Stockholm, Thụy Điển năm 1973. Con tin bênh vực kẻ cướp và từ chối lời khai chống lại chúng trước tòa.",
    famousExperiment: "Không có thực nghiệm vì lý do đạo đức, nhưng được quan sát và phân tích trong hàng ngàn vụ bắt cóc và quan hệ bạo hành gia đình.",
    neuroImpact: "Ở trạng thái ngập tràn Adrenaline và Cortisol vì sợ hãi, bất kỳ hành động nhỏ nào giảm bớt sự sợ hãi đó (như cho uống nước) sẽ kích hoạt một lượng lớn Dopamine và Oxytocin. Não bộ nhầm lẫn sự 'giải tỏa cơn sợ hãi' này thành 'tình yêu' hay 'lòng tốt'.",
    example: "Một người bị bạo hành thời gian dài nhưng liên tục tìm lý do biện minh cho kẻ đánh mình là vì 'áp lực công việc', đồng thời từ chối sự giúp đỡ của bạn bè.",
    prevention: "Hãy duy trì liên lạc với thế giới quan khách quan bên ngoài và không bao giờ cách ly bản thân khỏi những người thực sự yêu thương bạn.",
    image: require('../assets/images/Stockholmdark.png'),
    category: "Cảm xúc",
    isPremium: true,
    premiumData: {
      expertQuotes: [
        '"Đó không phải là tình yêu, đó là chiến lược sinh tồn phi nhận thức của não bộ trong tuyệt vọng." – Tiến sĩ Frank Ochberg',
        '"Khi hy vọng duy nhất của bạn là kẻ đang nắm giữ tính mạng bạn, sự phản kháng trở thành mối đe dọa sinh tồn lớn nhất." – M.A. Dutton'
      ],
      caseStudies: [
        {
          title: "Hồ Sơ Mật: Vụ Án Patty Hearst (1974)",
          content: "Nữ thừa kế tỷ phú Patty Hearst bị nhóm cực đoan SLA bắt cóc. Sau 2 tháng bị biệt giam trong tủ kín và đe dọa, cô tuyên bố gia nhập chính tổ chức SLA và tham gia cầm súng cướp ngân hàng cùng kẻ bắt cóc mình. Khi bị FBI bắt, Patty khai tên mình là 'Tania' (bí danh SLA đặt cho) và bảo vệ những kẻ bắt cóc đến cùng."
        },
        {
          title: "Hồ Sơ Lâm Sàng: Bạo Hành Gia Đình Góc Khuất",
          content: "Trong 65% trường hợp Bạo hành Gia đình nghiêm trọng, nạn nhân (đã được cách ly tại Shelter) có nỗ lực bỏ trốn về lại với kẻ bạo hành. Kẻ bạo hành thực hiện 'Vòng lặp': Đánh đập dã man -> Xin lỗi/Tặng quà. Não bộ nạn nhân rơi vào trạng thái nghiện hormone (Trauma Bonding), họ ghi nhớ mãnh liệt 'khoảnh khắc món quà' và xóa bỏ ký ức đòn roi."
        }
      ],
      tacticalBreakdown: [
        { step: "1. Đe dọa Sinh tồn", desc: "Nạn nhân tin chắc rằng tính mạng (hoặc thể xác/tinh thần) của mình đang bị kẻ thao túng đe dọa thường trực." },
        { step: "2. Cách ly Không gian", desc: "Cắt đứt toàn bộ liên lạc với thế giới bên ngoài (gia đình, bạn bè) để thế giới quan duy nhất của nạn nhân là thế giới quan của thủ phạm." },
        { step: "3. Ban phát Ân huệ Nhỏ", desc: "Thủ phạm thực hiện một hành động tử tế nhỏ nhoi (cho ăn, không đánh, nói lời ngọt ngào). Trong hoảng loạn, não nạn nhân phóng đại hành động này thành 'ơn cứu mạng'." },
        { step: "4. Đồng hóa Tâm lý", desc: "Nạn nhân bắt đầu nhìn thế giới thông qua góc nhìn của thủ phạm, đồng tình với lý do phạm tội để biện minh cho sự tồn tại của chính mình." }
      ]
    }
  },
  {
    id: "premium_gaslighting",
    title: "Thao Túng Tâm Lý (Gaslighting)",
    shortDescription: "Bí thuật tẩy não khiến bạn nghi ngờ chính trí nhớ, nhận thức và sự tỉnh táo của mình.",
    fullLesson: "Gaslighting là một hình thức thao túng tâm lý thâm độc. Kẻ thao túng liên tục tiêm nhiễm thông tin sai lệch, phủ nhận sự thật và đổ lỗi ngược lại để khiến nạn nhân hoài nghi về trí nhớ, lý trí và cuối cùng là sức khỏe tâm thần của họ. Bản chất của gaslighting là sự kiểm soát và phá vỡ cấu trúc thực tại của nạn nhân.",
    origin: "Lấy cảm hứng từ vở kịch 'Gas Light' năm 1938, nơi người chồng liên tục giảm ánh sáng đèn ga đi nhưng thuyết phục vợ rằng đèn không hề mờ đi, khiến cô tưởng bị điên.",
    famousExperiment: "Thường được nghiên cứu qua các tình huống lâm sàng (Clinical Psychology), đặc biệt ở những người có Rối loạn nhân cách Ái kỷ (NPD).",
    neuroImpact: "Sự mâu thuẫn nhận thức liên tục làm cạn kiệt năng lượng của Vỏ não trước trán. Lúc này nạn nhân đánh mất tư duy phản biện và phụ thuộc vào góc nhìn của kẻ thao túng.",
    example: "A: 'Anh lại nói dối em chuyện này'. B: 'Em lại hoang tưởng rồi, anh chưa bao giờ nói thế, em bị stress nên tưởng tượng ra đấy!'.",
    prevention: "Ghi chép lại mọi thứ (nhật ký, voice note), tin tưởng vào trực giác của bạn. Luôn tìm 'nhân chứng thứ ba' khách quan.",
    image: require('../assets/images/thaotung.png'),

    category: "Xã hội",
    isPremium: true,
    premiumData: {
      expertQuotes: [
        '"Kẻ thao túng không cần phá hủy bạn. Họ chỉ cần bạn tự tay phá hủy niềm tin vào chính mình." – Tiến sĩ Robin Stern',
        '"Gaslighting là một cuộc thảm sát giấu mặt vào linh hồn nạn nhân, không để lại vết bầm tím nhưng vĩnh viễn thay đổi thực tại của họ." – Tiến sĩ Ramani Durvasula'
      ],
      caseStudies: [
        {
          title: "Hồ Sơ Nhức Nhối: Hội chứng Cửa sổ Kính",
          content: "Trong một nghiên cứu của ĐH Harvard, các nhân viên bị sếp áp dụng Gaslighting trong 6 tháng đã có biểu hiện sa sút trí tuệ tạm thời. Sếp liên tục giao việc qua lời nói (không email), sau đó mắng nhân viên làm sai và khẳng định 'Tôi đã dặn kỹ là làm cách B cơ mà, trí nhớ cậu có vấn đề à?'. Sau 1 tuần, 80% nhân viên bắt đầu nghĩ mình bị Alzheimer sớm."
        },
        {
          title: "Hồ Sơ Mật: Cuộc Thẩm Vấn 'Căn Phòng Trắng'",
          content: "Trong chiến tranh, tù nhân bị nhốt ở phòng không cửa sổ. Cai ngục liên tục thay đổi giờ ăn và tắt đèn ngẫu nhiên, sau đó nói với tù binh rằng họ mới bị nhốt 2 ngày (thực tế là 2 tuần). Mất đi nhận thức về thời gian vật lý, tù binh buông xuôi và tin tuyệt đối vào lời cai ngục, dẫn đến cung cấp thông tin mật."
        }
      ],
      tacticalBreakdown: [
        { step: "1. Vòng lặp Phủ nhận Trắng trợn", desc: "Nói dối vào thẳng mặt nạn nhân trơn tru. Khi bị tóm lấy bằng chứng rành rành, thủ phạm gạt đi như thể nạn nhân mới là người bị ảo giác." },
        { step: "2. Chiến thuật 'Mưa Dầm Thấm Lâu'", desc: "Không thao túng một câu lớn, mà thả những nghi ngờ nhỏ giọt hàng ngày: 'Em lại nhớ nhầm rồi', 'Dạo này em lạ lắm', 'Hình như tâm lý em không ổn'." },
        { step: "3. Cô lập Nhận thức", desc: "Thủ phạm nói với nạn nhân rằng: 'Bạn bè em nói xấu em đấy', 'Bố mẹ em không hiểu em đâu, chỉ có anh mới biết em đang bị vấn đề tâm lý nặng'." },
        { step: "4. Hoán đổi Nạn nhân (DARVO)", desc: "Deny (Phủ nhận) - Attack (Tấn công lại) - Reverse Victim and Offender (Đảo ngược Nạn nhân vả Kẻ tấn công). Thủ phạm diễn vai bị tổn thương do sự hoang tưởng của nạn nhân gây ra." }
      ]
    }
  },
  {
    id: "premium_nocebo",
    title: "Hiệu Ứng Vô Dược (Nocebo Effect)",
    shortDescription: "Sát thủ ảo mộng: Tổn thương thực thể và cái chết có thể xảy ra chỉ nhờ sức mạnh của nền tin tiêu cực.",
    fullLesson: "Nocebo là 'người anh em song sinh bóng tối' của Placebo (Hiệu ứng giả dược). Nếu Placebo dùng niềm tin tích cực để tự chữa lành, thì Nocebo là hiện tượng cơ thể thực sự bị tổn thương hoặc tạo ra triệu chứng tồi tệ chỉ vì tin rằng một cái gì đó có hại đang tác động vào mình, dù thứ thật sự tác động hoàn toàn vô hại.",
    origin: "Thuật ngữ 'Nocebo' ('Tôi sẽ gây hại') được đưa ra vào năm 1961 để phân biệt với 'Placebo' ('Tôi sẽ làm vui lòng').",
    famousExperiment: "Người tham gia bị chạm bằng lá nhựa nhân tạo nhưng được thông báo đó là cây thường xuân độc. Phản ứng: Khắp da họ thật sự mẩn đỏ và ngứa rát y hệt.",
    neuroImpact: "Niềm tin của não rằng cơ thể đang bị tấn công khởi động trục HPA, tiết lượng lớn hormone căng thẳng (Cortisol & Adrenaline), tự động kích hoạt phản ứng sinh lý, sốt, đau do não truyền lệnh nhầm.",
    example: "Bạn đọc tác dụng phụ của một loại vitamin là 'gây nhức đầu'. Dù viên bạn uống chỉ là một viên kẹo đường bọc vỏ ai đó trêu, bạn vẫn đau đầu quằn quại.",
    prevention: "Hiểu ranh giới giữa triệu chứng vật lý và phản ứng tâm lý. Ngưng việc tự tra Google bệnh (Cyberchondria).",
    image: require('../assets/images/voduong.png'),
    
    category: "Nhận thức",
    isPremium: true,
    premiumData: {
      expertQuotes: [
        '"Từ ngữ của bác sĩ có thể là con dao phẫu thuật vô hình. Một lời chẩn đoán tiêu cực sai lầm có thể giết chết bệnh nhân trước cả khi căn bệnh thực sự bắt đầu." – Dr. Fabrizio Benedetti',
        '"Bộ não không phân biệt được mối đe dọa tưởng tượng và mối đe dọa thực tế. Nó sẽ phản ứng vật lý với cả hai." – Dr. Joe Dispenza'
      ],
      caseStudies: [
        {
          title: "Hồ Sơ Mật: Liều Thuốc Độc Đường (Mr. A)",
          content: "Ông A tham gia thử nghiệm thuốc trầm cảm. Sau khi cãi nhau với vợ, ông tuyệt vọng lao đến uống toàn bộ 26 viên thuốc còn lại để tự tử. Ông được đưa vào cấp cứu với triệu chứng huyết áp tụt giảm nghiêm trọng, nhịp tim cực nhanh, khó thở và suýt tử vong. Bác sĩ trưởng phòng xét nghiệm phát hiện ra ông thuộc nhóm 'Đối chứng' – 26 viên thuốc ông uống hoàn toàn chỉ là đường (Placebo pill). Ảo giác 'đang bị trúng độc' của bộ não đã ép cơ thể tắt các cơ quan nội tạng. Sau khi được cho biết sự thật, ông A bình phục trong 15 phút."
        },
        {
          title: "Hồ Sơ Lâm Sàng: Lời Nguyền Voodoo",
          content: "Các tài liệu y khoa từ thời Victoria ghi nhận 'Cái chết Voodoo': Khi thủ lĩnh bộ lạc chỉ một khúc xương chứa lời nguyền vào người khỏe mạnh, người đó kinh hãi tột độ, cự tuyệt đồ ăn và thực sự tự chết trong vài ngày. Khoa học hiện đại giải thích dòng thác giao cảm (Sympathetic Nervous System overdrive) do hoảng sợ tột độ đã gây co thắt mạch máu, phá vỡ nội tạng từ bên trong mà không có yếu tố độc tố nào."
        }
      ],
      tacticalBreakdown: [
        { step: "1. Vết thương Ngôn từ", desc: "Yếu tố kích hoạt ban đầu thường là một 'lời ám thị' hoặc một thông tin y tế đáng sợ (đọc bài viết về ung thư, nghe chẩn đoán bệnh từ lang băm)." },
        { step: "2. Chuyển hóa Mầm mống (Somatic Amplification)", desc: "Sự chú ý thái quá của não tập trung vào các triệu chứng nhỏ nhặt nhất trong cơ thể (như hơi hơi đau bụng, hơi mỏi cổ) và khuếch đại tín hiệu đau đó lên 100 lần." },
        { step: "3. Hóa chất Suy giảm Vòng lặp", desc: "Sự sợ hãi liên tục báo động Dưới đồi (Hypothalamus) tạo ra một vòng lặp kín. Tim đập nhanh do lo lắng lại càng củng cố giả thuyết 'mình đang mắc bệnh tim'." },
        { step: "4. Tử vong Thực thể Chuyển đổi", desc: "Ở giai đoạn tột cùng, hệ miễn dịch sụp đổ thực sự hoặc xuất hiện nhồi máu cơ tim do stress tích tụ từ 'sự lo sợ về căn bệnh' chứ không phải từ vi khuẩn." }
      ]
    }
  },
  {
    id: "premium_dark_triad",
    title: "Tam Giác Đen (Dark Triad)",
    shortDescription: "Sự kết hợp hoàn hảo của bóng tối tâm hồn: Machiavellianism, Ái kỷ và Bệnh lý tâm thần.",
    fullLesson: "Tam giác đen (Dark Triad) là một khái niệm trong tâm lý học chỉ nhóm ba đặc điểm tính cách tiêu cực cốt lõi: Machiavellianism (Thủ đoạn tàn nhấn), Narcissism (Ái kỷ), và Psychopathy (Bệnh lý tâm thần). Những người sở hữu mức độ cao của cả ba đặc điểm này thường là những kẻ bóc lột, thao túng và thiếu đồng cảm ở mức độ nguy hiểm, nhưng lại thường ẩn nấp dưới vẻ ngoài quyến rũ hoặc thành đạt.",
    origin: "Được đặt tên bởi Delroy L. Paulhus và Kevin M. Williams vào năm 2002.",
    famousExperiment: "Nhiều nghiên cứu tội phạm học chỉ ra rằng những kẻ lừa đảo tài chính trứ danh (ví dụ, mô hình Ponzi) thường đạt điểm cực kỳ tối đa trong thang đo Dark Triad. Khả năng nói dối không chớp mắt (Psychopathy), tin rằng mình thượng đẳng xứng đáng với tiền của người khác (Narcissism) và kỹ năng thao túng kế toán tinh vi (Machiavellianism) tạo thành một 'cơn bão hoàn hảo'.",
    neuroImpact: "Ảnh chụp fMRI cho thấy những người này có lượng xám mỏng hơn hoặc hoạt động rất yếu ở vùng vỏ não trán ổ mắt (orbitofrontal cortex) - vùng liên quan đến đạo đức, thấu cảm và kiểm soát bốc đồng. Khi đứng trước nỗi đau của người khác, não họ không 'phast tín hiệu buồn bã' mà thậm chí kích hoạt hệ thống phần thưởng.",
    example: "Một vị sếp hào nhoáng, luôn tranh công người khác trước mặt CEO, lạnh lùng sa thải nhân viên không thương tiếc mà không bao giờ cảm thấy cắn rứt, đồng thời sử dụng mọi thủ đoạn chính trị công sở để leo lên ngai vàng.",
    prevention: "Hãy thiết lập ranh giới cứng rắn. Bạn không thể 'chữa lành' những người này bằng tình yêu thương; sự đồng cảm của bạn chỉ là miếng mồi ngon cho họ. Nếu phát hiện ra, 'Chạy ngay đi' là chiến lược sinh tồn tốt nhất.",
    image: require('../assets/images/tamgiac.png'),
    category: "Nhận thức",
    isPremium: true,
    premiumData: {
      expertQuotes: [
        "\"Kẻ tâm thần không cảm nhận được ngọn lửa; hắn chỉ thích thú nhìn nó thiêu rụi người khác.\" – Dr. Robert Hare",
        "\"Sự ác độc không phải lúc nào cũng mang khuôn mặt quỷ dữ. Đôi khi nó mặc một bộ vest hoàn hảo và nở một nụ cười ấm áp nhất.\" – Robert Greene"
      ],
      caseStudies: [
        {
          title: "Hồ Sơ Mật: Kẻ Săn Mồi Công Sở",
          content: "Peter - một Giám đốc Marketing, luôn được CEO khen ngợi vì tài 'ăn nói'. Tuy nhiên, đằng sau đó là một lịch sử thao túng tàn độc. Anh ta cố tình gửi email công việc sai giờ cho cấp dưới (Machiavellianism), luôn đòi hỏi sự tôn thờ tuyệt đối và vắt kiệt sức lao động của team (Narcissism). Khi một nhân viên kiệt sức phải nhập viện, anh ta buông lời thản nhiên: 'Kẻ yếu thì phải bị đào thải thôi' (Psychopathy). Team của anh ta tuy đạt chỉ số cực cao ngắn hạn nhưng có tỷ lệ nghỉ việc 80% mỗi quý."
        }
      ],
      tacticalBreakdown: [
        { step: "1. Vẻ Ngoài Hào Nhoáng", desc: "Sử dụng sự tự tin giả tạo (Narcissism) và sức hút ban đầu (Superficial Charm của Psychopathy) để xây dựng niềm tin." },
        { step: "2. Cô Lập Nạn Nhân", desc: "Dùng các chiến thuật chia rẽ và tung tin đồn (Machiavellianism) để cắt đứt nạn nhân khỏi các nguồn hỗ trợ bên ngoài." },
        { step: "3. Bóp Méo Giá Trị", desc: "Cho nạn nhân thấy rằng họ chỉ có giá trị khi phục tùng ý muốn của tổ chức/cá nhân đó, khai thác nỗi sợ hãi." },
        { step: "4. Rời Bỏ Tàn Nhẫn", desc: "Khi nạn nhân đã cạn kiệt giá trị lợi dụng, kẻ Dark Triad dứt áo ra đi không một sự hối tiếc và đổ toàn bộ lỗi lầm ngược lại cho nạn nhân." }
      ]
    }
  },
  {
    id: "premium_helplessness",
    title: "Bất Lực Tập Nhiễm (Learned Helplessness)",
    shortDescription: "Tâm lý buông xuôi: Tại sao con người lại chấp nhận chịu đựng thảm cảnh khi họ hoàn toàn có thể trốn thoát?",
    fullLesson: "Bất lực tập nhiễm là tình trạng tâm lý khi một sinh vật (động vật hoặc con người) phải chịu đựng những tác nhân gây căng thẳng (stress) hoặc đau đớn lặp đi lặp lại một cách bất khả kháng. Khi học được rằng 'mọi nỗ lực của tôi đều không thể thay đổi được kết quả', não bộ sẽ ngắt bỏ động lực chiến đấu hoặc bỏ chạy (fight or flight). Kết quả là, ngay cả khi hoàn cảnh đã thay đổi và có lối thoát mở sẵn trước mắt, họ vẫn sẽ thụ động và chấp nhận nỗi đau.",
    origin: "Được phát hiện bởi tiến sĩ Martin Seligman vào cuối những năm 1960 trong các thí nghiệm về sự điều kiện hóa.",
    famousExperiment: "Hai nhóm chó bị chích điện. Nhóm 1 có thể dùng mũi ấn nút để tắt điện. Nhóm 2 không có nút tắt. Giai đoạn sau, cả 2 nhóm được đưa vào lồng có rào chắn hờ (chỉ cần nhảy nhẹ để sang phía không có điện). Khi bật điện, bầy chó nhóm 1 ngay lập tức nhảy qua rào để thoát. Đáng sợ thay, bầy chó nhóm 2 chỉ nằm yên dưới sàn chịu đựng dòng điện.",
    neuroImpact: "Căng thẳng kéo dài không kiểm soát làm kiệt quệ sự truyền dẫn Serotonin và gia tăng lượng Cortisol khổng lồ. Lúc này, vùng viền hạch (amygdala) bị quá tải, khiến vỏ não trước trán (trung tâm tư duy logic) đầu hàng, tạo ra 'đám mây trầm cảm' bao phủ toàn bộ vùng nhận thức.",
    example: "Một nhân viên đã nhiều năm làm việc dưới trướng một vị sếp độc hại chửi bới vô cớ. Sau nhiều lần cố gắng cãi lại hoặc làm tốt hơn đều vẫn bị mắng, anh ta tin rằng mình là 'đồ bỏ đi vô sinh' và không buồn tìm cách nộp CV đi công ty khác, dù chuyên môn của anh ta dư sức được trải thảm đỏ.",
    prevention: "Hãy luyện tập 'Sự lạc quan tập nhiễm' (Learned Optimism). Nhận thức rằng những thất bại là tạm thời, cục bộ (chỉ ở mảng này) và không mang tính quy kết cá nhân (không phải do mình ngu). Tự tạo những 'chiến thắng siêu nhỏ' để chứng minh não bộ thấy rành bạn vẫn đang nắm quyền kiểm soát.",
    image: require('../assets/images/batluc.png'),

    category: "Cảm xúc",
    isPremium: true,
    premiumData: {
      expertQuotes: [
        "\"Trầm cảm không hoàn toàn là nỗi buồn; đó là sự tê liệt của nhận thức, là một niềm tin sâu sắc rằng không một động thái nào có thể cứu rỗi được mình.\" – Dr. Martin Seligman",
        "\"Khi bạn đã tin mình bị nhốt trong lồng, thì ngay cả khi cánh cửa mở tung, tâm trí bạn vẫn vẽ ra những song sắt tàng hình.\" – Unknown"
      ],
      caseStudies: [
        {
          title: "Hồ Sơ Lâm Sàng: Chiếc Xích Con Voi",
          content: "Ở Ấn Độ, người ta trói một con voi nhỏ bằng một sợi xích sắt vĩ đại. Con voi con vùng vẫy muốn thoát kéo hỏng cả chân mình. Lâu ngày, nó học được rằng sợi xích là không thể phá vỡ (Bất lực tập nhiễm). Đến khi con voi lớn lên thành một quái thú khổng lồ có sức bẻ gãy cả cổ thụ, người quản tượng chỉ cần trói nó bằng một... sợi dây thừng mong manh xâu vào cái cọc tre bé tí. Con voi khổng lồ đó sẽ đứng im không dám di chuyển, bởi thực chất tâm trí nó vẫn đang bị trói bởi sợi xích trong quá khứ."
        }
      ],
      tacticalBreakdown: [
        { step: "1. Vô Lực Hóa", desc: "Tạo ra môi trường nơi bất cứ phản ứng nào cũng sai hoặc không mang lại kết quả tích cực dù tốn bao nhiêu công sức." },
        { step: "2. Thu Hẹp Tâm Trí", desc: "Giới hạn tầm nhìn, để đối tượng chỉ tin vào một hướng, liên tục dập tắt các phản hồi để hình thành phản xạ thụ động." },
        { step: "3. Tẩy Não Cục Bộ", desc: "Khiến nạn nhân nội tâm hóa mọi tiêu cực. 'Đây là lỗi của tôi, do bản chất của tôi, và mọi thứ sẽ mãi mãi tồi tệ như vậy'." },
        { step: "4. Thiết Lập Vòng Lồng Tàng Hình", desc: "Bỏ đi gọng kìm hiện hữu; đối tượng tự nhốt mình lại bằng những rào cản nhận thức do sang chấn tạo ra." }
      ]
    }
  },
  {
    id: "premium_crab_mentality",
    title: "Tâm Lý Cua Trong Giỏ (Crab Mentality)",
    shortDescription: "Ghen tị độc hại: Sự kìm hãm lẫn nhau trong nội bộ khiến mọi cơ hội phát triển đều bị kéo rớt.",
    fullLesson: "Tâm lý Con Cua mô tả một ẩn dụ nổi tiếng trong cách các sinh vật biển hành xử. Nếu bạn bỏ một con cua vào giỏ, nó có thể dễ dàng bò rra. Nhưng nếu bạn bỏ một bầy cua vào giỏ, sẽ không một con cua nào thoát được. Lý do? Bởi vì cứ con nào chuẩn bị leo lên bờ giỏ, lập tức những con cua phía dưới sẽ vươn càng kéo con kia xuống, kết quả là tất cả ở lại trong giỏ để cùng chờ chết. Tâm lý 'Nếu tôi không thể có nó, anh cũng đừng hòng có' hiện hữu mạnh mẽ trong những nhóm xã hội có nguồn lực hạn hẹp hoặc bị đầu độc định hướng.",
    origin: "Bắt nguồn từ tiếng lóng về biểu hiện sinh học của họ nhà cua, được ứng dụng rộng rãi trong các nghiên cứu xã hội học ở vùng đô thị nghèo vào thế kỷ 20.",
    famousExperiment: "Dù không phải là một thí nghiệm một lần, thuật ngữ này là tổng hợp các khảo sát Xã hội học ở những môi trường làm việc độc hại hoặc những hội nhóm cộng đồng. Nếu một người quyết định ngừng uống rượu, bỏ các thói quen xấu và đi học thêm buổi tối để thăng tiến, hội bạn cũ thay vì ủng hộ sẽ nói những câu như 'Mày tưởng mày thông minh hơn bọn tao chắc?' hoặc cố tình làm giảm nhuệ khí để kéo người kia lại.",
    neuroImpact: "Tâm trí con người được định hướng theo tư duy Bằng nhau (Zero-sum game thinking) khi ở trong môi trường thiếu thốn. Thành công của người đồng cấp được hạch hạnh nhân (amygdala) phân tích như một 'sự đe dọa sinh tồn' đến tính biểu tượng của sự sống còn của bản thân; khiến cơ chế sinh mùi thù địch bộc phát trước khi kịp chúc mừng.",
    example: "Trong một phòng ban có chỉ tiêu lương như nhau, khi có một cá nhân trẻ vừa vô xung phong gánh 1 dự án khó để lấy KPI cao, và các lập trình viên cũ không giúp đỡ mà còn ngầm phá hoại, giấu lỗi, cô lập cá nhân đó vì 'Nó làm vỡ nồi cơm chung, cố làm nổi làm gì'.",
    prevention: "Bỏ giỏ. Hãy liên tục audit mạng lưới mối quan hệ của bản thân. Nếu thấy bạn đang bị những con 'cua đồng loại' dùng sự thân thiết để bẻ cong ý chí, kéo bạn trở lại vũng lầy, điều duy nhất nên làm là im lặng nỗ lực leo giỏ và đừng nói với chúng cho đến khi bạn đi khỏi. Bạn không thể dạy con cua cách bay.",
    image: require('../assets/images/cua.png'),
   
    category: "Xã hội",
    isPremium: true,
    premiumData: {
      expertQuotes: [
        "\"Sự nhỏ nhen không giết người bằng dao gươm, nó giết chết những ước mơ lớn bằng muôn vàn những lời gièm pha ti tiện dính đầy nọc độc.\" – Booker T. Washington",
        "\"Bạn không phải là trung bình cộng của 5 người mà bạn chơi cùng. Đôi khi bạn chỉ là nạn nhân của sự kéo lùi tập thể vô thức ấy.\" – Unknown"
      ],
      caseStudies: [
        {
          title: "Hồ Sơ Mật: Cuộc Trỗi Dậy Kìm Hãm",
          content: "Chị H là dân tỉnh lên thành phố, làm chung nhà máy may với hội chị em đồng hương. Tối tối, H không đi hát hò uống bia rủ rê mà tự học tiếng Hoa. Hội chị em phát hiện, bắt đầu gièm pha sau lưng, chê bai H 'đua đòi, tính làm quan bà'. Thậm chí họ cố tình bắt H rủ nhậu bù những lúc học và bày trò tẩy chay H ở xưởng. Dù đau khổ một thời gian và suýt từ bỏ, H lẳng lặng tiếp tục ôm sách vào các ngày cuối tuần tại thư viện (chống lại tâm lý bầy đàn). Cuối cùng H thăng chức phiên dịch viên và... không bao giờ gặp lại cái 'giỏ cua' năm ấy."
        }
      ],
      tacticalBreakdown: [
        { step: "1. Tẩy Chay Áp Lực Sức Ngang", desc: "Dùng tình anh em huynh đệ chung, cái sự nghèo chung, ngu chung làm đòn bẩy đạo đức để lên án sự nỗ lực vượt trội." },
        { step: "2. Chế Giễu Thảm Cảnh Tương Lai", desc: "Vẽ ra cảnh 'trèo cao ngã đau', mỉa mai những mục tiêu lớn bằng văn phong thực tế phũ phàng (để ngụy biện cho sự lười biếng)." },
        { step: "3. Tước Đoạt Nguồn Lực", desc: "Khi thấy cá nhân vượt lên, đám đông vô thức không cung cấp viện trợ chung nữa, ngáng đường bằng những thủ đoạn nhỏ lẻ nhưng hao mòn tinh thần." },
        { step: "4. Kéo Ngã Đám Đông", desc: "Khi cá nhân không chịu được áp lực đồng trang lứa và sa ngã trở lại, đám đông sẽ hân hoan dang tay ôm ấp vỗ về 'Thấy chưa, về đây với tụi tao là sung sướng nhất!', khóa chặt nạn nhân vĩnh viễn." }
      ]
    }
  },
  {
    id: "arc_lucifer",
    title: "Hiệu Ứng Lucifer (Lucifer Effect)",
    shortDescription: "Tội ác môi trường: Làm thế nào những công dân lương thiện nhất cũng có thể trở thành quỷ dữ khi được trao một quyền lực không kiểm soát?",
    fullLesson: "Được đặt tên theo thiên thần sa ngã Lucifer biến thành ác quỷ Satan, hiệu ứng Lucifer ám chỉ rằng cái ác không phải lúc nào cũng là bản chất bẩm sinh (Bad Apples), mà nhiều khi chính là do cái giỏ đựng táo bị mục nát (Bad Barrel - Môi trường). Khi được trao cho quyền năng cai trị tuyệt đối trên vai người khác cộng thêm yếu tố giấu giếm ẩn danh, đường ranh giới mong manh giữa ranh giới quỷ và người nhanh chóng vỡ vụn, khiến những con người lương thiện có thể thực hiện những tội ác tàn khốc mà lúc bình thường họ không bao giờ nghĩ tới.",
    origin: "Kết luận từ thí nghiệm nhà tù Stanford năm 1971 của nhà tâm lý học lỗi lạc Philip Zimbardo.",
    famousExperiment: "Thí nghiệm Nhà tù Stanford (Philip Zimbardo). Ông chọn ra ngẫu nhiên 24 sinh viên nam vô cùng hiền lành với hồ sơ trong sạch. Bốc thăm chia nửa làm 'Tù nhân' và nửa làm 'Cai ngục' dưới tầng hầm tâm lý học. Chỉ trong vỏn vẹn 6 ngày, những 'Cai ngục' (vốn là những cậu thanh niên hiền lành thích chơi đàn) đã trở nên điên loạn, tạo ra các hình phạt tra tấn man rợ, lột đồ, úp mền, không cho tù nhân ngủ. Mọi ranh giới đạo đức sụp đổ nghiêm trọng đến mức thí nghiệm dự kiến 2 tuần bị hoảng loạn hủy bỏ ngay ở ngày thứ 6 vì các 'tù nhân' suy sụp tinh thần trầm trọng.",
    neuroImpact: "Thay đổi vỏ não. Sự kết hợp giữa vô danh (Deindividuation - đồng phục hoặc mặt nạ) và phi nhân hóa nạn nhân (Dehumanization) vô hiệu hóa trung tâm ức chế điều tiết cái ác, gây bùng nổ quyền lực tột đỉnh giải phóng Dophimine, biến con người thành cỗ máy bạo lực.",
    example: "Sự kiện thảm sát tàn ác tại nhà tù Abu Ghraib. Hay gần gũi hơn là hiện trạng bắt nạt mạng xã hội (Cyberbullying), nơi những cô cậu sinh viên bình thường, khi có 'quyền lực ấn phím tàng hình' đằng sau màn hình, sẵn sàng dùng ngôn từ sỉ nhục, tiêu vong những cá nhân yếu đuối đến mức tự tử mà không cho rằng mình là kẻ ác.",
    prevention: "Bạn không thể tin hoàn toàn vào sự bền bỉ của vùng la bàn đạo đức của chính mình (Đạo đức tự xưng). Hệ thống tốt quan trọng hơn con người tốt. Phải luôn thiết lập một cơ chế minh bạch và có giám sát chống lạm quyền ở bất cứ cương vị lãnh đạo hoặc tập thể nào bạn làm việc.",
    image: require('../assets/images/lucifer.png'),
    
    category: "Xã hội",
    isPremium: true,
    premiumData: {
      expertQuotes: [
        "\"Ranh giới giữa cái tốt và cái xấu đục đục mờ mờ, và ranh giới đó xuyên thấu qua trái tim của mỗi con người.\" – Aleksandr Solzhenitsyn",
        "\"Hãy giao cho gã một chiếc mặt nạ dũng sĩ và anh ta sẽ kể cho bạn điều thật nhất về con quỷ trú ẩn sau anh ta.\" – Oscar Wilde/Zimbardo"
      ],
      caseStudies: [
        {
          title: "Hồ Sơ Mật: Cuộc Tuần Hành Thứ Ba (The Third Wave)",
          content: "Ron Jones, giáo viên lịch sử cấp 3 năm 1967 muốn minh họa cho bọn học sinh hiểu tại sao dân Đức lại tin theo Phát Xít. Anh biến lớp học thành một chế độ mô phỏng với cờ hiệu, lời chào mác, khẩu hiệu về 'Kỷ luật và Cống hiến'. Chỉ trong 5 ngày, những học sinh trong sáng ngây thơ của ông bắt đầu mặc đồ đen, tự thành lập 'lực lượng cảnh sát bí mật', đánh đập dọa nạt các học sinh không tham gia và tố cáo cả bạn bè. Hiệu ứng đám đông và cảm giác thượng đẳng cuồng tín đã hoàn toàn đánh gục cái thiện chỉ sau 120 giờ. Ron Jones rơi vào kinh hoàng và phải tự giải tán trong nước mắt."
        }
      ],
      tacticalBreakdown: [
        { step: "1. Vô Danh Hóa Chớp Nhoáng (Deindividuation)", desc: "Mặc đồng phục, đổi tên thành dãy số ID, đeo mắt kính đen – Triệt tiêu cái Tôi tự chịu trách nhiệm." },
        { step: "2. Phi Nhân Hóa Nạn Nhân (Dehumanization)", desc: "Gọi những kẻ bị áp bức bằng các thuật ngữ hạ cấp sinh vật (thú vật, rác rưởi, kí sinh trùng) để bộ não không còn đồng cảm." },
        { step: "3. Trao Quyền Tuyệt Đối", desc: "Không có các điều khoản quy định về hình phạt hoặc hậu quả của việc lạm quyền, tạo ra ảo tưởng của 'Đấng Thượng Đế'." },
        { step: "4. Tư Do Thái Độ Giấu Mặt", desc: "Không một ai nói dừng lại; nếu bạn không đánh chúng, những cai ngục khác sẽ coi bạn là kẻ phản bội đồng môn." }
      ]
    }
  }
];
