
import { expect } from "@playwright/test"
import { Navigation } from "./Navigation"
import { isDesktopViewport } from "../utils/isDesktopView"


export class ProductPage {
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('select')
        this.productTitle = page.locator('[data-qa="product-title"]')

    }
    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (index) => {
        const navigationPage = new Navigation(this.page)
        const specificAddButton= this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        // only desktop
        let basketCountBeforeAdding
        if (isDesktopViewport(this.page)) {
        basketCountBeforeAdding = await navigationPage.getBasketCount()
        }
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        // only desktop
        if (isDesktopViewport(this.page)) {
        const basketCountAfterAdding  = await navigationPage.getBasketCount()
        
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
    }

    }
    sortByCheapest = async() => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const allTitlesBefore = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption('price-asc')
        const allTitleAfter = await this.productTitle.allInnerTexts()
        expect(allTitleAfter).not.toEqual(allTitlesBefore)
    

    }
}