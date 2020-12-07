import { gql } from "apollo-boost"

export const createProjectAssistants = gql`
  mutation CreateProjectAssistants(
    $data: ProjectAssistantsInput!,
    $id: ID!
  ){
    CreateProjectAssistants(data: $data, id: $id){
      id
    }
  }
`
