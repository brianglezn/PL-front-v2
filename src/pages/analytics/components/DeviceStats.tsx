import { useMemo } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, useTheme } from '@mui/material';

export function DeviceStats() {
    const theme = useTheme();

    const chartData = useMemo(() => {
        // Mock data - será reemplazado con datos reales
        return [
            { device: 'Desktop', users: 65000, percentage: '65%', color: theme.palette.primary.main },
            { device: 'Mobile', users: 30000, percentage: '30%', color: theme.palette.secondary.main },
            { device: 'Tablet', users: 5000, percentage: '5%', color: theme.palette.info.main }
        ];
    }, [theme]);

    return (
        <Box sx={{
            width: '100%',
            height: 'calc(100% - 32px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <PieChart
                series={[{
                    data: chartData.map(item => ({
                        id: item.device,
                        value: item.users,
                        label: `${item.device} (${item.percentage})`,
                        color: item.color
                    })),
                    innerRadius: 80,
                    paddingAngle: 2,
                    cornerRadius: 4,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                }]}
                height={300}
                margin={{
                    top: 10,
                    bottom: 40,
                    left: 10,
                    right: 10
                }}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: 0,
                        itemMarkWidth: 8,
                        itemMarkHeight: 8,
                        markGap: 8,
                        itemGap: 24,
                        labelStyle: {
                            fontSize: 13,
                            fill: theme.palette.text.secondary
                        }
                    }
                }}
                sx={{
                    '.MuiChartsLegend-mark': {
                        rx: 4,
                        ry: 4
                    },
                    '.MuiPieArc-root:hover': {
                        filter: 'brightness(0.9)'
                    }
                }}
            />
        </Box>
    );
}
