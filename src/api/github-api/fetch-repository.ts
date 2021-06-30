import {fetchJson} from "../fetch-json";

export interface IRepository {
    id: number
    name: string
    stars: number
    subscribers: number
    languages: string[]
    description: string
    owner: string
    url: string
}


const fetchLanguages = async (url) => Object.keys(await fetchJson(url) || {});

export const fetchRepository = async (id: string): Promise<IRepository> => {
    const url = `https://api.github.com/repositories/${id}`;
    const repo = await fetchJson(url);

    const [languages] = await Promise.all([
        await fetchLanguages(repo.languages_url)
    ]);

    return {
        id: repo.id,
        name: repo.name,
        stars: repo.stargazers_count,
        subscribers: repo.subscribers_count,
        owner: repo.owner.login,
        description: repo.description,
        url: `https://github.com/${repo.full_name}`,
        languages
    }
};
