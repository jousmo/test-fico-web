import { Section } from "../../../shared";
import { GovernmentForm } from "./form";
import { ImplementerProfileContext } from "../../../../contexts/implementer/profile";
import { useContext } from "react";

export function Government() {
  const {
    updateGeneralInformation,
    loading,
    error,
    data
  } = useContext(ImplementerProfileContext)

  return (
    <Section title="5. Gobernanza">
      <GovernmentForm
        data={data}
        isLoading={loading}
        error={error} />
    </Section>
  )
}
