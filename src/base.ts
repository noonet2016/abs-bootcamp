// Prefix a public (publicDir) path with Vite's configured base, so the app works
// both at the domain root during dev and under /abs-bootcamp/ in production.
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
