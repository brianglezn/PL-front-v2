import { useMemo } from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface SessionDurationCardProps {
    data?: {
        averageDuration: string;
        trend: number;
    };
}

export function SessionDurationCard({ data }: SessionDurationCardProps) {
    const mockData = useMemo(() => ({
        averageDuration: '4m 35s',
        trend: 12.5
    }), []);

    const { averageDuration, trend } = data || mockData;
    const isPositive = trend > 0;

    return (
        <Paper
            elevation={2}
            sx={{
                p: 2.5,
                height: '100%',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper'
            }}
        >
            <Typography 
                variant="subtitle2" 
                sx={{
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    fontWeight: 500
                }}
            >
                Average Session Duration
            </Typography>
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'baseline', 
                mt: 1.5,
                mb: 0.5
            }}>
                <Typography 
                    variant="h4" 
                    component="span"
                    sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        lineHeight: 1
                    }}
                >
                    {averageDuration}
                </Typography>
                <Typography
                    variant="body2"
                    color={isPositive ? 'success.main' : 'error.main'}
                    sx={{ 
                        ml: 1,
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {isPositive ? '+' : ''}{trend.toFixed(1)}%
                </Typography>
            </Box>
            <Typography 
                variant="body2" 
                sx={{ 
                    color: 'text.secondary',
                    fontSize: '0.8125rem'
                }}
            >
                vs. previous period
            </Typography>
        </Paper>
    );
}
