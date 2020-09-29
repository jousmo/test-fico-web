import { gql } from "apollo-boost"

export const getById = gql`
  query SubmissionById($id: ID!) {
    Submission(id: $id) {
      id
      implementer {
        name
        councilMembers {
          name
          charge
        }
      }
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
      specificObjectives {
        id
        description
        orderIndex
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
            fieldName
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
            fieldName
            revision
            comment
            type
          }
        }
      }
      beneficiaries {
        id
        description
        number
        gender
        educationLevel
        age
        preventionLevel
        comments {
          fieldName
          revision
          comment
          type
        }
      }
      consultants {
        id
        description
        commercialName
        commercialAddress
        contactName
        phone
        rfc
        fiscalAddress
        fiscalPersonType
        hadReceivedSupports
        supports {
          id
          name
          receivedAt
          amount
        }
        documents {
          id
          name
          url
        }
        comments {
          fieldName
          revision
          comment
          type
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
          fieldName
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
          fieldName
          revision
          comment
          type
        }
      }
      concepts {
        id
        name
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
            fieldName
            revision
            comment
            type
          }
        }
        comments {
          fieldName
          revision
          comment
          type
        }
      }
      state
      status
      statusChangedAt
      deadline
      signedContractAt
      agreementNumber
      technicalOpinion
      comments {
        fieldName
        revision
        comment
        type
      }
      documents {
        id
        name
        type
        url
      }
      budgeted
      evidenced
      difference
      invoices {
        id
        uuid
        issuer
        rfc
        issuedAt
        receptor
        monthAt
        concept
        category
        paymentAt
        ficosecPayment
        investmentOnePayment
        investmentTwoPayment
        implementerPayment
        amount
        percentage
        documents {
          id
          type
          name
          url
        }
      }
      technicalMonitoringReports{
        id
        key
        goal
        appliedAt
        completed
        compliance
        reviewed
        verificationDocuments{
          id
          name
          url
        }
        participants{
          id
          amount
          type
          age
          gender
          preventionLevel
        }
      }
      technicalUpdates{
        id
        correctiveActions
        challenges
        obstacles
        createdAt
      }
      closureDescription
      closureDocument{
        id
        url
        name
      }
      createdAt
    }
  }
`
