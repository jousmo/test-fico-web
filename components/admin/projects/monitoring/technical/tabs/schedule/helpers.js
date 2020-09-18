export const getColor = filterSchedule => {
  let color = null
  let counter = 0

  for (const item of filterSchedule) {
    const dateOne = item.scheduledAt?.split("T")[0]
    const dateTwo = item.completedAt?.split("T")[0]

    if (dateTwo === undefined) {
      counter++
      continue
    }

    if (dateOne !== dateTwo) {
      color = "orange"
      break
    }

    color = "green"
  }

  return counter === filterSchedule.length ? "red" : color
}
