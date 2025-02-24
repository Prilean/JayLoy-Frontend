"use client";
import { TransactionInput } from "@/components/customeInput";
import { Button } from "@/components/ui/button";
import { DropdownMenuDemo } from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import PopupModal from "./components/popupModal";
import { useRouter } from "next/navigation";
import { error } from "console";
import { Erica_One } from "next/font/google";

export default function Transaction() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({  "amount": Number(amount),
                                "type": transactionType.toUpperCase(),
                                "description": description,
                                "date": date,
                                "categoryID": category}),
      }).catch((error) => alert(error));
      router.push("/");
    }
    catch (err){
      alert("Failed to create new transaction!")
    }
  };

  const containerClasses =
    "min-h-screen flex flex-col items-center justify-center px-4 gap-4";
  const [transactionType, setTransactionType] = useState(""); //  "Expense" or "Income"
  const [amount, setAmount] = useState(""); // " " value
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  // Get the current date in yyyy-mm-dd format for the input field
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(1);
  //handle transactiontype
  const handleTransactionTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransactionType(event.target.value);
  };
  // handle value - +
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // - number if "Expense" is selected
    if (transactionType === "Expense" && value !== "") {
      if (!value.startsWith("-")) {
        value = `-${value}`; // the value starts with "-"
      }
    } else if (transactionType === "Income" && value.startsWith("-")) {
      value = value.replace("-", ""); // Remove "-" for income
    }

    setAmount(value);
  };
  return (
    <div className={containerClasses}>
      {/* tabbar in layout applied  */}
      <div className=" w-full bg-background p-0 relative z-0">
        <div className="mx-auto max-w-md px-6 py-12 bg-background border-0 shadow-lg sm:rounded-3xl">
          <h1 className="text-2xl   mb-8">Add record </h1>
          <form id="form" onSubmit={handleSubmit}>
            <div className="relative z-50 w-full mb-5 flex items-center justify-between gap-2">
              <legend className="description-small text-black  ">
                {" "}
                Category{" "}
              </legend>
              <div className="shrink-0">
                <PopupModal category={category} setCategory={setCategory}/>
              </div>
            </div>
            {/* radio button for expense and and income */}
            <fieldset className="relative z-0 w-full p-px mb-5">
              <legend className="description-small text-black ">
                Choose type of transaction{" "}
              </legend>
              <div className="block pt-3 pb-2 space-x-4">
                <label className="text-red">
                  <input
                    type="radio"
                    name="transactionType"
                    value="Expense"
                    onChange={handleTransactionTypeChange}
                    className="mr-2 accent-red  text-red border-3  border-red  focus:border-red focus:ring-red"
                  />
                  Expense
                </label>

                <label className="text-primary">
                  <input
                    type="radio"
                    name="transactionType"
                    value="Income"
                    onChange={handleTransactionTypeChange}
                    className="mr-2  accent-primary text-primary border-3 border-primary focus:border-primary focus:ring-primary"
                  />
                  Income
                </label>
              </div>
            </fieldset>

            <div className="relative z-0 w-full mb-5 flex items-center gap-2">
              {/* Left Side: Dropdown */}
              <legend className="description-small text-black ">
                {" "}
                Amount{" "}
              </legend>
              <div className="shrink-0">
                <DropdownMenuDemo />
              </div>
              <TransactionInput
                type="number"
                placeholder="0.00"
                desc="Amount is required"
                value={amount}
                onChange={handleAmountChange}
              />
            </div>
            <legend className="description-small text-black "> Date </legend>
            <TransactionInput
              type="date"
              placeholder="Date"
              desc="Date is required"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TransactionInput
              type="text"
              placeholder="Note"
              desc="Note is required"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              className="green-button !text-white" >
              Add Record
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
