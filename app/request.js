import myApp from '../myKeys.js'
import storage from './storage.js'

const Session = storage.load({key: 'currentUser'})

export default (method, body) => {
  let request = {
    method: method.toUpperCase(),
    headers: {
      'Content-type' : 'application/json',
      'X-LC-Id' : myApp.AppId,
      'X-LC-Key' : myApp.AppKey,
      'X-LC-Session' : Session,
    }
  }
  if (body)
    request.body = JSON.stringify(body)
  return request
}