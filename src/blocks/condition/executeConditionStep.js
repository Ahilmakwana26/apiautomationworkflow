


export function executeConditionStep(step, context) {

    let field = step.config.field;
    let operator = step.config.operator;
    let value = step.config.value;
    if (evaluateCondition(context,operator,value))
    {
        return true;
    }

    return null;
}

function evaluateCondition(left, operator, right) {

    switch (operator) {

        case "===":
            return left === right;

        case "!==":
            return left !== right;

        case ">":
            return left > right;

        case ">=":
            return left >= right;

        case "<":
            return left < right;

        case "<=":
            return left <= right;

        case "contains":
            return String(left).includes(String(right));

        default:
            throw new Error(`Unknown operator: ${operator}`);
    }
}