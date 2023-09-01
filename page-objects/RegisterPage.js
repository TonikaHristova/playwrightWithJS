
export class RegisterPage {
    constructor(page) {
        this.page = page
        this.emailField = page.locator('[placeholder="E-Mail"]')
        this.passField = page.locator('[placeholder="Password"]')
        this.registerBtn = page.getByRole('button', {name: 'Register'})
    }

    signUpAsNewUser = async (email, pass) => {
        await this.emailField.fill(email)
        await this.passField.fill(pass)
        await this.registerBtn.click()
        await this.page.waitForURL('/delivery-details');
    }


}