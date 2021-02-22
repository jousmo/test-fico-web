export const decoratedData = data => {
  const projectsByYear = {}
  data?.Implementer?.projects?.forEach(project => {
    if (!(project.year in projectsByYear)) {
      projectsByYear[project.year] = [project]
    } else {
      projectsByYear[project.year].push(project)
    }
  })

  return Object.keys(projectsByYear)?.map(key => {
    const result = { year: key, PRIVATE: 0, PUBLIC: 0, OWN: 0, total: 0 }
    projectsByYear[key]?.forEach(project => {
      project.financing?.forEach(el => {
        result[el.type] += el.amount
        result.total += el.amount
      })
    })
    return result
  })
}
