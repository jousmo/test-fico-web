describe("Implementer submission page", () => {
  /*
  * Visits the page before each test
  */
  beforeEach(() => {
    cy.log("Visiting http://localhost:3000/implementer/submissions/1")
    cy.visit("/implementer/submissions/1")
  })
})
