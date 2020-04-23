import { withForm } from "../../../../../../../helpers/withForm"
import { Table, Button, Input } from "antd"
import {
  PaperClipOutlined,
  UserOutlined
} from "@ant-design/icons"
import { SelectField } from "../../../../../../shared/selectField"
import {
  benefits,
  contractTypes
} from "../../../../../../../helpers/selectOptions/implementer/submission"

function HumanResourcesTable({ data }) {
  const humanResources = data?.Submission?.concepts?.map(
    concept => concept.type === "HUMAN_RESOURCE"
  ) || []

  const getInput = (record, fieldName, index) => {
    const value = record[fieldName]
    const id = `${fieldName}-${index}`
    return <Input key={id} id={id} type="text" value={value} />
  }

  return (
    <Table
      dataSource={humanResources}
      pagination={false}
      scroll={{ x: "max-content" }}>
      <Table.Column
        align="center"
        key="userIcon"
        title=""
        render={(text, record, index) => (
          <span key={`userIcon-${index}`}>&nbsp;<UserOutlined /></span>
        )}
        width={50} />

      <Table.Column
        title="Puesto"
        key="puesto"
        render={(text, record, index) => (
          getInput(record, "puesto", index)
        )}
        width={200} />

      <Table.Column
        title="Nombre"
        key="name"
        render={(text, record, index) => (
          getInput(record, "name", index)
        )}
        width={200} />

      <Table.Column
        title="Funciones"
        key="functions"
        render={(text, record, index) => (
          getInput(record, "functions", index)
        )}
        width={250} />

      <Table.Column
        title="Supervisa a"
        key="supervises"
        render={(text, record, index) => (
          getInput(record, "supervises", index)
        )}
        width={200} />

      <Table.Column
        title="Horas"
        key="hours"
        render={(text, record, index) => (
          getInput(record, "hours", index)
        )}
        width={150} />

      <Table.Column
        title="Contratación"
        key="contract_type"
        render={(text, record, index) => (
          <SelectField
            id={`contract_type-${index}`}
            key={`contract_type-${index}`}
            options={contractTypes}
            value={record["contract_type"]} />
        )}
        width={150} />

      <Table.Column
        title="Sueldo"
        key="salary"
        render={(text, record, index) => (
          getInput(record, "salary", index)
        )}
        width={150} />

      <Table.Column
        title="Prestaciones"
        key="benefits"
        render={(text, record, index) => (
          <SelectField
            id={`benefits-${index}`}
            key={`benefits-${index}`}
            options={benefits}
            value={record["benefits"]} />
        )}
        width={150} />

      <Table.Column
        title="IVA"
        key="taxes"
        render={(text, record, index) => (
          getInput(record, "taxes", index)
        )}
        width={150} />

      <Table.Column
        title="Total"
        key="total"
        render={(text, record, index) => (
          getInput(record, "total", index)
        )}
        width={150} />

      <Table.Column
        align="center"
        key="documents"
        title="Documentos"
        render={(text, record, index) => (
          <Button
            icon={<PaperClipOutlined />}
            key={`documents-${index}`}
            shape="circle" />
        )} />
    </Table>
  )
}

export default withForm(HumanResourcesTable)