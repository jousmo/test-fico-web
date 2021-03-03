import { gql } from "apollo-boost"

export const getByUid = gql`
  query ImplementerByUid($uid: String!) {
    Implementer:ImplementerByUid(uid: $uid) {
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
          type
          institution
          amount
        }
      }
    }
  }
`
