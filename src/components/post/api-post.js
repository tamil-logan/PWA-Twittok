const create = async (post) => {
  console.log('post is:', post);
  console.log("entries are:" , post.entries());
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5000/newPost", {
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

export {
  create
};
