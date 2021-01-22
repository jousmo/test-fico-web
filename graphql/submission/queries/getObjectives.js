import { gql } from "apollo-boost"

export const getObjectives = gql`
  query SubmissionObjectives($id: ID!) {
    SubmissionObjectives(id: $id) {
      id
      allies
      endDate
      startDate
      generalObjective
      developmentObjective
      reports {
        period
      }
      specificObjectives {
        id
        description
        indicators {
          goal
          title
          formula
          baseline
          products
          methodology
          description
          meansOfVerification
        }
        activities {
          id
          goal
          place
          inputs
          months
          formula
          baseline
          products
          description
          responsible
          meansOfVerification
        }
      }
      generalObjectiveIndicators {
        id
        goal
        title
        formula
        baseline
        products
        description
        methodology
        meansOfVerification
      }
      developmentObjectiveIndicators {
        id
        goal
        title
        formula
        baseline
        products
        methodology
        description
        meansOfVerification
      }
    }
  }
`
