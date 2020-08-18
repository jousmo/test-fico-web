import { Alert } from "antd"
import { StatisticHeader } from "../../../../../../shared"
import { getStatistics } from "./helpers"

export function MonitoringParticipants() {
  const statistics = getStatistics()

  return (
    <div className="participants" style={{ marginTop: "-2.5rem"}}>
      <StatisticHeader statistics={statistics} />
      <Alert
        type="info"
        showIcon
        message="Acumulado total de participantes del proyecto, desglosado por
        rango de edad y por sexo." />
    </div>
  )
}
