import { gql } from "apollo-boost"

export const getInvoices = gql`
  query Invoices($id: ID!) {
    Submission:Invoices(id: $id) {
      status
      endDate
      budgeted
      startDate
      evidenced
      difference
      concepts {
        id
        type
        name
        index
        region
        budgeted
        unitCost
        totalUnits
        measurementUnit
        monthlyDistribution,
        investmentDistribution {
          id
          name
          type
          percentage
        }
      }
      invoices {
        id
        uuid
        issuer
        rfc
        issuedAt
        receptor
        monthAt
        reviewed
        concept
        category
        paymentAt
        ficosecPayment
        investmentOnePayment
        investmentTwoPayment
        implementerPayment
        amount
        percentage
        typeRH
        documents {
          id
          type
          name
          url
        }
      }
      documents {
        id
        type
        name
        url
      }
    }
  }
`
