import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ProductModel } from "./Product"
import { api } from "app/services/api"

/**
 * ProductsModel is defined here using mobx-state-tree.
 * It represents a collection of products, a single product, and their loading states.
 */
export const ProductsModel = types
  .model("Products")
  .props({
    products: types.optional(types.array(ProductModel), []), // An array to store a collection of products
    product: types.maybeNull(ProductModel), // A single product, which can be null if not loaded
    isLoading: types.boolean, // A boolean flag to indicate if products are currently loading
    loadingSingle: types.boolean, // A boolean flag to indicate if a single product is currently loading
  })
  .actions(withSetPropAction) // Apply custom actions from 'withSetPropAction'
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars (No view functions in this model)
  .actions((self) => ({
    clearProduct() {
      // Action to clear the single product
      self.setProp("product", null)
    },
    async getProduct() {
      // Action to fetch a collection of products from an API
      self.setProp("isLoading", true) // Set isLoading to true while fetching
      const response = await api.fetchProducts() // Fetch products from the API
      if (response.kind == "ok") {
        self.setProp("products", response.products) // Update products if the response is successful
      }
      self.setProp("isLoading", false) // Set isLoading back to false after fetching
    },
    async getSingle(id: number) {
      // Action to fetch a single product by its ID from an API
      self.setProp("loadingSingle", true) // Set loadingSingle to true while fetching
      const response = await api.fetchSingleProduct(id) // Fetch a single product from the API
      if (response.kind == "ok") {
        self.setProp("product", response.product) // Update the single product if the response is successful
      }
      self.setProp("loadingSingle", false) // Set loadingSingle back to false after fetching
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Products extends Instance<typeof ProductsModel> {}
export interface ProductsSnapshotOut extends SnapshotOut<typeof ProductsModel> {}
export interface ProductsSnapshotIn extends SnapshotIn<typeof ProductsModel> {}

/**
 * A factory function to create a default ProductsModel instance.
 */
export const createProductsDefaultModel = () => types.optional(ProductsModel, {})
