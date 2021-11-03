describe('Nightwatch Website tests', function() {
    it('Check verison of nightwatch ', function(){
        browser.url('https://nightwatchjs.org')
        .assert.attributeContains('#bd-versions','text','1.7.10');
    })
})