import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')
        this.submitDiscountBtn = page.locator('[data-qa="submit-discount-button"]')
        this.discoutMsg = page.locator('[data-qa="discount-active-message"]')
        this.totalPrice = page.locator('[data-qa="total-value"]')
        this.totalWithDiscountPrice = page.locator('[data-qa="total-with-discount-value"]')
        this.creditCardOwner = page.locator('[data-qa="credit-card-owner"]')
        this.creditCardNumber = page.locator('[data-qa="credit-card-number"]')
        this.validUntilField = page.locator('[data-qa="valid-until"]')
        this.cvc = page.locator('[data-qa="credit-card-cvc"]')
        this.payBtn = page.locator('[data-qa="pay-button"]')
        
    }

    activateDiscount = async()  => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountCodeInput.waitFor()
        // option 1
        await this.discountCodeInput.fill(code)
        await expect(this.discountCodeInput).toHaveValue(code)
        // option 2
        // await this.discountCodeInput.focus()
        // await this.page.keyboard.type(code, {delay: 1000})
        expect(await this.discountCodeInput.inputValue()).toBe(code)
        expect(this.discoutMsg).not.toBeVisible()
        await this.submitDiscountBtn.click()
        await expect(this.discoutMsg).toBeVisible()
        await expect(this.totalPrice).toBeVisible()
        await expect(this.totalWithDiscountPrice).toBeVisible()
        const originalPrice = await this.totalPrice.innerText()
        const withoutDollarSignOriginal = parseInt(originalPrice.replace("$", "", 10))
        const discountedPrice = await this.totalWithDiscountPrice.innerText()
        const withoutDollarSignDiscount = parseInt(discountedPrice.replace("$", "", 10))
        expect(withoutDollarSignDiscount).toBeLessThan(withoutDollarSignOriginal)
    }

    fillPaymentDetails= async(paymentDetails)  => {
        await this.creditCardOwner.waitFor()
        await this.creditCardOwner.fill(paymentDetails.creditCardOwner)
        await this.creditCardNumber.fill(paymentDetails.creditCardNumber)
        await this.validUntilField.fill(paymentDetails.validUntilDate)
        await this.cvc.fill(paymentDetails.CVCcode)
  
    }
    completePayment = async() => {
        await this.payBtn.click()
        await expect(this.page).toHaveURL(/\/thank-you/)

    }
}