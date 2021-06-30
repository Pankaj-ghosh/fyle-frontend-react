// var serverURL = "http://localhost:8080"; 
var serverURL = "https://fyle-node-backend.herokuapp.com";

function getHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

function addCacheResponse(url, response) {
  let responseCache = JSON.parse(localStorage.getItem("responseCache")) || {};
  responseCache[url] = response;
  localStorage.setItem("responseCache", JSON.stringify(responseCache));
}

function getCacheResponse(url) {
  let responseCache = JSON.parse(localStorage.getItem("responseCache")) || {};
  return responseCache[url];
}

export default {
  get: function (url) {
    let cached = getCacheResponse(url);
    if (cached) {
      return new Promise((resolve, reject) => {
        resolve(cached);
      });
    }
    return fetch(serverURL + url, { method: "GET", headers: getHeaders() })
      .then(parseResponse)
      .then((data) => {
        addCacheResponse(url, data);
        return data;
      })
      .catch(console.log("error"));
  },
};

function parseResponse(response) {
  return response.json();
}


