import { Children } from "react";

describe('URL Shortener page flows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      fixture: "sampleData.json"
    }).as("shortUrls")
    cy.visit('http://localhost:3000')
  });

  it('Should show a title and any existing shortened URLs to a user', () => {
    cy.get('h1').contains("URL Shortener")
    .get('.url').contains('Awesome photo')
    .get('.url').contains('http://localhost:3001/useshorturl/1')
  });

  it('Should show a form with the proper inputs', () => {
    cy.get('form').should('exist')
    .get('input[placeholder="Title..."]')
    .get('input[placeholder="URL to Shorten..."]')
    .get('button').contains('Shorten Please!')
  });

  it('Should let the user fill out the form with a title and url to shorten', () => {
    cy.get('input[placeholder="Title..."]').type('Happy Pup')
    .get('input[placeholder="Title..."]').should('have.value', 'Happy Pup')
    .get('input[placeholder="URL to Shorten..."]').type('https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')
    .get('input[placeholder="URL to Shorten..."]').should('have.value', 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')
  })

  it('Should show the new shortenedURL when a user fills out and submits the form', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: {
        title: "happy pup",
        long_url: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        id: 2,
        short_url: "http://localhost:3001/useshorturl/2"
      }
    })
    .get('input[placeholder="Title..."]').type('Happy Pup')
    .get('input[placeholder="URL to Shorten..."]').type('https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZG9nc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')
    .get('button').click()
  })
});