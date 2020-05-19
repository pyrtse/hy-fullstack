describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'testi',
      name: 'testi',
      password: 'testi'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testi')
      cy.get('#password').type('testi')

      cy.get('html').should('contain', 'testi logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testi')
      cy.get('#password').type('wrong')

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'testi logged in')
    })
  })

  describe.only('When Logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testi', password: 'testi' })
    })

    it('A blog can be created', function () {
      cy.contains('create blog').click()
      cy.get('#title').type('otsikko')
      cy.get('#author').type('kirjoittaja')
      cy.get('#url').type('url')
      cy.get('#create-blog-button').click()

      cy.get('html').should('contain', 'otsikko')
      cy.get('html').should('contain', 'kirjoittaja')
    })

    describe('When blog created', function () {
      this.beforeEach(function () {
        cy.contains('create blog').click()
        cy.get('#title').type('otsikko')
        cy.get('#author').type('kirjoittaja')
        cy.get('#url').type('url')
        cy.get('#create-blog-button').click()
      })

      it('A blog can be liked', function () {
        cy.contains('view').click()
        cy.get('.blog').should('contain', 'likes 0')
        cy.get('.like-button').click()
        cy.get('.blog').should('contain', 'likes 1')
      })

      it('A blog can be deleted', function () {
        cy.contains('view').click()
        cy.get('.blog').should('contain', 'Remove')
        cy.contains('Remove').click()
        cy.get('html').should('not.contain', '.blog')
      })
    })

    it.only('Blogs in correct orded ', function () {
      cy.contains('create blog').click()
      cy.get('#title').type('otsikko')
      cy.get('#author').type('kirjoittaja')
      cy.get('#url').type('url')
      cy.get('#create-blog-button').click()
      cy.contains('view').click()
      cy.get('.like-button').click()
      cy.contains('create blog').click()
      cy.get('#title').clear().type('otsikko2')
      cy.get('#author').clear().type('kirjoittaja2')
      cy.get('#url').clear().type('url2')
      cy.get('#create-blog-button').click()
      cy.get('.open-blog-button').click()
      cy.get('.blog').then(($blogs) => {
        const blogArray = $blogs.toArray()
        expect(parseInt(blogArray[0].getElementsByClassName('blog-likes')[0].getAttribute('test-data'))).to.be.greaterThan(parseInt(blogArray[1].getElementsByClassName('blog-likes')[0].getAttribute('test-data')))
      })
    })
  })
})