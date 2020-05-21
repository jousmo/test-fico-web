import { Modal, Form, Input } from "antd"
import { useForm } from "antd/lib/form/util"
import { CommentListing } from "./list"

export function CommentModal({
  onCancel,
  onSave,
  revision,
  readOnly,
  comments,
  fieldName,
  fieldSection,
  ...props
}) {
  const [form] = useForm()

  const onOk = async () => {
    try {
      const values = await form.getFieldsValue()
      onSave(values)
      form.resetFields()
    }
    catch(e) {
      console.error(e)
    }
  }

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
      okText="Guardar"
      onCancel={onCancel}
      cancelText="Cancelar"
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
      <CommentListing comments={comments} />
    </Modal>
  )
}
