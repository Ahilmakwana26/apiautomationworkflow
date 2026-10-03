import { icons } from "../components/icons.js";

export function renderSecretsView() {
  const container = document.createElement("div");
  container.className = "content-body";

  const secrets = [
    { name: "API_TOKEN", masked: "••••••••••••••••", rotated: "12 days ago", usedBy: "4 workflows" },
    { name: "SLACK_WEBHOOK", masked: "••••••••••••••••", rotated: "28 days ago", usedBy: "2 workflows" },
    { name: "DATABASE_PASSWORD", masked: "••••••••••••••••", rotated: "3 days ago", usedBy: "1 workflow" }
  ];

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Secrets</h1>
        <p class="page-subtitle">Secure credentials used by your workflows.</p>
      </div>

      <div style="display: flex; gap: 8px;">
        <select class="btn btn-outline" style="padding: 7px 12px; font-size: 13px;">
          <option>Production</option>
          <option>Staging</option>
          <option>Development</option>
        </select>
        <button class="btn btn-primary">+ Add secret</button>
      </div>
    </div>

    <div class="callout-banner">
      <span>🛡</span>
      <span>Secret values are encrypted at rest and never shown after creation.</span>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <div class="search-input-wrap">
        ${icons.search}
        <input type="text" class="search-input" placeholder="Search secrets..." />
      </div>
      <button class="btn btn-primary">+ Add Secret</button>
    </div>

    <div class="data-card" style="margin-bottom: 24px;">
      <table class="data-table">
        <thead>
          <tr>
            <th>Secret</th>
            <th>Value</th>
            <th>Last Rotated</th>
            <th>Used By</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${secrets.map(s => `
            <tr>
              <td style="font-family: var(--font-mono); font-weight: 600; color: var(--text-primary);">${s.name}</td>
              <td style="font-family: var(--font-mono); letter-spacing: 2px; color: var(--text-muted);">${s.masked}</td>
              <td>${s.rotated}</td>
              <td>${s.usedBy}</td>
              <td style="text-align: right;">
                <div class="row-actions" style="justify-content: flex-end;">
                  <button class="action-btn" title="View details">${icons.eye}</button>
                  <button class="btn btn-outline" style="padding: 4px 8px; font-size: 11px;">Rotate</button>
                  <button class="btn btn-outline" style="padding: 4px 8px; font-size: 11px; color: var(--danger); border-color: transparent;">Delete</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div style="font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
      <span>⚡</span>
      <span>Last activity: <strong>API_TOKEN</strong> rotated by A. Rivera 12 days ago</span>
    </div>
  `;

  return container;
}
