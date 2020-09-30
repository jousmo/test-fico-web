import Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
import ActivityBox from "../activity-box"

export const columnDecorator = activities => {
  const monthsSet = new Set()
  const yearsSet = new Set()
  const dataSource = activities.map((activity, index) => {
    const result = {
      key: index,
      activity: `Actividad ${index + 1}`
    }

    const ranges = []
    activity?.months?.forEach((range, i) => {
      ranges[i] = moment.range(range.months[0], range.months[1])
    })

    ranges.forEach(range => {
      Array.from(range.by("month")).map(
        m => {
          yearsSet.add(m.format("YYYY"))
          return m.format("YYYYMM")
        }
      ).forEach(month => {
        monthsSet.add(month)
        result[month] = <ActivityBox />
      })
    })
    return result
  })

  return {
    dataSource,
    monthsColumns: Array.from(monthsSet).sort(),
    yearColumns: Array.from(yearsSet).sort()
  }
}
