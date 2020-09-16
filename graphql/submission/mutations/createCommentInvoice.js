import { gql } from "apollo-boost"

export const createCommentInvoice = gql`
  mutation CreateInvoiceMonitoringComments(
    $monitoringInvoice: ID!, 
    $data: CreateMonitoringCommentInput!
  ){
    CreateInvoiceMonitoringComments(
      monitoringInvoice: $monitoringInvoice
      data: $data
    ){
      id
    }
  }
`
