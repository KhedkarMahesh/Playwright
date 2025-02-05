const {expect}= require ('@playwright/test');
const { Console } = require('console');

class LogIn {

    constructor(page){
        this.page = page;
        this.userName = page.locator('#user-name');
        this.pass = page.locator('#password');
        this.loginButton = page.locator("[type = 'submit']");
        this.productLabel = page.locator('text=Products');
        this.shoppingCartButton = page.locator('#shopping_cart_container');
        this.openMenuButton = page.locator('#react-burger-menu-btn');
        this.sortDropdown = page.locator("//select[@class = 'product_sort_container']");



    }
  async logIn (){
        await this.page.goto("https://www.saucedemo.com/");
       let PageTitle = (await this.page.title());
       await expect(this.page).toHaveTitle(/Swag/) ;

        if(PageTitle == "Swag Labs"){
            console.log("Saucedemo site launched successfully and LogIn page displayed Successfully")
            await this.userName.fill("standard_user");
        await this.pass.fill("secret_sauce");
        await this.loginButton.click();
        console.log(await this.page.title());
        //await this.page.pause()

        }else{
            console.log("Saucedemo site not launched successfully")

        }
        
        

  }

  async addTocardPageValidation(){
   await expect(this.page).toHaveTitle(/Swag/);
   await expect(this.shoppingCartButton).toBeVisible()
   await expect(this.openMenuButton).toBeVisible();
   await expect(this.sortDropdown).toBeVisible();
   await expect(this.productLabel).toBeVisible();
  }

  async addToCart (reqItems){
    //console.log(reqItems.length)
    let products = await this.page.locator("[class='inventory_item_name ']").allTextContents();
    console.log("Total products available are : " + products);
    for(const prodToAdd of reqItems){

        let prodvalue = await this.page.locator("[class='inventory_item_name ']");
        let pr = await this.page.locator(".inventory_item_description");
    
        for(let i =0; i< products.length ; ++i){

             let prod = await pr.nth(i).locator('div a div').textContent();
            // console.log(prod);
            while(prod == prodToAdd){
    
               console.log("add product to card: " + prod );
               await pr.nth(i).locator('text=Add to cart').click();
                break;

            }
        }     

    }
         
    

     //await this.page.pause()      
  }

  async cartvalidation (reqItems){

            let addedItemNum = await this.page.locator('.shopping_cart_badge').textContent();
            if(addedItemNum >="1"){
                let addToCart = await this.page.locator('.shopping_cart_link').click();
                let cartItem = await this.page.locator('.cart_item').allTextContents();
                //console.log(cartItem);
                for (const prodTocheck of reqItems) {
                    let prodFound ;
                    for (let i = 0 ; i < cartItem.length; i++){ 
                        let prodFound = 0; 
                        let cartItemname = await this.page.locator('.inventory_item_name').nth(i).textContent();
                        while(cartItemname === prodTocheck){
                            console.log("Required Item : " + prodTocheck +" is added to cart Successfully."); 
                            prodFound++
                            break;
                            return prodFound;
                        }
                    }
                    while( prodFound ==0 ){
                        console.log("Required Item : " + prodTocheck +" is not added to cart."); 
                    }

                }
                
                
            }else {
                console.log("No items are added to cart");
            }
    

  }

}


module.exports = {LogIn};