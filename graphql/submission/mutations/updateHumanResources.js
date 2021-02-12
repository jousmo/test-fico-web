import { gql } from "apollo-boost"

export const updateHumanResources = gql`
  mutation UpdateHumanResource($data: [CreateHumanResourceInput!]!) {
    UpdateHumanResource(data: $data)
  }
`
