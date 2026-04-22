/* C. 템플릿 관리 페이지
   구조: 전체 템플릿 선택 → 부분 템플릿(섹션) 리스트/관리 → 선택한 섹션의 블록 편집
*/

const TemplatesPage = ({ brandId }) => {
  const brand = BRANDS.find((b) => b.id === brandId);
  const brandTpls = TEMPLATES.filter((t) => t.brand === brandId);
  const [selectedId, setSelectedId] = React.useState(brandTpls[0]?.id);
  const tpl = brandTpls.find((t) => t.id === selectedId) || brandTpls[0];

  /* 전체 템플릿 내부의 섹션들을 상태로 관리 */
  const [sections, setSections] = React.useState(tpl?.sections || []);
  const [selectedSectionId, setSelectedSectionId] = React.useState(tpl?.sections?.[0]?.id);

  React.useEffect(() => {
    setSections(tpl?.sections || []);
    setSelectedSectionId(tpl?.sections?.[0]?.id);
  }, [tpl?.id]);

  const selectedSection = sections.find((s) => s.id === selectedSectionId) || sections[0];

  /* 섹션(부분 템플릿) CRUD */
  const addSection = () => {
    const newS = {
      id: `s-${Date.now()}`,
      name: '새 부분 템플릿',
      description: '설명을 입력하세요',
      blocks: [],
    };
    setSections([...sections, newS]);
    setSelectedSectionId(newS.id);
  };
  const updateSection = (id, patch) => {
    setSections(sections.map((s) => s.id === id ? { ...s, ...patch } : s));
  };
  const removeSection = (id) => {
    const next = sections.filter((s) => s.id !== id);
    setSections(next);
    if (selectedSectionId === id) setSelectedSectionId(next[0]?.id);
  };
  const moveSection = (id, dir) => {
    const i = sections.findIndex((s) => s.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= sections.length) return;
    const next = sections.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setSections(next);
  };

  /* 블록 CRUD (선택한 섹션 내에서) */
  const addBlock = (kind) => {
    if (!selectedSection) return;
    const newB = { id: `b${Date.now()}`, kind, required: false, data: {} };
    updateSection(selectedSection.id, { blocks: [...(selectedSection.blocks || []), newB] });
  };
  const updateBlock = (blockId, patch) => {
    if (!selectedSection) return;
    const nextBlocks = selectedSection.blocks.map((b) =>
      b.id === blockId ? { ...b, data: { ...b.data, ...patch } } : b
    );
    updateSection(selectedSection.id, { blocks: nextBlocks });
  };
  const toggleBlockRequired = (blockId) => {
    if (!selectedSection) return;
    const nextBlocks = selectedSection.blocks.map((b) =>
      b.id === blockId ? { ...b, required: !b.required } : b
    );
    updateSection(selectedSection.id, { blocks: nextBlocks });
  };
  const removeBlock = (blockId) => {
    if (!selectedSection) return;
    updateSection(selectedSection.id, { blocks: selectedSection.blocks.filter((b) => b.id !== blockId) });
  };

  const totalBlocks = sections.reduce((acc, s) => acc + (s.blocks?.length || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PageHeader
        title="템플릿 관리"
        subtitle={`${brand.name} · ${brandTpls.length}개 전체 템플릿`}
        actions={
          <>
            <Button icon="eye">미리보기</Button>
            <Button icon="copy">복제</Button>
            <Button variant="primary" icon="save">저장</Button>
          </>
        }
      />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* 1단 — 전체 템플릿 목록 */}
        <div style={{ width: 220, flexShrink: 0, borderRight: '1px solid var(--border-subtle)', background: 'var(--bg-sunken)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 12px 8px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
              전체 템플릿
            </div>
            <Input size="sm" icon="search" placeholder="템플릿 검색" />
          </div>
          <div className="cc-scroll" style={{ flex: 1, overflow: 'auto', padding: 8 }}>
            {brandTpls.map((t) => (
              <button key={t.id} onClick={() => setSelectedId(t.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', border: 'none',
                  padding: '10px 12px', marginBottom: 4, borderRadius: 6,
                  background: t.id === selectedId ? '#fff' : 'transparent',
                  boxShadow: t.id === selectedId ? 'var(--shadow-xs)' : 'none',
                  cursor: 'pointer',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</span>
                  {t.status === 'draft' && <Badge tone="amber" style={{ fontSize: 10 }}>초안</Badge>}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', display: 'flex', gap: 4 }}>
                  <span>섹션 {t.sections?.length || 0}</span><span>·</span>
                  <span>블록 {t.blocks?.length || 0}</span><span>·</span>
                  <span>{t.useCount}회</span>
                </div>
              </button>
            ))}
            <button style={{
              display: 'block', width: '100%', textAlign: 'left', border: '1px dashed var(--border-default)',
              padding: '10px 12px', marginTop: 4, borderRadius: 6, background: 'transparent',
              cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 12.5,
            }}>+ 새 전체 템플릿</button>
          </div>
        </div>

        {/* 2단 — 부분 템플릿(섹션) 목록 */}
        <div style={{ width: 240, flexShrink: 0, borderRight: '1px solid var(--border-subtle)', background: '#fff', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 3 }}>
              부분 템플릿
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {tpl?.name} 내부 섹션 {sections.length}개
            </div>
          </div>
          <div className="cc-scroll" style={{ flex: 1, overflow: 'auto', padding: 10 }}>
            {sections.map((s, idx) => {
              const isSel = s.id === selectedSectionId;
              return (
                <div key={s.id}
                  onClick={() => setSelectedSectionId(s.id)}
                  style={{
                    padding: '10px 12px', marginBottom: 6, borderRadius: 8,
                    background: isSel ? 'var(--blue-50)' : '#fff',
                    border: `1px solid ${isSel ? 'var(--blue-400)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer', position: 'relative',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, width: 18, height: 18, borderRadius: 4,
                      background: isSel ? 'var(--blue-500)' : 'var(--gray-100)',
                      color: isSel ? '#fff' : 'var(--text-tertiary)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontVariantNumeric: 'tabular-nums',
                    }}>{idx + 1}</span>
                    <span style={{
                      fontSize: 12.5, fontWeight: 600,
                      color: isSel ? 'var(--blue-700)' : 'var(--text-primary)',
                      flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{s.name}</span>
                  </div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', marginBottom: 4, lineHeight: 1.4 }}>
                    {s.description}
                  </div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)' }}>
                    블록 {s.blocks?.length || 0}개
                  </div>
                  {/* 액션 — hover 시 표시 */}
                  <div style={{
                    position: 'absolute', right: 6, top: 6,
                    display: isSel ? 'flex' : 'none', gap: 1,
                  }} onClick={(e) => e.stopPropagation()}>
                    <IconButton icon="chevronUp" size="sm" disabled={idx === 0} onClick={() => moveSection(s.id, -1)} />
                    <IconButton icon="chevronDown" size="sm" disabled={idx === sections.length - 1} onClick={() => moveSection(s.id, 1)} />
                    <IconButton icon="trash" size="sm" danger onClick={() => removeSection(s.id)} />
                  </div>
                </div>
              );
            })}
            <button onClick={addSection}
              style={{
                display: 'block', width: '100%', textAlign: 'center',
                padding: '10px 12px', borderRadius: 8, background: 'transparent',
                border: '1px dashed var(--border-default)',
                cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500,
              }}>+ 새 부분 템플릿</button>
          </div>
        </div>

        {/* 3단 — 블록 팔레트 */}
        <BlockPalette onAdd={addBlock} />

        {/* 4단 — 블록 편집 영역 */}
        <div className="cc-scroll" style={{ flex: 1, overflow: 'auto', background: 'var(--bg-canvas)' }}>
          <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 32px 120px' }}>
            {/* 전체 템플릿 메타 */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: -0.3 }}>{tpl.name}</h2>
                {tpl.status === 'draft' && <Badge tone="amber">초안</Badge>}
                {tpl.status === 'active' && <Badge tone="green" dot>활성</Badge>}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>{tpl.description}</p>
              <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 12, color: 'var(--text-tertiary)' }}>
                <span>리뷰 타입: <strong style={{ color: 'var(--text-secondary)' }}>{tpl.type}</strong></span>
                <span>·</span>
                <span>섹션 <strong style={{ color: 'var(--text-secondary)' }}>{sections.length}</strong></span>
                <span>·</span>
                <span>블록 <strong style={{ color: 'var(--text-secondary)' }}>{totalBlocks}</strong></span>
                <span>·</span>
                <span>사용 {tpl.useCount}건</span>
              </div>
            </div>

            {/* 선택된 섹션 편집 */}
            {selectedSection ? (
              <>
                <div style={{
                  background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 10,
                  padding: '16px 20px', marginBottom: 12,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--blue-600)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                    부분 템플릿 편집
                  </div>
                  <input
                    value={selectedSection.name}
                    onChange={(e) => updateSection(selectedSection.id, { name: e.target.value })}
                    style={{
                      width: '100%', border: 'none', outline: 'none', padding: '2px 0',
                      fontSize: 18, fontWeight: 600, color: 'var(--text-primary)',
                      fontFamily: 'inherit', letterSpacing: -0.2,
                    }}
                    placeholder="부분 템플릿 이름"
                  />
                  <input
                    value={selectedSection.description}
                    onChange={(e) => updateSection(selectedSection.id, { description: e.target.value })}
                    style={{
                      width: '100%', border: 'none', outline: 'none', padding: '2px 0',
                      fontSize: 12.5, color: 'var(--text-secondary)',
                      fontFamily: 'inherit', marginTop: 2,
                    }}
                    placeholder="부분 템플릿에 대한 짧은 설명"
                  />
                </div>

                <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: '20px 24px' }}>
                  {(selectedSection.blocks || []).map((b, i) => (
                    <BlockWrapper key={b.id} block={b} index={i}
                      onToggleRequired={() => toggleBlockRequired(b.id)}
                      onRemove={() => removeBlock(b.id)}
                      onUpdate={(patch) => updateBlock(b.id, patch)}
                      accent={brand.color} />
                  ))}
                  {(!selectedSection.blocks || selectedSection.blocks.length === 0) && (
                    <div style={{
                      padding: '28px 16px', textAlign: 'center',
                      color: 'var(--text-tertiary)', fontSize: 12.5,
                    }}>
                      왼쪽 블록 팔레트에서 블록을 선택해 추가하세요
                    </div>
                  )}
                </div>

                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--text-tertiary)' }}>
                  <span>필수 블록 {(selectedSection.blocks || []).filter((b) => b.required).length} / 전체 {selectedSection.blocks?.length || 0}</span>
                  <span>작성자는 필수 블록을 삭제할 수 없습니다</span>
                </div>
              </>
            ) : (
              <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>
                좌측에서 부분 템플릿을 선택하거나, 새로 추가해주세요
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function BlockWrapper({ block, index, onToggleRequired, onRemove, onUpdate, accent }) {
  const [hover, setHover] = React.useState(false);
  const kind = BLOCK_TYPES.find((k) => k.kind === block.kind);
  return (
    <div style={{ position: 'relative', margin: '4px -12px', padding: '4px 12px', borderRadius: 6, background: hover ? 'var(--bg-sunken)' : 'transparent' }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {/* 좌측 핸들 + 넘버 */}
      <div style={{
        position: 'absolute', left: -44, top: 8, display: 'flex', alignItems: 'center', gap: 2,
        opacity: hover ? 1 : 0.35, transition: 'opacity .12s',
      }}>
        <span style={{ fontSize: 10, fontVariantNumeric: 'tabular-nums', color: 'var(--text-tertiary)', fontWeight: 600, width: 16, textAlign: 'right' }}>{String(index + 1).padStart(2, '0')}</span>
        <IconButton icon="drag" size="sm" />
      </div>
      {/* 우측 액션 */}
      <div style={{
        position: 'absolute', right: -4, top: 4, display: 'flex', alignItems: 'center', gap: 2,
        opacity: hover ? 1 : 0, transition: 'opacity .12s',
      }}>
        <button onClick={onToggleRequired}
          style={{
            fontSize: 10.5, fontWeight: 600, padding: '3px 7px', borderRadius: 10,
            border: `1px solid ${block.required ? 'var(--red-500)' : 'var(--border-default)'}`,
            background: block.required ? 'var(--red-50)' : '#fff',
            color: block.required ? 'var(--red-600)' : 'var(--text-tertiary)',
            cursor: 'pointer',
          }}>{block.required ? '필수' : '선택'}</button>
        <IconButton icon="trash" size="sm" danger onClick={onRemove} />
      </div>
      {/* 타입 라벨 */}
      {hover && (
        <div style={{ position: 'absolute', right: 80, top: 8, fontSize: 10.5, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name={kind?.icon || 'type'} size={11} /> {kind?.label}
        </div>
      )}
      <BlockRender block={block} mode="edit" accent={accent} onUpdate={onUpdate} />
    </div>
  );
}

Object.assign(window, { TemplatesPage });
