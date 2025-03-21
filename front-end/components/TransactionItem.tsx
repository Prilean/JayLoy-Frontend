"use client"

import { Icon } from "@iconify/react"
import { TRANSACTION_CATEGORIES } from "@/app/constants/categories"
import { formatCurrency } from "@/utils/formatCurrency"

interface TransactionItemProps {
  transaction: any
  onClick?: () => void // Add optional onClick prop
}

export const TransactionItem = ({ transaction, onClick }: TransactionItemProps) => {
  const categoryInfo = TRANSACTION_CATEGORIES[transaction.categoryID] || {
    name: "Other",
    icon: <Icon icon="mdi:help-circle" className="text-white" />,
    color: "bg-gray",
  }

  // Convert from cents to dollars by dividing by 100
  const amount = Number.parseFloat(transaction.amount) / 100
  const isExpense = transaction.type === "EXPENSE"

  return (
    <div
      className="flex items-center justify-between bg-white rounded-2xl p-3 shadow-sm pl-8 pr-8 w-full cursor-pointer hover:opacity-80"
      onClick={onClick}
    >
      <div className="flex items-center space-x-5">
        <div className={`${categoryInfo.color} p-1 rounded-lg`}>{categoryInfo.icon}</div>
        <span className="description-medium">{categoryInfo.name}</span>
      </div>
      <span className={`description-medium ${isExpense ? "!text-red" : "!text-primary"}`}>
        {isExpense ? "-" : "+"}
        {formatCurrency(Math.abs(amount), 2).replace("$", "")}
      </span>
    </div>
  )
}

