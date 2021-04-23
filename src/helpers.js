export function dateNow() {
  const dNow = new Date(Date.now())
  return `${dNow.getFullYear()}.${dNow.getMonth() + 1 < 10 ? '0' + (dNow.getMonth() + 1) : dNow.getMonth()}.${dNow.getDate()}`
}