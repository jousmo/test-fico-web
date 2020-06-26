describe("Implementer profile page", () => {
  /*
  * Visits the page before each test
  */
  beforeEach(() => {
    cy.log("Visiting http://localhost:3000/implementer/profile")
    cy.visit("/implementer/profile")
  })

  /** Header section **/
  it("Should have a title", () => {
    cy.get(".ant-page-header-heading-title")
      .should("have.length", 1)
  })

  it("Title should be Perfil de la implementadora", () => {
    cy.get(".ant-page-header-heading-title")
      .should("contain", "Perfil de la implementadora")
  })

  /** Page content section **/
  it("Page content should have 5 sections", () => {
    cy.get(".page-content")
      .children().should("contain", 5)
  })

  it("Three sections when type is government", () => {
    cy.get("#general-information")
      .find(".ant-select")
      .find(".ant-select-selection-item")
      .should("have.text", "Organizacion civil")

    cy.get("#general-information")
      .find(".ant-select")
      .first()
      .click()
      .type("{downarrow}")
      .type("{enter}")

    cy.get(".page-content")
      .children().should("contain", 3)
  })
})
