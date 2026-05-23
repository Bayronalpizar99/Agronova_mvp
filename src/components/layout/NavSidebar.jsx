import { NavLink } from 'react-router-dom'
import { MessageCircle, Clock, Bell } from 'lucide-react'
import { useAgroBot } from '../../context/AgroBotContext'

const links = [
  { to: '/',        icon: MessageCircle, label: 'AgroBot'   },
  { to: '/history', icon: Clock,         label: 'Historial' },
  { to: '/alerts',  icon: Bell,          label: 'Alertas'   },
]

export default function NavSidebar() {
  const { unreadAlerts } = useAgroBot()

  return (
    <aside className="hidden md:flex flex-col w-16 lg:w-56 bg-agro-900 text-white flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-agro-800">
        <div className="w-8 h-8 bg-agro-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <span className="hidden lg:block font-semibold text-sm tracking-wide">AgroNova</span>
      </div>

      {/* Nav links */}
      <nav className="flex-1 flex flex-col gap-1 p-2 pt-4">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative
               ${isActive
                 ? 'bg-agro-700 text-white'
                 : 'text-agro-300 hover:bg-agro-800 hover:text-white'
               }`
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            <span className="hidden lg:block">{label}</span>
            {label === 'Alertas' && unreadAlerts > 0 && (
              <span className="absolute top-1.5 right-1.5 lg:static lg:ml-auto min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {unreadAlerts}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-agro-800">
        <p className="hidden lg:block text-agro-500 text-xs">AgroBot v1.0 · MVP</p>
      </div>
    </aside>
  )
}
