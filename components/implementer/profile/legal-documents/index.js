import { Section } from "../../../shared";
import { LegalDocumentsForm } from "./form";
import { useContext } from "react";
import { ImplementerProfileContext } from "../../../../contexts/implementer/profile";

export function LegalDocuments() {
  const { isGovernment } = useContext(ImplementerProfileContext)

  return (
    <Section title="3. Documentos legales">
      <LegalDocumentsForm isGovernment={isGovernment()} />
    </Section>
  )
}
