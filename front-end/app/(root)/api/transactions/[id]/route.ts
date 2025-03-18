import { NextRequest, NextResponse } from "next/server";
import { Transaction } from "../route";

// Validation function from the main route
const validateTransaction = (
  transaction: Partial<Transaction>,
  isUpdate = false
): { valid: boolean; error?: string } => {
  // For updates, we don't require all fields
  if (!isUpdate) {
    if (!transaction.amount) return { valid: false, error: "Amount is required" };
    if (!transaction.type) return { valid: false, error: "Transaction type is required" };
    if (!transaction.categoryID) return { valid: false, error: "Category ID is required" };
    if (!transaction.date) return { valid: false, error: "Date is required" };
  }

  // Validate amount if provided
  if (transaction.amount !== undefined && transaction.amount <= 0) {
    return { valid: false, error: "Amount must be greater than zero" };
  }

  // Validate type if provided
  if (transaction.type && !["EXPENSE", "INCOME"].includes(transaction.type)) {
    return { valid: false, error: "Transaction type must be either EXPENSE or INCOME" };
  }

  // Validate date is not in the future if provided
  if (transaction.date) {
    const today = new Date().toISOString().split("T")[0];
    if (transaction.date > today) {
      return { valid: false, error: "Date cannot be in the future" };
    }
  }

  return { valid: true };
};

// GET /api/transactions/:id - Get a specific transaction
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || "Failed to fetch transaction" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in transaction GET route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/transactions/:id - Update a transaction
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate transaction data for update
    const validation = validateTransaction(body, true);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Make request to backend API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/${params.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || "Failed to update transaction" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in transaction PATCH route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/transactions/:id - Delete a transaction
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    // Make request to backend API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/transactions/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || "Failed to delete transaction" },
        { status: response.status }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error in transaction DELETE route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}