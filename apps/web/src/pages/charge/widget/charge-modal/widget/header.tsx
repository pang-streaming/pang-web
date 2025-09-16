import styled from "styled-components";


interface HeaderProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const Header = ({ children, onClose }: HeaderProps) => {
  return (
    <Container>
      <Title>{children}</Title>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 61px;
  border-bottom: 1px solid ${({theme}) => theme.colors.stroke.light};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 900;
  color: ${({theme})=>theme.colors.text.normal};
`;
const Icon = styled.img`
  position: absolute;
  right: 15px;
  top: 10px;
  cursor: pointer;
`;
