import { gql } from "apollo-boost"

export const updateProjectAssistants = gql`
  mutation UpdateProjectAssistants(
    $data: ProjectAssistantsInput!,
    $id: ID!
  ){
    UpdateProjectAssistants(data: $data, id: $id){
      id
    }
  }
`
