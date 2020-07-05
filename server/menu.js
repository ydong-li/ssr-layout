const menuConfig = {
  'http://localhost:3777': ['/b', '/c']
}

export default function getXWebContent(path) {
  return Object.entries(menuConfig).find(([url, routes]) => routes.includes(path))[0]
}