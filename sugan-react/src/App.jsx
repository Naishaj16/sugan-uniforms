import { useState, useCallback } from 'react'

/* ---------- static data ---------- */
const NAV = [
  { grp: 'Main', items: [
    { id: 'dashboard', ic: '▤', label: 'Dashboard' },
    { id: 'orders', ic: '▦', label: 'Orders' },
  ]},
  { grp: 'Job Work', items: [
    { id: 'material', ic: '✂', label: 'Material / BOM' },
    { id: 'stock', ic: '◫', label: 'Stock Check' },
    { id: 'challan', ic: '⇥', label: 'Issue Challan' },
    { id: 'register', ic: '⌛', label: 'Challan Register' },
    { id: 'receipt', ic: '⇤', label: 'Goods Receipt' },
  ]},
  { grp: 'Insights', items: [
    { id: 'reports', ic: '▧', label: 'Reports' },
  ]},
]
const TITLES = {
  dashboard: ['Dashboard', 'Overview'], orders: ['Orders', 'All orders'],
  neworder: ['New Order', 'Step 1 · Order'], material: ['Material / BOM', 'Step 2 · Material'],
  stock: ['Stock Check', 'Step 3 · Zoho'], challan: ['Issue Challan', 'Step 4 · Job work'],
  register: ['Challan Register', 'Step 5 · Tracking'], receipt: ['Goods Receipt', 'Step 6 · Finish'],
  reports: ['Reports', 'Insights'],
}
const ORDERS = [
  { id: 'SO-1042', date: '18 Aug', cust: 'Delhi Public School', gar: 'Shirts', cs: 'White · S–XL', qty: 600, prog: 55, color: 'var(--green)', st: ['In Job Work', 'c-amber'] },
  { id: 'SO-1041', date: '17 Aug', cust: 'City Hospital', gar: 'Scrubs', cs: 'Teal · M–XXL', qty: 320, prog: 30, color: 'var(--green)', st: ['Material Ready', 'c-navy'] },
  { id: 'SO-1040', date: '15 Aug', cust: 'Ashok Security', gar: 'Trousers', cs: 'Navy · 30–40', qty: 450, prog: 100, color: 'var(--green)', st: ['Completed', 'c-green'] },
  { id: 'SO-1039', date: '14 Aug', cust: 'Green Valley School', gar: 'Blazers', cs: 'Maroon · S–L', qty: 210, prog: 10, color: 'var(--red)', st: ['Stock Short', 'c-red'] },
]
const BOM = [
  { m: 'Cotton White 2/40', cat: ['Fabric', 'c-navy'], per: '1.5', u: 'm', w: '5%', oq: 600, req: '945 m' },
  { m: 'Button 18L White', cat: ['Button', 'c-grey'], per: '7', u: 'pcs', w: '2%', oq: 600, req: '4,284' },
  { m: 'Woven Label — DPS', cat: ['Label', 'c-grey'], per: '1', u: 'pcs', w: '0%', oq: 600, req: '600' },
  { m: 'Collar Fusing', cat: ['Trim', 'c-grey'], per: '0.12', u: 'm', w: '3%', oq: 600, req: '74 m' },
]
const STOCK = [
  { m: 'Cotton White 2/40', req: '945 m', z: '1,200 m', short: '—', ok: true },
  { m: 'Button 18L White', req: '4,284', z: '9,000', short: '—', ok: true },
  { m: 'Woven Label — DPS', req: '600', z: '750', short: '—', ok: true },
  { m: 'Collar Fusing', req: '74 m', z: '54 m', short: '20 m', ok: false },
]
const REGISTER = [
  { id: 'CH-338', o: 'SO-1042', w: 'Rafiq Tailors', iss: '20 Aug', bal: '600 / 0', age: 1, pct: 5, col: 'var(--green)', st: ['Fresh', 'c-green'] },
  { id: 'CH-334', o: 'SO-1041', w: 'Sunrise Unit', iss: '04 Aug', bal: '320 / 120', age: 16, pct: 50, col: 'var(--amber)', st: ['Ageing', 'c-amber'] },
  { id: 'CH-330', o: 'SO-1036', w: 'Rafiq Tailors', iss: '19 Jul', bal: '500 / 300', age: 32, pct: 100, col: 'var(--red)', st: ['Overdue', 'c-red'] },
  { id: 'CH-327', o: 'SO-1033', w: 'Meena Stitching', iss: '23 Jul', bal: '280 / 0', age: 28, pct: 90, col: 'var(--red)', st: ['Overdue', 'c-red'] },
]

/* ---------- tiny presentational helpers ---------- */
const Chip = ({ c, children }) => <span className={`chip ${c}`}>{children}</span>
const Steps = ({ active }) => {
  const s = [['Order', 'Details'], ['Material', 'BOM'], ['Stock', 'Check'], ['Challan', 'Issue'], ['Register', 'Track'], ['Receipt', 'Finish']]
  return (
    <div className="steps">
      {s.map((x, i) => {
        const cls = i < active ? 'step done' : i === active ? 'step active' : 'step'
        return <div key={i} className={cls}><div className="n">{i < active ? '✓' : i + 1}</div><b>{x[0]}</b><span>{x[1]}</span></div>
      })}
    </div>
  )
}
const KPI = ({ ic, icClass, val, lbl, trend, trendClass }) => (
  <div className="card kpi">
    <div className="k-top"><div className={`ic ${icClass}`}>{ic}</div></div>
    <div className="val">{val}</div><div className="lbl">{lbl}</div>
    {trend && <div className={`trend ${trendClass}`}>{trend}</div>}
  </div>
)

/* ---------- screens ---------- */
function Dashboard({ go }) {
  return (
    <div className="screen">
      <div className="phead">
        <div><h2>Good morning, Chetan</h2><p>Here's what's happening across orders and job work today.</p></div>
        <button className="btn primary" onClick={() => go('neworder')}>＋ New Order</button>
      </div>
      <div className="grid g4">
        <KPI ic="▦" icClass="i-navy" val="18" lbl="Open Orders" trend="▲ 4 this week" trendClass="up" />
        <KPI ic="⇥" icClass="i-amber" val="7" lbl="Challans Out" trend="2 overdue" trendClass="down" />
        <KPI ic="◫" icClass="i-red" val="3" lbl="Stock Shortages" trend="needs attention" trendClass="down" />
        <KPI ic="⇤" icClass="i-green" val="1,240" lbl="Pcs Received (MTD)" trend="▲ 12%" trendClass="up" />
      </div>
      <div className="grid g2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Recent Orders <span className="subtle rowlink" style={{ fontWeight: 600 }} onClick={() => go('orders')}>View all →</span></h3>
          <table><thead><tr><th>Order</th><th>Customer</th><th>Garment</th><th>Qty</th><th>Status</th></tr></thead>
            <tbody>{ORDERS.map(o => (
              <tr key={o.id} className="rowlink" onClick={() => go('orders')}>
                <td className="tid">#{o.id}</td><td>{o.cust}</td><td>{o.gar}</td><td>{o.qty}</td><td><Chip c={o.st[1]}>{o.st[0]}</Chip></td>
              </tr>))}
            </tbody></table>
        </div>
        <div className="card">
          <h3>Challans Needing Attention</h3>
          <table><thead><tr><th>Challan</th><th>Worker</th><th>Age</th></tr></thead>
            <tbody>{REGISTER.filter(r => r.age > 15).map(r => (
              <tr key={r.id} className="rowlink" onClick={() => go('register')}>
                <td className="tid">#{r.id}</td><td>{r.w}</td><td><Chip c={r.age > 30 ? 'c-red' : 'c-amber'}>{r.age} d</Chip></td>
              </tr>))}
            </tbody></table>
          <div className="divide" />
          <div className="alert warn" style={{ margin: 0 }}><span>⚠</span><div><b>2 challans overdue.</b> Material with workers &gt; 30 days — follow up.</div></div>
        </div>
      </div>
    </div>
  )
}

function Orders({ go }) {
  return (
    <div className="screen">
      <div className="phead"><div><h2>Orders</h2><p>Every order, from intake to finished goods.</p></div>
        <button className="btn primary" onClick={() => go('neworder')}>＋ New Order</button></div>
      <div className="card" style={{ padding: 0 }}>
        <table><thead><tr><th>Order</th><th>Date</th><th>Customer</th><th>Garment</th><th>Colors / Sizes</th><th>Qty</th><th>Progress</th><th>Status</th></tr></thead>
          <tbody>{ORDERS.map(o => (
            <tr key={o.id}>
              <td className="tid">#{o.id}</td><td>{o.date}</td><td>{o.cust}</td><td>{o.gar}</td>
              <td className="mini">{o.cs}</td><td>{o.qty}</td>
              <td><div className="progress" style={{ width: 90 }}><i style={{ width: `${o.prog}%`, background: o.color }} /></div></td>
              <td><Chip c={o.st[1]}>{o.st[0]}</Chip></td>
            </tr>))}
          </tbody></table>
      </div>
    </div>
  )
}

function NewOrder({ go }) {
  return (
    <div className="screen">
      <div className="phead"><div><h2>New Order</h2><p>Step 1 of 6 — capture the order.</p></div>
        <button className="btn ghost sm" onClick={() => go('orders')}>✕ Cancel</button></div>
      <Steps active={0} />
      <div className="card">
        <div className="frow">
          <div className="field"><label>Customer</label><select><option>Delhi Public School</option><option>City Hospital</option><option>Ashok Security</option></select></div>
          <div className="field"><label>Order Date</label><input type="date" defaultValue="2026-08-20" /></div>
        </div>
        <div className="frow">
          <div className="field"><label>Garment Type</label><select><option>Shirt</option><option>Trouser</option><option>Scrubs</option><option>Blazer</option></select></div>
          <div className="field"><label>Delivery Date</label><input type="date" defaultValue="2026-09-10" /></div>
        </div>
        <div className="divide" />
        <div className="subtle" style={{ marginBottom: 10, fontWeight: 600 }}>Color &amp; size breakdown</div>
        <div className="frow3">
          <div className="field"><label>Color</label><input defaultValue="White" /></div>
          <div className="field"><label>Size</label><select><option>S</option><option>M</option><option>L</option><option>XL</option></select></div>
          <div className="field"><label>Quantity</label><input defaultValue="150" /></div>
        </div>
        <button className="btn ghost sm">＋ Add another size line</button>
        <div className="divide" />
        <div className="right"><button className="btn primary" onClick={() => go('material')}>Continue → Material</button></div>
      </div>
    </div>
  )
}

function Material({ go }) {
  return (
    <div className="screen">
      <div className="phead"><div><h2>Material / Bill of Materials</h2><p>Step 2 — what this order consumes, per garment.</p></div>
        <button className="btn ghost sm" onClick={() => go('stock')}>Skip to Stock →</button></div>
      <Steps active={1} />
      <div className="card" style={{ padding: 0 }}>
        <table><thead><tr><th>Material</th><th>Category</th><th>Qty / piece</th><th>Unit</th><th>Wastage %</th><th>Order Qty</th><th>Required</th></tr></thead>
          <tbody>{BOM.map(b => (
            <tr key={b.m}><td className="tid">{b.m}</td><td><Chip c={b.cat[1]}>{b.cat[0]}</Chip></td><td>{b.per}</td><td>{b.u}</td><td>{b.w}</td><td>{b.oq}</td><td className="tid">{b.req}</td></tr>))}
          </tbody></table>
      </div>
      <div className="right" style={{ marginTop: 16 }}><button className="btn primary" onClick={() => go('stock')}>Continue → Stock Check</button></div>
    </div>
  )
}

function Stock({ go }) {
  return (
    <div className="screen">
      <div className="phead"><div><h2>Stock Check</h2><p>Step 3 — live availability from Zoho Inventory.</p></div>
        <div className="zoho"><span className="dot" /> Live from Zoho</div></div>
      <Steps active={2} />
      <div className="alert warn"><span>⚠</span><div><b>1 shortage found.</b> Collar Fusing is 20 m short of requirement. Issue with a warning or reduce the challan.</div></div>
      <div className="card" style={{ padding: 0 }}>
        <table><thead><tr><th>Material</th><th>Required</th><th>In Zoho</th><th>Shortage</th><th>Status</th></tr></thead>
          <tbody>{STOCK.map(s => (
            <tr key={s.m}><td className="tid">{s.m}</td><td>{s.req}</td><td>{s.z}</td>
              <td className="tid" style={{ color: s.ok ? undefined : 'var(--red)' }}>{s.short}</td>
              <td>{s.ok ? <Chip c="c-green">✓ Available</Chip> : <Chip c="c-red">Short</Chip>}</td></tr>))}
          </tbody></table>
      </div>
      <div className="right" style={{ marginTop: 16 }}><button className="btn ghost" style={{ marginRight: 8 }}>Raise Purchase</button><button className="btn primary" onClick={() => go('challan')}>Continue → Issue Challan</button></div>
    </div>
  )
}

function Challan({ go, toast }) {
  return (
    <div className="screen">
      <div className="phead"><div><h2>Issue Challan</h2><p>Step 4 — send material to a job worker. Zoho stock reduces on issue.</p></div>
        <button className="btn ghost sm" onClick={() => go('register')}>View Register →</button></div>
      <Steps active={3} />
      <div className="grid g2">
        <div className="card">
          <h3>Challan #CH-338</h3>
          <div className="frow">
            <div className="field"><label>Job Worker</label><select><option>Rafiq Tailors</option><option>Meena Stitching</option><option>Sunrise Unit</option></select></div>
            <div className="field"><label>Challan Date</label><input type="date" defaultValue="2026-08-20" /></div>
          </div>
          <div className="field"><label>Expected Return</label><input type="date" defaultValue="2026-09-05" /></div>
          <div className="divide" />
          <div className="subtle" style={{ fontWeight: 600, marginBottom: 8 }}>Items to issue</div>
          <table><thead><tr><th>Item</th><th>Qty</th></tr></thead>
            <tbody>
              <tr><td>Cotton White 2/40</td><td className="tid">945 m</td></tr>
              <tr><td>Button 18L White</td><td className="tid">4,284</td></tr>
              <tr><td>Woven Label — DPS</td><td className="tid">600</td></tr>
              <tr><td>Collar Fusing</td><td className="tid">54 m</td></tr>
            </tbody></table>
        </div>
        <div className="card">
          <h3>Summary</h3>
          <div className="alert warn"><span>⚠</span><div>Collar Fusing issued at available qty (54 m). 20 m pending purchase.</div></div>
          <p className="subtle">On issue, these quantities are <b>immediately decremented in Zoho Inventory</b>. The challan opens in the register and starts aging from today.</p>
          <div className="divide" />
          {[['Order', '#SO-1042 · Delhi Public School'], ['Items', '4 lines'], ['Est. material value', '₹ 1,84,500']].map(r => (
            <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}><span className="subtle">{r[0]}</span><b>{r[1]}</b></div>))}
          <button className="btn dark" style={{ width: '100%', marginTop: 8 }} onClick={() => { toast('Challan #CH-338 issued · Zoho stock updated'); go('register') }}>⇥ Issue Challan &amp; Update Zoho</button>
        </div>
      </div>
    </div>
  )
}

function Register({ go }) {
  return (
    <div className="screen">
      <div className="phead"><div><h2>Challan Register</h2><p>Step 5 — everything out with a worker, aged, so nothing sits forgotten.</p></div>
        <div style={{ display: 'flex', gap: 8 }}><button className="btn ghost sm">All</button><button className="btn ghost sm" style={{ borderColor: 'var(--red)', color: 'var(--red)' }}>Overdue (2)</button></div></div>
      <div className="grid g3" style={{ marginBottom: 16 }}>
        <div className="card kpi"><div className="lbl">Open Challans</div><div className="val" style={{ fontSize: 22 }}>7</div></div>
        <div className="card kpi"><div className="lbl">Material Out (value)</div><div className="val" style={{ fontSize: 22 }}>₹ 9.4L</div></div>
        <div className="card kpi"><div className="lbl">Overdue &gt; 30 days</div><div className="val" style={{ fontSize: 22, color: 'var(--red)' }}>2</div></div>
      </div>
      <div className="card" style={{ padding: 0 }}>
        <table><thead><tr><th>Challan</th><th>Order</th><th>Worker</th><th>Issued</th><th>Out / Returned</th><th>Age</th><th>Status</th></tr></thead>
          <tbody>{REGISTER.map(r => (
            <tr key={r.id}><td className="tid">#{r.id}</td><td>#{r.o}</td><td>{r.w}</td><td>{r.iss}</td><td>{r.bal}</td>
              <td><div className="age-bar"><i style={{ width: `${r.pct}%`, background: r.col }} /></div><span className="mini">{r.age} d</span></td>
              <td><Chip c={r.st[1]}>{r.st[0]}</Chip></td></tr>))}
          </tbody></table>
      </div>
      <div className="right" style={{ marginTop: 16 }}><button className="btn primary" onClick={() => go('receipt')}>Receive Goods →</button></div>
    </div>
  )
}

function Receipt({ go, toast }) {
  return (
    <div className="screen">
      <div className="phead"><div><h2>Finished Goods Receipt</h2><p>Step 6 — bring goods back in at material + job charge.</p></div></div>
      <Steps active={5} />
      <div className="grid g2">
        <div className="card">
          <h3>Receive against #CH-334</h3>
          <div className="frow">
            <div className="field"><label>Receipt Date</label><input type="date" defaultValue="2026-08-20" /></div>
            <div className="field"><label>Finished Item</label><select><option>Scrubs — Teal (FG)</option></select></div>
          </div>
          <div className="frow">
            <div className="field"><label>Qty Issued</label><input defaultValue="320" disabled /></div>
            <div className="field"><label>Qty Received</label><input defaultValue="200" /></div>
          </div>
          <div className="alert warn"><span>ⓘ</span><div>Partial receipt — 120 pcs still with worker. Challan stays open.</div></div>
          <div className="field"><label>Job Charge (per pc)</label><input defaultValue="₹ 45" /></div>
        </div>
        <div className="card">
          <h3>Finished Goods Costing</h3>
          {[['Material cost (200 pcs)', '₹ 61,500'], ['Job charge (200 × ₹45)', '₹ 9,000']].map(r => (
            <div key={r[0]} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--line)' }}><span className="subtle">{r[0]}</span><b>{r[1]}</b></div>))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: 15 }}><b>FG value into Zoho</b><b style={{ color: 'var(--green)' }}>₹ 70,500</b></div>
          <div className="mini right">₹ 352.50 per piece</div>
          <div className="divide" />
          <p className="subtle">On confirm, 200 finished pcs are <b>added to Zoho stock</b> at this valuation and the challan balance updates.</p>
          <button className="btn dark" style={{ width: '100%' }} onClick={() => { toast('200 pcs received · added to Zoho at ₹70,500'); go('dashboard') }}>⇤ Confirm Receipt &amp; Update Zoho</button>
        </div>
      </div>
    </div>
  )
}

function Reports() {
  const R = ([title, big, bigColor, sub, rows]) => (
    <div className="card" key={title}>
      <h3>{title}</h3><div className="val" style={{ fontSize: 26, fontWeight: 800, color: bigColor }}>{big}</div>
      <div className="subtle">{sub}</div><div className="divide" />
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
          <span>{r[0]}</span>{typeof r[1] === 'string' ? <b>{r[1]}</b> : r[1]}</div>))}
    </div>
  )
  return (
    <div className="screen">
      <div className="phead"><div><h2>Reports</h2><p>Stock, cost, and pending-work views.</p></div><button className="btn ghost sm">⇩ Export</button></div>
      <div className="grid g3">
        {R(['Pending Work', '1,180 pcs', 'var(--navy)', 'across 5 open orders', [['Shirts', '600'], ['Scrubs', '320'], ['Blazers', '210']]])}
        {R(['Material Value Out', '₹ 9.4L', 'var(--amber-d)', 'with job workers now', [['Rafiq Tailors', '₹ 4.1L'], ['Sunrise Unit', '₹ 3.0L'], ['Meena Stitching', '₹ 2.3L']]])}
        {R(['Low Stock', '3 items', 'var(--red)', 'below reorder level', [['Collar Fusing', <Chip c="c-red" key="1">Short</Chip>], ['Navy 2/60', <Chip c="c-amber" key="2">Low</Chip>], ['Maroon Twill', <Chip c="c-red" key="3">Short</Chip>]]])}
      </div>
    </div>
  )
}

/* ---------- shell ---------- */
export default function App() {
  const [screen, setScreen] = useState('dashboard')
  const [toastMsg, setToastMsg] = useState(null)
  const go = useCallback((id) => { setScreen(id); window.scrollTo(0, 0) }, [])
  const toast = useCallback((m) => { setToastMsg(m); setTimeout(() => setToastMsg(null), 2600) }, [])
  const [title, crumb] = TITLES[screen] || TITLES.dashboard

  const screens = {
    dashboard: <Dashboard go={go} />, orders: <Orders go={go} />, neworder: <NewOrder go={go} />,
    material: <Material go={go} />, stock: <Stock go={go} />, challan: <Challan go={go} toast={toast} />,
    register: <Register go={go} />, receipt: <Receipt go={go} toast={toast} />, reports: <Reports />,
  }

  return (
    <div className="app">
      <aside className="side">
        <div className="brand"><div className="logo">S</div><div><b>Sugan Uniforms</b><span>Order &amp; Job-Work</span></div></div>
        <nav className="nav">
          {NAV.map(g => (
            <div key={g.grp}>
              <div className="lbl">{g.grp}</div>
              {g.items.map(it => (
                <button key={it.id} className={screen === it.id ? 'active' : ''} onClick={() => go(it.id)}>
                  <span className="ic">{it.ic}</span> {it.label}
                </button>))}
            </div>))}
        </nav>
        <div className="foot">Synced with <b>Zoho Inventory</b><br />v2.0 · prototype</div>
      </aside>
      <div className="main">
        <div className="top">
          <h1>{title}</h1><span className="crumb">{crumb}</span>
          <div className="spacer" />
          <input className="search" placeholder="Search orders, challans…" />
          <div className="zoho"><span className="dot" /> Zoho live</div>
          <div className="avatar">CB</div>
        </div>
        <div className="content">{screens[screen]}</div>
      </div>
      {toastMsg && <div className="toast"><span>✓</span><span>{toastMsg}</span></div>}
    </div>
  )
}
