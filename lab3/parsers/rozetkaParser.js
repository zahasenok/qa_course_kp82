require('chromedriver');
const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');

const {FILE_OUTPUT, BUFFER_SIZE} = require('./config');
const {FileLoader} = require('./loaders/fileLoader');


class RozetkaParser {
    constructor(listUrl){
        if (listUrl.endsWith('/'))
            this.listUrl = listUrl;
        else
            this.listUrl = listUrl + '/';

        this.toSaveData = [];
        this.driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();

        this.loader = new FileLoader(FILE_OUTPUT);
    }

    async getPagesCount(){
        try{
            await this.driver.get(this.listUrl);
            const paginatorElements = await this.driver.findElements(By.className("pagination__link"));
            return await paginatorElements[paginatorElements.length-1].getText();
        }catch (e ){
            await this.catchError(e);
            return 0;
        };
    };

    async getProductLinks(url){
        try{
            console.log(url)
            await this.driver.get(url)
            const productLinks = await this.driver.findElements(By.className('goods-tile__picture'));
            const clearLinks = [];
            for (let item of productLinks){
                clearLinks.push(await item.getAttribute('href'));
            }
            return clearLinks;
        }catch(e){
            await this.catchError(e);
            return [];
        }
    }

    async getProductProps(url){
        try{
            console.log(url)
            await this.driver.get(url);
            const title = await this.driver.findElements(By.tagName('h1'));
            console.log(await title[0].getText());
            this.toSaveData.push(await title[0].getText());
        }catch (e){
            this.catchError(e);
        }
    }

    async run(){
        try{
            const pageCounts = await this.getPagesCount(this.base_url);
            for (let pageNum = 1; pageNum <= pageCounts; pageNum++){
                let pagedUrl = this.listUrl + '?page=' + pageNum.toString();
                
                for (let link of await this.getProductLinks(pagedUrl)){
                    await this.getProductProps(link);
                    if (this.toSaveData.length === BUFFER_SIZE){
                        await this.loader.save(this.toSaveData);
                        this.toSaveData = [];
                    }
                }
                
            }
        }catch (e){
            this.catchError(e);
        }
       
    }

    async catchError (e){
        console.log(`Got an error ${e}`);
        // await this.driver.quit();
    }
}

const rp = new RozetkaParser('https://rozetka.com.ua/notebooks/c80004/filter/');
rp.run();
