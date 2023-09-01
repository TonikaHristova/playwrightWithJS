import { test, expect } from "@playwright/test"
import { ProductPage } from "../page-objects/ProductPage"
import { Navigation } from "../page-objects/Navigation"
import { Checkout } from "../page-objects/CheckoutPage"
import { Login } from "../page-objects/LoginPage"
import { RegisterPage } from "../page-objects/RegisterPage"
import { v4 as uuidv4 } from 'uuid';
import { DeliveryDetailsPage } from "../page-objects/DeliveryDetailsPage"
import { deliveryDetails as userAddress } from "../data/deliveryDetails"
import { PaymentPage } from "../page-objects/PaymentPage"
import { paymentDetails } from "../data/paymentDetails"

test("New user e2e", async ({ page }) => {
    const productPage = new ProductPage(page)
    const navigation = new Navigation(page)
    const checkout = new Checkout(page)
    const login = new Login(page)
    const registerPage = new RegisterPage(page)
    const deliveryDetails = new DeliveryDetailsPage(page)
    const paymentPage = new PaymentPage(page)

    const email = uuidv4() + "@mail.bg"
    const pass = uuidv4()

    await productPage.visit()
    await productPage.sortByCheapest()
    await productPage.addProductToBasket(0)
    await productPage.addProductToBasket(1)
    await productPage.addProductToBasket(2)
    await navigation.goToCheckout()
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()
    await login.moveToSignUp()
    await registerPage.signUpAsNewUser(email, pass)
    await deliveryDetails.fillDetails(userAddress)
    await deliveryDetails.saveDetails()
    await deliveryDetails.goToPayment()
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(paymentDetails)
    await paymentPage.completePayment()


})