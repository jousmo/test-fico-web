import { useContext, useState } from "react"
import { Alert, Button, Col, Row, Skeleton } from "antd"
import { submission } from "../../../../../../../graphql"
import { MultipleDateRangeField } from "../../../../../../shared"
import { useQuery } from "@apollo/react-hooks"
import { AdminSubmissionContext } from "../../../../../../../contexts/admin/submissions/show"
import { useRouter } from "next/router"
import { attachmentThree, attachmentFour } from "./helpers"

export function ExtraAttachmentsContent() {
  const [periods, setPeriods] = useState(null)
  const { client } = useContext(AdminSubmissionContext)
  const router = useRouter()
  const { query: { id } } = router || {}

  const { loading, error, data } = useQuery(submission.queries.getBudget, {
    client: client,
    variables: { id: id }
  })

  if (loading) {
    return <Skeleton active />
  }

  if(!data || error) {
    return (
      <Alert
        message="Error"
        description="Ha ocurrido un error al cargar los datos de esta sección,
          por favor actualiza la página."
        type="error"
        showIcon />
    )
  }

  const { Budget } = data
  return (
    <Row gutter={[5, 5]}>
      <Col span={24}>
        <MultipleDateRangeField
          value={periods}
          format="MMMM/YYYY"
          addLabel="Agregar periodo"
          onChange={value => setPeriods(value)}
          limitDates={[Budget?.startDate, Budget?.endDate]} />
      </Col>
      <Col span={12}>
        <Button onClick={() => attachmentThree(Budget, periods)} style={{ width: "100%" }}>
          Anexo 3
        </Button>
      </Col>
      <Col span={12}>
        <Button onClick={() => attachmentFour(periods)} style={{ width: "100%" }}>
          Anexo 4
        </Button>
      </Col>
    </Row>
  )
}
