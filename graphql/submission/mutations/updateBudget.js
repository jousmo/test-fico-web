import { gql } from "apollo-boost"

export const updateBudget = gql`
  mutation UpdateSubmissionById(
    $data: CreateSubmission!,
    $id: ID!
  ){
    UpdateBudget(
      id: $id,
      data: $data
    ) {
      id
    }
  }
`
