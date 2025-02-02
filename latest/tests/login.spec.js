const {test , expect } = require ('@playwright/test');
const {LogIn} = require("../pages/login.page")

test('Swag-Lab page validation',async ({browser}) => {

    const context = await browser.newContext();
    const page =  await context.newPage();
    const pg = await  new LogIn(page) ;
    const reqItems = ["Sauce Labs Backpack","Sauce Labs Bike Light"];

    await pg.logIn();
    await pg.addTocardPageValidation();
    await pg.addToCart(reqItems);
    await pg.cartvalidation(reqItems);
})

