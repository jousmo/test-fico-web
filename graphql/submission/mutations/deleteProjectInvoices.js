import { gql } from "apollo-boost"

export const deleteProjectInvoice = gql`
  mutation DeleteProjectInvoice(
    $id: ID!
  ){
    DeleteProjectInvoice(id: $id)
  }
`
