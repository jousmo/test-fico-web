export const investmentDecorator = (concept, month, monthIndex, investments) => {
  concept.investmentDistribution?.forEach(investor => {
    const cost = concept.unitCost * concept.monthlyDistribution[monthIndex]
    const investment = (cost * investor.percentage) / 100

    if (!investments[month.format("YYYY")]){
      investments[month.format("YYYY")] = {}
    }
    if (!investments[month.format("YYYY")][investor.name]){
      investments[month.format("YYYY")][investor.name] = [];
    }
    const totalInvestment = investments[month.format("YYYY")][investor.name][monthIndex]

    investments[month.format("YYYY")][investor.name][monthIndex] = totalInvestment ?
      totalInvestment + investment :
      investment
  })
}
