import { Descriptions, Typography } from "antd"
import { useContext } from "react"
import moment from "moment"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { getReadableValue } from "../../../../../helpers/selectOptions"
import {
  ageRanges,
  educationLevelTypes,
  genderTypes,
  preventionLevelTypes,
  scopeTypes,
  submissionTypes
} from "../../../../../helpers/selectOptions/implementer/submission"
import PDFHeading from "../heading"
import "../style.sass"

export function GeneralInformationPDF() {
  const {
    implementerResult,
    submissionResult
  } = useContext(AdminSubmissionContext)

  const implementer = implementerResult?.data?.Implementer
  const submission = submissionResult?.data?.Submission

  return (
    <div className="fico pdf general-information">
      <Descriptions
        bordered
        column={1}
        title={<PDFHeading title="Información General" />}>
        <Descriptions.Item label="Implementadora">
          {implementer?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Domicilio">
          {implementer?.fiscalAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Teléfono">
          {implementer?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Correo electrónico">
          {implementer?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Representante(s) legal(es)">
          {implementer?.legalRepresentative}
        </Descriptions.Item>
        <Descriptions.Item label="Director">
          {implementer?.director}
        </Descriptions.Item>
        <Descriptions.Item label="Oficio de donataria Autorizada">
          {implementer?.proofOfCharitableContributions}
        </Descriptions.Item>
        <Descriptions.Item label="Misión">
          {implementer?.mission}
        </Descriptions.Item>
        <Descriptions.Item label="Visión">
          {implementer?.vision}
        </Descriptions.Item>
        <Descriptions.Item label="Historia">
          {implementer?.history}
        </Descriptions.Item>
        <Descriptions.Item label="Experiencia institucional">
          {implementer?.institutionalExperience}
        </Descriptions.Item>
        <Descriptions.Item label="Apoyos anteriores">
          {implementer?.previousSupports}
        </Descriptions.Item>
        <Descriptions.Item label="Alianzas">
          {implementer?.alliances}
        </Descriptions.Item>
        <Descriptions.Item label="Ingresos / Egresos en los ultimos dos años">
          {implementer?.incomesAndExpenses}
        </Descriptions.Item>
      </Descriptions>
      <Typography.Title level={3}>Proyecto</Typography.Title>
      <Descriptions
        bordered
        column={1}>
        <Descriptions.Item label="Nombre del proyecto">
          {submission?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Región">
          {submission?.region}
        </Descriptions.Item>
        <Descriptions.Item label="Lugar de implementación">
          {submission?.implementationPlace}
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de inicio">
          {moment(submission?.startDate).format("DD/MM/YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de conclusión">
          {moment(submission?.endDate).format("DD/MM/YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Responsable del proyecto">
          {submission?.responsible}
        </Descriptions.Item>
        <Descriptions.Item label="Tipo de solicitud">
          {getReadableValue(submissionTypes, submission?.type)}
        </Descriptions.Item>
        <Descriptions.Item label="Convocatoria a la que aplica">
          {submission?.applyingCall}
        </Descriptions.Item>
        <Descriptions.Item label="Eje estratégico Ficosec">
          {submission?.strategicAxis}
        </Descriptions.Item>
        <Descriptions.Item label="Nivel de prevención que atiende">
          {getReadableValue(preventionLevelTypes, submission?.preventionLevel)}
        </Descriptions.Item>
        <Descriptions.Item label="Ámbitos de intervención del proyecto">
          {getReadableValue(scopeTypes, submission?.scope)}
        </Descriptions.Item>
        <Descriptions.Item label="Problemática a tratar">
          {submission?.issueDescription}
        </Descriptions.Item>
        <Descriptions.Item label="Justificación">
          {submission?.justification}
        </Descriptions.Item>
        <Descriptions.Item label="Breve descripción del proyecto">
          {submission?.description}
        </Descriptions.Item>
        <Descriptions.Item label="Objetivo desarrollo / fin">
          {submission?.developmentObjective}
        </Descriptions.Item>
        <Descriptions.Item label="Objetivo general / propósito">
          {submission?.generalObjective}
        </Descriptions.Item>
        { submission?.specificObjectives?.map((objective, index) =>
          <Descriptions.Item
            key={index}
            label={`Objetivo específico ${index + 1}`}>
            {objective.description}
          </Descriptions.Item>
        )}
        { submission?.beneficiaries?.map((beneficiary, index) =>
          <Descriptions.Item
            key={index}
            label={`Perfil del Beneficiario ${index + 1}`}>
            Descripción: {beneficiary.description}
            <br />
            Número de beneficiarios: {beneficiary.number}
            <br />
            Sexo: {getReadableValue(genderTypes, beneficiary.gender)}
            <br />
            Nivel educativo:
            &nbsp;
            {getReadableValue(educationLevelTypes, beneficiary.educationLevel)}
            <br />
            Edad:
            &nbsp;
            {getReadableValue(ageRanges, beneficiary.age)}
            <br />
            Nivel de prevención:
            &nbsp;
            {getReadableValue(preventionLevelTypes, beneficiary.preventionLevel)}
          </Descriptions.Item>
        )}
      </Descriptions>
    </div>
  )
}
