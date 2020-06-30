import { useContext } from "react"
import { Table } from "antd"
import {
  AdminSubmissionContext
} from "../../../../../contexts/admin/submissions/show"
import PDFHeading from "../heading"
import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
import { capitalize } from "lodash"
import { columnDecorator } from "./helpers/columns-decorator"
import "../style.sass"

export function SchedulePDF(){
  const {
    submissionResult
  } = useContext(AdminSubmissionContext)
  const submission = submissionResult?.data?.Submission

  const activities = submission?.specificObjectives?.reduce(
    (prev, { activities }) => activities ? prev.concat(activities) : null, []
  )

  if (!activities){
    return (
      <div className="fico pdf schedule">
        <PDFHeading title="Cronograma" />
        <Table />
      </div>
    )
  }

  const {
    dataSource,
    monthsColumns,
    yearColumns
  } = columnDecorator(activities)

  return (
    <div className="fico pdf schedule">
      <PDFHeading title="Cronograma" />
      <Table bordered dataSource={dataSource} pagination={false}>
        <Table.Column
          dataIndex="activity"
          title="Actividad"/>

        { yearColumns.map((year, yearIndex) => (
          <Table.ColumnGroup key={`year_${yearIndex}`} title={year}>
            { monthsColumns.map((month, monthIndex) => {
              if (month.substring(0,4) === year) {
                return (
                  <Table.Column
                    key={`month_${monthIndex}`}
                    dataIndex={month}
                    title={
                      capitalize(moment(month).format("MMMM"))
                    }/>
                )
              }
            })}
          </Table.ColumnGroup>
        ))}
      </Table>
    </div>
  )
}
