const {expect}= require ('@playwright/test');

class CheckOutPage {

    constructor (page){
    this.page = page;
    this.checkoutButton = page.locator('text=CHECKOUT');
    this.cancelButton = page.getByText('CANCEL');
    this.pageHeader = page.locator("//span[@data-test='title']");
    this.fisrtName = page.getByPlaceholder('First Name');
    this.lastname =  page.getByRole('textbox', { name: 'lastName' });
    this.zipCode = page.locator('#postal-code');
    this.continueButton = page.getByRole('button',{ type: "submit"})

    }

    async navigateToCheckout (){
        await this.checkoutButton.click();
        await expect.soft(await this.pageHeader,'Checkout Page is not Displayed').toContainText('Checkout: Your Information'); 

    }

    async cancelButtonChecks (currentPage,prevPage){
        await expect.soft(await this.pageHeader,`user is on this page: ${currentPage} `).toContainText(currentPage); 
        await this.cancelButton.click();
        await expect.soft(await this.pageHeader,`user is on this page: ${prevPage}`).toContainText(prevPage); 
    }



}

module.exports= {CheckOutPage};