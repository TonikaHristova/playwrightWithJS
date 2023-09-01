import { test, expect } from "@playwright/test"
import { MyAccountPage } from "../page-objects/MyAccountPage.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { adminDetails } from "../data/userDetails.js"


test("My Account using cookie injection and mocking network request", async ({ page }) => {
    const myAccount = new MyAccountPage(page)
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.pass)

    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 400,
            contentType : "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
        })

    })
    await myAccount.visit()
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, ([loginToken]))
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMsg()

})

