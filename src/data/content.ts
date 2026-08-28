import { asset } from '../base'
export type Realm = 'dhamma' | 'nature' | 'culture'
export type MissionRealm = Realm | 'mixed'
export type StepKind = 'start' | 'place' | 'star' | 'avoid' | 'finish'

export type Place = {
  id: string
  realm: Realm
  title: string
  summary: string
  image?: string
}

export type MissionStep = { kind: StepKind; label: string }
export type Mission = {
  id: number
  realm: MissionRealm
  title: string
  steps: MissionStep[]
}

const image = (file: string) => asset(`/รูปสถานที่สำคัญ/${file}`)

export const realms: Record<Realm, { title: string; short: string; icon: string; color: string }> = {
  dhamma: { title: 'แดนธรรมะ', short: 'เที่ยววัด เรียนรู้ใจสงบ', icon: '🛕', color: 'gold' },
  nature: { title: 'แดนธรรมชาติ', short: 'ตามหาป่า ภูเขา และสายน้ำ', icon: '🌿', color: 'leaf' },
  culture: { title: 'แดนวัฒนธรรม', short: 'พบผ้าคราม ประเพณี และผู้คน', icon: '🧵', color: 'indigo' },
}

export const places: Place[] = [
  { id: 'phra-that', realm: 'dhamma', title: 'วัดพระธาตุเชิงชุมวรวิหาร', summary: 'พระธาตุสำคัญคู่เมืองสกลนคร มีหลวงพ่อพระองค์แสนอยู่ภายในวัด', image: image('วัดพระธาตุเชิงชุม.png') },
  { id: 'sutthawat', realm: 'dhamma', title: 'วัดป่าสุทธาวาส', summary: 'วัดสำคัญของสายพระกรรมฐาน และเกี่ยวข้องกับหลวงปู่มั่น ภูริทัตโต', image: image('วัดป่าสุทธาวาส.png') },
  { id: 'pha-daen', realm: 'dhamma', title: 'วัดถ้ำผาแด่น', summary: 'วัดบนเทือกเขาภูพาน มีงานแกะสลักหินเล่าเรื่องพุทธประวัติ', image: image('วัดถ้ำผาแด่น.png') },
  { id: 'tham-kham', realm: 'dhamma', title: 'วัดถ้ำขาม', summary: 'สถานที่ปฏิบัติธรรมในอำเภอพรรณานิคม', image: image('วัดถ้ำขาม.png') },
  { id: 'nak-nimit', realm: 'dhamma', title: 'วัดป่านาคนิมิตต์', summary: 'วัดที่เกี่ยวเนื่องกับหลวงปู่มั่น และการปฏิบัติธรรม', image: image('วัดป่านาคนิมิตต์.png') },
  { id: 'nong-han', realm: 'nature', title: 'หนองหาร', summary: 'ทะเลสาบน้ำจืดใหญ่ของอีสาน เป็นบ้านของนกน้ำ ปลา และพืชน้ำ', image: image('หนองหาร.png') },
  { id: 'phu-phan', realm: 'nature', title: 'อุทยานแห่งชาติภูพาน', summary: 'ผืนป่าภูเขาที่มีน้ำตก จุดชมวิว และทุ่งดอกไม้ป่า', image: image('อุทยานแห่งชาติภูพาน.png') },
  { id: 'kham-nam-sang', realm: 'nature', title: 'น้ำตกคำน้ำสร้าง', summary: 'น้ำตกในเขตภูพาน ใกล้อ่างเก็บน้ำห้วยหวด', image: image('น้ำตกคำสร้าง ห้วยหวด ภูผายล.png') },
  { id: 'pha-nang-moen', realm: 'nature', title: 'ผานางเมิน', summary: 'จุดชมวิวบนภูพาน เหมาะกับการมองธรรมชาติจากที่สูง', image: image('ผานางเมิน ภูพาน.png') },
  { id: 'khong-ping-ngu', realm: 'nature', title: 'โค้งปิ้งงู', summary: 'ถนนคดเคี้ยวบนเส้นทางภูพานที่มีชื่อจำง่าย', image: image('โค้งปิ้งงู.png') },
  { id: 'bua', realm: 'nature', title: 'อุทยานบัวเฉลิมพระเกียรติ', summary: 'บึงที่มีบัวหลากหลายพันธุ์และสะพานเดินชม', image: image('อุทยานบัว.png') },
  { id: 'phu-phayon', realm: 'nature', title: 'อุทยานแห่งชาติภูผายล', summary: 'อุทยานภูเขา ป่าไม้ หน้าผา และลำห้วย', image: image('อุทยานแห่งชาติภูผายล.png') },
  { id: 'wax', realm: 'culture', title: 'ประเพณีแห่ปราสาทผึ้ง', summary: 'ประเพณีสำคัญช่วงออกพรรษา มีขบวนแห่ปราสาทผึ้งอันประณีต', image: image('แห่ปราสาทผึ้ง.png') },
  { id: 'indigo', realm: 'culture', title: 'ผ้าย้อมครามสกลนคร', summary: 'ภูมิปัญญาการย้อมเส้นฝ้ายด้วยครามและทอเป็นผืนผ้า', image: image('ผ้าย้อมคราม.png') },
  { id: 'tha-rae', realm: 'culture', title: 'ชุมชนท่าแร่', summary: 'ชุมชนเก่าแก่ริมหนองหาร มีอาคารเก่าและวิถีวัฒนธรรมที่โดดเด่น', image: image('ท่าแร่.png') },
  { id: 'tribes', realm: 'culture', title: '8 ชนเผ่าสกลนคร', summary: 'สกลนครมีความหลากหลายของกลุ่มชาติพันธุ์และวิถีชีวิต', image: image('ชนเผ่า.png') },
  { id: 'star-parade', realm: 'culture', title: 'ประเพณีแห่ดาว', summary: 'ประเพณีคริสต์มาสของชุมชนท่าแร่ที่สว่างไสวและมีชื่อเสียง', image: image('แห่ดาว.png') },
]

const start = (): MissionStep => ({ kind: 'start', label: 'เริ่มต้น' })
const place = (label: string): MissionStep => ({ kind: 'place', label })
const star = (): MissionStep => ({ kind: 'star', label: 'เก็บดาว' })
const avoid = (label: string): MissionStep => ({ kind: 'avoid', label: `หลบ${label}` })
const finish = (): MissionStep => ({ kind: 'finish', label: 'จบภารกิจ' })

export const missions: Mission[] = [
  { id: 1, realm: 'dhamma', title: 'ตะลุยแดนธรรมะ', steps: [start(), place('พระธาตุเชิงชุม'), star(), place('วัดป่าสุทธาวาส'), avoid('ก้อนหิน'), place('วัดถ้ำผาแด่น'), finish()] },
  { id: 2, realm: 'dhamma', title: 'เส้นทางวัดป่า', steps: [start(), place('วัดป่าสุทธาวาส'), avoid('ต้นไม้'), star(), place('วัดถ้ำขาม'), finish()] },
  { id: 3, realm: 'dhamma', title: 'พิชิตวัดบนภู', steps: [start(), place('วัดถ้ำขาม'), avoid('ก้อนหิน'), place('วัดถ้ำผาแด่น'), star(), finish()] },
  { id: 4, realm: 'dhamma', title: 'ตามรอยพระธาตุ', steps: [start(), star(), place('พระธาตุเชิงชุม'), avoid('ถนนซ่อม'), place('วัดป่าสุทธาวาส'), finish()] },
  { id: 5, realm: 'dhamma', title: 'ธรรมะฝ่าอุปสรรค', steps: [start(), place('วัดป่านาคนิมิตต์'), avoid('สุนัขดุ'), star(), place('วัดถ้ำขาม'), finish()] },
  { id: 6, realm: 'dhamma', title: 'นักเดินทางสายธรรม', steps: [start(), place('พระธาตุเชิงชุม'), avoid('ก้อนหิน'), place('วัดป่านาคนิมิตต์'), avoid('ต้นไม้'), place('วัดถ้ำผาแด่น'), finish()] },
  { id: 7, realm: 'nature', title: 'ตะลุยธรรมชาติ', steps: [start(), place('หนองหาร'), star(), avoid('ต้นไม้'), place('ผานางเมิน'), finish()] },
  { id: 8, realm: 'nature', title: 'พิชิตภูพาน', steps: [start(), place('โค้งปิ้งงู'), avoid('ถนนซ่อม'), star(), place('ผานางเมิน'), finish()] },
  { id: 9, realm: 'nature', title: 'ตามหาสายน้ำ', steps: [start(), place('น้ำตกคำน้ำสร้าง'), avoid('ก้อนหิน'), place('อ่างเก็บน้ำห้วยหวด'), star(), finish()] },
  { id: 10, realm: 'nature', title: 'นักสำรวจภูผายล', steps: [start(), avoid('ต้นไม้'), place('อุทยานแห่งชาติภูผายล'), star(), place('น้ำตกคำน้ำสร้าง'), finish()] },
  { id: 11, realm: 'nature', title: 'เส้นทางบัวบาน', steps: [start(), place('หนองหาร'), star(), place('อุทยานบัวเฉลิมพระเกียรติ'), avoid('สุนัขดุ'), finish()] },
  { id: 12, realm: 'nature', title: 'ธรรมชาติสุดท้าทาย', steps: [start(), place('ผานางเมิน'), avoid('ก้อนหิน'), place('โค้งปิ้งงู'), avoid('ถนนซ่อม'), place('หนองหาร'), finish()] },
  { id: 13, realm: 'culture', title: 'ตะลุยวัฒนธรรม', steps: [start(), place('ปราสาทผึ้ง'), star(), place('ผ้าย้อมคราม'), avoid('ต้นไม้'), place('8 ชนเผ่า'), finish()] },
  { id: 14, realm: 'culture', title: 'ตามหาครามสกล', steps: [start(), place('ผ้าย้อมครามบ้านดอนกอย'), star(), avoid('ก้อนหิน'), place('ภูไท'), finish()] },
  { id: 15, realm: 'culture', title: 'ตามแสงดาวท่าแร่', steps: [start(), place('ชุมชนท่าแร่'), star(), place('ประเพณีแห่ดาว'), avoid('ถนนซ่อม'), finish()] },
  { id: 16, realm: 'culture', title: 'ตามรอย 8 พี่น้อง', steps: [start(), place('ภูไท'), avoid('ต้นไม้'), star(), place('8 ชนเผ่าสกลนคร'), finish()] },
  { id: 17, realm: 'culture', title: 'เส้นทางประเพณี', steps: [start(), place('ประเพณีแห่ปราสาทผึ้ง'), avoid('สุนัขดุ'), star(), place('ประเพณีแห่ดาว'), finish()] },
  { id: 18, realm: 'mixed', title: 'สามธรรมมหาสนุก', steps: [start(), place('พระธาตุเชิงชุม'), star(), place('หนองหาร'), avoid('ก้อนหิน'), place('ผ้าย้อมคราม'), finish()] },
  { id: 19, realm: 'mixed', title: 'รอบเมืองสกลนคร', steps: [start(), place('วัดป่าสุทธาวาส'), avoid('ต้นไม้'), place('ผานางเมิน'), star(), place('ปราสาทผึ้ง'), finish()] },
  { id: 20, realm: 'mixed', title: 'ผู้พิชิตแดน 3 ธรรม', steps: [start(), place('วัดถ้ำผาแด่น'), avoid('ก้อนหิน'), place('อุทยานแห่งชาติภูผายล'), star(), avoid('ถนนซ่อม'), place('8 ชนเผ่าสกลนคร'), avoid('สุนัขดุ'), finish()] },
]

export const stepIcon: Record<StepKind, string> = { start: '🚩', place: '📍', star: '⭐', avoid: '⚠️', finish: '🏆' }
