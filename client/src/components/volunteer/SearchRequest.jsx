import React, { useState } from "react";
import Select from "react-select";
const SearchRequest = ({ setRequests, allRequests, requests }) => {
    const [searchValue, setSearchValue] = useState()

    const selectOption = (e) => {
        setSearchValue(e)
        e === null && setRequests(allRequests)
    }

    const [loading, setLoading] = useState(false);


    const searchRequestsOptions = [
        { value: 'id', label: 'id' },
        { value: 'title', label: 'title' }]

    const searchByOption = (element) => {
        element.preventDefault();
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        let tempRequests = [];
        debugger
        switch (element.target[0].name) {
            case "id":
                tempPosts = allPosts.filter(post => (searchValue.label != '' ))
                break;
            case "title":
                tempPosts = allPosts.filter(post => (searchValue.label != '' ))
        }
        element.target.reset()
        setRequests(tempRequests)
    }
    return (<>
        <Select
            placeholder='search requests by...'
            onChange={(e) => selectOption(e)}
            options={searchRequestsOptions}
            isClearable
            isLoading={loading}
            isSearchable={true}
            getOptionLabel={(searchRequestsOptions) => searchRequestsOptions["label"]}
            getOptionValue={(searchRequestsOptions) => searchRequestsOptions["value"]} />
        {searchValue != null && <form onSubmit={searchByOption}>
            <input name={searchValue.label} placeholder={searchValue.label} />
            <input type="submit" value="search" />
        </form>}
    </>)
}
export default SearchRequest