/// <reference types="cypress" />

describe('cypress E2E test', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    Cypress.Cookies.preserveOnce('access_token');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('should proceed signup', () => {
    cy.contains('회원가입').click();
    cy.get('[placeholder="Name"]').type('cypress');
    cy.get('[placeholder="Email Address"]').type('cypress@gmail.com');
    cy.get('[placeholder="Password"]').type('cycycycy');
    cy.get('[placeholder="Confirmation"]').type('cycycycy');
    cy.get('form').submit().wait(2000);
  });

  it('should be possible to visit problems page', () => {
    cy.contains('지금 시작해보세요!').click().wait(2000);
    cy.get('.title').eq(0).click().wait(2000);
  });

  it('should be working problem solving', () => {
    cy.contains('제출').click();
    cy.get('[aria-label="failure"]').should('have.text', '💔').wait(2000);
    cy.get('.sc-fzqNqU').click();

    cy.get('.cm-comment').type('\n에러');
    cy.contains('제출').click();
    cy.get('[aria-label="failure"]').should('have.text', '💔').wait(2000);
    cy.get('.sc-fzqNqU').click();

    cy.contains('초기화').click();
    cy.get('.cm-comment').should('have.text', '// your code..');
    cy.get('.cm-comment').type('\nconst hash = {}; [...string].forEach(char => (hash[char] ? hash[char]++ : (hash[char] = 1))); for (let char in hash) { if (hash[char] === 1) return char; } // ', { parseSpecialCharSequences: false });
    cy.contains('제출').click();
    cy.get('[aria-label="success"]').should('have.text', '💙').wait(2000);
    cy.get('.sc-fzqNqU').click();

    cy.contains('솔루션 리스트').click().wait(2000);
  });

  it('should be possible to visit solutions page', () => {
    cy.contains('cypress');
    cy.contains('cypress@gmail.com');
    cy.get('.avatar').eq(0).click().wait(2000);
  });

  it('should be possible to visit profile page', () => {
    cy.get('.number').eq(0).should('have.text', '1');
    cy.get('.number').eq(1).should('have.text', '100');
    cy.get('.number').eq(2).should('have.text', '3').wait(2000);
  });

  it('should proceed logout', () => {
    cy.contains('로그아웃').click();
    cy.contains('로그인');
    cy.contains('회원가입');
  });
});
