import { gql } from "apollo-boost"

export const deleteProjectAssistance = gql`
  mutation DeleteAssistance(
    $id: ID!
  ){
    DeleteAssistance(id: $id)
  }
`
