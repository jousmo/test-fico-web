import { gql } from "apollo-boost"

export const updateById = gql`
  mutation UpdateImplementerById(
    $id: ID!,
    $data: CreateImplementer!
  ){
    UpdateImplementer(id: $id, data: $data) {
      id
    }
  }
`
