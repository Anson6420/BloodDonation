import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import RegisteredList from './pages/RegisteredList'
import DonatedList from './components/DonatedList'
import CodeAccess from './components/CodeAccess'

function App() {


  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/RegisteredList' element={<RegisteredList />} />
        <Route path="/DonatedList" element={<CodeAccess />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
