describe("Index page", () => {
  /*
  * Visits the page before each test
  */
  beforeEach(() => {
    cy.log(`Visiting http://localhost:3000`)
    cy.visit("/")
  })

  /** Title section **/
  it("Should have a title", () => {
    cy.get(".ant-typography").should("have.length", 1)
  })

  it("Title should be Homepage", () => {
    cy.get(".ant-typography").should("have.text", "Homepage")
  })
})
