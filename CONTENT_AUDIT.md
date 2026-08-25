# Content Audit — Dan 3 Tham website

**Scope:** `data/แดน 3 ธรรม.docx`, `data/ภารกิจเส้นทาง.docx`, and the PNG assets in `data/รูปสถานที่สำคัญ/`.

**Audit date:** 2026-08-26  
**Rule for implementation:** Preserve the original DOCX files. The website should use the canonical IDs and display labels below; it may retain source wording only in a `sourceLabel` field when traceability is useful.

## Decision summary

- The documents support a two-part site: **Knowledge** (three learning domains) and **Mission** (20 unplugged route cards).
- A mission must be a sequence of typed game events, not a raw prose string. This keeps the display, randomiser, accessibility copy, and future print view consistent.
- Do **not** claim that the card sequence is a real geographic route. Learners place the cards and choose the grid route themselves on the physical 8×8 board.
- Correct two factual naming problems before publishing: `น้ำตกคำหอม` / `น้ำตกคำสร้าง` and `ภูผายน`.

## Canonical learning content

| ID | Category | Canonical display label | Asset | Implementation status |
| --- | --- | --- | --- | --- |
| `phra-that-choeng-chum` | dhamma | วัดพระธาตุเชิงชุมวรวิหาร | `วัดพระธาตุเชิงชุม.png` | ready |
| `wat-pa-sutthawat` | dhamma | วัดป่าสุทธาวาส | `วัดป่าสุทธาวาส.png` | ready |
| `wat-tham-pha-daen` | dhamma | วัดถ้ำผาแด่น | `วัดถ้ำผาแด่น.png` | ready; TAT spells the name `วัดถ้ำผาเด่น`, so keep this as an alias rather than silently changing the supplied card. |
| `wat-tham-kham` | dhamma | วัดถ้ำขาม | `วัดถ้ำขาม.png` | ready |
| `wat-pa-nak-nimit` | dhamma | วัดป่านาคนิมิตต์ | `วัดป่านาคนิมิตต์.png` | ready; verified in a provincial Office of Buddhism record. |
| `nong-han` | nature | หนองหาร | `หนองหาร.png` | ready |
| `phu-phan-park` | nature | อุทยานแห่งชาติภูพาน | — | knowledge-only unless a new card is supplied |
| `kham-nam-sang-waterfall` | nature | น้ำตกคำน้ำสร้าง | — | **needs image**; correct label for mission 9 / knowledge text |
| `pha-nang-moen` | nature | ผานางเมิน | `ผานางเมิน ภูพาน.png` | ready |
| `khong-ping-ngu` | nature | โค้งปิ้งงู | `โค้งปิ้งงู.png` | ready |
| `bua-chaloem-phrakiat-park` | nature | อุทยานบัวเฉลิมพระเกียรติ | `อุทยานบัว.png` | ready with asset alias |
| `phu-phayon-park` | nature | อุทยานแห่งชาติภูผายล | `ภูผายน.png` | ready with corrected display label and asset alias |
| `huai-huat-reservoir` | nature | อ่างเก็บน้ำห้วยหวด | — | **needs image**; appears in mission 9 only |
| `wax-castle-parade` | culture | ประเพณีแห่ปราสาทผึ้ง | `แห่ปราสาทผึ้ง.png` | ready |
| `sakonnakhon-indigo` | culture | ผ้าย้อมครามสกลนคร | choose one: `ผ้าคราม.png` or `ผ้าย้อมคราม.png` | needs visual/content-owner choice; files are different, not duplicates |
| `tha-rae-community` | culture | ชุมชนท่าแร่ | `ท่าแร่.png` | ready |
| `phu-thai` | culture | ภูไท | — | **needs image**; appears in missions 14 and 16 |
| `eight-ethnic-groups` | culture | 8 ชนเผ่าสกลนคร | `ชนเผ่า.png` | ready with asset alias |
| `star-parade` | culture | ประเพณีแห่ดาว | `แห่ดาว.png` | ready |


## Verified corrections and source discrepancies

| Supplied wording | Decision for website | Evidence / reason |
| --- | --- | --- |
| Knowledge document: `น้ำตกคำหอม`; mission 9: `น้ำตกคำสร้าง` | Use **น้ำตกคำน้ำสร้าง**; add both supplied forms as search aliases only. | Sakon Nakhon Provincial Administrative Organisation lists `น้ำตกคำน้ำสร้าง` in Phu Phan National Park and describes it near Huai Huat Reservoir. |
| Asset + mission: `ภูผายน`; knowledge document: `อุทยานแห่งชาติภูผายน` | Use **อุทยานแห่งชาติภูผายล**. Keep `ภูผายน` as an asset/source alias. | TAT and Sakon Nakhon PAO both use `อุทยานแห่งชาติภูผายล` / `ภูผายล`. |
| `วัดถ้ำผาแด่น` in supplied material; TAT page: `วัดถ้ำผาเด่น` | Display supplied label **วัดถ้ำผาแด่น** for card consistency; recognize `วัดถ้ำผาเด่น` as an alternate spelling. | This is a spelling variance; no change is required to the original asset/card. |
| `วัดป่านาคนิมิตต์` appears with broken spacing in extracted mission text | Use **วัดป่านาคนิมิตต์**. | Provincial Office of Buddhism uses this exact spelling. |
| Mission `ผ้าย้อมครามบ้านดอนกอย` vs broader knowledge topic `ผ้าย้อมครามสกลนคร` | Keep mission label `ผ้าย้อมครามบ้านดอนกอย`; link it to broader `sakonnakhon-indigo` knowledge card, unless a separate Ban Don Koi card/image is supplied. | PAO identifies the Ban Don Koi indigo-learning centre; the supplied image is not labelled specifically for that site. |

## Asset mapping and gameplay tokens

### Existing game tokens

| Canonical ID | File | Meaning |
| --- | --- | --- |
| `start` | `จุดเริ่มต้น.png` | team-selected robot start |
| `rock` | `ก้อนหิน.png` | impassable obstacle |
| `tree` | `ต้นไม้.png` | impassable obstacle |
| `roadwork` | `ซ่อมถนน.png` | impassable obstacle |
| `dog` | `หมาดุ.png` | impassable obstacle |

A star and finish token are specified in the mission document but **no corresponding PNG files are present**. The web UI may render accessible vector/CSS symbols, but the physical-kit inventory should be confirmed before stating that printable assets exist.

### Source-name aliases needed for routing assets

- `ผานางเมิน` → `ผานางเมิน ภูพาน.png`
- `อุทยานบัวเฉลิมพระเกียรติ` → `อุทยานบัว.png`
- `อุทยานแห่งชาติภูผายล` → `ภูผายน.png`
- `ประเพณีแห่ปราสาทผึ้ง` / `ปราสาทผึ้ง` → `แห่ปราสาทผึ้ง.png`
- `ชุมชนท่าแร่` → `ท่าแร่.png`
- `ประเพณีแห่ดาว` → `แห่ดาว.png`
- `8 ชนเผ่าสกลนคร` / `8 ชนเผ่า` → `ชนเผ่า.png`

## Recommended data contract

```ts
type Category = 'dhamma' | 'nature' | 'culture' | 'mixed';
type StepType = 'start' | 'destination' | 'collect_star' | 'avoid' | 'finish';

type KnowledgeCard = {
  id: string;
  category: Exclude<Category, 'mixed'>;
  titleTh: string;
  summaryTh: string;
  assetPath?: string;
  aliases?: string[];
  status: 'ready' | 'needs_asset' | 'needs_review';
};

type MissionStep = {
  type: StepType;
  refId?: string; // knowledge/place ID or obstacle ID
  labelTh: string; // child-facing fallback text
};

type Mission = {
  id: number; // 1–20
  titleTh: string;
  category: Category;
  steps: MissionStep[];
};
```

The random-draw function should choose uniformly from IDs 1–20. It should show category only **after** drawing; category is descriptive, not a pre-selection filter.

## Evidence consulted

- [Tourism Authority of Thailand — Sakon Nakhon destination page](https://thai.tourismthailand.org/Destinations/Provinces/%E0%B8%AA%E0%B8%81%E0%B8%A5%E0%B8%99%E0%B8%84%E0%B8%A3/584): uses `อุทยานแห่งชาติภูผายล`, describes Nong Han, Uthayan Bua Chaloem Phrakiat, and uses the `ผาเด่น` spelling variant.
- [Sakon Nakhon PAO — tourism in Tao Ngoi district](https://www.sakon-pao.go.th/home/%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%AA%E0%B8%81%E0%B8%A5%E0%B8%99%E0%B8%84%E0%B8%A3-%E0%B8%AD%E0%B8%B3%E0%B9%80%E0%B8%A0%E0%B8%AD%E0%B9%80%E0%B8%95%E0%B9%88%E0%B8%B2%E0%B8%87/): identifies Huai Huat Reservoir, `น้ำตกคำน้ำสร้าง`, and `ภูผายล`.
- [Sakon Nakhon Provincial Office of Buddhism — Wat Pa Nak Nimit](https://snk.onab.go.th/th/content/page/index/id/124878): confirms the spelling and location of `วัดป่านาคนิมิตต์`.
- [Sakon Nakhon PAO — Ban Don Koi indigo learning centre](https://www.sakon-pao.go.th/home/executive-job/19441/): supports the specific Ban Don Koi mission wording.

## Open content-owner decisions

1. Select the intended primary image between `ผ้าคราม.png` and `ผ้าย้อมคราม.png`; both are distinct files and neither filename alone establishes which represents Ban Don Koi.
2. Supply or approve representative artwork for `น้ำตกคำน้ำสร้าง`, `อ่างเก็บน้ำห้วยหวด`, and `ภูไท`; otherwise missions can show labelled placeholders rather than imply that an image card exists.
3. Confirm whether physical star and finish cards exist outside this directory. The digital view can provide them, but the unplugged kit needs actual tokens.
4. Confirm the locally preferred spelling of `วัดถ้ำผาแด่น` versus the TAT spelling `วัดถ้ำผาเด่น` before publishing a formal factual description.
