import { useState } from 'react'
import logo from './assets/logo.png'
import Arsenal501 from './games/Arsenal501/index.jsx'
import WhoWoreIt from './games/whoworeit/index.jsx'
import GunnersXI from './games/GunnersXI/index.jsx'
import ArsenalWordle from './games/ArsenalWordle/index.jsx'

const C = {
  red: '#EF0107',
  gold: '#E8B84B',
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

export default function App() {
  const [activeGame, setActiveGame] = useState(null)
  const game = GAMES.find(g => g.id === activeGame)

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
        <div style={{ fontSize: 10, letterSpacing: 4, color: C.grey, textTransform: 'uppercase', fontFamily: 'Arial, sans-serif', marginBottom: 16 }}>Choose a game</div>
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
    </div>
  )
}
