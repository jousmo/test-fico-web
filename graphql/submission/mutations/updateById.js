import { gql } from "apollo-boost"

export const updateById = gql`
  mutation UpdateSubmissionById(
    $data: CreateSubmission!,
    $id: ID!
  ){
    UpdateSubmission(
      id: $id,
      data: $data
    ) {
      id
    }
  }
`
