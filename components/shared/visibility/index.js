export function Visibility({visible = true, children}) {
  return visible ? children : null
}
