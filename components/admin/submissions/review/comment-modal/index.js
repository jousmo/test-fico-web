import { Modal, Form, Input } from "antd"
import { useForm } from "antd/lib/form/util"
import { CommentListing } from "./list"
import { useEffect, useState } from "react"

export function CommentModal({
  onCancel,
  onSave,
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
      setState({ comments: onSave(values) })
      form.resetFields()
    }
    catch(e) {
      console.error(e)
    }
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
      <CommentListing comments={state.comments} />
    </Modal>
  )
}
