import { gql } from "apollo-boost"

export const updateGeneralInfo = gql`
  mutation UpdateSubmissionById(
    $data: CreateSubmission!,
    $id: ID!
  ){
    UpdateGeneralInformation(
      id: $id,
      data: $data
    ) {
      id
    }
  }
`
