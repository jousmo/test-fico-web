import { gql } from "apollo-boost"

export const updateById = gql`
  mutation UpdateImplementerById($data: CreateImplementer!){
    UpdateImplementer(data: $data) {
      id
    }
  }
`
