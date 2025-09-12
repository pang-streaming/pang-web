import styled from 'styled-components'

export const TabTitleText = ({children}: {children: string}) => {
  return (
    <Title>{children}</Title>
  )
}

const Title = styled.div`
    margin-bottom: 19px;
    font-size: ${({theme}) => theme.font.xxLarge};
    font-weight: 600;
    color: ${({theme}) => theme.colors.common.white};
`