import { gql } from "apollo-boost"

export const updateById = gql`
  mutation UpdateSubmissionById(
    $data: CreateSubmissionInput!,
    $id: ID!){
      updateSubmission(
        id: $id,
        data: $data
      ) {
        id
      }
    }
`
