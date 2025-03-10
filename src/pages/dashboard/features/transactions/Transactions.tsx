import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Box, Paper, FormControl, Select, MenuItem, InputLabel, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Contexts
import { useUser } from '../../../../contexts/UserContext';

// Types
import type { TransactionApiErrorResponse } from '../../../../types/api/responses';
import type { Transaction } from '../../../../types/models/transaction';
import type { User } from '../../../../types/models/user';
import type { Category } from '../../../../types/models/category';

// Services
import { transactionService } from '../../../../services/transaction.service';
import { categoryService } from '../../../../services/category.service';

// Components
import TransactionPie from './components/TransactionPie';
import TransactionBarChart from './components/TransactionBarChart';
import TransactionBalances from './components/TransactionBalances';
import TransactionTable from './components/TransactionTable';

// Months array
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Transactions component
export default function Transactions() {
    const { t } = useTranslation();
    const theme = useTheme();
    const { user } = useUser();

    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const [year, setYear] = useState<string>(currentYear);
    const [month, setMonth] = useState<string>(
        (currentDate.getMonth() + 1).toString().padStart(2, '0')
    );
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [yearsWithData, setYearsWithData] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Handle the error
    const handleError = useCallback((error: TransactionApiErrorResponse) => {
        switch (error.error) {
            case 'UNAUTHORIZED':
                toast.error(t('dashboard.common.error.UNAUTHORIZED'));
                break;
            case 'CONNECTION_ERROR':
                toast.error(t('dashboard.common.error.CONNECTION_ERROR'));
                break;
            case 'DATABASE_ERROR':
                toast.error(t('dashboard.common.error.DATABASE_ERROR'));
                break;
            case 'SERVER_ERROR':
                toast.error(t('dashboard.common.error.SERVER_ERROR'));
                break;
            default:
                toast.error(t('dashboard.common.error.loading'));
        }
    }, [t]);

    // Fetch the data
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const [transactionsResponse, categoriesResponse, allTransactionsResponse] =
                await Promise.all([
                    transactionService.getTransactionsByYearAndMonth(year, month),
                    categoryService.getAllCategories(),
                    transactionService.getAllTransactions()
                ]);

            if (!transactionsResponse.success || !categoriesResponse.success || !allTransactionsResponse.success) {
                throw new Error('Error fetching data');
            }

            const years = new Set<string>(
                (allTransactionsResponse.data as Transaction[]).map(t =>
                    new Date(t.date).getFullYear().toString()
                )
            );
            years.add(currentYear);

            setYearsWithData(Array.from(years).sort((a, b) => Number(b) - Number(a)));
            setTransactions(transactionsResponse.data as Transaction[]);
            setCategories(categoriesResponse.data as Category[]);
        } catch (error: unknown) {
            const transactionError = error as TransactionApiErrorResponse;
            handleError(transactionError);
        } finally {
            setLoading(false);
        }
    }, [year, month, currentYear, handleError]);

    // UseEffect to fetch the data
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // UseMemo to calculate the data
    const { incomeData, expensesData, totalIncome, totalExpenses } = useMemo(() => {
        const income: Record<string, number> = {};
        const expenses: Record<string, number> = {};
        let totalInc = 0;
        let totalExp = 0;

        transactions.forEach((transaction) => {
            const category = categories.find(c => c.name === transaction.category);
            if (!category) {
                console.warn('⚠️ No category found for the transaction:', transaction);
                return;
            }

            if (transaction.amount > 0) {
                income[category.name] = (income[category.name] || 0) + transaction.amount;
                totalInc += transaction.amount;
            } else {
                const absAmount = Math.abs(transaction.amount);
                expenses[category.name] = (expenses[category.name] || 0) + absAmount;
                totalExp += absAmount;
            }
        });

        return {
            incomeData: Object.entries(income).map(([name, value]) => ({
                id: name,
                value,
                label: name,
                color: categories.find(c => c.name === name)?.color || theme.palette.primary.main
            })),
            expensesData: Object.entries(expenses).map(([name, value]) => ({
                id: name,
                value,
                label: name,
                color: categories.find(c => c.name === name)?.color || theme.palette.error.main
            })),
            totalIncome: totalInc,
            totalExpenses: totalExp
        };
    }, [transactions, categories, theme.palette]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Year and Month selection section */}
            <Box sx={{
                display: 'flex',
                gap: 2
            }}>
                {/* Year selection paper */}
                <Paper elevation={3} sx={{
                    p: 1,
                    borderRadius: 3,
                    width: '100%'
                }}>
                    <FormControl size="small" sx={{ width: '100%' }}>
                        <InputLabel>{t('dashboard.common.year')}</InputLabel>
                        <Select
                            value={year}
                            label={t('dashboard.common.year')}
                            onChange={(e) => setYear(e.target.value)}
                        >
                            {/* Mapping through years with data to create menu items */}
                            {yearsWithData.map(y => (
                                <MenuItem key={y} value={y}>{y}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Paper>

                {/* Month selection paper */}
                <Paper elevation={3} sx={{
                    p: 1,
                    borderRadius: 3,
                    width: '100%'
                }}>
                    <FormControl size="small" sx={{ width: '100%' }}>
                        <InputLabel>{t('dashboard.common.month')}</InputLabel>
                        <Select
                            value={month}
                            label={t('dashboard.common.month')}
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            {/* Generating month options */}
                            {Array.from({ length: 12 }, (_, i) => {
                                const monthNum = (i + 1).toString().padStart(2, '0');
                                return (
                                    <MenuItem key={monthNum} value={monthNum}>
                                        {t(`dashboard.common.monthNames.${months[i]}`)}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Paper>
            </Box>

            {/* Section for displaying charts */}
            <Box sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
            }}>
                {/* Income pie chart */}
                <TransactionPie
                    loading={loading}
                    data={incomeData}
                />
                {/* Expenses pie chart */}
                <TransactionPie
                    loading={loading}
                    data={expensesData}
                />
                {/* Bar chart for income and expenses */}
                <TransactionBarChart
                    loading={loading}
                    month={month}
                    income={totalIncome}
                    expenses={totalExpenses}
                />
            </Box>

            {/* Component to display total balances */}
            <TransactionBalances
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
                user={user as User}
                loading={loading}
            />

            {/* Table to display transaction data */}
            <Box>
                <TransactionTable
                    data={transactions}
                    loading={loading}
                    categories={categories}
                    onReload={fetchData}
                />
            </Box>
        </Box>
    );
}