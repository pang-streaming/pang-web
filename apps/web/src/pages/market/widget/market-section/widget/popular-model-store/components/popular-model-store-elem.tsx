import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Store } from "@/entities/store/type";

export const PopularModelStoreElem = ({
  id,
  name,
  description,
  profileImage,
  bannerImage,
}: Store) => {
  const navigate = useNavigate();

  const handleStore = () => {
    navigate(`/store-detail/${id}`);
  };

  return (
    <Container onClick={handleStore}>
      <BackImage src={bannerImage} />
      <ProfileImage src={profileImage} />
      <InfoSection>
        <StoreName>{name}</StoreName>
        <Description>{description}</Description>
      </InfoSection>
    </Container>
  );
};


const Container = styled.div`
  width: 168px;
  height: 224px;
  background-color: ${({ theme }) => theme.colors.content.normal};
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
width: 90%;
  margin-top: 10px;
  font-size: ${({ theme }) => theme.font.small};
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.normal};
  text-align: center;
`;
