import { useEffect } from "react"
import useSidebarStore from "../../stores/useSidebarStore"
import logo from "../../assets/pang-emotion-logo.png"
import styled from "styled-components"


const Container = styled.div`
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    text-align: center;
`

const Title = styled.div`
    font-size: 24px;
    color: blue;
    font-weight: 700;
`


export const NotFound = () => {
    const {setSelected} = useSidebarStore()

    useEffect(() => {
        setSelected("not")
    }, [])
    
    return <Container>
        <img src={logo}/>
        <Title>
            존재하지 않는 채널입니다.
        </Title>
        <p>
            지금 입력하신 주소의 페이지는
            <br/>
            사라졌거나 다른 페이지로 변경되었습니다.
            <br/>
            주소를 다시 확인해주세요.
        </p>
    </Container>
}