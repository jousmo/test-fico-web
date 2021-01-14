import { useContext, useState } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { Button, Col, Descriptions, Modal, message } from "antd"
import Link from "next/link"
import {
  EyeOutlined,
  CloseOutlined,
  CheckOutlined,
  RetweetOutlined,
  BarChartOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons"
import { BreadcrumbHeading, ConfirmButton } from "../../../../shared"
import { ApprovalModal } from "./approval-modal"
import SummaryBody from "../../../../shared/submission-summary-body"
import { submissionStatusOptions } from "../../../../../helpers/selectOptions/shared/submission-status"
import moment from "moment"
import "./style.sass"

export function SubmissionSummary() {
  const {
    loading,
    error,
    save,
    data
  } = useContext(AdminSubmissionContext)

  const status = data?.Submission?.status
  const statusIndex = submissionStatusOptions.findIndex(e => e.value === status)
  const findDocument = data?.Submission?.documents.filter(document => document.type === "AGREEMENT")

  const [state, setState] = useState({
    isModalOpen: false
  })

  const onClickApprove = () => {
    setState({ isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false })
  }

  const showMonitoringConfirm = () => {
    Modal.confirm({
      title: `¿Quieres aprobar la solicitud para monitoreo?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        save({ status: "AWAITING_INFO", state: "PROJECT", statusChangedAt: moment().format() })
      }
    });
  }

  const onSave = value => {
    save({ status: "ON_COUNCIL", statusChangedAt: moment().format(), ...value })
    onCancel()
  }

  const onRequestReview = () => {
    if (statusIndex === 9) {
      message.warning("La solicitud se encuentra en la revisión final")
      return
    }

    if (status.includes("REVIEW")){
      save({ status: submissionStatusOptions[statusIndex + 1].value, statusChangedAt: moment().format() })
    } else {
      message.warning("La solicitud ya se encuentra en revisión")
    }
  }

  let headingButtons = null
  if (statusIndex >= 0 && statusIndex <= 9) {
    headingButtons = (
      <Col>
        <ConfirmButton
          icon={<RetweetOutlined />}
          confirmText="Solicitar revisión"
          onClick={onRequestReview} />
        <ConfirmButton
          icon={<CloseOutlined />}
          confirmText="Rechazar solicitud" />
        <Button
          ghost
          shape="circle"
          icon={<CheckOutlined />}
          onClick={onClickApprove} />
      </Col>
    )
  } else if (status === "ON_AGREEMENT") {
    headingButtons = (
      <Col>
        <Button
          type="ficosuccess"
          size="large"
          icon={<BarChartOutlined />} disabled={!findDocument.length}
          onClick={showMonitoringConfirm}>
          Aprobar para monitoreo
        </Button>
      </Col>
    )
  }

  const goToSubmission = (
    <Descriptions.Item>
      <Link href={`/admin/submissions/${data?.Submission.id}/review/general-information`}>
        <a><EyeOutlined /> Ver la solicitud</a>
      </Link>
    </Descriptions.Item>
  )

  return (
    <div className="fico submission summary">
      <ApprovalModal
        onCancel={onCancel}
        onSave={onSave}
        visible={state.isModalOpen} />
      <BreadcrumbHeading
        home={{ label: "Solicitudes", url: "/admin/submissions" }}
        itemsList={[
          {
            label: data?.Submission?.name,
            url: `/admin/submissions/${data?.Submission?.id}`
          }
        ]}
        extra={headingButtons} />
      <SummaryBody
        admin
        data={data?.Submission}
        error={error}
        extra={goToSubmission}
        isLoading={loading} />
    </div>
  )
}
