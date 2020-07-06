const menuConfig = {
  'http://localhost:3777': ['/x-web/b', '/x-web/c', '/p']
}

export default function getXWebContent(path) {
  return Object.entries(menuConfig).find(([url, routes]) => routes.includes(path))[0]
}
