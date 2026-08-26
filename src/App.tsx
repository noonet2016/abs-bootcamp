import { motion, MotionConfig, useReducedMotion } from 'motion/react'
import { lazy, Suspense, useEffect, useState } from 'react'
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

type RobotPoint = { left: string; top: string; instruction: string }

const robotRoute: RobotPoint[] = [
  { left: '28.9%', top: '77.7%', instruction: 'เริ่มที่ B7' }, { left: '28.9%', top: '69.6%', instruction: 'เดินขึ้น 1 ช่อง' }, { left: '28.9%', top: '61.5%', instruction: 'เดินขึ้น 1 ช่อง' }, { left: '28.9%', top: '53.4%', instruction: 'เดินขึ้น 1 ช่อง' }, { left: '28.9%', top: '45.3%', instruction: 'เดินขึ้น 1 ช่อง' }, { left: '38.6%', top: '45.3%', instruction: 'เดินขวา: ถึงหนองหาร' }, { left: '48.3%', top: '45.3%', instruction: 'เดินขวา: หลบต้นไม้ด้านล่าง' }, { left: '58%', top: '45.3%', instruction: 'เดินขวา 1 ช่อง' }, { left: '67.7%', top: '45.3%', instruction: 'เดินขวา 1 ช่อง' }, { left: '67.7%', top: '37.2%', instruction: 'เดินขึ้น: ถึงผานางเมิน' }, { left: '77.4%', top: '37.2%', instruction: 'เดินขวา 1 ช่อง' }, { left: '87.1%', top: '37.2%', instruction: 'เดินขวา 1 ช่อง' }, { left: '87.1%', top: '45.3%', instruction: 'เดินลง 1 ช่อง' }, { left: '87.1%', top: '53.4%', instruction: 'เดินลง 1 ช่อง' }, { left: '87.1%', top: '61.5%', instruction: 'เดินลง: เก็บดาว!' }, { left: '77.4%', top: '61.5%', instruction: 'เดินซ้าย 1 ช่อง' }, { left: '77.4%', top: '69.6%', instruction: 'เดินลง 1 ช่อง' }, { left: '77.4%', top: '77.7%', instruction: 'เดินลง: ถึงจุดจบ!' },
]

function BoardExample({ className = '', onClick, robot, starCollected = false }: { className?: string; onClick?: () => void; robot?: RobotPoint; starCollected?: boolean }) {
  const content = <><img src="/พื้นที่เกม.png" alt="ตัวอย่างกระดาน 8 คูณ 8 ที่วางจุดเริ่มต้น หนองหาร ต้นไม้ ดาว ผานางเมิน และจุดจบ" />
    <div className="board-marker start" style={{ left: '28.9%', top: '77.7%' }}><img src="/รูปสถานที่สำคัญ/จุดเริ่มต้น.png" alt="" /><small>B7 เริ่ม</small></div>
    <div className="board-marker place" style={{ left: '38.6%', top: '45.3%' }}><img src="/รูปสถานที่สำคัญ/หนองหาร.png" alt="" /><small>C3 หนองหาร</small></div>
    <div className="board-marker obstacle" style={{ left: '48.3%', top: '53.4%' }}><img src="/รูปสถานที่สำคัญ/ต้นไม้.png" alt="" /><small>D4 ต้นไม้</small></div>
    <div className="board-marker place" style={{ left: '67.7%', top: '37.2%' }}><img src="/รูปสถานที่สำคัญ/ผานางเมิน ภูพาน.png" alt="" /><small>F2 ผานางเมิน</small></div>
    <div className={`board-marker star ${starCollected ? 'collected' : ''}`} style={{ left: '87.1%', top: '61.5%' }}><span>{starCollected ? '✅' : '⭐'}</span><small>{starCollected ? 'H5 เก็บแล้ว' : 'H5 เก็บดาว'}</small></div>
    <div className="board-marker finish" style={{ left: '77.4%', top: '77.7%' }}><span>🏆</span><small>G7 จบ</small></div></>
  const withRobot = <>{content}{robot && <div className="board-robot" style={{ left: robot.left, top: robot.top }}><span>🤖</span><small>หุ่นยนต์</small></div>}</>
  if (onClick) return <button type="button" className={`board-demo-image ${className}`} aria-label="ขยายตัวอย่างกระดานเต็มหน้าจอ" onClick={onClick}>{withRobot}</button>
  return <div className={`board-demo-image ${className}`}>{withRobot}</div>
}

function BoardDemoModal({ onClose }: { onClose: () => void }) {
  const [isFullscreen, setFullscreen] = useState(false)
  return <div className="mission-backdrop" role="presentation" onMouseDown={onClose}>
    <motion.div className="board-demo-modal" role="dialog" aria-modal="true" aria-labelledby="board-demo-title" initial={{ opacity: 0, scale: .94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} onMouseDown={(event) => event.stopPropagation()}>
      <button type="button" className="modal-close" aria-label="ปิดตัวอย่างการวางรูป" onClick={onClose}>×</button>
      <h2 id="board-demo-title">ตัวอย่างการวางภารกิจบนกระดาน</h2>
      <p>วางรูปสถานที่ ดาว และสิ่งกีดขวางลงตามช่อง แล้วให้ทีมเลือกเส้นทางเดินเองค่ะ</p>
      <BoardExample onClick={() => setFullscreen(true)} />
      <p className="board-demo-note">นี่เป็นตัวอย่างเท่านั้น — ทีมสามารถวางรูปและออกแบบเส้นทางใหม่ได้เอง</p>
    </motion.div>
    {isFullscreen && <div className="board-fullscreen" role="dialog" aria-modal="true" aria-label="ตัวอย่างกระดานแบบเต็มหน้าจอ" onMouseDown={(event) => { event.stopPropagation(); setFullscreen(false) }}><button type="button" className="modal-close board-fullscreen-close" aria-label="ปิดภาพเต็มหน้าจอ" onClick={() => setFullscreen(false)}>×</button><div onMouseDown={(event) => event.stopPropagation()}><BoardExample className="board-fullscreen-image" /></div></div>}
  </div>
}

function RobotDemoModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [isPlaying, setPlaying] = useState(true)
  const current = robotRoute[step]
  const starCollected = step >= 14

  useEffect(() => {
    if (!isPlaying || step >= robotRoute.length - 1) return undefined
    const timer = window.setTimeout(() => setStep((value) => value + 1), 720)
    return () => window.clearTimeout(timer)
  }, [isPlaying, step])

  const replay = () => { setStep(0); setPlaying(true) }

  return <div className="mission-backdrop robot-backdrop" role="presentation" onMouseDown={onClose}>
    <motion.div className="robot-demo-modal" role="dialog" aria-modal="true" aria-labelledby="robot-demo-title" initial={{ opacity: 0, scale: .94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} onMouseDown={(event) => event.stopPropagation()}>
      <button type="button" className="modal-close" aria-label="ปิดตัวอย่างหุ่นยนต์เดิน" onClick={onClose}>×</button>
      <h2 id="robot-demo-title">ตัวอย่างสั่งหุ่นยนต์เดิน</h2>
      <div className="robot-command" aria-live="polite"><span>คำสั่งตอนนี้</span><strong>{current.instruction}</strong><small>ขั้นที่ {step + 1} / {robotRoute.length}</small></div>
      <div className="robot-demo-layout"><BoardExample className="robot-board-image" robot={current} starCollected={starCollected} /><aside className="robot-flow-panel" aria-label="ลำดับคำสั่งของหุ่นยนต์"><h3>ลำดับการเดิน</h3><ol>{robotRoute.map((point, index) => <li key={`${point.left}-${point.top}`} className={index < step ? 'completed' : index === step ? 'current' : ''} aria-current={index === step ? 'step' : undefined}><span>{index < step ? '✓' : index + 1}</span><p>{point.instruction}</p></li>)}</ol></aside></div>
      <div className="robot-controls"><button type="button" className="secondary-button" onClick={() => setPlaying((value) => !value)}>{isPlaying ? 'หยุดชั่วคราว' : 'เล่นต่อ'}</button><button type="button" className="primary-button" onClick={replay}>↻ เล่นตัวอย่างใหม่</button></div>
    </motion.div>
  </div>
}

export default function App() {
  const [view, setView] = useState<View>('home')
  const [isBoardDemoOpen, setBoardDemoOpen] = useState(false)
  const [isRobotDemoOpen, setRobotDemoOpen] = useState(false)
  return <MotionConfig reducedMotion="user"><main>
    <header className="hero"><Suspense fallback={null}><AdventureScene /></Suspense><div className="hero-content"><p className="eyebrow">ABS BOOTCAMP · UNPLUGGED</p><h1>ตะลุย <em>แดน 3 ธรรม</em></h1><p className="hero-copy">เรียนรู้สกลนคร แล้วออกแบบคำสั่งให้หุ่นยนต์ของทีม<span className="keep-line">เดินบนกระดานจริง</span></p><div className="hero-actions"><button type="button" className="primary-button" onClick={() => setView('knowledge')}>เริ่มเรียนรู้</button><button type="button" className="ghost-button" onClick={() => setView('mission')}>สุ่มภารกิจ</button></div></div></header>
    <nav aria-label="เมนูหลัก"><button type="button" aria-current={view === 'home' ? 'page' : undefined} onClick={() => setView('home')}>หน้าแรก</button><button type="button" aria-current={view === 'knowledge' ? 'page' : undefined} onClick={() => setView('knowledge')}>1. เรียนรู้</button><button type="button" aria-current={view === 'mission' ? 'page' : undefined} onClick={() => setView('mission')}>2. สุ่มภารกิจ</button></nav>
    {view === 'home' && <section className="home-intro"><h2><span className="home-heading-line">ดูข้อมูลก่อน แล้วไปทำภารกิจบนกระดานจริง</span></h2><div className="home-steps"><button type="button" className="flow-step" onClick={() => setView('knowledge')}><b>1</b><span>เรียนรู้สถานที่</span><small>กดเพื่อเริ่มเรียนรู้</small></button><button type="button" className="flow-step" onClick={() => setView('mission')}><b>2</b><span>สุ่มภารกิจทีม</span><small>กดเพื่อสุ่มภารกิจ</small></button><button type="button" className="flow-step" onClick={() => setBoardDemoOpen(true)}><b>3</b><span>วางรูปบนตาราง</span><small>ดูตัวอย่างการวาง</small></button><button type="button" className="flow-step" onClick={() => setRobotDemoOpen(true)}><b>4</b><span>สั่งหุ่นยนต์เดิน</span><small>ดูตัวอย่างการเดิน</small></button></div></section>}
    {view === 'knowledge' && <Knowledge onMission={() => setView('mission')} />}
    {view === 'mission' && <Mission />}
    <footer>กิจกรรม Unplugged — การวางรูปและการเดินของหุ่นยนต์ทำบนกระดานจริงค่ะ</footer>
    {isBoardDemoOpen && <BoardDemoModal onClose={() => setBoardDemoOpen(false)} />}
    {isRobotDemoOpen && <RobotDemoModal onClose={() => setRobotDemoOpen(false)} />}
  </main></MotionConfig>
}
