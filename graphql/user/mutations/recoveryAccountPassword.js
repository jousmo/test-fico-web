import { gql } from "apollo-boost"

export const recoveryAccountPassword = gql`
  mutation RecoveryPassword(
    $email: String!
  ){
    RecoveryPassword(
      email: $email
    )
  }
`
