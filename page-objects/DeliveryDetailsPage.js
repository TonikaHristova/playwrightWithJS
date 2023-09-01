import { expect } from "@playwright/test"

export class DeliveryDetailsPage {
    constructor(page) {
        this.page = page
        //this.firstNameField = page.getByText('First name')
        this.firstNameField = this.page.locator('[placeholder="First name"]')
        this.lastNameField = page.getByPlaceholder("Last name")
        this.streetField = page.getByPlaceholder("Street")
        this.postCodeField = page.getByPlaceholder("Post code")
        this.cityField = page.getByPlaceholder("City")
        this.saveAddressBtn = page.locator('[data-qa="save-address-button"]')
        this.continueToPayment = page.locator('[data-qa="continue-to-payment-button"]')
        this.countryDropdown = page.locator('select')
        this.savedAddressConteiner = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')
    }
    
    

    fillDetails = async (userAddress) => {
        await this.firstNameField.waitFor()
        await this.firstNameField.fill(userAddress.firstName)
        await this.lastNameField.fill(userAddress.lastName)
        await this.streetField.fill(userAddress.street)
        await this.postCodeField.fill(userAddress.postcode)
        await this.cityField.fill(userAddress.city)
        await this.countryDropdown.selectOption(userAddress.country);
        await this.saveAddressBtn.click() 
    

    }

    saveDetails = async() => {
        const countBeforeSaving = await this.savedAddressConteiner.count()
        await this.saveAddressBtn.click() 
        await this.savedAddressFirstName.waitFor()
        expect(this.savedAddressConteiner).toBeVisible()
        expect(this.savedAddressConteiner).toHaveCount(countBeforeSaving + 1)
        await this.savedAddressFirstName.first().waitFor()
      
        expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameField.inputValue()) 
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameField.inputValue()) 
        expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetField.inputValue()) 
        expect(await this.savedAddressPostCode.first().innerText()).toBe(await this.postCodeField.inputValue()) 
        expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityField.inputValue()) 
        expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue()) 
       

    }

    goToPayment  = async() => {
        this.continueToPayment.click()
        await this.page.waitForURL(/\/payment/, { timeout:3000 });


    }

    

}


