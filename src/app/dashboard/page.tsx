"use client";
import { Summary } from "@/components/Summary";
import { Table } from "@/components/Table";
import { Expense } from "@/models/Expense";
import { EXPENSES } from "@/queries/expenses.queries";
import { executeQuery, getToken } from "@/services/auth.service";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

interface SummaryProps {
  getSumaryDashboard: {
    amountPaid: number;
    amountToPay: number;
    totalExpenses: number;
    remainingBalance: number;
  };
}

interface ExpenseGroupsProps {
  findAllExpensesGrouping: [];
}

interface ExpenseGroup {
  id: string;
  month: string;
  year: number;
  expenses: Expense[];
}

export default function Dashboard() {
  const [amountPaid, setAmountPaid] = useState(0);
  const [amountToPay, setAmountToPay] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

  const expenseGroups = useQuery({
    queryKey: ["expenses"],
    queryFn: (): Promise<ExpenseGroupsProps> => {
      return executeQuery(EXPENSES, null, getToken());
    },
    initialData: {
      findAllExpensesGrouping: [],
    },
  });

  const handlePrevious = () => {};
  function handleNext() {
    setCurrentPosition(52);
  }

  return (
    <div>
      <h1 className="text-white font-bold m-2">Dashboard</h1>
      <Summary
        amountPaid={amountPaid}
        amountToPay={amountToPay}
        totalExpenses={totalExpenses}
        remainingBalance={remainingBalance}
      />
      <div>
        <div className="bg-white mt-5 flex justify-between">
          <button onClick={() => handlePrevious}>
            <ChevronLeft />
          </button>
          <button onClick={() => handleNext}>
            <ChevronRight />
          </button>
        </div>
          {expenseGroups.isLoading ? (
            <p>Carregando...</p>
          ) : (
            <Swiper
              modules={[Navigation]}
              navigation={true}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {expenseGroups.data?.findAllExpensesGrouping.map(
                (group: ExpenseGroup) => (
                  <SwiperSlide key={group.id}>
                    <Table
                      month={group.month}
                      year={group.year}
                      expenses={group.expenses}
                      key={group.id}
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          )}
      </div>
    </div>
  );
}
