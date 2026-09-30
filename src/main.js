import { executeWorkflow } from "./workflow/engine.js";

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
                url: "http://192.168.31.81:8000/api/users"
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

        // {
        //     id: "step_003",
        //     type: "condition",
        //     name: "Has Users",

        //     config: {
        //         field: "length",
        //         operator: ">",
        //         value: 0
        //     }
        // }
    ]
};

async function start () {
 const response =  await executeWorkflow(workflow);
 console.log(response);
}

start();