import { gql } from "apollo-boost"

export const createNew = gql`
  mutation createSubmission($data: CreateSubmission!, $id: ID!){
    CreateSubmission(data: $data, id: $id){
      id
    }
  }
`
