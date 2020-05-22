import { investmentDecorator } from "./investmentDecorator"

export const monthsDecorator = (concept, months, investments) => {
  months?.forEach((month, index) =>
    investmentDecorator(concept, month, index, investments))
}
