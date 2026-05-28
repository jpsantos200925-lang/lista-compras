import { useRef } from 'react'

export default function LogoUpload({ currentUrl, onFile }) {
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file) onFile(file)
  }

  return (
    <div className="logo-upload" onClick={() => inputRef.current?.click()}>
      {currentUrl ? (
        <img src={currentUrl} alt="logo" className="logo-preview" />
      ) : (
        <div className="logo-placeholder">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>Logo</span>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
    </div>
  )
}
