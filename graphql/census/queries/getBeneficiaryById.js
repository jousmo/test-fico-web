import { gql } from "apollo-boost"

export const getBeneficiaryById = gql`
  query CensusBeneficiaryById($id: ID) {
    CensusBeneficiaryById(id: $id) {
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
