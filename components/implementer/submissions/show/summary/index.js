import { useContext } from "react"
import { useRouter } from "next/router"
import {
  ImplementerSubmissionContext
} from "../../../../../contexts/implementer/submissions/show"
import { Button, Popconfirm, message } from "antd"
import { RightCircleOutlined, SendOutlined } from "@ant-design/icons"
import { BreadcrumbHeading } from "../../../../shared/breadcrum-heading"
import SummaryBody from "../../../../shared/submission-summary-body"
import "./style.sass"
import { submissionStatusOptions } from "../../../../../helpers/selectOptions/shared/submission-status"
import { validate } from "./helpers"

export function SubmissionSummary({ setState }) {
  const router = useRouter()
  const {
    validationData,
    loading,
    error,
    data,
    save
  } = useContext(ImplementerSubmissionContext)

  const submission = data?.SubmissionDetails
  const validation = validationData?.SubmissionValidation

  const editRoute = `/implementer/submissions/${submission?.id}/edit/general-information`
  const status = submission?.status
  const statusIndex = submissionStatusOptions?.findIndex(e => e.value === status)

  const onReview = () => {
    if (status.includes("REVIEW")){
      message.warning("La solicitud ya se encuentra en revisión")
    } else {
      const validationFields = { ...submission, ...validation }
      validate(validationFields, statusIndex, save, setState)
    }
  }

  return (
    <div className="fico submission summary implementer">
      <BreadcrumbHeading
        home={{ label: "Solicitudes", url: "/implementer/submissions" }}
        itemsList={[
          {
            label: submission?.name,
            url: `/implementer/submissions/${submission?.id}`
          }
        ]} />
      <SummaryBody
        data={submission}
        error={error}
        isLoading={loading} />
      <div className="btn-container">
        <Button
          loading={loading}
          icon={<RightCircleOutlined />}
          onClick={() => router.push(editRoute)}
          className="implementer continue-submission">
          {statusIndex > 9 ? "Ver" : "Continuar"} solicitud
        </Button>
        {statusIndex < 9 && (
          <Popconfirm
            title="¿Enviar solicitud a revisión?"
            onConfirm={onReview}
            okText="Aceptar"
            cancelText="Cancelar">
            <Button
              loading={loading}
              icon={<SendOutlined />}
              className="implementer send-submission">
              Enviar solicitud
            </Button>
          </Popconfirm>
        )}
      </div>
    </div>
  )
}
