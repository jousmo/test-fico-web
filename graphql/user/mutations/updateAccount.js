import { gql } from "apollo-boost"

export const updateAccount = gql`
  mutation UpdateAccount(
    $id: ID!
    $role: AccountRole!
  ){
    UpdateAccount(
      id: $id, 
      role: $role
    ) {
      id
    }
  }
`
