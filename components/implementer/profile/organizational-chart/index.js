import {Form, Row, Col, Skeleton} from "antd"
import { Section, UploadButtonForm } from "../../../shared"
import { useContext } from "react"
import { ImplementerProfileContext } from "../../../../contexts/implementer/profile"

export function OrganizationalChart() {
  const {
    removeDocument,
    addDocument,
    loading,
    data,
    disabled = false
  } = useContext(ImplementerProfileContext)

  if(loading) {
    return <Skeleton active />
  }

  const onDoneFile = async files => {
    addDocument(files[0], "ORGANIZATION_CHART")
  }

  const onRemoveFile = () => {
    removeDocument("ORGANIZATION_CHART")
  }

  const documents = []
  const chart = data?.Implementer?.documents?.find(doc => (
    doc.type === "ORGANIZATION_CHART"
  ))
  if (chart){
    const { id, ...chartDoc } = chart
    documents.push({ uid: id, status: "done", ...chartDoc })
  }

  return (
    <Section title="6. Organigrama">
      <Form
        name="organizational-chart"
        layout="vertical">
        <Row gutter={[10, 8]} justify="start">
          <Col span={24}>
            <Form.Item
              style={{display: "inline"}}
              label="Sube un documento donde se muestre la estructura de la
              implementadora en un organigrama">
              <UploadButtonForm
                fileList={documents}
                onRemoveFile={onRemoveFile}
                onChange={onDoneFile}
                maxFile={1}
                accept={"application/pdf"}
                disabled={disabled}>
                Subir
              </UploadButtonForm>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Section>
  )
}
