import { gql } from "apollo-boost";

export const getById = gql`
  query ImplementerById($id: ID!) {
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
`
