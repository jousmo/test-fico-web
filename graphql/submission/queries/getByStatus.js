import { gql } from "apollo-boost"

export const getByStatus = gql`
  query SubmissionByStatus($status: String) {
    allSubmissions(filter: {status: $status}) {
      id
      name
    }
  }
`
