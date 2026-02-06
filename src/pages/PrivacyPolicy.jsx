import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';
import FadeIn from '../components/FadeIn';

const content = `
**MyHealth Haven**  
*Made in America, Made Better in Mexico*

# **PRIVACY POLICY**

**Last Updated:** January 1, 2026

My Health Haven Management LLC (“My Health Haven,” “we,” “us,” or “our”) respects your privacy and is committed to protecting your personal information.

---

## **1\. Information We Collect**

We may collect:

* **Personal information** you voluntarily provide (e.g., name, email, phone number, general inquiry details)  
* **Technical information** (IP address, browser type, device data)  
* **Usage data** (pages visited, interactions, referral sources)

We do **not** require submission of protected health information (PHI) through the public Site.

---

## **2\. How We Use Information**

We use collected information to:

* Respond to inquiries  
* Provide requested information or services  
* Improve website functionality and user experience  
* Communicate updates or relevant information (where permitted)

---

## **3\. Medical Information Disclaimer**

The Site is **not intended** for the collection of sensitive medical records.  
If health-related information is voluntarily submitted, it is handled with care but does **not** establish a provider-patient relationship.

---

## **4\. Sharing of Information**

We do **not** sell personal information.

We may share information:

* With service providers assisting in operations  
* To comply with legal obligations  
* To protect rights, safety, or security

---

## **5\. Data Security**

We use reasonable administrative, technical, and organizational safeguards to protect personal information. However, no system is completely secure.

---

## **6\. International Users**

Your information may be processed in the United States or other jurisdictions where we or our service providers operate. By using the Site, you consent to such transfers.

---

## **7\. Cookies and Tracking**

We may use cookies or similar technologies to improve functionality and analyze traffic. You may adjust browser settings to manage cookies.

---

## **8\. Your Rights**

Depending on your location, you may have rights to access, correct, or request deletion of personal data. Requests may be submitted to the contact information below.

---

## **9\. Children’s Privacy**

The Site is not directed to children under 18, and we do not knowingly collect information from minors.

---

## **10\. Updates to This Policy**

We may update this Privacy Policy periodically. The “Last Updated” date reflects the latest revision.

---

## **11\. Contact**

Privacy questions or requests may be directed to:  
**Info@andersonlg.com**

© 2026 My Health Haven Management, LLC  \- All Rights Reserved
`;

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | MyHealth Haven</title>
        <meta name="description" content="Privacy Policy for MyHealth Haven." />
      </Helmet>
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

export default PrivacyPolicy;
