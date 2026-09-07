function ProgressBar({ current = 0, total = 1 }) {
  const safeTotal = Math.max(Number(total) || 1, 1);
  const safeCurrent = Math.min(Math.max(Number(current) || 0, 0), safeTotal);
  const progress = Math.round((safeCurrent / safeTotal) * 100);

  return (
    <div className="progress-wrapper">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span>{progress}%</span>
    </div>
  );
}

export default ProgressBar;
