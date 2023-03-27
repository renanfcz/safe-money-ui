"use client";
import { Summary } from "@/components/Summary";
import { Table } from "@/components/Table";
import { createApolloClient } from "@/lib/apollo-client";
import { Expense } from "@/models/Expense";
import { DASHBOARD_SUMARY } from "@/queries/dashboard.queries";
import { EXPENSES } from "@/queries/expenses.queries";
import { getToken } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SummaryProps {
  amountPaid: number;
  amountToPay: number;
  totalExpenses: number;
  remainingBalance: number;
}

interface ExpensesProps {
  expenses: [Expense];
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [summary, setSummary] = useState<SummaryProps>({
    amountPaid: 0,
    amountToPay: 0,
    totalExpenses: 0,
    remainingBalance: 0,
  });

  const router = useRouter();

  useEffect(() => {
    const apollo = createApolloClient(getToken());
    apollo
      .query({ query: EXPENSES })
      .then((result) => setExpenses(result.data.findAllExpenses))
      .catch((error) => {
        if (error.message == "GqlAuthGuard") {
          router.push("auth/signin");
        }
      });

    apollo
      .query({
        query: DASHBOARD_SUMARY,
      })
      .then((result) => {
        console.log(result);
        setSummary(result.data.getSumaryDashboard);
      })
      .catch((error) => {
        if (error.message == "GqlAuthGuard") {
          router.push("auth/signin");
        }
      });
  }, []);

  return (
    <div>
      <h1 className="text-white font-bold m-2">Dashboard</h1>
      <Summary
        amountPaid={summary.amountPaid!}
        amountToPay={summary.amountToPay!}
        totalExpenses={summary.totalExpenses!}
        remainingBalance={summary.remainingBalance!}
      />
      <Table expenses={expenses} />
    </div>
  );
}
