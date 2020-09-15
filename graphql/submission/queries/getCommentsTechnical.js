import { gql } from "apollo-boost"

export const getCommentsTechnical = gql`
  query TechnicalMonitoringComments($monitoringInvoice: ID!) {
    TechnicalMonitoringComments(monitoringInvoice: $monitoringInvoice) {
      id
      createdAt
      userType
      comment
    }
  }
`
