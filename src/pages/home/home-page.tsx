import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";
import { useHistory } from "react-router-dom";


export const HomePage = () => {
    const history = useHistory();
    const [keyword, setKeyword] = useState('');

    const onSearch = () => {
        history.push(`/search?query=${keyword}`);
    }

    return (
        <div className='u-mx-auto u-h-full u-bg-gray-50 u-h-screen'>
            <div className='u-px-8 u-pt-12 u-pb-8 u-pt-24 lg:u-pt-32'>
                <h2 className='u-flex u-flex-wrap u-type-h5 lg:u-type-h2 u-mb-6 lg:u-mb-12 u-text-center u-flex u-justify-center'>
                    <span>Find Github repos with</span>
                    <span className='u-font-roboto-medium'>&nbsp;RepoSearch&nbsp;</span>
                </h2>
                <form className='u-flex u-items-center u-justify-center' onSubmit={onSearch}>
                    <TextField fullWidth={false} variant='outlined' value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='Repository Name'>
                    </TextField>
                    <div className='u-ml-8'>
                        <Button type='submit' size='medium' variant="contained">Search</Button>
                    </div>
                </form>
            </div>
        </div>
    )
};
