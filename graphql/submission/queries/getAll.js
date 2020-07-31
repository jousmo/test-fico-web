import { gql } from "apollo-boost"

export const getAll = gql`
  query getSubmissions(
    $state: String!,
    $status: String
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
          generalObjectiveSubmission {
            id
          }
          developmentObjectiveSubmission {
            id
          }
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
      }
      generalObjectiveIndicators {
        id
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
    }
  }
`
