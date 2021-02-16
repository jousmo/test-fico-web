import { gql } from "apollo-boost"

export const reviewComments = gql`
  mutation ReviewComments($data: [CreateCommentInput!]!){
    ReviewComments(data: $data)
  }
`
