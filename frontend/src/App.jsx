import React from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import HomePage from './pages/HomePage'
import CreateJobPage from './pages/CreateJobPage'
import JobDetailPage from './pages/JobDetailPage'
import EditJobPage from './pages/EditJobPage'
import Navbar from './components/Navbar'

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <div className="flex-grow flex flex-col relative w-full overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<HomePage />} />
            <Route path='/create' element={<CreateJobPage />} />
            <Route path='/job/:id' element={<JobDetailPage />} />
            <Route path='/edit-job/:id' element={<EditJobPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
