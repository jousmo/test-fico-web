import { gql } from "apollo-boost"

export const updateMonitoring = gql`
  mutation UpdateTechnicalMonitoring(
    $data: CreateTechnicalMonitoring!,
    $id: ID!
  ){
    UpdateTechnicalMonitoring(data: $data, id: $id){
      id
    }
  }
`
