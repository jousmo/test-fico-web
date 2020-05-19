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
  const months = Array.from(range.by("month"))

  const yearsSet = new Set()
  months.forEach(m => yearsSet.add(m.format("YYYY")))

  const investments = {}
  conceptsDecorator(submission?.concepts, months, investments)
  const dataSource = Object.keys(investments)?.map(key => {
    return {
      name: key,
      ...investments[key],
      total: investments[key].reduce((a, b) => {
        if (isNaN(b)){
          return a + 0
        } else {
          return a + b
        }
      }, 0)
    }
  })

  return (
    <div className="fico pdf ministrations">
      <PDFHeading title="Ministración" />
      { Array.from(yearsSet).map((year, index) =>
        <>
          <Table
            dataSource={dataSource}
            key={index}
            pagination={false}
            rowKey={(row, index) => index}>
            <Table.Column
              dataIndex="name"
              title="Aportante" />
            <Table.Column title={year}>
              {months.map((month, index) => {
                if (month.isSame(moment(year), "year")){
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
                dataIndex="total"
                render={text => money(text)}
                title="Total"/>
            </Table.Column>
          </Table>
          <br />
        </>
      )}
    </div>
  )
}
