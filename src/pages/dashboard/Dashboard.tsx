import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Contexts
import { useUser } from '../../contexts/UserContext';

// Components
import DashboardHeader from './components/DashboardHeader';
import DashboardNav from './components/DashboardNav';
import DashboardContent from './components/DashboardContent';
import GlobalOnboardingDialog from './components/GlobalOnboardingDialog';

// Dashboard component
export default function Dashboard() {
    const { t } = useTranslation();
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState('dashhome');
    const [searchParams, setSearchParams] = useSearchParams();
    const [showOnboarding, setShowOnboarding] = useState(false);

    // Redirect to authentication page if the user is not logged in
    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/auth');
        }
    }, [user, isLoading, navigate]);

    // Effect to determine if onboarding should be displayed
    useEffect(() => {
        if (user && (!user.onboarding || !user.onboarding.completed)) {
            // Do not show onboarding if we are in the analytics section
            if (activeSection !== 'analytics') {
                setShowOnboarding(true);
                // Ensure that the section dialog is not shown while onboarding is active
                const section = searchParams.get('section');
                if (section) {
                    setSearchParams({});
                }
                setActiveSection('dashhome');
            }
        }
    }, [user, searchParams, setSearchParams, activeSection]);

    // Effect to retrieve the section from search parameters
    useEffect(() => {
        const section = searchParams.get('section');
        if (section) {
            setActiveSection(section);
        } else {
            setActiveSection('dashhome'); // Default section
        }
    }, [searchParams]);

    // Handle menu item click to change the active section
    const handleMenuItemClick = (sectionKey: string) => {
        setActiveSection(sectionKey);
        setSearchParams(sectionKey === 'dashhome' ? {} : { section: sectionKey });
    };

    // Handle closing of the onboarding dialog
    const handleOnboardingClose = () => {
        // Clear onboarding progress from local storage and close the dialog
        localStorage.removeItem('onboarding_progress');
        setShowOnboarding(false);
    };

    // Show loading state while data is being fetched
    if (isLoading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default'
            }}>
                <Box
                    component="img"
                    src="https://res.cloudinary.com/dnhlagojg/image/upload/v1726670794/AppPhotos/Brand/logoPL.svg"
                    alt="logo"
                    sx={{
                        width: 200,
                        userSelect: 'none'
                    }}
                />
            </Box>
        );
    }

    const menuItems = [
        { label: t('dashboard.dashhome.title'), icon: 'home', key: 'dashhome' },
        { label: t('dashboard.annualReport.title'), icon: 'bar_chart_4_bars', key: 'annualReport' },
        { label: t('dashboard.transactions.title'), icon: 'receipt_long', key: 'transactions' },
        { label: t('dashboard.accounts.title'), icon: 'account_balance', key: 'accounts' },
        // { label: 'Goals', icon: 'task_alt', key: 'goals' },
        { label: t('dashboard.notes.title'), icon: 'note_alt', key: 'notes' },
        { label: t('dashboard.analytics.title'), icon: 'analytics', key: 'analytics', adminOnly: true },
        { label: t('dashboard.notifications.title'), icon: 'notifications', key: 'notifications', adminOnly: true }
    ];

    // Main container for the dashboard layout
    return (
        <>
            <Box sx={{
                display: {
                    xs: 'flex',
                    md: 'grid'
                },
                flexDirection: {
                    xs: 'column'
                },
                gridTemplateColumns: {
                    md: '280px 1fr'
                },
                gridTemplateRows: {
                    md: '90px 1fr'
                },
                gridTemplateAreas: {
                    md: `
                        "Nav Header" 
                        "Nav Content" 
                    `
                },
                minHeight: '100vh',
                bgcolor: 'background.default'
            }}>
                {/* Header component for the dashboard */}
                <DashboardHeader user={user} />
                {/* Navigation component for the dashboard */}
                <DashboardNav
                    activeSection={activeSection}
                    handleMenuItemClick={handleMenuItemClick}
                    menuItems={menuItems}
                />
                {/* Content component for the dashboard */}
                <DashboardContent activeSection={activeSection} />
            </Box>

            {/* Global Onboarding Dialog */}
            <GlobalOnboardingDialog
                open={showOnboarding}
                onClose={handleOnboardingClose}
            />
        </>
    );
}