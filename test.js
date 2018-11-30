const puppeteer = require('puppeteer');
const mocha = require('mocha');
const {expect} = require('chai');

var document

describe('Create Element', function () {
    let page;
    let browser;
    before(async function() {
        browser = await puppeteer.launch({headless: false});
        page = await browser.newPage();
        await page.goto('file://' + __dirname + '/test.html');
    });


    after(async function () {
        //await browser.close();
    });

    it('should have the correct page title', async function () {
        expect(await page.title()).to.eql('htmlUtil Test');
    });

    it('should have the', async function () {
        let e = await page.waitFor('.main-content');
        
        document = e.ownerDocument;
        let d2 = document.createElement('div');
        e.appendChild(d2);
        expect(document).not.null;
    });
});
