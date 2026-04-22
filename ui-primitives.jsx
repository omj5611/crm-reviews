/* UI 프리미티브 — Button, Input, Select, Badge, Checkbox, Avatar 등 */

const Icon = ({ name, size = 16, strokeWidth = 1.75, style }) => {
  const paths = {
    search: 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-4.35-4.35',
    plus: 'M12 5v14M5 12h14',
    minus: 'M5 12h14',
    check: 'M5 12l5 5L20 7',
    x: 'M6 6l12 12M18 6L6 18',
    chevronDown: 'M6 9l6 6 6-6',
    chevronRight: 'M9 6l6 6-6 6',
    chevronLeft: 'M15 6l-6 6 6 6',
    chevronUpDown: 'M7 14l5 5 5-5M7 10l5-5 5 5',
    filter: 'M4 5h16M7 12h10M10 19h4',
    more: 'M5 12h.01M12 12h.01M19 12h.01',
    edit: 'M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 1 1 2.828 2.828L11.828 15.828A2 2 0 0 1 10.414 16.414L6.586 20.414 6 19.828l4-4 .414-.414A2 2 0 0 1 9 13Z',
    trash: 'M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14',
    eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
    eyeOff: 'M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.5 0-10-7-10-7a19.77 19.77 0 0 1 4.22-5.27M9.9 4.24A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a19.77 19.77 0 0 1-2.17 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24M1 1l22 22',
    star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    starOutline: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
    pin: 'M12 2L8 6v5l-4 4v2h7v5l1 2 1-2v-5h7v-2l-4-4V6z',
    image: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z M21 15l-5-5L5 21',
    upload: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12',
    download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
    link: 'M10 13a5 5 0 0 0 7.07 0l3.54-3.54a5 5 0 1 0-7.07-7.07L12 3.93 M14 11a5 5 0 0 0-7.07 0L3.39 14.54a5 5 0 1 0 7.07 7.07L12 20.07',
    grid: 'M3 3h8v8H3zM13 3h8v8h-8zM13 13h8v8h-8zM3 13h8v8H3z',
    list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    layout: 'M3 3h18v18H3zM3 9h18M9 21V9',
    calendar: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM16 2v4M8 2v4M3 10h18',
    clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM12 6v6l4 2',
    user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
    users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z',
    fileText: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
    template: 'M3 3h7v7H3zM14 3h7v4h-7zM14 11h7v10h-7zM3 14h7v7H3z',
    bookmark: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z',
    home: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2Z',
    book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15ZM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5',
    send: 'M22 2L11 13 M22 2l-7 20-4-9-9-4 20-7Z',
    bell: 'M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M13.73 21a2 2 0 0 1-3.46 0',
    help: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01',
    info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 16v-4 M12 8h.01',
    check2: 'M5 12l5 5L20 7',
    copy: 'M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2ZM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
    sparkle: 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5zM19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75zM5 16l.5 1.5L7 18l-1.5.5L5 20l-.5-1.5L3 18l1.5-.5z',
    history: 'M3 12a9 9 0 1 0 3.2-6.87L3 8 M3 3v5h5 M12 7v5l3 3',
    drag: 'M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01',
    boldT: 'M6 4h8a4 4 0 0 1 0 8H6zM6 12h9a4 4 0 0 1 0 8H6z',
    type: 'M4 7V5h16v2 M9 20h6 M12 5v15',
    quote: 'M3 21c3-3 3-9 3-9H3V5h6v7c0 4-3 8-6 9ZM15 21c3-3 3-9 3-9h-3V5h6v7c0 4-3 8-6 9Z',
    listBullet: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
    heading: 'M6 4v16M18 4v16M6 12h12',
    save: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2ZM17 21v-8H7v8M7 3v5h8',
    close: 'M6 6l12 12M18 6L6 18',
    archive: 'M21 8v13H3V8 M1 3h22v5H1zM10 12h4',
    refresh: 'M3 12a9 9 0 0 1 15-6.7L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-15 6.7L3 16 M3 21v-5h5',
    folder: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2Z',
    sort: 'M3 6h18M6 12h12M10 18h4',
    arrowRight: 'M5 12h14 M12 5l7 7-7 7',
    arrowUp: 'M12 19V5 M5 12l7-7 7 7',
    arrowDown: 'M12 5v14 M19 12l-7 7-7-7',
    tag: 'M20.59 13.41L13.41 20.59a2 2 0 0 1-2.82 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z M7 7h.01',
    sidebar: 'M3 3h18v18H3zM9 3v18',
    menu: 'M4 6h16M4 12h16M4 18h16',
  };
  const path = paths[name];
  if (!path) return null;
  const parts = path.split(/(?=[MZ])/).filter(Boolean);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {parts.map((p, i) => <path key={i} d={p.trim()} />)}
    </svg>
  );
};

const btnStyles = {
  base: {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    border: '1px solid transparent', borderRadius: 'var(--radius-md)',
    fontSize: 13, fontWeight: 500, lineHeight: 1, cursor: 'pointer',
    transition: 'all .12s', whiteSpace: 'nowrap',
  },
};
const Button = ({ variant = 'secondary', size = 'md', icon, iconRight, children, onClick, disabled, style, active }) => {
  const sizes = {
    xs: { padding: '4px 8px', fontSize: 12, height: 24, gap: 4 },
    sm: { padding: '6px 10px', fontSize: 12.5, height: 28 },
    md: { padding: '7px 12px', fontSize: 13, height: 32 },
    lg: { padding: '9px 16px', fontSize: 14, height: 36 },
  };
  const variants = {
    primary: { background: 'var(--blue-500)', color: '#fff', borderColor: 'var(--blue-500)' },
    secondary: { background: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border-default)' },
    ghost: { background: active ? 'var(--gray-100)' : 'transparent', color: 'var(--text-secondary)' },
    danger: { background: '#fff', color: 'var(--red-600)', borderColor: 'var(--border-default)' },
    dangerFilled: { background: 'var(--red-500)', color: '#fff', borderColor: 'var(--red-500)' },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ ...btnStyles.base, ...sizes[size], ...variants[variant], opacity: disabled ? 0.5 : 1, ...style }}>
      {icon && <Icon name={icon} size={size === 'xs' ? 12 : 14} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'xs' ? 12 : 14} />}
    </button>
  );
};

const Input = ({ value, onChange, placeholder, icon, iconRight, style, size = 'md', onFocus, onBlur }) => {
  const sizes = {
    sm: { height: 28, fontSize: 12.5, padding: icon ? '0 10px 0 28px' : '0 10px' },
    md: { height: 32, fontSize: 13, padding: icon ? '0 12px 0 32px' : '0 12px' },
    lg: { height: 36, fontSize: 14, padding: icon ? '0 14px 0 36px' : '0 14px' },
  };
  return (
    <div style={{ position: 'relative', display: 'inline-flex', width: '100%', ...style }}>
      {icon && (
        <div style={{ position: 'absolute', left: size === 'sm' ? 8 : 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }}>
          <Icon name={icon} size={14} />
        </div>
      )}
      <input value={value ?? ''} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder}
        onFocus={onFocus} onBlur={onBlur}
        style={{
          width: '100%', ...sizes[size],
          border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)', color: 'var(--text-primary)',
          transition: 'all .12s',
        }} />
    </div>
  );
};

const Select = ({ value, onChange, options = [], placeholder, size = 'md', style, width }) => {
  const sizes = {
    sm: { height: 28, fontSize: 12.5, padding: '0 26px 0 10px' },
    md: { height: 32, fontSize: 13, padding: '0 28px 0 12px' },
  };
  return (
    <div style={{ position: 'relative', display: 'inline-block', width, ...style }}>
      <select value={value ?? ''} onChange={(e) => onChange?.(e.target.value)}
        style={{
          appearance: 'none', ...sizes[size], width: '100%',
          border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)', color: 'var(--text-primary)',
          cursor: 'pointer',
        }}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
            {typeof o === 'string' ? o : o.label}
          </option>
        ))}
      </select>
      <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-tertiary)' }}>
        <Icon name="chevronDown" size={14} />
      </div>
    </div>
  );
};

const Badge = ({ children, tone = 'neutral', style, dot }) => {
  const tones = {
    neutral: { bg: 'var(--gray-75)', fg: 'var(--gray-700)', dot: 'var(--gray-400)' },
    blue: { bg: 'var(--blue-50)', fg: 'var(--blue-700)', dot: 'var(--blue-500)' },
    green: { bg: 'var(--green-50)', fg: 'var(--green-700)', dot: 'var(--green-500)' },
    amber: { bg: 'var(--amber-50)', fg: 'var(--amber-700)', dot: 'var(--amber-500)' },
    red: { bg: 'var(--red-50)', fg: 'var(--red-700)', dot: 'var(--red-500)' },
    purple: { bg: 'var(--purple-50)', fg: 'var(--purple-600)', dot: 'var(--purple-500)' },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 8px', borderRadius: 10,
      background: t.bg, color: t.fg, fontSize: 11.5, fontWeight: 500, lineHeight: 1.4,
      whiteSpace: 'nowrap',
      ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 3, background: t.dot }} />}
      {children}
    </span>
  );
};

const Checkbox = ({ checked, indeterminate, onChange, size = 14 }) => {
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = !!indeterminate; }, [indeterminate]);
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', width: size + 2, height: size + 2 }}>
      <input ref={ref} type="checkbox" checked={!!checked} onChange={(e) => onChange?.(e.target.checked)}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
      <span style={{
        width: size, height: size, borderRadius: 4,
        border: `1.5px solid ${checked || indeterminate ? 'var(--blue-500)' : 'var(--gray-300)'}`,
        background: checked || indeterminate ? 'var(--blue-500)' : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
        transition: 'all .12s',
      }}>
        {checked && <Icon name="check" size={size - 4} strokeWidth={3} />}
        {indeterminate && !checked && <Icon name="minus" size={size - 4} strokeWidth={3} />}
      </span>
    </label>
  );
};

const Switch = ({ checked, onChange, size = 'md' }) => {
  const h = size === 'sm' ? 16 : 20;
  const w = size === 'sm' ? 28 : 34;
  const k = h - 4;
  return (
    <button onClick={() => onChange?.(!checked)}
      style={{
        width: w, height: h, borderRadius: h / 2, padding: 2, border: 'none',
        background: checked ? 'var(--blue-500)' : 'var(--gray-200)',
        position: 'relative', cursor: 'pointer', transition: 'background .15s',
        display: 'flex', alignItems: 'center',
      }}>
      <span style={{
        width: k, height: k, borderRadius: k / 2, background: '#fff',
        transform: `translateX(${checked ? w - k - 4 : 0}px)`,
        transition: 'transform .15s', boxShadow: '0 1px 2px rgba(0,0,0,.2)',
      }} />
    </button>
  );
};

const Avatar = ({ name, color, size = 24 }) => {
  const initial = (name || '?').charAt(0);
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: color || 'var(--gray-200)', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.42, fontWeight: 600, flexShrink: 0,
    }}>{initial}</div>
  );
};

const IconButton = ({ icon, onClick, size = 'md', tooltip, active, danger, style }) => {
  const sizes = { sm: 24, md: 28, lg: 32 };
  const iconSize = { sm: 13, md: 15, lg: 16 };
  return (
    <button onClick={onClick} title={tooltip}
      style={{
        width: sizes[size], height: sizes[size], borderRadius: 'var(--radius-sm)',
        border: 'none', background: active ? 'var(--gray-100)' : 'transparent',
        color: danger ? 'var(--red-600)' : 'var(--text-secondary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'all .12s',
        ...style,
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gray-100)'}
      onMouseLeave={(e) => e.currentTarget.style.background = active ? 'var(--gray-100)' : 'transparent'}>
      <Icon name={icon} size={iconSize[size]} />
    </button>
  );
};

// 브랜드 데이터
const BRANDS = [
  { id: 'sniper', name: '스나이퍼팩토리', short: 'SNF', color: '#0a6cff',
    reviewTypes: ['취업후기', '수료후기', '인턴후기'],
    ctaDefault: '지금 모집 중인 과정을 확인해보세요' },
  { id: 'insideout', name: '인사이드아웃', short: 'IO', color: '#ff5a36',
    reviewTypes: ['프로그램 후기', '인턴로그'],
    ctaDefault: '프로그램의 자세한 내용을 확인해보세요' },
  { id: 'hancom', name: '한컴 AI 아카데미', short: 'HC', color: '#1a56db',
    reviewTypes: ['수료후기', '프로젝트 후기', '취업후기'],
    ctaDefault: '다음 기수 모집 일정을 확인해보세요' },
];

Object.assign(window, { Icon, Button, Input, Select, Badge, Checkbox, Switch, Avatar, IconButton, BRANDS });
