import { gql } from "@apollo/client";

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
