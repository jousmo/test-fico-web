import { gql } from "apollo-boost"

export const deleteProjectAssistants = gql`
  mutation DeleteProjectAssistants(
    $id: ID!
  ){
    DeleteProjectAssistants(id: $id)
  }
`
