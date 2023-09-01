import { expect } from "@playwright/test"

export class Checkout {
    constructor(page) {
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutBtn = page.locator('[data-qa="continue-to-checkout"]')
        
    }
    removeCheapestProduct= async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count();
        await this.basketItemPrice.first().waitFor
        const allPriceText = await this.basketItemPrice.allInnerTexts()
        const justNumbers = allPriceText.map((element) => {
            const withoutDollarSign = element.replace("$", "")
            return parseInt(withoutDollarSign, 10)
        }
        )

        const smallestPrice = Math.min(justNumbers)
        const smallestPriceIdx = justNumbers.indexOf(smallestPrice)
       
        await this.basketItemRemoveButton.nth(smallestPriceIdx).click()
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1)
   
    }
    continueToCheckout = async () => {
        await this.continueToCheckoutBtn.waitFor()
        await this.continueToCheckoutBtn.click()
        await expect(this.page).toHaveURL(/\/delivery-details/)
        await expect(this.page).toHaveURL(new RegExp('/delivery-details$'));
        await this.page.waitForURL(/\/login/)
      
    }

}
