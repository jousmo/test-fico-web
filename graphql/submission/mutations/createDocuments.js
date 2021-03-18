import { gql } from "apollo-boost"

export const createDocuments = gql`
  mutation CreateDocuments($data: [DocumentsSubmissionInput!]!) {
    CreateDocuments(data: $data)
  }
`
