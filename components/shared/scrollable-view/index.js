export function ScrollableView({ contentWidth = "1000px", children }) {
  return (
    <div className="fico scrollable-view">
      <div style={{minWidth: contentWidth}}>
        {children}
      </div>
    </div>
  )
}
