import { Alert } from "antd"
import { StatisticHeader } from "../../../../../../shared"
import { decoratedData, getStatistics } from "./helpers"
import { ParticipantsList } from "./list"

export function MonitoringParticipants({ data }) {
  const statistics = getStatistics()
  const { beneficiaries, participants } = decoratedData(data)

  return (
    <div className="participants" style={{ marginTop: "-2.5rem"}}>
      <StatisticHeader statistics={statistics} />
      <Alert
        type="info"
        showIcon
        message="Acumulado total de participantes del proyecto, desglosado por
        rango de edad y por sexo." />
      <ParticipantsList title="Beneficiarios" data={beneficiaries} />
      <ParticipantsList title="Participantes" data={participants} />
    </div>
  )
}
