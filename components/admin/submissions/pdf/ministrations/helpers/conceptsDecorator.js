import { monthsDecorator } from "./monthsDecorator"

export const conceptsDecorator = (concepts, months, investments) => {
  concepts?.forEach(concept => monthsDecorator(concept, months, investments))
}
