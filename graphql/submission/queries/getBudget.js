import { gql } from "apollo-boost"

export const getBudget = gql`
  query Budget($id: ID!) {
    Budget(id: $id) {
      state
      allies
      status
      endDate
      region
      township
      startDate
      concepts {
        id
        name
        index
        region
        type
        measurementUnit
        unitCost
        totalUnits
        monthlyDistribution,
        budgeted
        investmentDistribution {
          id
          name
          type
          percentage
        }
        humanResource {
          id
          position
          name
          tasks
          overseer
          hours
          contractType
          salary
          benefits
          taxes
          total
          documents {
            id
            name
            url
          }
          comments {
            id
            fieldName
            createdAt
            reviewed
            revision
            comment
            type
          }
        }
        comments {
          id
          fieldName
          createdAt
          reviewed
          revision
          comment
          type
        }
      }
    }
  }
`
