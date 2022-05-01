describe('check start page', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.title().should('equal', 'Polityka i inne tematy - Afery')
    cy.get('meta[name="description"]').should('have.attr', 'content', 'Afery naszych polityków, partii i innych osobistości. Mamy miejsce, gdzie możesz pogadać o wszystkim bez żadnej cenzury oraz miejsce, gdzie zbieramy sondaże (nie tylko partii).')
  })
})
