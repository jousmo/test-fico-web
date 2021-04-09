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
import { loadingAlert, success, withApollo } from "../../../../../../helpers"
import { cloneDeep, omit } from "lodash"
import { AuthCheck } from "../../../../../../helpers/auth/auth-check"
import { apolloError } from "../../../../../../helpers/bugsnag/notify"

function TechnicalMonitoringPage({ client, query }) {
  const { loading, error, data, refetch } = useQuery(submission.queries.getTechnicalMonitoring, {
    client: client,
    variables: { id: query?.id }
  })

  const [saveMonitoring] = useMutation(
    submission.mutations.mutateMonitoring, { client: client }
  )

  const [updateSub] = useMutation(
    submission.mutations.upsertSubmission, { client: client }
  )

  const [createActivityAssistance] = useMutation(
    submission.mutations.createAssistance, { client: client }
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

  const [updateActivity] = useMutation(
    submission.mutations.updateActivity, { client: client }
  )

  const createBeneficiaries = useCallback(async (beneficiaries, isConvert = true) => {
    const saving = loadingAlert(isConvert ? "Creando beneficiarios..." : "Guardando...", 0)
    try {
      if (isConvert) {
        for (const beneficiary of beneficiaries) {
          const { id } = beneficiary
          const data = omit(beneficiary, ['id', 'assistance', 'folio', 'age', 'activities', 'times', 'beneficiary'])
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
      await refetch()
    } catch(e) {
      apolloError(e)
    }
    saving()
  }, [createProjectBeneficiaries, updateProjectAssistants, refetch])

  const updateBeneficiaries = useCallback(async beneficiary => {
    const saving = loadingAlert("Guardando...", 0)
    try {
      const { id, ...data } = beneficiary
      await updateProjectBeneficiaries({ variables: { data, id } })
      if (data?.projectAssistantId) {
        const { projectAssistantId, ...newData } = data
        await updateProjectAssistants({ variables: { data: newData, id: data?.projectAssistantId } })
      }
      success()
      await refetch()
    } catch(e) {
      apolloError(e)
    }
    saving()
  }, [updateProjectBeneficiaries, updateProjectAssistants, refetch])

  const deleteBeneficiaries = useCallback(async (id, projectAssistantId) => {
    const saving = loadingAlert("Eliminando...", 0)
    try {
      await deleteProjectBeneficiaries({ variables: { id } })
      if (projectAssistantId) {
        await updateProjectAssistants({ variables: { data: { beneficiary: false }, id: projectAssistantId } })
      }
      success("Eliminado correctamente")
      await refetch()
    } catch(e) {
      apolloError(e)
    }
    saving()
  }, [deleteProjectBeneficiaries, updateProjectAssistants, refetch])

  const createAssistants = useCallback(async assistant => {
    const saving = loadingAlert("Guardando...", 0)
    try {
      await createProjectAssistants({
        variables: { data: assistant, id: query.id }
      })
      success()
      await refetch()
    } catch(e) {
      apolloError(e)
    }
    saving()
  }, [createProjectAssistants, refetch])

  const createAssistance = useCallback(async assistance => {
    const saving = loadingAlert("Guardando...", 0)
    try {
      await createActivityAssistance({ variables: { data: assistance } })
      await refetch()
      success()
    } catch(e) {
      apolloError(e)
    }
    saving()
  }, [createActivityAssistance, refetch])

  const updateAssistants = useCallback(async assistant => {
    const saving = loadingAlert("Guardando...", 0)
    try {
      const { id, ...data } = assistant
      await updateProjectAssistants({ variables: { data, id } })
      success()
      await refetch()
    } catch(e) {
      apolloError(e)
    }
    saving()
  }, [updateProjectAssistants, updateProjectBeneficiaries, refetch])

  const deleteAssistants = useCallback(async id => {
    const saving = loadingAlert("Eliminando...", 0)
    try {
      await deleteProjectAssistants({ variables: { id } })
      success("Eliminado correctamente")
      await refetch()
    } catch(e) {
      apolloError(e)
    }
    saving()
  }, [deleteProjectAssistants, refetch])

  const updateSubmission = useCallback(async submission => {
    const saving = loadingAlert("Guardando...", 0)
    try {
      await updateSub({
        variables: { data: { ...submission, id: query.id } }
      })
      success()
    }
    catch(e) {
      apolloError(e)
    }
    saving()
  }, [updateSub])

  const save = useCallback(async monitoring => {
    const saving = loadingAlert("Guardando...", 0)
    try {
      await saveMonitoring({
        variables: { data: { ...monitoring, submission: query.id } }
      })
      success()
      await refetch()
    }
    catch(e) {
      apolloError(e)
    }
    saving()
  }, [saveMonitoring, refetch])

  const update = useCallback(async monitoring => {
    const saving = loadingAlert("Guardando...", 0)
    const newMonitoring = cloneDeep(monitoring)

    newMonitoring.participants = [...newMonitoring.participants]
      ?.map(({uuid, ...p}) => p)

    try {
      await saveMonitoring({
        variables: { data: newMonitoring }
      })
      success()
      await refetch()
    }
    catch(e) {
      apolloError(e)
    }
    saving()
  }, [saveMonitoring, refetch])

  const saveActivity = useCallback(async activity => {
    const saving = loadingAlert("Guardando...", 0)
    try {
      await updateActivity({
        variables: { data: activity }
      })
    }
    catch(e) {
      apolloError(e)
    }
    saving()
  }, [updateActivity])

  const injectActions = useMemo(() => ({
    createBeneficiaries,
    updateBeneficiaries,
    deleteBeneficiaries,
    createAssistants,
    updateAssistants,
    deleteAssistants,
    updateSubmission,
    createAssistance,
    saveActivity,
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
