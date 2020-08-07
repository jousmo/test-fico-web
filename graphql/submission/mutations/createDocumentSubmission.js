import { gql } from "apollo-boost"

export const createDocumentSubmission = gql`
  mutation CreateDocumentSubmission(
    $id: ID!,
    $data: DocumentsSubmissionInput!
  ){
    CreateDocumentSubmission(
      id: $id,
      data: $data
    ) {
      id
    }
  }
`