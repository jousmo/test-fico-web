export function ScheduleBox({ color }) {
  const styles = {
    backgroundColor: color,
    height: "2rem",
    width: "100%",
    borderRadius: "3px"
  }

  return (
    <div className="box" style={styles} />
  )
}
