import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import logo from './assets/logo.png'
import Arsenal501 from './games/Arsenal501/index.jsx'
import WhoWoreIt from './games/whoworeit/index.jsx'
import GunnersXI from './games/GunnersXI/index.jsx'
import ArsenalWordle from './games/ArsenalWordle/index.jsx'

const C = {
  red: '#EF0107',
  gold: '#C8A951',
  goldLight: '#F5D27A',
  charcoal: '#161616',
  mid: '#252525',
  dark: '#1C1C1C',
  border: '#2A2A2A',
  grey: '#777',
  white: '#FFFFFF',
}

const GAMES = [
  {
    id: 'arsenal501',
    title: 'Arsenal 501',
    subtitle: 'The Gunners Darts Challenge',
    description: 'Name ex-Arsenal players whose career stats score you down from 501. Bust, foul, or glory — you decide.',
    badge: 'LIVE',
    badgeColor: '#4ADE80',
    component: Arsenal501,
  },
  {
    id: 'whoworeit',
    title: 'Who Wore It?',
    subtitle: 'Daily Shirt Number Quiz',
    description: 'A new Arsenal shirt number every day. How many players can you name who wore it?',
    badge: 'LIVE',
    badgeColor: '#4ADE80',
    component: WhoWoreIt,
  },
  {
    id: 'gunnersxi',
    title: 'Gunners XI',
    subtitle: 'Daily Lineup Guesser',
    description: 'Guess the Arsenal starting XI from a historic match. A new puzzle every day.',
    badge: 'LIVE',
    badgeColor: '#4ADE80',
    component: GunnersXI,
  },
  {
    id: 'arsenalwordle',
    title: 'Gunners Wordle',
    subtitle: 'Daily Player Name Puzzle',
    description: 'Guess the Arsenal player from their surname. Six attempts, four word lengths — how fast can you crack it?',
    badge: 'LIVE',
    badgeColor: '#4ADE80',
    component: ArsenalWordle,
  },
]

// ── LEADERBOARD DATA HELPERS ──────────────────────────────────────────────────

function getTodayStr() {
  return new Date().toISOString().slice(0, 10)
}

function fmtTime(secs) {
  return `${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')}`
}

async function fetchAllLeaderboards() {
  const today = getTodayStr()
  const results = { whoworeit: [], gunnersxi: [], wordle: {}, a501: [] }
  try {
    const r1 = await window.storage.get('tgnh_scores', true)
    const all1 = r1 ? JSON.parse(r1.value) : []
    results.whoworeit = all1.filter(e => e.date === today)
      .sort((a,b) => b.count - a.count || a.timeTaken - b.timeTaken)
  } catch {}
  try {
    const r2 = await window.storage.get('gxi-lb-v4', true)
    const all2 = r2 ? JSON.parse(r2.value) : []
    results.gunnersxi = all2.filter(e => e.date === today)
      .sort((a,b) => b.solved - a.solved || a.time - b.time)
  } catch {}
  try {
    const r3 = await window.storage.get('tgaw_scores', true)
    const all3 = r3 ? JSON.parse(r3.value) : []
    const todayWordle = all3.filter(e => e.date === today)
    results.wordle = {
      4: todayWordle.filter(e => e.bucket === 4).sort((a,b) => a.guesses - b.guesses || a.timeTaken - b.timeTaken),
      5: todayWordle.filter(e => e.bucket === 5).sort((a,b) => a.guesses - b.guesses || a.timeTaken - b.timeTaken),
      6: todayWordle.filter(e => e.bucket === 6).sort((a,b) => a.guesses - b.guesses || a.timeTaken - b.timeTaken),
      '7plus': todayWordle.filter(e => e.bucket === '7plus').sort((a,b) => a.guesses - b.guesses || a.timeTaken - b.timeTaken),
    }
  } catch {}
  try {
    const r4 = await window.storage.get('tg501_scores', true)
    const all4 = r4 ? JSON.parse(r4.value) : []
    results.a501 = all4.sort((a,b) => a.turns - b.turns).slice(0, 100)
  } catch {}
  return results
}

// ── LEADERBOARD COMPONENT ─────────────────────────────────────────────────────

const TABS = [
  { id: 'whoworeit', label: 'Who Wore It?' },
  { id: 'gunnersxi', label: 'Gunners XI' },
  { id: 'wordle',    label: 'Gunners Wordle' },
  { id: 'a501',      label: 'Arsenal 501' },
]

const WORDLE_BUCKETS = [
  { key: 4,       label: '4 Letters' },
  { key: 5,       label: '5 Letters' },
  { key: 6,       label: '6 Letters' },
  { key: '7plus', label: '7+ Letters' },
]

function LeaderboardRow({ rank, name, meta, highlight }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 12px',
      background: highlight ? 'rgba(200,169,81,0.08)' : rank % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
      borderRadius: 6,
    }}>
      <div style={{
        width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 700, fontFamily: 'Arial, sans-serif',
        background: rank === 1 ? C.gold : rank === 2 ? '#9CA3AF' : rank === 3 ? '#CD7F32' : C.border,
        color: rank <= 3 ? C.charcoal : C.grey,
      }}>
        {rank}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.white, fontFamily: 'Arial, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {name}
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.gold, fontFamily: 'Arial, sans-serif', textAlign: 'right', flexShrink: 0 }}>
        {meta}
      </div>
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div style={{ textAlign: 'center', padding: '28px 16px', color: C.grey, fontSize: 13, fontFamily: 'Arial, sans-serif' }}>
      {message}
    </div>
  )
}

function LeaderboardSection({ data, loading }) {
  const [activeTab, setActiveTab] = useState('whoworeit')
  const [wordleBucket, setWordleBucket] = useState(4)

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '24px 0', color: C.grey, fontSize: 13, fontFamily: 'Arial, sans-serif' }}>
        Loading leaderboards…
      </div>
    )
  }

  const renderContent = () => {
    if (activeTab === 'whoworeit') {
      const rows = data.whoworeit || []
      if (!rows.length) return <EmptyState message="No scores yet today — be the first!" />
      return rows.map((e, i) => (
        <LeaderboardRow
          key={i} rank={i+1} name={e.name}
          meta={`${e.count} players · ${fmtTime(e.timeTaken)}`}
        />
      ))
    }
    if (activeTab === 'gunnersxi') {
      const rows = data.gunnersxi || []
      if (!rows.length) return <EmptyState message="No scores yet today — be the first!" />
      return rows.map((e, i) => (
        <LeaderboardRow
          key={i} rank={i+1} name={e.name}
          meta={`${e.solved}/${e.total} · ${fmtTime(e.time)}`}
        />
      ))
    }
    if (activeTab === 'wordle') {
      const rows = (data.wordle || {})[wordleBucket] || []
      if (!rows.length) return <EmptyState message="No scores yet today — be the first!" />
      return rows.map((e, i) => (
        <LeaderboardRow
          key={i} rank={i+1} name={e.name}
          meta={`${e.guesses} ${e.guesses === 1 ? 'guess' : 'guesses'} · ${fmtTime(e.timeTaken)}`}
        />
      ))
    }
    if (activeTab === 'a501') {
      const rows = data.a501 || []
      if (!rows.length) return <EmptyState message="No scores yet — complete a solo game to appear!" />
      return rows.map((e, i) => (
        <LeaderboardRow
          key={i} rank={i+1} name={e.name}
          meta={`${e.turns} turns · ${e.date}`}
        />
      ))
    }
    return null
  }

  return (
    <div style={{ background: C.mid, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>

      {/* Section header */}
      <div style={{
        padding: '14px 16px 0',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: C.grey, fontFamily: 'Arial, sans-serif', textTransform: 'uppercase', marginBottom: 12 }}>
          Leaderboards
        </div>

        {/* Main tabs — scrollable */}
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === t.id ? `2px solid ${C.gold}` : '2px solid transparent',
                color: activeTab === t.id ? C.white : C.grey,
                fontFamily: 'Arial, sans-serif',
                fontWeight: activeTab === t.id ? 700 : 400,
                fontSize: 12,
                letterSpacing: 1,
                padding: '8px 14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'color 0.15s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Wordle sub-filter */}
      {activeTab === 'wordle' && (
        <div style={{ display: 'flex', gap: 6, padding: '10px 12px', borderBottom: `1px solid ${C.border}`, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {WORDLE_BUCKETS.map(b => (
            <button
              key={b.key}
              onClick={() => setWordleBucket(b.key)}
              style={{
                background: wordleBucket === b.key ? C.red : 'transparent',
                border: `1px solid ${wordleBucket === b.key ? C.red : C.border}`,
                borderRadius: 20,
                color: wordleBucket === b.key ? C.white : C.grey,
                fontFamily: 'Arial, sans-serif',
                fontSize: 11,
                fontWeight: wordleBucket === b.key ? 700 : 400,
                padding: '4px 12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      )}

      {/* Today / All-time label */}
      <div style={{ padding: '8px 14px 2px', fontSize: 10, letterSpacing: 2, color: '#444', fontFamily: 'Arial, sans-serif', textTransform: 'uppercase' }}>
        {activeTab === 'a501' ? 'All-time · Fewest turns' : "Today's scores"}
      </div>

      {/* Rows */}
      <div style={{ padding: '4px 8px 12px', maxHeight: 320, overflowY: 'auto' }}>
        {renderContent()}
      </div>
    </div>
  )
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────

export default function App() {
  const [activeGame, setActiveGame] = useState(null)
  const [lbData, setLbData] = useState(null)
  const [lbLoading, setLbLoading] = useState(true)
  const game = GAMES.find(g => g.id === activeGame)

  useEffect(() => {
    if (!activeGame) {
      setLbLoading(true)
      fetchAllLeaderboards().then(d => {
        setLbData(d)
        setLbLoading(false)
      })
    }
  }, [activeGame])

  if (game && game.component) {
    const GameComponent = game.component
    return (
      <div style={{ minHeight: '100vh', background: C.charcoal }}>
        <button
          onClick={() => setActiveGame(null)}
          style={{
            position: 'fixed', top: 12, right: 12, zIndex: 200,
            background: 'rgba(0,0,0,0.6)', border: `1px solid ${C.border}`,
            borderRadius: 6, color: C.grey, padding: '6px 14px',
            fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
            fontFamily: 'Arial, sans-serif', cursor: 'pointer',
            backdropFilter: 'blur(4px)',
          }}
        >
          ← Hub
        </button>
        <GameComponent />
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: C.charcoal,
      fontFamily: "'Arial Black', Arial, sans-serif",
      color: C.white,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Header */}
      <div style={{
        width: '100%',
        background: C.red,
        borderBottom: `4px solid ${C.gold}`,
        padding: '20px 24px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      }}>
        <img src={logo} alt="Touchline Gunners" style={{ height: 80, width: 80, objectFit: 'contain' }} />
        <div>
          <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 4, textShadow: '2px 2px 0 rgba(0,0,0,0.35)' }}>TOUCHLINE</div>
          <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 4, textShadow: '2px 2px 0 rgba(0,0,0,0.35)', color: C.goldLight }}>GUNNERS</div>
          <div style={{ fontSize: 10, letterSpacing: 5, color: 'rgba(255,255,255,0.6)', fontFamily: 'Arial, sans-serif', fontWeight: 400, marginTop: 2 }}>ARSENAL FAN GAMES</div>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 720, padding: '32px 16px', boxSizing: 'border-box' }}>

        {/* Leaderboard */}
        <LeaderboardSection data={lbData} loading={lbLoading} />

        {/* Game cards */}
        <div style={{ fontSize: 10, letterSpacing: 4, color: C.grey, textTransform: 'uppercase', fontFamily: 'Arial, sans-serif', marginBottom: 16, marginTop: 32 }}>Choose a game</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {GAMES.map(g => (
            <div
              key={g.id}
              onClick={() => g.component && setActiveGame(g.id)}
              style={{
                background: C.mid,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: '20px 22px',
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: 1 }}>{g.title}</div>
                  <span style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: 2,
                    color: C.charcoal, background: g.badgeColor,
                    padding: '2px 7px', borderRadius: 3, textTransform: 'uppercase',
                    fontFamily: 'Arial, sans-serif',
                  }}>{g.badge}</span>
                </div>
                <div style={{ fontSize: 11, color: C.gold, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'Arial, sans-serif', marginBottom: 6 }}>{g.subtitle}</div>
                <div style={{ fontSize: 13, color: C.grey, fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>{g.description}</div>
              </div>
              <div style={{ fontSize: 22, color: C.gold, flexShrink: 0, fontWeight: 900 }}>→</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center', fontSize: 11, color: '#333', fontFamily: 'Arial, sans-serif', letterSpacing: 1 }}>TOUCHLINE GUNNERS · FOR THE ARSENAL FAITHFUL</div>
      </div>
      <Analytics />
    </div>
  )
}
