export interface Expense {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  value: number;
  status: string;
  category: {
    title: string;
    description: string;
  };
}

export interface Expenses {
  findAllExpenses: [Expense];
}
