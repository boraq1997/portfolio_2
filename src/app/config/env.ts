export const BASE_URL = import.meta.env.BASE_URL

export function assetUrl(path: string): string {
  return `${BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`
}