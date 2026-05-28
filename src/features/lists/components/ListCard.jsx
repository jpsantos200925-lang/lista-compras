import { useNavigate } from 'react-router-dom'

export default function ListCard({ list, onEdit, onDelete }) {
  const navigate = useNavigate()

  return (
    <div
      className="list-card"
      style={{ '--card-primary': list.primary_color, '--card-bg': list.bg_color }}
      onClick={() => navigate(`/${list.slug}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/${list.slug}`)}
    >
      <div className="list-card-logo">
        {list.logo_url ? (
          <img src={list.logo_url} alt={list.name} />
        ) : (
          <div className="list-card-logo-placeholder">
            {list.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="list-card-info">
        <span className="list-card-name">{list.name}</span>
        <span className="list-card-slug">/{list.slug}</span>
      </div>
      <div className="list-card-actions" onClick={e => e.stopPropagation()}>
        <button className="btn-icon" onClick={() => onEdit(list)} aria-label="Editar">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button className="btn-icon btn-icon-danger" onClick={() => onDelete(list)} aria-label="Deletar">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
          </svg>
        </button>
      </div>
      <svg className="list-card-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>
  )
}
