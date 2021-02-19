import { gql } from "apollo-boost"

export const mutateProjectInvoice = gql`
  mutation UpsertProjectInvoice($data: ProjectInvoiceInput!){
    ProjectInvoice(data: $data)
  }
`
