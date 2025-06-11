
import { SponsorshipProps } from './sponsorship-badge.props'
import {  BadgeRankingContainer, FisrtBadgePungCount, FisrtBadgeViewerName, FistBadgeRankingColumn, RemainBadgePungCount, RemainBadgeViewerName,  } from './sponsorship-badge.style'
import badge1 from '../../../../assets/sponsorship-badge1.svg'
import badge2 from '../../../../assets/sponsorship-badge2.svg'
import badge3 from '../../../../assets/sponsorship-badge3.svg'

const SponsorshipBadge = ({ rank }: SponsorshipProps) => {
  const getBadgeImage = () => {
    switch (rank) {
      case 1:
        return badge1
      case 2:
        return badge2
      case 3:
        return badge3
      default:
        return null
    }
  }
  const badgeImage = getBadgeImage()

  if (rank == 1) {
    return (
      <BadgeRankingContainer>
        {badgeImage && <img src={badgeImage} alt={`배지 ${rank}`} />}
        <FistBadgeRankingColumn>
          <FisrtBadgeViewerName>대듀	</FisrtBadgeViewerName>
          <FisrtBadgePungCount>💣 998000</FisrtBadgePungCount>
        </FistBadgeRankingColumn>
      </BadgeRankingContainer>
    )
  }


  return (
    <BadgeRankingContainer>
      {badgeImage && <img src={badgeImage} alt={`배지 ${rank}`} />}
      <RemainBadgeViewerName>대구에듀</RemainBadgeViewerName>
      <RemainBadgePungCount>💣 98000</RemainBadgePungCount>
    </BadgeRankingContainer>
  )
}

export default SponsorshipBadge
