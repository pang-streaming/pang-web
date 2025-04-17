import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { Container, Content, GlobalStyle } from './layout.style';
import useSidebarStore from '../../stores/useSidebarStore';
import { LayoutProps } from './layout.props';

export const Layout = ({children}:LayoutProps) => {
    const {isClipped} = useSidebarStore()
    return (
        <>
            <GlobalStyle />
            <Container isClipped={isClipped}>
                <Sidebar/>
                <Header/>
                <Content>
                  {children}
                </Content>
            </Container>
        </>
    );
}
