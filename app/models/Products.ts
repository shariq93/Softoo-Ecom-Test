import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ProductModel } from "./Product"
import { api } from "app/services/api"

/**
 * Model description here for TypeScript hints.
 */
export const ProductsModel = types
  .model("Products")
  .props({
    products: types.optional(types.array(ProductModel), []),
    product: types.maybeNull(ProductModel),
    isLoading: types.boolean,
    loadingSingle: types.boolean,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    clearProduct() {
      self.setProp("product", null)
    },
    async getProduct() {
      self.setProp("isLoading", false)
      const response = await api.fetchProducts()
      if (response.kind == "ok") {
        self.setProp("products", response.products)
      }
      self.setProp("isLoading", false)
    },
    async getSingle(id: number) {
      self.setProp("loadingSingle", true)
      const response = await api.fetchSingleProduct(id)
      if (response.kind == "ok") {
        self.setProp("product", response.product)
      }
      self.setProp("loadingSingle", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Products extends Instance<typeof ProductsModel> {}
export interface ProductsSnapshotOut extends SnapshotOut<typeof ProductsModel> {}
export interface ProductsSnapshotIn extends SnapshotIn<typeof ProductsModel> {}
export const createProductsDefaultModel = () => types.optional(ProductsModel, {})
