import { test, expect } from "@playwright/test"

test.skip("Add to basket", async ({ page })=>  {

    await page.goto("/")
    const addToBasketBtn  = page.locator('[data-qa="product-button"]').first()
    const count = page.locator('[data-qa=header-basket-count]')
    const checkoutButton = page.getByRole('link', { name: 'Checkout'})


    await expect(count).toHaveText("0")

    await addToBasketBtn.waitFor()
    await addToBasketBtn.click()
    await expect(addToBasketBtn).toHaveText("Remove from Basket")
    await expect(count).toHaveText("1")
    await checkoutButton.click()
    await page.waitForURL("/basket")

})

