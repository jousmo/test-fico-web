import { useContext, useState } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import { Button, Col, Descriptions, Modal } from "antd"
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
import "./style.sass"

export function SubmissionSummary() {
  const {
    saveApproveMonitoring,
    loading,
    error,
    data
  } = useContext(AdminSubmissionContext)

  const onAgreement = data?.Submission?.status === "ON_AGREEMENT"
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
        saveApproveMonitoring()
      }
    });
  }

  const onSave = (values) => {
    /* TODO: Change status of submission */
    onCancel()
  }

  const onRequestReview = () => {
    /* TODO: Request review to implementer */
  }

  const headingButtons = (
    !onAgreement ? (
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
    ) : (
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
  )

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
        data={data?.Submission}
        error={error}
        extra={goToSubmission}
        isLoading={loading} />
    </div>
  )
}
