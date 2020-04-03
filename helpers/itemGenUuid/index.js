import { v4 as uuid } from "uuid"

export function itemGenUuid(i) {
  i.uuid = uuid()
  return i
}
