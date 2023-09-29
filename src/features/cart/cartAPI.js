export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    resolve({ data })
  })
}
export function fetchCartByUserId() {
  return new Promise(async (resolve) => {
    //TODO: we will not hardcord server URL  here
    const response = await fetch('http://localhost:8080/cart')
    const data = await response.json()
    resolve({ data })
  })
}

export function updateItem(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    resolve({ data })
  })
}

export function deleteItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/' + itemId, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    resolve({ data: { id: itemId } })
  })
}

export function resetCart() {
  return new Promise(async (resolve) => {
    const response = await fetchCartByUserId()
    const items = response.data
    for (let item of items) {
      await deleteItem(item.id)
    }
    resolve({ status: 'success' })
  })
}
