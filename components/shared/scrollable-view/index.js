export function ScrollableView({ contentWidth = "1000px", children }) {
  return (
    <div class="fico scrollable-view">
      <div style={{minWidth: contentWidth}}>
        {children}
      </div>
    </div>
  )
}
