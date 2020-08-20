import { Col, Form, Input, Modal, Row } from "antd"
import { useEffect } from "react"

export function ObstaclesModal({ edit, onCancel, onSave, ...props }){
  const [form] = Form.useForm()

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
    }
  }, [edit])

  const onOk = async () => {
    try {
      const values = await form.getFieldsValue()

      if(edit){
        values.index = edit.index
      }
      onSave(values)
      form.resetFields()
    }
    catch(e) {
      console.error(e)
    }
  }

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  return (
    <Modal
      title="Actualización"
      onOk={onOk}
      onCancel={onCancelModal}
      width={600}
      okText="Guardar actualización"
      cancelText="Cancelar"
      {...props}>
      <Form
        form={form}
        name="obstacles-form"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Col span={24}>
            Actualiza los campos según lo que se requiere para la proxima etapa
            del proyecto
          </Col>
          <Col span={24}>
            <Form.Item
              name="correctiveActions"
              id="correctiveActions"
              label="Acciones correctivas"
              style={{display: "inline"}}>
              <Input.TextArea
                placeholder="Describe las acciones correctivas"
                rows={5} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="challenges"
              id="challenges"
              label="Retos"
              style={{display: "inline"}}>
              <Input.TextArea
                placeholder="Describe los retos a los cuales te enfrentarás"
                rows={5} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="obstacles"
              id="obstacles"
              label="Obstáculos"
              style={{display: "inline"}}>
              <Input.TextArea
                placeholder="Describe los obstaculos que te impedirían lograr
                tus objetivos de proyecto"
                rows={5} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
