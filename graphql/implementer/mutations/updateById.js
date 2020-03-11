import { gql } from "apollo-boost";

export const updateById = gql`
  mutation UpdateImplementerById(
    $id: ID!,
    $type: String,
    $name: String,
    $director: String,
    $rfc: String,
    $commercialName: String,
    $commercialAddress: String,
    $fiscalAddress: String,
    $phone: String,
    $proofOfCharitableContributions: String,
    $legalRepresentative: String,
    $email: String,
    $mission: String,
    $vision: String,
    $history: String,
    $institutionalExperience: String,
    $previousSupports: String,
    $alliances: String,
    $incomesAndExpenses: String){
      updateImplementer(
        id: $id,
        type: $type,
        name: $name,
        director: $director,
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
        institutionalExperience: $institutionalExperience,
        previousSupports: $previousSupports,
        alliances: $alliances,
        incomesAndExpenses: $incomesAndExpenses
      ) {
        id
      }
  }
`
