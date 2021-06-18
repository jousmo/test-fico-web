import Moment from "moment"
import { getReadableValue, implementer } from "../../../../../../helpers/selectOptions"

const {
  ageRanges, genderTypes, issueTypes, preventionLevelTypes,
  educationLevelTypes, scopeTypes, submissionTypes, strategicAxisTypes
} = implementer.submission

export const GENERAL_INFO = [
  { label: "Proyecto", key: "name" },
  { label: "Región", key: "region" },
  { label: "Lugar de implementación", key: "implementationPlace" },
  { label: "Fecha de inicio", key: "startDate", getValue: value => Moment(value).format("DD/MM/YYYY") },
  { label: "Fecha de conclusión", key: "endDate", getValue: value => Moment(value).format("DD/MM/YYYY") },
  { label: "Responsable del proyecto", key: "responsible" },
  { label: "Tipo de solicitud", key: "type", getValue: value => getReadableValue(submissionTypes, value) },
  {
    label: "Eje estratégico Ficosec",
    key: "strategicAxis",
    getValue: value => getReadableValue(strategicAxisTypes, value)
  },
  {
    label: "Nivel de prevención que atiende",
    key: "preventionLevel",
    getValue: value => value?.map(el => getReadableValue(preventionLevelTypes, el)).join(", ")
  },
  {
    label: "Ámbitos de intervención del proyecto",
    key: "scope",
    getValue: value => value?.map(el => getReadableValue(scopeTypes, el)).join(", ")
  },
  {
    label: "Problemática a tratar",
    key: "issueDescription",
    getValue: value => getReadableValue(issueTypes, value)
  },
  { label: "Justificación", key: "justification" },
  { label: "Breve descripción del proyecto", key: "description" },
  { label: "Objetivo desarrollo / fin", key: "developmentObjective" },
  { label: "Objetivo general / propósito", key: "generalObjective" }
]

export const IMPLEMENTER = [
  { label: "Implementadora", key: "name" },
  { label: "Domicilio", key: "commercialAddress" },
  { label: "Teléfono", key: "phone" },
  { label: "Correo electrónico", key: "email" },
  { label: "Representante(s) legal(es)", key: "legalRepresentative" },
  { label: "Director", key: "director" },
  { label: "Misión", key: "mission" },
  { label: "Visión", key: "vision" },
  { label: "Experiencia institucional", key: "institutionalExperience" },
  { label: "Apoyos anteriores", key: "previousSupports" }
]

export const BENEFICIARIES = [
  { key: "description", getValue: value => `Descripción: ${value || ""}` },
  { key: "number", getValue: value => `Número de beneficiarios: ${value || 0}` },
  { key: "gender", getValue: value => `Sexo: ${value?.map(el => getReadableValue(genderTypes, el))?.join(", ")}` },
  {
    key: "educationLevel",
    getValue: value =>
      `Nivel educativo: ${value?.map(el => getReadableValue(educationLevelTypes, el))?.join(", ")}`
  },
  { key: "age", getValue: value => `Edad: ${value?.map(el => getReadableValue(ageRanges, el))?.join(", ")}` },
  { key: "preventionLevel", getValue: value => `Nivel de prevención ${getReadableValue(preventionLevelTypes, value)}` }
]
