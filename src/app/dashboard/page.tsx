"use client"

import { Summary } from '@/components/Summary';
import { Table } from '@/components/Table';
import { DASHBOARD_SUMARY } from '@/queries/dashboard.queries';
import { EXPENSES } from '@/queries/expenses.queries';
import { executeQuery, getToken } from '@/services/auth.service';
import { useQuery } from 'react-query';

interface SummaryProps {
  getSumaryDashboard: {
    amountPaid: number;
    amountToPay: number;
    totalExpenses: number;
    remainingBalance: number;
  };
}

interface ExpensesProps {
  findAllExpenses: [];
}

export default function Dashboard() {

  const summary = useQuery({
    queryKey: ["summary"],
    queryFn: (): Promise<SummaryProps> => {
      return executeQuery(DASHBOARD_SUMARY, getToken());
    },
    initialData: {
      getSumaryDashboard: {
        amountPaid: 0,
        amountToPay: 0,
        totalExpenses: 0,
        remainingBalance: 0,
      },
    },
  });

  const expenses = useQuery({
    queryKey: ["expenses"],
    queryFn: (): Promise<ExpensesProps> => {
      return executeQuery(EXPENSES, getToken());
    },
    initialData: {
      findAllExpenses: [],
    },
  });

  return (
    <div>
      <h1 className="text-white font-bold m-2">Dashboard</h1>
      <Summary
        amountPaid={summary.data?.getSumaryDashboard.amountPaid!}
        amountToPay={summary.data?.getSumaryDashboard.amountToPay!}
        totalExpenses={summary.data?.getSumaryDashboard.totalExpenses!}
        remainingBalance={summary.data?.getSumaryDashboard.remainingBalance!}
      />
      {expenses.isLoading ? (
        <p>Carregando...</p>
      ) : (
        <Table expenses={expenses.data?.findAllExpenses!} />
      )}
    </div>
  );
}
