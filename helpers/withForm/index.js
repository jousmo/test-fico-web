import { Skeleton, Alert } from "antd"
import { Bugsnag } from "../bugsnag"

export function withForm(func) {
  return function component({
    data,
    onChange,
    error,
    isLoading,
    ...props
  }) {
    if(isLoading) {
      return <Skeleton active />
    }

    if(!data || error) {
      if (error) {
        Bugsnag.notify(new Error(error))
      }
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
