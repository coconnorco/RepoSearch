import {useQuery} from "react-query";
import {fetchRepository, IRepository} from "../github-api/fetch-repository";

export const useFetchRepository = (id: string) => {
    return useQuery<IRepository>(['fetchRepo', id], () => fetchRepository(id), {enabled: !!id, staleTime: 120000, retry: false});
};
