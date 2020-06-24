import { withForm } from "../../../../../../helpers/withForm"
import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
moment.locale("es")
import { MonitoringRow } from "./row"

function MonitoringList({ data }){
  const range = moment.range(moment(data.startDate),
    moment(data.endDate))
  const months = Array.from(range.by("month"))

  return (
    <>
      { months.map((month, index) => (
        <MonitoringRow
          date={month}
          key={index}
          title={month} />
      ))}
      <MonitoringRow
        title="Monitoreo trimestral" />
      <MonitoringRow
        buttonText="Calificar"
        title="Reporte final del proyecto" />
    </>
  )
}

export default withForm(MonitoringList)
