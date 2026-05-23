import { Bot } from 'lucide-react'

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 animate-fade-in">
      <div className="w-7 h-7 rounded-full bg-agro-600 flex items-center justify-center flex-shrink-0">
        <Bot size={14} className="text-white" />
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-agro-500 animate-dot-1" />
          <span className="w-2 h-2 rounded-full bg-agro-500 animate-dot-2" />
          <span className="w-2 h-2 rounded-full bg-agro-500 animate-dot-3" />
        </div>
      </div>
    </div>
  )
}
