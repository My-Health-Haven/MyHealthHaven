import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import FadeIn from '../components/FadeIn';
import Seo from '../seo/Seo';
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from '../seo/siteSeo';

const content = `
**MyHealth Haven**  
*Made in America, Made Better in Mexico*

# **TERMS OF USE**

**Last Updated:** January 1, 2026

Welcome to the My Health Haven website (the "Site"), operated by **My Health Haven Management LLC** ("My Health Haven," "we," "us," or "our"). By accessing or using this Site, you agree to be bound by these Terms of Use ("Terms"). If you do not agree, please do not use the Site.

---

## **1. Purpose of the Site**

The Site provides general information about My Health Haven's healthcare navigation, education, and facilitation services related to cross-border medical care.  
**We do not provide medical, dental, or clinical services**, and nothing on this Site constitutes medical advice, diagnosis, or treatment.

---

## **2. No Medical Advice**

All content on this Site is for **informational purposes only**.  
You should always seek the advice of a licensed physician or other qualified healthcare provider regarding any medical condition or treatment.

Reliance on any information provided through this Site is **solely at your own risk**.

---

## **3. Eligibility**

You must be at least 18 years old to use this Site. By using the Site, you represent that you meet this requirement.

---

## **4. Use of the Site**

You agree not to:

* Use the Site for unlawful, misleading, or fraudulent purposes  
* Interfere with the security or operation of the Site  
* Attempt to access non-public systems or data  
* Copy, scrape, or reuse content without authorization

We reserve the right to suspend or terminate access for violations.

---

## **5. Intellectual Property**

All content on this Site-including text, graphics, logos, trademarks, and design elements-is the property of My Health Haven or its licensors and is protected by applicable intellectual property laws.

You may not reproduce, distribute, or create derivative works without prior written permission.

---

## **6. Third-Party Links**

The Site may include links to third-party websites or services. We do not control or endorse those sites and are not responsible for their content, policies, or practices.

---

## **7. Disclaimers**

The Site and its content are provided **"as is" and "as available."**  
We make no warranties, express or implied, regarding accuracy, completeness, or availability.

---

## **8. Limitation of Liability**

To the fullest extent permitted by law, My Health Haven shall not be liable for any indirect, incidental, consequential, or special damages arising out of or related to your use of the Site.

---

## **9. Indemnification**

You agree to indemnify and hold harmless My Health Haven and its officers, directors, employees, and affiliates from any claims arising from your use of the Site or violation of these Terms.

---

## **10. Governing Law**

These Terms are governed by the laws of the State of **Wyoming**, without regard to conflict-of-law principles.

---

## **11. Changes to These Terms**

We may update these Terms from time to time. Continued use of the Site after changes constitutes acceptance of the revised Terms.

---

## **12. Contact**

Questions regarding these Terms may be directed to:  
**info@andersonlg.com**

(c) 2026 My Health Haven Management, LLC  - All Rights Reserved
`;

const TermsOfUse = () => {
  return (
    <>
      <Seo
        title="Terms of Use | MyHealth Haven"
        description="Terms of Use for MyHealth Haven."
        canonicalPath="/terms"
        image="/logo.jpg"
        schema={[
          createWebPageSchema({
            path: '/terms',
            name: 'Terms of Use | MyHealth Haven',
            description: 'Terms of Use for MyHealth Haven.',
            image: '/logo.jpg',
          }),
          createBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Terms of Use', path: '/terms' },
          ]),
        ]}
      />
      <Box sx={{ py: 12 }}>
        <Container maxWidth="md">
           <FadeIn>
            <Box sx={{ '& h1': { fontSize: '2.5rem', mb: 2 }, '& h2': { fontSize: '1.5rem', mt: 4, mb: 2 }, '& p': { mb: 2 }, '& ul': { mb: 2, pl: 4 } }}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </Box>
           </FadeIn>
        </Container>
      </Box>
    </>
  );
};

export default TermsOfUse;

