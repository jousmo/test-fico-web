export const investmentDecorator = (concept, month, index, investments) => {
  concept.investmentDistribution?.forEach(investor => {
    const cost = concept.unitCost * concept.monthlyDistribution[index]
    const investment = (cost * investor.percentage) / 100

    if (!investments[month.format("YYYY")]){
      investments[month.format("YYYY")] = {}
    }
    if (!investments[month.format("YYYY")][investor.name]){
      investments[month.format("YYYY")][investor.name] = [];
    }
    const totalInvestment = investments[month.format("YYYY")][investor.name][index]

    investments[month.format("YYYY")][investor.name][index] = totalInvestment ?
      totalInvestment + investment :
      investment
  })
}
