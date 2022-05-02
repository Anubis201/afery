describe('check start page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('visits the initial project page', () => {
    cy.title().should('equal', 'Polityka i inne tematy - Afery')
    cy.get('meta[name="description"]').should('have.attr', 'content', 'Afery naszych polityków, partii i innych osobistości. Mamy miejsce, gdzie możesz pogadać o wszystkim bez żadnej cenzury oraz miejsce, gdzie zbieramy sondaże (nie tylko partii).')
  })

  it('check important article and short comments', () => {
    cy.get('app-important-article a').should('have.length', 1);
    //comments
    cy.get('app-important-article .article__comments button').click();
    cy.get('mat-dialog-container').should('have.length', 1);
    cy.get('mat-dialog-actions button').click();
  })

  it('some articles visibility', () => {
    cy.get('app-article').should('not.have.length', 0);
  })

  it('marquee exist', () => {
    cy.get('marquee a>span').should('not.have.length', 0);
  })

  it('verify navigation bar pc', () => {
    cy.get('.jd a').should('have.length', 4);
  })

  it('verify mobile bar', () => {
    cy.get('.mobile-menu').click();
    cy.get('app-aside-menu .item a').should('have.length', 5);
    cy.get('.socials a').should('have.length', 2);
    cy.get('.mobile-menu').click();
    cy.get('app-aside-menu').should('have.length', 0);
  })
})
