import { gql } from "apollo-boost"

export const getCommentsTechnical = gql`
  query TechnicalMonitoringComments($monitoringTechnical: ID!) {
    TechnicalMonitoringComments(monitoringTechnical: $monitoringTechnical) {
      id
      createdAt
      userType
      comment
    }
  }
`
