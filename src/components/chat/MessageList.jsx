import { useEffect, useRef } from 'react'
import MessageBubble    from './MessageBubble'
import TypingIndicator  from './TypingIndicator'

export default function MessageList({ messages, isProcessing }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isProcessing])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {messages.map(msg => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isProcessing && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}
