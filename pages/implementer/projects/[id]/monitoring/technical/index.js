import { Layout } from "../../../../../../components/shared"
import { PageContext } from "../../../../../../contexts/page"
import { withApollo } from "../../../../../../helpers/withApollo"
import {
  AdminSubmissionContext
} from "../../../../../../contexts/admin/submissions/show"
import {
  TechnicalMonitoring
} from "../../../../../../components/admin/projects/monitoring"
import { submission } from "../../../../../../graphql/submission"
import React, { useCallback, useMemo } from "react"
import { useMutation, useQuery } from "@apollo/react-hooks"
import { loadingAlert, success, warning } from "../../../../../../helpers/alert"
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

  const createBeneficiaries = useCallback(async beneficiaries => {
    const saving = loadingAlert("Creando beneficiarios", 0)
    try {
      for (const beneficiary of beneficiaries) {
        const { id } = beneficiary
        const data = omit(beneficiary, ['id', 'folio', 'age', 'activities', 'times', 'beneficiary'])
        data.projectAssistantId = id
        await createProjectBeneficiaries({ variables: { data, id: query.id } })
        await updateProjectAssistants({ variables: { data: { beneficiary: true }, id } })
      }
      success()
      saving()
      refetch()
    } catch(e) {
      warning()
      console.error(e)
    }
  }, [createProjectBeneficiaries, updateProjectAssistants, refetch])

  const createAssistants = useCallback(async assistant => {
    const saving = loadingAlert("Guardando", 0)
    try {
      await createProjectAssistants({
        variables: { data: assistant, id: query.id }
      })
      success()
      saving()
      refetch()
    } catch(e) {
      warning()
      console.error(e)
    }
  }, [createProjectAssistants, refetch])

  const updateAssistants = useCallback(async assistant => {
    const saving = loadingAlert("Actualizando", 0)
    try {
      const { id, ...data } = assistant
      await updateProjectAssistants({ variables: { data, id } })
      success("Actualizado correctamente")
      saving()
      refetch()
    } catch(e) {
      warning()
      console.error(e)
    }
  }, [updateProjectAssistants, refetch])

  const deleteAssistants = useCallback(async id => {
    const saving = loadingAlert("Eliminando", 0)
    try {
      await deleteProjectAssistants({ variables: { id } })
      success("Eliminado correctamente")
      saving()
      refetch()
    } catch(e) {
      warning()
      console.error(e)
    }
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
      console.error(e)
    }
  }, [updateMonitoring, refetch])

  const injectActions = useMemo(() => ({
    createBeneficiaries,
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
      value={{ type: "admin", step: "active", submenu: "projects" }}>
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
