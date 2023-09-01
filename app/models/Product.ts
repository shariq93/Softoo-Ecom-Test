import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ProductModel = types
  .model("Product")
  .props({
    id: types.number,
    colour: types.string,
    name: types.string,
    price: types.number,
    img: types.string,
    qty:types.optional(types.number,0)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Product extends Instance<typeof ProductModel> {}
export interface ProductSnapshotOut extends SnapshotOut<typeof ProductModel> {}
export interface ProductSnapshotIn extends SnapshotIn<typeof ProductModel> {}
export const createProductDefaultModel = () => types.optional(ProductModel, {})
