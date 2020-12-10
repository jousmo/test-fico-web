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
import moment from "moment"
import { requiredFields } from "./helpers"

export function SubmissionSummary() {
  const router = useRouter()
  const {
    loading,
    error,
    data,
    save
  } = useContext(ImplementerSubmissionContext)

  const editRoute = `/implementer/submissions/${data?.Submission?.id}/edit/general-information`
  const status = data?.Submission?.status
  const statusIndex = submissionStatusOptions.findIndex(e => e.value === status)

  const onReview = () => {
    if (status.includes("REVIEW")){
      message.warning("La solicitud ya se encuentra en revisión")
    } else {
      let isFinished = true
      Object.keys(data?.Submission).forEach(key => {
        const value = data?.Submission[key]
        if (requiredFields.includes(key) && (!value || value.length === 0)) {
          isFinished = false
        }
      })
      if (!isFinished) {
        message.warning("Faltan campos por llenar en la solicitud")
        return
      }
      save({ status: submissionStatusOptions[statusIndex + 1].value, statusChangedAt: moment().format() })
    }
  }

  return (
    <div className="fico submission summary implementer">
      <BreadcrumbHeading
        home={{ label: "Solicitudes", url: "/implementer/submissions" }}
        itemsList={[
          {
            label: data?.Submission?.name,
            url: `/implementer/submissions/${data?.Submission?.id}`
          }
        ]} />
      <SummaryBody
        data={data?.Submission}
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
            title="¿Enviar solocitud a revisión?"
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
