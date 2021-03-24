import { withForm, toFileList } from "../../../../../../../helpers"
import { Form, Row, Col } from "antd"
import { FieldLabel, UploadButtonForm } from "../../../../../../shared"

function DocumentsForm({ data, onChange, hiddenComments, readOnly }) {
  const onDoneFile = files => {
    const newDocuments = files?.map(({ name, url }) => ({ name, url, type: "EXTRA_DOCUMENTS" }))
    const documents = [...data?.documents, ...newDocuments]
    onChange({ documents })
  }

  const onRemoveFile = ({ url }) => {
    const documents = data?.documents.filter(doc => doc.url !== url)
    onChange({ documents })
  }

  const documents = data?.documents?.filter(doc => doc.type === "EXTRA_DOCUMENTS") || []

  return (
    <Form
      name="documents-form"
      layout="vertical">
      <Row gutter={[10, 8]} justify="start">
        <Col span={24}>
          <Form.Item
            label={
              <FieldLabel
                comentable={{
                  hidden: hiddenComments,
                  name: "EXTRA_DOCUMENTS",
                  section: "SUBMISSION"}}>
                Aquí podrás adjuntar los documentos necesarios para completar la información del proyecto
              </FieldLabel>
            }>
            <UploadButtonForm
              fileList={toFileList(documents)}
              onRemoveFile={onRemoveFile}
              onChange={onDoneFile}
              maxFile={10}
              disabled={readOnly}>
              Adjuntar
            </UploadButtonForm>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default withForm(DocumentsForm)
