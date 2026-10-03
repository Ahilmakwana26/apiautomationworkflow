import { icons } from "./icons.js";

export function renderSidebar(currentTab = "workflows", onNavigate) {
  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";

  const navItems = [
    { id: "workflows", label: "Workflows", icon: icons.workflows },
    { id: "executions", label: "Executions", icon: icons.executions },
    { id: "templates", label: "Templates", icon: icons.templates },
    { id: "variables", label: "Variables", icon: icons.variables },
    { id: "secrets", label: "Secrets", icon: icons.secrets },
    { id: "webhooks", label: "Webhooks", icon: icons.webhooks },
    { id: "settings", label: "Settings", icon: icons.settings }
  ];

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <div class="brand-icon">
        ${icons.logo}
      </div>
      <span class="brand-name">FlowForge</span>
    </div>

    <nav class="sidebar-nav">
      ${navItems.map(item => `
        <a class="nav-link ${currentTab === item.id ? "active" : ""}" data-tab="${item.id}">
          ${item.icon}
          <span>${item.label}</span>
        </a>
      `).join("")}
    </nav>

    <div class="sidebar-footer">
      <div class="user-profile">
        <div class="user-avatar">AR</div>
        <div class="user-details">
          <span class="user-name">Acme Engineering</span>
          <span class="user-sub">Settings</span>
        </div>
      </div>
      <button class="sidebar-toggle-btn" title="Collapse sidebar">«</button>
    </div>
  `;

  sidebar.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = link.getAttribute("data-tab");
      if (typeof onNavigate === "function") {
        onNavigate(targetTab);
      }
    });
  });

  return sidebar;
}
