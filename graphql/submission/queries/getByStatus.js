import { gql } from "apollo-boost"

export const getByStatus = gql`
  query SubmissionByStatus($status: status) {
    Submission(status: $status) {
      id
      name
    }
  }
`
