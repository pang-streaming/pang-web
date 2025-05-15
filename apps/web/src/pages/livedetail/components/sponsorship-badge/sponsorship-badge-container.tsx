import { Spacer } from "../../livedetail.style";
import SponsorshipBadge from "./sponsorship-badge";
import { BadgeContainer, RemainBadgeColumn } from "./sponsorship-badge.style";


export const SponsorshipBadgeContainer = () => {
    return(
        <BadgeContainer>
            <div style={{marginLeft: 33}}>
                <SponsorshipBadge rank={1}/>
            </div>
            <RemainBadgeColumn>
                <SponsorshipBadge rank={2}/>
                <SponsorshipBadge rank={3}/>
            </RemainBadgeColumn>
        </BadgeContainer>
    );
}
