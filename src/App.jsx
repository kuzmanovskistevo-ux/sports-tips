import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import './App.css'

function ChateasilyChat() {
  useEffect(() => {
    const target = document.getElementById('my-chat')
    if (!target) return

    target.innerHTML = ''

    const script = document.createElement('script')
    script.src =
      'https://chat.chateasily.com/embed-loader.js?room=C19hGtsAu7&theme=dark&mode=inline&target=%23my-chat&height=600px'

    script.setAttribute('data-room-id', 'C19hGtsAu7')
    script.setAttribute('data-theme', 'dark')
    script.setAttribute('data-mode', 'inline')
    script.setAttribute('data-target', '#my-chat')
    script.setAttribute('data-height', '600px')

    document.body.appendChild(script)

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
      target.innerHTML = ''
    }
  }, [])

  return (
    <div
      id="my-chat"
      style={{
        width: '100%',
        height: '600px'
      }}
    />
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('tipovi')
  const [isAdmin, setIsAdmin] = useState(false)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [tipovi, setTipovi] = useState([])

  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Marko',
      text: 'Shto mislite za Bayern vecher?',
      time: '19:40'
    },
    {
      id: 2,
      user: 'Analyst',
      text: 'Partizan ima dobra kvota 2.45!',
      time: '19:42'
    },
    {
      id: 3,
      user: 'Stefan',
      text: 'Jas ja igrav Barca 1 i 3+ 👌',
      time: '19:45'
    }
  ])

  const [userName, setUserName] = useState('Gostin')
  const [inputMsg, setInputMsg] = useState('')

  const [modalVisible, setModalVisible] = useState(false)

  const [newMatch, setNewMatch] = useState('')
  const [newLeague, setNewLeague] = useState('')
  const [newTip, setNewTip] = useState('')
  const [newKvota, setNewKvota] = useState('')
  const [newSigurnost, setNewSigurnost] = useState('')
  const [newAnaliza, setNewAnaliza] = useState('')
  const [newResult, setNewResult] = useState('')

  const [editTipId, setEditTipId] = useState(null)
  const [editMatch, setEditMatch] = useState('')
  const [editLeague, setEditLeague] = useState('')
  const [editTip, setEditTip] = useState('')
  const [editKvota, setEditKvota] = useState('')
  const [editSigurnost, setEditSigurnost] = useState('')
  const [editAnaliza, setEditAnaliza] = useState('')

  const [liveText, setLiveText] = useState('')
  const [liveMessage, setLiveMessage] = useState('')

  useEffect(() => {
    const fetchTips = async () => {
      const { data, error } = await supabase
        .from('tips')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Грешка при читање tips:', error)
        alert(error.message)
        return
      }

      const formattedTips = (data || []).map((row) => ({
        id: row.id,
        match:
          row.title ||
          `${row.home_team || ''} vs ${row.away_team || ''}`,
        league: row.league || '⚽ Sports',
        tip: row.tip || '',
        kvota: row.odds ?? '',
        sigurnost:
          row.confidence != null
            ? `${row.confidence}%`
            : '80%',
        analiza: row.description || '',
        status:
          row.status === 'won'
            ? '🟢 WON'
            : row.status === 'lost'
            ? '🔴 LOST'
            : '⏳ PENDING',
        result: row.result || '',
        statusValue: row.status || 'upcoming'
      }))

      setTipovi(formattedTips)
    }

    fetchTips()
  }, [])

  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://www.stats4u.net/s4u.js'
    script.setAttribute('data-id', '5908479899')
    script.setAttribute('data-style', '950')
    script.setAttribute(
      'data-params',
      'form=panel&pal=night&el=1,2,3'
    )
    script.async = true

    document
      .getElementById('stats4u-counter')
      ?.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  const addTip = async () => {
    if (!newMatch || !newTip || !newKvota) return

    const { data, error } = await supabase
      .from('tips')
      .insert({
        title: newMatch,
        result: newResult || '',
        description:
          newAnaliza || 'No extra analysis provided.',
        tip: newTip,
        odds: parseFloat(newKvota),
        league: newLeague || '⚽ Sports',
        home_team:
          newMatch.split(' vs ')[0]?.trim(),
        away_team:
          newMatch.split(' vs ')[1]?.trim(),
        status: 'upcoming',
        confidence: Number(newSigurnost) || 80,
        published: true,
        source: 'manual'
      })
      .select()
      .single()

    if (error) {
      console.error('Грешка при зачувување:', error)
      alert(error.message)
      return
    }

    const newTipObject = {
      id: data.id,
      match: newMatch,
      league: newLeague || '⚽ Sports',
      tip: newTip,
      kvota: newKvota,
      sigurnost: `${newSigurnost || 80}%`,
      analiza:
        newAnaliza || 'No extra analysis provided.',
      status: '⏳ PENDING',
      statusValue: 'upcoming',
      result: ''
    }

    setTipovi([newTipObject, ...tipovi])

    setNewMatch('')
    setNewLeague('')
    setNewTip('')
    setNewKvota('')
    setNewSigurnost('')
    setNewAnaliza('')
    setNewResult('')
    setModalVisible(false)
  }

  const loginAdmin = async () => {
    const { error } =
      await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword
      })

    if (error) {
      alert(error.message)
      return
    }

    setIsAdmin(true)
    alert('Успешно се најави како админ!')
  }

  const openEdit = (item) => {
    setEditTipId(item.id)
    setEditMatch(item.match)
    setEditLeague(item.league)
    setEditTip(item.tip)
    setEditKvota(item.kvota)
    setEditSigurnost(
      String(item.sigurnost).replace('%', '')
    )
    setEditAnaliza(item.analiza)
  }

  const saveEdit = async () => {
    if (!editTipId) return

    const { error } = await supabase
      .from('tips')
      .update({
        title: editMatch,
        league: editLeague,
        tip: editTip,
        odds: parseFloat(editKvota),
        confidence: Number(editSigurnost) || 80,
        description: editAnaliza,
        home_team:
          editMatch.split(' vs ')[0]?.trim(),
        away_team:
          editMatch.split(' vs ')[1]?.trim()
      })
      .eq('id', editTipId)

    if (error) {
      alert(error.message)
      return
    }

    setTipovi(
      tipovi.map((item) =>
        item.id === editTipId
          ? {
              ...item,
              match: editMatch,
              league: editLeague,
              tip: editTip,
              kvota: editKvota,
              sigurnost: `${editSigurnost || 80}%`,
              analiza: editAnaliza
            }
          : item
      )
    )

    setEditTipId(null)
    alert('Tipot e uspesno izmenet!')
  }

  const sendMessage = () => {
    if (!inputMsg.trim()) return

    const now = new Date()

    const time = `${now.getHours()}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`

    setMessages([
      ...messages,
      {
        id: Date.now(),
        user: userName || 'Anonimen',
        text: inputMsg,
        time
      }
    ])

    setInputMsg('')
  }

  const publishLiveText = () => {
    if (!liveMessage.trim()) return

    setLiveText(liveMessage)
    setLiveMessage('')
  }

  const updateStatus = async (item, newStatus) => {
    const { error } = await supabase
      .from('tips')
      .update({
        status: newStatus
      })
      .eq('id', item.id)

    if (error) {
      alert(error.message)
      return
    }

    setTipovi(
      tipovi.map((tip) =>
        tip.id === item.id
          ? {
              ...tip,
              statusValue: newStatus,
              status:
                newStatus === 'won'
                  ? '🟢 WON'
                  : newStatus === 'lost'
                  ? '🔴 LOST'
                  : '⏳ PENDING'
            }
          : tip
      )
    )
  }

  const saveResult = async (item) => {
    const { error } = await supabase
      .from('tips')
      .update({
        result: item.result
      })
      .eq('id', item.id)

    if (error) {
      alert(error.message)
      return
    }

    alert('Result saved!')
  }

  return (
    <div className="app">

      <div
        id="stats4u-counter"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '10px 0'
        }}
      ></div>

      {!isAdmin && (
        <div className="admin-login">
          <input
            type="email"
            placeholder="Admin email"
            value={loginEmail}
            onChange={(e) =>
              setLoginEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Admin password"
            value={loginPassword}
            onChange={(e) =>
              setLoginPassword(e.target.value)
            }
          />

          <button onClick={loginAdmin}>
            ADMIN LOGIN
          </button>
        </div>
      )}

      {isAdmin && (
        <div className="admin-login">
          <strong>🟢 ADMIN MODE</strong>
        </div>
      )}

      <header className="header">
        <h1>⚽ SPORTS TIPS & ANALYTICS</h1>
        <p>Premium Predictions & Fan Community</p>
      </header>

      <div className="tabs">

        <button
          className={
            activeTab === 'tipovi'
              ? 'tab active'
              : 'tab'
          }
          onClick={() => setActiveTab('tipovi')}
        >
          🎯 Tips & Odds
        </button>

        <button
          className={
            activeTab === 'chat'
              ? 'tab active'
              : 'tab'
          }
          onClick={() => setActiveTab('chat')}
        >
          💬 Fan Chat
        </button>

        <button
          className={
            activeTab === 'live'
              ? 'tab active'
              : 'tab'
          }
          onClick={() => setActiveTab('live')}
        >
          🔴 LIVE
        </button>

      </div>

      {activeTab === 'tipovi' && (
        <button
          className="add-button"
          onClick={() => setModalVisible(true)}
        >
          ➕ POST NEW TIP / ANALYSIS
        </button>
      )}

      {activeTab === 'tipovi' && (
        <main className="content">

          {tipovi.map((item) => (
            <div className="tip-card" key={item.id}>

              <div className="card-top">

                <span className="league">
                  {item.league}
                </span>

                <span
                  className="status"
                  style={{
                    color:
                      item.statusValue === 'won'
                        ? '#22c55e'
                        : item.statusValue === 'lost'
                        ? '#ef4444'
                        : '#17A2B8'
                  }}
                >
                  {item.status}
                </span>

                {isAdmin && (
                  <>
                    <select
                      value={item.statusValue}
                      onChange={(e) =>
                        updateStatus(
                          item,
                          e.target.value
                        )
                      }
                    >
                      <option value="upcoming">
                        PENDING
                      </option>
                      <option value="won">
                        WON 🟢
                      </option>
                      <option value="lost">
                        LOST 🔴
                      </option>
                    </select>

                    <button
                      onClick={() => openEdit(item)}
                    >
                      ✏️ EDIT
                    </button>
                  </>
                )}

              </div>

              <h2>{item.match}</h2>

              <p className="analysis">
                {item.analiza}
              </p>

              <div className="tip-box">

                <div className="pick-section">
                  <span className="label">
                    PICK / TIP
                  </span>

                  <strong className="pick-value">
                    {item.tip}
                  </strong>

                  <small className="confidence">
                    Confidence: {item.sigurnost}
                  </small>
                </div>

                <div className="odds">

                  <span>ODDS</span>

                  <strong>
                    {item.kvota}
                  </strong>

                  {item.result && (
                    <div className="final-score">
                      <span className="label">
                        FINAL SCORE
                      </span>

                      <strong>
                        {item.result}
                      </strong>
                    </div>
                  )}

                  {isAdmin && (
                    <>
                      <span className="label">
                        Final Score
                      </span>

                      <input
                        value={item.result || ''}
                        placeholder="Final score"
                        onChange={(e) =>
                          setTipovi(
                            tipovi.map((tip) =>
                              tip.id === item.id
                                ? {
                                    ...tip,
                                    result:
                                      e.target.value
                                  }
                                : tip
                            )
                          )
                        }
                      />

                      <button
                        onClick={() =>
                          saveResult(item)
                        }
                      >
                        SAVE RESULT
                      </button>
                    </>
                  )}

                </div>

              </div>

            </div>
          ))}

        </main>
      )}

      {activeTab === 'chat' && (
        <main className="chat">
          <ChateasilyChat />
        </main>
      )}

      {activeTab === 'live' && (
        <main className="content">

          <div
            style={{
              marginBottom: '15px',
              padding: '15px',
              border: '1px solid #333',
              borderRadius: '8px'
            }}
          >

            <h2 style={{ marginTop: 0 }}>
              🔴 LIVE TXT
            </h2>

            {liveText && (
              <div
                style={{
                  padding: '12px',
                  marginBottom: '10px',
                  background: '#1e1e1e',
                  borderRadius: '6px'
                }}
              >
                {liveText}
              </div>
            )}

            {isAdmin && (
              <div>
                <input
                  value={liveMessage}
                  onChange={(e) =>
                    setLiveMessage(e.target.value)
                  }
                  placeholder="Napishi LIVE poraka..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '8px'
                  }}
                />

                <button
                  onClick={publishLiveText}
                >
                  📢 PUBLISH LIVE TXT
                </button>
              </div>
            )}

          </div>

          <h2>💬 LIVE CHAT</h2>

          <ChateasilyChat />

        </main>
      )}

      {modalVisible && (
        <div className="modal-background">

          <div className="modal">

            <h2>
              🏀 Post New Tip & Analysis
            </h2>

            <input
              placeholder="Match (e.g. Bayern vs Partizan)"
              value={newMatch}
              onChange={(e) =>
                setNewMatch(e.target.value)
              }
            />

            <input
              placeholder="League (e.g. 🏀 EuroLeague)"
              value={newLeague}
              onChange={(e) =>
                setNewLeague(e.target.value)
              }
            />

            <div className="two-inputs">

              <input
                placeholder="Pick / Tip"
                value={newTip}
                onChange={(e) =>
                  setNewTip(e.target.value)
                }
              />

              <input
                placeholder="Odds"
                value={newKvota}
                onChange={(e) =>
                  setNewKvota(e.target.value)
                }
              />

            </div>

            <input
              placeholder="Confidence (e.g. 80%)"
              value={newSigurnost}
              onChange={(e) =>
                setNewSigurnost(e.target.value)
              }
            />

            <textarea
              placeholder="Short match analysis..."
              value={newAnaliza}
              onChange={(e) =>
                setNewAnaliza(e.target.value)
              }
            />

            <button
              className="publish"
              onClick={addTip}
            >
              PUBLISH NOW
            </button>

            <button
              className="cancel"
              onClick={() =>
                setModalVisible(false)
              }
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {editTipId && (
        <div className="modal-background">

          <div className="modal">

            <h2>✏️ Edit Tip</h2>

            <input
              placeholder="Match"
              value={editMatch}
              onChange={(e) =>
                setEditMatch(e.target.value)
              }
            />

            <input
              placeholder="League"
              value={editLeague}
              onChange={(e) =>
                setEditLeague(e.target.value)
              }
            />

            <div className="two-inputs">

              <input
                placeholder="Pick / Tip"
                value={editTip}
                onChange={(e) =>
                  setEditTip(e.target.value)
                }
              />

              <input
                placeholder="Odds"
                value={editKvota}
                onChange={(e) =>
                  setEditKvota(e.target.value)
                }
              />

            </div>

            <input
              placeholder="Confidence"
              value={editSigurnost}
              onChange={(e) =>
                setEditSigurnost(e.target.value)
              }
            />

            <textarea
              placeholder="Analysis"
              value={editAnaliza}
              onChange={(e) =>
                setEditAnaliza(e.target.value)
              }
            />

            <button
              className="publish"
              onClick={saveEdit}
            >
              💾 SAVE CHANGES
            </button>

            <button
              className="cancel"
              onClick={() =>
                setEditTipId(null)
              }
            >
              CANCEL
            </button>

          </div>

        </div>
      )}

    </div>
  )
}

export default App
