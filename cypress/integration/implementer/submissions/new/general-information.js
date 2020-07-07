describe("Submission new general information page", () => {
  /*
  * Visits the page before each test
  */
  beforeEach(() => {
    cy.log(`Visiting http://localhost:3000/implementer/submissions
    /new/general-information`)
    cy.visit("/implementer/submissions/new/general-information")
  })
})
