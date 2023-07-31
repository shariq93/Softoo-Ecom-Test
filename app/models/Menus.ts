import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { MenuModel } from "./Menu"
import { api } from "app/services/api"

/**
 * Model description here for TypeScript hints.
 */
export const MenusModel = types
  .model("Menus")
  .props({
    isLoading: types.boolean,
    menus: types.optional(types.array(MenuModel), []),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async getMenu() {
      self.setProp("isLoading", true)
      const response = await api.fetchMenu()
      if (response.kind == "ok") {
        self.setProp("menus", response.menus)
      }
      self.setProp("isLoading", false)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Menus extends Instance<typeof MenusModel> {}
export interface MenusSnapshotOut extends SnapshotOut<typeof MenusModel> {}
export interface MenusSnapshotIn extends SnapshotIn<typeof MenusModel> {}
export const createMenusDefaultModel = () => types.optional(MenusModel, {})
