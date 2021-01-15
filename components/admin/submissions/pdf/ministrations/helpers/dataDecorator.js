import { conceptsDecorator } from "./conceptsDecorator"

export const dataDecorator = (concepts, months) => {
  const investments = {}
  conceptsDecorator(concepts, months, investments)

  const totalPerInvestor = {}
  const dataSource = {}
  Object.keys(investments).forEach(year => {
    dataSource[year] = Object.keys(investments[year])?.map(investor => {
      const anualTotal = investments[year][investor]?.reduce((a, b) => {
        if (isNaN(b)){
          return a
        }
        return a + b
      }, 0)

      const total = totalPerInvestor[investor]
      totalPerInvestor[investor] = total ? total + anualTotal : anualTotal

      return {
        name: investor,
        ...investments[year][investor],
        total: anualTotal
      }
    })
  })

  const totalDataSource = Object.keys(totalPerInvestor)?.map(key => (
    { name: key, total: totalPerInvestor[key] }
  ))

  return {
    yearly: dataSource,
    total: totalDataSource
  }
}
