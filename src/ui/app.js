import { renderSidebar } from "./components/sidebar.js";
import { renderHeader } from "./components/header.js";
import { renderWorkflowsView } from "./views/workflowsView.js";
import { renderExecutionsView } from "./views/executionsView.js";
import { renderTemplatesView } from "./views/templatesView.js";
import { renderVariablesView } from "./views/variablesView.js";
import { renderSecretsView } from "./views/secretsView.js";
import { openCreateWorkflowModal } from "./components/createWorkflowModal.js";

/**
 * Main App UI Shell renderer.
 * 
 * @param {HTMLElement} mountEl - Container to render into (e.g., #app)
 * @param {Object} options
 * @param {string} options.currentTab - 'workflows' | 'executions' | 'templates' | 'variables' | 'secrets'
 * @param {Array} [options.workflows] - Optional list of workflows to display
 * @param {Function} options.onNavigate - Callback when a navigation link is clicked: (tab) => void
 * @param {Function} options.onRunWorkflow - Callback when Run is clicked on a workflow
 * @param {Function} [options.onSaveWorkflow] - Callback when a new workflow is created: ({ name, description }) => void
 */
export function renderApp(mountEl, { currentTab = "workflows", workflows = null, onNavigate, onRunWorkflow, onSaveWorkflow } = {}) {
  mountEl.innerHTML = "";

  const layout = document.createElement("div");
  layout.className = "app-layout";

  // 1. Sidebar Component
  const sidebar = renderSidebar(currentTab, (tab) => {
    if (typeof onNavigate === "function") {
      onNavigate(tab);
    }
  });
  layout.appendChild(sidebar);

  // 2. Main Wrapper (Header + Active View)
  const mainWrapper = document.createElement("div");
  mainWrapper.className = "main-wrapper";

  // Top Header
  const header = renderHeader(currentTab, (actionTab) => {
    if (actionTab === "workflows" || actionTab === "templates") {
      openCreateWorkflowModal({
        onSave: (data) => {
          if (typeof onSaveWorkflow === "function") {
            onSaveWorkflow(data);
          }
        }
      });
    } else {
      console.log(`Action triggered for tab: ${actionTab}`);
    }
  });
  mainWrapper.appendChild(header);

  // Dynamic View according to currentTab
  let activeView;
  switch (currentTab) {
    case "workflows":
      activeView = renderWorkflowsView(workflows, { 
        onRunWorkflow,
        onNewWorkflow: () => {
          openCreateWorkflowModal({
            onSave: (data) => {
              if (typeof onSaveWorkflow === "function") {
                onSaveWorkflow(data);
              }
            }
          });
        }
      });
      break;
    case "executions":
      activeView = renderExecutionsView();
      break;
    case "templates":
      activeView = renderTemplatesView();
      break;
    case "variables":
      activeView = renderVariablesView();
      break;
    case "secrets":
      activeView = renderSecretsView();
      break;
    default:
      activeView = renderWorkflowsView(workflows, { onRunWorkflow });
      break;
  }
  mainWrapper.appendChild(activeView);
  layout.appendChild(mainWrapper);
  mountEl.appendChild(layout);
}

