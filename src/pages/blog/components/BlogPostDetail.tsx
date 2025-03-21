import { useEffect } from 'react';
import { Container, Typography, Box, Divider, Paper, Breadcrumbs, Link, Chip, useTheme, useMediaQuery } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Data
import { blogPosts } from '../data/blogData';
import { useProcessBlogContent } from '../../../utils/blogUtils';

// Components
import Footer from '../../landing/components/Footer';
import LanguageSelector from '../../landing/components/LanguageSelector';

// Function to format the blog post date
const formatBlogDate = (dateString: string) => {
    const date = new Date(dateString);
    const language = localStorage.getItem('i18nextLng') || 'en';

    // Returns the date in the appropriate format based on the selected language
    return date.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

// Blog post detail component
export default function BlogPostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { processContent } = useProcessBlogContent();
    const post = blogPosts.find(post => post.id === Number(id));
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Effect to scroll to the top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Debug effect - always present, not conditional
    useEffect(() => {
        if (!post) return;

        const processedContent = processContent(post.content);
        if (processedContent.includes('blog.post')) {
            console.warn('Untranslated content detected:', processedContent);
            console.log('Available translation keys:',
                t('blog.post.2.content.step1.items', { returnObjects: true }));
        }
    }, [post, t, processContent]);

    if (!post) {
        return (
            <Container>
                <Typography variant="h4">{t('blog.postNotFound')}</Typography>
            </Container>
        );
    }

    const processedContent = processContent(post.content);

    return (
        <>
            <LanguageSelector />
            <Container 
                maxWidth="md" 
                sx={{ 
                    py: { xs: 3, sm: 4, md: 5 },
                    pt: { xs: 14, sm: 16, md: 18 },
                    px: { xs: 2, sm: 3, md: 4 }
                }}
            >
                <Breadcrumbs 
                    sx={{ 
                        mb: { xs: 3, sm: 4 }, 
                        mt: { xs: 1, sm: 2 },
                        fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
                    }}
                >
                    <Link
                        component="button"
                        onClick={() => navigate('/blog')}
                        underline="hover"
                        sx={{
                            color: '#fe6f14',
                            '&:hover': {
                                color: '#d45a0f'
                            },
                            fontSize: 'inherit'
                        }}
                    >
                        Blog
                    </Link>
                    <Typography color="text.secondary" sx={{ fontSize: 'inherit' }}>
                        {t(post.title)}
                    </Typography>
                </Breadcrumbs>

                {post.image && (
                    <Box sx={{
                        position: 'relative',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: { xs: 2, sm: 3, md: 4 },
                        mb: { xs: 3, sm: 4 },
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        paddingTop: '56.25%' // Aspect ratio 16:9
                    }}>
                        <img
                            src={post.image}
                            alt={t(post.title)}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: { xs: 6, sm: 12, md: 16 },
                                left: { xs: 6, sm: 12, md: 16 },
                                zIndex: 2
                            }}
                        >
                            <Chip
                                label={t(`blog.categories.${post.category}`)}
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' },
                                    px: { xs: 1, sm: 1.5, md: 2 },
                                    height: { xs: '24px', sm: '28px', md: '32px' },
                                    '& .MuiChip-label': {
                                        px: { xs: 0.5, sm: 1 }
                                    },
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                }}
                            />
                        </Box>
                    </Box>
                )}

                <Paper 
                    elevation={0} 
                    sx={{ 
                        p: { xs: 2, sm: 3, md: 4 }, 
                        borderRadius: { xs: 2, sm: 3, md: 4 } 
                    }}
                >
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        gutterBottom
                        sx={{
                            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.25rem' },
                            fontWeight: 700,
                            lineHeight: 1.3
                        }}
                    >
                        {t(post.title)}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: { xs: 1.5, sm: 2 },
                            mb: { xs: 3, sm: 4 },
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'text.secondary',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
                            }}
                        >
                            <span className="material-symbols-rounded" style={{ fontSize: isMobile ? 16 : 20 }}>person</span>
                            {t('blog.by')} {t(post.author)}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'text.secondary',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
                            }}
                        >
                            <span className="material-symbols-rounded" style={{ fontSize: isMobile ? 16 : 20 }}>calendar_today</span>
                            {formatBlogDate(post.date)}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: { xs: 3, sm: 4 } }} />

                    <Box
                        sx={{
                            typography: 'body1',
                            lineHeight: 1.8,
                            fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                            '& p': { mb: 2 },
                            '& h3': {
                                fontSize: { xs: '1.25rem', sm: '1.35rem', md: '1.5rem' },
                                fontWeight: 600,
                                my: { xs: 2, sm: 2.5, md: 3 }
                            },
                            '& ul': {
                                pl: { xs: 2, sm: 3 },
                                mb: 2
                            },
                            '& li': {
                                mb: { xs: 0.75, sm: 1 }
                            },
                            '& a': {
                                color: 'primary.main',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline'
                                }
                            },
                            '& img': {
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: 1,
                                my: { xs: 2, sm: 3 }
                            }
                        }}
                        dangerouslySetInnerHTML={{
                            __html: processedContent
                        }}
                    />
                </Paper>
            </Container>
            <Footer />
        </>
    );
};