"use client";

/*
  Komponenta za iskanje in filtriranje izdelkov na strani domače strani.
  Funkcionalnosti:
  - Vnosna polja za iskanje po imenu izdelka ali kategoriji.
  - Dropdown za sortiranje izdelkov po imenu ali ceni.
  - Ob spremembi dropdowna ali oddaji forme se izvede request na isto stran.
*/

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "next/form";

// Props:
// - query: trenutna vrednost iskalnega polja (string ali undefined)
// - sort: trenutna izbrana metoda sortiranja (string ali undefined)
const SearchOrFilter = ({ query, sort }: { query?: string; sort?: string }) => {
    return (
        <Form
        action="/"      // forma pošlje GET request na domačo stran
        scroll={false}  // prepreči scroll po submitu
        className="searchOrFilterForm"
      >
        {/* Polje za iskanje */}
        <div className="searchOrFilterSearch">
          <input
            name="query"
            defaultValue={query}  // privzeta vrednost iz URL parametra
            placeholder="Search by product name or category"
            className="outline-none w-full"
            data-testid="search-input"
          />
        
          <button type="submit" className="button bg-white!">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        
        {/* Dropdown za sortiranje */}
        <div>
          <span className="text-light-gray">Sort by:</span>
          
          <select
            name="sort"
            defaultValue={sort ?? "name"}   // privzeta vrednost, če ni podana
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