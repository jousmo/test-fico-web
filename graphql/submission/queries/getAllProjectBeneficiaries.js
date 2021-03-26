import { gql } from "apollo-boost"

export const getAllProjectBeneficiaries = gql`
  query getAllProjectBeneficiaries{
    ProjectBeneficiaries{
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
      projectAssistantId
    }
  }
`
