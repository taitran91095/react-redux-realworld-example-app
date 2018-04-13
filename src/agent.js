//This file define superagent - the framework for making http request easier and more function
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

//define API domain
const API_ROOT = 'https://conduit.productionready.io/api';

//set encode const in short of encodeURIComponent()
//support URI Encode: https://www.w3schools.com/jsref/jsref_encodeURIComponent.asp
const encode = encodeURIComponent;

const MY_MOCK_API = 'http://localhost:3000';
//define responseBody function for esier get response body
const responseBody = res => res.body;

//define token and setToken to request header function
let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

// set parameter for request, request will start with defined domain above
// set token to header if token != null
// after receive the response, don't care about status just get the body
const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const myRequest = {
  del: url =>
    superagent.del(`${MY_MOCK_API}${url}`).then(responseBody),
  get: url =>
    superagent.get(`${MY_MOCK_API}${url}`).then(responseBody),
  put: (url, body) =>
    superagent.put(`${MY_MOCK_API}${url}`, body).then(responseBody),
  post: (url, body) =>
    superagent.post(`${MY_MOCK_API}${url}`, body).then(responseBody)
};

const productCall = {
  list:() => myRequest.get('/product')
}
// define Auth function with parameter, using request define above
// Ex: https://conduit.productionready.io/api/user to get current user by Token
const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

// get all tags
const Tags = {
  getAll: () => requests.get('/tags')
};

//define limit function that will generate the string user for URL parameter
//Ex : imit=10&offset=10
const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
//slug is “a part of a URL which identifies a particular page on a website in a form readable by users."
//omit mean forget 
//Object.assign  is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.
//below code mean return an object that is combined by article and slug = undefined
////
const omitSlug = article => Object.assign({}, article, { slug: undefined })

//define function to process with Article API
const Articles = {
  all: page =>
    requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    requests.post('/articles', { article })
};

//define function to process with Comment API
const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};

//define function to process with Comment API
const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

//define setToken function
//define setter for Token because cannot change token value
export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  productCall,
  setToken: _token => { token = _token; }
};
