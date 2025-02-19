import { useMemo } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, useTheme } from '@mui/material';

export function VisitorsChart() {
    const theme = useTheme();

    const chartData = useMemo(() => {
        return Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (29 - i));
            return {
                date: date.toISOString().split('T')[0],
                visitors: Math.floor(Math.random() * 1000) + 500,
                pageViews: Math.floor(Math.random() * 2000) + 1000
            };
        });
    }, []);

    return (
        <Box sx={{
            width: '100%',
            height: 'calc(100% - 32px)',
            display: 'flex',
            alignItems: 'center'
        }}>
            <LineChart
                series={[
                    {
                        data: chartData.map(d => d.visitors),
                        label: 'Unique Visitors',
                        color: theme.palette.primary.main,
                        showMark: false,
                        area: true,
                        valueFormatter: (value: number | null) =>
                            value != null ? value.toLocaleString() : ''
                    },
                    {
                        data: chartData.map(d => d.pageViews),
                        label: 'Page Views',
                        color: theme.palette.secondary.main,
                        showMark: false,
                        area: true,
                        valueFormatter: (value: number | null) =>
                            value != null ? value.toLocaleString() : ''
                    }
                ]}
                xAxis={[{
                    data: chartData.map(d => d.date),
                    scaleType: 'point',
                    tickLabelStyle: {
                        angle: 45,
                        textAnchor: 'start',
                        fontSize: 12,
                        fill: theme.palette.text.secondary
                    },
                    tickSize: 0
                }]}
                yAxis={[{
                    tickLabelStyle: {
                        fontSize: 12,
                        fill: theme.palette.text.secondary
                    }
                }]}
                height={300}
                margin={{
                    left: 60,
                    right: 20,
                    top: 20,
                    bottom: 80
                }}
                slotProps={{
                    legend: {
                        direction: 'row',
                        position: { vertical: 'top', horizontal: 'right' },
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
                    '.MuiLineElement-root': {
                        strokeWidth: 2
                    },
                    '.MuiAreaElement-root': {
                        fillOpacity: 0.1
                    },
                    '.MuiChartsLegend-mark': {
                        rx: 4,
                        ry: 4
                    }
                }}
            />
        </Box>
    );
}
