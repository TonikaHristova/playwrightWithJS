import { expect } from "@playwright/test"
import { isDesktopViewport } from "../utils/isDesktopView.js"

export class Navigation {
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutButton = page.getByRole('link', { name: 'Checkout' })
        this.mobileBurgerMenu = page.locator('[data-qa="burger-button"]')
    }


        getBasketCount = async () => {
            await this.basketCounter.waitFor()
            const text = await this.basketCounter.innerText()
            return parseInt(text, 10)
        }
        goToCheckout = async () => {
            if (!isDesktopViewport(this.page)) {
            await this.mobileBurgerMenu.waitFor()
            await this.mobileBurgerMenu.click()
            }
           
            await this.checkoutButton.waitFor()
            await this.checkoutButton.click()
            await this.page.waitForURL('/basket');
        }    }
