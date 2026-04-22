/* 후기 상세 페이지 — 블록 기반 프리뷰 */

const DetailPage = ({ brandId, review }) => {
  const brand = BRANDS.find((b) => b.id === brandId);
  const r = review || REVIEWS.find((x) => x.brand === brandId && x.best) || REVIEWS[0];
  const tpl = TEMPLATES.find((t) => t.brand === r.brand && t.type === r.type) || TEMPLATES[0];

  // 샘플 답변 / 콘텐츠로 블록 채우기
  const filled = React.useMemo(() => {
    const samples = {
      qa: [
        { q: '이 과정을 선택한 계기는?', a: '대학교 4학년 취업 시즌, "내가 정말 이 일을 평생 할 수 있을까"라는 고민이 컸어요. 친구 추천으로 스나이퍼팩토리를 알게 됐고, 무료 설명회에서 커리큘럼이 실무와 가깝다는 점에 끌렸습니다.' },
        { q: '수강 전 가장 큰 고민은?', a: '비전공자가 5개월 만에 개발자가 될 수 있을까, 라는 현실적인 고민이 가장 컸어요. 수백만원의 수강료를 투자할 만큼 퀄리티가 보장되는지도 걱정이었죠.' },
        { q: '교육 중 가장 도움 됐던 점은?', a: '1:1 멘토링이 결정적이었습니다. 매주 금요일 현직 개발자 멘토님과 코드 리뷰를 하며 "유지보수되는 코드"를 쓰는 법을 배웠습니다.' },
        { q: '최종 결과와 앞으로의 계획은?', a: '국내 IT 스타트업 3곳에서 오퍼를 받고, 프론트엔드 엔지니어로 합류했습니다. 이제는 후배 수강생들에게 멘토가 되어주는 것이 목표예요.' },
      ],
      heading: ['👋 안녕하세요, 저는요', '💡 수강 결정까지'],
      text: '컴퓨터공학 전공이 아닌 저는, 원래 마케팅 쪽으로 취업을 준비하고 있었어요. 하지만 어느 순간부터 "내가 정말 이 일을 평생 할 수 있을까?"라는 질문이 머릿속을 떠나지 않았습니다. 그러던 중 친구를 통해 스나이퍼팩토리의 프론트엔드 부트캠프를 알게 됐습니다.',
      tip: { label: '합격 포인트', text: '프로젝트 경험을 스토리로 풀어내는 것. 단순히 "뭘 만들었다"가 아니라 "어떤 문제를 어떻게 해결했다"로 바꿨더니 면접관 반응이 달라졌어요.' },
      cta: { preText: '같은 과정에 관심이 있다면', title: '프론트엔드 부트캠프 6기 모집 중', buttonText: '자세히 보기' },
    };
    let qi = 0;
    return tpl.blocks.map((b) => {
      const nb = { ...b, data: { ...b.data } };
      if (b.kind === 'qa') {
        const s = samples.qa[qi % samples.qa.length]; qi++;
        nb.data = { question: b.data.question || s.q, answer: s.a };
      } else if (b.kind === 'text' && !b.data.text) {
        nb.data = { text: samples.text };
      } else if (b.kind === 'tip' && !b.data.text?.includes('합격')) {
        nb.data = { ...b.data, ...samples.tip };
      } else if (b.kind === 'cta') {
        nb.data = { ...samples.cta, ...b.data };
      }
      return nb;
    });
  }, [tpl.id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PageHeader
        breadcrumbs={['콘텐츠', '후기 리스트', `#${r.id}`]}
        title={r.title}
        actions={
          <>
            <IconButton icon="chevronLeft" tooltip="이전" />
            <IconButton icon="chevronRight" tooltip="다음" />
            <div style={{ width: 1, height: 20, background: 'var(--border-default)', margin: '0 4px' }} />
            <Button icon="eye">외부 공개 페이지</Button>
            <Button icon="copy">복제</Button>
            <Button variant="primary" icon="edit">수정</Button>
          </>
        }
      />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div className="cc-scroll" style={{ flex: 1, overflow: 'auto', background: 'var(--bg-canvas)' }}>
          <div style={{ maxWidth: 780, margin: '0 auto', padding: '28px 40px 80px' }}>

            {/* 상태 배지 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
              {r.published ? <Badge tone="green" dot>공개</Badge> : <Badge tone="neutral" dot>비공개</Badge>}
              {r.best && <Badge tone="amber">★ Best</Badge>}
              {r.featured && <Badge tone="blue"><Icon name="pin" size={10} /> 대표 노출</Badge>}
              <Badge tone="neutral">{r.type}</Badge>
              <div style={{ flex: 1 }} />
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>
                조회 {r.views.toLocaleString()} · 수정 {r.updatedAt}
              </div>
            </div>

            {/* 헤더 카드 */}
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--border-subtle)', overflow: 'hidden', marginBottom: 24 }}>
              <div style={{
                height: 160, background: `linear-gradient(135deg, ${r.thumb}, ${r.thumb}cc)`,
                position: 'relative', overflow: 'hidden',
                display: 'flex', alignItems: 'flex-end', padding: 20, color: '#fff',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,.18), transparent 60%)' }} />
                <div style={{ position: 'relative', fontSize: 11, opacity: 0.9, fontWeight: 500 }}>
                  {brand.name} · {r.course}
                </div>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <h1 style={{ margin: '0 0 14px', fontSize: 24, fontWeight: 700, lineHeight: 1.35, letterSpacing: -0.4 }}>
                  {r.title}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: 'var(--text-tertiary)' }}>
                  <Avatar name={r.author} color={brand.color} size={22} />
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{r.author}</span>
                  <span>·</span>
                  <span>{r.createdAt}</span>
                </div>
              </div>
            </div>

            {/* 본문 — 블록 렌더 */}
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--border-subtle)', padding: '32px 36px' }}>
              {filled.map((b) => (
                <BlockRender key={b.id} block={b} mode="preview" accent={brand.color} />
              ))}
            </div>
          </div>
        </div>

        {/* 우측 운영 패널 */}
        <aside className="cc-scroll" style={{
          width: 300, flexShrink: 0, borderLeft: '1px solid var(--border-subtle)',
          background: 'var(--bg-surface)', overflow: 'auto', padding: '20px 18px',
        }}>
          <DetailPanel title="빠른 액션">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              <QuickAction icon="eye" label="공개" active={r.published} />
              <QuickAction icon="star" label="Best" active={r.best} />
              <QuickAction icon="pin" label="대표" active={r.featured} />
              <QuickAction icon="archive" label="보관" />
            </div>
          </DetailPanel>

          <DetailPanel title="게시 상태">
            <div style={{ padding: '10px 12px', background: r.published ? 'var(--green-50)' : 'var(--gray-75)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: r.published ? 'var(--green-500)' : 'var(--gray-400)' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: r.published ? 'var(--green-700)' : 'var(--text-secondary)' }}>
                  {r.published ? '외부 공개 중' : '비공개 상태'}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>
                  {r.published ? `공개일 ${r.createdAt}` : '버튼을 눌러 공개'}
                </div>
              </div>
            </div>
          </DetailPanel>

          <DetailPanel title="메타 정보">
            <DetailMeta label="ID" value={`#${r.id}`} mono />
            <DetailMeta label="작성자" value={r.author} />
            <DetailMeta label="교육과정" value={r.course} small />
            <DetailMeta label="리뷰 타입" value={r.type} />
            <DetailMeta label="템플릿" value={tpl.name} small />
            <DetailMeta label="블록 수" value={`${filled.length}개`} />
            <DetailMeta label="생성일" value={r.createdAt} mono />
            <DetailMeta label="수정일" value={r.updatedAt} mono />
            <DetailMeta label="조회수" value={r.views.toLocaleString()} mono />
          </DetailPanel>

          <DetailPanel title="통계 (30일)">
            <StatRow label="페이지뷰" value="1,284" trend="+12%" up />
            <StatRow label="평균 체류" value="2분 14초" trend="+8%" up />
            <StatRow label="CTA 클릭" value="87" trend="6.8%" />
            <StatRow label="완독률" value="64%" trend="-3%" />
            <div style={{ marginTop: 10, padding: 10, background: 'var(--bg-sunken)', borderRadius: 6 }}>
              <svg viewBox="0 0 220 48" width="100%" height="48" style={{ display: 'block' }}>
                <defs>
                  <linearGradient id="sparkG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--blue-500)" stopOpacity="0.3" />
                    <stop offset="1" stopColor="var(--blue-500)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,36 L22,30 L44,34 L66,20 L88,26 L110,14 L132,18 L154,8 L176,16 L198,6 L220,12 L220,48 L0,48 Z" fill="url(#sparkG)" />
                <path d="M0,36 L22,30 L44,34 L66,20 L88,26 L110,14 L132,18 L154,8 L176,16 L198,6 L220,12" fill="none" stroke="var(--blue-500)" strokeWidth="1.5" />
              </svg>
              <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                <span>3/24</span><span>4/22</span>
              </div>
            </div>
          </DetailPanel>

          <DetailPanel title="최근 활동">
            {[
              { t: '오늘 10:14', who: '김운영', note: 'Best 지정' },
              { t: '어제 18:42', who: '김운영', note: '본문 수정' },
              { t: '4/20 09:10', who: '이에디터', note: '썸네일 교체' },
              { t: '4/18 14:22', who: '—', note: '최초 등록' },
            ].map((v, i, arr) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none', fontSize: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{v.note}</span>
                  <span style={{ color: 'var(--text-tertiary)' }}>{v.t}</span>
                </div>
                <div style={{ color: 'var(--text-tertiary)', marginTop: 2 }}>{v.who}</div>
              </div>
            ))}
          </DetailPanel>

          <Button variant="danger" icon="trash" style={{ width: '100%' }}>이 후기 삭제</Button>
        </aside>
      </div>
    </div>
  );
};

const DetailPanel = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{title}</div>
    {children}
  </div>
);

const DetailMeta = ({ label, value, mono, small }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', fontSize: 12.5, gap: 10 }}>
    <span style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>{label}</span>
    <span style={{
      color: 'var(--text-primary)',
      fontFamily: mono ? 'var(--font-mono)' : 'inherit',
      fontSize: mono ? 11.5 : small ? 12 : 12.5,
      textAlign: 'right',
      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
    }}>{value}</span>
  </div>
);

const QuickAction = ({ icon, label, active }) => (
  <button style={{
    padding: '10px 8px', border: `1px solid ${active ? 'var(--blue-500)' : 'var(--border-default)'}`,
    background: active ? 'var(--blue-50)' : '#fff', borderRadius: 6, cursor: 'pointer',
    color: active ? 'var(--blue-700)' : 'var(--text-secondary)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 500,
  }}>
    <Icon name={icon} size={14} />
    {label}
  </button>
);

const StatRow = ({ label, value, trend, up }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', fontSize: 12.5 }}>
    <span style={{ color: 'var(--text-tertiary)' }}>{label}</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ color: 'var(--text-primary)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      {trend && <span style={{ fontSize: 10.5, color: up ? 'var(--green-600)' : 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' }}>{trend}</span>}
    </div>
  </div>
);

Object.assign(window, { DetailPage });
