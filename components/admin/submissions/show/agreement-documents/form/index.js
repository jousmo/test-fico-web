import { withForm } from "../../../../../../helpers/withForm"
import { Alert, Col, Form, List, Row } from "antd"
import { PaperClipOutlined } from "@ant-design/icons"
import { DeleteButton } from "../../../../../shared"
import { useCallback, useState } from 'react'
import { success, warning } from '../../../../../../helpers/alert'
import { useMutation } from '@apollo/react-hooks'
import { submission } from '../../../../../../graphql/submission'

function AgreementDocumentsForm({ data, client }) {
  const documents =  data?.documents

  const [state, setState] = useState(documents)

  const [deleteDocumentSubmission] = useMutation(
    submission.mutations.deleteDocumentSubmission, { client: client }
  )

  const getAction = (type) => {
    const [document] = state.filter(document => document.type === type)

    if (!document?.id) return null

    return [
      <a href={document.url} target="_blank"><PaperClipOutlined />&nbsp;{document.name}</a>,
      <DeleteButton style={{float: "none"}} onClick={() => onClick(document.id)}/>
    ]
  }

  const onClick = useCallback(async id => {
    console.log(id)
    debugger
    try {
      await deleteDocumentSubmission({ variables: { id }})
      const documents = state.filter(document => document.id !== id)
      debugger
      success("Documento eliminado correctamente")
      setState(documents)
    } catch (e) {
      warning("Hubo un error al eliminar el documento")
      console.error(e)
    }
  }, [state, setState])

  if (data?.status !== "ON_AGREEMENT"){
    return (
      <Alert
        message="Cuando se apruebe el proyecto de la implementadora se podrán
        descargar los documentos de la solicitud."
        type="warning"
      />
    )
  }

  return (
    <Form
      name="organizational-chart"
      layout="vertical">
      <Row gutter={[10, 8]} justify="start">
        <Col span={24}>
          <Form.Item
            style={{display: "inline"}}
            label="Documentos de la implementadora para firma de convenio">
            <List>
              <List.Item actions={getAction("CONSTITUTIVE")} style={{borderBottom: 0}}>
                Acta constitutiva
              </List.Item>
              <List.Item actions={getAction("LEGAL_POWER")} style={{borderBottom: 0}}>
                Poder representante legal
              </List.Item>
              <List.Item actions={getAction("IDENTIFICATION")} style={{borderBottom: 0}}>
                Copia de la identificación oficial de representante legan
              </List.Item>
              <List.Item actions={getAction("CONSTANCY")} style={{borderBottom: 0}}>
                Copia de constancia de situación
              </List.Item>
              <List.Item actions={getAction("PROOF_RESIDENCY")} style={{borderBottom: 0}}>
                Comprobante de domicilio
              </List.Item>
              <List.Item actions={getAction("ACCOUNT_BALANCE")} style={{borderBottom: 0}}>
                Copia de la caratula del estado de cuenta (Cuenta exclusiva
                de proyecto)
              </List.Item>
            </List>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default withForm(AgreementDocumentsForm)
