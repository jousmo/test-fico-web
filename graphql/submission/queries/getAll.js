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
      concepts {
        name
        region
        type
        measurementUnit
        unitCost
        totalUnits
        monthlyDistribution
        investmentDistributions {
          name
          type
          percentage
        }
      }
    }
  }
`
