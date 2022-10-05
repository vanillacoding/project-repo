describe('<cypress>', () => {
  const payload = {
    email: 'eunbink98@gmail.com',
    name: 'eunbin kim',
    picture_url: 'https://lh3.googleusercontent.com/a/AATXAJyFbxDGoqo7D6N_Vz6s1YlrrNa2GFKJVlDobCx8=s96-c',
  };
  let user;

  before(() => {
    cy.clearLocalStorage();
    cy.exec('npm run start');
    cy
      .request({
        method: 'POST',
        url: 'http://growing-green-server.online/users/login',
        followRedirect: false,
        failOnStatueCode: false,
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      })
      .then((res) => {
        user = JSON.stringify(res.body)
        localStorage.setItem('user', user);
      })
    cy.visit('http://localhost:3000');
  });

  beforeEach(() => {
    localStorage.setItem('user', user);
  })

  it('<select plant>', () => {
    cy
      .contains('S T A R T')
      .click()
    cy
      .intercept('GET', `https://growing-green-server.online/plants/popular`)
      .as('requestPopularPlant');
    cy.wait('@requestPopularPlant')
    cy
      .get('div input')
      .type('장미')
      .type('{enter}')
    cy
      .get('a h3')
      .contains('장미')
      .click()
  });

  it('<create plant>', () => {
    cy
      .get('input#nickname')
      .type('씩씩이')
    cy
      .get('img[alt="adult default plant"]')
      .click()
    cy
      .get('label')
      .contains('2단계')
      .click()
    cy
      .get('button[type="submit"]')
      .click()
  });

});