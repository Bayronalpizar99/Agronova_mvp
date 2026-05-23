import { Bell, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAgroBot } from '../../context/AgroBotContext'

export default function Header({ title }) {
  const { selectedFarm, unreadAlerts } = useAgroBot()
  const navigate = useNavigate()

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-2">
        <h1 className="text-base font-semibold text-gray-800">{title}</h1>
        {selectedFarm && (
          <span className="hidden sm:flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            <MapPin size={11} />
            {selectedFarm.name}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Mobile nav buttons */}
        <div className="flex md:hidden items-center gap-1">
          <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
          <button onClick={() => navigate('/history')} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </button>
        </div>

        {/* Bell */}
        <button
          onClick={() => navigate('/alerts')}
          className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
        >
          <Bell size={18} />
          {unreadAlerts > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadAlerts}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
