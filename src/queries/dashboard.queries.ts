import { gql } from "@apollo/client";

export const DASHBOARD_SUMARY = gql`
  query GetSumaryDashboard {
    getSumaryDashboard {
      amountPaid
      amountToPay
      totalExpenses
      remainingBalance
    }
  }
`;
