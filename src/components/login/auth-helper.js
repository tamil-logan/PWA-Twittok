const signout = async () => {
    try {
      let response = await fetch('/auth/signout/', { method: 'GET' })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
  }

export const signin = user => {
  return new Promise((resolve, reject) => {

    fetch("https://twittok.herokuapp.com/login",
      {
          method: 'POST',
          headers: {
              Accept:'application/json',
              'Content-Type' : 'application/json'
          },
          body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then((jsonData) => {
        resolve(jsonData);
        console.log(jsonData);
        localStorage.setItem("token", jsonData.token);
        localStorage.setItem("username", jsonData.username);
        localStorage.setItem("email", jsonData.email);  
      })
      .catch((err) => console.log(err));
})
}

const auth = {
    isAuthenticated() {
      if (typeof window == "undefined")
        return false
  
      if (sessionStorage.getItem('jwt'))
        return JSON.parse(sessionStorage.getItem('jwt'))
      else
        return false
    },
    authenticate(jwt, cb) {
      if (typeof window !== "undefined")
        sessionStorage.setItem('jwt', JSON.stringify(jwt))
      cb()
    },
    clearJWT(cb) {
      if (typeof window !== "undefined")
        sessionStorage.removeItem('jwt')
      cb()
      //optional
      signout().then((data) => {
        document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      })
    }
  }
  
  export default auth;
  
  