import { Modal, Form, Input } from "antd"
import { CommentMonitoringListing } from "../comment-monitoring-listing"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { submission } from "../../../graphql/submission"
import { withApollo } from "../../../helpers/withApollo"
import { useCallback, useEffect, useState } from "react"
import { loadingAlert, success, warning } from "../../../helpers/alert"
import "./style.sass"

function ModalCommentMonitoring({ client, data, onCancel, ...props }) {
  const [form] = Form.useForm()
  const [state, setState] = useState({
    loading: true,
    comments: []
  })

  const query = data?.type === "INVOICE"
    ? submission.queries.getCommentsFinancial
    : submission.queries.getCommentsTechnical

  const mutation = data?.type === "INVOICE"
    ? submission.mutations.createCommentInvoice
    : submission.mutations.createCommentTechnical

  const variables = data?.type === "INVOICE" ? { monitoringInvoice: data?.id } : { monitoringTechnical: data?.id }

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
        comments: result?.InvoiceMonitoringComments || result?.TechnicalMonitoringComments
      })
    }
  }, [loading, result])

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  const onOk = useCallback(async () => {
    try {
      const saving = loadingAlert()
      const values = await form.getFieldsValue()

      if (values.comment === undefined || values.comment.trim() === ""){
        return
      }

      const variables = data?.type === "INVOICE"
        ? { monitoringInvoice: data?.id, data: values }
        : { monitoringTechnical: data?.id, data: values }


        debugger
      await createComment({ variables })
      saving()
      success()
      form.resetFields()
    } catch (e) {
      warning()
      console.error(e)
    }
  }, [createComment])

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
      {...props}>
      <Form
        form={form}
        layout="vertical">
        <Form.Item
          name="comment">
          <Input.TextArea
            id="comment"
            placeholder="Describe tu comentario" />
        </Form.Item>
      </Form>

      <CommentMonitoringListing loading={state.loading} comments={state.comments} />
    </Modal>
  )
}

export default withApollo(ModalCommentMonitoring)
