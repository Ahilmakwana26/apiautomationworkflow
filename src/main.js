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

// Workflows list state
let workflows = [
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

// Mount the UI to #app
const appEl = document.getElementById("app");

// Temporary local tab state before router.js and store.js are implemented by you!
let currentTab = "workflows";

function updateUI() {
  renderApp(appEl, {
    currentTab,
    workflows,
    onNavigate: (tab) => {
      if (currentTab === tab) {
        return;
      }
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
    },
    onSaveWorkflow: ({ name, description }) => {
      const newWorkflow = {
        id: `wf_${Date.now()}`,
        name,
        desc: description || "No description provided.",
        status: "draft",
        lastRun: "Never",
        nextRun: "Not scheduled",
        successRate: "—",
        executions: "0 executions",
        updated: "Just now"
      };
      workflows.unshift(newWorkflow);
      currentTab = "workflows";
      updateUI();
      console.log("New workflow created:", newWorkflow);
    }
  });
}

// Initial render
updateUI();
