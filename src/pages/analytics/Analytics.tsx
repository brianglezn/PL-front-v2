import { useEffect } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

// Components
import { AnalyticsHeader } from './components/AnalyticsHeader';
import { BounceRateCard } from './components/BounceRateCard';
import { SessionDurationCard } from './components/SessionDurationCard';
import { VisitorsChart } from './components/VisitorsChart';
import { DeviceStats } from './components/DeviceStats';
import { PageViewsTable } from './components/PageViewsTable';

const ALLOWED_USERS = [
    '65df4dfae27f115e23b1a1c2',
    '67a37c1bb1e0d4dfc92a0bb3'
];

export default function Analytics() {
    const navigate = useNavigate();
    const { user } = useUser();

    useEffect(() => {
        if (!user || !ALLOWED_USERS.includes(user._id)) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    if (!user || !ALLOWED_USERS.includes(user._id)) {
        return null;
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            py: 3
        }}>
            <Container maxWidth="xl">
                <AnalyticsHeader />
                
                {/* Quick Stats */}
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3,
                    flexWrap: 'wrap'
                }}>
                    <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
                        <BounceRateCard />
                    </Box>
                    <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
                        <SessionDurationCard />
                    </Box>
                </Box>

                {/* Charts Section */}
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 3,
                    flexWrap: 'wrap'
                }}>
                    {/* Visitors Chart */}
                    <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(66.666% - 8px)' } }}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 2.5,
                                height: '400px',
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                bgcolor: 'background.paper'
                            }}
                        >
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    mb: 2,
                                    fontWeight: 600,
                                    color: 'text.primary'
                                }}
                            >
                                Visitors Overview
                            </Typography>
                            <VisitorsChart />
                        </Paper>
                    </Box>

                    {/* Device Stats */}
                    <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 calc(33.333% - 8px)' } }}>
                        <Paper
                            elevation={2}
                            sx={{
                                p: 2.5,
                                height: '400px',
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                bgcolor: 'background.paper'
                            }}
                        >
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    mb: 2,
                                    fontWeight: 600,
                                    color: 'text.primary'
                                }}
                            >
                                Device Distribution
                            </Typography>
                            <DeviceStats />
                        </Paper>
                    </Box>
                </Box>

                {/* Page Views Table */}
                <Box sx={{ width: '100%' }}>
                    <Paper
                        elevation={2}
                        sx={{
                            p: 2.5,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            bgcolor: 'background.paper'
                        }}
                    >
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                mb: 2,
                                fontWeight: 600,
                                color: 'text.primary'
                            }}
                        >
                            Most Visited Pages
                        </Typography>
                        <PageViewsTable />
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
} 