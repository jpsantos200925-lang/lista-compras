import { useState, useEffect } from 'react'
import SlugInput from './SlugInput'
import LogoUpload from './LogoUpload'

const DEFAULTS = {
  name: '',
  slug: '',
  primary_color: '#22c55e',
  secondary_color: '#16a34a',
  bg_color: '#0f0f0f',
  font_color: '#f0f0f0',
}

export default function ListForm({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(DEFAULTS)
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...DEFAULTS, ...initial } : DEFAULTS)
      setLogoFile(null)
      setLogoPreview(initial?.logo_url || null)
    }
  }, [open, initial])

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleLogoFile = (file) => {
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.slug) return
    setSaving(true)
    try {
      await onSave(form, logoFile)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">{initial ? 'Editar lista' : 'Nova lista'}</h2>
        <form onSubmit={handleSubmit} className="list-form">
          <div className="form-row">
            <LogoUpload currentUrl={logoPreview} onFile={handleLogoFile} />
            <div className="form-fields">
              <label className="form-label">Nome da lista</label>
              <input
                className="form-input"
                type="text"
                placeholder="Compras do Bebê"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                required
              />
              <label className="form-label">Rota (URL)</label>
              <SlugInput value={form.slug} onChange={val => set('slug', val)} excludeId={initial?.id} />
            </div>
          </div>

          <div className="color-row">
            <div className="color-field">
              <label className="form-label">Cor primária</label>
              <input type="color" value={form.primary_color} onChange={e => set('primary_color', e.target.value)} />
            </div>
            <div className="color-field">
              <label className="form-label">Cor secundária</label>
              <input type="color" value={form.secondary_color} onChange={e => set('secondary_color', e.target.value)} />
            </div>
            <div className="color-field">
              <label className="form-label">Fundo</label>
              <input type="color" value={form.bg_color} onChange={e => set('bg_color', e.target.value)} />
            </div>
            <div className="color-field">
              <label className="form-label">Texto</label>
              <input type="color" value={form.font_color} onChange={e => set('font_color', e.target.value)} />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
