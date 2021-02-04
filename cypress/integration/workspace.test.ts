context("Test the overall app", () => {
  beforeEach(() => {
    cy.visit("");
  });

  describe("Desktop functionalities", () => {
    it("renders app", () => {
      cy.get("[data-testid=app]").should("be.visible");
    });
  });
});
