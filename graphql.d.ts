import { Expenses } from './src/models/Expense';

declare module '*/expenses.graphql' {
  export const query: import('@apollo/client').DocumentNode<Expenses>;
}