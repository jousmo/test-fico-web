import { Table, Typography } from "antd"
import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
import { useContext } from "react"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import PDFHeading from "../heading"
import { dataDecorator } from "./helpers"
import { money } from "../../../../../helpers/cellFormat"
import "../style.sass"

export function MinistrationsPDF(){
  const {
    submissionResult
  } = useContext(AdminSubmissionContext)
  const submission = submissionResult?.data?.Submission

  const getPeriodTitle = (month, period) => {
    return (
      <>
        <Typography.Text>
          Periodo {period}
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

  const dataSource = dataDecorator(submission?.concepts, months)

  let periodCounter = 0

  return (
    <div className="fico pdf ministrations">
      <PDFHeading title="Ministración" />
      { Array.from(yearsSet).map((year, yearIndex) => {
        return(
          <>
            <Table
              dataSource={dataSource.yearly[year]}
              key={yearIndex}
              pagination={false}
              rowKey={(row, index) => `${yearIndex}-${index}`}>
              <Table.Column
                dataIndex="name"
                title="Aportante" />
              <Table.Column title={year}>
                {months.map((month, monthIndex) => {
                  if (month.isSame(moment(year), "year")){
                    periodCounter++
                    return (
                      <Table.Column
                        key={`${yearIndex}-${monthIndex}`}
                        render={(text, row) => (
                          money(row[monthIndex])
                        )}
                        title={getPeriodTitle(month, periodCounter)}/>
                    )
                  } else {
                    periodCounter = 0
                  }
                })}
                <Table.Column
                  dataIndex="total"
                  key={`total-${yearIndex}`}
                  render={text => money(text)}
                  title="Total"/>
              </Table.Column>
            </Table>
            <br />
          </>
        )
      })}
      <br/>
      <div className="total-table">
        <Table
          dataSource={dataSource.total}
          pagination={false}
          rowKey={(row, index) => `total-${index}`}>
          <Table.Column
            dataIndex="name"
            title="Aportante"/>
          <Table.Column
            dataIndex="total"
            render={text => money(text)}
            title="TOTAL MINISTRADO"/>
        </Table>
      </div>
    </div>
  )
}
