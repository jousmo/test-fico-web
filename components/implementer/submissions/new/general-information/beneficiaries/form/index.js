import { withForm, toFileList } from "../../../../../../../helpers"
import { Col, Form } from "antd"
import { CompositeField, FieldLabel, UploadButtonForm } from "../../../../../../shared"
import { BeneficiaryModal } from "./beneficiaryModal"
import { BeneficiaryItem } from "./beneficiaryItem"
import { useState } from "react"

function BeneficiariesForm({ data, onChange, hiddenComments, readOnly, review }) {
  const [state, setState] = useState({
    isModalOpen: false,
    edit: undefined
  })

  const onClickAdd = () => {
    setState({ isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false, edit: undefined })
  }

  const onSave = (addNew, replaceItemAtIndex) => (values) => {
    if(typeof values.index === "undefined") {
      addNew(values)
    }
    else {
      const index = values.index
      delete values.index

      replaceItemAtIndex(index, values)
    }
    onCancel()
  }

  const onEdit = (data, index) => () => {
    data.index = index
    setState({ isModalOpen: true, edit: data })
  }

  const onDoneFile = files => {
    const { name, url } = files[0]
    const documents = [...data?.documents, { name, url, type: "BENEFICIARIES" }]
    onChange({ documents })
  }

  const onRemoveFile = ({ url }) => {
    const documents = data?.documents.filter(doc => doc.url !== url)
    onChange({ documents })
  }

  const beneficiaryDocument = data?.documents?.find(doc => doc.type === "BENEFICIARIES")

  return (
    <Form layout="vertical">
      <Form.Item
        style={{display: "inline"}}>
        <CompositeField
          onChange={beneficiaries => onChange({ beneficiaries })}
          defaultValue={data?.beneficiaries}
          onClickAdd={onClickAdd}
          isAddDisabled={readOnly || review}
          addLabel="Agregar beneficiario">
          {({ items, addNew, removeItem, replaceItemAtIndex }) =>
            <div>
              <BeneficiaryModal
                edit={state.edit}
                review={review}
                onSave={onSave(addNew, replaceItemAtIndex)}
                visible={state.isModalOpen}
                onCancel={onCancel} />
              { items?.map((item, key) =>
                <BeneficiaryItem
                  key={key}
                  index={key}
                  data={item}
                  readOnly={readOnly}
                  onEdit={onEdit(item, key)}
                  onDelete={removeItem(key)}
                  review={review}
                  hiddenComments={hiddenComments}/>
              ) }
            </div>
          }
        </CompositeField>
      </Form.Item>
      <Col span={24}>
        <Form.Item
          label={
            <FieldLabel
              comentable={{
                hidden: hiddenComments,
                name: "beneficiariesDoc",
                section: "SUBMISSION"}}>
              Documento F21
            </FieldLabel>
          }>
          <UploadButtonForm
            fileList={beneficiaryDocument ? toFileList([beneficiaryDocument]) : []}
            onRemoveFile={onRemoveFile}
            onChange={onDoneFile}
            maxFile={1}
            accept={"application/pdf"}
            disabled={readOnly}>
            Adjuntar
          </UploadButtonForm>
        </Form.Item>
      </Col>
    </Form>
  )
}

export default withForm(BeneficiariesForm)
