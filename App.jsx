import './App.css'
import { useState } from 'react'

function App() {
  const [page, setPage] = useState('home')

  return (
    <div className="app">
      <header className="header">
        <div className="logo">TIPDH</div>

        <nav className="nav">
          <button onClick={() => setPage('home')}>🏠 HOME</button>
          <button onClick={() => setPage('tips')}>🎯 TIPS</button>
          <button onClick={() => setPage('mix')}>🎫 MIX</button>
          <button onClick={() => setPage('vip')}>⭐ VIP</button>
          <button onClick={() => setPage('stats')}>📊 VISITORS</button>
        </nav>
      </header>

      <main className="main">
         {page === 'home' && (
          <section className="hero">
            <div className="hero-ball">⚽</div>

            <h1>SPORTS TIPS</h1>

            <p>Dobredojde na TIPDH 🔥</p>

            <button
              className="yellow-button"
              onClick={() => setPage('tips')}
            >
              🎯 OTVORI TIPS
            </button>
          </section>
        )}

        {page === 'tips' && (
          <section>
            <div className="page-title">
              <h1>🎯 SPORTS TIPS</h1>
              <p>Najnovi sportski tipovi</p>
            </div>

            <div className="tip-card">
              <div className="match-info">
                <div className="teams">
                  <strong>Real Madrid</strong>
                  <span>vs</span>
                  <strong>PSG</strong>
                </div>

                <div className="match-time">
                  <b>🕐 20:45</b>
                  <small>📅 08.10.2026</small>
                </div>
              </div>

              <div className="tip-row">
                <div className="tip-stat">
                  <small>🎯 TIP</small>
                  <strong>1</strong>
                </div>

                <div className="tip-stat">
                  <small>💰 ODDS</small>
                  <strong>1.40</strong>
                </div>

                <div className="tip-stat">
                  <small>STATUS</small>
                  <strong className="pending">
                    ⏳ PENDING
                  </strong>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === 'mix' && (
          <section>
            <div className="page-title">
              <h1>🎫 MIX TICKET</h1>
              <p>Povekje parovi vo eden tiket</p>
            </div>

            <div className="mix-card">
              <h2>⚽ PAR 1</h2>

              <div className="mix-match">
                <strong>Real Madrid</strong>
                <span>vs</span>
                <strong>PSG</strong>
                <b>1.40</b>
              </div>
            </div>

            <div className="mix-card">
              <h2>⚽ PAR 2</h2>

              <div className="mix-match">
                <strong>Bayern</strong>
                <span>vs</span>
                <strong>Man Utd</strong>
                <b>1.90</b>
              </div>
            </div>

            <div className="total-odds">
              <span>💰 TOTAL COEFFICIENT</span>
              <strong>2.66</strong>
            </div>
          </section>
        )}

        {page === 'vip' && (
          <section className="vip-page">
            <div className="vip-star">⭐</div>

            <h1>VIP TIPS</h1>

            <p>PREMIUM SPORTS ZONE</p>

            <div className="vip-box">
              <h2>🔥 VIP ZONA</h2>

              <p>
                Ekskluzivni tipovi i premium MIX.
              </p>

              <div className="vip-list">
                <div>⭐ Premium Tips</div>
                <div>🎫 Exclusive MIX</div>
                <div>📊 Detailed Statistics</div>
                <div>⚡ VIP Notifications</div>
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
              <h1>📊 VISITORS</h1>

              <p>
                Statistika na posetitelite na TIPDH.
              </p>
            </div>

            <div className="stats-grid">
              <div className="stats-card">
                <span>👥</span>
                <h2>VISITORS</h2>
                <p>Vkupno poseti</p>
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
        <p>© 2026 TIPDH • SPORTS TIPS ⚽🔥</p>
      </footer>
    </div>
  )
}

export default App
