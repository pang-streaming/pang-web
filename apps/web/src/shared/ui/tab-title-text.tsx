import styled from 'styled-components'

export const TabTitleText = ({children}: {children: string}) => {
  return (
    <Title>{children}</Title>
  )
}

const Title = styled.div`
  font-size: ${({theme}) => theme.font.xxxLarge};
  font-weight: bold;
  color: ${({theme}) => theme.colors.text.normal};
	align-items: center;
`