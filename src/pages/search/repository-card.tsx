import {StarBorder} from "@material-ui/icons";
import {Link} from 'react-router-dom';
import {Skeleton} from '@material-ui/lab';
import React from "react";

interface ISearchPageRepo {
    id: number
    name: string
    stars: number
    language: string
    description: string
}

export const RepositoryCard = ({repo}: {repo: ISearchPageRepo}) => {
    if (!repo) {
        return (
            <Skeleton width='100%' height={146} variant='rect'  />
        )
    }

    const {id, name, description, stars, language} = repo;

    return (
        <Link style={{minHeight: '146px'}} to={`/repo/${id}`} className='u-flex u-flex-col u-shadow-sm u-border u-border-gray-200 u-rounded-md u-h-full u-p-4 hover:u-border-gray-400'>
            <span className='u-type-h5'>{name}</span>
            <p className='u-type-caption u-block u-mb-4 u-line-clamp-2'>{description}</p>
            <div className='u-flex u-justify-items-start u-mt-auto'>
                {language && <span className='u-flex u-items-center u-type-overline u-rounded-full u-bg-gray-200 u-px-2 u-mr-2'>{language}</span>}
                <div className='u-flex u-items-center'>
                    <StarBorder />
                    <span className='u-type-body-2'>{stars ?? 0}</span>
                </div>
            </div>
        </Link>
    )
};
