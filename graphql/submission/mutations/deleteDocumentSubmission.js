import { gql } from "apollo-boost"

export const deleteDocumentSubmission = gql`
  mutation DeleteDocumentSubmission(
    $id: ID!
  ){
    DeleteDocumentSubmission(id: $id)
  }
`