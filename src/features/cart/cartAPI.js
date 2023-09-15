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
export function fetchCartByUserId(userId) {
  return new Promise(async (resolve) => {
    //TODO: we will not hardcord server URL  here
    const response = await fetch('http://localhost:8080/cart?user=' + userId)
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

export function resetCart(userId) {
  return new Promise(async (resolve) => {
    const response = await fetchCartByUserId(userId)
    const items = response.data
    console.log(items)
    for (let item of items) {
      await deleteItem(item.id)
    }
    resolve({ status: 'success' })
  })
}
