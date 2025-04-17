import { Card } from "../../components/card/card"
import { GridContainer } from "./main.style"

export const Main = () => {
    return <GridContainer>
        <Card title="테스트" streamerName="테스트1"/>
        <Card title="테스트" streamerName="테스트1"/>
        <Card title="테스트" streamerName="테스트1"/>
        <Card title="테스트" streamerName="테스트1"/>
    </GridContainer>
}