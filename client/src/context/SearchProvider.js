import { createContext, useState} from "react";


export const SearchContext = createContext(null);

const SearchProvider = ({ children }) => {
    const [ values, setValues ] = useState({ keyword: '', results: [] });

    return (
        <SearchContext.Provider value={{ 
           values,
           setValues
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchProvider;