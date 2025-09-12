import styled from "styled-components";



export const MyTitle = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: white;
  margin-left: 10px;
  margin-bottom: 15px;
`;
export const MypageContainer = styled.div`
  width: 90%;
  min-width: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 36px;
  margin: 0 auto;
`;

export const MyElementsContainer = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 35px;
  border-radius: 20px;
  background-color: #1f1f1f;
  padding: 20px 40px;

  @media (max-width: 768px) {
    gap: 20px;
    padding: 15px;
  }
`;
export const MyProfileContainer = styled.div`
  width: 100%;
  max-width: 1022px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const MyPungContainer = styled.div`
  width: 100%;
  max-width: 1022px;
  display: flex;
  align-items: center;
  border: 1px solid #a3a3a3;
  border-radius: 8px;
  padding: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 6px;
  }
`;
export const MyProfileImage = styled.div`
  width: 90px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 70px;
  }
`;

export const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(to top, #6800fd, #fd0156);
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;


export const MyProfileInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const MyProfileName = styled.span`
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 22px; /* 91.667% */
  color: #fff;
`;
export const MyProfileId = styled.span`
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 146.667% */
  color: #737373;
`;
export const MyProfileMessage = styled.span`
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px; /* 146.667% */
  color: #e5e5e5;
`;


export const MyPungText = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  color: #fff;
  margin-left: 20px;
  display: flex;
  align-items: center;

  span {
    font-size: 20px;
    margin-left: 5px;
    color: #f05;
    font-weight: 700;
  }
`;

export const MyPageSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
`;

export const MyPageSections = styled.section`
  width: 100%;
  padding: 18px 0;
  border-bottom: 1px solid #525252;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.125rem; /* 18px */
  font-weight: 500;
  cursor: pointer;

  svg {
    color: #999;
    font-size: 1.5rem; /* 25px */
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    svg {
      font-size: 1.25rem;
    }
  }
`;