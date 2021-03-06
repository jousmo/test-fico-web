import { Modal, Form } from "antd"
import { warning } from "../../../../../../../../helpers"
import { CensusForm } from "../../../../../../../shared"
import { useEffect } from "react"
import { merge } from "lodash"

export function ModalAssistants({ onSave, onCancel, edit, ...props }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if(edit) {
      form.setFieldsValue(edit)
    }
  }, [edit])

  const onCancelModal = () => {
    form.resetFields()
    onCancel && onCancel()
  }

  const onSubmit = async () => {
    try {
      await form.validateFields()
      let values = await form.getFieldsValue()

      if(typeof edit?.index !== "undefined") {
        values.index = edit.index
        values = merge(edit, values)
      }

      onSave && onSave(values, form)
    } catch (e) {
      warning("Llena los campos requeridos")
      console.error(e)
    }
  }

  return (
    <Modal
      destroyOnClose
      title={edit ? "Editar asistente" : "Agregar asistente"}
      width={600}
      okText="Guardar"
      cancelText="Cancelar"
      onOk={onSubmit}
      onCancel={onCancelModal}
      maskClosable={false}
      {...props}>
      <CensusForm form={form} />
    </Modal>
  )
}
