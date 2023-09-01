import * as nodeFetch from "node-fetch"
import { expect } from "@playwright/test"

export const getLoginToken = async(username, pass) => {
    const response = await nodeFetch("http://localhost:2221/api/login", {
        method: "POST",
        body: JSON.stringify({"username":username, "password":pass})

    })
    const body = await response.json()
    expect(response.status==200)
    if(response.status!==200) {
        throw new Error("Error when retrieving the login token!!!")
    }

    return body.token


}