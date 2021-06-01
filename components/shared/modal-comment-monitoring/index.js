import { Modal, Form, Input } from "antd"
import { CommentMonitoringListing } from "../comment-monitoring-listing"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { submission } from "../../../graphql"
import { useCallback, useEffect, useState } from "react"
import { Visibility } from "../visibility"
import { loadingAlert, success, warning, withApollo } from "../../../helpers"
import { apolloError } from "../../../helpers/bugsnag/notify"
import "./style.sass"

function ModalCommentMonitoring({ client, data, onCancel, readOnly, ...props }) {
  const [form] = Form.useForm()
  const [state, setState] = useState({
    loading: true,
    comments: []
  })

  const query = data?.type === "INVOICE"
    ? submission.queries.getCommentsFinancial
    : data?.type === "OBJECTIVE"
      ? submission.queries.getCommentsTechnical
      : submission.queries.getCommentsTechnicalActivity

  const mutation = data?.type === "INVOICE"
    ? submission.mutations.createCommentInvoice
    : data?.type === "OBJECTIVE"
      ? submission.mutations.createCommentTechnical
      : submission.mutations.createCommentTechnicalActivity

  const variables = data?.type === "INVOICE"
    ? { monitoringInvoice: data?.id }
    : data?.type === "OBJECTIVE"
      ? { monitoringTechnical: data?.id }
      : { monitoringTechnicalActivity: data?.id }

  const [deleteMonitoringComment] = useMutation(
    submission.mutations.deleteMonitoringComment, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query,
          variables
        }
      ]
    }
  )

  const { loading, error, data: result  } = useQuery(query, {
    client: client,
    variables
  })

  const [createComment] = useMutation(
    mutation, {
      client: client,
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query,
          variables
        }
      ]
    }
  )

  useEffect(() => {
    if (!loading) {
      setState({
        loading: false,
        comments: result?.InvoiceMonitoringComments
          || result?.TechnicalMonitoringComments
          || result?.TechnicalMonitoringActivityComments
      })
    }
  }, [loading, result])

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  const onOk = useCallback(async () => {
    if (readOnly) return
    const saving = loadingAlert()
    try {
      const values = await form.getFieldsValue()

      if (values.comment === undefined || values.comment.trim() === ""){
        return
      }

      const variables = data?.type === "INVOICE"
        ? { monitoringInvoice: data?.id, data: values }
        : data?.type === "OBJECTIVE"
          ? { monitoringTechnical: data?.id, data: values }
          : { monitoringTechnicalActivity: data?.id, data: values }

      await createComment({ variables })
      success()
      form.resetFields()
    } catch (e) {
      warning()
      apolloError(e)
      console.error(e)
    }
    saving()
  }, [createComment])

  const onDeleteComment = useCallback(async id => {
    if (readOnly) return
    const saving = loadingAlert("Eliminando", 0)
    try {
      await deleteMonitoringComment({ variables: { id } })
      success("Eliminado correctamente")
    } catch (e) {
      warning()
      apolloError(e)
      console.error(e)
    }
    saving()
  }, [deleteMonitoringComment])

  return (
    <Modal
      destroyOnClose
      title={`Comentarios ${data?.title}`}
      onOk={onOk}
      okText="Agregar"
      onCancel={onCancelModal}
      cancelText="Cerrar"
      width={800}
      className="comment-modal-form"
      maskClosable={false}
      okButtonProps={{ disabled: readOnly }}
      {...props}>
      <Visibility visible={!readOnly}>
        <Form
          form={form}
          layout="vertical">
          <Form.Item
            name="comment">
            <Input.TextArea
              disabled={readOnly}
              id="comment"
              placeholder="Describe tu comentario" />
          </Form.Item>
        </Form>
      </Visibility>

      <CommentMonitoringListing
        readOnly={readOnly}
        loading={state.loading}
        comments={state.comments}
        onDeleteComment={onDeleteComment} />
    </Modal>
  )
}

export default withApollo(ModalCommentMonitoring)
