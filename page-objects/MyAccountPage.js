export class MyAccountPage {
    constructor(page) {
        this.page = page
        this.emailField = page.getByPlaceholder('E-Mail')
        this.pageHeading = page.getByRole('heading', { name: 'My Account' })
        this.errorMsg = page.locator('[data-qa="error-message"]')


    }
    visit = async () => {
        await this.page.goto("/my-account")
        
    }
    waitForPageHeading = async () => {
        await this.pageHeading.waitFor()
    }
    waitForErrorMsg = async () => {
        await this.errorMsg.waitFor()
    }
}