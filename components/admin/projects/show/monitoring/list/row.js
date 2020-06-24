import { Button, Col, Row, Typography } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import { capitalize } from "lodash"
import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
moment.locale("es")

export function MonitoringRow({ buttonText, date, title }){
  const isAvailable = moment().isBefore(date)

  if (moment.isMoment(title)){
    title = capitalize(date.format("MMMM YYYY"))
  }

  let reportStatus = "No disponible aún"
  if (isAvailable){
    //Todo: Get report status
  }

  return (
    <Row
      align="center"
      gutter={[10, 6]}
      justify="space-between">
      <Col span={20}>
        <Typography.Text>
          {title}
        </Typography.Text>
        <br />
        <Typography.Text type="secondary">
          {reportStatus}
        </Typography.Text>
      </Col>
      <Col>
        <Button
          disabled={isAvailable}
          icon={<EyeOutlined />}
          type="primary">
          {buttonText || "Ver"}
        </Button>
      </Col>
    </Row>
  )
}
