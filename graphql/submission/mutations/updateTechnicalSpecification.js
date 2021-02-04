import { gql } from "apollo-boost"

export const updateTechnicalSpecification = gql`
  mutation UpdateTechnicalSpecification(
    $data: CreateSubmission!,
    $id: ID!
  ){
    UpdateTechnicalSpecification(
      id: $id,
      data: $data
    ) {
      id
    }
  }
`
