import React, { useState } from "react";
import Select from "react-select";

const SearchRequest = ({ setRequests, allRequests,setSearchRequests,setIsExist}) => {
  const [searchValue, setSearchValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectOption = (e) => {
    setSearchValue(e);
    if (e === null) {
      setRequests(allRequests);
      setSearchRequests([]);
    }
  };

  const searchByOption = (event) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const searchKey = searchValue ? searchValue.value : null;
    const inputValue = event.target[0].value.toLowerCase(); // לשים לב להמיר לאותיות קטנות

    if (searchKey === "region") {
      const filteredRequests = allRequests.filter(request => request.region.toLowerCase() === inputValue);
      if(filteredRequests.length<0)
        setIsExist(true);
      setSearchRequests(filteredRequests);
    } else {
      setRequests(allRequests);
    }

    event.target.reset();
  };

  const searchRequestsOptions = [
    { value: 'region', label: 'איזור' }
  ];

  return (
    <>
      <Select
        placeholder="חיפוש בקשות לפי..."
        onChange={(e) => selectOption(e)}
        options={searchRequestsOptions}
        isClearable
        isLoading={loading}
        isSearchable={true}
      />
      {searchValue && (
        <form onSubmit={searchByOption}>
          <input name={searchValue.value} placeholder={searchValue.label} />
          <input type="submit" value="חפש" />
        </form>
      )}
    </>
  );
};

export default SearchRequest;
