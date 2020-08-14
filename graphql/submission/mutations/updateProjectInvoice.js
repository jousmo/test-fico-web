import { gql } from "apollo-boost"

export const updateProjectInvoice = gql`
  mutation UpdateProjectInvoice(
    $id: ID!,
    $data: ProjectInvoiceInput!
  ){
    UpdateProjectInvoice(
      id: $id,
      data: $data
    )
  }
`