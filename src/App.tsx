import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { MainLayout } from './layouts/MainLayout'
import { Home } from './pages/Home'
import { Planes } from './pages/Planes'
import { SalasJuntas } from './pages/SalasJuntas'
import { OficinasLargoPlazo } from './pages/OficinasLargoPlazo'
import { Eventos } from './pages/Eventos'
import { Contacto } from './pages/Contacto'
import { SobreNosotros } from './pages/SobreNosotros'
import { Terminos } from './pages/Terminos'
import { Privacidad } from './pages/Privacidad'
import { NotFound } from './pages/NotFound'
import { Clases } from './pages/Clases'
import { ClaseLanding } from './pages/ClaseLanding'
import { Horario } from './pages/Horario'
import { RunClub } from './pages/RunClub'
import { RentaSalon } from './pages/RentaSalon'
import { Talleres } from './pages/Talleres'

/** Rutas de la app (sin router): se usan en el navegador y en el prerenderizado. */
export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="classes" element={<Clases />} />
          <Route path="clases/:slug" element={<ClaseLanding />} />
          <Route path="horario" element={<Horario />} />
          <Route path="planes" element={<Planes />} />
          <Route path="salas-de-juntas" element={<SalasJuntas />} />
          <Route path="oficinas-largo-plazo" element={<OficinasLargoPlazo />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="talleres" element={<Talleres />} />
          <Route path="renta-salon" element={<RentaSalon />} />
          <Route path="run-club" element={<RunClub />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="sobre-nosotros" element={<SobreNosotros />} />
          <Route path="terminos" element={<Terminos />} />
          <Route path="privacidad" element={<Privacidad />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
