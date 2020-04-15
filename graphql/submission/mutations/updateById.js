import { gql } from "apollo-boost"

export const updateById = gql`
  mutation UpdateSubmissionById(
    $id: ID!,
    $implementerId: Int,
    $name: String,
    $type: String,
    $applyingCall: String,
    $region: String,
    $ally: String,
    $implementationPlace: String,
    $responsible: String,
    $startDate: String,
    $endDate: String,
    $strategicAxis: String,
    $preventionLevel: String,
    $scope: String,
    $issueDescription: String,
    $description: String,
    $justification: String,
    $developmentObjective: String,
    $beneficiaries: JSON,
    $generalObjective: String,
    $specificObjectives: JSON,
    $hasConsultant: Boolean,
    $consultant: JSON,
    $developmentObjectiveIndicators: JSON,
    $generalObjectiveIndicators: JSON){
      updateSubmission(
        id: $id,
        implementerId: $implementerId,
        name: $name,
        type: $type,
        applyingCall: $applyingCall,
        region: $region,
        ally: $ally,
        implementationPlace: $implementationPlace,
        responsible: $responsible,
        startDate: $startDate,
        endDate: $endDate,
        strategicAxis: $strategicAxis,
        preventionLevel: $preventionLevel,
        scope: $scope,
        issueDescription: $issueDescription,
        description: $description,
        justification: $justification,
        developmentObjective: $developmentObjective,
        generalObjective: $generalObjective,
        specificObjectives: $specificObjectives,
        beneficiaries: $beneficiaries,
        hasConsultant: $hasConsultant,
        consultant: $consultant,
        developmentObjectiveIndicators: $developmentObjectiveIndicators,
        generalObjectiveIndicators: $generalObjectiveIndicators
      ) {
        id
      }
  }
`
