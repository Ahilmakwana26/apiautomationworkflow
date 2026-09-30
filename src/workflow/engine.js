import { executeStep } from "./executor.js";

const workflow = {
    id: "workflow_001",

    name: "Get Users",

    steps: [
        {
            id: "step_001",
            type: "http",
            name: "Get Users",

            config: {
                method: "GET",
                url: "https://example.com/users"
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
        },

        {
            id: "step_003",
            type: "condition",
            name: "Has Users",

            config: {
                field: "length",
                operator: ">",
                value: 0
            }
        }
    ],
    name: {
        n: 233
    }
};

async function executeWorkflow(workflow) {
    let context = null;
    for (let step of workflow.steps) {
        context = await executeStep(step, context);

    }

    return context;
}