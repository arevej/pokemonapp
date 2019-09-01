export function fetchForQuery(query: string): Promise<any> {
    const url = `https://pokemon-samdavies.stylindex.now.sh/?query=${encodeURIComponent(query)}`;

    return fetch(url)
        .then(res => res.json())
        .then(res => res.data);
}