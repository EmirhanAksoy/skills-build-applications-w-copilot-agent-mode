function DataTableCard({ id, title, subtitle, linkLabel, linkHref, columns, rows, actionLabel }) {
  return (
    <section id={id} className="col-12 col-xl-6">
      <div className="card octo-card shadow-sm h-100">
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-3 gap-3">
            <div>
              <h2 className="h4 mb-1 text-body-emphasis">{title}</h2>
              <p className="text-secondary mb-0">{subtitle}</p>
            </div>
            <a className="link-primary fw-semibold text-decoration-none" href={linkHref}>
              {linkLabel}
            </a>
          </div>

          <div className="table-responsive rounded-3 border table-shell mb-3">
            <table className="table table-striped table-hover align-middle mb-0 octo-table">
              <thead className="table-light">
                <tr>
                  {columns.map((column) => (
                    <th key={column} scope="col">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={`${title}-${index}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${title}-${index}-${cellIndex}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-auto d-flex justify-content-end">
            <button type="button" className="btn btn-outline-primary btn-sm">{actionLabel}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataTableCard;
