export interface Expense {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  value: number;
  status: string;
  month: string;
  year: number
  category: {
    title: string;
    description: string;
  };
}

export interface Expenses {
  findAllExpenses: [Expense];
}
