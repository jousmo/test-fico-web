import { gql } from "apollo-boost"

export const getById = gql`
  query SubmissionById($id: ID!) {
    Submission(id: $id) {
      id
      implementerId
      name
      type
      applyingCall
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
      specificObjectives
      beneficiaries
      hasConsultant
      consultant
      developmentObjectiveIndicators
      generalObjectiveIndicators
      concepts
      status
      statusChangedAt
      deadline
      signedContractAt
    }
  }
`
