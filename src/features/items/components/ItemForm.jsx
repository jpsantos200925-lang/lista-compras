import { useEffect, useRef, useState } from 'react'

export default function ItemForm({ open, onClose, onAdd }) {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const nameRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => nameRef.current?.focus(), 80)
    } else {
      setName('')
      setQuantity('')
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    await onAdd({ name: name.trim(), quantity: quantity.trim() || '1' })
    setName('')
    setQuantity('')
    setTimeout(() => nameRef.current?.focus(), 50)
  }

  if (!open) return null

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <h3 className="sheet-title">Novo item</h3>
        <form className="sheet-form" onSubmit={handleSubmit}>
          <input
            ref={nameRef}
            className="item-form-input"
            placeholder="O que adicionar?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            enterKeyHint="next"
          />
          <input
            className="item-form-input"
            placeholder="Quantidade (ex: 2 kg)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            autoComplete="off"
            enterKeyHint="done"
          />
          <div className="sheet-actions">
            <button type="button" className="btn-ghost" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary sheet-submit">Adicionar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
