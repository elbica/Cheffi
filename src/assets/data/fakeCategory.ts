export const categoryData: { [key: string]: { [key: string]: string[] } } = {
  전체: {},
  '떡/밥/곡류': {
    쌀: ['맵쌀', '오곡', '백미', '찹쌀', '쌀', '보리쌀', '불린쌀', '흑미'],
    밥: ['쌀밥', '잡곡밥'],
    떡: [
      '떡',
      '찹쌀떡',
      '밀떡',
      '떡사리',
      '떡국떡',
      '가래떡',
      '떡볶이떡',
      '키리모찌',
      '조랭이떡',
    ],
    곡류: ['팥', '오곡', '그래놀라', '콩', '삶은녹두', '모듬콩'],
    앙금: ['백앙금', '팥앙금'],
  },
  '빵/면/만두류': {
    중분류1: ['재료1', '재료2', '재료3'],
    중분류2: ['재료1', '재료2', '재료3'],
  },
  과일류: {
    중분류1: ['재료1', '재료2', '재료3'],
    중분류2: ['재료1', '재료2', '재료3'],
  },
  채소류: {
    뿌리채소: [
      '자색고구마',
      '고구마',
      '연근',
      '당근',
      '무',
      '우엉',
      '생강',
      '토란대',
      '감자',
    ],
    열매채소: [
      '방울토마토',
      '오이',
      '쥬키니호박',
      '애호박',
      '홀토마토',
      '토마토',
      '단호박',
      '돼지호박',
      '옥수수',
      '피망',
      '파프리카',
      '청피망',
      '가지',
      '팝콘옥수수',
    ],
    잎줄기채소: [
      '시금치',
      '양파',
      '쪽파',
      '대파',
      '셀러리',
      '브로콜리',
      '부추',
      '쌈채소',
      '적양파',
      '잔파',
      '파',
      '상추',
      '양상추',
      '파뿌리',
      '실파',
      '깻잎',
      '어린잎',
      '치커리',
      '쌈',
      '어린잎채소',
      '아스파라거스',
      '열무',
      '쑥갓',
      '쑥',
      '로메인',
      '새싹채소',
      '무순',
      '아욱',
      '샐러리',
      '무청',
    ],
    허브: [
      '페퍼민트',
      '민트잎',
      '케이퍼',
      '워터크래스',
      '고수',
      '타임',
      '애플민트',
      '월계수잎',
    ],
    '두부/묵': ['두부', '순두부', '도토리묵', '연두부'],

    마늘: ['마늘', '편마늘', '간마늘', '다진마늘'],
    균류: [
      '가닥버섯',
      '미니새송이버섯',
      '버섯',
      '팽이버섯',
      '양송이버섯',
      '송이버섯',
      '목이버섯',
      '미니새송이',
      '새송이버섯',
      '느타리버섯',
      '표고버섯',
      '애느타리버섯',
    ],
    배추: [
      '배추',
      '알배기배추',
      '알배추',
      '방울양배추',
      '얼갈이',
      '적채',
      '양배추',
      '배춧잎',
      '청경채',
    ],
    양념채소: [
      '신김치',
      '묵은지',
      '동치미',
      '김치',
      '피클',
      '묵은김치',
      '간장장아찌',
      '무쌈',
      '쌈무',
      '오이피클',
      '깍두기',
      '피클',
      '무피클',
      '생강초절임',
      '파채',
    ],
    열매: [
      '산딸기',
      '딸기',
      '청포도',
      '매실',
      '천혜향',
      '라임 제스트',
      '대추',
      '다래',
      '아로니아',
      '올리브',
      '블랙올리브',
    ],
    고추: [
      '오이고추',
      '태국고추',
      '아삭이고추',
      '홍고추',
      '건고추',
      '할라피뇨',
      '풋고추',
      '말린고추',
      '꽈리고추',
      '청양고추',
      '고추',
      '홍청양고추',
    ],
    바다채소: ['미더덕'],
    나물: [
      '세발나물',
      '깐도라지',
      '달래',
      '근대',
      '두릅',
      '미나리',
      '건고구마나물',
      '취나물',
      '숙주나물',
      '우거지',
      '고사리',
      '콩나물',
    ],
    꽃채소: ['콜리플라워', '식용꽃'],

    기타채소: ['베이비채소', '콩고기', '샐러드채소'],
  },
  육류: {
    삶는용: ['수육용삼겹살', '족발', '미니족발'],
    국거리: ['국거리소고기', '양지머리'],
    구이용: [
      '꼬치',
      '떡갈비',
      '소고기안심',
      '소고기다짐육',
      '차돌박이',
      '등심',
      '우삼겹',
      '대패삼겹살',
      '안심',
      '곱창',
      '소고기목심',
      '목살',
      '돼지고기목살',
      '소고기 채끝살',
      '채끝살',
      '삼겹살',
      '소고기(불고기용)',
      '소고기등심',
      '항정살',
      '돼지갈비',
      'LA갈비',
    ],
    '양식용 고기': ['통베이컨', '스테이크용 고기', '베이컨'],
    막창: ['대구 시골 생막창', '대구 수제직화막창'],
    볶음용: ['제육볶음용고기', '돼지껍데기', '닭똥집'],
    전골요리용: ['소고기 샤브샤브용'],
    회: ['육회', '육회용고기'],
    튀김용: [
      '닭다리',
      '닭순살',
      '닭가슴살',
      '닭날개',
      '치킨',
      '닭껍질',
      '닭강정',
    ],
    다용도: [
      '돼지고기',
      '소고기',
      '립',
      '무뼈닭발',
      '생닭',
      '오돌뼈',
      '소고기우둔살',
      '돼지등심',
      '돼지고기등심',
      '닭안심',
      '돼지앞다리',
      '돼지고기앞다리살',
      '오리고기',
      '닭',
      '닭봉',
      '양지',
      '소고기양지',
    ],
  },
  '계란/유제품': {
    '치즈/버터': [
      '체다치즈',
      '고메버터',
      '버터',
      '땅콩버터',
      '가염버터',
      '치즈',
      '스트링치즈',
      '파마산치즈',
      '피자치즈',
    ],
    '우유/두유/연유': ['지방우유', '바나나우유', '두유', '연유'],
    '요거트/크림': ['요거트', '플레인요거트', '생크림', '휘핑크림'],
  },
  '수산/건어물': {
    김: ['김', '조미김', '김밥김', '김자반', '재래김', '김가루'],
    중분류2: ['재료1', '재료2', '재료3'],
  },
  '장/양념/소스류': {
    '양념/조미료': [
      '소금',
      '후추',
      '치킨스톡',
      '쇠고기다시다',
      '미원',
      '굵은소금',
      '물엿',
      '올리고당',
      '고춧가루',
      '매실원액',
      '황설탕',
      '설탕',
      '미림',
      '식초',
      '깨',
      '꿀',
    ],
    장류: ['진간장', '고추장', '된장', '쌈장', '간장'],
    소스류: ['스테이크소스', '돈까스소스', '스위트칠리소스', '우스터소스'],
    '오일/육수': [
      '식용유',
      '올리브유',
      '카놀라유',
      '해바라기씨유',
      '참기름',
      '면수',
      '사골육수',
      '멸치다시마 육수',
      '크림육수',
    ],
    '가루/분말': ['생강가루', '큐민가루', '한천가루', '카레가루'],
  },
  '음료/주류': {
    음료: ['물', '재료2', '재료3'],
    중분류2: ['재료1', '재료2', '재료3'],
  },
  가공식품: {
    통조림: ['스팸', '옥수수콘', '참치', '꽁치', '과일통조림'],
    '즉석밥/라면': ['햇반', '재료2', '재료3'],
    잼: ['땅콩잼', '딸기잼', '블루베리잼'],
  },
  '향신료/가루류': {
    중분류1: ['재료1', '재료2', '재료3'],
    중분류2: ['재료1', '재료2', '재료3'],
  },
  '초콜릿/과자/견과류': {
    중분류1: ['재료1', '재료2', '재료3'],
    중분류2: ['재료1', '재료2', '재료3'],
  },
};
