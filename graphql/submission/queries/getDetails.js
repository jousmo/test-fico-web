import { gql } from "apollo-boost"

export const getDetails = gql`
  query Submission($id: ID!) {
    Submission:SubmissionDetails(id: $id) {
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
      approved
      evidenced
      difference
      createdAt
      implementer {
        id
        name
      }
      specificObjectives {
        description
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
