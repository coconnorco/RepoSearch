import {fetchJson} from "../fetch-json";

export interface ISearchResults {
    total_count: number
    items: ISearchResultsRepo[]
}

export interface ISearchResultsRepo {
    id: number
    name: string
    stargazers_count: number
    language: string
    description: string
}

export type Sort = 'default' | 'stars'

export interface ISearchQuery {
    keyword?: string
    language?: string
    sort: Sort
    page: number
}


export const PageSize = 30;

const buildQuery = ({keyword, language}) => {
    let qsQuery = keyword;
    if (language) {
        qsQuery += `+language:"${language}"`;
    }
    return {q: qsQuery};
};

const buildSort = (sort) => {
    return sort && sort !== 'default' ? {sort: sort} : {};
}

const buildPage = (page) => ({page: page || 1});

const buildQueryString = ({keyword, sort, language, page}: ISearchQuery) => new URLSearchParams({
    ...buildQuery({keyword, language}),
    ...buildSort(sort),
    ...buildPage(page)
});

export const searchRepositories = async (query: ISearchQuery) => {
    const url = `https://api.github.com/search/repositories?${buildQueryString(query).toString()}`;
    return await fetchJson(url);
};