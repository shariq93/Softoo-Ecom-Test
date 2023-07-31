import { MenusModel } from "./Menus"

test("can be created", () => {
  const instance = MenusModel.create({})

  expect(instance).toBeTruthy()
})
