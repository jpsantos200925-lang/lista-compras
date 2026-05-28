import { useState } from 'react'
import { signOut } from '@/features/auth'
import { useLists, ListCard, ListForm } from '@/features/lists'

export default function Home() {
  const { lists, loading, addList, editList, removeList } = useLists()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const handleSave = async (form, logoFile) => {
    if (editing) {
      await editList(editing.id, form, logoFile)
    } else {
      await addList(form, logoFile)
    }
    setEditing(null)
  }

  const handleEdit = (list) => {
    setEditing(list)
    setFormOpen(true)
  }

  const handleDelete = async (list) => {
    if (window.confirm(`Deletar a lista "${list.name}"? Todos os itens serão perdidos.`)) {
      await removeList(list.id)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-header-brand">
          <span className="brand-mark">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
          Listou
        </span>
        <button className="btn-logout" onClick={signOut}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sair
        </button>
      </header>

      <main className="lists-grid">
        {loading ? (
          <div className="loading-dots"><span /><span /><span /></div>
        ) : lists.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon-ring">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <div className="empty-state-text">
              <p className="empty-state-title">Nenhuma lista ainda</p>
              <p className="empty-state-sub">Toque no botão abaixo para criar<br/>sua primeira lista personalizada.</p>
            </div>
          </div>
        ) : (
          lists.map(list => (
            <ListCard key={list.id} list={list} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        )}
      </main>

      <button className="fab" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', boxShadow: '0 8px 24px rgba(59,130,246,.32), 0 2px 6px rgba(0,0,0,.08)' }} onClick={() => { setEditing(null); setFormOpen(true) }} aria-label="Nova lista">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <ListForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditing(null) }}
        onSave={handleSave}
        initial={editing}
      />
    </div>
  )
}
