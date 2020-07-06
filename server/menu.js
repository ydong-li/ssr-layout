const menuConfig = {
  'http://localhost:3777': ['/x-web/b', '/x-web/c', '/p']
}

export default function getXWebContent(path) {
  let config =  Object.entries(menuConfig).find(([url, routes]) => routes.includes(path))
  return config ? config[0] : null
}
