const fs = require('fs');
const path = require('path');

async function generateReport(results) {
  const reportsDir = path.join(__dirname, 'reports');

  // Create reports directory if it doesn't exist
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Create report filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const reportFilename = `report_${timestamp}.html`;
  const reportPath = path.join(reportsDir, reportFilename);

  // Calculate summary
  let totalSteps = 0;
  let passedSteps = 0;
  let failedSteps = 0;

  results.forEach(flow => {
    flow.steps.forEach(step => {
      totalSteps++;
      if (step.status === 'PASS') {
        passedSteps++;
      } else if (step.status === 'FAIL' || step.status === 'TIMEOUT') {
        failedSteps++;
      }
    });
  });

  // Generate HTML report
  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>mi-tienda QA Report - ${timestamp}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
      color: #333;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 28px;
      margin-bottom: 10px;
    }
    
    .header p {
      font-size: 14px;
      opacity: 0.9;
    }
    
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      padding: 30px;
      background: #f9f9f9;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .summary-card {
      text-align: center;
    }
    
    .summary-card .number {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .summary-card .label {
      font-size: 12px;
      text-transform: uppercase;
      color: #666;
      letter-spacing: 1px;
    }
    
    .passed .number { color: #4caf50; }
    .failed .number { color: #f44336; }
    .total .number { color: #667eea; }
    
    .flows {
      padding: 20px;
    }
    
    .flow-container {
      margin-bottom: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .flow-header {
      background: #f5f5f5;
      padding: 15px;
      cursor: pointer;
      user-select: none;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.2s;
    }
    
    .flow-header:hover {
      background: #efefef;
    }
    
    .flow-title {
      font-size: 16px;
      color: #333;
    }
    
    .flow-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-left: 10px;
    }
    
    .badge-pass {
      background: #4caf50;
      color: white;
    }
    
    .badge-fail {
      background: #f44336;
      color: white;
    }
    
    .badge-timeout {
      background: #ff9800;
      color: white;
    }
    
    .flow-toggle {
      font-size: 12px;
      color: #999;
    }
    
    .flow-details {
      padding: 15px;
      background: white;
    }
    
    .step {
      margin-bottom: 15px;
      padding: 12px;
      background: #fafafa;
      border-left: 4px solid #e0e0e0;
      border-radius: 4px;
    }
    
    .step.pass {
      border-left-color: #4caf50;
      background: #f1f8f4;
    }
    
    .step.fail {
      border-left-color: #f44336;
      background: #fdf5f4;
    }
    
    .step.timeout {
      border-left-color: #ff9800;
      background: #fffaf1;
    }
    
    .step-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }
    
    .step-description {
      font-size: 13px;
      font-weight: 600;
      color: #333;
      flex: 1;
    }
    
    .step-status {
      padding: 2px 8px;
      border-radius: 3px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      white-space: nowrap;
      margin-left: 10px;
    }
    
    .step-status.pass {
      background: #4caf50;
      color: white;
    }
    
    .step-status.fail {
      background: #f44336;
      color: white;
    }
    
    .step-status.timeout {
      background: #ff9800;
      color: white;
    }
    
    .step-content {
      font-size: 12px;
      line-height: 1.6;
      color: #666;
    }
    
    .step-content div {
      margin-bottom: 6px;
    }
    
    .step-content strong {
      color: #333;
    }
    
    .footer {
      padding: 15px;
      background: #f9f9f9;
      border-top: 1px solid #e0e0e0;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
    
    details {
      cursor: pointer;
    }
    
    summary::-webkit-details-marker {
      display: none;
    }
    
    summary {
      cursor: pointer;
      outline: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>mi-tienda QA Report</h1>
      <p>Generated on ${new Date().toLocaleString('es-CO')}</p>
    </div>
    
    <div class="summary">
      <div class="summary-card total">
        <div class="number">${totalSteps}</div>
        <div class="label">Total Steps</div>
      </div>
      <div class="summary-card passed">
        <div class="number">${passedSteps}</div>
        <div class="label">Passed</div>
      </div>
      <div class="summary-card failed">
        <div class="number">${failedSteps}</div>
        <div class="label">Failed</div>
      </div>
    </div>
    
    <div class="flows">
      ${results.map(flow => {
        const flowPassed = flow.steps.filter(s => s.status === 'PASS').length;
        const flowTotal = flow.steps.length;
        return `
        <div class="flow-container">
          <details open>
            <summary>
              <div class="flow-header">
                <div class="flow-title">${flow.name || flow.id}</div>
                <span class="flow-badge ${flowPassed === flowTotal ? 'badge-pass' : 'badge-fail'}">
                  ${flowPassed}/${flowTotal}
                </span>
                <span class="flow-toggle">▼</span>
              </div>
            </summary>
            <div class="flow-details">
              ${flow.steps.map(step => `
              <div class="step ${step.status.toLowerCase()}">
                <div class="step-header">
                  <div class="step-description">${step.description || 'Step'}</div>
                  <span class="step-status ${step.status.toLowerCase()}">${step.status}</span>
                </div>
                <div class="step-content">
                  <div><strong>Sent:</strong> ${escapeHtml(step.sent)}</div>
                  <div><strong>Expected:</strong> ${step.expected ? escapeHtml(step.expected) : '(any response)'}</div>
                  <div><strong>Received:</strong> ${escapeHtml(step.actual)}</div>
                </div>
              </div>
              `).join('')}
            </div>
          </details>
        </div>
        `;
      }).join('')}
    </div>
    
    <div class="footer">
      <p>Report generated by mi-tienda QA Bot</p>
    </div>
  </div>
  
  <script>
    function escapeHtml(text) {
      var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return String(text).replace(/[&<>"']/g, m => map[m]);
    }
  </script>
</body>
</html>
`;

  fs.writeFileSync(reportPath, htmlContent, 'utf8');
  console.log(`Report saved to: ${reportPath}`);
}

module.exports = {
  generateReport
};
