import './App.css'
import { useState } from 'react'

function App() {
  const [page, setPage] = useState('home')

  const [tips, setTips] = useState([
    {
      home: 'Real Madrid',
      away: 'PSG',
      date: '08.10.2026',
      time: '20:45',
      tip: '1',
      odds: '1.40',
      status: 'PENDING',
      score: '',
    },
  ])

  const [showPublish, setShowPublish] = useState(false)

  const [newTip, setNewTip] = useState({
    home: '',
    away: '',
    date: '',
    time: '',
    tip: '',
    odds: '',
  })

  const [editingIndex, setEditingIndex] = useState(null)

  const [editData, setEditData] = useState({
    score: '',
    status: 'PENDING',
  })

  const [mixMatches, setMixMatches] = useState([
    {
      home: 'Real Madrid',
      away: 'PSG',
      date: '2026-10-08',
      time: '20:45',
      tip: '1',
      odds: '1.40',
    },
    {
      home: 'Bayern',
      away: 'Man Utd',
      date: '2026-10-08',
      time: '21:00',
      tip: '1',
      odds: '1.90',
    },
  ])

  const [system, setSystem] = useState('TICKET')

  const addTip = () => {
    if (
      !newTip.home ||
      !newTip.away ||
      !newTip.date ||
      !newTip.time ||
      !newTip.tip ||
      !newTip.odds
    ) {
      alert('Popolni gi site polinja.')
      return
    }

    setTips([
      {
        ...newTip,
        status: 'PENDING',
        score: '',
      },
      ...tips,
    ])

    setNewTip({
      home: '',
      away: '',
      date: '',
      time: '',
      tip: '',
      odds: '',
    })

    setShowPublish(false)
  }

  const openEdit = (index) => {
    setEditingIndex(index)

    setEditData({
      score: tips[index].score || '',
      status: tips[index].status || 'PENDING',
    })
  }

  const saveEdit = () => {
    const updated = [...tips]

    updated[editingIndex] = {
      ...updated[editingIndex],
      score: editData.score,
      status: editData.status,
    }

    setTips(updated)
    setEditingIndex(null)
  }

  const addMixMatch = () => {
    setMixMatches([
      ...mixMatches,
      {
        home: '',
        away: '',
        date: '',
        time: '',
        tip: '',
        odds: '',
      },
    ])
  }

  const removeMixMatch = (index) => {
    if (mixMatches.length === 1) return

    setMixMatches(
      mixMatches.filter((_, i) => i !== index)
    )
  }

  const updateMixMatch = (index, field, value) => {
    const updated = [...mixMatches]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setMixMatches(updated)
  }

  const totalOdds = mixMatches.reduce((total, match) => {
    const odds = parseFloat(match.odds)

    if (!Number.isFinite(odds) || odds <= 0) {
      return total
    }

    return total * odds
  }, 1)

  const statusClass = (status) => {
    if (status === 'WIN') return 'win'
    if (status === 'LOSS') return 'loss'
    if (status === 'VOID') return 'void'

    return 'pending'
  }

  const statusText = (status) => {
    if (status === 'WIN') return '🏆 WIN'
    if (status === 'LOSS') return '❌ LOSS'
    if (status === 'VOID') return '↩️ VOID'

    return '⏳ PENDING'
  }

  return (
    <div className="app">

      <header className="header">

        <div className="brand">
          <div className="logo">TIPDH</div>
          <div className="subtitle">
            SPORTS TIPS ⚽
          </div>
        </div>

        <nav className="nav">

          <button
            className={page === 'home' ? 'active' : ''}
            onClick={() => setPage('home')}
          >
            🏠 HOME
          </button>

          <button
            className={page === 'tips' ? 'active' : ''}
            onClick={() => setPage('tips')}
          >
            🎯 TIPS
          </button>

          <button
            className={page === 'mix' ? 'active' : ''}
            onClick={() => setPage('mix')}
          >
            🎫 MIX
          </button>

          <button
            className={page === 'vip' ? 'vip-active' : 'vip-nav'}
            onClick={() => setPage('vip')}
          >
            ⭐ VIP
          </button>

          <button
            className={page === 'stats' ? 'stats-active' : 'stats-nav'}
            onClick={() => setPage('stats')}
          >
            📊 VISITORS
          </button>

        </nav>

      </header>

      <main className="main">

        {page === 'home' && (
          <>
            <section className="hero">

              <div className="hero-ball">
                ⚽
              </div>

              <h1>SPORTS TIPS</h1>

              <p>
                Dobredojde na TIPDH 🔥
              </p>

              <button
                className="yellow-button"
                onClick={() => setPage('tips')}
              >
                🎯 OTVORI TIPS
              </button>

            </section>

            <section className="home-grid">

              <div className="home-card">
                <span>🎯</span>
                <h2>SPORTS TIPS</h2>
                <p>
                  Najnovi sportski tipovi i rezultati.
                </p>

                <button onClick={() => setPage('tips')}>
                  OTVORI
                </button>
              </div>

              <div className="home-card">
                <span>🎫</span>
                <h2>MIX TICKETS</h2>
                <p>
                  Povekje parovi vo eden tiket.
                </p>

                <button onClick={() => setPage('mix')}>
                  OTVORI
                </button>
              </div>

              <div className="home-card vip-home-card">
                <span>⭐</span>
                <h2>VIP</h2>
                <p>
                  Premium zona — uskoro.
                </p>

                <button onClick={() => setPage('vip')}>
                  OTVORI
                </button>
              </div>

              <div className="home-card stats-home-card">
                <span>📊</span>
                <h2>VISITORS</h2>
                <p>
                  Statistika na posetitelite.
                </p>

                <button onClick={() => setPage('stats')}>
                  OTVORI
                </button>
              </div>

            </section>
          </>
        )}

        {page === 'tips' && (
          <>
            <section className="page-title">

              <h1>🎯 SPORTS TIPS</h1>

              <p>
                Tvoite sportski predlozi.
              </p>

            </section>

            <button
              className="yellow-button full-button"
              onClick={() => setShowPublish(!showPublish)}
            >
              {showPublish
                ? '❌ CLOSE'
                : '➕ PUBLISH TIP'}
            </button>

            {showPublish && (
              <section className="publish-box">

                <h2>📝 NOV TIP</h2>

                <div className="form-grid">

                  <input
                    placeholder="🏠 Home team"
                    value={newTip.home}
                    onChange={(e) =>
                      setNewTip({
                        ...newTip,
                        home: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="✈️ Away team"
                    value={newTip.away}
                    onChange={(e) =>
                      setNewTip({
                        ...newTip,
                        away: e.target.value,
                      })
                    }
                  />

                  <input
                    type="date"
                    value={newTip.date}
                    onChange={(e) =>
                      setNewTip({
                        ...newTip,
                        date: e.target.value,
                      })
                    }
                  />

                  <input
                    type="time"
                    value={newTip.time}
                    onChange={(e) =>
                      setNewTip({
                        ...newTip,
                        time: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="🎯 TIP"
                    value={newTip.tip}
                    onChange={(e) =>
                      setNewTip({
                        ...newTip,
                        tip: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    step="0.01"
                    placeholder="💰 ODDS"
                    value={newTip.odds}
                    onChange={(e) =>
                      setNewTip({
                        ...newTip,
                        odds: e.target.value,
                      })
                    }
                  />

                </div>

                <button
                  className="yellow-button"
                  onClick={addTip}
                >
                  🚀 PUBLISH TIP
                </button>

              </section>
            )}

            <section className="section-title">

              <h2>🔥 TIPS</h2>

              <span>
                {tips.length} TIPS
              </span>

            </section>

            {tips.map((tip, index) => (
              <div
                className="tip-card"
                key={index}
              >

                <div className="match-info">

                  <div className="teams">

                    <strong>
                      {tip.home}
                    </strong>

                    <span>
                      vs
                    </span>

                    <strong>
                      {tip.away}
                    </strong>

                  </div>

                  <div className="match-time">

                    <b>
                      🕐 {tip.time}
                    </b>

                    <small>
                      📅 {tip.date}
                    </small>

                  </div>

                </div>

                <div className="tip-row">

                  <div className="tip-stat">

                    <small>
                      🎯 TIP
                    </small>

                    <strong>
                      {tip.tip}
                    </strong>

                  </div>

                  <div className="tip-stat">

                    <small>
                      💰 ODDS
                    </small>

                    <strong className="odds-value">
                      {tip.odds}
                    </strong>

                  </div>

                  <div className="tip-stat">

                    <small>
                      STATUS
                    </small>

                    <strong
                      className={statusClass(tip.status)}
                    >
                      {statusText(tip.status)}
                    </strong>

                  </div>

                </div>

                {tip.score && (
                  <div className="final-score">

                    <small>
                      ⚽ FINAL SCORE
                    </small>

                    <strong>
                      {tip.score}
                    </strong>

                  </div>
                )}

                {editingIndex === index ? (
                  <div className="edit-box">

                    <input
                      placeholder="⚽ Final score e.g. 2:1"
                      value={editData.score}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          score: e.target.value,
                        })
                      }
                    />

                    <select
                      value={editData.status}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          status: e.target.value,
                        })
                      }
                    >

                      <option value="PENDING">
                        ⏳ PENDING
                      </option>

                      <option value="WIN">
                        🏆 WIN
                      </option>

                      <option value="LOSS">
                        ❌ LOSS
                      </option>

                      <option value="VOID">
                        ↩️ VOID
                      </option>

                    </select>

                    <button
                      className="yellow-button"
                      onClick={saveEdit}
                    >
                      💾 SAVE RESULT
                    </button>

                  </div>
                ) : (
                  <button
                    className="edit-button"
                    onClick={() => openEdit(index)}
                  >
                    ✏️ EDIT RESULT
                  </button>
                )}

              </div>
            ))}
          </>
        )}

        {page === 'mix' && (
          <>
            <section className="page-title">

              <h1>🎫 MIX TICKET</h1>

              <p>
                Povekje parovi vo eden tiket.
              </p>

            </section>

            <section className="system-box">

              <label>
                📊 SYSTEM
              </label>

              <select
                value={system}
                onChange={(e) =>
                  setSystem(e.target.value)
                }
              >

                <option value="TICKET">
                  🎫 TICKET
                </option>

                <option value="2/3">
                  2/3 SYSTEM
                </option>

                <option value="3/4">
                  3/4 SYSTEM
                </option>

                <option value="4/5">
                  4/5 SYSTEM
                </option>

                <option value="5/6">
                  5/6 SYSTEM
                </option>

              </select>

            </section>

            {mixMatches.map((match, index) => (
              <div
                className="mix-card"
                key={index}
              >

                <div className="mix-header">

                  <strong>
                    ⚽ PAR {index + 1}
                  </strong>

                  {mixMatches.length > 1 && (
                    <button
                      className="remove-button"
                      onClick={() =>
                        removeMixMatch(index)
                      }
                    >
                      🗑️
                    </button>
                  )}

                </div>

                <div className="form-grid">

                  <input
                    placeholder="🏠 Home team"
                    value={match.home}
                    onChange={(e) =>
                      updateMixMatch(
                        index,
                        'home',
                        e.target.value
                      )
                    }
                  />

                  <input
                    placeholder="✈️ Away team"
                    value={match.away}
                    onChange={(e) =>
                      updateMixMatch(
                        index,
                        'away',
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="date"
                    value={match.date}
                    onChange={(e) =>
                      updateMixMatch(
                        index,
                        'date',
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="time"
                    value={match.time}
                    onChange={(e) =>
                      updateMixMatch(
                        index,
                        'time',
                        e.target.value
                      )
                    }
                  />

                  <input
                    placeholder="🎯 TIP"
                    value={match.tip}
                    onChange={(e) =>
                      updateMixMatch(
                        index,
                        'tip',
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="number"
                    step="0.01"
                    placeholder="💰 ODDS"
                    value={match.odds}
                    onChange={(e) =>
                      updateMixMatch(
                        index,
                        'odds',
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>
            ))}

            <button
              className="add-match-button"
              onClick={addMixMatch}
            >
              ➕ ADD ANOTHER MATCH
            </button>

            <div className="total-odds">

              <span>
                💰 TOTAL COEFFICIENT
              </span>

              <strong>
                {totalOdds
                  ? totalOdds.toFixed(2)
                  : '—'}
              </strong>

            </div>

          </>
        )}

        {page === 'vip' && (
          <section className="vip-page">

            <div className="vip-star">
              ⭐
            </div>

            <h1>
              VIP TIPS
            </h1>

            <p>
              PREMIUM SPORTS ZONE
            </p>

            <div className="vip-box">

              <h2>
                🔥 VIP ZONA
              </h2>

              <p>
                Ekskluzivni tipovi, premium MIX
                i podetalna statistika.
              </p>

              <div className="vip-list">

                <div>
                  ⭐ Premium Tips
                </div>

                <div>
                  🎫 Exclusive MIX
                </div>

                <div>
                  📊 Detailed Statistics
                </div>

                <div>
                  ⚡ VIP Notifications
                </div>

              </div>

              <button>
                🔒 VIP PRETPLATA — USKORO
              </button>

            </div>

          </section>
        )}

        {page === 'stats' && (
          <section className="stats-page">

            <div className="page-title">

              <h1>
                📊 VISITORS
              </h1>

              <p>
                Statistika na posetitelite na TIPDH.
              </p>

            </div>

            <div className="stats-grid">

              <div className="stats-card">
                <span>👥</span>
                <h2>VISITORS</h2>
                <p>Realni posetiteli</p>
              </div>

              <div className="stats-card">
                <span>🌍</span>
                <h2>COUNTRIES</h2>
                <p>Drzavi</p>
              </div>

              <div className="stats-card">
                <span>📍</span>
                <h2>CITIES</h2>
                <p>Gradovi</p>
              </div>

              <div className="stats-card">
                <span>🔎</span>
                <h2>SOURCES</h2>
                <p>Od kade doagaat</p>
              </div>

            </div>

          </section>
        )}

      </main>

      <footer className="footer">
        <p>
          © 2026 TIPDH • SPORTS TIPS ⚽🔥
        </p>
      </footer>

    </div>
  )
}

export default App
