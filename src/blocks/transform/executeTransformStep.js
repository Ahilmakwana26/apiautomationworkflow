

export function executeTransformStep(step, context) {
    const operation = step.config.operation;
    const expression = step.config.expression;
    switch (operation) {
        case "map":
            return Tranform_map(expression, context);

        case "foreach":
            return Tranform_each(expression, context);

        default:
            throw new Error(`Unknown step: ${step.type}`);

    }

}

function Tranform_map(expression, context) {
    let input = context.data
    let data = input.map((data) => {
       return data.name
    });
    
    return data
}

function Tranform_each() {

}