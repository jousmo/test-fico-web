import { useContext } from "react"
import { useRouter } from "next/router"
import {
  ImplementerSubmissionContext
} from "../../../../../contexts/implementer/submissions/show"
import { Button } from "antd"
import { RightCircleOutlined, SendOutlined } from "@ant-design/icons"
import { BreadcrumbHeading } from "../../../../shared/breadcrum-heading"
import SummaryBody from "../../../../shared/submission-summary-body"
import "./style.sass"

export function SubmissionSummary() {
  const router = useRouter()
  const {
    loading,
    error,
    data
  } = useContext(ImplementerSubmissionContext)

  const editRoute = `/implementer/submissions/${data?.Submission?.id}/edit/general-information`

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
          icon={<RightCircleOutlined />}
          onClick={() => router.push(editRoute)}
          className="implementer continue-submission">
          Continuar solicitud
        </Button>
        <Button
          icon={<SendOutlined />}
          className="implementer send-submission">
          Enviar solicitud
        </Button>
      </div>
    </div>
  )
}
