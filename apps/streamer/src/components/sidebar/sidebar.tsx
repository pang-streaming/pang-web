import { useNavigate, useLocation } from 'react-router-dom';
import { RiDashboardFill, RiLiveFill, RiMoneyDollarCircleFill, RiGroupFill, RiFileList2Fill } from 'react-icons/ri';
import { BaseSidebar, SidebarContainer, ItemIconAndText, ItemIconAndTextCliped } from './sidebar.style';
import { SidebarProps, SidebarExplorerItem } from './sidebar.props';

const SidebarItem = ({ icon, label, isClipped, to }: SidebarExplorerItem) => {
    const navigate = useNavigate();
    const location = useLocation();
    const ItemComponent = isClipped ? ItemIconAndTextCliped : ItemIconAndText;

    const handleClick = () => {
        if (to) {
            navigate(to);
        }
    };

    return (
        <ItemComponent isSelected={location.pathname === to} onClick={handleClick}>
            {icon}
            <span>{label}</span>
        </ItemComponent>
    );
};

export const Sidebar = ({ isClipped }: SidebarProps) => {
    const items = [
        {
            id: 'dashboard',
            icon: <RiDashboardFill />,
            label: '대시보드',
            isClipped,
            to: '/'
        },
        {
            id: 'streaming',
            icon: <RiLiveFill />,
            label: '스트리밍 관리',
            isClipped,
            to: '/streaming'
        },
        {
            id: 'revenue',
            icon: <RiMoneyDollarCircleFill />,
            label: '수익 관리',
            isClipped,
            to: '/revenue'
        },
        {
            id: 'community',
            icon: <RiGroupFill />,
            label: '팡커뮤',
            isClipped,
            to: '/community'
        },
        {
            id: 'content',
            icon: <RiFileList2Fill />,
            label: '콘텐츠 관리',
            isClipped,
            to: '/content'
        }
    ];

    return (
        <BaseSidebar isClipped={isClipped}>
            <SidebarContainer>
                {items.map((item) => (
                    <SidebarItem key={item.id} {...item} />
                ))}
            </SidebarContainer>
        </BaseSidebar>
    );
};
