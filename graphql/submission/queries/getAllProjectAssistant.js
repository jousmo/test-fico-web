import { gql } from "apollo-boost"

export const getAllProjectAssistant = gql`
  query getAllProjectAssistant{
    ProjectAssistants{
      id
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
      assistance{
        id
        activity
        assistanceAt
      }
    }
  }
`
