import React from 'react';
import { Box } from '@chakra-ui/react';
import Contact from '../components/ui/Contact';
import Layout from '../components/layout/Layout';

const ContactPage = () => {
  return (
    <Layout>
      <Box pt={20}>
        <Contact />
      </Box>
    </Layout>
  );
};

export default ContactPage;