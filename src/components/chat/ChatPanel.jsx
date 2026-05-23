import { useState, useEffect, useRef } from 'react'
import { useAgroBot }    from '../../context/AgroBotContext'
import { processQuery }  from '../../agents/index'
import AgentStatusBar    from './AgentStatusBar'
import MessageList       from './MessageList'
import QuickPrompts      from './QuickPrompts'
import ChatInput         from './ChatInput'

export default function ChatPanel({ prefillQuery }) {
  const { state, dispatch, selectedFarm } = useAgroBot()
  const { messages, agentStatus, isProcessing } = state
  const [showQuickPrompts, setShowQuickPrompts] = useState(true)
  const prefillFired = useRef(false)

  const handleSend = (text) => {
    setShowQuickPrompts(false)
    const userMsg = {
      id:        `msg-${Date.now()}`,
      type:      'user',
      text,
      timestamp: new Date().toISOString(),
    }
    dispatch({ type: 'ADD_MESSAGE', payload: userMsg })
    processQuery(text, selectedFarm, dispatch)
  }

  useEffect(() => {
    if (prefillQuery && !prefillFired.current) {
      prefillFired.current = true
      const timer = setTimeout(() => handleSend(prefillQuery), 500)
      return () => clearTimeout(timer)
    }
  }, [prefillQuery])

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <AgentStatusBar agentStatus={agentStatus} />
      <MessageList messages={messages} isProcessing={isProcessing} />
      {showQuickPrompts && messages.length <= 2 && (
        <QuickPrompts onSelect={handleSend} />
      )}
      <ChatInput onSend={handleSend} disabled={isProcessing} />
    </div>
  )
}
