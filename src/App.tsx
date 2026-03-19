import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PacientesPage from './pages/patient/PatientPage'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pacientes" />} />
        <Route path="/pacientes" element={<PacientesPage />} />
      </Routes>
    </BrowserRouter>
  )
}