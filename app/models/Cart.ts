import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { Product, ProductModel } from "./Product"

/**
 * CartModel is defined here using mobx-state-tree.
 * It represents the structure and behavior of a shopping cart.
 */
export const CartModel = types
  .model("Cart")
  .props({
    isLoading: types.boolean, // A boolean flag to indicate if the cart is currently loading
    cartData: types.optional(types.array(ProductModel), []), // An array to store the products in the cart
  })
  .actions(withSetPropAction) 
  .views((self) => ({
    get cartCount() {
      // A computed property that calculates the total quantity of products in the cart
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
      // Action to add a product to the cart
      self.setProp("isLoading", true) // Set isLoading to true while performing the action
      const alreadyInCart = self.cartData.filter((it) => it.id == product.id)[0]
      if (alreadyInCart) {
        const cartIndex = self.cartData.findIndex((it) => it.id == product.id)
        const tempCart = [...self.cartData]
        tempCart[cartIndex] = { ...tempCart[cartIndex], qty: tempCart[cartIndex].qty + 1 }
        self.setProp("cartData", [...tempCart])
      } else {
        self.setProp("cartData", [...self.cartData, { ...product, qty: 1 }])
      }
      self.setProp("isLoading", false) // Set isLoading back to false after the action
    },
    minus(product: Product) {
      // Action to decrease the quantity of a product in the cart
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
      // Action to remove a product from the cart
      self.setProp("isLoading", true)
      const newCart = self.cartData.filter((it) => it.id != product.id)
      self.setProp("cartData", [...newCart])
      self.setProp("isLoading", false)
    },
  })) 

export interface Cart extends Instance<typeof CartModel> {}
export interface CartSnapshotOut extends SnapshotOut<typeof CartModel> {}
export interface CartSnapshotIn extends SnapshotIn<typeof CartModel> {}

export const createCartDefaultModel = () => types.optional(CartModel, {})
