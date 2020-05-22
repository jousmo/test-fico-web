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

  const getMonthlySummary = (pageData) => {
    const totalMonthly = []
    let total = 0

    pageData.forEach(row => {
      total += row["total"]
      Object.keys(row).forEach((key, index) => {
        if (key !== "name" && key !== "total"){
          if (!totalMonthly[index]){
            totalMonthly[index] = 0
          }
          totalMonthly[index] += row[key]
        }
      })
    })

    return (
      <Table.Summary.Row>
        <Table.Summary.Cell>
          Total
        </Table.Summary.Cell>
        {totalMonthly.map(amount =>
          <Table.Summary.Cell>
            {money(amount).children}
          </Table.Summary.Cell>
        )}
        <Table.Summary.Cell>
          {money(total).children}
        </Table.Summary.Cell>
      </Table.Summary.Row>
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
              summary={pageData => getMonthlySummary(pageData)}
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
          summary={pageData => {
            let totalSum = 0
            pageData.forEach(({ total }) => {
              totalSum += total;
            });

            return (
              <Table.Summary.Row>
                <Table.Summary.Cell>
                  Total
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  {money(totalSum).children}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            )
          }}
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
