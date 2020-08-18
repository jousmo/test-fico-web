import { Alert } from "antd"
import { useState } from "react"
import { StatisticHeader } from "../../../../../../shared"
import { decoratedData, getStatistics } from "./helpers"
import { ParticipantsList } from "./list"
import { ParticipantsModal } from "./modal"

export function MonitoringParticipants({ data }) {
  const statistics = getStatistics()
  const { beneficiaries, participants } = decoratedData(data)

  const [state, setState] = useState({
    isModalOpen: false,
    participants: [],
    level: undefined
  })

  const openModal = (participants, level) => {
    setState({
      isModalOpen: true,
      participants,
      level
    })
  }

  const closeModal = () => {
    setState({ isModalOpen: false, participants: [], level: undefined })
  }

  return (
    <div className="participants" style={{ marginTop: "-2.5rem"}}>
      <ParticipantsModal
        onCancel={closeModal}
        data={state.participants}
        level={state.level}
        visible={state.isModalOpen} />
      <StatisticHeader statistics={statistics} />
      <Alert
        type="info"
        showIcon
        message="Acumulado total de participantes del proyecto, desglosado por
        rango de edad y por sexo." />
      <ParticipantsList
        title="Beneficiarios"
        data={beneficiaries}
        openModal={openModal} />
      <ParticipantsList
        title="Participantes"
        data={participants}
        openModal={openModal} />
    </div>
  )
}
