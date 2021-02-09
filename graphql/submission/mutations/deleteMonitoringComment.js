import { gql } from "apollo-boost"

export const deleteMonitoringComment = gql`
  mutation DeleteMonitoringComment(
    $id: ID!
  ){
    DeleteMonitoringComment(id: $id)
  }
`
