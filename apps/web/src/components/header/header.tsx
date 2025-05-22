import { SearchBar } from "./components/search";
import { SmallButton } from "@repo/ui/buttons";
import { BaseHeader } from "./header.style";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    return (
        <BaseHeader>
            <SearchBar />
            <SmallButton label="로그인" onClick={() => navigate("/login")} />
        </BaseHeader>
    );
};