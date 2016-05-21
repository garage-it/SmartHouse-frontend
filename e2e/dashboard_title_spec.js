describe('SmartHouse homepage', () => {
    it('should check page title', () => {
        browser.get('https://garage-it-smart-house.herokuapp.com/');
		expect(element.all("//h1[text()='Smart House']"));
    });
});