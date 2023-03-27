"use client";

import { Wallet, DollarSign, Coins, CheckCircle } from "lucide-react";

interface SummaryProps {
  amountPaid: number;
  amountToPay: number;
  totalExpenses: number;
  remainingBalance: number;
}

function formatCurrency(value:number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function Summary({
  amountPaid,
  amountToPay,
  totalExpenses,
  remainingBalance,
}: SummaryProps) {
  return (
    <div className="columns-5 flex flex-row justify-center">
      <div className="bg-green-700 p-3 rounded w-64 mx-2 flex">
        <div className="flex items-center">
          <CheckCircle color="antiquewhite" size={50} />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-center">
            <span className="text-white align-middle">Valor pago</span>
          </div>
          <div className="text-center">
            <span className="text-white font-bold text-2xl align-middle">
              {formatCurrency(amountPaid)}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-amber-500 p-3 rounded w-64 mx-2 flex">
        <div className="flex items-center">
          <Coins color="antiquewhite" size={50} />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-center">
            <span className="text-white align-middle">Valor à pagar</span>
          </div>
          <div className="text-center">
            <span className="text-white font-bold text-2xl align-middle">
              {formatCurrency(amountToPay)}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-blue-700 p-3 rounded w-64 mx-2 flex">
        <div className="flex items-center">
          <DollarSign color="antiquewhite" size={50} />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-center">
            <span className="text-white align-middle">Total do mês</span>
          </div>
          <div className="text-center">
            <span className="text-white font-bold text-2xl align-middle">
              {formatCurrency(totalExpenses)}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-orange-700 p-3 rounded w-64 mx-2 flex">
        <div className="flex items-center">
          <Wallet color="antiquewhite" size={50} />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-center">
            <span className="text-white align-middle">Saldo líquido</span>
          </div>
          <div className="text-center">
            <span className="text-white font-bold text-2xl align-middle">
              {formatCurrency(remainingBalance)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
