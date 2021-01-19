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
    }
  }
`
