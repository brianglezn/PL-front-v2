import { useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme
} from '@mui/material';

export function PageViewsTable() {
    const theme = useTheme();

    const tableData = useMemo(() => {
        // Mock data - será reemplazado con datos reales
        return [
            {
                path: '/',
                views: 12500,
                uniqueVisitors: 8900,
                avgTimeOnPage: '2m 30s',
                bounceRate: '35%'
            },
            {
                path: '/dashboard',
                views: 8700,
                uniqueVisitors: 5600,
                avgTimeOnPage: '5m 45s',
                bounceRate: '25%'
            },
            {
                path: '/blog',
                views: 6300,
                uniqueVisitors: 4200,
                avgTimeOnPage: '3m 15s',
                bounceRate: '40%'
            },
            {
                path: '/features',
                views: 4500,
                uniqueVisitors: 3100,
                avgTimeOnPage: '1m 50s',
                bounceRate: '45%'
            },
            {
                path: '/pricing',
                views: 3800,
                uniqueVisitors: 2900,
                avgTimeOnPage: '2m 10s',
                bounceRate: '30%'
            }
        ];
    }, []);

    return (
        <TableContainer sx={{
            maxHeight: 320,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
                width: 6,
                height: 6
            },
            '&::-webkit-scrollbar-track': {
                background: theme.palette.background.default
            },
            '&::-webkit-scrollbar-thumb': {
                background: theme.palette.divider,
                borderRadius: 3,
                '&:hover': {
                    background: theme.palette.action.hover
                }
            }
        }}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                bgcolor: 'background.paper',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                color: 'text.primary'
                            }}
                        >
                            Page
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{
                                bgcolor: 'background.paper',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                color: 'text.primary'
                            }}
                        >
                            Views
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{
                                bgcolor: 'background.paper',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                color: 'text.primary'
                            }}
                        >
                            Unique Visitors
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{
                                bgcolor: 'background.paper',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                color: 'text.primary'
                            }}
                        >
                            Avg. Time
                        </TableCell>
                        <TableCell
                            align="right"
                            sx={{
                                bgcolor: 'background.paper',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                                color: 'text.primary'
                            }}
                        >
                            Bounce Rate
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': { bgcolor: 'action.hover' },
                                transition: 'background-color 0.2s'
                            }}
                        >
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        maxWidth: 200,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        color: 'text.primary',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    {row.path}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    {row.views.toLocaleString()}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    {row.uniqueVisitors.toLocaleString()}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    {row.avgTimeOnPage}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.primary',
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    {row.bounceRate}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
