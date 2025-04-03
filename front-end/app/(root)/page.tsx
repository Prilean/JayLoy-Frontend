/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable@typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { Header } from "@/components/Header";
import { TransactionItem } from "@/components/TransactionItem";
import { TransactionDetail } from "@/components/categoryTransaction-detail";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Transaction } from "@/type/transaction";

export default function HomePage() {
  const { fetchWithToken, loading, setLoading, error } = useAuthFetch();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null> (null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'income', 'expense'
  const [isTransitionsLoading, setIsTransitionsLoading] = useState(false);

  const fetchTransactions = useCallback(
    async (dateToFetch: string, type?: string) => {
      try {
        setIsTransitionsLoading(true);
        let url = `${process.env.NEXT_PUBLIC_API_URL}/transactions?date=${dateToFetch}`;
        if (type && type !== 'all') {
          url += `&type=${type.toUpperCase()}`;
        }
        const response = await fetchWithToken(url);
        const data = await response.json();
        const transactionsData = Array.isArray(data) ? data : data.transactions || [];
        setTransactions(transactionsData.reverse());
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setIsTransitionsLoading(false);
      }
    },
    [fetchWithToken]
  );

  useEffect(() => {
    fetchTransactions(currentDate, activeTab)
  }, [fetchTransactions, currentDate, activeTab])

  useEffect(() => {
    console.log("Transactions loaded:", transactions);
    // Check if any transactions have imageUrl
    const hasImages = transactions.some(t => t.imageUrl);
    console.log("Any transactions with images:", hasImages);
  }, [transactions]);

  const handleDateChange = (newDate: string) => {
    setCurrentDate(newDate)
    fetchTransactions(newDate, activeTab)
  }

  // Add a function to filter transactions
  const getFilteredTransactions = useCallback(() => {
    if (activeTab === 'all') {
      return transactions;
    }
    return transactions.filter(transaction => 
      transaction.type === activeTab.toUpperCase()
    );
  }, [transactions, activeTab]);

  // Calculate total income and expense from filtered transactions
  const { totalIncome, totalExpense } = getFilteredTransactions().reduce(
    (totals, transaction) => {
      const amount = Number.parseFloat(transaction.amount) / 100
      if (transaction.type === "EXPENSE") {
        totals.totalExpense += amount;
      } else {
        totals.totalIncome += amount;
      }
      return totals;
    },
    { totalIncome: 0, totalExpense: 0 }
  );

  const handleDelete = async () => {
    if (!selectedTransaction || isDeleting) return;

    try {
      setIsDeleting(true);

      const response = await fetchWithToken(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/${selectedTransaction.id}`,
        {
          method: "DELETE",
        }
      );

      // Check if the request was successful (status code 2xx)
      if (response.status >= 200 && response.status < 300) {
        // Update local state by filtering out the deleted transaction
        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction) => transaction.id !== selectedTransaction.id),
        )

        // Close the modal
        setSelectedTransaction(null);
      } else {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (err) {
      console.error("Error deleting transaction:", err);
      alert("Failed to delete transaction");
    } finally {
      setIsDeleting(false);
    }
  };

  if (error) return <ErrorState message={error} />;

  const isToday = dayjs(currentDate).isSame(dayjs(), "day")
  const dateDisplay = isToday ? "today" : dayjs(currentDate).format("YYYY-MM-DD")

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <Header
        title="Money Tracker"
        income={totalIncome}
        expense={totalExpense}
        date={currentDate}
        onDateChange={handleDateChange}
      />
      <div className="flex justify-center p-3">
        <div className="inline-flex bg-transparent rounded-md border border-gray-200 shadow-sm relative w-[280px] p-1">
          <div
            className="absolute h-full top-0 transition-all duration-300 ease-in-out rounded-md bg-emerald-500"
            style={{
              width: `${100/3}%`,
              left: activeTab === 'all' ? '0%' : 
                    activeTab === 'income' ? '33.333%' : 
                    '66.666%',
            }}
          />
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md z-10 transition-colors duration-300 ${
              activeTab === 'all' 
                ? 'text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('income')}
            className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md z-10 transition-colors duration-300 ${
              activeTab === 'income' 
                ? 'text-white' 
                : 'text-emerald-500 hover:text-gray-800'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setActiveTab('expense')}
            className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md z-10 transition-colors duration-300 ${
              activeTab === 'expense' 
                ? 'text-white' 
                : 'text-red hover:text-gray-800'
            }`}
          >
            Expense
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-4xl mx-auto px-1">
        <div className="relative min-h-[400px]">
              {isTransitionsLoading && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent ">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                </div>
              )}
              <div className={`transition-all duration-300 ${
                isTransitionsLoading ? 'opacity-0 blur-[0px]' : 'opacity-100 blur-0'
              }`}>
              {getFilteredTransactions().length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 pb-24 text-gray-500">
                  <Icon icon="mdi:file-search-outline" className="h-16 w-16 mb-4" />
                  <p className="description-big-medium">
                    No {activeTab !== 'all' ? activeTab : ''} records for {dateDisplay}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getFilteredTransactions().map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                      onClick={() => setSelectedTransaction(transaction)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onEdit={() => {
            localStorage.setItem("editingTransaction", JSON.stringify(selectedTransaction));
            router.push(`/transaction?edit=true`);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

