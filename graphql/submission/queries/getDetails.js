import { gql } from "apollo-boost"

export const getDetails = gql`
  query Submission($id: ID!) {
    SubmissionDetails(id: $id) {
      id
      name
      type
      applyingCall
      township
      region
      allies
      implementationPlace
      responsible
      startDate
      endDate
      strategicAxis
      preventionLevel
      scope
      issueDescription
      description
      justification
      developmentObjective
      generalObjective
      state
      status
      statusChangedAt
      deadline
      signedContractAt
      agreementNumber
      technicalOpinion
      budgeted
      evidenced
      difference
      createdAt
      specificObjectives {
        description
      }
      implementer {
        name
        phone
        email
        vision
        mission
        history
        director
        alliances
        fiscalAddress
        previousSupports
        incomesAndExpenses
        legalRepresentative
        institutionalExperience
        proofOfCharitableContributions
        councilMembers {
          name
          charge
        }
      }
      beneficiaries {
        description
        number
        gender
        educationLevel
        age
        preventionLevel
      }
      documents {
        id
        url
        name
        type
      }
      closureDocuments {
        id
        url
        name
        type
      }
    }
  }
`
