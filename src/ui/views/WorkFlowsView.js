import { icons } from "../components/icons.js";

export function renderWorkflowsView(workflowsData = null, callbacks = {}) {
  const container = document.createElement("div");
  container.className = "content-body";

  const defaultWorkflows = [
    {
      id: "wf_1",
      name: "Daily Order Monitor",
      desc: "Monitor high-value orders and notify the operations team.",
      status: "active",
      lastRun: "2 minutes ago",
      nextRun: "in 3 minutes",
      successRate: "94.8%",
      executions: "127 executions",
      updated: "8 min ago"
    },
    {
      id: "wf_2",
      name: "Customer Sync",
      desc: "Sync new customers to CRM and enrich profiles.",
      status: "active",
      lastRun: "18 minutes ago",
      nextRun: "in 42 minutes",
      successRate: "99.2%",
      executions: "842 executions",
      updated: "18 min ago"
    },
    {
      id: "wf_3",
      name: "Failed Payment Alert",
      desc: "Alert finance when a payment fails.",
      status: "failed",
      lastRun: "1 hour ago",
      nextRun: "Paused",
      successRate: "86.4%",
      executions: "56 executions",
      updated: "1 hour ago"
    },
    {
      id: "wf_4",
      name: "Weekly Sales Digest",
      desc: "Compile and email weekly revenue metrics.",
      status: "paused",
      lastRun: "Yesterday",
      nextRun: "Monday 09:00",
      successRate: "100%",
      executions: "24 executions",
      updated: "Yesterday"
    },
    {
      id: "wf_5",
      name: "Inventory Webhook",
      desc: "Process inventory updates from storefront.",
      status: "draft",
      lastRun: "Never",
      nextRun: "Not scheduled",
      successRate: "—",
      executions: "0 executions",
      updated: "2 days ago"
    }
  ];

  const list = workflowsData || defaultWorkflows;

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Workflows</h1>
        <p class="page-subtitle">Build, automate and monitor your API workflows.</p>
      </div>
      <button class="btn btn-outline" id="btn-import-wf">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
        Import Workflow
      </button>
    </div>

    <div class="filter-row">
      <div class="search-input-wrap">
        ${icons.search}
        <input type="text" class="search-input" id="wf-search" placeholder="Search workflows..." />
      </div>

      <div class="filter-tabs" id="wf-filter-tabs">
        <button class="tab-btn active" data-filter="all">All</button>
        <button class="tab-btn" data-filter="active">Active</button>
        <button class="tab-btn" data-filter="paused">Paused</button>
        <button class="tab-btn" data-filter="draft">Draft</button>
        <button class="tab-btn" data-filter="failed">Failed</button>
      </div>
    </div>

    <div class="data-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Last Run</th>
            <th>Next Run</th>
            <th>Success Rate</th>
            <th>Executions</th>
            <th>Updated</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody id="wf-table-body">
          ${list.map(wf => `
            <tr data-id="${wf.id}" data-status="${wf.status}">
              <td>
                <div class="row-primary-text">${wf.name}</div>
                <div class="row-secondary-text">${wf.desc}</div>
              </td>
              <td>
                <span class="badge-status status-${wf.status}">
                  <span class="status-dot"></span>
                  ${wf.status.charAt(0).toUpperCase() + wf.status.slice(1)}
                </span>
              </td>
              <td>${wf.lastRun}</td>
              <td>${wf.nextRun}</td>
              <td>${wf.successRate}</td>
              <td>${wf.executions}</td>
              <td>${wf.updated}</td>
              <td style="text-align: right;">
                <div class="row-actions" style="justify-content: flex-end;">
                  <button class="action-btn btn-run-wf" data-id="${wf.id}" title="Run Workflow">${icons.play}</button>
                  <button class="action-btn" title="Edit">${icons.edit}</button>
                  <button class="action-btn" title="Duplicate">${icons.copy}</button>
                  <button class="action-btn" title="Pause">${icons.pause}</button>
                  <button class="action-btn delete" title="Delete">${icons.trash}</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div class="floating-toast">
      ${icons.checkCircle}
      <span>Workflow saved</span>
    </div>
  `;

  // Search filter functionality
  const searchInput = container.querySelector("#wf-search");
  const tableRows = container.querySelectorAll("#wf-table-body tr");
  
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      tableRows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(term) ? "" : "none";
      });
    });
  }

  // Tab filter functionality
  const tabs = container.querySelectorAll("#wf-filter-tabs .tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.getAttribute("data-filter");
      tableRows.forEach(row => {
        const status = row.getAttribute("data-status");
        if (filter === "all" || status === filter) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });

  // Action button events
  container.querySelectorAll(".btn-run-wf").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      if (typeof callbacks.onRunWorkflow === "function") {
        callbacks.onRunWorkflow(id);
      }
    });
  });

  return container;
}
