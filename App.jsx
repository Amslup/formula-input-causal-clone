import React from 'react'
import { QueryProvider } from './lib/queryClient.jsx'
import { FormulaInput } from './components/FormulaInput.jsx'
import './App.css'

function App() {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-gray-50">
        <FormulaInput />
      </div>
    </QueryProvider>
  )
}

export default App

