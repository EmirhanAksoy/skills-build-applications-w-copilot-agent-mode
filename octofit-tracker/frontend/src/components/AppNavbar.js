function AppNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-nav sticky-top">
      <div className="container py-1">
        <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="#top">
          <img
            src="/octofit-logo.png"
            alt="OctoFit"
            className="brand-logo"
          />
          <span>OctoFit Tracker</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#octofitNav"
          aria-controls="octofitNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="octofitNav">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item">
              <a className="nav-link" href="#activities">Activities</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#teams">Teams</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#leaderboard">Leaderboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#workouts">Workouts</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
