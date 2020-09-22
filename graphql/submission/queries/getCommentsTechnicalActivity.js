import { gql } from "apollo-boost"

export const getCommentsTechnicalActivity = gql`
  query TechnicalMonitoringActivityComments($monitoringTechnicalActivity: ID!) {
    TechnicalMonitoringActivityComments(monitoringTechnicalActivity: $monitoringTechnicalActivity) {
      id
      createdAt
      userType
      comment
    }
  }
`
