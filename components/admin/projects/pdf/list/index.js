import { Input, List } from "antd"
import {
  implementer,
  getReadableValue
} from "../../../../../helpers/selectOptions"
import { getDate, money } from "./helpers"
import moment from "moment"
moment.locale("es")
import { ListItem } from "./item"
import { ProjectIndicators } from "./indicators"
import { PDFSignatures } from "./signatures"

export default function PDFList({ data }){
  const { submission: { strategicAxisTypes } } = implementer

  return (
    <List bordered itemLayout="horizontal">
      <ListItem label="Número de acuerdo" value={data?.agreementNumber} />
      <ListItem label="Fecha" value={getDate(data?.createdAt)} />
      <ListItem label="Implementadora" value={data?.implementer?.name} />
      <ListItem label="Nombre del proyecto" value={data?.name} />
      <ListItem label="Objetivo general" value={data?.generalObjective} />
      <ListItem
        label="Eje estratégico"
        value={getReadableValue(strategicAxisTypes, data?.strategicAxis)} />
      <ListItem label="Inicio de implementación" value={getDate(data?.startDate)} />
      <ListItem label="Fecha final de implementación" value={getDate(data?.endDate)} />
      <ProjectIndicators data={data}/>
      <ListItem label="Importe autorizado" value={money(data?.budgeted)} />
      <ListItem label="Importe ejercido" value={money(data?.evidenced)} />
      <ListItem
        label="Saldo"
        value={money((data?.budgeted - data?.evidenced))} />
      <div className="pagebreak" />
      <ListItem label="Comentarios"/>
      <Input.TextArea rows={5} placeholder="Describe" />
      <PDFSignatures />
    </List>
  )
}
