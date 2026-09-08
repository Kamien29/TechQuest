import Navbar from "../components/Navbar";

function Home({ onStart }) {
  return (
    <div className="app">
      <Navbar xp={0} />

      <main className="home">
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              <img src="src\assets\code_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Code" />
               EDUKACYJNA GRA PROGRAMISTYCZNA
            </span>

            <h1>
              Naucz się programować
              <span> przez zabawę.</span>
            </h1>

            <p>
              Twórz programy, rozwiązuj misje
              i zaprogramuj swojego robota.
            </p>

            <button
              className="hero-button"
              onClick={onStart}
            >
              ▶ ROZPOCZNIJ
            </button>
          </div>

          <div className="hero-robot">
            <div className="robot-glow">
              <img src="src\assets\smart_toy_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Robot" />
            </div>
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <span><img src="src\assets\computer_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Komputer" /></span>
            <h3>Programowanie</h3>
            <p>
              Poznaj podstawy logicznego myślenia
              i programowania.
            </p>
          </div>

          <div className="feature-card">
            <span><img src="src\assets\smart_toy_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Robot" /></span>
            <h3>Robot</h3>
            <p>
              Twórz instrukcje i obserwuj,
              jak robot wykonuje Twój program.
            </p>
          </div>

          <div className="feature-card">
            <span class="material-symbols-outlined"><img src="..\src\assets\trophy_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Trophy" /></span><h3>XP</h3>
            <p>
              Rozwiązuj kolejne misje
              i zdobywaj doświadczenie.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;