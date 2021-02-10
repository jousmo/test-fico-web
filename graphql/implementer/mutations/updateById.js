import { gql } from "apollo-boost"

export const updateById = gql`
  mutation UpdateImplementerById($data: CreateImplementer!, $uid: String!){
    UpdateImplementer(data: $data, uid: $uid) {
      id
    }
  }
`
