import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 bg-white border-t border-gray-200">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe tu consulta agronómica aquí..."
        disabled={disabled}
        rows={1}
        className="flex-1 resize-none bg-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-agro-400 focus:bg-white transition-colors disabled:opacity-50 max-h-28 overflow-y-auto"
        style={{ lineHeight: '1.5' }}
      />
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        aria-label="Enviar consulta"
        className="w-10 h-10 bg-agro-600 hover:bg-agro-700 disabled:bg-gray-300 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
      >
        <Send size={16} />
      </button>
    </form>
  )
}
