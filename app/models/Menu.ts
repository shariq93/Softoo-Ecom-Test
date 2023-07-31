import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
const MenuChildrenModel = types.model("MenuChildrenModel").props({
  name: types.string,
  categories: types.optional(types.array(types.string), []),
})
export const MenuModel = types
  .model("Menu")
  .props({
    name: types.string,
    img: types.string,
    children: types.array(MenuChildrenModel),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Menu extends Instance<typeof MenuModel> {}
export interface MenuSnapshotOut extends SnapshotOut<typeof MenuModel> {}
export interface MenuSnapshotIn extends SnapshotIn<typeof MenuModel> {}
export const createMenuDefaultModel = () => types.optional(MenuModel, {})
