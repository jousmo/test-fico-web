import { withForm } from "../../../../../../helpers/withForm";
import { Form } from "antd";
import { CompositeField } from "../../../../../shared";

function BeneficiariesForm({data, isLoading, onChange, error}) {
  const [state, setState] = useState({ isModalOpen: false })

  const onClickAdd = () => {
    setState({ isModalOpen: true })
  }

  const onCancel = () => {
    setState({ isModalOpen: false })
  }

  const onSave = (addNew) => (values) => {
    addNew(values)
    onCancel()
  }

  return (
    <Form layout="vertical">
      <Form.Item
        style={{display: "inline"}}>
        <CompositeField
          onChange={onChange}
          defaultValue={data?.Implementer?.projects}
          onClickAdd={onClickAdd}
          addLabel="Agregar proyecto">
          {({ items, addNew, removeItem }) => 
            <div>
              <ProjectModal
                onSave={onSave(addNew)}
                visible={state.isModalOpen}
                onCancel={onCancel} />
              <Table
                dataSource={items}
                pagination={false}
                locale={{emptyText: <Empty description="Agrega proyectos haciendo click en el botón de abajo" />}}
                >
                <Table.Column
                  title="Institución financiadora"
                  key="financialInstitution"
                  dataIndex="financingInstitution" />
                <Table.Column
                  title="Monto"
                  key="amount"
                  dataIndex="amount"
                  render={cellFormat.money} />
                <Table.Column
                  title="Financiamiento"
                  key="financingPercentage"
                  dataIndex="financingPercentage"
                  render={cellFormat.percentage} />
                <Table.Column
                  title="Nombre del proyecto"
                  key="name"
                  dataIndex="name" />
                <Table.Column
                  title="Año"
                  key="year"
                  dataIndex="year" />
                <Table.Column
                  title="Presupuesto"
                  key="budgetType"
                  dataIndex="budgetType" />
                <Table.Column
                  title="Objetivo general"
                  key="objective"
                  dataIndex="objective" />
                <Table.Column
                  title=""
                  key="actions"
                  render={cellFormat.deleteAction(removeItem)} />
              </Table>
            </div>
          }
        </CompositeField>
      </Form.Item>
    </Form>
  )
}

export default withForm(BeneficiariesForm)
