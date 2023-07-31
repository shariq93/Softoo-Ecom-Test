import { MenuModel } from "./Menu"

test("can be created", () => {
  const instance = MenuModel.create({})

  expect(instance).toBeTruthy()
})
