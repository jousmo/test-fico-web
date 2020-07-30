import { money } from "../../../../../../helpers/cellFormat"

export const getTotalApproved = (row) => {
  const total = row.concepts?.reduce((sum, concept) => (
    sum + (concept.unitCost * concept.totalUnits)
  ), 0)
  return money(total)
}
