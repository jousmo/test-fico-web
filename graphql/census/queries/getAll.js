import { gql } from "apollo-boost"

export const getAllCensus = gql`
  query getAllCensus {
    Census {
      assistants {
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
        submission {
          id
          issueDescription
          strategicAxis
          specificObjectives{
            id
            activities{
              id
            }
          }
        }
      }
      beneficiaries {
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
        submission {
          id
          issueDescription
          strategicAxis
          specificObjectives{
            id
            activities{
              id
            }
          }
        }
      }
    }
  }
`
