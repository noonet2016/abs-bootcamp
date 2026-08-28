import { motion, MotionConfig, useReducedMotion } from 'motion/react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { drawMission } from './data/draw'
import { missions, places, realms, stepIcon, type Mission, type Realm } from './data/content'
import commandCardCollectStar from './assets/command-cards/command-card-collect-star.png'
import commandCardDown from './assets/command-cards/command-card-down.png'
import commandCardFinish from './assets/command-cards/command-card-finish.png'
import commandCardForward from './assets/command-cards/command-card-forward-preview.png'
import commandCardLeft from './assets/command-cards/command-card-left.png'
import commandCardRight from './assets/command-cards/command-card-right.png'

type View = 'home' | 'knowledge' | 'mission' | 'board' | 'robot'

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

function MissionBrief({ mission, onDrawAgain, isDrawing }: { mission: Mission; onDrawAgain: () => void; isDrawing: boolean }) {
  const theme = mission.realm === 'mixed' ? 'mixed' : realms[mission.realm].color
  const missionImages: Record<string, string> = {
    'เริ่มต้น': '/รูปสถานที่สำคัญ/จุดเริ่มต้น.png',
    'พระธาตุเชิงชุม': '/รูปสถานที่สำคัญ/วัดพระธาตุเชิงชุม.png',
    'วัดป่าสุทธาวาส': '/รูปสถานที่สำคัญ/วัดป่าสุทธาวาส.png',
    'วัดถ้ำผาแด่น': '/รูปสถานที่สำคัญ/วัดถ้ำผาแด่น.png',
    'วัดถ้ำขาม': '/รูปสถานที่สำคัญ/วัดถ้ำขาม.png',
    'วัดป่านาคนิมิตต์': '/รูปสถานที่สำคัญ/วัดป่านาคนิมิตต์.png',
    'หนองหาร': '/รูปสถานที่สำคัญ/หนองหาร.png',
    'โค้งปิ้งงู': '/รูปสถานที่สำคัญ/โค้งปิ้งงู.png',
    'ผานางเมิน': '/รูปสถานที่สำคัญ/ผานางเมิน ภูพาน.png',
    'น้ำตกคำน้ำสร้าง': '/รูปสถานที่สำคัญ/น้ำตกคำสร้าง ห้วยหวด ภูผายล.png',
    'อ่างเก็บน้ำห้วยหวด': '/รูปสถานที่สำคัญ/น้ำตกคำสร้าง ห้วยหวด ภูผายล.png',
    'อุทยานแห่งชาติภูผายล': '/รูปสถานที่สำคัญ/อุทยานแห่งชาติภูผายล.png',
    'อุทยานบัวเฉลิมพระเกียรติ': '/รูปสถานที่สำคัญ/อุทยานบัว.png',
    'ปราสาทผึ้ง': '/รูปสถานที่สำคัญ/แห่ปราสาทผึ้ง.png',
    'ประเพณีแห่ปราสาทผึ้ง': '/รูปสถานที่สำคัญ/แห่ปราสาทผึ้ง.png',
    'ผ้าย้อมคราม': '/รูปสถานที่สำคัญ/ผ้าย้อมคราม.png',
    'ผ้าย้อมครามบ้านดอนกอย': '/รูปสถานที่สำคัญ/ผ้าย้อมคราม.png',
    'ชุมชนท่าแร่': '/รูปสถานที่สำคัญ/ท่าแร่.png',
    'ประเพณีแห่ดาว': '/รูปสถานที่สำคัญ/แห่ดาว.png',
    '8 ชนเผ่า': '/รูปสถานที่สำคัญ/ชนเผ่า.png',
    '8 ชนเผ่าสกลนคร': '/รูปสถานที่สำคัญ/ชนเผ่า.png',
    'ภูไท': '/รูปสถานที่สำคัญ/ชนเผ่า.png',
    'เก็บดาว': commandCardCollectStar,
    'หลบก้อนหิน': '/รูปสถานที่สำคัญ/ก้อนหิน.png',
    'หลบต้นไม้': '/รูปสถานที่สำคัญ/ต้นไม้.png',
    'หลบถนนซ่อม': '/รูปสถานที่สำคัญ/ซ่อมถนน.png',
    'หลบสุนัขดุ': '/รูปสถานที่สำคัญ/หมาดุ.png',
  }
  const imageSteps = mission.steps.filter((step) => missionImages[step.label])
  const routeBreakAfter = mission.steps.length === 7 ? 5 : 6
  return <article className={`mission-brief ${theme} ${isDrawing ? 'mission-changing' : ''}`} aria-live="polite" aria-busy={isDrawing}>
    <div className="mission-topline"><span>ภารกิจที่ {String(mission.id).padStart(2, '0')}</span><span>{mission.realm === 'mixed' ? '🌈 รวม 3 ธรรม' : `${realms[mission.realm].icon} ${realms[mission.realm].title}`}</span></div>
    <h3>{mission.title}</h3>
    <div className="mission-image-strip" aria-label="รูปประกอบภารกิจ">
      {imageSteps.map((step, index) => <figure key={`${step.label}-${index}`} className={`mission-image-card ${step.kind}`}><img src={missionImages[step.label]} alt={step.label} /><figcaption>{step.label}</figcaption></figure>)}
    </div>
    <ol className="route-list">{mission.steps.map((step, index) => <li key={`${step.kind}-${index}`} className={step.kind}><span>{stepIcon[step.kind]}</span>{step.label}</li>).flatMap((item, index) => index > 0 && index % routeBreakAfter === 0 ? [<li key={`break-${index}`} className="route-row-break" aria-hidden="true" />, item] : [item])}</ol>
    <div className="ready-check"><strong>เตรียมกระดานจริง</strong><ol><li>หยิบรูปตามภารกิจไปวางบนตาราง</li><li>วางดาวและสิ่งกีดขวางตามโจทย์</li><li>เลือกจุดเริ่มต้นของหุ่นยนต์</li><li>เขียนคำสั่ง แล้วให้เพื่อนหุ่นยนต์ลองเดิน</li></ol></div>
    <button type="button" className="secondary-button reroll-button" onClick={onDrawAgain} disabled={isDrawing}>{isDrawing ? 'กำลังเปลี่ยนภารกิจ...' : 'สุ่มภารกิจใหม่'}</button>{isDrawing && <div className="mission-change-indicator" aria-hidden="true"><span>🧭</span><b>กำลังเลือกเส้นทางใหม่</b></div>}
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
    }, shouldReduceMotion ? 0 : 1200)
  }

  return <section className="panel mission" aria-labelledby="mission-title">
    <div className="section-heading"><h2 id="mission-title">สุ่มภารกิจของทีม</h2><p>ไม่ต้องเลือกหมวดค่ะ กดปุ่ม แล้วออกเดินทางไปด้วยกัน!</p></div>
    <div className="draw-stage"><div className={`compass ${isDrawing ? 'spinning' : ''}`} aria-hidden="true">🧭</div><p>ในรอบนี้เหลือ <strong>{remaining.length || missions.length}</strong> ภารกิจ</p><button type="button" className="primary-button draw-button" onClick={draw} disabled={isDrawing}>{isDrawing ? 'กำลังสุ่ม...' : '✨ สุ่มภารกิจ!'}</button></div>
    {remaining.length === 0 && selected && <button type="button" className="reset-button" onClick={() => { setRemaining(missions.map((mission) => mission.id)); setSelected(null) }}>เริ่มชุดภารกิจใหม่ 20 ใบ</button>}
    {selected && <div className="mission-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><motion.div className="mission-modal" role="dialog" aria-modal="true" aria-labelledby="mission-dialog-title" initial={shouldReduceMotion ? false : { opacity: 0, scale: .92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} onMouseDown={(event) => event.stopPropagation()}><button type="button" className="modal-close" aria-label="ปิดภารกิจ" onClick={() => setSelected(null)}>×</button><div id="mission-dialog-title" className="sr-only">รายละเอียดภารกิจที่สุ่มได้</div><MissionBrief mission={selected} onDrawAgain={draw} isDrawing={isDrawing} /></motion.div></div>}
  </section>
}

type RobotCommandKind = 'forward' | 'right' | 'down' | 'left' | 'star' | 'finish'
type RobotPoint = { left: string; top: string; instruction: string; card: RobotCommandKind }
const robotRoute: RobotPoint[] = [
  { left: '28.9%', top: '77.7%', instruction: 'เริ่มที่ B7', card: 'forward' },
  { left: '28.9%', top: '69.6%', instruction: 'เดินขึ้น 1 ช่อง ไป B6', card: 'forward' },
  { left: '28.9%', top: '61.5%', instruction: 'เดินขึ้น 1 ช่อง ไป B5', card: 'forward' },
  { left: '28.9%', top: '53.4%', instruction: 'เดินขึ้น 1 ช่อง ไป B4', card: 'forward' },
  { left: '28.9%', top: '45.3%', instruction: 'เดินขึ้น 1 ช่อง ไป B3', card: 'forward' },
  { left: '28.9%', top: '37.2%', instruction: 'เดินขึ้น 1 ช่อง ไป B2', card: 'forward' },
  { left: '38.6%', top: '37.2%', instruction: 'เดินขวา 1 ช่อง ไป C2: ถึงหนองหาร', card: 'right' },
  { left: '48.3%', top: '37.2%', instruction: 'เดินขวา 1 ช่อง ไป D2', card: 'right' },
  { left: '58%', top: '37.2%', instruction: 'เดินขวา 1 ช่อง ไป E2: หลบต้นไม้ด้านล่าง', card: 'right' },
  { left: '67.7%', top: '37.2%', instruction: 'เดินขวา 1 ช่อง ไป F2: ถึงผานางเมิน', card: 'right' },
  { left: '77.4%', top: '37.2%', instruction: 'เดินขวา 1 ช่อง ไป G2', card: 'right' },
  { left: '87.1%', top: '37.2%', instruction: 'เดินขวา 1 ช่อง ไป H2', card: 'right' },
  { left: '87.1%', top: '45.3%', instruction: 'เดินลง 1 ช่อง ไป H3', card: 'down' },
  { left: '87.1%', top: '53.4%', instruction: 'เดินลง 1 ช่อง ไป H4', card: 'down' },
  { left: '87.1%', top: '61.5%', instruction: 'เดินลง 1 ช่อง ไป H5: เก็บดาว!', card: 'star' },
  { left: '77.4%', top: '61.5%', instruction: 'เดินซ้าย 1 ช่อง ไป G5', card: 'left' },
  { left: '77.4%', top: '69.6%', instruction: 'เดินลง 1 ช่อง ไป G6', card: 'down' },
  { left: '77.4%', top: '77.7%', instruction: 'เดินลง 1 ช่อง ไป G7: ถึงจุดจบ!', card: 'finish' },
]

const commandCardImages: Record<RobotCommandKind, string> = {
  forward: commandCardForward,
  right: commandCardRight,
  down: commandCardDown,
  left: commandCardLeft,
  star: commandCardCollectStar,
  finish: commandCardFinish,
}

function BoardExample({ className = '', onClick, robot, starCollected = false }: { className?: string; onClick?: () => void; robot?: RobotPoint; starCollected?: boolean }) {
  const isRobotDemo = className.split(' ').includes('robot-board-image')
  const markerPositions = isRobotDemo
    ? { nongHan: { left: '38.6%', top: '37.2%' }, tree: { left: '58%', top: '53.4%' }, pha: { left: '67.7%', top: '37.2%' }, start: { left: '28.9%', top: '77.7%' }, star: { left: '87.1%', top: '61.5%' }, finish: { left: '77.4%', top: '77.7%' } }
    : { nongHan: { left: '38.6%', top: '37.2%' }, tree: { left: '58%', top: '53.4%' }, pha: { left: '67.7%', top: '37.2%' }, start: { left: '28.9%', top: '77.7%' }, star: { left: '87.1%', top: '61.5%' }, finish: { left: '77.4%', top: '77.7%' } }
  const content = <><img src="/พื้นที่เกม.png" alt="ตัวอย่างกระดาน 8 คูณ 8 ที่วางจุดเริ่มต้น หนองหาร ต้นไม้ ดาว ผานางเมิน และจุดจบ" />
    <div className="board-marker start" style={markerPositions.start}><img src="/รูปสถานที่สำคัญ/จุดเริ่มต้น.png" alt="" /><small>B7 เริ่ม</small></div>
    <div className="board-marker place" style={markerPositions.nongHan}><img src="/รูปสถานที่สำคัญ/หนองหาร.png" alt="" /><small>C2 หนองหาร</small></div>
    <div className="board-marker obstacle" style={markerPositions.tree}><img src="/รูปสถานที่สำคัญ/ต้นไม้.png" alt="" /><small>E4 ต้นไม้</small></div>
    <div className="board-marker place" style={markerPositions.pha}><img src="/รูปสถานที่สำคัญ/ผานางเมิน ภูพาน.png" alt="" /><small>F2 ผานางเมิน</small></div>
    <div className={`board-marker star ${starCollected ? 'collected' : ''}`} style={markerPositions.star}><span>{starCollected ? '✅' : '⭐'}</span><small>{starCollected ? 'H5 เก็บดาวแล้ว' : 'H5 เก็บดาว'}</small></div>
    <div className="board-marker finish" style={markerPositions.finish}><span>🏆</span><small>G7 จบ</small></div></>
  const withRobot = <>{content}{robot && <div className="board-robot" style={{ left: robot.left, top: robot.top }}><span>🤖</span><small>หุ่นยนต์</small></div>}</>
  if (onClick) return <button type="button" className={`board-demo-image ${className}`} aria-label="ขยายตัวอย่างกระดานเต็มหน้าจอ" onClick={onClick}>{withRobot}</button>
  return <div className={`board-demo-image ${className}`}>{withRobot}</div>
}


function BoardLanding({ onOpenDemo }: { onOpenDemo: () => void }) {
  return <section className="panel board-landing" aria-labelledby="board-title">
    <div className="section-heading"><h2 id="board-title">วางรูปบนตาราง</h2><p>ดูตัวอย่างการวางรูปสถานที่ ดาว และสิ่งกีดขวางบนกระดาน 8×8 ก่อนลงมือเล่นจริงค่ะ</p></div>
    <div className="activity-preview"><span aria-hidden="true">🗺️</span><p>จัดตำแหน่งภาพภารกิจบนช่อง A–H และ 1–8</p><button type="button" className="primary-button" onClick={onOpenDemo}>ดูตัวอย่างการวาง</button></div>
  </section>
}

function RobotLanding({ onOpenDemo }: { onOpenDemo: () => void }) {
  return <section className="panel robot-landing" aria-labelledby="robot-title">
    <div className="section-heading"><h2 id="robot-title">สั่งหุ่นยนต์เดิน</h2><p>ฝึกอ่านคำสั่งทีละขั้น ดูพิกัดปลายทาง แล้วกดเล่นอัตโนมัติเมื่อพร้อมค่ะ</p></div>
    <div className="activity-preview"><span aria-hidden="true">🤖</span><p>เริ่มจาก B7 แล้วเดินตามคำสั่งไปเก็บดาวและถึงจุดจบ</p><button type="button" className="primary-button" onClick={onOpenDemo}>ดูตัวอย่างการเดิน</button></div>
  </section>
}

function BoardDemoModal({ onClose }: { onClose: () => void }) {
  return <div className="mission-backdrop" role="presentation" onMouseDown={onClose}>
    <motion.div className="board-demo-modal" role="dialog" aria-modal="true" aria-labelledby="board-demo-title" initial={{ opacity: 0, scale: .94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} onMouseDown={(event) => event.stopPropagation()}>
      <button type="button" className="modal-close" aria-label="ปิดตัวอย่างการวางรูป" onClick={onClose}>×</button>
      <h2 id="board-demo-title">ตัวอย่างการวางภารกิจบนกระดาน</h2>
      <p>วางรูปสถานที่ ดาว และสิ่งกีดขวางลงตามช่อง แล้วให้ทีมเลือกเส้นทางเดินเองค่ะ</p>
      <BoardExample className="robot-board-image board-example-robot-copy" robot={robotRoute[0]} />
      <p className="board-demo-note">นี่เป็นตัวอย่างเท่านั้น — ทีมสามารถวางรูปและออกแบบเส้นทางใหม่ได้เอง</p>
    </motion.div>
  </div>
}

function RobotDemoModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0)
  const [isPlaying, setPlaying] = useState(false)
  const [speedLevel, setSpeedLevel] = useState(1)
  const currentStepRef = useRef<HTMLLIElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const current = robotRoute[step]
  const currentInstruction = current.instruction.replace(': ', ':\n')
  const stepDelay = 1600 - speedLevel * 120
  const starCollected = step >= 14

  useEffect(() => {
    if (!isPlaying || step >= robotRoute.length - 1) return undefined
    const timer = window.setTimeout(() => setStep((value) => value + 1), stepDelay)
    return () => window.clearTimeout(timer)
  }, [isPlaying, step, stepDelay])

  useEffect(() => {
    currentStepRef.current?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'center' })
  }, [shouldReduceMotion, step])

  const replay = () => { setStep(0); setPlaying(false) }
  const stop = () => { setStep(0); setPlaying(false) }
  const previousStep = () => { setPlaying(false); setStep((value) => Math.max(0, value - 1)) }
  const nextStep = () => { setPlaying(false); setStep((value) => Math.min(robotRoute.length - 1, value + 1)) }
  const playAuto = () => setPlaying(true)
  return <div className="mission-backdrop robot-backdrop" role="presentation" onMouseDown={onClose}>
    <motion.div className="robot-demo-modal" role="dialog" aria-modal="true" aria-labelledby="robot-demo-title" initial={{ opacity: 0, scale: .94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} onMouseDown={(event) => event.stopPropagation()}>
      <button type="button" className="modal-close" aria-label="ปิดตัวอย่างหุ่นยนต์เดิน" onClick={onClose}>×</button>
      <h2 id="robot-demo-title">ตัวอย่างสั่งหุ่นยนต์เดิน</h2>
      <div className="robot-demo-layout">
        <aside className="robot-current-column" aria-label="คำสั่งปัจจุบัน"><h3 className="robot-current-title">คำสั่งตอนนี้</h3><div className="robot-flow-popup"><div className="robot-command" aria-live="polite"><img src={commandCardImages[current.card]} alt={current.instruction} /><strong>{currentInstruction}</strong><small>ขั้นที่ {step + 1} / {robotRoute.length}</small></div></div></aside>
        <div className="robot-board-wrap"><BoardExample className="robot-board-image" robot={current} starCollected={starCollected} /></div>
        <aside className="robot-card-column" aria-label="การ์ดลำดับคำสั่งของหุ่นยนต์"><h3 className="robot-card-title">การ์ดคำสั่ง</h3><div className="robot-card-sequence"><ol>{robotRoute.slice(1).map((point, index) => { const routeIndex = index + 1; return <li key={`${point.left}-${point.top}-${index}`} ref={routeIndex === step ? currentStepRef : undefined} className={routeIndex < step ? 'completed' : routeIndex === step ? 'current' : ''} aria-current={routeIndex === step ? 'step' : undefined}><span>{routeIndex}</span><img src={commandCardImages[point.card]} alt={point.instruction} /><p>{point.instruction}</p></li> })}</ol></div></aside>
      </div>
      <div className="robot-controls"><label className="speed-control"><span>ช้า</span><input type="range" min="1" max="10" step="1" value={speedLevel} onChange={(event) => setSpeedLevel(Number(event.currentTarget.value))} aria-label="ปรับความเร็วการเดินของหุ่นยนต์ ซ้ายช้า ขวาเร็ว" /><span>เร็ว</span></label><div className="icon-controls" aria-label="ควบคุมตัวอย่างหุ่นยนต์"><button type="button" className="step-button" aria-label="ย้อนกลับหนึ่งขั้น" onClick={previousStep} disabled={step === 0}>ก่อนหน้า</button><button type="button" className="step-button" aria-label="ดูขั้นถัดไป" onClick={nextStep} disabled={step === robotRoute.length - 1}>ถัดไป</button><button type="button" className="icon-button play" aria-label="เล่นอัตโนมัติ" onClick={playAuto}>▶<span>อัตโนมัติ</span></button><button type="button" className="icon-button pause" aria-label="หยุดชั่วคราว" onClick={() => setPlaying(false)}>⏸</button><button type="button" className="icon-button stop" aria-label="หยุดและกลับจุดเริ่มต้น" onClick={stop}>■</button><button type="button" className="icon-button reset" aria-label="เริ่มตัวอย่างใหม่" onClick={replay}>↻</button></div></div>
    </motion.div>
  </div>
}

export default function App() {
  const [view, setView] = useState<View>('home')
  const [isBoardDemoOpen, setBoardDemoOpen] = useState(false)
  const [isRobotDemoOpen, setRobotDemoOpen] = useState(false)
  return <MotionConfig reducedMotion="user"><main className={`${view}-view`}>
    <header className="hero"><Suspense fallback={null}><AdventureScene /></Suspense><div className="hero-content"><h1>ตะลุย <em>แดน 3 ธรรม</em></h1><p className="hero-copy">เรียนรู้สกลนคร แล้วออกแบบคำสั่งให้หุ่นยนต์ของทีม<span className="keep-line">เดินบนกระดานจริง</span></p></div></header>
    <nav aria-label="เมนูหลัก"><button type="button" className={view === 'home' ? 'active' : undefined} aria-current={view === 'home' ? 'page' : undefined} onClick={() => setView('home')}>หน้าแรก</button><button type="button" className={view === 'knowledge' ? 'active' : undefined} aria-current={view === 'knowledge' ? 'page' : undefined} onClick={() => setView('knowledge')}>1. เรียนรู้</button><button type="button" className={view === 'mission' ? 'active' : undefined} aria-current={view === 'mission' ? 'page' : undefined} onClick={() => setView('mission')}>2. สุ่มภารกิจ</button><button type="button" className={view === 'board' ? 'active' : undefined} aria-current={view === 'board' ? 'page' : undefined} onClick={() => setView('board')}>3. วางรูปบนตาราง</button><button type="button" className={view === 'robot' ? 'active' : undefined} aria-current={view === 'robot' ? 'page' : undefined} onClick={() => setView('robot')}>4. สั่งหุ่นยนต์เดิน</button></nav>
    {view === 'home' && <section className="home-intro"><h2><span className="home-heading-line">ดูข้อมูลก่อน แล้วไปทำภารกิจบนกระดานจริง</span></h2><div className="home-steps"><button type="button" className="flow-step" onClick={() => setView('knowledge')}><b>1</b><span>เรียนรู้สถานที่</span><small>กดเพื่อเริ่มเรียนรู้</small></button><button type="button" className="flow-step" onClick={() => setView('mission')}><b>2</b><span>สุ่มภารกิจทีม</span><small>กดเพื่อสุ่มภารกิจ</small></button><button type="button" className="flow-step" onClick={() => setView('board')}><b>3</b><span>วางรูปบนตาราง</span><small>ดูตัวอย่างการวาง</small></button><button type="button" className="flow-step" onClick={() => setView('robot')}><b>4</b><span>สั่งหุ่นยนต์เดิน</span><small>ดูตัวอย่างการเดิน</small></button></div></section>}
    {view === 'knowledge' && <Knowledge onMission={() => setView('mission')} />}
    {view === 'mission' && <Mission />}
    {view === 'board' && <BoardLanding onOpenDemo={() => setBoardDemoOpen(true)} />}
    {view === 'robot' && <RobotLanding onOpenDemo={() => setRobotDemoOpen(true)} />}
    <footer>กิจกรรม Unplugged — การวางรูปและการเดินของหุ่นยนต์ทำบนกระดานจริงค่ะ</footer>
    {isBoardDemoOpen && <BoardDemoModal onClose={() => setBoardDemoOpen(false)} />}
    {isRobotDemoOpen && <RobotDemoModal onClose={() => setRobotDemoOpen(false)} />}
  </main></MotionConfig>
}
