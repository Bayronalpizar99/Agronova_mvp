import { Bot, User, ChevronRight } from 'lucide-react'
import CategoryBadge from './CategoryBadge'
import UrgencyBadge  from './UrgencyBadge'
import { formatTime } from '../../utils/dateUtils'

function UserBubble({ message }) {
  return (
    <div className="flex items-end gap-2 justify-end animate-fade-in">
      <div className="max-w-[75%] lg:max-w-[65%]">
        <div className="bg-agro-600 text-white px-4 py-2.5 rounded-2xl rounded-br-sm shadow-sm">
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        <p className="text-[10px] text-gray-400 mt-1 text-right pr-1">{formatTime(message.timestamp)}</p>
      </div>
      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mb-5">
        <User size={14} className="text-gray-600" />
      </div>
    </div>
  )
}

function BotBubble({ message }) {
  return (
    <div className="flex items-end gap-2 animate-fade-in">
      <div className="w-7 h-7 rounded-full bg-agro-600 flex items-center justify-center flex-shrink-0 mb-5">
        <Bot size={14} className="text-white" />
      </div>
      <div className="max-w-[80%] lg:max-w-[70%]">
        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm overflow-hidden">
          {/* Badges */}
          {message.category && (
            <div className="flex items-center gap-1.5 px-4 pt-3">
              <CategoryBadge category={message.category} />
              <UrgencyBadge urgency={message.urgency} />
            </div>
          )}
          {/* Text */}
          <p className="text-sm text-gray-800 leading-relaxed px-4 pt-2 pb-3">{message.text}</p>

          {/* Action */}
          {message.action && (
            <div className="bg-agro-50 border-t border-agro-100 px-4 py-2.5 flex items-start gap-2">
              <ChevronRight size={14} className="text-agro-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-agro-700 font-medium leading-relaxed">{message.action}</p>
            </div>
          )}
        </div>
        <p className="text-[10px] text-gray-400 mt-1 pl-1">{formatTime(message.timestamp)}</p>
      </div>
    </div>
  )
}

function SystemMessage({ message }) {
  return (
    <div className="flex justify-center animate-fade-in">
      <span className="text-[11px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
        {message.text}
      </span>
    </div>
  )
}

export default function MessageBubble({ message }) {
  if (message.type === 'user')   return <UserBubble   message={message} />
  if (message.type === 'system') return <SystemMessage message={message} />
  return <BotBubble message={message} />
}
