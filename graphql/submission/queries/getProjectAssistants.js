import { gql } from "apollo-boost"

export const getProjectAssistants = gql`
  query getProjectAssistants($id: ID!) {
    ProjectAssistants (id: $id){
      id
      name
      curp
      phone
      state
      createdAt
      folio
      gender
      colony
      lastName
      birthdate
      maidenName
      beneficiary
      municipality
      assistance {
        id
        assistanceAt
        activity {
          id
          description
          title
        }
      }
    }
  }
`
