import {useQuery} from "react-query";
import {ISearchQuery, ISearchResults, searchRepositories} from "../github-api/search-repositories";

export const useSearchRepositories = (query: ISearchQuery) => {
    return useQuery<ISearchResults>( ['searchRepos', query], () => searchRepositories(query), {retry: false, enabled: !!query.keyword, staleTime: 300000});
};
