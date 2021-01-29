import { gql } from "apollo-boost"

export const updateAccount = gql`
  mutation UpdateAccount(
    $id: ID!
    $data: UpdateAccount!
  ){
    UpdateAccount(
      id: $id, 
      data: $data
    ) {
      id
    }
  }
`
