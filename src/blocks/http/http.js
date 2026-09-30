
export async function executeHttpStep(step) {
    const response = await fetch(step.config.url, {
        method: step.config.method
    });

    if (!response.ok) {
        const error = new Error('https', response.status);
        throw error;
    }

    return response.json();
}