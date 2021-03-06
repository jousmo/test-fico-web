import { gql } from "apollo-boost"

export const getGeneralInfo = gql`
  query GeneralInformation($id: ID!) {
    GeneralInformation(id: $id) {
      id
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
      state
      status
      statusChangedAt
      deadline
      signedContractAt
      agreementNumber
      technicalOpinion
      budgeted
      evidenced
      difference
      createdAt
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
          id
          fieldName
          createdAt
          reviewed
          revision
          comment
          type
        }
      }
      specificObjectives {
        id
        description
        orderIndex
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
      documents {
        id
        name
        url
        type
      }
    }
  }
`
