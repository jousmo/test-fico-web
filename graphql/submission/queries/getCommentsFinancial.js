import { gql } from "apollo-boost"

export const getCommentsFinancial = gql`
  query InvoiceMonitoringComments($monitoringInvoice: ID!) {
    InvoiceMonitoringComments(monitoringInvoice: $monitoringInvoice) {
      id
      createdAt
      userType
      comment
    }
  }
`
