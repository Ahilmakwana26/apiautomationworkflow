import { executeStep } from "./executor.js";

export async function executeWorkflow(workflow) {
    console.log(workflow);
    let context = null;
    for (let step of workflow.steps) {
        context = await executeStep(step, context);

    }
    return context;
}