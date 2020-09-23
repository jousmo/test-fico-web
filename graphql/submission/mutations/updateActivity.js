import { gql } from "apollo-boost"

export const updateActivity = gql`
  mutation UpdateActivityById($data: CreateActivityInput!){
    UpdateActivity(data: $data) {
      id
    }
  }
`
