import { useEffect, useRef } from 'react'
import { ExternalLink, Globe, X } from 'lucide-react'
import type { TerminalLink } from './terminal-link'
import './terminal-link-dialog.css'

interface TerminalLinkDialogProps {
  link: TerminalLink
  onOpen: (url: string) => void
  onClose: () => void
}

export function TerminalLinkDialog({ link, onOpen, onClose }: TerminalLinkDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current!
    const previousFocus = document.activeElement
    dialog.showModal()
    cancelRef.current?.focus()
    return () => {
      dialog.close()
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
    }
  }, [])

  return (
    <dialog ref={dialogRef} className="terminal-link-dialog" aria-labelledby="terminal-link-title" aria-describedby="terminal-link-description"
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onKeyDown={(event) => event.stopPropagation()}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="terminal-link-content">
        <header>
          <span className="terminal-link-icon"><ExternalLink size={20} /></span>
          <div><h2 id="terminal-link-title">Open in browser?</h2><p id="terminal-link-description">This link will open in your default browser.</p></div>
          <button className="icon-button" aria-label="Close link dialog" onClick={onClose}><X size={16} /></button>
        </header>
        <div className="terminal-link-destination">
          <strong><Globe size={15} />{link.host}</strong>
          <p>{link.url}</p>
        </div>
        <p className="terminal-link-hint">Check the address before opening a link from terminal output.</p>
        <footer>
          <button ref={cancelRef} className="secondary-button" onClick={onClose}>Cancel</button>
          <button className="terminal-link-open" onClick={() => { onOpen(link.url); onClose() }}>Open browser<ExternalLink size={14} /></button>
        </footer>
      </div>
    </dialog>
  )
}
