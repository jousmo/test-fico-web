import { Skeleton, Alert } from "antd"

export function withForm(func) {
  return function component({
    data = true,
    onChange,
    error = false,
    isLoading,
    ...props
  }) {
    if(isLoading) {
      return <Skeleton active />
    }

    if(!data || error) {
      return (
        <Alert
          message="Error"
          description="Ha ocurrido un error al cargar los datos de esta sección,
          por favor actualiza la página."
          type="error"
          showIcon />
      )
    }

    return func({data, onChange, error, isLoading, ...props})
  }
}
