export async function executeHttpStep(step) {
    const response = await fetch(
        step.config.url,
        {
            method: step.config.method
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}