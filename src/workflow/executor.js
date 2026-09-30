import { executeHttpStep,executeTransformStep,executeConditionStep } from "../blocks/http.js";

export function executeStep(step, context) {

    switch (step.type) {
        case "http":
            return executeHttpStep(step, context);

        case "transform":
            return executeTransformStep(step, context);

        case "condition":
            return executeConditionStep(step, context);

        default:
            throw new Error(`Unknown step: ${step.type}`);
    }
}