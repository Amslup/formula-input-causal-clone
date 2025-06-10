import React, { useState } from 'react'

export function FormulaInput() {
  const [formula, setFormula] = useState('')
  const [calculatedResult, setCalculatedResult] = useState(null)

  // Calculate formula with dummy values
  const calculateFormula = () => {
    try {
      let calculableFormula = formula
      
      // Replace variables with dummy values
      const dummyValues = {
        '# Sales cycle (months)': 2,
        '% Churn rate': 0.1, // 10%
        '⊙ month': 1,
        '# Demos': 50,
        '# Revenue': 10000,
        '% Growth Rate': 0.15, // 15%
        '$ ACV': 15000
      }
      
      // Replace each variable with its dummy value
      Object.entries(dummyValues).forEach(([variable, value]) => {
        calculableFormula = calculableFormula.replace(new RegExp(variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value.toString())
      })
      
      // Remove equals sign
      calculableFormula = calculableFormula.replace(/^=\\s*/, '')
      
      // Basic safety check - only allow numbers, operators, and spaces
      if (/^[0-9+\-*/().\s]+$/.test(calculableFormula)) {
        const result = Function(`"use strict"; return (${calculableFormula})`)()
        setCalculatedResult(result)
      } else {
        setCalculatedResult('Cannot calculate - contains non-numeric values')
      }
    } catch (error) {
      setCalculatedResult('Error in calculation')
    }
  }

  // Handle backspace to delete last character/word
  const handleBackspace = () => {
    if (formula.length > 0) {
      // Remove last word or character
      const trimmed = formula.trim()
      const lastSpaceIndex = trimmed.lastIndexOf(' ')
      if (lastSpaceIndex > 0) {
        setFormula(trimmed.substring(0, lastSpaceIndex) + ' ')
      } else {
        setFormula('')
      }
    }
  }

  // Handle keyboard input
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && e.ctrlKey) {
      // Ctrl+Backspace deletes last word
      e.preventDefault()
      handleBackspace()
    } else if (e.key === 'Enter') {
      // Enter calculates the formula
      e.preventDefault()
      calculateFormula()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Formula Input Editor</h1>
        <p className="text-gray-600">
          Create formulas like Causal.app - supports # (numeric), % (percentage), ⊙ (time), $ (currency) variables.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          💡 Tips: Use Ctrl+Backspace to delete last word, Enter to calculate
        </p>
      </div>

      <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50/30 min-h-[80px] mb-6">
        <div className="flex items-center gap-2 text-lg">
          <span className="text-gray-600 font-mono">=</span>
          <input
            type="text"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-lg font-mono"
            placeholder="Start typing a formula... (e.g., # Sales cycle (months) - % Churn rate)"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Variables Section */}
        <div>
          <h3 className="font-medium mb-3">Quick Variables:</h3>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-600 block mb-1">Numeric (#):</span>
              <div className="flex gap-2 flex-wrap">
                <button 
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                  onClick={() => setFormula(prev => prev + '# Sales cycle (months) ')}
                >
                  # Sales cycle (months)
                </button>
                <button 
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                  onClick={() => setFormula(prev => prev + '# Demos ')}
                >
                  # Demos
                </button>
                <button 
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                  onClick={() => setFormula(prev => prev + '# Revenue ')}
                >
                  # Revenue
                </button>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-gray-600 block mb-1">Percentage (%):</span>
              <div className="flex gap-2 flex-wrap">
                <button 
                  className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
                  onClick={() => setFormula(prev => prev + '% Churn rate ')}
                >
                  % Churn rate
                </button>
                <button 
                  className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
                  onClick={() => setFormula(prev => prev + '% Growth Rate ')}
                >
                  % Growth Rate
                </button>
              </div>
            </div>
            
            <div>
              <span className="text-sm text-gray-600 block mb-1">Time (⊙) & Currency ($):</span>
              <div className="flex gap-2 flex-wrap">
                <button 
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                  onClick={() => setFormula(prev => prev + '⊙ month ')}
                >
                  ⊙ month
                </button>
                <button 
                  className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors"
                  onClick={() => setFormula(prev => prev + '$ ACV ')}
                >
                  $ ACV
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Operators and Actions */}
        <div>
          <h3 className="font-medium mb-3">Operators & Actions:</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-600 block mb-1">Math Operators:</span>
              <div className="flex gap-2">
                {['+', '-', '*', '/', '(', ')'].map(op => (
                  <button 
                    key={op}
                    className="w-10 h-10 border border-gray-300 rounded text-center hover:bg-gray-100 transition-colors font-mono"
                    onClick={() => setFormula(prev => prev + op + ' ')}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <span className="text-sm text-gray-600 block mb-1">Actions:</span>
              <div className="flex gap-2 flex-wrap">
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  onClick={calculateFormula}
                  disabled={!formula.trim()}
                >
                  🧮 Calculate
                </button>
                <button 
                  className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                  onClick={handleBackspace}
                  disabled={!formula.trim()}
                >
                  ⌫ Delete Last
                </button>
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  onClick={() => {
                    setFormula('')
                    setCalculatedResult(null)
                  }}
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-2">Formula Preview:</h3>
          <div className="p-4 bg-gray-100 rounded font-mono text-sm min-h-[60px] border">
            {formula || '(empty formula)'}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Calculation Result:</h3>
          <div className="p-4 bg-blue-50 rounded font-mono text-sm min-h-[60px] border border-blue-200">
            {calculatedResult !== null ? (
              <div>
                <span className="text-blue-700 font-semibold">Result: {calculatedResult}</span>
                <div className="text-xs text-gray-600 mt-2">
                  * Using dummy values for variables
                </div>
              </div>
            ) : (
              <span className="text-gray-500">Click "Calculate" to see result</span>
            )}
          </div>
        </div>
      </div>

      {/* Example Formulas */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-3">Example Formulas (click to try):</h3>
        <div className="space-y-2">
          {[
            '# Sales cycle (months) - % Churn rate + ⊙ month',
            '# Revenue * % Growth Rate',
            '(# Demos + # Revenue) / 2',
            '$ ACV * ⊙ month - % Churn rate'
          ].map((example, index) => (
            <button
              key={index}
              className="block w-full text-left p-2 bg-white rounded border hover:bg-blue-50 transition-colors font-mono text-sm"
              onClick={() => setFormula(example)}
            >
              = {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

