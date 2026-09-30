import { executeHttpStep} from "../blocks/http/http.js";
import { executeTransformStep } from "../blocks/transform/executeTransformStep.js";
import {executeConditionStep} from '../blocks/condition/executeConditionStep.js';

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