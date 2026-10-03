import { icons } from "../components/icons.js";

export function renderTemplatesView() {
  const container = document.createElement("div");
  container.className = "content-body";

  const templates = [
    {
      title: "Monitor High Value Orders",
      desc: "Monitor orders over a threshold and notify your team",
      badge: "Popular",
      steps: ["GET orders", "Filter", "Notify"],
      time: "5 min setup"
    },
    {
      title: "Daily Sales Report",
      desc: "Compile revenue metrics every morning",
      badge: "5 min setup",
      steps: ["GET sales", "Transform", "Save Result"],
      time: "5 min setup"
    },
    {
      title: "API Health Monitor",
      desc: "Check endpoint health and alert on failures",
      badge: "5 min setup",
      steps: ["HTTP Request", "Condition", "Alert"],
      time: "5 min setup"
    },
    {
      title: "Webhook Processor",
      desc: "Normalize incoming storefront events",
      badge: "5 min setup",
      steps: ["Webhook", "Transform", "HTTP Request"],
      time: "5 min setup"
    }
  ];

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Workflow Templates</h1>
        <p class="page-subtitle">Start with a ready-made automation.</p>
      </div>

      <div class="search-input-wrap" style="max-width: 320px;">
        ${icons.search}
        <input type="text" class="search-input" placeholder="Search templates..." />
      </div>
    </div>

    <div class="filter-tabs" style="margin-bottom: 24px;">
      <button class="tab-btn active">API</button>
      <button class="tab-btn">Notifications</button>
      <button class="tab-btn">Data Processing</button>
      <button class="tab-btn">Monitoring</button>
      <button class="tab-btn">Integrations</button>
    </div>

    <div class="templates-grid">
      ${templates.map(tmpl => `
        <div class="template-card">
          <div class="template-card-header">
            <div class="template-icon-wrap">
              ${icons.templates}
            </div>
            <span class="badge-pill">${tmpl.badge}</span>
          </div>

          <div>
            <h3 style="font-size: 15px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">${tmpl.title}</h3>
            <p style="font-size: 13px; color: var(--text-muted);">${tmpl.desc}</p>
          </div>

          <div class="template-steps">
            ${tmpl.steps.map((st, i) => `
              <span class="step-pill">${st}</span>
              ${i < tmpl.steps.length - 1 ? `<span class="step-arrow">→</span>` : ""}
            `).join("")}
          </div>

          <div class="template-footer">
            <span style="font-size: 12px; color: var(--text-muted);">${tmpl.time}</span>
            <button class="btn btn-primary" style="padding: 6px 12px; font-size: 12px;">
              Use Template →
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  return container;
}
