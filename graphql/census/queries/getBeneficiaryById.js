import { gql } from "apollo-boost"

export const getBeneficiaryById = gql`
  query CensusBeneficiaryById($id: ID) {
    CensusBeneficiaryById(id: $id) {
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
`
