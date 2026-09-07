function Home({ onStart }) {
  return (
    <section className="home">
      <p className="home-kicker">GRA EDUKACYJNA</p>
      <h1 className="home-title">TECH QUEST</h1>
      <p className="home-subtitle">Programowanie przez zabawę</p>
      <p className="home-desc">
        Twórz programy, rozwiązuj misje i zaprogramuj swojego robota.
      </p>

      <button type="button" className="start-btn" onClick={onStart}>
        ROZPOCZNIJ
      </button>

      <div className="feature-grid">
        <article className="feature-card">
          <div className="feature-icon" aria-hidden="true">
            💻
          </div>
          <p>Programowanie</p>
        </article>
        <article className="feature-card">
          <div className="feature-icon" aria-hidden="true">
            🤖
          </div>
          <p>Roboty</p>
        </article>
        <article className="feature-card">
          <div className="feature-icon" aria-hidden="true">
            🧠
          </div>
          <p>Logika</p>
        </article>
        <article className="feature-card">
          <div className="feature-icon" aria-hidden="true">
            🏆
          </div>
          <p>XP i osiągnięcia</p>
        </article>
      </div>
    </section>
  )
}

export default Home
