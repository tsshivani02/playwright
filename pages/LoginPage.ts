import {Page, Locator} from '@playwright/test';

export class LoginPage{
    //Define variables - private & readonly
    private readonly page : Page;
    private readonly loginLink : Locator;
    private readonly userNameInput : Locator;
    private readonly passwordInput : Locator;
    private readonly loginButton : Locator;

    //Create constructor
    constructor(page:Page){
        this.page = page;
        this.loginLink = this.page.locator("#login2");
        this.userNameInput = this.page.locator("#loginusername");
        this.passwordInput = this.page.locator("#loginpassword");
        this.loginButton = this.page.locator("button[onclick='logIn()']");
    }

    //action methods
    async clickLoginLink() : Promise<void> {
        await this.loginLink.click();
    }

    async enterUsername(username:string) : Promise<void> {
        await this.userNameInput.clear(); //clears the input box if any
        await this.userNameInput.fill(username);
    }

    async enterPassword(password:string) : Promise<void> {
        await this.passwordInput.clear(); //clears the input box if any
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() : Promise<void> {
        await this.loginButton.click()
    }

    //Instead of calling all the above methods seperately in the test, we can call one method that has all 4 methods
    async performLogin(username:string, password:string){
        await this.clickLoginLink();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
    
}