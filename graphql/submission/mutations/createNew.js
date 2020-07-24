import { gql } from "apollo-boost"

export const createNew = gql`
  mutation createSubmission($data: CreateSubmissionInput!){
    createSubmission(data: $data){
      id
    }
  }
`
