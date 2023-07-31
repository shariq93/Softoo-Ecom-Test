import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { Product, ProductModel } from "./Product"

/**
 * Model description here for TypeScript hints.
 */
export const CartModel = types
  .model("Cart")
  .props({
    isLoading: types.boolean,
    cartData: types.optional(types.array(ProductModel), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get cartCount() {
      if (self.cartData.length > 0) {
        return self.cartData.reduce((total, item) => {
          return total + item.qty
        }, 0)
      }

      return 0
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    add(product: Product) {
      self.setProp("isLoading", true)
      const alreadyInCart = self.cartData.filter((it) => it.id == product.id)[0]
      if (alreadyInCart) {
        const cartIndex = self.cartData.findIndex((it) => it.id == product.id)
        const tempCart = [...self.cartData]
        tempCart[cartIndex] = { ...tempCart[cartIndex], qty: tempCart[cartIndex].qty + 1 }
        self.setProp("cartData", [...tempCart])
      } else {
        self.setProp("cartData", [...self.cartData, { ...product, qty: 1 }])
      }
      self.setProp("isLoading", false)
    },
    minus(product: Product) {
      self.setProp("isLoading", true)
      const alreadyInCart = self.cartData.filter((it) => it.id == product.id)[0]
      if (alreadyInCart) {
        const cartIndex = self.cartData.findIndex((it) => it.id == product.id)
        const tempCart = [...self.cartData]
        tempCart[cartIndex] = { ...tempCart[cartIndex], qty: tempCart[cartIndex].qty - 1 }
        self.setProp("cartData", [...tempCart])
      }
      self.setProp("isLoading", false)
    },
    delete(product: Product) {
      self.setProp("isLoading", true)
      const newCart = self.cartData.filter((it) => it.id != product.id)
      self.setProp("cartData", [...newCart])
      self.setProp("isLoading", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Cart extends Instance<typeof CartModel> {}
export interface CartSnapshotOut extends SnapshotOut<typeof CartModel> {}
export interface CartSnapshotIn extends SnapshotIn<typeof CartModel> {}
export const createCartDefaultModel = () => types.optional(CartModel, {})
