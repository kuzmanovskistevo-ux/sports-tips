import { useState } from 'react'
import { supabase } from './supabase'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState('tipovi');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [tipovi, setTipovi] = useState([]);
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
      match: row.title || `${row.home_team || ''} vs ${row.away_team || ''}`,
      league: row.league || '⚽ Sports',
      tip: row.tip || '',
      kvota: row.odds ?? '',
      sigurnost: row.confidence != null ? `${row.confidence}%` : '80%',
      analiza: row.description || '',
      status: row.status === 'won'
  ? '🟢 WON'
  : row.status === 'lost'
  ? '🔴 LOST'
  : '⏳ PENDING',
      result: row.result || '',
      statusColor: '#17A2B8'
    }))

    setTipovi(formattedTips)
  }


  

  fetchTips()
}, [])
  const [modalVisible, setModalVisible] = useState(false);

  const [newMatch, setNewMatch] = useState('');

const [newLeague, setNewLeague] = useState('');

const [newTip, setNewTip] = useState('');

const [newKvota, setNewKvota] = useState('');

const [newSigurnost, setNewSigurnost] = useState('');
const [newAnaliza, setNewAnaliza] = useState('');

const [newResult, setNewResult] = useState('');

  const addTip = async () => {
    console.log('KVOTA:', newKvota)
    if (!newMatch || !newTip || !newKvota) return;
const { data, error } = await supabase
  .from('tips')
  .insert({
    title: newMatch,
    result: newResult || 'pending',
    description: newAnaliza || 'No extra analysis provided.',
    tip: newTip,
    odds: parseFloat(newKvota),
    league: newLeague || '⚽ Sports',
    home_team: newMatch.split(' vs ')[0]?.trim(),
    away_team: newMatch.split(' vs ')[1]?.trim(),
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
console.log('ZAPISANO VO SUPABASE:', data)
    const newTipObject = {
      id: data.id,
      match: newMatch,
      league: newLeague || '⚽ Sports',
      tip: newTip,
      kvota: newKvota,
      sigurnost: newSigurnost || '80%',
      analiza: newAnaliza || 'No extra analysis provided.',
      status: row.result === 'won'
  ? '🟢 WON'
  : row.result === 'lost'
  ? '🔴 LOST'
  : row.status === 'finished'
  ? '🏁 FINISHED'
  : '⏳ Pending',
      statusColor: '#17A2B8'
    };

    setTipovi([newTipObject, ...tipovi]);

    setNewMatch('');
    setNewLeague('');
    setNewTip('');
    setNewKvota('');
    setNewSigurnost('');
    setNewAnaliza('');
    setModalVisible(false);
    setNewResult('')
  };
const loginAdmin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
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
  const sendMessage = () => {
    if (!inputMsg.trim()) return;

    const now = new Date();

    const time = `${now.getHours()}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        user: userName || 'Anonimen',
        text: inputMsg,
        time
      }
    ]);

    setInputMsg('');
  };

   return (
    <div className="app">
      <h2 style={{textAlign: 'center'}}>TIPDH CHAT TEST</h2>
     <div style={{
  background: 'red',
  color: 'white',
  padding: '30px',
  fontSize: '30px',
  textAlign: 'center'
}}>
  TIPDH TEST
</div>
      
      {!isAdmin && (
  <div className="admin-login">
    <input
      type="email"
      placeholder="Admin email"
      value={loginEmail}
      onChange={(e) => setLoginEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Admin password"
      value={loginPassword}
      onChange={(e) => setLoginPassword(e.target.value)}
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
          className={activeTab === 'tipovi' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('tipovi')}
        >
          🎯 Tips & Odds
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

      {activeTab === 'tipovi' ? (
        <main className="content">

          {tipovi.map((item) => (
            <div className="tip-card" key={item.id}>

              <div className="card-top">
                <span className="league">{item.league}</span>
                <span
                  className="status"
                  style={{
  color:
    item.status === 'won'
      ? '#22c55e'
      : item.status === 'lost'
      ? '#ef4444'
      : '#17A2B8'
}}
                >
                  {item.status}
                </span>
                <select
  value={item.status}
 onChange={async (e) => {
  const newStatus = e.target.value

  const { error } = await supabase
    .from('tips')
  .update({ status: newStatus })
    .eq('id', item.id)

  if (error) {
    console.error('Грешка при промена на статус:', error)
    alert(error.message)
    return
  }

  setTipovi(
    tipovi.map((tip) =>
      tip.id === item.id
        ? {
            ...tip,
            status: newStatus
          }
        : tip
    )
  )
}}
>
  <option value="upcoming">PENDING</option>
  <option value="won">WON 🟢</option>
  <option value="lost">LOST 🔴</option>
</select>
              </div>

              <h2>{item.match}</h2>

              <p className="analysis">
                {item.analiza}
              </p>

              <div className="tip-box">

                <div className="pick-section">
  <span className="label">PICK / TIP</span>

  <strong className="pick-value">
    {item.tip}
  </strong>

  <small className="confidence">
    Confidence: {item.sigurnost}
  </small>
</div>
                <div className="odds">
  <span>ODDS</span>
  <strong>{item.kvota || item.odds}</strong>
  {item.result && (
  <div className="final-score">
    <span className="label">FINAL SCORE</span>
    <strong>{item.result}</strong>
  </div>
)}
  <span className="label">Final Score</span>
  <input
  style={{ display: isAdmin ? 'block' : 'none' }}
  value={item.result || ''}
  placeholder="Final score"
  onChange={(e) =>
    setTipovi(
      tipovi.map((tip) =>
        tip.id === item.id
          ? { ...tip, result: e.target.value }
          : tip
      )
    )
  }
/><button
  style={{ display: isAdmin ? 'block' : 'none' }}
  onClick={async () => {
    const { error } = await supabase
      .from('tips')
      .update({ result: item.result })
      .eq('id', item.id)

    if (error) {
      alert(error.message)
      return
    }

    alert('Result saved!')
  }}
>
  SAVE RESULT
</button>
</div>

              </div>

            </div>
          ))}

        </main>
      ) : (

        
       

      {modalVisible && (

        <div className="modal-background">

          <div className="modal">

            <h2>🏀 Post New Tip & Analysis</h2>

            <input
              placeholder="Match (e.g. Bayern vs Partizan)"
              value={newMatch}
              onChange={(e) => setNewMatch(e.target.value)}
            />

            <input
              placeholder="League (e.g. 🏀 EuroLeague)"
              value={newLeague}
              onChange={(e) => setNewLeague(e.target.value)}
            />

            <div className="two-inputs">

              <input
                placeholder="Pick / Tip"
                value={newTip}
                onChange={(e) => setNewTip(e.target.value)}
              />

              <input
                placeholder="Odds"
                value={newKvota}
                onChange={(e) => setNewKvota(e.target.value)}
              />

            </div>

            <input
              placeholder="Confidence (e.g. 80%)"
              value={newSigurnost}
              onChange={(e) => setNewSigurnost(e.target.value)}
            />

            <textarea
              placeholder="Short match analysis..."
              value={newAnaliza}
              onChange={(e) => setNewAnaliza(e.target.value)}
            />

            <button
              className="publish"
              onClick={addTip}
            >
              PUBLISH NOW
            </button>

            <button
              className="cancel"
              onClick={() => setModalVisible(false)}
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;
