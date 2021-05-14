import { Modal, Form, Input } from "antd"
import { CommentListing } from "./list"
import { useEffect, useState } from "react"

export function CommentModal({
  onCancel,
  onSave,
  onDelete,
  revision,
  readOnly,
  getComments,
  onCommentsReview,
  field,
  ...props
}) {
  const [state, setState] = useState({ comments: [] })
  const [reviewed, setReviewed] = useState([])
  const [form] = Form.useForm()

  const onOk = async () => {
    try {
      const values = await form.getFieldsValue()

      if (values.comment === undefined || values.comment.trim() === ""){
        return
      }

      setState({ comments: onSave(values) })
      form.resetFields()
    }
    catch(e) {
      console.error(e)
    }
  }

  const onDeleteComment = (comment, index) => {
    const newComments = state.comments?.filter((e, i) => i !== index)
    setState({...state, comments: newComments})
    onDelete(comment)
  }

  useEffect(() => {
    setState({ comments: getComments() })
  }, [field])

  const closeModal = () => {
    if (reviewed.length) {
      onCommentsReview && onCommentsReview(reviewed)
      setReviewed([])
    }
    onCancel()
  }

  if (readOnly){
    return (
      <Modal
        title="Comentarios para revisión"
        onCancel={onCancel}
        footer={false}
        width={800}
        maskClosable={false}
        {...props}>
        <CommentListing
          comments={state.comments}
          readOnly={readOnly} />
      </Modal>
    )
  }

  return (
    <Modal
      title="Comentarios para revisión"
      onOk={onOk}
      okText="Agregar"
      onCancel={closeModal}
      cancelText="Cerrar"
      width={800}
      zIndex={1020}
      maskClosable={false}
      {...props}>
      { !readOnly && (
        <Form
          form={form}
          layout="vertical">
          <Form.Item
            name="comment">
            <Input.TextArea
              id="comment"
              placeholder="Describe los puntos a corregir" />
          </Form.Item>
        </Form>
      )}
      <CommentListing
        comments={state.comments}
        onDelete={onDeleteComment}
        readOnly={readOnly}
        revision={revision}
        onReview={comment =>
          setReviewed(reviewed => [...reviewed, comment])
        }
        reviewed={reviewed} />
    </Modal>
  )
}
