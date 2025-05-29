import styled from "styled-components";
import { MainLiveProps } from "./mainlivecard.props";

export const MainLiveContainer = styled.div<Pick<MainLiveProps, 'thumbnail'>>`
    width: 97%;
    height: 340px;
    background-image: url(${(props) => props.thumbnail});
    background-size: cover;
    background-position: center;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    padding: 12px;
    margin-bottom: 60px;
`



export const LiveStatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-bottom: 12px;
`
export const LiveChip = styled.div`
  width: 60px;
  height: 25px;
  background-color: #6600FF;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`
export const LiveChipText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: white;
`
export const ViewCount = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #6600FF;
`




export const StreamInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`





export const BadgeStatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`
export const MainStreamerName = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: white;
`

export const FollowCount = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #737373;
`
export const CheckBadge = styled.img`
  width: 20px;
  height: 20px;
  margin-top: 3px;
`






export const CategoryText = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: white;
`
