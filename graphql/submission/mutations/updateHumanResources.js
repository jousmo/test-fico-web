import { gql } from "apollo-boost"

export const updateHumanResources = gql`
  mutation UpdateHumanResource($data: [CreateConceptInput!]!) {
    UpdateHumanResource(data: $data)
  }
`
