import { gql } from "apollo-boost"

export const createCommentTechnical = gql`
  mutation CreateTechnicalMonitoringComments(
    $monitoringTechnical: ID!, 
    $data: CreateMonitoringCommentInput!
  ){
    CreateTechnicalMonitoringComments(
      monitoringTechnical: $monitoringTechnical
      data: $data
    ){
      id
    }
  }
`
