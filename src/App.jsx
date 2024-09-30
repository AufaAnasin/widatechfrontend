import { Route, Routes } from "react-router-dom"
import InvoiceForm from "./pages/InvoiceForm"
import Invoice from "./pages/Invoice"


// import './App.css'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/invoiceform" element={<InvoiceForm />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
    </div>
  )
}

export default App
