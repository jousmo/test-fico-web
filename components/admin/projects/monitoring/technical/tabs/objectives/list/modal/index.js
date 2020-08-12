import {
  Divider,
  Form,
  Modal,
  Popover,
  Row
} from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useEffect } from "react"
import { ParticipantsText } from "./participants-text"

export function ObjectivesModal({ edit, ...props }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
    }
  }, [edit])

  const onOk = async () => {
    try {
      const values = await form.getFieldsValue()
    }
    catch(e) {
      console.error(e)
    }
  }

  return (
    <Modal
      cancelText="Cancelar"
      onOk={onOk}
      okText="Guardar"
      {...props}>
      <Form
        form={form}
        name="indicator-form"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Divider plain orientation="left">Resultados</Divider>
          <Divider plain orientation="left">
            Participantes
            &nbsp;
            <Popover content={<ParticipantsText />}>
              <ExclamationCircleOutlined />
            </Popover>
          </Divider>
          <Divider plain orientation="left">Indicador</Divider>
        </Row>
      </Form>
    </Modal>
  )
}
