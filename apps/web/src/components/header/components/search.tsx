import { theme } from "@repo/ui/theme";
import { SearchInput, SearchView } from "./search.style"
import { IoIosSearch } from "react-icons/io";

export const SearchBar = () => {
    return (
        <SearchView>
            <SearchInput placeholder='검색어를 입력해주세요!'></SearchInput>
            <IoIosSearch size={22} color={theme.primary500}></IoIosSearch>
        </SearchView>
    )
}