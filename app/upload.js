import myApp from '../myKeys.js'

export default (method, body, token) => {
  let upload = {
    method: method.toUpperCase(),
    headers: {
      'Content-type' : 'image/jpeg',
      'X-LC-Id' : myApp.AppId,
      'X-LC-Key' : myApp.AppKey,
      'X-LC-Session' : token,
    }
  }
  if (body)
    upload.body = body
  return upload
}