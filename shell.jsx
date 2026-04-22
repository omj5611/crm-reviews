/* 공통 셸
   - 상단 글로벌 헤더 (로고 + 제품명 + 우측 워크스페이스 탭)
   - 얇은 아이콘 레일 (좌측 48px)
   - 콘텐츠 네비게이션 패널 (섹션 그룹 + 메뉴) — 에디터 페이지에서는 숨김
*/

const ICON_RAIL = [
  { key: 'course', icon: 'book', label: '교육과정' },
  { key: 'learner', icon: 'user', label: '수강생', active: true },
  { key: 'org', icon: 'users', label: '조직' },
  { key: 'display', icon: 'sidebar', label: '노출' },
  { key: 'settings', icon: 'settings', label: '설정' },
];

/* 후기 등록(editor)은 리스트에서 [새 후기] 버튼으로 진입하므로 내비에서 제거 */
const CONTENT_NAV = [
  { key: 'banner', icon: 'image', label: '배너' },
  { key: 'notice', icon: 'bell', label: '공지사항' },
  { key: 'faq', icon: 'help', label: 'FAQ' },
  { key: 'article', icon: 'list', label: '아티클' },
  { key: 'list', icon: 'quote', label: '수강 후기', active: true },
  { key: 'templates', icon: 'template', label: '템플릿 관리' },
];

/* 글로벌 상단 헤더 */
const TopHeader = ({ brandId, onBrandChange }) => {
  const brand = BRANDS.find((b) => b.id === brandId) || BRANDS[0];
  return (
    <div style={{
      height: 48, flexShrink: 0, display: 'flex', alignItems: 'center',
      padding: '0 16px', background: '#fff',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      {/* 로고 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 16 }}>
        <div style={{ width: 22, height: 22, borderRadius: 5, background: 'var(--blue-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: -0.2 }}>
          sniperfactory
        </div>
        <span style={{ fontSize: 12.5, color: 'var(--text-tertiary)', marginLeft: 2 }}>통합관리솔루션</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* 우측 워크스페이스 탭 */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: 2,
        background: 'var(--gray-75)', borderRadius: 6, gap: 1,
      }}>
        {BRANDS.map((b) => (
          <button key={b.id} onClick={() => onBrandChange?.(b.id)}
            style={{
              padding: '5px 14px', fontSize: 12, border: 'none', borderRadius: 4,
              background: b.id === brandId ? '#fff' : 'transparent',
              color: b.id === brandId ? 'var(--text-primary)' : 'var(--text-tertiary)',
              fontWeight: b.id === brandId ? 600 : 400,
              boxShadow: b.id === brandId ? '0 1px 2px rgba(0,0,0,.06)' : 'none',
              cursor: 'pointer',
            }}>
            {b.short === 'SNF' ? '스팩' : b.short === 'IO' ? '인아' : b.short === 'HC' ? '한컴' : b.short}
          </button>
        ))}
      </div>
    </div>
  );
};

/* 아이콘 레일 (좌측 얇은 바) */
const IconRail = () => {
  return (
    <div style={{
      width: 48, flexShrink: 0, background: '#fff',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '14px 0',
    }}>
      {ICON_RAIL.map((item) => (
        <button key={item.key} title={item.label}
          style={{
            width: 36, height: 36, marginBottom: 4, borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: item.active ? 'var(--blue-50)' : 'transparent',
            color: item.active ? 'var(--blue-600)' : 'var(--text-tertiary)',
            border: 'none', cursor: 'pointer',
          }}>
          <Icon name={item.icon} size={17} />
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <div style={{ position: 'relative' }}>
        <Avatar name="안" color="var(--gray-700)" size={30} />
        <span style={{
          position: 'absolute', bottom: -2, right: -2,
          width: 10, height: 10, borderRadius: 5,
          background: 'var(--green-500)', border: '2px solid #fff',
        }} />
      </div>
    </div>
  );
};

/* 콘텐츠 섹션 네비게이션 (두 번째 사이드) */
const ContentNav = ({ currentPage, onNav }) => {
  return (
    <aside style={{
      width: 200, flexShrink: 0, background: '#fff',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex', flexDirection: 'column', padding: '18px 12px',
    }}>
      <div style={{ padding: '6px 10px 14px', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
        콘텐츠 관리
      </div>
      {CONTENT_NAV.map((item) => {
        const isActive = item.key === currentPage || (item.key === 'list' && (currentPage === 'detail' || currentPage === 'editor'));
        return (
          <button key={item.key} onClick={() => onNav?.(item.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', marginBottom: 2, borderRadius: 6,
              background: isActive ? 'var(--blue-50)' : 'transparent',
              color: isActive ? 'var(--blue-700)' : 'var(--text-secondary)',
              fontWeight: isActive ? 600 : 400,
              border: 'none', cursor: 'pointer', textAlign: 'left',
              fontSize: 13,
            }}>
            <Icon name={item.icon} size={14} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
};

/* 통합 사이드바 (아이콘레일 + 콘텐츠내비)
   hideContentNav: 에디터 페이지 등에서 콘텐츠 메뉴 숨김 */
const Sidebar = ({ currentPage, onNav, hideContentNav = false }) => (
  <>
    <IconRail />
    {!hideContentNav && <ContentNav currentPage={currentPage} onNav={onNav} />}
  </>
);

/* 페이지 헤더 */
const PageHeader = ({ title, subtitle, actions, tabs, activeTab, onTab, breadcrumbs, background }) => (
  <div style={{
    background: background || 'var(--bg-canvas)',
    padding: '24px 28px 0',
    flexShrink: 0,
  }}>
    {breadcrumbs && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>
        {breadcrumbs.map((b, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Icon name="chevronRight" size={12} />}
            <span style={{ color: i === breadcrumbs.length - 1 ? 'var(--text-secondary)' : 'var(--text-tertiary)' }}>{b}</span>
          </React.Fragment>
        ))}
      </div>
    )}
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
      <div style={{ minWidth: 0 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.4, color: 'var(--text-primary)' }}>{title}</h1>
        {subtitle && <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>{actions}</div>}
    </div>
    {tabs && (
      <div style={{ display: 'flex', gap: 20, marginTop: 18 }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => onTab?.(t.key)} style={{
            padding: '10px 0', background: 'transparent', border: 'none',
            borderBottom: `2px solid ${activeTab === t.key ? 'var(--text-primary)' : 'transparent'}`,
            color: activeTab === t.key ? 'var(--text-primary)' : 'var(--text-tertiary)',
            fontSize: 14, fontWeight: activeTab === t.key ? 700 : 500, cursor: 'pointer',
            marginBottom: -1,
          }}>
            {t.label}
            {t.count != null && (
              <span style={{ marginLeft: 6, fontSize: 13, color: activeTab === t.key ? 'var(--text-primary)' : 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>{t.count}</span>
            )}
          </button>
        ))}
      </div>
    )}
  </div>
);

Object.assign(window, { Sidebar, PageHeader, TopHeader });
