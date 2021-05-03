import { withForm, toFileList } from "../../../../../../../helpers"
import { Form, Row, Col } from "antd"
import { FieldLabel, UploadButtonForm } from "../../../../../../shared"
import { useEffect, useState } from "react"

function DocumentsForm({ data, onChange, hiddenComments, readOnly }) {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    if (data?.documents.length) {
      setDocuments(data?.documents?.filter(doc => doc.type === "EXTRA_DOCUMENTS") || [])
    }
  }, [data])

  const onDoneFile = files => {
    const addDocuments = files?.map(({ name, url }) => ({ name, url, type: "EXTRA_DOCUMENTS" }))
    const newDocuments = [...documents, ...addDocuments]
    setDocuments(newDocuments)
    onChange({ documents: newDocuments })
  }

  const onRemoveFile = ({ url }) => {
    const newDocuments = documents?.filter(doc => doc.url !== url)
    setDocuments(newDocuments)
    onChange({ documents: newDocuments })
  }

  const dataSourceFiles = data?.documents?.filter(doc => doc.type === "EXTRA_DOCUMENTS") || []

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
              fileList={toFileList(dataSourceFiles)}
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
