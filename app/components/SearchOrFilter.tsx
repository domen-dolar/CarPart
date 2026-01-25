"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "next/form";

const SearchOrFilter = ({ query, sort }: { query?: string; sort?: string }) => {
    return (
        <Form
        action="/"
        scroll={false}
        className="searchOrFilterForm"
      >
        <div className="searchOrFilterSearch">
          <input
            name="query"
            defaultValue={query}
            placeholder="Search by product name or category"
            className="outline-none w-full"
            data-testid="search-input"
          />
        
          <button type="submit" className="button bg-white!">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        
        <div>
          <span className="text-light-gray">Sort by:</span>
          
          <select
            name="sort"
            defaultValue={sort ?? "name"}
            onChange={(e) => e.currentTarget.form?.requestSubmit()}
            className="searchOrFilterSelect"
            data-testid="sort-select"
          >
            <option value="name">Name (A–Z)</option>
            <option value="name_desc">Name (Z–A)</option>
            <option value="price_asc">Price (Low → High)</option>
            <option value="price_desc">Price (High → Low)</option>
          </select>
        </div>
      </Form>
    )
}
export default SearchOrFilter;