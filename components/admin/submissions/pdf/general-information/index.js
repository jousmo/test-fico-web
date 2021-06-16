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
  issueTypes,
  preventionLevelTypes,
  scopeTypes,
  strategicAxisTypes,
  submissionTypes
} from "../../../../../helpers/selectOptions/implementer/submission"
import PDFHeading from "../heading"
import "../style.sass"

export function GeneralInformationPDF() {
  const { data } = useContext(AdminSubmissionContext)

  const submission = data?.Submission

  const donataryDocument = submission?.implementer?.documents?.find(doc => doc.type === "DONATARY")

  return (
    <div className="fico pdf general-information">
      <Descriptions
        bordered
        column={1}
        title={<PDFHeading title="Información General" />}>
        <Descriptions.Item label="Implementadora">
          {submission?.implementer?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Domicilio">
          {submission?.implementer?.fiscalAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Teléfono">
          {submission?.implementer?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Correo electrónico">
          {submission?.implementer?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Representante(s) legal(es)">
          {submission?.implementer?.legalRepresentative}
        </Descriptions.Item>
        <Descriptions.Item label="Director">
          {submission?.implementer?.director}
        </Descriptions.Item>
        <Descriptions.Item label="Oficio de donataria Autorizada">
          {donataryDocument && (
            <a href={donataryDocument.url} target="_blank">{donataryDocument.name}</a>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Misión">
          {submission?.implementer?.mission}
        </Descriptions.Item>
        <Descriptions.Item label="Visión">
          {submission?.implementer?.vision}
        </Descriptions.Item>
        <Descriptions.Item label="Historia">
          {submission?.implementer?.history}
        </Descriptions.Item>
        <Descriptions.Item label="Experiencia institucional">
          {submission?.implementer?.institutionalExperience}
        </Descriptions.Item>
        <Descriptions.Item label="Apoyos anteriores">
          {submission?.implementer?.previousSupports}
        </Descriptions.Item>
        <Descriptions.Item label="Alianzas">
          {submission?.implementer?.alliances}
        </Descriptions.Item>
        <Descriptions.Item label="Ingresos / Egresos en los ultimos dos años">
          {submission?.implementer?.incomesAndExpenses}
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
          {getReadableValue(strategicAxisTypes, submission?.strategicAxis)}
        </Descriptions.Item>
        <Descriptions.Item label="Nivel de prevención que atiende">
          {submission?.preventionLevel?.map(el =>
            getReadableValue(preventionLevelTypes, el)
          ).join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Ámbitos de intervención del proyecto">
          {submission?.scope?.map(el =>
            getReadableValue(scopeTypes, el)
          ).join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="Problemática a tratar">
          {getReadableValue(issueTypes, submission?.issueDescription)}
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
        { submission?.specificObjectives?.sort((a, b) => a.orderIndex - b.orderIndex).map((objective, index) =>
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
            Sexo:
            &nbsp;
            {beneficiary.gender?.map(el =>
              getReadableValue(genderTypes, el)
            ).join(", ")}
            <br />
            Nivel educativo:
            &nbsp;
            {beneficiary.educationLevel?.map(el =>
              getReadableValue(educationLevelTypes, el)
            ).join(", ")}
            <br />
            Edad:
            &nbsp;
            {beneficiary.age?.map(el =>
              getReadableValue(ageRanges, el)
            ).join(", ")}
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
