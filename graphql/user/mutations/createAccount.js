import { gql } from "apollo-boost"

export const createAccount = gql`
  mutation CreateImplementerAccount(
    $data: CreateImplementerAccount!
  ){
    CreateImplementerAccount(
      data: $data
    ){
      id
    }
  }
`
