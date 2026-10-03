import { icons } from "../components/icons.js";

export function renderExecutionsView(executionsData = null) {
  const container = document.createElement("div");
  container.className = "content-body";

  const defaultExecutions = [
    {
      id: "#128",
      workflow: "Daily Order Monitor",
      status: "success",
      started: "10:14 AM",
      duration: "1.82s",
      triggeredBy: "Schedule"
    },
    {
      id: "#127",
      workflow: "Daily Order Monitor",
      status: "failed",
      started: "10:09 AM",
      duration: "2.31s",
      triggeredBy: "Schedule"
    },
    {
      id: "#126",
      workflow: "Customer Sync",
      status: "success",
      started: "09:58 AM",
      duration: "4.08s",
      triggeredBy: "Webhook"
    },
    {
      id: "#125",
      workflow: "Inventory Webhook",
      status: "success",
      started: "Yesterday",
      duration: "842ms",
      triggeredBy: "Webhook"
    },
    {
      id: "#124",
      workflow: "Failed Payment Alert",
      status: "running",
      started: "Yesterday",
      duration: "1.14s",
      triggeredBy: "Manual"
    }
  ];

  const list = executionsData || defaultExecutions;

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Executions</h1>
        <p class="page-subtitle">Recent workflow runs and their results.</p>
      </div>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;">
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <select class="btn btn-outline" style="font-weight: 500; padding: 7px 12px; font-size: 13px;">
          <option>All workflows</option>
          <option>Daily Order Monitor</option>
          <option>Customer Sync</option>
        </select>

        <select class="btn btn-outline" style="font-weight: 500; padding: 7px 12px; font-size: 13px;">
          <option>All statuses</option>
          <option>Success</option>
          <option>Failed</option>
          <option>Running</option>
        </select>

        <select class="btn btn-outline" style="font-weight: 500; padding: 7px 12px; font-size: 13px;">
          <option>Last 7 days</option>
          <option>Today</option>
          <option>Last 30 days</option>
        </select>

        <select class="btn btn-outline" style="font-weight: 500; padding: 7px 12px; font-size: 13px;">
          <option>Any duration</option>
          <option>&lt; 1s</option>
          <option>&gt; 5s</option>
        </select>
      </div>

      <div class="search-input-wrap" style="max-width: 320px;">
        ${icons.search}
        <input type="text" class="search-input" placeholder="Search executions..." />
      </div>
    </div>

    <div class="data-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Execution ID</th>
            <th>Workflow</th>
            <th>Status</th>
            <th>Started</th>
            <th>Duration</th>
            <th>Triggered By</th>
            <th style="width: 40px;"></th>
          </tr>
        </thead>
        <tbody>
          ${list.map(ex => `
            <tr>
              <td style="font-weight: 600; font-family: var(--font-mono); color: var(--text-primary);">${ex.id}</td>
              <td style="font-weight: 500; color: var(--text-primary);">${ex.workflow}</td>
              <td>
                <span class="badge-status status-${ex.status}">
                  <span class="status-dot"></span>
                  ${ex.status.charAt(0).toUpperCase() + ex.status.slice(1)}
                </span>
              </td>
              <td>${ex.started}</td>
              <td style="font-family: var(--font-mono); font-size: 12px;">${ex.duration}</td>
              <td>${ex.triggeredBy}</td>
              <td style="text-align: right; color: var(--text-light);">${icons.chevronRight}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-top: 1px solid var(--border-light); font-size: 13px; color: var(--text-muted);">
        <span>1–5 of 128</span>
        <div style="display: flex; gap: 4px;">
          <button class="btn btn-outline" style="padding: 4px 8px;" disabled>‹</button>
          <button class="btn btn-outline" style="padding: 4px 8px;">›</button>
        </div>
      </div>
    </div>
  `;

  return container;
}
