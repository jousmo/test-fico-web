import { SelectField } from "../selectField"

export function YearSelect({ displayNumber, ...props }) {
  let currentYear = new Date().getFullYear() + 1

  const years = new Array(displayNumber + 1).fill(null).map(() => {
    currentYear--
    return { label: currentYear, value: currentYear.toString() }
  })

  return (
    <SelectField
      options={years}
      {...props} />
  )
}
