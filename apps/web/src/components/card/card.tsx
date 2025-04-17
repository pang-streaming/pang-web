import { CardContainer, CardInfo, CardVideo, InfoContainer, ProfileIcon, StreamerName, Title } from "./card.style";
import { CardProps } from "./card.props";

export const Card = ({title, streamerName}:CardProps) => {
    return (
        <CardContainer>
          <CardVideo />
            <CardInfo>
              <ProfileIcon />
              <InfoContainer>
                <Title>{title}</Title>
                <StreamerName>{streamerName}</StreamerName>
            </InfoContainer>
          </CardInfo>
        </CardContainer>
    );
};


