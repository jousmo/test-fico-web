import { gql } from "apollo-boost"

export const createCommentTechnicalActivity = gql`
  mutation CreateTechnicalMonitoringActivityComments(
    $monitoringTechnicalActivity: ID!, 
    $data: CreateMonitoringCommentInput!
  ){
    CreateTechnicalMonitoringActivityComments(
      monitoringTechnicalActivity: $monitoringTechnicalActivity
      data: $data
    ){
      id
    }
  }
`
