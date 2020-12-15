import { gql } from "apollo-boost"

export const createProjectBeneficiaries = gql`
  mutation CreateProjectBeneficiaries(
    $data: ProjectBeneficiariesInput!,
    $id: ID!
  ){
    CreateProjectBeneficiaries(data: $data, id: $id){
      id
    }
  }
`
