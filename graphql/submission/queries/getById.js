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
          specificObjective {
            id
          }
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
    }
  }
`
