export const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Attempting to reach ${url} resulted in an error of type ${res.status}: ${msg}`)
    }
    return await res.json();
}
