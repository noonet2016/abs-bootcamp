import { motion, MotionConfig, useReducedMotion } from 'motion/react'
import { lazy, Suspense, useState } from 'react'
import { drawMission } from './data/draw'
import { missions, places, realms, stepIcon, type Mission, type Realm } from './data/content'

type View = 'home' | 'knowledge' | 'mission'

const realmOrder: Realm[] = ['dhamma', 'nature', 'culture']
const AdventureScene = lazy(async () => import('./AdventureScene').then((module) => ({ default: module.AdventureScene })))

function Knowledge({ onMission }: { onMission: () => void }) {
  const [realm, setRealm] = useState<Realm>('dhamma')
  const [index, setIndex] = useState(0)
  const choices = places.filter((place) => place.realm === realm)
  const current = choices[index % choices.length]

  const chooseRealm = (next: Realm) => {
    setRealm(next)
    setIndex(0)
  }

  return (
    <section className="panel knowledge" aria-labelledby="knowledge-title">
      <div className="section-heading"><h2 id="knowledge-title">เปิดแผนที่ 3 ดินแดน</h2><p>กดเลือกดินแดน แล้วทำความรู้จักสถานที่สำคัญกันค่ะ</p></div>
      <div className="realm-tabs" role="tablist" aria-label="เลือกดินแดน">
        {realmOrder.map((key) => <button key={key} type="button" role="tab" aria-selected={realm === key} className={`realm-tab ${realms[key].color}`} onClick={() => chooseRealm(key)}>{realms[key].icon} {realms[key].title}</button>)}
      </div>
      <article className="place-card">
        <div className="place-image">{current.image ? <img src={current.image} alt={current.title} /> : <div className="image-placeholder" aria-label={`ยังไม่มีภาพ ${current.title}`}>🗺️<small>รอภาพสถานที่</small></div>}</div>
        <div className="place-copy"><span className={`realm-label ${realms[realm].color}`}>{realms[realm].icon} {realms[realm].title}</span><h3>{current.title}</h3><p>{current.summary}</p><div className="place-controls"><button type="button" onClick={() => setIndex((value) => (value - 1 + choices.length) % choices.length)}>← ก่อนหน้า</button><span>{index + 1} / {choices.length}</span><button type="button" onClick={() => setIndex((value) => (value + 1) % choices.length)}>ถัดไป →</button></div></div>
      </article>
      <button type="button" className="primary-button" onClick={onMission}>รู้จักแล้ว ไปสุ่มภารกิจ!</button>
    </section>
  )
}

function MissionBrief({ mission, onDrawAgain }: { mission: Mission; onDrawAgain: () => void }) {
  const theme = mission.realm === 'mixed' ? 'mixed' : realms[mission.realm].color
  return <article className={`mission-brief ${theme}`} aria-live="polite">
    <div className="mission-topline"><span>ภารกิจที่ {String(mission.id).padStart(2, '0')}</span><span>{mission.realm === 'mixed' ? '🌈 รวม 3 ธรรม' : `${realms[mission.realm].icon} ${realms[mission.realm].title}`}</span></div>
    <h3>{mission.title}</h3>
    <ol className="route-list">{mission.steps.map((step, index) => <li key={`${step.kind}-${index}`} className={step.kind}><span>{stepIcon[step.kind]}</span>{step.label}</li>)}</ol>
    <div className="ready-check"><strong>เตรียมกระดานจริง</strong><ol><li>หยิบรูปตามภารกิจไปวางบนตาราง</li><li>วางดาวและสิ่งกีดขวางตามโจทย์</li><li>เลือกจุดเริ่มต้นของหุ่นยนต์</li><li>เขียนคำสั่ง แล้วให้เพื่อนหุ่นยนต์ลองเดิน</li></ol></div>
    <button type="button" className="secondary-button" onClick={onDrawAgain}>สุ่มภารกิจใหม่</button>
  </article>
}

function Mission() {
  const [remaining, setRemaining] = useState(() => missions.map((mission) => mission.id))
  const [selected, setSelected] = useState<Mission | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const draw = () => {
    if (isDrawing) return
    const pool = missions.filter((mission) => remaining.includes(mission.id))
    const available = pool.length ? pool : missions
    setIsDrawing(true)
    window.setTimeout(() => {
      const mission = drawMission(available)
      if (mission) {
        setSelected(mission)
        setRemaining((previous) => previous.filter((id) => id !== mission.id))
      }
      setIsDrawing(false)
    }, shouldReduceMotion ? 0 : 720)
  }

  return <section className="panel mission" aria-labelledby="mission-title">
    <div className="section-heading"><h2 id="mission-title">สุ่มภารกิจของทีม</h2><p>ไม่ต้องเลือกหมวดค่ะ กดปุ่ม แล้วออกเดินทางไปด้วยกัน!</p></div>
    <div className="draw-stage"><div className={`compass ${isDrawing ? 'spinning' : ''}`} aria-hidden="true">🧭</div><p>ในรอบนี้เหลือ <strong>{remaining.length || missions.length}</strong> ภารกิจ</p><button type="button" className="primary-button draw-button" onClick={draw} disabled={isDrawing}>{isDrawing ? 'กำลังสุ่ม...' : '✨ สุ่มภารกิจ!'}</button></div>
    {remaining.length === 0 && selected && <button type="button" className="reset-button" onClick={() => { setRemaining(missions.map((mission) => mission.id)); setSelected(null) }}>เริ่มชุดภารกิจใหม่ 20 ใบ</button>}
    {selected && <div className="mission-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><motion.div className="mission-modal" role="dialog" aria-modal="true" aria-labelledby="mission-dialog-title" initial={shouldReduceMotion ? false : { opacity: 0, scale: .92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} onMouseDown={(event) => event.stopPropagation()}><button type="button" className="modal-close" aria-label="ปิดภารกิจ" onClick={() => setSelected(null)}>×</button><div id="mission-dialog-title" className="sr-only">รายละเอียดภารกิจที่สุ่มได้</div><MissionBrief mission={selected} onDrawAgain={draw} /></motion.div></div>}
  </section>
}

export default function App() {
  const [view, setView] = useState<View>('home')
  return <MotionConfig reducedMotion="user"><main>
    <header className="hero"><Suspense fallback={null}><AdventureScene /></Suspense><div className="hero-content"><p className="eyebrow">ABS BOOTCAMP · UNPLUGGED</p><h1>ตะลุย <em>แดน 3 ธรรม</em></h1><p className="hero-copy">เรียนรู้สกลนคร แล้วออกแบบคำสั่งให้หุ่นยนต์ของทีม<span className="keep-line">เดินบนกระดานจริง</span></p><div className="hero-actions"><button type="button" className="primary-button" onClick={() => setView('knowledge')}>เริ่มเรียนรู้</button><button type="button" className="ghost-button" onClick={() => setView('mission')}>สุ่มภารกิจ</button></div></div></header>
    <nav aria-label="เมนูหลัก"><button type="button" aria-current={view === 'home' ? 'page' : undefined} onClick={() => setView('home')}>หน้าแรก</button><button type="button" aria-current={view === 'knowledge' ? 'page' : undefined} onClick={() => setView('knowledge')}>1. เรียนรู้</button><button type="button" aria-current={view === 'mission' ? 'page' : undefined} onClick={() => setView('mission')}>2. สุ่มภารกิจ</button></nav>
    {view === 'home' && <section className="home-intro"><h2><span className="home-heading-line">ดูข้อมูลก่อน แล้วไปทำภารกิจบนกระดานจริง</span></h2><div className="home-steps"><button type="button" className="flow-step" onClick={() => setView('knowledge')}><b>1</b><span>เรียนรู้สถานที่</span><small>กดเพื่อเริ่มเรียนรู้</small></button><button type="button" className="flow-step" onClick={() => setView('mission')}><b>2</b><span>สุ่มภารกิจทีม</span><small>กดเพื่อสุ่มภารกิจ</small></button><button type="button" className="flow-step" onClick={() => setView('mission')}><b>3</b><span>วางรูปบนตาราง</span><small>ดูโจทย์ภารกิจ</small></button><button type="button" className="flow-step" onClick={() => setView('mission')}><b>4</b><span>สั่งหุ่นยนต์เดิน</span><small>ดูโจทย์ภารกิจ</small></button></div></section>}
    {view === 'knowledge' && <Knowledge onMission={() => setView('mission')} />}
    {view === 'mission' && <Mission />}
    <footer>กิจกรรม Unplugged — การวางรูปและการเดินของหุ่นยนต์ทำบนกระดานจริงค่ะ</footer>
  </main></MotionConfig>
}
