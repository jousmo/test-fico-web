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
        description
        indicators {
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
        }
        activities {
          title
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
        }
      }
      beneficiaries {
        description
        number
        gender
        educationLevel
        age
        preventionLevel
      }
      consultants {
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
          name
          date
          amount
        }
      }
      developmentObjectiveIndicators {
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
      }
      generalObjectiveIndicators {
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
      }
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
        humanResource {
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
        }
      }
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
        verificationDocument{
          id
          name
          url
        }
        participants{
          amount
          type
          age
          gender
          preventionLevel
        }
      }
      technicalUpdates{
        correctiveActions
        challenges
        obstacles
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
