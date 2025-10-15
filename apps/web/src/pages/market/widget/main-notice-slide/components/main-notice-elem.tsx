
import React from 'react'
import styled from 'styled-components';
import thumbnail from '@/app/assets/notice-thumbnail.png'


export interface MainNoticeElemProps {
    bgImage: string;
    title: string;
    subTitle: string;
}

export const MainNoticeElem = ({bgImage,title,subTitle,}:MainNoticeElemProps) => {
  return (
    <Container>
        <BackImage src={thumbnail  /* bgImage */} />
        <InfoSection>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
        </InfoSection>
    </Container>
  )
}

const Container = styled.div`
  width: 445px;
  height: 264px;
  border-radius: ${({theme}) => theme.borders.medium};
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0)
    );
  }
`;

const BackImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 27px;
  left: 24px;
  z-index: 1;
`;

const Title = styled.span`
  font-size: ${({theme}) => theme.font.large};
  font-weight: 700;
  color: white;
`;

const SubTitle = styled.span`
  font-size: ${({theme}) => theme.font.medium};
  font-weight: 400;
  margin-top: 4px;
  color: white;
`;