const { expect } = require('@playwright/test');

class CheckOutPage {

    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('text=CHECKOUT');
        this.cancelButton = page.getByText('CANCEL');
        this.pageHeader = page.locator("//span[@data-test='title']");
        this.firstName = page.getByPlaceholder('First Name');
        this.lastname = page.getByPlaceholder('Last Name');
        this.zipCode = page.locator('#postal-code');
        this.continueButton = page.getByRole('button', { name: "continue"  })
        this.errMsgReqfield = page.locator('[data-test="error"]');


    }

    async navigateToCheckout() {
        await this.checkoutButton.click();
        await expect.soft(await this.pageHeader, 'Checkout Page is not Displayed').toContainText('Checkout: Your Information');

    }

    async cancelButtonChecks(currentPage, prevPage) {
        await expect.soft(await this.pageHeader, `user is on this page: ${currentPage} `).toContainText(currentPage);
        await this.cancelButton.click();
        await expect.soft(await this.pageHeader, `user is on this page: ${prevPage}`).toContainText(prevPage);
    }

    async checkoutPageValidation() {
        try {
            let pgHeader = await this.pageHeader.textContent();
            if (pgHeader === 'Checkout: Your Information') {
                // Changed variable names to reference actual properties
                const reqFields = [{ cancel_Button: this.cancelButton }, { FirstName: this.firstName }, { LastName: this.lastname },
                { Zipcode: this.zipCode }, { continue_Button: this.continueButton }];
                // Looping through each object in the array and used switch to handle each keys
                for (const obj of reqFields){
                    const [key, value] = Object.entries(obj)[0];

                    switch (key) {
                        case 'FirstName':
                            await expect.soft(value, `${key} should be displayed`).toBeVisible();
                            await this.continueButton.click();
                            await expect.soft(this.errMsgReqfield, `Error message is not dispalyed for mandatory field: ${key} `).toBeVisible();
                            await value.fill("Mahesh");
                            break;
                        case 'LastName':
                          await expect.soft(value, `${key} should be displayed`).toBeVisible();
                          await this.continueButton.click();
                          await expect.soft(this.errMsgReqfield, `Error message is not dispalyed for mandatory field: ${key} `).toBeVisible();
                          await value.fill("K");
                            break;
                        case 'Zipcode':
                          await expect.soft(value, `${key} should be displayed`).toBeVisible();
                          await this.continueButton.click();
                          await expect.soft(this.errMsgReqfield, `Error message is not dispalyed for mandatory field: ${key} `).toBeVisible();
                          await value.fill("414111");
                            break;
                        case 'cancel_Button':
                          await expect.soft(value, `${key} should be displayed`).toBeVisible();
                          break;
                        case 'continue_Button':
                            await expect.soft(value, `${key} should be displayed`).toBeVisible();
                            await value.click();
                            await expect.soft(await this.pageHeader, 'user is not  on this page: Checkout: Overview').toContainText("Checkout: Overview");
                            break;
                        default:
                            console.log(`Unknown field is : ${key} `);
                    }
                };

              
            } else {
                console.log("User is not on checkout information screen.");
            }
        } catch (error) {
            console.error("Error in checkoutPageValidation: ", error);
        }

await this.page.pause();
    }

    
}
module.exports = { CheckOutPage };