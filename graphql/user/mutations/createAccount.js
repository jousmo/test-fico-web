import { gql } from "apollo-boost"

export const createAccount = gql`
  mutation CreateAccount(
    $data: CreateAccount!
  ){
    CreateAccount(
      data: $data
    ){
      id
    }
  }
`
