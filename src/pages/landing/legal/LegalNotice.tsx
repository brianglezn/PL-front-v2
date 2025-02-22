import { Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Components
import LegalLayout from './components/LegalLayout';

// Legal Notice page
export default function LegalNotice() {
    const { t } = useTranslation();

    // Helper function to safely convert translation to array
    const getTranslationArray = (key: string): string[] => {
        const translation = t(key, { returnObjects: true });
        return Array.isArray(translation) ? translation : [];
    };

    return (
        <LegalLayout title={t('home.legal.legalNotice.title')}>
            {/* Last updated date */}
            <Typography sx={{ mb: 4 }}>
                {t('home.legal.lastUpdated', { date: '09/02/2025' })}
            </Typography>

            {/* Section 1: Title information */}
            <Typography variant="h2" gutterBottom sx={{ fontSize: '1.75rem', mt: 4 }}>
                {t('home.legal.legalNotice.sections.titleInfo.title')}
            </Typography>
            <Typography>
                {t('home.legal.legalNotice.sections.titleInfo.subtitle')}
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
                <li>{t('home.legal.legalNotice.sections.titleInfo.items.owner')}</li>
                <li>{t('home.legal.legalNotice.sections.titleInfo.items.email')}</li>
                <li>{t('home.legal.legalNotice.sections.titleInfo.items.website')}</li>
            </Box>

            {/* Section 2: Object and scope of application */}
            <Typography variant="h2" gutterBottom sx={{ fontSize: '1.75rem', mt: 4 }}>
                {t('home.legal.legalNotice.sections.object.title')}
            </Typography>
            <Typography>
                {t('home.legal.legalNotice.sections.object.content')}
            </Typography>

            {/* Section 3: Intellectual and industrial property */}
            <Typography variant="h2" gutterBottom sx={{ fontSize: '1.75rem', mt: 4 }}>
                {t('home.legal.legalNotice.sections.intellectual.title')}
            </Typography>
            <Typography>
                {t('home.legal.legalNotice.sections.intellectual.content')}
            </Typography>

            {/* Section 4: Use conditions */}
            <Typography variant="h2" gutterBottom sx={{ fontSize: '1.75rem', mt: 4 }}>
                {t('home.legal.legalNotice.sections.conditions.title')}
            </Typography>
            <Typography>
                {t('home.legal.legalNotice.sections.conditions.subtitle')}
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
                {getTranslationArray('home.legal.legalNotice.sections.conditions.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                ))}
            </Box>

            {/* Section 5: Responsibility */}
            <Typography variant="h2" gutterBottom sx={{ fontSize: '1.75rem', mt: 4 }}>
                {t('home.legal.legalNotice.sections.responsibility.title')}
            </Typography>
            <Typography>
                {t('home.legal.legalNotice.sections.responsibility.subtitle')}
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
                {getTranslationArray('home.legal.legalNotice.sections.responsibility.items').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                ))}
            </Box>

            {/* Section 6: Applicable legislation */}
            <Typography variant="h2" gutterBottom sx={{ fontSize: '1.75rem', mt: 4 }}>
                {t('home.legal.legalNotice.sections.legislation.title')}
            </Typography>
            <Typography>
                {t('home.legal.legalNotice.sections.legislation.content')}
            </Typography>

            {/* Section 7: Modifications */}
            <Typography variant="h2" gutterBottom sx={{ fontSize: '1.75rem', mt: 4 }}>
                {t('home.legal.legalNotice.sections.modifications.title')}
            </Typography>
            <Typography>
                {t('home.legal.legalNotice.sections.modifications.content')}
            </Typography>
        </LegalLayout>
    );
}