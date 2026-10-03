import "./style.css";
import { executeWorkflow } from "./workflow/engine.js";
import { renderApp } from "./ui/app.js";

// Test workflow from earlier
const testWorkflow = {
  id: "workflow_001",
  name: "Get Users",
  steps: [
    {
      id: "step_001",
      type: "http",
      name: "Get Users",
      config: {
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/users"
      }
    },
    {
      id: "step_002",
      type: "transform",
      name: "Extract Names",
      config: {
        operation: "map",
        expression: "user.name"
      }
    }
  ]
};

// Mount the UI to #app
const appEl = document.getElementById("app");

// Temporary local tab state before router.js and store.js are implemented by you!
let currentTab = "workflows";

function updateUI() {
  renderApp(appEl, {
    currentTab,
    onNavigate: (tab) => {
      console.log(`Navigating to: ${tab}`);
      currentTab = tab;
      updateUI();
    },
    onRunWorkflow: async (wfId) => {
      console.log(`Executing workflow ${wfId}...`);
      try {
        const result = await executeWorkflow(testWorkflow);
        console.log("Workflow execution result:", result);
        alert(`Workflow executed successfully! Check console for output.`);
      } catch (err) {
        console.error("Execution error:", err);
        alert(`Workflow execution failed: ${err.message}`);
      }
    }
  });
}

// Initial render
updateUI();