function WorkoutFormCard({ onSubmit }) {
  return (
    <section id="workouts" className="col-12 col-xl-6">
      <div className="card octo-card shadow-sm h-100">
        <div className="card-body">
          <h2 className="h4 mb-1 text-body-emphasis">Workout Suggestion Form</h2>
          <p className="text-secondary mb-4">Use this bootstrap form to simulate personalized recommendations.</p>

          <form className="row g-3" onSubmit={onSubmit}>
            <div className="col-md-6">
              <label htmlFor="memberName" className="form-label fw-semibold">Member Name</label>
              <input id="memberName" className="form-control" placeholder="Ex: Peter Parker" required />
            </div>

            <div className="col-md-6">
              <label htmlFor="goal" className="form-label fw-semibold">Goal</label>
              <select id="goal" className="form-select" defaultValue="strength">
                <option value="strength">Strength</option>
                <option value="endurance">Endurance</option>
                <option value="mobility">Mobility</option>
              </select>
            </div>

            <div className="col-12">
              <label htmlFor="notes" className="form-label fw-semibold">Notes</label>
              <textarea id="notes" className="form-control" rows="4" placeholder="Share constraints, injuries, or preferred activity style." />
            </div>

            <div className="col-12 d-flex justify-content-end gap-2">
              <button type="reset" className="btn btn-outline-secondary">Clear</button>
              <button type="submit" className="btn btn-primary">Save Recommendation</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default WorkoutFormCard;
