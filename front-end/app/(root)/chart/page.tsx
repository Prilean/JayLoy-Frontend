/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable@typescript-eslint/no-unused-vars */
/* eslint-disable@typescript-eslint/no-unused-vars */

"use client";

import { useState, useEffect } from "react";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import NavBar from "@/layouts/NavBar";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { CategoryTransactions } from "@/components/category-transactions";
import {
  MonthSelector,
  type MonthData,
  useMonthSelector,
} from "@/app/(root)/chart/components/month-selector";
import { ChartViewToggle } from "@/app/(root)/chart/components/chart-view-toggle";
import {
  PieChartDisplay,
  type ChartData,
} from "@/app/(root)/chart/components/pie-chart";
import { ChartLegend } from "@/app/(root)/chart/components/chart-legend";
import { CategoryList } from "@/app/(root)/chart/components/category-list";
import { EmptyState } from "@/app/(root)/chart/components/empty-state";
import { Transaction } from "@/type/transaction";

type CategorySummary = {
  categoryId: number;
  name: string;
  type: string;
  amount: string;
  percentage: number;
};

type SummaryResponse = {
  data: CategorySummary[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
  totals: {
    income: string;
    expense: string;
    net: string;
  };
};

export default function ChartPage() {
  const {
    fetchWithToken,
    loading: fetchLoading,
    error: fetchError,
  } = useAuthFetch();
  const [activeView, setActiveView] = useState<"income" | "expense">("expense");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categorySummary, setCategorySummary] =
    useState<SummaryResponse | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [visibleMonthsStart, setVisibleMonthsStart] = useState(0);
  const [allMonths, setAllMonths] = useState<MonthData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTransitionsLoading, setIsTransitionsLoading] = useState(false);

  const { generateMonthsHistory } = useMonthSelector();

  // Create array of all available months (24 months in totals (2 years))
  useEffect(() => {
    const months = generateMonthsHistory(24);
    setAllMonths(months);

    // show only current month and previous 2 months by default
    setVisibleMonthsStart(Math.max(0, months.length - 3));
  }, [generateMonthsHistory]);

  // Get the currently visible months (3)
  const visibleMonths = allMonths.slice(
    visibleMonthsStart,
    visibleMonthsStart + 3
  );

  // Handle pagination
  const handlePrevMonths = () => {
    if (visibleMonthsStart > 0) {
      setVisibleMonthsStart(visibleMonthsStart - 1);
    }
  };

  const handleNextMonths = () => {
    if (visibleMonthsStart + 3 < allMonths.length) {
      setVisibleMonthsStart(visibleMonthsStart + 1);
    }
  };

  // Handle month selection
  const handleMonthSelect = (monthData: MonthData) => {
    setSelectedMonth(monthData.month);
    setSelectedYear(monthData.year);

    // Find the position of the selected month in the available months array
    const selectedMonthPosition = allMonths.findIndex(
      (m) => m.month === monthData.month && m.year === monthData.year
    );

    // If clicking on the leftmost visible month (first in the visible array)
    if (selectedMonthPosition === visibleMonthsStart) {
      // Show two months before the selected month
      const newStartPosition = Math.max(0, selectedMonthPosition - 2);
      setVisibleMonthsStart(newStartPosition);
    }
    // If clicking on any other month, center the view around it
    else {
      let newStartPosition = Math.max(0, selectedMonthPosition - 2);

      // Ensure it wont exceed the available months
      if (newStartPosition + 3 > allMonths.length) {
        newStartPosition = Math.max(0, allMonths.length - 3);
      }

      setVisibleMonthsStart(newStartPosition);
    }
  };

  // Fetch transactions for the CategoryTransactions component
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Format the month query using the selected year and month
        const monthParam = `${selectedYear}-${String(selectedMonth).padStart(
          2,
          "0"
        )}`;

        const response = await fetchWithToken(
          `${process.env.NEXT_PUBLIC_API_URL}/transactions?month=${monthParam}`
        );
        const data = await response.json();
        const transactionsData = Array.isArray(data)
          ? data
          : data.transactions || [];
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setTransactions([]);
      }
    };
    fetchTransactions();
  }, [selectedMonth, fetchWithToken, selectedYear]);

  // Fetch category summary
  useEffect(() => {
    const fetchCategorySummary = async () => {
      setIsTransitionsLoading(true);
      setError(null);

      try {
        // Format the month query using the selected year and month
        const monthParam = `${selectedYear}-${String(selectedMonth).padStart(
          2,
          "0"
        )}`;
        const type = activeView.toUpperCase();

        const response = await fetchWithToken(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/summary?type=${type}&month=${monthParam}&limit=100`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch category summary: ${response.status}`
          );
        }

        const data = await response.json();
        setCategorySummary(data);
      } catch (err) {
        console.error("Failed to fetch category summary:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch category summary"
        );
        setCategorySummary(null);
      } finally {
        setIsTransitionsLoading(false);
      }
    };

    fetchCategorySummary();
  }, [selectedMonth, selectedYear, activeView, fetchWithToken]);

  // Use backend calculation logic
  const chartData: ChartData[] =
    categorySummary?.data.map((item) => ({
      categoryID: String(item.categoryId),
      value: item.percentage,
      amount: Number(item.amount) / 100,
      name: item.name,
    })) || [];

  // Get total amount from backend
  const totalAmount = categorySummary
    ? Number(
        activeView === "income"
          ? categorySummary.totals.income
          : categorySummary.totals.expense
      ) / 100
    : 0;

  if (error || fetchError)
    return <ErrorState message={error || fetchError || "An error occurred"} />;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-emerald-500 px-4 pb-6">
        <h1 className="sub-header-white text-center py-4">
          Financial Analysis
        </h1>

        {/* type transaction filter */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-emerald-500 rounded-md border border-white shadow-sm relative w-[280px] p-1">
            <div
              className="absolute h-full top-0 transition-all duration-300 ease-in-out rounded-md bg-variant/50"
              style={{
                width: '50%',
                left: activeView === 'income' ? '0%' : '50%',
              }}
            />
            <button
              onClick={() => setActiveView('income')}
              className={`flex-1 px-3 py-1.5 text-md font-medium rounded-md z-10 transition-colors duration-300 ${
                activeView === 'income' 
                  ? 'text-black' 
                  : 'text-white hover:text-white'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setActiveView('expense')}
              className={`flex-1 px-3 py-1.5 text-md font-medium rounded-md z-10 transition-colors duration-300 ${
                activeView === 'expense' 
                  ? 'text-black' 
                  : 'text-white hover:text-white'
              }`}
            >
              Expense
            </button>
          </div>
        </div>

        {/* Month Pagination */}
        <MonthSelector
          visibleMonths={visibleMonths}
          visibleMonthsStart={visibleMonthsStart}
          allMonths={allMonths}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onPrevMonths={handlePrevMonths}
          onNextMonths={handleNextMonths}
          onMonthSelect={handleMonthSelect}
        />
      </div>

      <div className="p-4">
        {chartData.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Chart Title */}
            <h2 className="text-2xl font-bold text-center mb-4">
              {activeView === "income" ? "Income" : "Expense"} Summary
            </h2>

            <div className="relative min-h-[400px]">
              {isTransitionsLoading && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent ">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                </div>
              )}
              <div className={`transition-all duration-300 ${
                isTransitionsLoading ? 'opacity-0 blur-[0px]' : 'opacity-100 blur-0'
              }`}>
                <PieChartDisplay
                  chartData={chartData}
                  totalAmount={totalAmount}
                  activeView={activeView}
                />
                <ChartLegend chartData={chartData} />
                <CategoryList
                  chartData={chartData}
                  activeView={activeView}
                  onCategorySelect={setSelectedCategory}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedCategory !== null && (
        <CategoryTransactions
          categoryId={selectedCategory}
          transactions={transactions}
          onClose={() => setSelectedCategory(null)}
          month={selectedMonth}
          year={selectedYear}
        />
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
