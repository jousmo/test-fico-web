import { gql } from "apollo-boost"

export const createNew = gql`
  mutation createSubmission($data: CreateSubmission!){
    CreateSubmission(data: $data){
      id
    }
  }
`
