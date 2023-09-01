import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import type { ApiConfig } from "./api.types"
import { Menu, Product } from "app/models"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

 

  async fetchProducts(): Promise<{ kind: "ok"; products: Product[] } | GeneralApiProblem> {
    // make the api call

    const response: ApiResponse<Product[]> = await api.apisauce.get(`/products`, {})

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      // This is where we transform the data into the shape we expect for our MST model.
      const products: Product[] = response.data
      if (response.status == 200) {
        return {
          kind: "ok",
          products,
        }
      } else {
        return { kind: "unauthorized" }
      }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  async fetchSingleProduct(id:number): Promise<{ kind: "ok"; product: Product } | GeneralApiProblem> {
    // make the api call

    const response: ApiResponse<Product> = await api.apisauce.get(`/products/${id}`,{})

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      // This is where we transform the data into the shape we expect for our MST model.
      const product: Product = response.data
      if (response.status == 200) {
        return {
          kind: "ok",
          product,
        }
      } else {
        return { kind: "unauthorized" }
      }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  async fetchMenu(): Promise<{ kind: "ok"; menus: Menu[] } | GeneralApiProblem> {
    // make the api call

    const response: ApiResponse<Menu[]> = await api.apisauce.get(`/menu`, {})

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      // This is where we transform the data into the shape we expect for our MST model.
      const menus: Menu[] = response.data
      if (response.status == 200) {
        return {
          kind: "ok",
          menus,
        }
      } else {
        return { kind: "unauthorized" }
      }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
