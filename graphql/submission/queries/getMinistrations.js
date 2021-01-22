import { gql } from "apollo-boost"

export const getMinistrations = gql`
  query Ministrations($id: ID!) {
    Ministrations(id: $id) {
      id
      allies
      endDate
      startDate
      concepts {
        id
        name
        type
        region
        unitCost
        budgeted
        totalUnits
        measurementUnit
        monthlyDistribution
        investmentDistribution {
          name
          type
          percentage
        }
      }
    }
  }
`
