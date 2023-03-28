import { gql } from 'graphql-request';

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
