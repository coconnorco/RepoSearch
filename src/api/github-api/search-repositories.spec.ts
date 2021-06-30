import * as fetch from '../fetch-json';
import {searchRepositories} from "./search-repositories";

jest.mock('../fetch-json', () => ({
    __esModule: true, // this property makes it work
    fetchJson: jest.fn(),
}));


describe('searchRepositories', () => {
    let mock;

    beforeEach(() => {
        mock = jest.spyOn(fetch, 'fetchJson');
    })

    test('sets the keyword', async () => {
        await searchRepositories({
            page: 1,
            keyword: 'test',
            sort: 'default',
            language: 'c'
        });
        expect(mock).toHaveBeenCalledWith(expect.stringMatching(/q=test/));
    })

    test('sets the language', async () => {
        await searchRepositories({
            page: 1,
            keyword: 'test',
            sort: 'default',
            language: 'c'
        });
        expect(mock).toHaveBeenCalledWith(expect.stringMatching(/%2Blanguage%3A%22c%22/));
    })

    test('sets the sort', async () => {
        await searchRepositories({
            page: 1,
            keyword: 'test',
            sort: 'stars',
            language: 'c'
        });
        expect(mock).toHaveBeenCalledWith(expect.stringMatching(/sort=stars/));
    })

    test('does not set a sort if the default sort is provided', async () => {
        await searchRepositories({
            page: 1,
            keyword: 'test',
            sort: 'default',
            language: 'c'
        });
        expect(mock).toHaveBeenCalledWith(expect.stringMatching(/((?!sort=default).)*/));
    })

    test('sets the page', async () => {
        await searchRepositories({
            page: 32,
            keyword: 'test',
            sort: 'default',
            language: 'c'
        });
        expect(mock).toHaveBeenCalledWith(expect.stringMatching(/page=32/));
    })
});
