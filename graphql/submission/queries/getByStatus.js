import { gql } from "apollo-boost"

export const getByStatus = gql`
  query SubmissionByStatus($status: String!) {
    submissionsByStatus(status: $status) {
      id
      name
    }
  }
`
