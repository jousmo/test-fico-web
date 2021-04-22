import { gql } from "apollo-boost"

export const getAll = gql`
  query getSubmissions(
    $state: State!,
    $status: Status
  ) {
    Submissions(
      state: $state,
      status: $status
    ) {
      id
      implementer {
        name
        commercialName
      }
      name
      type
      applyingCall
      township
      region
      strategicAxis
      status
      statusChangedAt
      deadline
      agreementNumber
      technicalOpinion
      createdAt
      budgeted
      approved
    }
    
    Implementer {
      rfc
      name
      email
      phone
      director
      legalRepresentative
    }
  }
`
