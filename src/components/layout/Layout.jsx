import { Outlet } from 'react-router-dom'
import NavSidebar from './NavSidebar'

export default function Layout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <NavSidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Outlet />
      </div>
    </div>
  )
}
