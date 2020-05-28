import { Modal, Form, Input } from "antd"
import { useForm } from "antd/lib/form/util"
import { CommentListing } from "./list"
import { useEffect, useState } from "react"

export function CommentModal({
  onCancel,
  onSave,
  onDelete,
  revision,
  readOnly,
  getComments,
  fieldName,
  fieldSection,
  ...props
}) {
  const [state, setState] = useState({ comments: [] })
  const [form] = useForm()

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
    onDelete(comment, index)
  }

  useEffect(() => {
    setState({ comments: getComments() })
  }, [fieldName])

  if (readOnly){
    return (
      <Modal
        title="Comentarios para revisión"
        onCancel={onCancel}
        footer={false}
        width={800}
        {...props}>
        <CommentListing comments={state.comments} />
      </Modal>
    )
  }

  return (
    <Modal
      title="Comentarios para revisión"
      onOk={onOk}
      okText="Agregar"
      onCancel={onCancel}
      cancelText="Cerrar"
      width={800}
      zIndex={1500}
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
        revision={revision} />
    </Modal>
  )
}
