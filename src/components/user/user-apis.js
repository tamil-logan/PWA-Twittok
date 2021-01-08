const read = async () => {
  try {
    let response = await fetch("http://localhost:5000/getUser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
   const update = user => {
    return new Promise((resolve, reject) => {
  console.log("user is" , user)
      fetch("http://localhost:5000/updateUser",
        {
            method: 'PUT',
            headers: {
                Accept:'application/json',
                'Content-Type' : 'application/json',
                Authorization: `${localStorage.getItem("token")}`,

            },
            body: JSON.stringify(user)
            
        })
        .then(response => response.json())
        .then((jsonData) => {
          resolve(jsonData);
          console.log(jsonData);
        })
        .catch((err) => console.log(err));
  })
  }

  const changepass = user => {
    return new Promise((resolve, reject) => {
  console.log("user is" , user)
      fetch("http://localhost:5000/changePassword",
        {
            method: 'PUT',
            headers: {
                Accept:'application/json',
                'Content-Type' : 'application/json',
                Authorization: `${localStorage.getItem("token")}`,

            },
            body: JSON.stringify(user)
            
        })
        .then(response => response.json())
        .then((jsonData) => {
          resolve(jsonData);
          console.log(jsonData);
        })
        .catch((err) => console.log(err));
  })
  }

  const uploadProfilePic = async (post) => {
    console.log('post is:', post);
    console.log("entries are:" , post.entries());
    return new Promise((resolve, reject) => {
      fetch("http://localhost:5000/uploadProfilePic", {
        method: "POST",
        headers: {
          Authorization : `${localStorage.getItem("token")}`,
          // "Content-Type": "multipart/form-data",
        },
        body: post,
      })
        .then((jsonData) => resolve(jsonData))
        .catch((err) => resolve({ error: `something went wrong err : ${err}` }));
    });
  };
export { read, update,changepass,uploadProfilePic };
