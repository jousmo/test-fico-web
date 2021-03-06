import { gql } from "apollo-boost"

export const getTechnicalSpecification = gql`
  query TechnicalSpecification($id: ID!) {
    TechnicalSpecification(id: $id) {
      id
      name
      startDate
      endDate
      developmentObjective
      generalObjective
      state
      status
      specificObjectives {
        id
        orderIndex
        description
        comments {
          id
          fieldName
          createdAt
          reviewed
          revision
          comment
          type
        }
        indicators {
          id
          type
          title
          orderIndex
          description
          methodology
          formula
          meansOfVerification
          baseline
          goal
          startDate
          endDate
          measurementPeriodicity
          products
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
        activities {
          id
          title
          orderIndex
          description
          responsible
          methodology
          formula
          meansOfVerification
          baseline
          goal
          place
          months
          inputs
          products
          schedules {
            id
            place
            scheduledAt
            completedAt
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
      developmentObjectiveIndicators {
        id
        type
        title
        description
        methodology
        formula
        meansOfVerification
        baseline
        goal
        startDate
        endDate
        measurementPeriodicity
        products
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
      generalObjectiveIndicators {
        id
        type
        title
        description
        methodology
        formula
        meansOfVerification
        baseline
        goal
        startDate
        endDate
        measurementPeriodicity
        products
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
`
