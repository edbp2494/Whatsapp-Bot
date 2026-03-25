const fs = require('fs');
const path = require('path');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getStatusClass(status) {
  if (status === 'PASS') return 'pass';
  if (status === 'FAIL') return 'fail';
  return 'timeout';
}

async function generateReport(results) {
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(reportsDir, `report_${timestamp}.html`);

  let total = 0;
  let passed = 0;
  let failed = 0;

  for (const flow of results) {
    for (const step of flow.steps) {
      total += 1;
      if (step.status === 'PASS') {
        passed += 1;
      } else {
        failed += 1;
      }
    }
  }

  const flowsHtml = results
    .map((flow) => {
      const stepsHtml = flow.steps
        .map((step) => {
          const cls = getStatusClass(step.status);
          return `
            <div class="step ${cls}">
              <span class="badge ${cls}">${escapeHtml(step.status)}</span>
              <p><strong>Sent:</strong> ${escapeHtml(step.sent)}</p>
              <p><strong>Expected:</strong> ${escapeHtml(step.expected)}</p>
              <p><strong>Actual:</strong> ${escapeHtml(step.actual)}</p>
            </div>
          `;
        })
        .join('');

      return `
        <details>
          <summary>${escapeHtml(flow.id)} - ${escapeHtml(flow.name)}</summary>
          <div class="steps">${stepsHtml}</div>
        </details>
      `;
    })
    .join('');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>QA Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; background: #f7f7f7; color: #1f2937; }
    .card { background: #fff; border-radius: 8px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
    .summary { display: flex; gap: 16px; flex-wrap: wrap; }
    .metric { min-width: 120px; padding: 12px; border-radius: 8px; background: #f3f4f6; }
    .metric h3 { margin: 0 0 4px; font-size: 14px; color: #4b5563; }
    .metric p { margin: 0; font-size: 24px; font-weight: 700; }
    details { background: #fff; border-radius: 8px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
    summary { cursor: pointer; padding: 14px 16px; font-weight: 700; }
    .steps { padding: 0 16px 16px; }
    .step { position: relative; padding: 10px 12px; margin-bottom: 10px; border-radius: 8px; background: #f9fafb; }
    .step.pass { border-left: 5px solid #16a34a; }
    .step.fail { border-left: 5px solid #dc2626; }
    .step.timeout { border-left: 5px solid #d97706; }
    .step p { margin: 6px 0; }
    .badge { display: inline-block; margin-bottom: 6px; padding: 3px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; color: #fff; }
    .badge.pass { background: #16a34a; }
    .badge.fail { background: #dc2626; }
    .badge.timeout { background: #d97706; }
  </style>
</head>
<body>
  <div class="card">
    <h1>QA Execution Report</h1>
    <p>Generated: ${escapeHtml(new Date().toLocaleString())}</p>
    <div class="summary">
      <div class="metric"><h3>Total</h3><p>${total}</p></div>
      <div class="metric"><h3>Passed</h3><p>${passed}</p></div>
      <div class="metric"><h3>Failed</h3><p>${failed}</p></div>
    </div>
  </div>
  ${flowsHtml}
</body>
</html>`;

  fs.writeFileSync(reportPath, html, 'utf8');
  console.log(`Report generated: ${reportPath}`);
}

module.exports = {
  generateReport
};
