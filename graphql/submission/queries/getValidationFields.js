import { gql } from "apollo-boost"

export const getValidationFields = gql`
  query SubmissionValidation($id: ID!) {
    SubmissionValidation(id: $id) {
      consultants {
        documents {
          name
        }
      }
      concepts {
        humanResource {
          documents {
            name
          }
        }
      }
      developmentObjectiveIndicators {
        title
      }
      generalObjectiveIndicators {
        title
      }
    }
  }
`
