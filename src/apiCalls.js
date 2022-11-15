const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => {
          if(!response.ok){
              throw new Error('Not a 200 status')
          } else {
              return response.json()
          }
      })
};

const addUrlPost = (newUrl) => {
  return fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      body: JSON.stringify({
        title: newUrl.title,
        long_url: newUrl.urlToShorten
      }),
      headers: {
          "Content-Type": "application/json"
      },
  })
  .then(response => {
      if(!response.ok){
          console.log("There is a error in the network request")
      } else {
          return response.json()
      }
  })
};


export { getUrls, addUrlPost }