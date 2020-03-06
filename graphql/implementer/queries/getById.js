import { gql } from "apollo-boost";

export const getById = gql`
  {
    Query ImplementerById($id: String!) {
      Implementer(id: $id) {
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
        institutionExperience
        previousSupports
        alliances
        incomeAndExpenses
      }
    }
  }
`
