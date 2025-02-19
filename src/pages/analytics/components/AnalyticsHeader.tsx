import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useUser } from '../../../contexts/UserContext';
import { formatDateTime } from '../../../utils/dateUtils';
import { useTranslation } from 'react-i18next';

export function AnalyticsHeader() {
    const theme = useTheme();
    const { user } = useUser();
    const { t } = useTranslation();

    const { toggleTheme, isDarkMode } = useContext(ThemeContext);
    const currentDate = formatDateTime(new Date().toISOString(), user);

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
        }}>
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        color: 'text.primary',
                        fontWeight: 600,
                        mb: 0.5
                    }}
                >
                    Analytics Dashboard
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem'
                    }}
                >
                    Last updated: {currentDate}
                </Typography>
            </Box>

            <IconButton
                onClick={toggleTheme}
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: theme.palette.action.hover,
                    '&:hover': {
                        bgcolor: theme.palette.action.selected
                    }
                }}
            >
                <Tooltip title={t(`dashboard.tooltips.${isDarkMode ? 'light_mode' : 'dark_mode'}`)}>
                    <span
                        className="material-symbols-rounded"
                        style={{
                            color: theme.palette.text.primary,
                            fontSize: '20px'
                        }}
                    >
                        {isDarkMode ? 'light_mode' : 'dark_mode'}
                    </span>
                </Tooltip>
            </IconButton>
        </Box >
    );
} 