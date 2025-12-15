"use client";

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "next/form";

const SearchOrFilter = ({ query, sort }: { query?: string; sort?: string }) => {
    return (
        <Form
        action="/"
        scroll={false}
        className="w-full flex flex-row justify-between text-lg"
      >
        <div className="bg-white rounded-sm px-2 flex flex-row w-1/3">
          <input
            name="query"
            defaultValue={query}
            placeholder="Search by product name or category"
            className="outline-none w-full"
          />
        
          <button type="submit" className="button bg-white!">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        
        <div>
          Sort by:
          <select
            name="sort"
            defaultValue={sort ?? "name"}
            onChange={(e) => e.currentTarget.form?.requestSubmit()}
            className="outline-none border px-2 p-2 ml-2 rounded-sm bg-white"
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