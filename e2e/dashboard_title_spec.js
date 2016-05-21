describe('SmartHouse homepage', () => {
    it('should check page title', () => {
        browser.get(browser.baseUrl);
		expect(element.all("//h1[text()='Smart House']"));
    });
});