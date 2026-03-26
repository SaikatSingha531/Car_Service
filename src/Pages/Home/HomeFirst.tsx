import { Box, Typography, Button, Container, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowForward, Speed, Build } from '@mui/icons-material';
import { toast } from 'sonner';

const HeroPage = () => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: '100vh', 
        bgcolor: '#0f1115', // Dark premium background
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Element */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '-10%', 
          right: '-5%', 
          width: '600px', 
          height: '600px', 
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.15) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(80px)',
          zIndex: 0
        }} 
      />

      <Container maxWidth="lg" sx={{ zIndex: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6 }}>
          
          {/* Left Side: Content */}
          <Box sx={{ flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Chip 
                label="Next-Gen Auto Care" 
                color="primary" 
                variant="outlined" 
                sx={{ mb: 3, borderColor: 'rgba(25, 118, 210, 0.5)', color: '#90caf9', fontWeight: 600 }} 
              />
              
              <Typography variant="h1" sx={{ 
                color: '#fff', 
                fontWeight: 800, 
                fontSize: { xs: '3.5rem', md: '5rem' }, 
                lineHeight: 1,
                letterSpacing: '-0.02em',
                mb: 2
              }}>
                Precision <br /> 
                <span style={{ color: '#1976d2' }}>Meets</span> Performance.
              </Typography>

              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', mb: 5, maxWidth: '480px', fontWeight: 300 }}>
                Experience automotive service redefined. From advanced diagnostics to master-level tuning, we treat your car like a masterpiece.
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button 
                onClick={()=>toast.warning("Comming Soon...")}
                  variant="contained" 
                  size="large" 
                  endIcon={<ArrowForward />}
                  sx={{ 
                    height: 56, 
                    px: 4, 
                    borderRadius: '12px', 
                    fontSize: '1rem', 
                    textTransform: 'none',
                    boxShadow: '0 8px 20px rgba(25, 118, 210, 0.3)'
                  }}
                >
                  Book Service
                </Button>
                {/* <Button 
                  variant="text" 
                  size="large" 
                  sx={{ color: '#fff', textTransform: 'none', fontSize: '1rem' }}
                >
                  View Our Process
                </Button> */}
              </Stack>

              {/* Quick Info Glass Card */}
              <Box 
                sx={{ 
                  mt: 8, 
                  p: 3, 
                  borderRadius: 4, 
                  bgcolor: 'rgba(255, 255, 255, 0.03)', 
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  gap: 4
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Speed sx={{ color: '#1976d2' }} />
                  <Typography variant="body2" sx={{ color: '#fff' }}>Quick Turnaround</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Build sx={{ color: '#1976d2' }} />
                  <Typography variant="body2" sx={{ color: '#fff' }}>Genuine Parts</Typography>
                </Stack>
              </Box>
            </motion.div>
          </Box>

          {/* Right Side: Image with Animation */}
          <Box sx={{ flex: 1, position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000"
                alt="Luxury Car"
                sx={{ 
                  width: '100%', 
                  borderRadius: '24px', 
                  boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
                  filter: 'contrast(1.1)'
                }}
              />
            </motion.div>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default HeroPage;