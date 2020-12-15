import { gql } from "apollo-boost"

export const updateProjectBeneficiaries = gql`
  mutation UpdateProjectBeneficiaries(
    $data: ProjectBeneficiariesInput!,
    $id: ID!
  ){
    UpdateProjectBeneficiaries(data: $data, id: $id){
      id
    }
  }
`
