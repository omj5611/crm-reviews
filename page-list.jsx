/* A. 후기 리스트 페이지 — 업로드한 레퍼런스 기반 */

const ReviewListPage = ({ brandId, density = 'comfortable', onRowClick, onNewReview }) => {
  const brand = BRANDS.find((b) => b.id === brandId);
  const [activeTab, setActiveTab] = React.useState('all');
  const [bestOnly, setBestOnly] = React.useState(true);
  const [perPage, setPerPage] = React.useState('10개씩 보기');
  const [order, setOrder] = React.useState('최근 등록순');
  const [toggles, setToggles] = React.useState({});

  const all = REVIEWS.filter((r) => r.brand === brandId);
  const byTab = (tab) => all.filter((r) => {
    if (tab === 'all') return true;
    if (tab === '취업') return r.type.includes('취업');
    if (tab === '수료') return r.type.includes('수료');
    if (tab === '인턴') return r.type.includes('인턴');
    if (tab === '프로그램') return r.type.includes('프로그램') || r.type.includes('프로젝트');
    return true;
  });
  const tabs = [
    { key: 'all', label: '전체', count: byTab('all').length },
    { key: '취업', label: '취업 후기', count: byTab('취업').length },
    { key: '수료', label: '수료 후기', count: byTab('수료').length },
    { key: '인턴', label: '인턴 후기', count: byTab('인턴').length },
  ];
  if (brandId === 'insideout' || brandId === 'hancom') {
    tabs.push({ key: '프로그램', label: '프로그램', count: byTab('프로그램').length });
  }

  const filtered = byTab(activeTab).filter((r) => !bestOnly || r.best);

  const togEl = (id, key, def) => {
    const v = toggles[`${id}-${key}`] ?? def;
    return (
      <button onClick={(e) => {
        e.stopPropagation();
        setToggles({ ...toggles, [`${id}-${key}`]: !v });
      }} style={{
        width: 32, height: 18, border: 'none', borderRadius: 9, padding: 0,
        background: v ? 'var(--blue-500)' : 'var(--gray-200)',
        position: 'relative', cursor: 'pointer', transition: 'background .15s',
      }}>
        <span style={{
          position: 'absolute', top: 2, left: v ? 16 : 2,
          width: 14, height: 14, borderRadius: 7, background: '#fff',
          transition: 'left .15s', boxShadow: '0 1px 2px rgba(0,0,0,.2)',
        }} />
      </button>
    );
  };

  const [selected, setSelected] = React.useState(new Set());
  const toggleRow = (id) => {
    const n = new Set(selected);
    n.has(id) ? n.delete(id) : n.add(id);
    setSelected(n);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-canvas)', overflow: 'hidden' }}>
      {/* 타이틀 + CTA */}
      <div style={{ padding: '24px 28px 0', display: 'flex', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>수강 후기</h1>
        <div style={{ flex: 1 }} />
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '7px 14px', background: '#fff', color: 'var(--text-primary)',
          border: '1px solid var(--border-default)', borderRadius: 6,
          fontSize: 12.5, fontWeight: 500, cursor: 'pointer', marginRight: 8,
        }}>
          <Icon name="download" size={13} /> 엑셀 다운받기
        </button>
        <button onClick={onNewReview} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '7px 14px', background: 'var(--blue-500)', color: '#fff',
          border: 'none', borderRadius: 6, fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
        }}>
          <Icon name="plus" size={13} /> 새 후기 등록
        </button>
      </div>

      {/* 탭 */}
      <div style={{ padding: '18px 28px 0', display: 'flex', gap: 22, borderBottom: '1px solid var(--border-subtle)' }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            style={{
              padding: '10px 0', background: 'transparent', border: 'none',
              borderBottom: `2px solid ${activeTab === t.key ? 'var(--text-primary)' : 'transparent'}`,
              color: activeTab === t.key ? 'var(--text-primary)' : 'var(--text-tertiary)',
              fontSize: 14, fontWeight: activeTab === t.key ? 700 : 500, cursor: 'pointer',
              marginBottom: -1,
            }}>
            {t.label}
            <span style={{ marginLeft: 6, fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="cc-scroll" style={{ flex: 1, overflow: 'auto', padding: '20px 28px' }}>
        <div style={{ background: '#fff', borderRadius: 10, border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
          {/* 툴바 */}
          <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>
              총 <span style={{ color: 'var(--blue-600)' }}>{filtered.length}</span>건
            </span>
            <Select size="sm" value={perPage} onChange={setPerPage}
              options={['10개씩 보기', '20개씩 보기', '50개씩 보기']} style={{ width: 120 }} />
            <Select size="sm" value={order} onChange={setOrder}
              options={['최근 등록순', '조회수 순', '오래된 순']} style={{ width: 124 }} />
            <div style={{ flex: 1 }} />
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, cursor: 'pointer', color: 'var(--text-primary)' }}>
              <Checkbox checked={bestOnly} onChange={setBestOnly} />
              <span style={{ fontWeight: 500 }}>BEST 후기</span>
            </label>
          </div>

          {/* 테이블 */}
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: 13 }}>
            <thead>
              <tr>
                <Th width={40}></Th>
                <Th width={70}>썸네일</Th>
                <Th>제목</Th>
                <Th width={100} align="center">후기 종류</Th>
                <Th width={70} align="right">조회수</Th>
                <Th width={60} align="center">공개</Th>
                <Th width={60} align="center">BEST</Th>
                <Th width={90} align="center">작성일</Th>
                <Th width={40}></Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}
                  onClick={() => onRowClick?.(r.id)}
                  style={{
                    borderTop: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    background: selected.has(r.id) ? 'var(--blue-50)' : 'transparent',
                  }}
                  onMouseEnter={(e) => { if (!selected.has(r.id)) e.currentTarget.style.background = 'var(--gray-50)'; }}
                  onMouseLeave={(e) => { if (!selected.has(r.id)) e.currentTarget.style.background = 'transparent'; }}>
                  <Td><div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', justifyContent: 'center' }}><Checkbox checked={selected.has(r.id)} onChange={() => toggleRow(r.id)} /></div></Td>
                  <Td>
                    <div style={{
                      width: 52, height: 40, borderRadius: 6,
                      background: `linear-gradient(135deg, ${r.thumb}, ${r.thumb}aa)`,
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,.3), transparent 70%)' }} />
                    </div>
                  </Td>
                  <Td>
                    <div style={{ padding: '10px 0' }}>
                      <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginBottom: 2 }}>
                        KDT · {r.course}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 460 }}>
                        {r.title}
                      </div>
                    </div>
                  </Td>
                  <Td align="center"><span style={{ color: 'var(--text-secondary)', fontSize: 12.5 }}>{r.type}</span></Td>
                  <Td align="right"><span style={{ color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>{r.views.toLocaleString()}</span></Td>
                  <Td align="center">{togEl(r.id, 'pub', r.published)}</Td>
                  <Td align="center">{togEl(r.id, 'best', r.best)}</Td>
                  <Td align="center"><span style={{ color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums', fontSize: 12 }}>{r.updatedAt.slice(2).replace(/-/g, '.')}</span></Td>
                  <Td><div onClick={(e) => e.stopPropagation()}><IconButton icon="more" size="sm" /></div></Td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>조건에 맞는 후기가 없습니다</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div style={{ padding: '18px 0 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
          <IconButton icon="chevronLeft" size="sm" />
          {[1, 2, 3, 4].map((p) => (
            <button key={p} style={{
              width: 28, height: 28, border: 'none', borderRadius: 6,
              background: p === 1 ? 'var(--text-primary)' : 'transparent',
              color: p === 1 ? '#fff' : 'var(--text-secondary)',
              fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontVariantNumeric: 'tabular-nums',
            }}>{p}</button>
          ))}
          <IconButton icon="chevronRight" size="sm" />
        </div>
      </div>
    </div>
  );
};

const Th = ({ children, width, align = 'left' }) => (
  <th style={{
    padding: '10px 10px', width, textAlign: align,
    fontSize: 11.5, fontWeight: 500, color: 'var(--text-tertiary)',
    background: 'var(--gray-50)',
  }}>{children}</th>
);
const Td = ({ children, align = 'left' }) => (
  <td style={{ padding: '6px 10px', textAlign: align, verticalAlign: 'middle' }}>{children}</td>
);

Object.assign(window, { ReviewListPage });
