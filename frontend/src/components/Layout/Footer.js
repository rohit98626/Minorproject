import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled(Box)`
  background: rgba(10, 25, 47, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(100, 255, 218, 0.1);
  padding: 4rem 0;
  position: relative;
  z-index: 1;
`;

const FooterSection = styled(Box)`
  margin-bottom: 2rem;
`;

const SocialIcon = styled(IconButton)`
  color: #64ffda;
  margin: 0 0.5rem;
  
  &:hover {
    color: #00bcd4;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography variant="h6" sx={{ color: '#64ffda', mb: 2 }}>
                About Us
              </Typography>
              <Typography sx={{ color: '#8892b0' }}>
                We are dedicated to revolutionizing knowledge visualization through
                innovative graph-based solutions. Our platform empowers users to
                create, explore, and share complex knowledge networks.
              </Typography>
            </FooterSection>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography variant="h6" sx={{ color: '#64ffda', mb: 2 }}>
                Contact Us
              </Typography>
              <Typography sx={{ color: '#8892b0' }}>
                Email: contact@knowledgegraph.com<br />
                Phone: +91 7357707100<br />
                Address: Parul University, Vadodara
              </Typography>
            </FooterSection>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FooterSection>
              <Typography variant="h6" sx={{ color: '#64ffda', mb: 2 }}>
                Connect With Us
              </Typography>
              <Box>
                {[FaLinkedin, FaTwitter, FaInstagram, FaEnvelope].map((Icon, index) => (
                  <motion.div
                    key={index}
                    style={{ display: 'inline-block' }}
                    whileHover={{ y: -5 }}
                  >
                    <SocialIcon>
                      <Icon size={24} />
                    </SocialIcon>
                  </motion.div>
                ))}
              </Box>
            </FooterSection>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography sx={{ color: '#8892b0' }}>
            © 2025 Knowledge Graph. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;