import { Steps as ASteps } from "antd"
import { useRouter } from "next/router"
import { getRoute } from "./helpers"

export function Steps({current = 0}) {
  const router = useRouter()

  const handleChange = c => {
    if (!router?.query?.id){
      return
    }
    router.push(getRoute(router, c))
  }

  return (
    <ASteps current={current} onChange={handleChange}>
      <ASteps.Step
        key="general-information"
        title="Inf. General"
        status="wait" />
      <ASteps.Step
        key="technical-specs"
        title="Ficha T"
        status="wait" />
      <ASteps.Step
        key="budget"
        title="Presupuesto"
        status="wait" />
      <ASteps.Step
        key="timetable"
        title="Cronograma"
        status="wait" />
      <ASteps.Step
        key="human-resources"
        title="Recursos humanos"
        status="wait" />
      <ASteps.Step
        key="comments"
        title="Comentarios"
        status="wait" />
    </ASteps>
  )
}
