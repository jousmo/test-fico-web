export function Visibility({visible = true, children}) {
  return visible === true ? children : null
}
