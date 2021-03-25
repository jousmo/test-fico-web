export const getActivities = submission => {
  return submission.specificObjectives.reduce((prev, current) => {
    prev.push(...current.activities)
    return prev
  }, [])
}
