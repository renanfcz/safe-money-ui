import { gql } from "graphql-request";

export const EXPENSES = gql`
  query FindAllExpenses {
    findAllExpenses {
      id
      title
      description
      createdAt
      value
      status
      month
      year
      category {
        title
        description
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
