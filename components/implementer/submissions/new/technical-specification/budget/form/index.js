import { withForm, cellFormat } from "../../../../../../../helpers"
import { CompositeField, ScrollableView } from "../../../../../../shared"
import { Empty, Table, Typography } from "antd"
import { useState } from "react"
import { ConceptModal } from "./concept-modal"
import { conceptTypes } from "../../../../../../../helpers/selectOptions/implementer/submission"
import { renderInvestment, renderTotal } from "./helpers"

function BudgetForm({data, onChange}) {
  const [state, setState] = useState({ isModalOpen: false, edit: false })

  const onClickAdd = () => {
    setState({ ...state, isModalOpen: true })
  }

  const onCancel = () => {
    setState({ ...state, isModalOpen: false, edit: false })
  }

  const onSave = (addNew, replaceItemAtIndex) => (concept) => {
    if(concept.index !== undefined) {
      replaceItemAtIndex(concept.index, concept)
    }
    else {
      addNew(concept)
    }

    onCancel()
  }

  const onEdit = (item, index) => {
    item.index = index
    setState({ ...state, isModalOpen: true, edit: item })
  }

  return (
    <>
      <CompositeField
        onClickAdd={onClickAdd}
        onChange={onChange}
        addLabel="Agregar concepto"
        defaultValue={data?.Submission?.concepts}>
        {({ items, addNew, removeItem, replaceItemAtIndex }) =>
          <>
            <ConceptModal
              visible={state.isModalOpen}
              submission={data?.Submission}
              onCancel={onCancel}
              onSave={onSave(addNew, replaceItemAtIndex)}
              edit={state.edit} />
            <ScrollableView contentWidth="1600px">
              <Table
                dataSource={items}
                pagination={false}
                locale={{emptyText: <Empty description="Agrega todos los conceptos
                que serán utilizados durante el proyecto" />}}>
                <Table.Column
                  title="Concepto"
                  key="name"
                  dataIndex="name"
                  render={cellFormat.actions(onEdit, removeItem)} />
                <Table.Column
                  title="Región"
                  key="region"
                  dataIndex="region" />
                <Table.Column
                  title="Tipo de gasto"
                  key="type"
                  dataIndex="type"
                  render={cellFormat.options(conceptTypes)} />
                <Table.Column
                  title="Costo unitario"
                  key="unitCost"
                  dataIndex="unitCost"
                  render={cellFormat.money} />
                <Table.Column
                  title="Unidad de medida"
                  key="measurementUnit"
                  dataIndex="measurementUnit" />
                <Table.Column
                  title="Total"
                  key="total"
                  dataIndex="name"
                  render={renderTotal} />
                <Table.Column
                  title="Implementadora"
                  key="implementer"
                  dataIndex="name"
                  render={renderInvestment("Implementadora")} />
                <Table.Column
                  title="FICOSEC"
                  key="ficosec"
                  dataIndex="name"
                  render={renderInvestment("FICOSEC")} />
                <Table.Column
                  title={data?.Submission?.allies[0]}
                  key="firstAlly"
                  dataIndex="name"
                  render={renderInvestment(data?.Submission?.allies[0])} />
                {data?.Submission?.allies[1] && (
                  <Table.Column
                    title={data?.Submission?.allies[1]}
                    key="secondAlly"
                    dataIndex="name"
                    render={renderInvestment(data?.Submission?.allies[1])} />
                )}
                <Table.Column
                  title="Unidades"
                  key="totalUnits"
                  dataIndex="totalUnits" />
              </Table>
            </ScrollableView>
          </>
        }
      </CompositeField>
    </>
  )
}

export default withForm(BudgetForm)
