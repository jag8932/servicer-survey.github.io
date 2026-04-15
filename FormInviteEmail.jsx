/**
 * FormInviteEmail.jsx
 * React Email template — install deps first:
 *   npm install @react-email/components react react-dom
 *
 * Preview locally:
 *   npx email dev
 *
 * Send via Resend:
 *   npm install resend @react-email/render
 *   then use send.js (see below or the separate send.js file)
 */

import React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Img,
  Text,
  Button,
  Hr,
  Font,
} from '@react-email/components';

// ─── PROPS ────────────────────────────────────────────────────
// recipientName  — first name of the person receiving the email
// formUrl        — full URL to your hosted form
// senderName     — your name or team name
// deadline       — optional deadline string e.g. "Friday, April 5th"
// ──────────────────────────────────────────────────────────────

export default function FormInviteEmail({
  recipientName = 'there',
  companyName = 'your company',
  formUrl = 'https://yourform.com',
  senderName = 'Living Well Stores',
  deadline = null,
}) {
  return (
    <Html lang="en">
      <Head>
        <style>{`.email-btn { transition: background-color 0.5s ease !important; } .email-btn:hover { background-color: #F58A22 !important; }`}</style>
        <Font
          fontFamily="DM Sans"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: 'https://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8Cmcqbu6-K6z9mXgjU0.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        An important message from Living Well Stores. Please complete our servicer survey.
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>

          {/* Logo */}
          <Section style={styles.logoSection}>
            <Img
              src="https://jag8932.github.io/servicer-survey.github.io/public/Logo_LWS_Tag_600px.png"
              alt="Living Well Stores"
              width="100%"
              style={styles.logo}
            />
          </Section>

          {/* Top accent bar */}
          <Section style={styles.accentBar} />

          {/* Main content */}
          <Section style={styles.card}>

            {/* Eyebrow */}
            <Text style={styles.eyebrow}>SERVICER SURVEY</Text>

            {/* Heading */}
            <Heading style={styles.heading}>
              Living Well Stores Servicer Survey
            </Heading>

            {/* Body copy */}
            <Text style={styles.body_text}>
              In a few days, we're going to begin distributing our annual servicer survey. Please be on the lookout for the email that will contain a link to the survey. The email will carry the subject, "An important message from Living Well Stores to [your company name]".
            </Text>

            <Text style={styles.body_text}>
              This will be your opportunity to tell us what services you offer, brands that you service, what your rates are and more. We'll use this information so that we can get work orders into your hands more efficiently and containing more accurate and useful information.
            </Text>

            <Text style={styles.body_text}>
              We know you're busy so the survey will only take a few minutes to complete. You'll be able to complete it on a PC or smartphone. We would appreciate it if you could give it your attention within a week.
            </Text>

            <Hr style={styles.hr} />

            {/* Sign-off */}
            <Text style={styles.signoff}>
              Thank you for being a Living Well Stores servicer-partner and for offering to help those with illnesses, injuries and disabilities!
            </Text>
            <Text style={styles.sender}>{senderName}</Text>

          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footer_text}>
              You received this because you're part of our community.
              <br />
              If you'd prefer not to receive these, let us know by replying to this email.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ─── STYLES ───────────────────────────────────────────────────
// React Email uses inline styles; all values must be plain objects.

const styles = {
  body: {
    backgroundColor: '#f0f0f0',
    fontFamily: "'DM Sans', Helvetica, Arial, sans-serif",
    margin: '0',
    padding: '40px 0',
  },
  container: {
    maxWidth: '560px',
    margin: '0 auto',
  },
  logoSection: {
    backgroundColor: '#ffffff',
    padding: '24px 24px 0',
    borderRadius: '6px 6px 0 0',
  },
  logo: {
    maxWidth: '100%',
    display: 'block',
  },
  accentBar: {
    backgroundColor: '#49A049',
    height: '4px',
    borderRadius: '2px 2px 0 0',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderTop: 'none',
    borderRadius: '0 0 6px 6px',
    padding: '40px 44px',
  },
  eyebrow: {
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '0.14em',
    color: '#49A049',
    margin: '0 0 16px 0',
  },
  heading: {
    fontSize: '30px',
    fontWeight: '400',
    lineHeight: '1.25',
    color: '#000000',
    margin: '0 0 20px 0',
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  body_text: {
    fontSize: '17px',
    lineHeight: '1.65',
    color: '#000000',
    margin: '0 0 16px 0',
    fontWeight: '400',
  },
  deadline_text: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#000000',
    backgroundColor: '#fff5f5',
    border: '1px solid #f0c4ae',
    borderRadius: '4px',
    padding: '10px 14px',
    margin: '0 0 24px 0',
  },
  cta_section: {
    textAlign: 'center',
    margin: '32px 0',
  },
  button: {
    backgroundColor: '#0f0e0d',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '500',
    letterSpacing: '0.03em',
    padding: '13px 32px',
    borderRadius: '4px',
    textDecoration: 'none',
    display: 'inline-block',
  },
  hr: {
    borderColor: '#e0e0e0',
    borderTopWidth: '1px',
    margin: '28px 0',
  },
  small_heading: {
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#000000',
    margin: '0 0 12px 0',
  },
  bullet_col: {
    padding: '0',
  },
  bullet: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#000000',
    margin: '0 0 8px 0',
    fontWeight: '400',
  },
  signoff: {
    fontSize: '17px',
    lineHeight: '1.6',
    color: '#000000',
    margin: '0 0 6px 0',
    fontWeight: '400',
  },
  sender: {
    fontSize: '17px',
    color: '#000000',
    fontWeight: '500',
    margin: '0',
  },
  footer: {
    padding: '20px 8px 0',
  },
  footer_text: {
    fontSize: '13px',
    color: '#000000',
    lineHeight: '1.6',
    textAlign: 'center',
    fontWeight: '400',
  },
};
