// const { reloadApp } = require('detox-expo-helpers');

describe('Example', function () {
  // beforeEach(async () => {
  //   await reloadApp();
  // });

  xit('should have welcome screen', function (done) {
    expect(element(by.text('보고서 작성 시작하기'))).toBeVisible().then(done);
  });

  xit('should show hello screen after tap', function (done) {
    element(by.id('hello_button')).tap().then(done);
    // await expect(element(by.text('Hello!!!'))).toBeVisible();
  });

  xit('should show world screen after tap', async () => {
    // await element(by.id('world_button')).tap();
    // await expect(element(by.text('World!!!'))).toBeVisible();
  });
});
