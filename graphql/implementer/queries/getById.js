import { gql } from "apollo-boost"

export const getById = gql`
  query ImplementerById($id: ID) {
    Implementer(implementerId: $id) {
      id
      type
      name
      director
      rfc
      commercialName
      commercialAddress
      fiscalAddress
      phone
      proofOfCharitableContributions
      legalRepresentative
      email
      mission
      vision
      history
      institutionalExperience
      previousSupports
      alliances
      incomesAndExpenses
      socialObject
      councilMembers {
        name
        charge
        remuneration
      }
      documents {
        id
        name
        type
        url
      }
      projects {
        name
        objective
        year
        financing {
          id
          type
          institution
          amount
        }
      }
    }
  }
`
