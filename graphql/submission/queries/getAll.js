import { gql } from "apollo-boost"

export const getAll = gql`
  query SubmissionByStatus($state: String) {
    allSubmissions(filter: {state: $state}) {
      id
      implementer
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
      specificObjectives
      beneficiaries
      consultants
      developmentObjectiveIndicators
      generalObjectiveIndicators
      concepts
      status
      statusChangedAt
      deadline
      signedContractAt
      comments
      agreementNumber
    }
  }
`
