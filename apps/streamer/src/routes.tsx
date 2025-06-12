import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard';
import { StreamingPage } from './pages/streaming';
import { RevenuePage } from './pages/revenue';
import { CommunityPage } from './pages/community';
import { ContentPage } from './pages/content';

export const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/streaming" element={<StreamingPage />} />
            <Route path="/revenue" element={<RevenuePage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/content" element={<ContentPage />} />
        </Routes>
    );
};
