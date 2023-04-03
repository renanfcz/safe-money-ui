import { gql } from "graphql-request";

export const EXPENSES = gql`
  query FindAllExpensesGrouping {
  findAllExpensesGrouping {
    id
    month
    year
    expenses {
      title
      description
      value
      status
      category {
        title
      }
    }
  }
}
`;

export const INSERT_EXPENSE = gql`
  mutation CreateExpense($data: ExpenseCreateInput!) {
    createExpense(data: $data) {
      id
    }
  }
`;

export const REMOVE_EXPENSE = gql`
  mutation RemoveExpense($removeExpenseId: String!) {
    removeExpense(id: $removeExpenseId) {
      id
    }
  }
`;
