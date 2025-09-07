import React from 'react';
import { Box } from '@chakra-ui/react';
import About from '../components/ui/About';
import Layout from '../components/layout/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <Box pt={20}>
        <About />
      </Box>
    </Layout>
  );
};

export default AboutPage;