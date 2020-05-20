import { Modal, Form, Input } from "antd"
import { useForm } from "antd/lib/form/util"
import { useEffect } from "react"

export function CommentModal({
  onCancel,
  onSave,
  revision,
  readOnly,
  fieldName,
  fieldSection,
  ...props
}) {
  const [form] = useForm()

  useEffect(() => {
    /* Here use `revision`, `fieldSection`, `fieldName` to retrieve the saved
    * comments for listing */
  }, [revision, fieldName, fieldSection])

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
    </Modal>
  )
}
