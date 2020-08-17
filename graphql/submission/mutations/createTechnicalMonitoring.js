import { gql } from "apollo-boost"

export const createMonitoring = gql`
  mutation CreateTechnicalMonitoring(
    $data: CreateTechnicalMonitoring!,
    $id: ID!
  ){
    CreateTechnicalMonitoring(data: $data, id: $id){
      id
    }
  }
`
