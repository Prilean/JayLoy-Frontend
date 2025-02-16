"use client"

import { FileSearch } from "lucide-react"

export default function HomePage() {
  // Initialize with zero values since there are no transactions
  const expenses = -65.0
  const income = 15.0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-500 text-white p-4 space-y-4">
        <h1 className="text-xl font-semibold">Money Tracker</h1>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="text-sm opacity-90">Expenses</div>
            <div className="text-lg font-medium">{expenses.toFixed(2)}$</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm opacity-90">Income</div>
            <div className="text-lg font-medium">{income.toFixed(2)}$</div>
          </div>
          <div className="text-right">
            <div className="text-sm">09/1/2025</div>
          </div>
        </div>
      </div>

      {/* Empty State Content */}
      <div className="flex-1 p-4">
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="mb-4">
            <FileSearch className="h-16 w-16" strokeWidth={1} />
          </div>
          <p className="text-lg">No records</p>
        </div>
      </div>
    </div>
  )
}

