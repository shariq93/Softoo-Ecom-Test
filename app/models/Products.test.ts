import { ProductsModel } from "./Products"

test("can be created", () => {
  const instance = ProductsModel.create({})

  expect(instance).toBeTruthy()
})
