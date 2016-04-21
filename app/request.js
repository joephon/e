import myApp from '../myKeys.js'

export default (method, body) => {
  let request = {
    method: method.toUpperCase(),
    headers: {
      'Content-type' : 'application/json',
      'X-LC-Id' : myApp.AppId,
      'X-LC-Key' : myApp.AppKey
    }
  }
  if (body)
    request.body = JSON.stringify(body)
  return request
}