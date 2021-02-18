import { gql } from "apollo-boost"

export const mutateMonitoring = gql`
  mutation UpsertTechnicalMonitoring($data: CreateTechnicalMonitoring!){
    TechnicalMonitoring(data: $data)
  }
`
