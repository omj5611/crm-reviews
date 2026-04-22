/* B. 후기 등록/수정 페이지 — 블록 기반 에디터
   레이아웃:
   - 상단 섹션: 흰색 배경
   - 좌측 사이드: 교육과정/리뷰타입/템플릿/썸네일/노출설정/CTA
   - 중앙: 제목 + 블록 편집
   - 우측 사이드: [부분 템플릿] [블록] 탭
*/

const EditorPage = ({ brandId, onClose }) => {
  const brand = BRANDS.find((b) => b.id === brandId);
  const courses = COURSES[brandId] || [];
  const brandTemplates = TEMPLATES.filter((t) => t.brand === brandId && t.status === 'active');

  const [data, setData] = React.useState({
    title: '비전공자에서 프론트엔드 개발자까지, 5개월의 기록',
    course: courses[0]?.name || '',
    type: brand.reviewTypes[0],
    author: '김서연',
    templateId: brandTemplates[0]?.id,
    thumb: { bg: brand.color, fg: '#ffffff' },
    visibility: { published: true, best: true, featured: false, pinned: false },
    cta: {
      enabled: true,
      text: brand.ctaDefault || '자세히 보기',
      link: 'https://example.com/course/detail',
    },
  });

  const tpl = brandTemplates.find((t) => t.id === data.templateId);
  const [blocks, setBlocks] = React.useState(tpl?.blocks || []);
  const [focusBlockId, setFocusBlockId] = React.useState(null);

  React.useEffect(() => {
    // 템플릿 변경 시 기본값으로 리셋 + 샘플 답변 몇 개 채움
    const b = (tpl?.blocks || []).map((x) => ({ ...x, data: { ...x.data } }));
    if (b[4]?.kind === 'qa') b[4].data.answer = '대학교 4학년, 취업 시즌이 다가오면서 "내가 정말 이 일을 평생 할 수 있을까"라는 고민이 커졌어요. 그러던 중 친구 추천으로 스나이퍼팩토리를 알게 됐고, 무료 설명회에서 커리큘럼이 실무와 가깝다는 점에 끌렸습니다.';
    if (b[5]?.kind === 'qa') b[5].data.answer = '비전공자가 5개월 만에 개발자가 될 수 있을까, 라는 현실적인 고민이 가장 컸어요.';
    if (b[6]?.kind === 'qa') b[6].data.answer = '1:1 멘토링이 결정적이었습니다. 매주 금요일마다 현직 개발자 멘토님과 코드 리뷰를 하며 실무 관점을 익힐 수 있었어요.';
    setBlocks(b);
  }, [tpl?.id]);

  const setField = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const setNested = (k, sub, v) => setData((d) => ({ ...d, [k]: { ...d[k], [sub]: v } }));
  const updateBlock = (id, patch) => setBlocks((bs) => bs.map((b) => b.id === id ? { ...b, data: { ...b.data, ...patch } } : b));
  const removeBlock = (id) => setBlocks((bs) => bs.filter((b) => b.id !== id || b.required));
  const moveBlock = (id, dir) => {
    setBlocks((bs) => {
      const i = bs.findIndex((b) => b.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= bs.length) return bs;
      const next = bs.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };
  const addBlock = (kind, afterId) => {
    const newB = { id: `b${Date.now()}`, kind, required: false, data: {} };
    setBlocks((bs) => {
      if (!afterId) return [...bs, newB];
      const i = bs.findIndex((b) => b.id === afterId);
      return [...bs.slice(0, i + 1), newB, ...bs.slice(i + 1)];
    });
    setFocusBlockId(newB.id);
  };

  /* 부분 템플릿(섹션) 삽입 - 템플릿에서 선택한 섹션의 블록들을 현재 커서 위치에 추가 */
  const insertSection = (section, afterId) => {
    const newBlocks = (section.blocks || []).map((b) => ({
      ...b,
      id: `${b.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      data: { ...b.data },
      required: false, // 사용자 삽입은 필수 아님
    }));
    setBlocks((bs) => {
      if (!afterId) return [...bs, ...newBlocks];
      const i = bs.findIndex((b) => b.id === afterId);
      return [...bs.slice(0, i + 1), ...newBlocks, ...bs.slice(i + 1)];
    });
    if (newBlocks.length > 0) setFocusBlockId(newBlocks[newBlocks.length - 1].id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      {/* 상단 — 흰색 배경 */}
      <PageHeader
        background="#fff"
        breadcrumbs={['콘텐츠', '후기 리스트', '수정']}
        title="후기 수정"
        subtitle="변경사항은 자동 저장됩니다"
        actions={
          <>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginRight: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--green-500)' }} />
              2분 전 저장됨
            </div>
            {onClose && <Button icon="close" onClick={onClose}>닫기</Button>}
            <Button icon="history">히스토리</Button>
            <Button icon="eye">미리보기</Button>
            <Button variant="primary" icon="send">공개</Button>
          </>
        }
      />
      {/* 상단 하단 구분선 */}
      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingTop: 16, flexShrink: 0, background: '#fff' }} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* 좌측 — 후기 설정 사이드바 */}
        <ReviewSettingsSidebar
          brand={brand}
          courses={courses}
          brandTemplates={brandTemplates}
          data={data}
          tpl={tpl}
          setField={setField}
          setNested={setNested}
        />

        {/* 가운데 — 에디터 */}
        <div className="cc-scroll" style={{ flex: 1, overflow: 'auto', background: 'var(--bg-canvas)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 40px 120px' }}>
            {/* 제목 카드 */}
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: '18px 22px', marginBottom: 16 }}>
              <Field label="제목" required>
                <input value={data.title} onChange={(e) => setField('title', e.target.value)}
                  style={{
                    width: '100%', border: 'none', outline: 'none', padding: '4px 0',
                    fontSize: 22, fontWeight: 700, color: 'var(--text-primary)',
                    fontFamily: 'inherit', letterSpacing: -0.3,
                  }} placeholder="제목을 입력하세요" />
              </Field>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11.5, color: 'var(--text-tertiary)', paddingTop: 10, borderTop: '1px solid var(--border-subtle)', marginTop: 8 }}>
                <Icon name="template" size={12} />
                <span><strong style={{ color: 'var(--text-secondary)' }}>{tpl?.name}</strong> 사용 중 · 필수 {blocks.filter((b) => b.required).length} / 전체 {blocks.length} 블록</span>
              </div>
            </div>

            {/* 블록 편집 영역 */}
            <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: '20px 24px' }}>
              {blocks.map((b, i) => (
                <EditableBlock key={b.id} block={b} index={i}
                  total={blocks.length}
                  focused={focusBlockId === b.id}
                  accent={brand.color}
                  onFocus={() => setFocusBlockId(b.id)}
                  onUpdate={(patch) => updateBlock(b.id, patch)}
                  onRemove={() => removeBlock(b.id)}
                  onMove={(dir) => moveBlock(b.id, dir)}
                  onAddAfter={(kind) => addBlock(kind, b.id)} />
              ))}
              <button onClick={() => setFocusBlockId(null)}
                style={{
                  width: '100%', padding: 14, marginTop: 8, border: '1.5px dashed var(--border-default)',
                  borderRadius: 8, background: 'var(--bg-sunken)', color: 'var(--text-tertiary)',
                  fontSize: 12.5, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                <Icon name="plus" size={14} /> 여기에 자유롭게 블록 추가 — 오른쪽에서 선택
              </button>
            </div>
          </div>
        </div>

        {/* 우측 — 탭형 사이드 (부분 템플릿 / 블록) */}
        <EditorRightSidebar
          brandTemplates={brandTemplates}
          currentTemplateId={data.templateId}
          onInsertSection={(section) => insertSection(section, focusBlockId)}
          onAddBlock={(kind) => addBlock(kind, focusBlockId)}
        />
      </div>
    </div>
  );
};

/* 좌측 사이드바 — 후기 설정 */
function ReviewSettingsSidebar({ brand, courses, brandTemplates, data, tpl, setField, setNested }) {
  return (
    <aside className="cc-scroll" style={{
      width: 260, flexShrink: 0, borderRight: '1px solid var(--border-subtle)',
      background: 'var(--bg-sunken)', overflow: 'auto', padding: '18px 16px',
    }}>
      <SidePanel title="교육과정">
        <Select value={data.course} onChange={(v) => setField('course', v)}
          options={courses.map((c) => c.name)} style={{ width: '100%' }} />
      </SidePanel>

      <SidePanel title="리뷰 타입">
        <Select value={data.type} onChange={(v) => setField('type', v)}
          options={brand.reviewTypes} style={{ width: '100%' }} />
      </SidePanel>

      <SidePanel title="템플릿">
        <Select value={data.templateId} onChange={(v) => setField('templateId', v)}
          options={brandTemplates.map((t) => ({ value: t.id, label: t.name }))}
          style={{ width: '100%' }} />
        {tpl && (
          <div style={{
            marginTop: 6, padding: '8px 10px', background: '#fff', borderRadius: 6,
            border: '1px solid var(--border-subtle)', fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.5,
          }}>
            섹션 {tpl.sections?.length || 0}개 · 블록 {tpl.blocks?.length || 0}개
          </div>
        )}
      </SidePanel>

      <SidePanel title="썸네일">
        <div style={{
          height: 96, borderRadius: 8, marginBottom: 8,
          background: `linear-gradient(135deg, ${data.thumb.bg}, ${data.thumb.bg}cc)`,
          color: data.thumb.fg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--border-default)', position: 'relative',
        }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 8, background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,.22), transparent 60%)' }} />
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Icon name="image" size={18} style={{ opacity: 0.8 }} />
            <span style={{ fontSize: 10, opacity: 0.85 }}>업로드 또는 자동생성</span>
          </div>
        </div>
        <Button variant="secondary" icon="upload" size="sm" style={{ width: '100%' }}>파일 선택</Button>
      </SidePanel>

      <SidePanel title="노출 설정">
        <Toggle label="공개 여부" hint="외부 노출" checked={data.visibility.published} onChange={(v) => setNested('visibility', 'published', v)} />
        <Toggle label="Best 지정" hint="브랜드 Best" checked={data.visibility.best} onChange={(v) => setNested('visibility', 'best', v)} />
        <Toggle label="대표 노출" hint="메인 배너" checked={data.visibility.featured} onChange={(v) => setNested('visibility', 'featured', v)} />
        <Toggle label="리스트 핀" hint="최상단 고정" checked={data.visibility.pinned} onChange={(v) => setNested('visibility', 'pinned', v)} />
      </SidePanel>

      <SidePanel title="CTA 버튼">
        <Toggle
          label="CTA 활성화"
          hint="본문 하단 버튼"
          checked={data.cta.enabled}
          onChange={(v) => setNested('cta', 'enabled', v)}
        />
        <div style={{
          opacity: data.cta.enabled ? 1 : 0.4,
          pointerEvents: data.cta.enabled ? 'auto' : 'none',
          paddingTop: 4,
        }}>
          <div style={{ marginTop: 8 }}>
            <MiniLabel>버튼 텍스트</MiniLabel>
            <Input
              size="sm"
              value={data.cta.text}
              onChange={(v) => setNested('cta', 'text', v)}
              placeholder="예: 자세히 보기"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginTop: 8 }}>
            <MiniLabel>링크 URL</MiniLabel>
            <Input
              size="sm"
              icon="link"
              value={data.cta.link}
              onChange={(v) => setNested('cta', 'link', v)}
              placeholder="https://..."
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </SidePanel>
    </aside>
  );
}

/* 우측 사이드바 — 탭 (부분 템플릿 / 블록) */
function EditorRightSidebar({ brandTemplates, currentTemplateId, onInsertSection, onAddBlock }) {
  const [tab, setTab] = React.useState('sections');

  return (
    <aside style={{
      width: 300, flexShrink: 0, borderLeft: '1px solid var(--border-subtle)',
      background: 'var(--bg-surface)', display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* 탭 헤더 */}
      <div style={{
        display: 'flex', borderBottom: '1px solid var(--border-subtle)',
        background: '#fff', flexShrink: 0,
      }}>
        <TabButton active={tab === 'sections'} onClick={() => setTab('sections')}>
          <Icon name="template" size={13} /> 부분 템플릿
        </TabButton>
        <TabButton active={tab === 'blocks'} onClick={() => setTab('blocks')}>
          <Icon name="grid" size={13} /> 블록
        </TabButton>
      </div>

      <div className="cc-scroll" style={{ flex: 1, overflow: 'auto', padding: '14px 14px' }}>
        {tab === 'sections' ? (
          <SectionsPanel brandTemplates={brandTemplates} currentTemplateId={currentTemplateId} onInsert={onInsertSection} />
        ) : (
          <BlocksPanel onAdd={onAddBlock} />
        )}
      </div>
    </aside>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '11px 0', border: 'none', background: 'transparent',
      borderBottom: `2px solid ${active ? 'var(--blue-500)' : 'transparent'}`,
      color: active ? 'var(--blue-700)' : 'var(--text-tertiary)',
      fontSize: 12.5, fontWeight: active ? 600 : 500, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
    }}>
      {children}
    </button>
  );
}

/* 부분 템플릿 패널 — 전체 템플릿(취업후기/수강후기)별로 섹션 목록 */
function SectionsPanel({ brandTemplates, currentTemplateId, onInsert }) {
  const [openId, setOpenId] = React.useState(currentTemplateId);

  React.useEffect(() => {
    if (currentTemplateId) setOpenId(currentTemplateId);
  }, [currentTemplateId]);

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
        전체 템플릿 → 부분 템플릿
      </div>
      {brandTemplates.map((tpl) => {
        const isOpen = openId === tpl.id;
        return (
          <div key={tpl.id} style={{
            marginBottom: 8, border: '1px solid var(--border-subtle)', borderRadius: 8,
            background: '#fff', overflow: 'hidden',
          }}>
            {/* 전체 템플릿 헤더 (토글) */}
            <button
              onClick={() => setOpenId(isOpen ? null : tpl.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 12px', border: 'none', background: isOpen ? 'var(--bg-sunken)' : '#fff',
                cursor: 'pointer', textAlign: 'left',
              }}>
              <Icon name={isOpen ? 'chevronDown' : 'chevronRight'} size={12} style={{ color: 'var(--text-tertiary)' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {tpl.name}
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', marginTop: 1 }}>
                  섹션 {tpl.sections?.length || 0}개
                </div>
              </div>
            </button>
            {/* 부분 템플릿(섹션) 리스트 */}
            {isOpen && (
              <div style={{ padding: '4px 8px 10px', borderTop: '1px solid var(--border-subtle)' }}>
                {(tpl.sections || []).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onInsert(s)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'flex-start', gap: 8,
                      padding: '9px 8px', marginTop: 4, border: '1px solid var(--border-subtle)',
                      borderRadius: 6, background: '#fff', cursor: 'pointer', textAlign: 'left',
                      transition: 'all .1s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--blue-400)';
                      e.currentTarget.style.background = 'var(--blue-50)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.background = '#fff';
                    }}>
                    <div style={{
                      width: 22, height: 22, flexShrink: 0, borderRadius: 4,
                      background: 'var(--blue-50)', color: 'var(--blue-600)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name="layout" size={11} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                        {s.name}
                      </div>
                      <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', marginTop: 1, lineHeight: 1.4 }}>
                        {s.description} · 블록 {s.blocks?.length || 0}
                      </div>
                    </div>
                    <Icon name="plus" size={12} style={{ color: 'var(--text-tertiary)', flexShrink: 0, marginTop: 4 }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div style={{
        padding: 10, background: 'var(--blue-50)', borderRadius: 6,
        fontSize: 11, color: 'var(--blue-700)', lineHeight: 1.5, marginTop: 8,
      }}>
        <strong>Tip.</strong> 부분 템플릿을 클릭하면 현재 커서 위치에 블록들이 삽입됩니다.
      </div>
    </div>
  );
}

/* 블록 패널 — 개별 블록 추가 */
function BlocksPanel({ onAdd }) {
  const groups = {};
  BLOCK_TYPES.forEach((b) => { (groups[b.group] = groups[b.group] || []).push(b); });

  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
        블록 추가
      </div>
      {Object.entries(groups).map(([g, items]) => (
        <div key={g} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500, padding: '0 4px 6px' }}>{g}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {items.map((b) => (
              <button key={b.kind} onClick={() => onAdd(b.kind)}
                title={b.desc}
                style={{
                  padding: '10px 8px', background: '#fff', border: '1px solid var(--border-default)',
                  borderRadius: 6, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 4, color: 'var(--text-secondary)', transition: 'all .12s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--blue-400)'; e.currentTarget.style.color = 'var(--blue-600)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                <Icon name={b.icon} size={15} />
                <span style={{ fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap' }}>{b.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <div style={{
        padding: 10, background: 'var(--blue-50)', borderRadius: 6,
        fontSize: 11, color: 'var(--blue-700)', lineHeight: 1.5,
      }}>
        <strong>Tip.</strong> 블록을 클릭하면 현재 위치에 추가되고, 드래그 핸들로 순서를 바꿀 수 있어요.
      </div>
    </div>
  );
}

function EditableBlock({ block, index, total, focused, accent, onFocus, onUpdate, onRemove, onMove }) {
  const [hover, setHover] = React.useState(false);
  const kind = BLOCK_TYPES.find((k) => k.kind === block.kind);
  const active = hover || focused;
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={onFocus}
      style={{
        position: 'relative', margin: '2px -14px', padding: '4px 14px', borderRadius: 6,
        background: focused ? 'var(--blue-50)' : hover ? 'var(--bg-sunken)' : 'transparent',
        transition: 'background .1s',
      }}>
      {/* 좌측 핸들 */}
      <div style={{
        position: 'absolute', left: -40, top: 8, display: 'flex', flexDirection: 'column', gap: 1,
        opacity: active ? 1 : 0.3, transition: 'opacity .12s',
      }}>
        <IconButton icon="chevronUp" size="sm" disabled={index === 0} onClick={(e) => { e.stopPropagation(); onMove(-1); }} />
        <IconButton icon="chevronDown" size="sm" disabled={index === total - 1} onClick={(e) => { e.stopPropagation(); onMove(1); }} />
      </div>
      {/* 우측 액션 */}
      <div style={{
        position: 'absolute', right: -8, top: 6, display: 'flex', alignItems: 'center', gap: 4,
        opacity: active ? 1 : 0, transition: 'opacity .12s',
      }}>
        {block.required && (
          <span style={{
            fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 8,
            background: 'var(--red-50)', color: 'var(--red-600)',
            border: '1px solid var(--red-200)',
          }}>필수</span>
        )}
        <span style={{ fontSize: 10.5, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 3 }}>
          <Icon name={kind?.icon || 'type'} size={10} />{kind?.label}
        </span>
        {!block.required && <IconButton icon="trash" size="sm" danger onClick={(e) => { e.stopPropagation(); onRemove(); }} />}
      </div>
      <BlockRender block={block} mode="edit" accent={accent} onUpdate={onUpdate} />
    </div>
  );
}

const Field = ({ label, required, children }) => (
  <div>
    <label style={{ display: 'block', fontSize: 11.5, fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.4 }}>
      {label}{required && <span style={{ color: 'var(--red-500)', marginLeft: 2 }}>*</span>}
    </label>
    {children}
  </div>
);

const MiniLabel = ({ children }) => (
  <div style={{ fontSize: 10.5, fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: 4 }}>{children}</div>
);

const Toggle = ({ label, hint, checked, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</div>
      {hint && <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', marginTop: 1 }}>{hint}</div>}
    </div>
    <Switch checked={checked} onChange={onChange} size="sm" />
  </div>
);

const SidePanel = ({ title, children }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>{title}</div>
    {children}
  </div>
);

Object.assign(window, { EditorPage });
