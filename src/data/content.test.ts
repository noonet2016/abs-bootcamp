import { describe, expect, it } from 'vitest'
import { missions, places } from './content'

describe('website content contract', () => {
  it('contains the 20 uniquely identified missions from the activity pack', () => {
    expect(missions).toHaveLength(20)
    expect(new Set(missions.map((mission) => mission.id)).size).toBe(20)
    expect(missions.every((mission) => mission.title.length > 0 && mission.steps[0]?.kind === 'start' && mission.steps.at(-1)?.kind === 'finish')).toBe(true)
  })

  it('has a learning card in each of the three realms', () => {
    expect(new Set(places.map((place) => place.realm))).toEqual(new Set(['dhamma', 'nature', 'culture']))
  })
})
