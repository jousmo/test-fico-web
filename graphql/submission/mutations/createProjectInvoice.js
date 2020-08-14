import { gql } from "apollo-boost"

export const createProjectInvoice = gql`
  mutation CreateProjectInvoice(
    $id: ID!,
    $data: ProjectInvoiceInput!
  ){
    CreateProjectInvoice(
      id: $id,
      data: $data
    ) {
      id
    }
  }
`