import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ProductsModel } from "./Products"
import { MenusModel } from "./Menus"
import { CartModel } from "./Cart"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  products: types.optional(ProductsModel, {
    products: [],
    product: null,
    loadingSingle: false,
    isLoading: false,
  }),
  menu: types.optional(MenusModel, { menus: [], isLoading: false }),
  cart: types.optional(CartModel, { cartData: [],isLoading:false }),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
