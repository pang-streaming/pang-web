import React from "react";
import styled from "styled-components";
import thumbnail from "@/app/assets/thumbnail.png";
import mochi from '@/app/assets/mochi.png'


export interface PopularModelStoreElemProps {
  profileImage: string;
  bgImage: string;
  storeName: string;
  description: string;
}

export const PopularModelStoreElem = ({
  profileImage,
  bgImage,
  storeName,
  description,
}: PopularModelStoreElemProps) => {
  return (
    <Container>
      <BackImage src={mochi} />
      <ProfileImage src={thumbnail} />
      <InfoSection>
        <StoreName>{storeName}</StoreName>
        <Description>{description}</Description>
      </InfoSection>
    </Container>
  );
};
const Container = styled.div`
  width: 168px;
  height: 224px;
  background-color: ${({theme}) => theme.colors.content.normal};
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borders.large};
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const BackImage = styled.img`
  width: 100%;
  height: 45%;
  object-fit: cover;
`;

const ProfileImage = styled.img`
  position: absolute;
  top: calc(45% - 25px);
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borders.maximum};
  object-fit: cover;
  border: 2px solid white;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 40px;
`;

const StoreName = styled.span`
  font-size: ${({ theme }) => theme.font.medium};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const Description = styled.span`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.font.small};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.normal};
  text-align: center;
`;
