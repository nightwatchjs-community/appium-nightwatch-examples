const Device = require('selenium-webdriver/lib/input').Pointer;
describe('Nightwatch Website tests', function() {
 
  it('Searching the Rijksmuseum ', async function(){
    browser.navigateTo('https://www.rijksmuseum.nl/en');
    const cookieDialogVisible = await browser.isVisible({
      selector: '.cookie-consent-bar-wrap',
      suppressNotFoundErrors: true
    });
  
    if (cookieDialogVisible) {
      browser.click('.cookie-consent-bar-wrap button.link');
    }
    browser.pause(1000).click('a[aria-label="Search"]');

    return browser.setValue('input.search-bar-input[type=text]', ['night watch'])
      .click('button.button.search-bar-button')
      .pause(1000)
      .assert.containsText('.search-results', 'The Night Watch, Rembrandt van Rijn, 1642');
  });

  
  xit('swipe down and zoom in the page - native gestures api', function() {
    // using appium non-standard gestures api.
    browser.execute('mobile: swipe', {direction: 'up', velocity: 5000}); // swipe up the page
    browser.execute('mobile: pinch', {scale: '1.5', velocity: 1.1}); // zoom in
    browser.pause(4000);
  });


  it('swipe down and zoom in the page - w3c actions api ', async function(){
    //Scroll down the page
    await  browser.perform(function(){
      const actions = this.actions();
      
      return actions.move({x: 100, y: 100}).press().move({origin: 'pointer', y: -300, duration: 50}).release();
    });

    await browser.pause(2000);
    
    //Pinch zoom
    await browser.perform(function(){
      const actions= this.actions();
      const pointer1 = new Device('finger-1', 'touch');
      const pointer2 = new Device('finger-2', 'touch');
      actions.insert(pointer1, pointer1.move({duration: 0, x: 100, y: 70}), pointer1.press(), {type: 'pause', duration: 500}, pointer1.move({duration: 1000, origin: 'pointer', x: 0, y: -20}), pointer1.release());
      actions.insert(pointer2, pointer2.move({duration: 0, x: 100, y: 100}), pointer2.press(), {type: 'pause', duration: 500}, pointer2.move({duration: 1000, origin: 'pointer', x: 0, y: 20}), pointer2.release());

      return actions;       
    });
  });

    
});