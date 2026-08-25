import type { Mission } from './content'

export const drawMission = (pool: Mission[], random = Math.random): Mission | undefined => {
  if (pool.length === 0) return undefined
  return pool[Math.floor(random() * pool.length)]
}
