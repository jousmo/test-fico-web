export const investmentDecorator = (concept, month, index, investments) => {
  concept.investmentDistribution?.forEach(investor => {
    const cost = concept.unitCost * concept.monthlyDistribution[index]
    const investment = (cost * investor.percentage) / 100

    if (investments[investor.name] === undefined) {
      investments[investor.name] = [];
    }
    const totalInvestment = investments[investor.name][index]

    investments[investor.name][index] = totalInvestment ?
      totalInvestment + investment :
      investment
  })
}
