import styled from "styled-components";


export const FollowingCardContainer = styled.div`
  width: 90px;
  height: 137px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`

export const ProfileImageContainer = styled.div`
  width: 90px;
  height: 90px;
  box-sizing: border-box;
  border-radius: 50%;
  margin-bottom: 5px;
  overflow: hidden;
  border: 3px solid transparent;
  background-image: linear-gradient(white, white), linear-gradient(to top, #6800FD, #FD0156);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;


export const StreamerName = styled.span`
  font-size: 15px;
  font-weight: 800;
  color: #A3A3A3;
  margin-bottom: 5px;
`

export const FollowerCount = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #A3A3A3;
`