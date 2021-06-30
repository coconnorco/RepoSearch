import React, {useEffect, useState} from "react";
import {RepositoryCard} from "./repository-card";
import {FilterPanel} from "./filter-panel";
import {useSearchRepositories} from "../../api/hooks/use-search-repositories";
import {useHistory, useLocation} from "react-router-dom";
import {SkeletonVisibilityProvider} from "../../hooks/use-skeleton-visibility";
import {ISearchQuery, PageSize, Sort as SortType} from "../../api/github-api/search-repositories";
import {Pagination} from "@material-ui/lab";
import DynamicSkeleton from "../../components/dynamic-skeleton";
import {QueryStatus} from "react-query/types/core/types";
import {InputLabel, MenuItem, Select} from "@material-ui/core";

const Sort = ({sort = 'default', sortUpdate}: {sort: SortType, sortUpdate: (sort: string) => void}) => {
    const [sortValue, setSortValue] = useState(sort);
    useEffect(() => setSortValue(sort), [sort]);

    return (
        <span className='u-flex u-items-center u-w-full u-justify-end'>
            <InputLabel className='u-type-subtitle-2 u-mr-2' id="sortBy">Sort By</InputLabel>
            <Select margin='dense' labelId='sortBy' variant='outlined' value={sortValue} onChange={(e) => sortUpdate(e.target.value as string)}>
                <MenuItem value='default'>Default</MenuItem>
                <MenuItem value='stars'>Stars</MenuItem>
            </Select>
        </span>
    )
};

const RepositoryCount = ({count = 0, dataStatus}: {count: number, dataStatus: QueryStatus}) => {
    return (
        <span className='u-type-subtitle-2 u-flex u-text-gray-500'>
            {dataStatus === 'loading'
                ? (
                    <DynamicSkeleton classes={'u-inline-block u-w-[95px] u-h-[24px]'} variant={'text'} />
                ) : (
                    <>
                        <span className='u-mr-1'>{(count || 0).toLocaleString()}</span> repos
                    </>
                )
            }
        </span>
    )
}

const ResultsContainer = ({children}) => <div className='u-grid u-grid-cols-1 md:u-grid-cols-2 u-gap-4'>{children}</div>

const Results = ({data, dataStatus, page, pageUpdate}: {data: any, dataStatus: QueryStatus, page: number, pageUpdate: (p: string|number) => void}) => {
    switch(dataStatus) {
        case 'error':
            return <p>Whoops. Looks like something went wrong. Please refresh the page and try again</p>;
        case 'loading':
            return (
                <ResultsContainer>
                    {Array(PageSize).fill(null).map((r, i) => (
                        <RepositoryCard key={i} repo={r} />
                    ))}
                </ResultsContainer>
            )
        case 'success':
            return !!data?.items?.length
                ? (
                    <>
                        <ResultsContainer>
                            {data.items.map(r => (
                                <RepositoryCard key={r.id} repo={{
                                    id: r.id,
                                    language: r.language,
                                    description: r.description,
                                    name: r.name,
                                    stars: r.stargazers_count
                                }} />
                            ))}
                        </ResultsContainer>
                        <Pagination page={page} onChange={(_, p) => pageUpdate(p)} className='u-flex u-justify-end u-mt-8 u-mb-20' count={Math.ceil(data.total_count / PageSize)} />
                    </>
                ) : (
                    <div>
                        <p className='u-type-body-1 u-text-center u-mt-4 lg:u-mt-12'>No matching repositories found.</p>
                    </div>
                )
        default:
            return <></>
    }
}


export const SearchPage = () => {
    const history = useHistory();
    const {search} = useLocation();
    const [searchQuery, setSearchQuery] = useState<ISearchQuery>({keyword: new URLSearchParams(search).get('query') || '', sort: 'default', language: '', page: 1});
    const {data, status} = useSearchRepositories(searchQuery);

    const updateSearchQuery = (key: keyof ISearchQuery) => (value) => {
        setSearchQuery(r => ({
            ...r,
            [key]: value
        }));
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [searchQuery.page])

    useEffect(() => {
        history.replace(`/search?query=${searchQuery.keyword}`)
    }, [searchQuery.keyword])

    return (
        <SkeletonVisibilityProvider isLoading={status === 'loading'}>
            <div className='u-mt-28 u-flex u-flex-col lg:u-flex-row u-gap-4 lg:u-gap-8 u-max-w-screen-xl u-justify-center u-mx-auto u-px-8'>
                <FilterPanel languageUpdate={updateSearchQuery('language')} searchQuery={searchQuery} keywordUpdate={updateSearchQuery('keyword')} />
                <div className='u-w-full'>
                    <div className='u-flex u-items-center u-mb-4'>
                        <RepositoryCount count={data?.total_count ?? 0} dataStatus={status} />
                        <Sort sort={searchQuery.sort} sortUpdate={updateSearchQuery('sort')} />
                    </div>
                    <Results data={data} dataStatus={status} page={searchQuery.page} pageUpdate={updateSearchQuery('page')} />
                </div>
            </div>
        </SkeletonVisibilityProvider>
    )
};
