// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve,reject) => {
    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await response.json()
    
    if(!response.ok){
      reject({data})
    }
    resolve({ data })
    } catch (error) {
      reject(error)
    }
    
  })
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'Content-Type': 'application/json', loginInfo },
      })
      const data = await response.json()
      
      if (!response.ok) {
        reject({data})
      }
      resolve( {data} )
    } catch (error) {
      reject(error)
    }
  })
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: 'success' })
  })
}
