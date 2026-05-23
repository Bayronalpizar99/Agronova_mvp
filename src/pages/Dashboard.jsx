import { useLocation } from 'react-router-dom'
import Header          from '../components/layout/Header'
import AlertBanner     from '../components/alerts/AlertBanner'
import ChatPanel       from '../components/chat/ChatPanel'
import FarmDataSidebar from '../components/farm/FarmDataSidebar'

export default function Dashboard() {
  const location = useLocation()
  const prefillQuery = location.state?.prefillQuery || null

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main: header + alert banner + chat */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header title="AgroBot" />
        <AlertBanner />
        <ChatPanel prefillQuery={prefillQuery} />
      </div>

      {/* Right: farm data sidebar */}
      <FarmDataSidebar />
    </div>
  )
}
