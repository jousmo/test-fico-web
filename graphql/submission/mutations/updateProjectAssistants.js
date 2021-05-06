import { gql } from "apollo-boost"

export const updateProjectAssistants = gql`
  mutation UpdateProjectAssistants(
    $data: ProjectAssistantsInput!,
    $submissionId: ID!,
    $id: ID!
  ){
    UpdateProjectAssistants(data: $data, submissionId: $submissionId, id: $id){
      id
    }
  }
`
