/* 블록 시스템 — 네이버 블로그 스타일 블록 에디터
   하이브리드: 필수 블록(고정) + 자유 추가 영역 */

const BLOCK_TYPES = [
  { kind: 'heading', label: '소제목', icon: 'heading', desc: 'H1 / H2 / H3', group: '텍스트' },
  { kind: 'text', label: '본문', icon: 'type', desc: '여러 줄 서술', group: '텍스트' },
  { kind: 'quote', label: '인용', icon: 'quote', desc: '강조된 한 문장', group: '텍스트' },
  { kind: 'qa', label: 'Q&A 블록', icon: 'help', desc: '질문 + 답변', group: '텍스트' },
  { kind: 'tip', label: 'Tip / Note', icon: 'info', desc: '강조 박스', group: '텍스트' },
  { kind: 'image', label: '이미지', icon: 'image', desc: '단일 이미지', group: '미디어' },
  { kind: 'gallery2', label: '2열 콜라주', icon: 'layout', desc: '이미지 2장', group: '미디어' },
  { kind: 'gallery3', label: '3열 콜라주', icon: 'grid', desc: '이미지 3장', group: '미디어' },
  { kind: 'cta', label: '버튼 링크', icon: 'arrowRight', desc: 'CTA 블록', group: '액션' },
  { kind: 'divider', label: '구분선', icon: 'minus', desc: '섹션 구분', group: '레이아웃' },
  { kind: 'spacer', label: '여백', icon: 'sidebar', desc: '수직 간격', group: '레이아웃' },
];

// 블록 렌더러 — 두 가지 모드: "edit"(에디터에서 작성), "preview"(상세에서 읽기)
function BlockRender({ block, mode = 'preview', accent = 'var(--blue-500)', onUpdate, data }) {
  const d = data || block.data || {};
  const isEdit = mode === 'edit';

  switch (block.kind) {
    case 'heading': {
      const level = d.level || 'h2';
      const fontSize = level === 'h1' ? 26 : level === 'h2' ? 20 : 16;
      return (
        <InlineText mode={mode} value={d.text} placeholder={`${level.toUpperCase()} 제목`}
          onChange={(v) => onUpdate?.({ text: v })}
          style={{
            fontSize, fontWeight: level === 'h1' ? 700 : 600,
            margin: '8px 0', letterSpacing: -0.3,
            color: 'var(--text-primary)',
          }} />
      );
    }
    case 'text':
      return (
        <InlineText mode={mode} multiline value={d.text}
          placeholder="내용을 입력하거나 왼쪽에서 블록을 추가하세요"
          onChange={(v) => onUpdate?.({ text: v })}
          style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text-primary)', margin: '6px 0' }} />
      );
    case 'quote':
      return (
        <div style={{ margin: '8px 0', padding: '14px 18px', borderLeft: `3px solid ${accent}`, background: 'var(--gray-50)', borderRadius: '0 6px 6px 0' }}>
          <InlineText mode={mode} multiline value={d.text} placeholder="인용문을 입력하세요"
            onChange={(v) => onUpdate?.({ text: v })}
            style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-primary)', fontStyle: 'italic', fontWeight: 500 }} />
          {(d.cite || isEdit) && (
            <InlineText mode={mode} value={d.cite} placeholder="— 출처 (선택)"
              onChange={(v) => onUpdate?.({ cite: v })}
              style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 8, display: 'block' }} />
          )}
        </div>
      );
    case 'qa':
      return (
        <div style={{ margin: '8px 0', border: '1px solid var(--border-subtle)', borderRadius: 10, background: '#fff', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', background: 'var(--bg-sunken)', display: 'flex', alignItems: 'flex-start', gap: 10, borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ width: 20, height: 20, flexShrink: 0, borderRadius: 4, background: accent, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>Q</span>
            <InlineText mode={mode} value={d.question} placeholder="질문을 입력하세요"
              onChange={(v) => onUpdate?.({ question: v })}
              style={{ flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }} />
          </div>
          <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{ width: 20, height: 20, flexShrink: 0, borderRadius: 4, background: 'var(--gray-100)', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>A</span>
            <InlineText mode={mode} multiline value={d.answer} placeholder="답변을 입력하세요"
              onChange={(v) => onUpdate?.({ answer: v })}
              style={{ flex: 1, fontSize: 14, lineHeight: 1.75, color: 'var(--text-primary)' }} />
          </div>
        </div>
      );
    case 'tip': {
      const tone = d.tone || 'tip';
      const palette = tone === 'note'
        ? { bg: 'var(--amber-50)', fg: 'var(--amber-700)', icon: 'info' }
        : { bg: 'var(--blue-50)', fg: 'var(--blue-700)', icon: 'sparkle' };
      return (
        <div style={{ margin: '8px 0', padding: '14px 16px', background: palette.bg, borderRadius: 8, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <div style={{ color: palette.fg, marginTop: 1 }}><Icon name={palette.icon} size={16} /></div>
          <div style={{ flex: 1 }}>
            <InlineText mode={mode} value={d.label} placeholder={tone === 'note' ? 'Note' : 'Tip'}
              onChange={(v) => onUpdate?.({ label: v })}
              style={{ fontSize: 11.5, fontWeight: 700, color: palette.fg, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 4 }} />
            <InlineText mode={mode} multiline value={d.text} placeholder="메시지를 입력하세요"
              onChange={(v) => onUpdate?.({ text: v })}
              style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-primary)' }} />
          </div>
        </div>
      );
    }
    case 'image':
      return (
        <figure style={{ margin: '10px 0', borderRadius: 10, overflow: 'hidden' }}>
          <ImagePlaceholder caption={d.alt} tone={d.tone} ratio={d.ratio || '16/9'} mode={mode} />
          {(d.caption || isEdit) && (
            <InlineText mode={mode} value={d.caption} placeholder="이미지 캡션 (선택)"
              onChange={(v) => onUpdate?.({ caption: v })}
              style={{ fontSize: 12, color: 'var(--text-tertiary)', textAlign: 'center', marginTop: 8, fontStyle: 'italic', display: 'block' }} />
          )}
        </figure>
      );
    case 'gallery2':
      return (
        <div style={{ margin: '10px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <ImagePlaceholder ratio="1/1" tone={d.tone1 || 'a'} mode={mode} />
          <ImagePlaceholder ratio="1/1" tone={d.tone2 || 'b'} mode={mode} />
        </div>
      );
    case 'gallery3':
      return (
        <div style={{ margin: '10px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          <ImagePlaceholder ratio="1/1" tone={d.tone1 || 'a'} mode={mode} />
          <ImagePlaceholder ratio="1/1" tone={d.tone2 || 'b'} mode={mode} />
          <ImagePlaceholder ratio="1/1" tone={d.tone3 || 'c'} mode={mode} />
        </div>
      );
    case 'cta':
      return (
        <div style={{
          margin: '16px 0', padding: '18px 22px',
          background: `linear-gradient(135deg, ${accent}11, #fff)`,
          border: `1px solid ${accent}33`, borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{ flex: 1 }}>
            <InlineText mode={mode} value={d.preText} placeholder="상단 문구 (작은 글씨)"
              onChange={(v) => onUpdate?.({ preText: v })}
              style={{ fontSize: 11.5, color: accent, fontWeight: 600, display: 'block', marginBottom: 4 }} />
            <InlineText mode={mode} value={d.title} placeholder="메인 타이틀"
              onChange={(v) => onUpdate?.({ title: v })}
              style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }} />
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 14px', background: accent, color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 500, flexShrink: 0 }}>
            <InlineText mode={mode} value={d.buttonText || '자세히 보기'}
              onChange={(v) => onUpdate?.({ buttonText: v })}
              style={{ color: '#fff' }} />
            <Icon name="arrowRight" size={12} />
          </div>
        </div>
      );
    case 'divider':
      return <div style={{ margin: '16px 0', borderTop: '1px solid var(--border-default)' }} />;
    case 'spacer':
      return <div style={{ height: d.size || 24 }} />;
    default:
      return null;
  }
}

function InlineText({ value, onChange, placeholder, style, multiline, mode }) {
  if (mode === 'edit') {
    const El = multiline ? 'textarea' : 'input';
    return (
      <El value={value || ''} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder}
        rows={multiline ? 1 : undefined}
        style={{
          width: '100%', border: 'none', outline: 'none', background: 'transparent',
          padding: 0, resize: multiline ? 'vertical' : 'none',
          fontFamily: 'inherit',
          ...style,
        }} />
    );
  }
  return <span style={style}>{value || <span style={{ color: 'var(--text-tertiary)' }}>{placeholder}</span>}</span>;
}

function ImagePlaceholder({ ratio = '16/9', tone = 'a', mode, caption }) {
  const tones = {
    a: 'linear-gradient(135deg, #cfd8e3, #a8b5c4)',
    b: 'linear-gradient(135deg, #d9c9b4, #c0a88a)',
    c: 'linear-gradient(135deg, #c4d4c8, #9ab3a4)',
  };
  return (
    <div style={{
      aspectRatio: ratio, background: tones[tone] || tones.a,
      borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgba(255,255,255,.8)', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,.25), transparent 60%)' }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontSize: 11 }}>
        <Icon name="image" size={22} />
        {mode === 'edit' && <span>클릭하여 업로드</span>}
      </div>
    </div>
  );
}

/* 블록 팔레트 — 좌측 사이드에 배치 */
function BlockPalette({ onAdd }) {
  const groups = {};
  BLOCK_TYPES.forEach((b) => { (groups[b.group] = groups[b.group] || []).push(b); });
  return (
    <div className="cc-scroll" style={{ width: 220, flexShrink: 0, borderRight: '1px solid var(--border-subtle)', background: 'var(--bg-sunken)', overflow: 'auto', padding: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>블록 팔레트</div>
      {Object.entries(groups).map(([g, items]) => (
        <div key={g} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500, padding: '0 4px 6px' }}>{g}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {items.map((b) => (
              <button key={b.kind} onClick={() => onAdd?.(b.kind)}
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
      <div style={{ padding: 10, background: 'var(--blue-50)', borderRadius: 6, fontSize: 11.5, color: 'var(--blue-700)', lineHeight: 1.5 }}>
        <strong>Tip.</strong> 블록을 클릭하면 현재 위치에 추가되고, 우측 에디터에서 드래그 핸들로 순서를 바꿀 수 있어요.
      </div>
    </div>
  );
}

Object.assign(window, { BLOCK_TYPES, BlockRender, BlockPalette });
