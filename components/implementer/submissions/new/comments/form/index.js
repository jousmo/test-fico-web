import { Button, Form, Input, Row, Col } from "antd"
import { warning } from "../../../../../../helpers"

export function CommentsForm({ onChange, readOnly }) {
  const [form] = Form.useForm()

  const onSubmit = async () => {
    try {
      const comment = await form.getFieldValue("comment")
      if (!comment || !comment.length) {
        return
      }

      onChange(comment)
      form.resetFields()
    } catch (e) {
      warning("Hubo un error...")
      console.error(e)
    }
  }

  return (
    <Form form={form} name="comments-form">
      <Row justify="end">
        <Col span={24}>
          <Form.Item name="comment">
            <Input.TextArea
              disabled={readOnly}
              placeholder="Ingresa tu comentario"
              rows={5} />
          </Form.Item>
        </Col>
        <Button type="primary" onClick={onSubmit}>Agregar comentario</Button>
      </Row>
    </Form>
  )
}
