import { gql } from "apollo-boost"

export const getTechnicalMonitoring = gql`
  query TechnicalMonitoring($id: ID!) {
    Submission:TechnicalMonitoring(id: $id) {
      endDate
      startDate
      specificObjectives {
        id
        orderIndex
        description
        indicators {
          id
          goal
          type
          title
          endDate
          startDate
          orderIndex
          description
          meansOfVerification
        }
        activities {
          id
          goal
          title
          orderIndex
          description
          responsible
          meansOfVerification
          schedules {
            id
            place
            scheduledAt
            completedAt
          }
        }
      }
      developmentObjectiveIndicators {
        id
        goal
        type
        title
        endDate
        startDate
        methodology
        description
        meansOfVerification
      }
      generalObjectiveIndicators {
        id
        type
        goal
        title
        endDate
        startDate
        description
        meansOfVerification
        measurementPeriodicity
      }
      state
      status
      technicalMonitoringReports{
        id
        key
        goal
        appliedAt
        completed
        compliance
        reviewedAt
        verificationDocuments{
          id
          name
          url
        }
        participants{
          id
          age
          type
          amount
          gender
          preventionLevel
        }
      }
      technicalUpdates{
        id
        createdAt
        obstacles
        challenges
        correctiveActions
      }
      createdAt
      projectBeneficiaries{
        id
        name
        curp
        phone
        folio
        state
        gender
        colony
        lastName
        birthdate
        maidenName
        municipality
        projectAssistantId
      }
    }
  }
`
