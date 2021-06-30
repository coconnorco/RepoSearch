import React from "react";
import {useParams} from 'react-router-dom';
import {useFetchRepository} from "../../api/hooks/use-fetch-repository";
import {StarBorder, Visibility} from "@material-ui/icons";
import {SkeletonVisibilityProvider} from "../../hooks/use-skeleton-visibility";
import DynamicSkeleton from "../../components/dynamic-skeleton";

const LanguageChips = ({data}) => {
    const classes = 'u-flex u-items-center u-type-overline u-rounded-full u-bg-gray-200 u-px-2'

    return !data
        ? Array(4).fill('').map((_, i) => <DynamicSkeleton variant='rect' key={i} classes={`${classes} !u-w-[80px] !u-h-[14px]`} />)
        : data?.languages?.map((x, i) => <span key={i} className={classes}>{x}</span>)
}

const Subscribers = ({subscribers}) => {
    return (
        <div className='u-flex u-items-center u-mr-4'>
            {
                subscribers != undefined ? (
                    <>
                        <Visibility className='u-mr-1' />
                        <span>{subscribers ?? 0}</span>
                    </>
                ) : (
                    <DynamicSkeleton classes='u-w-full u-w-[75px] u-h-[24px]' />
                )
            }
        </div>
    )
}

const Stars = ({stars}) => {
    return (
        <div className='u-flex u-items-center'>
            {
                stars != undefined ? (
                    <>
                        <StarBorder className='u-mr-1' />
                        <span>{ stars ?? 0 }</span>
                    </>
                ) : (
                    <DynamicSkeleton classes='u-w-full u-w-[75px] u-h-[24px]' />
                )
            }
        </div>
    )
}

export const DetailsPage = () => {
    let { id } = useParams<{id: string}>();
    const {status, data} = useFetchRepository(id);

    return (
        <SkeletonVisibilityProvider isLoading={status === 'loading'}>
            <div className='u-mt-16 u-bg-gray-100 u-px-8 u-pt-4 u-pb-4'>
                <div className='u-max-w-screen-xl u-mx-auto'>
                    <span className='u-inline-block u-type-caption u-mb-4'>{
                        data ? data.owner : <DynamicSkeleton classes='u-w-full u-h-[18px] u-w-[150px]' />
                    }</span>
                    <h1 className='u-type-h3 lg:u-type-h1 u-mb-2 u-break-words'>{
                        data ? data.name : <DynamicSkeleton classes='u-w-full' />
                    }</h1>
                    <div className='u-flex u-flex-row u-gap-2 u-justify-between u-gap-8 u-items-end'>
                        <div className='u-flex u-flex-wrap u-gap-1'>
                           <LanguageChips data={data} />
                        </div>
                        <div className='u-flex u-items-center'>
                            <Subscribers subscribers={data?.subscribers} />
                            <Stars stars={data?.stars} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='u-max-w-screen-xl u-mx-auto u-px-8 u-box-content'>
                <span className='u-block u-type-body-1 u-mt-12 u-text-left'>{data?.description}</span>
                {data?.url && <a className='u-inline-block u-type-body-2 u-text-blue-500 hover:u-border-b u-border-blue-500 u-mt-8' target='_blank' href={data?.url}>Explore</a>}

                {status === 'error' && <p className='u-type-body-1'>Oh no. Something went wrong. Please try again</p>}
            </div>
        </SkeletonVisibilityProvider>
    )
};
