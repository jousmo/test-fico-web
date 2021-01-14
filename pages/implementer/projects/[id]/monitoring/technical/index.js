import { Layout } from "../../../../../../components/shared"
import { PageContext } from "../../../../../../contexts"
import {
  AdminSubmissionContext
} from "../../../../../../contexts/admin/submissions/show"
import {
  TechnicalMonitoring
} from "../../../../../../components/admin/projects/monitoring"
import { submission } from "../../../../../../graphql"
import React, { useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { Bugsnag, loadingAlert, success, warning, withApollo } from "../../../../../../helpers"
import { cloneDeep, omit } from "lodash"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"

function TechnicalMonitoringPage({ client, query }) {
  const { loading, error, data, refetch } = useQuery(submission.queries.getById, {
    client: client,
    variables: { id: query?.id }
  })

  const [createMonitoring] = useMutation(
    submission.mutations.createMonitoring, { client: client }
  )

  const [updateMonitoring] = useMutation(
    submission.mutations.updateMonitoring, { client: client }
  )

  const [updateSub] = useMutation(
    submission.mutations.updateById, { client: client }
  )

  const [createProjectAssistants] = useMutation(
    submission.mutations.createProjectAssistants, { client: client }
  )

  const [createProjectBeneficiaries] = useMutation(
    submission.mutations.createProjectBeneficiaries, { client: client }
  )

  const [updateProjectAssistants] = useMutation(
    submission.mutations.updateProjectAssistants, { client: client }
  )

  const [deleteProjectAssistants] = useMutation(
    submission.mutations.deleteProjectAssistants, { client: client }
  )

  const [updateProjectBeneficiaries] = useMutation(
    submission.mutations.updateProjectBeneficiaries, { client: client }
  )

  const [deleteProjectBeneficiaries] = useMutation(
    submission.mutations.deleteProjectBeneficiaries, { client: client }
  )

  const createBeneficiaries = useCallback(async (beneficiaries, isConvert = true) => {
    const saving = loadingAlert(isConvert ? "Creando beneficiarios" : "Guardando", 0)
    try {
      if (isConvert) {
        for (const beneficiary of beneficiaries) {
          const { id } = beneficiary
          const data = omit(beneficiary, ['id', 'folio', 'age', 'activities', 'times', 'beneficiary'])
          data.projectAssistantId = id
          await createProjectBeneficiaries({ variables: { data, id: query.id } })
          await updateProjectAssistants({ variables: { data: { beneficiary: true }, id } })
        }
      } else {
        await createProjectBeneficiaries({
          variables: { data: beneficiaries, id: query.id }
        })
      }
      success()
      refetch()
    } catch(e) {
      warning()
      Bugsnag.notify(new Error(e))
      console.error(e)
    }
    saving()
  }, [createProjectBeneficiaries, updateProjectAssistants, refetch])

  const updateBeneficiaries = useCallback(async beneficiary => {
    const saving = loadingAlert("Actualizando", 0)
    try {
      const { id, ...data } = beneficiary
      await updateProjectBeneficiaries({ variables: { data, id } })
      if (data?.projectAssistantId) {
        const { projectAssistantId, ...newData } = data
        await updateProjectAssistants({ variables: { data: newData, id: data?.projectAssistantId } })
      }
      success("Actualizado correctamente")
      refetch()
    } catch(e) {
      warning()
      Bugsnag.notify(new Error(e))
      console.error(e)
    }
    saving()
  }, [updateProjectBeneficiaries, updateProjectAssistants, refetch])

  const deleteBeneficiaries = useCallback(async (id, projectAssistantId) => {
    const saving = loadingAlert("Eliminando", 0)
    try {
      await deleteProjectBeneficiaries({ variables: { id } })
      if (projectAssistantId) {
        await updateProjectAssistants({ variables: { data: { beneficiary: false }, id: projectAssistantId } })
      }
      success("Eliminado correctamente")
      refetch()
    } catch(e) {
      warning()
      Bugsnag.notify(new Error(e))
      console.error(e)
    }
    saving()
  }, [deleteProjectBeneficiaries, updateProjectAssistants, refetch])

  const createAssistants = useCallback(async assistant => {
    const saving = loadingAlert("Guardando", 0)
    try {
      await createProjectAssistants({
        variables: { data: assistant, id: query.id }
      })
      success()
      refetch()
    } catch(e) {
      Bugsnag.notify(new Error(e.graphQLErrors[0].message))
      warning(e.graphQLErrors[0].message)
      console.error(e)
    }
    saving()
  }, [createProjectAssistants, refetch])

  const updateAssistants = useCallback(async assistant => {
    const saving = loadingAlert("Actualizando", 0)
    try {
      const { id, ...data } = assistant
      await updateProjectAssistants({ variables: { data, id } })
      success("Actualizado correctamente")
      refetch()
    } catch(e) {
      warning()
      Bugsnag.notify(new Error(e))
      console.error(e)
    }
    saving()
  }, [updateProjectAssistants, updateProjectBeneficiaries, refetch])

  const deleteAssistants = useCallback(async id => {
    const saving = loadingAlert("Eliminando", 0)
    try {
      await deleteProjectAssistants({ variables: { id } })
      success("Eliminado correctamente")
      refetch()
    } catch(e) {
      warning()
      Bugsnag.notify(new Error(e))
      console.error(e)
    }
    saving()
  }, [deleteProjectAssistants, refetch])

  const updateSubmission = useCallback(async submission => {
    try {
      await updateSub({
        variables: { data: submission, id: query.id }
      })
      success()
    }
    catch(e) {
      warning()
      Bugsnag.notify(new Error(e))
      console.error(e)
    }
  }, [updateSub])

  const save = useCallback(async monitoring => {
    try {
      await createMonitoring({
        variables: { data: monitoring, id: query.id }
      })
      success()
      refetch()
    }
    catch(e) {
      warning()
      Bugsnag.notify(new Error(e))
      console.error(e)
    }
  }, [createMonitoring, refetch])

  const update = useCallback(async monitoring => {
    const newMonitoring = cloneDeep(monitoring)
    const { id, ...updatedMonitoring } = newMonitoring

    updatedMonitoring.participants = [...updatedMonitoring.participants]
      .map(({uuid, ...p}) => p)

    try {
      await updateMonitoring({
        variables: { data: updatedMonitoring, id: id }
      })
      success()
      refetch()
    }
    catch(e) {
      warning()
      Bugsnag.notify(new Error(e))
      console.error(e)
    }
  }, [updateMonitoring, refetch])

  const injectActions = useMemo(() => ({
    createBeneficiaries,
    updateBeneficiaries,
    deleteBeneficiaries,
    createAssistants,
    updateAssistants,
    deleteAssistants,
    updateSubmission,
    loading,
    update,
    error,
    data,
    save
  }), [loading, data])

  return (
    <PageContext.Provider
      value={{ type: "implementer", step: "active", submenu: "projects" }}>
      <AdminSubmissionContext.Provider value={injectActions}>
        <Layout subheader={false}>
          <TechnicalMonitoring />
        </Layout>
      </AdminSubmissionContext.Provider>
    </PageContext.Provider>
  )
}

export async function getServerSideProps(ctx){
  return AuthCheck(ctx, "IMPLEMENTER")
}

export default withApollo(TechnicalMonitoringPage)
