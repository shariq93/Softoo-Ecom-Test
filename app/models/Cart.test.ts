import { CartModel } from "./Cart"
import { Product, ProductModel } from "./Product"

test("can be created", () => {
  const instance = CartModel.create({ cartData: [], isLoading: false })

  expect(instance).toBeTruthy()
})

test("ADD -- Add Product to cart", () => {
  const cart = CartModel.create({ cartData: [], isLoading: false })
  const product: Product = ProductModel.create({
    id: 1,
    colour: "green",
    name: "Shirt 1",
    price: 10,
    img: "https://sampleimage.com",
    qty: 1,
  })
  const product2: Product = ProductModel.create({
    id: 2,
    colour: "white",
    name: "Shirt 2",
    price: 15,
    img: "https://sampleimage.com",
    qty: 2,
  })

  cart.add(product)
  cart.add(product2)

  expect(cart.cartData[0].id).toBe(product.id)
  expect(cart.cartData[0].colour).toBe(product.colour)
  expect(cart.cartData[0].img).toBe(product.img)
  expect(cart.cartData[0].name).toBe(product.name)
  expect(cart.cartData[0].price).toBe(product.price)
  expect(cart.cartData[0].qty).toBe(1)

  expect(cart.cartData.length).toBe(2)
})

test("ADD AGAIN -- Add same product twice should increase the count and keep length same", () => {
  const cart = CartModel.create({ cartData: [], isLoading: false })
  const product: Product = ProductModel.create({
    id: 1,
    colour: "green",
    name: "Shirt 1",
    price: 10,
    img: "https://sampleimage.com",
    qty: 1,
  })

  cart.add(product)
  cart.add(product)

  expect(cart.cartData[0].id).toBe(product.id)
  expect(cart.cartData[0].colour).toBe(product.colour)
  expect(cart.cartData[0].img).toBe(product.img)
  expect(cart.cartData[0].name).toBe(product.name)
  expect(cart.cartData[0].price).toBe(product.price)
  expect(cart.cartData[0].qty).toBe(2)

  expect(cart.cartData.length).toBe(1)
})
test("CART_COUNT -- It should return a valid count", () => {
  const cart = CartModel.create({ cartData: [], isLoading: false })
  const product1: Product = ProductModel.create({
    id: 1,
    colour: "green",
    name: "Shirt 1",
    price: 10,
    img: "https://sampleimage.com",
    qty: 1,
  })
  const product2 = ProductModel.create({
    id: 2,
    colour: "white",
    name: "Shirt 2",
    price: 11,
    img: "https://sampleimage.com",
    qty: 1,
  })
  cart.setProp("cartData", [product1, product2])

  const expectedCartCount = product1.qty + product2.qty
  const actualCartCount = cart.cartCount

  expect(actualCartCount).toBe(expectedCartCount)
})
test("DELETE -- Check if delete is working", () => {
  const cart = CartModel.create({ cartData: [], isLoading: false })
  const product1: Product = ProductModel.create({
    id: 1,
    colour: "green",
    name: "Shirt 1",
    price: 10,
    img: "https://sampleimage.com",
    qty: 1,
  })
  const product2 = ProductModel.create({
    id: 2,
    colour: "white",
    name: "Shirt 2",
    price: 11,
    img: "https://sampleimage.com",
    qty: 10,
  })
  cart.setProp("cartData", [product1, product2])

  cart.delete(product1)

  expect(cart.cartData.length).toBe(1)
})
