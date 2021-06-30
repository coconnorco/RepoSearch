import React, {useEffect, useState} from "react";
import {InputAdornment, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {useDebouncedEffect} from "../../hooks/use-debounced-effect";
import {Search as SearchIcon} from "@material-ui/icons";
import {ISearchQuery} from "../../api/github-api/search-repositories";

interface IFilterPanelProps {
    searchQuery: ISearchQuery
    keywordUpdate: (keyword: string) => void
    languageUpdate: (language: string) => void
}

const languages = [
    'Javascript',
    'Python',
    'Java',
    'Go',
    'Typescript',
    'Vue',
    'Elixir',
    'C',
];

const KeywordSearch = ({keyword = '', keywordUpdate}) => {
    const [keywordValue, setKeywordValue] = useState(keyword);
    useDebouncedEffect(() => keywordUpdate(keywordValue), [keywordValue], 450);
    useEffect(() => setKeywordValue(keyword), [keyword]);

    return (
        <TextField label='Repository Name' variant='outlined' value={keywordValue} onChange={(e) => setKeywordValue(e.target.value)} placeholder='Repository Name' InputProps={{
            className: ``,
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            )
        }} />
    )
};

const LanguageFilter = ({language, languages, languageUpdate}) => {
    return (
        <div className='u-w-full'>
            <InputLabel className='u-relative u-type-subtitle-2 u--mt-5 lg:u-mt-8 u-mb-1' id="languageFilter">Code Language</InputLabel>
            <Select fullWidth={true} displayEmpty={true} labelId='languageFilter' variant='outlined' value={language} onChange={(e) => languageUpdate(e.target.value as string)}>
                <MenuItem value={''}>All Languages</MenuItem>
                {languages.map(l => <MenuItem  key={l} value={l}>{l}</MenuItem >)}
            </Select>
        </div>
    )
}

export const FilterPanel = ({searchQuery, keywordUpdate, languageUpdate}: IFilterPanelProps) => {
    return (
        <div className='lg:u-w-1/4 u-gap-4 u-grid u-grid-cols-2 lg:u-flex lg:u-flex-col lg:u-mt-14 lg:u-gap-0'>
            <KeywordSearch keyword={searchQuery.keyword} keywordUpdate={keywordUpdate} />
            <LanguageFilter language={searchQuery.language} languages={languages} languageUpdate={languageUpdate} />
        </div>
    )
};