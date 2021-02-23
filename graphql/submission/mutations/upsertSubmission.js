import { gql } from "apollo-boost"

export const upsertSubmission = gql`
  mutation UpsertSubmission($data: NewSubmissionInput!){
    UpsertSubmission(data: $data)
  }
`
