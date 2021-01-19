import { message } from "antd"
import { submissionStatusOptions } from "../../../../../helpers/selectOptions/shared/submission-status"
import moment from "moment"

export const requiredFields = [
  "scope",
  "beneficiaries",
  "concepts",
  "description",
  "strategicAxis",
  "endDate",
  "startDate",
  "developmentObjectiveIndicators",
  "generalObjectiveIndicators",
  "justification",
  "implementationPlace",
  "township",
  "preventionLevel",
  "name",
  "developmentObjective",
  "generalObjective",
  "specificObjectives",
  "issueDescription",
  "region",
  "responsible",
  "type"
]

export const fieldsLabels = {
  scope: "Ámbitos de intervención",
  beneficiaries: "Beneficiarios",
  concepts: "Conceptos",
  description: "Descripción",
  strategicAxis: "Eje estratégico",
  endDate: "Fecha de conclusión",
  startDate: "Fecha de inicio",
  developmentObjectiveIndicators: "Indicadores de desarrollo",
  generalObjectiveIndicators: "Indicadores generales",
  justification: "Justificación",
  implementationPlace: "Lugar de implementación",
  township: "Municipio",
  preventionLevel: "Nivel de prevención",
  name: "Nombre",
  developmentObjective: "Objetivo de desarrollo",
  generalObjective: "Objetivo general",
  specificObjectives: "Objetivos específicos",
  issueDescription: "Problemática a tratar",
  region: "Región",
  responsible: "Responsable del proyecto",
  type: "Tipo de solicitud"
}

export const validate = (submission, index, save, setState) => {
  let isFinished = true
  const missingFields = []

  Object.keys(submission)?.forEach(key => {
    const value = submission[key]
    if (requiredFields.includes(key) && (!value || value.length === 0)) {
      isFinished = false
      missingFields.push(fieldsLabels[key])
    }

    if (key === "consultants" && value.length !== 0) {
      let missingDocuments = false
      value.forEach(consultant => {
        if (consultant.documents.length === 0) {
          missingDocuments = true
        }
      })
      if (missingDocuments) {
        missingFields.push("Documentos de consultor")
      }
    }

    if (key === "concepts") {
      let missingDocuments = false
      value.forEach(concept => {
        if (!concept.humanResource.length) {
          return
        }

        if (concept.humanResource[0].documents.length === 0) {
          missingDocuments = true
        }
      })

      if (missingDocuments) {
        missingFields.push("Documentos de recursos humanos")
      }
    }
  })
  if (!isFinished) {
    setState(missingFields)
    message.warning(`Faltan campos por llenar en la solicitud`)
    return
  }
  save({ status: submissionStatusOptions[index + 1].value, statusChangedAt: moment().format() })
}
