import { icons } from "./icons.js";

export function renderHeader(currentTab = "workflows", onActionClick) {
  const header = document.createElement("header");
  header.className = "top-header";

  const tabLabels = {
    workflows: { name: "Workflows", btnLabel: "+ New workflow" },
    executions: { name: "Executions", btnLabel: "+ Run / Test" },
    templates: { name: "Templates", btnLabel: "+ New workflow" },
    variables: { name: "Variables", btnLabel: "+ New variable" },
    secrets: { name: "Secrets", btnLabel: "+ Add secret" },
    webhooks: { name: "Webhooks", btnLabel: "+ New webhook" },
    settings: { name: "Settings", btnLabel: "Save changes" }
  };

  const currentInfo = tabLabels[currentTab] || { name: currentTab, btnLabel: "+ Action" };

  header.innerHTML = `
    <div class="breadcrumbs">
      <span>Workspace</span>
      <span>›</span>
      <span class="crumb-current">${currentInfo.name}</span>
    </div>

    <div class="header-actions">
      <span class="status-save-text">Saved just now</span>
      <button class="icon-btn-header" title="Undo">${icons.undo}</button>
      <button class="icon-btn-header" title="Redo">${icons.redo}</button>
      <button class="btn btn-primary header-action-btn">${currentInfo.btnLabel}</button>
      <button class="icon-btn-header" title="More options">${icons.dots}</button>
    </div>
  `;

  const btn = header.querySelector(".header-action-btn");
  if (btn && typeof onActionClick === "function") {
    btn.addEventListener("click", () => onActionClick(currentTab));
  }

  return header;
}
