/* 샘플 데이터 — 후기, 템플릿, 교육과정 (블록 기반)
   템플릿 구조: 전체 템플릿 → 부분 템플릿(섹션) → 블록
*/

const COURSES = {
  sniper: [
    { id: 'snf-fe-05', name: '프론트엔드 부트캠프 5기', category: '개발 · 부트캠프' },
    { id: 'snf-ai-03', name: 'AI 엔지니어 과정 3기', category: '개발 · AI' },
    { id: 'snf-pm-08', name: 'PM 스쿨 8기', category: '기획 · 부트캠프' },
    { id: 'snf-data-02', name: '데이터 분석가 과정 2기', category: '데이터 · 부트캠프' },
  ],
  insideout: [
    { id: 'io-intern-s24', name: '인사이드아웃 인턴십 24-2기', category: '인턴십' },
    { id: 'io-prog-b', name: '프로그램 B: 브랜딩', category: '프로그램' },
    { id: 'io-prog-c', name: '프로그램 C: 콘텐츠 크리에이터', category: '프로그램' },
  ],
  hancom: [
    { id: 'hc-ai-01', name: '한컴 AI 실무 1기', category: 'AI · 실무' },
    { id: 'hc-ai-02', name: '한컴 AI 실무 2기', category: 'AI · 실무' },
    { id: 'hc-ds', name: '데이터 사이언스 과정', category: '데이터' },
  ],
};

const REVIEWS = [
  { id: 1, createdAt: '2026-04-18', title: '비전공자에서 프론트엔드 개발자까지, 5개월의 기록', brand: 'sniper', course: '프론트엔드 부트캠프 5기', type: '취업후기', author: '김서연', best: true, published: true, views: 3421, updatedAt: '2026-04-20', featured: true, thumb: '#0a6cff' },
  { id: 2, createdAt: '2026-04-17', title: '취준 불안감을 해소한 PM스쿨 수강기', brand: 'sniper', course: 'PM 스쿨 8기', type: '수료후기', author: '박지훈', best: true, published: true, views: 2156, updatedAt: '2026-04-19', featured: false, thumb: '#2b56d6' },
  { id: 3, createdAt: '2026-04-16', title: '첫 인턴 3주차, 실무에서 배운 것들', brand: 'insideout', course: '인사이드아웃 인턴십 24-2기', type: '인턴로그', author: '이하린', best: false, published: true, views: 892, updatedAt: '2026-04-16', featured: false, thumb: '#ff5a36' },
  { id: 4, createdAt: '2026-04-15', title: 'AI 엔지니어 3기 수료, 그리고 스타트업 합격까지', brand: 'sniper', course: 'AI 엔지니어 과정 3기', type: '취업후기', author: '최유진', best: true, published: true, views: 4102, updatedAt: '2026-04-18', featured: true, thumb: '#1a56db' },
  { id: 5, createdAt: '2026-04-14', title: '브랜딩 프로그램에서 포트폴리오 완성하기', brand: 'insideout', course: '프로그램 B: 브랜딩', type: '프로그램 후기', author: '정민호', best: false, published: true, views: 612, updatedAt: '2026-04-14', featured: false, thumb: '#ff8a36' },
  { id: 6, createdAt: '2026-04-12', title: '한컴 AI 1기 수료 후기 — 현직자가 되어 돌아보며', brand: 'hancom', course: '한컴 AI 실무 1기', type: '수료후기', author: '강태민', best: true, published: true, views: 1833, updatedAt: '2026-04-13', featured: true, thumb: '#1a56db' },
  { id: 7, createdAt: '2026-04-11', title: '데이터 분석가로의 전향, 그 두 번째 이야기', brand: 'sniper', course: '데이터 분석가 과정 2기', type: '취업후기', author: '윤소은', best: false, published: true, views: 1245, updatedAt: '2026-04-11', featured: false, thumb: '#3b6bf1' },
  { id: 8, createdAt: '2026-04-10', title: '인턴 4주차 — 사수에게 피드백 받는 법', brand: 'insideout', course: '인사이드아웃 인턴십 24-2기', type: '인턴로그', author: '이하린', best: false, published: false, views: 0, updatedAt: '2026-04-10', featured: false, thumb: '#ff5a36' },
  { id: 9, createdAt: '2026-04-08', title: '프론트엔드 부트캠프, 실무형 프로젝트가 달랐다', brand: 'sniper', course: '프론트엔드 부트캠프 5기', type: '수료후기', author: '장우석', best: false, published: true, views: 876, updatedAt: '2026-04-09', featured: false, thumb: '#5b89fb' },
  { id: 10, createdAt: '2026-04-05', title: '한컴 AI 아카데미에서 얻은 네트워크', brand: 'hancom', course: '한컴 AI 실무 2기', type: '프로젝트 후기', author: '오예린', best: false, published: true, views: 524, updatedAt: '2026-04-05', featured: false, thumb: '#2b56d6' },
  { id: 11, createdAt: '2026-04-03', title: '콘텐츠 크리에이터 프로그램 — 6주의 변화', brand: 'insideout', course: '프로그램 C: 콘텐츠 크리에이터', type: '프로그램 후기', author: '김하늘', best: false, published: true, views: 412, updatedAt: '2026-04-03', featured: false, thumb: '#ff5a36' },
  { id: 12, createdAt: '2026-04-01', title: '면접 단골질문, 부트캠프가 이렇게 준비시켜줬다', brand: 'sniper', course: 'PM 스쿨 8기', type: '취업후기', author: '류지아', best: false, published: false, views: 0, updatedAt: '2026-04-02', featured: false, thumb: '#0a6cff' },
];

/* 템플릿 구조
   - 전체 템플릿: TEMPLATES[]
   - 부분 템플릿(섹션): template.sections[]
   - 각 섹션: { id, name, description, blocks: [...] }
   - 블록은 섹션 내부에 존재
*/
const TEMPLATES = [
  {
    id: 't1', brand: 'sniper', name: '취업후기 템플릿', type: '취업후기',
    description: '스나이퍼팩토리 취업후기 표준. Q&A + 이미지 그리드 + 하단 CTA까지 한 번에.',
    useCount: 24, updatedAt: '2026-04-15', status: 'active',
    sections: [
      {
        id: 's1-1', name: '인트로 섹션',
        description: '자기소개와 대표 이미지',
        blocks: [
          { id: 'b1', kind: 'heading', required: true, data: { level: 'h2', text: '👋 안녕하세요, 저는요' } },
          { id: 'b2', kind: 'text', required: true, data: { text: '먼저 간단히 본인을 소개해주세요. 어떤 배경을 가지고 어떤 분야에서 커리어를 시작하게 됐는지 알려주세요.' } },
          { id: 'b3', kind: 'image', required: true, data: { caption: '프로필 또는 대표 사진', ratio: '16/9' } },
          { id: 'b4', kind: 'divider', required: false },
        ],
      },
      {
        id: 's1-2', name: 'Q&A 섹션',
        description: '수강 계기부터 경험까지 질문-답변형',
        blocks: [
          { id: 'b5', kind: 'qa', required: true, data: { question: '이 과정을 선택한 계기는?', answer: '지원하게 된 배경과 기대했던 점을 편하게 작성해주세요.' } },
          { id: 'b6', kind: 'qa', required: true, data: { question: '수강 전 가장 큰 고민은?', answer: '' } },
          { id: 'b7', kind: 'qa', required: true, data: { question: '교육 중 가장 도움 됐던 점은?', answer: '' } },
        ],
      },
      {
        id: 's1-3', name: '갤러리 & 합격 포인트',
        description: '추가 이미지와 강조 박스',
        blocks: [
          { id: 'b8', kind: 'gallery2', required: false, data: { tone1: 'a', tone2: 'c' } },
          { id: 'b9', kind: 'tip', required: true, data: { tone: 'tip', label: '합격 포인트', text: '취업에 결정적이었던 한 가지를 짧게 정리해주세요.' } },
          { id: 'b10', kind: 'qa', required: true, data: { question: '최종 결과와 앞으로의 계획은?', answer: '' } },
        ],
      },
      {
        id: 's1-4', name: 'CTA 섹션',
        description: '모집 과정 연결 버튼',
        blocks: [
          { id: 'b11', kind: 'cta', required: true, data: { preText: '같은 과정에 관심이 있다면', title: '지금 모집 중인 과정을 확인해보세요', buttonText: '과정 보러가기' } },
        ],
      },
    ],
  },
  {
    id: 't2', brand: 'sniper', name: '수강후기 템플릿', type: '수료후기',
    description: '수강 완료 후 만족도 중심. 짧고 가볍게.',
    useCount: 11, updatedAt: '2026-04-10', status: 'active',
    sections: [
      {
        id: 's2-1', name: '헤드라인 섹션',
        description: '제목과 대표 이미지',
        blocks: [
          { id: 'b1', kind: 'heading', required: true, data: { level: 'h2', text: '수강 후기' } },
          { id: 'b2', kind: 'image', required: true, data: { ratio: '16/9' } },
        ],
      },
      {
        id: 's2-2', name: '간단 Q&A',
        description: '핵심 질문 2개',
        blocks: [
          { id: 'b3', kind: 'qa', required: true, data: { question: '수강하게 된 계기는?', answer: '' } },
          { id: 'b4', kind: 'qa', required: true, data: { question: '가장 인상 깊었던 커리큘럼은?', answer: '' } },
        ],
      },
      {
        id: 's2-3', name: '마무리 & CTA',
        description: '한마디 + 모집 안내',
        blocks: [
          { id: 'b5', kind: 'text', required: true, data: { text: '예비 수강생에게 한마디 남겨주세요.' } },
          { id: 'b6', kind: 'cta', required: true, data: { preText: '다음 기수가 기다립니다', title: '지금 모집 중인 과정 확인하기', buttonText: '자세히 보기' } },
        ],
      },
    ],
  },
  {
    id: 't3', brand: 'insideout', name: '인턴로그 템플릿', type: '인턴로그',
    description: '주간 인턴 기록용 — 짧은 일지 포맷.',
    useCount: 38, updatedAt: '2026-04-16', status: 'active',
    sections: [
      {
        id: 's3-1', name: '주간 헤드라인',
        description: '이번 주 메인 업무',
        blocks: [
          { id: 'b1', kind: 'heading', required: true, data: { level: 'h2', text: '이번 주 인턴로그' } },
          { id: 'b2', kind: 'qa', required: true, data: { question: '이번 주 가장 기억에 남는 업무는?', answer: '' } },
        ],
      },
      {
        id: 's3-2', name: '배운 것 & 어려움',
        description: '회고 Q&A',
        blocks: [
          { id: 'b3', kind: 'image', required: false },
          { id: 'b4', kind: 'qa', required: true, data: { question: '새로 배운 것은?', answer: '' } },
          { id: 'b5', kind: 'qa', required: true, data: { question: '어려웠던 점은?', answer: '' } },
        ],
      },
      {
        id: 's3-3', name: '다음 주 목표',
        description: 'Note 박스',
        blocks: [
          { id: 'b6', kind: 'tip', required: true, data: { tone: 'note', label: '다음 주 목표', text: '다음 주에 집중할 것들을 정리해주세요.' } },
        ],
      },
    ],
  },
  {
    id: 't4', brand: 'insideout', name: '프로그램 후기 템플릿', type: '프로그램 후기',
    description: '프로그램 전/후 변화 중심.',
    useCount: 7, updatedAt: '2026-04-08', status: 'active',
    sections: [
      {
        id: 's4-1', name: '오프닝',
        description: '대표 이미지 + 제목',
        blocks: [
          { id: 'b1', kind: 'heading', required: true, data: { level: 'h1', text: '프로그램을 마치고' } },
          { id: 'b2', kind: 'image', required: true, data: { ratio: '21/9' } },
        ],
      },
      {
        id: 's4-2', name: '참여 동기',
        description: '시작 지점의 질문',
        blocks: [
          { id: 'b3', kind: 'qa', required: true, data: { question: '참여 동기는 무엇이었나요?', answer: '' } },
          { id: 'b4', kind: 'quote', required: true, data: { text: '인상 깊었던 한 장면을 짧게 인용해주세요.' } },
        ],
      },
      {
        id: 's4-3', name: '결과 & CTA',
        description: '갤러리 + 성과 + 버튼',
        blocks: [
          { id: 'b5', kind: 'gallery3', required: false },
          { id: 'b6', kind: 'qa', required: true, data: { question: '내가 얻은 것은?', answer: '' } },
          { id: 'b7', kind: 'cta', required: true, data: { preText: '프로그램이 궁금하다면', title: '자세한 내용을 확인해보세요', buttonText: '프로그램 보기' } },
        ],
      },
    ],
  },
  {
    id: 't5', brand: 'hancom', name: '수료후기 템플릿', type: '수료후기',
    description: '한컴 AI 아카데미 공식 수료후기 포맷.',
    useCount: 5, updatedAt: '2026-04-12', status: 'active',
    sections: [
      {
        id: 's5-1', name: '인트로',
        description: '제목 + 대표 이미지',
        blocks: [
          { id: 'b1', kind: 'heading', required: true, data: { level: 'h2', text: '수료를 기록하며' } },
          { id: 'b2', kind: 'image', required: true, data: { ratio: '16/9' } },
        ],
      },
      {
        id: 's5-2', name: '수강 경험 Q&A',
        description: '지원부터 실무 적용까지',
        blocks: [
          { id: 'b3', kind: 'qa', required: true, data: { question: '지원 계기와 기대했던 점', answer: '' } },
          { id: 'b4', kind: 'qa', required: true, data: { question: '가장 도움 된 부분', answer: '' } },
          { id: 'b5', kind: 'qa', required: true, data: { question: '실무 적용 경험', answer: '' } },
        ],
      },
      {
        id: 's5-3', name: 'CTA',
        description: '다음 기수 안내',
        blocks: [
          { id: 'b6', kind: 'cta', required: true, data: { preText: '다음 기수가 기다립니다', title: '한컴 AI 아카데미 다음 기수', buttonText: '모집 일정 보기' } },
        ],
      },
    ],
  },
  {
    id: 't6', brand: 'hancom', name: '프로젝트 후기 템플릿', type: '프로젝트 후기',
    description: '팀 프로젝트 회고 중심. 작성 중.',
    useCount: 2, updatedAt: '2026-04-05', status: 'draft',
    sections: [
      {
        id: 's6-1', name: '프로젝트 개요',
        description: '제목 + 개요',
        blocks: [
          { id: 'b1', kind: 'heading', required: true, data: { level: 'h2', text: '프로젝트 회고' } },
          { id: 'b2', kind: 'qa', required: true, data: { question: '프로젝트 개요', answer: '' } },
        ],
      },
      {
        id: 's6-2', name: '역할 & 회고',
        description: '개인 기여도',
        blocks: [
          { id: 'b3', kind: 'qa', required: true, data: { question: '나의 역할', answer: '' } },
        ],
      },
    ],
  },
];

/* 하위 호환 — 기존 코드에서 tpl.blocks로 접근하던 곳을 위한 파생 필드
   전체 템플릿의 모든 섹션 블록을 순서대로 flatten */
TEMPLATES.forEach((tpl) => {
  Object.defineProperty(tpl, 'blocks', {
    get() {
      return (this.sections || []).flatMap((s) => s.blocks || []);
    },
    configurable: true,
  });
});

Object.assign(window, { COURSES, REVIEWS, TEMPLATES });
