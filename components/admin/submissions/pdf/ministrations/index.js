import { Table, Typography } from "antd"
import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import PDFHeading from "../heading"
import { conceptsDecorator } from "./helpers"
import { money } from "../../../../../helpers/cellFormat"
import "../style.sass"

export function MinistrationsPDF(){
  const {
    submissionResult
  } = useContext(AdminSubmissionContext)
  const submission = submissionResult?.data?.Submission

  const getPeriodTitle = (month, index) => {
    return (
      <>
        <Typography.Text>
          Periodo {index + 1}
        </Typography.Text>
        <br/>
        <Typography.Text type="secondary">
          {month.format("MMMM YYYY")}
        </Typography.Text>
      </>
    )
  }

  const range = moment.range(moment(submission?.startDate),
    moment(submission?.endDate))
  const years = Array.from(range.by("year"))
  const months = Array.from(range.by("month"))

  const investments = {}
  conceptsDecorator(submission?.concepts, months, investments)
  const dataSource = Object.keys(investments)?.map(key => {
    return {
      name: key,
      ...investments[key]
    }
  })

  return (
    <div className="fico pdf ministrations">
      <PDFHeading title="Ministración" />
      { years.map((year, index) =>
        <>
          <Table
            dataSource={dataSource}
            key={index}
            pagination={false}
            rowKey={(row, index) => index}>
            <Table.Column
              dataIndex="name"
              title="Aportante" />
            <Table.Column title={year.format("YYYY")}>
              {months.map((month, index) => {
                if (month.isSame(year, "year")){
                  return (
                    <Table.Column
                      key={index}
                      render={(text, row) => (
                        money(row[index])
                      )}
                      title={getPeriodTitle(month, index)}/>
                  )
                }
              })}
              <Table.Column
                title="Total"/>
            </Table.Column>
          </Table>
          <br />
        </>
      )}
    </div>
  )
}
