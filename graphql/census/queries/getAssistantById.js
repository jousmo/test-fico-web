import { gql } from "apollo-boost"

export const getAssistantById = gql`
  query CensusAssistantById($id: ID) {
    CensusAssistantById(id: $id) {
      folio
      name
      lastName
      maidenName
      gender
      birthdate
      curp
      phone
      state
      municipality
      colony
      submission {
        name
        issueDescription
        strategicAxis
        preventionLevel
        specificObjectives{
          createdAt
          description
        }
      }
    }
  }
`
