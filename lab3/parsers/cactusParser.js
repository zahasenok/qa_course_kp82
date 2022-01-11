require('chromedriver');
const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');

const {FILE_OUTPUT, BUFFER_SIZE} = require('./config');
const {FileLoader} = require('./loaders/fileLoader');


class CactusParser{
    constructor(listUrl){
        if (listUrl.endsWith('/'))
            this.listUrl = listUrl;
        else
            this.listUrl = listUrl + '/';

        this.driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        this.toSaveData = [];
        this.loader = new FileLoader(FILE_OUTPUT);
    }

    async getProductsLinks(url){
        try{
            await this.driver.get(url)
            const links = await this.driver.findElements(
                By.xpath('//a[@class="thumbnail product-thumbnail"'));
    
            const clearLinks = [];
            for (let item of links){
                clearLinks.push(await item.getAttribute('href'));
            }
            return clearLinks;
        }catch (e){
            await this.catchError(e)
            return [];
        }
        
    }

    async getProductProps(productUrl){
        try{
            await this.driver.get(productUrl);
            const title = await this.driver.findElements(By.tagName('h1'))[0];
            this.toSaveData.push(await title.getText());
        }catch (e){
            await this.catchError(e);
            return null;
        }
    }

    async catchError(e){
        await this.driver.quit();
        console.log(`GOT AN ERROR: ${e}`);
    }
}