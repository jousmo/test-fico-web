import { withForm } from "../../../../../../../helpers/withForm"
import {
  DeleteOutlined,
  PaperClipOutlined,
  UserOutlined
} from "@ant-design/icons"
import { Table, Button } from "antd"

function HumanResourcesTable({ data }) {
  const humanResources = data?.Submission?.concepts?.map(
    concept => concept.type === "HUMAN_RESOURCE"
  ) || []

  return (
    <Table
      dataSource={humanResources}
      pagination={false}
      scroll={{ x: true }}>
      <Table.Column
        align="center"
        title=""
        render={() => <span>&nbsp;<UserOutlined /></span>}
        width={50} />

      <Table.Column
        title="Puesto"
        render={(text, record) => text} />

      <Table.Column
        title="Nombre"
        render={(text, record) => text} />

      <Table.Column
        title="Funciones"
        render={(text, record) => text} />

      <Table.Column
        title="Supervisa a"
        render={(text, record) => text} />

      <Table.Column
        title="Horas"
        render={(text, record) => text} />

      <Table.Column
        title="Contratación"
        render={(text, record) => text} />

      <Table.Column
        title="Sueldo"
        render={(text, record) => text} />

      <Table.Column
        title="Prestaciones"
        render={(text, record) => text} />

      <Table.Column
        title="IVA"
        render={(text, record) => text} />

      <Table.Column
        title="Total"
        render={(text, record) => text} />

      <Table.Column
        align="center"
        title="Documentos"
        render={() => (
          <Button
            icon={<PaperClipOutlined />}
            shape="circle" />
        )} />

      <Table.Column
        align="center"
        title=""
        render={() => (
          <Button
            icon={<DeleteOutlined />}
            shape="circle" />
        )}
        width={10} />
    </Table>
  )
}

export default withForm(HumanResourcesTable)