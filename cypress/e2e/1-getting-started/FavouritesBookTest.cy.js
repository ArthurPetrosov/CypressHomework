const book1 = {
    title: "Книга 1",
    description: "Рассказ",
    author: "Иванов",
  };
  
  const book2 = {
    title: "Книга 2",
    description: "Фантастика",
    author: "Петров",
  };
  
  const book3 = {
    title: "Книга 3",
    description: "Стихи",
    author: "Сергеев",
  };
  
  describe("opening a page Books", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("displays items by default", () => {
      cy.contains("Books list").should("have.length", 1);
      cy.contains("Log in").should("have.length", 1);
    });
  });
  
  describe("Favorite book spec", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.login("test@test.com", "test");
    });
  
    it("Should add new book", () => {
      cy.addBook(book1);
      cy.get(".card-title").should("contain.text", book1.title);
    });
  
    it("Should add new book to favorite", () => {
      cy.addFavoriteBook(book2);
      cy.visit("/favorites");
      cy.get(".card-title").should("contain.text", book2.title);
    });
  
    it("Should add book to favorite through 'Book list' page", () => {
      cy.addBook(book1);
      cy.contains(book1.title)
        .should("be.visible")
        .within(() => cy.get(".card-footer > .btn").click({ force: true }));
      cy.visit("/favorites");
      cy.contains(book1.title).should("be.visible");
    });
  
    it("Should delete book from favorite", () => {
      cy.visit("/favorites");
      cy.contains(book2.title)
        .should("be.visible")
        .within(() => cy.get(".card-footer > .btn").click({ force: true }));
      cy.contains(book2.title).should("not.exist");
    });
  });