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
import { capitalize, chunk } from "lodash"
import "../style.sass"

export function MinistrationsPDF(){
  const {
    submissionResult
  } = useContext(AdminSubmissionContext)
  const submission = submissionResult?.data?.Submission

  const getPeriodTitle = (quarters, period) => {
    return (
      <>
        <Typography.Text>
          Trimestre {period}
        </Typography.Text>
        <br/>
        <Typography.Text type="secondary">
          {`${capitalize(quarters[0].month.format("MMMM"))} - ${capitalize(quarters[quarters.length - 1].month.format("MMMM"))}`}
        </Typography.Text>
      </>
    )
  }

  const getMonthlySummary = (pageData) => {
    const totalQuarter = []
    let total = 0

    pageData?.forEach(row => {
      total += row["total"]

      const cleanRows = Object.keys(row).slice(0, -2)
      const quarter = chunk(cleanRows, 3)

      quarter?.forEach((el, index) => {
        el?.forEach(item => {
          if (!totalQuarter[index]) {
            totalQuarter[index] = 0
          }
          totalQuarter[index] += row[+item]
        })
      })
    })

    return (
      <Table.Summary.Row>
        <Table.Summary.Cell>
          Total
        </Table.Summary.Cell>
        {totalQuarter?.map(amount =>
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

  const range = moment.range(moment(submission?.startDate), moment(submission?.endDate))
  const months = Array.from(range.by("month"))

  const yearsSet = new Set()
  months.forEach(m => yearsSet.add(m.format("YYYY")))

  const dataSource = dataDecorator(submission?.concepts, months)

  let periodCounter = 0
  let quarterArray = []

  return (
    <div className="fico pdf ministrations">
      <PDFHeading title="Ministración" />
      { Array.from(yearsSet)?.map((year, yearIndex) => {
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
                {months?.map((month, monthIndex) => {
                  if (month.isSame(moment(year), "year")){

                    if (quarterArray.length < 3) {
                      quarterArray.push({ monthIndex, month })
                    }

                    if (quarterArray.length === 3) {
                      const quarters = [...quarterArray]
                      quarterArray = []
                      periodCounter++

                      return (
                        <Table.Column
                          key={`${yearIndex}-${monthIndex}`}
                          render={row => {
                            const total = quarters.reduce((prev, current) => {
                              return prev + row[current.monthIndex]
                            }, 0)
                            return money(total)
                          }}
                          title={getPeriodTitle(quarters, periodCounter)}/>
                      )
                    }
                  } else {
                    periodCounter = 0
                  }
                })}


                {
                  quarterArray.length > 0 && (
                    <Table.Column
                      key={`${yearIndex}-${Date.now()}`}
                      render={row => {
                        const total = quarterArray.reduce((prev, current) => {
                          return prev + row[current.monthIndex]
                        }, 0)
                        return money(total)
                      }}
                      title={getPeriodTitle(quarterArray, periodCounter + 1)}/>
                  )
                }

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
