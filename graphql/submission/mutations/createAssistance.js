import { gql } from "apollo-boost"

export const createAssistance = gql`
  mutation CreateAssistance($data: [ActivityAssistanceInput!]!) {
    CreateAssistance(data: $data)
  }
`
