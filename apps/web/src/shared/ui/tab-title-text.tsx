

import styled from 'styled-components'

export const TabTitleText = ({text}: {text: string}) => {
  return (
    <Title>{text}</Title>
  )
}

const Title = styled.div`
    margin-bottom: 19px;
    font-size: ${({theme}) => theme.font.xxLarge};
    font-weight: 600;
    color: ${({theme}) => theme.colors.common.white};
`