import { gql } from "apollo-boost"

export const disabledAccount = gql`
  mutation DisabledAccount(
    $id: ID!
    $disabled: Boolean!
  ){
    DisabledAccount(
      id: $id, 
      disabled: $disabled
    ) {
      id
    }
  }
`
