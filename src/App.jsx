import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AgroBotProvider } from './context/AgroBotContext'
import Layout    from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import History   from './pages/History'
import Alerts    from './pages/Alerts'

export default function App() {
  return (
    <BrowserRouter>
      <AgroBotProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index        element={<Dashboard />} />
            <Route path="history" element={<History />}   />
            <Route path="alerts"  element={<Alerts />}    />
          </Route>
        </Routes>
      </AgroBotProvider>
    </BrowserRouter>
  )
}
