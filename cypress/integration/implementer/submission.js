describe("Implementer submission page", () => {
  /*
  * Visits the page before each test
  */
  beforeEach(() => {
    cy.log("Visiting http://localhost:3000/implementer/submissions/1")
    cy.visit("/implementer/submissions/1")
  })

  /** Header section **/
  it("Should have user header", () => {
    cy.get(".ant-layout-header")
      .get(".ant-page-header-heading")
      .get("#user_avatar")
      .should("have.length", 1)

    cy.get(".ant-layout-header")
      .get(".ant-page-header-heading-extra")
      .get("#search")
      .should("have.length", 1)

    cy.get(".ant-layout-header")
      .get(".ant-page-header-heading-extra")
      .get("#notifications")
      .should("have.length", 1)
  })
})
