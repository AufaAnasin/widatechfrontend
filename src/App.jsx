import { Route, Routes } from "react-router-dom"
import InvoiceForm from "./pages/InvoiceForm"

// import './App.css'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/invoiceform" element={<InvoiceForm />} />
      </Routes>
    </div>
  )
}

export default App
