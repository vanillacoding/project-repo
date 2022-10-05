describe('Actions', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('Visit login page', () => {
    cy.get('.button-login').click()
      .get('.text-wrap').children().eq(0).contains('Sign in');
  });

  it('[Case 1] Countries that match option selected should be displayed', () => {
    cy.get('.logo > a').click()
      .get('select').first().select('EUROPE')
      .get('select').eq(1).select('31')
      .get('#france').should('have.css', 'fill', 'rgb(44, 100, 255)');
  });

  it('[Case 2] Countries that match option selected should be displayed', () => {
    cy.get('select').first().select('AMERICA')
      .get('select').eq(1).select('25')
      .get('select').eq(2).select('12')
      .get('#argentina').should('have.css', 'fill', 'rgb(44, 100, 255)');
  });

  it('Warning is displayed if no country meets conditions', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('select').first().select('ASIA')
      .get('select').eq(1).select('31')
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('선택하신 조건에 맞는 나라가 없습니다.');
      });
  });

  it('Information on the selected country should be displayed', () => {
    cy.get('#canada').click()
      .get('.lnb').scrollIntoView({ duration: 1000, easing: 'swing' })
      .get('.description > section').first().children().eq(1)
      .wait(1000)
      .contains('캐나다');
  });

  it('Information should be displayed according to the lnb selected', () => {
    cy.get('.lnb').scrollIntoView({ duration: 1000, easing: 'swing' }).children().children().eq(1).click()
      .get('.description > section').first().children().first()
      .wait(1000)
      .contains('신청 기간');
  });

  it('Clicking on a hashtag should be take user to that hashtag\'s page', () => {
    cy.get('textarea').scrollIntoView({ duration: 1000, easing: 'swing' })
      .get('.comment-wrap').children().first().children().eq(1).children().children().eq(0).click()
      .get('.banner > h2').contains('#토론토')
      .get('.comment').eq(1).children().eq(1).children().children().eq(1).contains('#토론토');
  });
});
