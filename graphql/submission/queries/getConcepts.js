import { gql } from "apollo-boost"

export const getConcepts = gql`
  query Concepts($id: ID!) {
    Concepts(id: $id) {
      id
      name
      index
      type
      unitCost
      totalUnits
      budgeted
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
          revision
          comment
          type
        }
      }
    }
    SubmissionSimple(id: $id) {
      allies
      status
      endDate
      startDate
    }
  }
`
