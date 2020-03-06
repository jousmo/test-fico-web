import { gql } from "apollo-boost";

export const updateById = gql`
  mutation UpdateImplementerById(
    $id: String,
    $type: String!,
    $name: String!,
    $director: String!,
    $rfc: String!,
    $commercialName: String!,
    $commercialAddress: String!,
    $fiscalAddress: String!,
    $phone: String!,
    $proofOfCharitableContributions: String!,
    $legalRepresentative: String!,
    $email: String!,
    $mission: String!,
    $vision: String!,
    $history: String!,
    $institutionExperience: String!,
    $previousSupports: String!,
    $alliances: String!,
    $incomeAndExpenses: String!) {
    updateImplementer(
      id: $id,
      type: $type,
      name: $name,
      director: $name,
      rfc: $rfc,
      commercialName: $commercialName,
      commercialAddress: $commercialAddress,
      fiscalAddress: $fiscalAddress,
      phone: $phone,
      proofOfCharitableContributions: $proofOfCharitableContributions,
      legalRepresentative: $legalRepresentative,
      email: $email,
      mission: $mission,
      vision: $vision,
      history: $history,
      institutionExperience: $institutionExperience,
      previousSupports: $previousSupports,
      alliances: $alliances,
      incomeAndExpenses: $incomeAndExpenses
    )
  }
`
