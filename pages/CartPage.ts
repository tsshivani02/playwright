import {Page, Locator} from '@playwright/test';

export class CartPage{
    private page: Page;
    private productNamesinCart: Promise<Array<Locator>>;

    constructor(page:Page){
        this.page = page;
        
        //CSS selector to select all products names by title
        this.productNamesinCart = this.page.locator("#tbodyid tr td:nth-child(2)").all();
    }

    //Method to check if a specific product is present in cart
    async checkProductsinCart(productName:string) :Promise<boolean> {
        const products = await this.productNamesinCart;

        for(const product of products){
            const name = (await product.textContent())?.trim();

            if(name === productName){
                return true;
            }
        }
        return false;
    }
}