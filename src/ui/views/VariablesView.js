import { icons } from "../components/icons.js";

export function renderVariablesView() {
  const container = document.createElement("div");
  container.className = "content-body";

  const variables = [
    { name: "API_BASE_URL", value: "https://api.example.com", env: "Production", updated: "8 min ago" },
    { name: "ORDER_LIMIT", value: "10000", env: "Production", updated: "1 hour ago" },
    { name: "TIMEOUT", value: "5000", env: "Development", updated: "Yesterday" },
    { name: "NOTIFICATION_CHANNEL", value: "#ops-alerts", env: "Staging", updated: "2 days ago" },
    { name: "RETRY_COUNT", value: "3", env: "Production", updated: "3 days ago" }
  ];

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Variables</h1>
        <p class="page-subtitle">Reusable values available across your workflows.</p>
      </div>

      <div style="display: flex; gap: 8px;">
        <select class="btn btn-outline" style="padding: 7px 12px; font-size: 13px;">
          <option>Production</option>
          <option>Staging</option>
          <option>Development</option>
        </select>
        <button class="btn btn-primary">+ New Variable</button>
      </div>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
      <div class="search-input-wrap">
        ${icons.search}
        <input type="text" class="search-input" placeholder="Search variables..." />
      </div>
      <span style="font-size: 12px; color: var(--text-muted); font-weight: 500;">5 variables</span>
    </div>

    <div class="data-card" style="margin-bottom: 24px;">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Environment</th>
            <th>Updated</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${variables.map(v => `
            <tr>
              <td style="font-family: var(--font-mono); font-weight: 600; color: var(--text-primary);">${v.name}</td>
              <td style="font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary);">${v.value}</td>
              <td><span class="env-badge">${v.env}</span></td>
              <td>${v.updated}</td>
              <td style="text-align: right;">
                <div class="row-actions" style="justify-content: flex-end;">
                  <button class="action-btn" title="Edit">${icons.edit}</button>
                  <button class="action-btn" title="Copy">${icons.copy}</button>
                  <button class="action-btn delete" title="Delete">${icons.trash}</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div class="callout-banner blue">
      <span>ℹ</span>
      <span>Variables are available with <code style="font-family: var(--font-mono); background: #e0f2fe; padding: 2px 6px; border-radius: 4px;">{{variables.NAME}}</code> in any workflow.</span>
    </div>
  `;

  return container;
}
