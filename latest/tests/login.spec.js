const {test , expect } = require ('@playwright/test');
const {LogIn} = require("../pages/login.page");
const {CheckOutPage} = require("../pages/checkout.page");

test('Swag-Lab page validation',async ({browser}) => {

    const context = await browser.newContext();
    const page =  await context.newPage();
    const pg = await  new LogIn(page) ;
    const reqItems = ["Sauce Labs Backpack","Sauce Labs Bike Light"];
    const pg1 = await new CheckOutPage(page);
    await pg.logIn();
    await pg.addTocardPageValidation();
    await pg.addToCart(reqItems);
    await pg.cartvalidation(reqItems);
    await pg1.navigateToCheckout();
    let cpage = 'Checkout: Your Information';
    let ppage = 'Your Cart'
    await pg1.cancelButtonChecks(cpage,ppage);
    await pg1.navigateToCheckout();
    await pg1.checkoutPageValidation();
})

