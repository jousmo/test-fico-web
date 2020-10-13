import { gql } from "apollo-boost"

export const getAll = gql`
  query getAccounts{
    Accounts {
      id
      uid
      email
      role
      displayName
      disabled
    }
  }
`
