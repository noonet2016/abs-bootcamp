import { describe, expect, it } from 'vitest'
import { drawMission } from './draw'
import { missions } from './content'

describe('drawMission', () => {
  it('returns an item from the available pool', () => {
    expect(drawMission(missions.slice(0, 2), () => 0.99)?.id).toBe(2)
  })

  it('returns undefined for an empty pool', () => {
    expect(drawMission([])).toBeUndefined()
  })
})
