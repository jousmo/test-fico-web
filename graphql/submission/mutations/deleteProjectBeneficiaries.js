import { gql } from "apollo-boost"

export const deleteProjectBeneficiaries = gql`
  mutation DeleteProjectBeneficiaries(
    $id: ID!
  ){
    DeleteProjectBeneficiaries(id: $id)
  }
`
