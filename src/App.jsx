import { useState } from 'react'
import logo from './assets/logo.png'
import Arsenal501 from './games/Arsenal501/index.jsx'
import GunnersXI from './GunnersXI.jsx'

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
    id: 'gunnersxi',
    title: 'Gunners XI',
    subtitle: 'Daily Lineup Guesser',
    description: 'Guess the Arsenal starting XI from a historic match. A new puzzle every day.',
    badge: 'LIVE',
    badgeColor: '#4ADE80',
    component: GunnersXI,
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
          <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 4, textShadow: '2px 2px 0 rgba(0,0,0,0.35)' }}>
            TOUCHLINE
          </div>
          <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: 4, textShadow: '2px 2px 0 rgba(0,0,0,0.35)', color: C.goldLight }}>
            GUNNERS
          </div>
          <div style={{ fontSize: 10, letterSpacing: 5, color: 'rgba(255,255,255,0.6)', fontFamily: 'Arial, sans-serif', fontWeight: 400, marginTop: 2 }}>
            ARSENAL FAN GAMES
          </div>
        </div>
      </div>

      <div
