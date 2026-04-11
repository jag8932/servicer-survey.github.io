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
  formUrl = 'https://yourform.com',
  senderName = 'The Team',
  deadline = null,
}) {
  return (
    <Html lang="en">
      <Head>
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
        {recipientName}, you're invited to share your feedback — takes 2 minutes.
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>

          {/* Top accent bar */}
          <Section style={styles.accentBar} />

          {/* Main content */}
          <Section style={styles.card}>

            {/* Eyebrow */}
            <Text style={styles.eyebrow}>QUICK SURVEY</Text>

            {/* Heading */}
            <Heading style={styles.heading}>
              We'd love your&nbsp;thoughts,&nbsp;{recipientName}.
            </Heading>

            {/* Body copy */}
            <Text style={styles.body_text}>
              We're always working to improve, and your perspective matters. We've put
              together a short two-minute survey — no account needed, no fluff.
            </Text>

            {deadline && (
              <Text style={styles.deadline_text}>
                ⏱ We'd appreciate responses by <strong>{deadline}</strong>.
              </Text>
            )}

            {/* CTA */}
            <Section style={styles.cta_section}>
              <Button href={formUrl} style={styles.button}>
                Open the survey →
              </Button>
            </Section>

            <Hr style={styles.hr} />

            {/* What to expect */}
            <Text style={styles.small_heading}>What to expect</Text>
            <Row>
              <Column style={styles.bullet_col}>
                <Text style={styles.bullet}>① Your overall satisfaction</Text>
                <Text style={styles.bullet}>② Features you use most</Text>
                <Text style={styles.bullet}>③ Any open feedback you'd like to share</Text>
              </Column>
            </Row>

            <Hr style={styles.hr} />

            {/* Sign-off */}
            <Text style={styles.signoff}>
              Thank you for taking the time — it genuinely helps.
            </Text>
            <Text style={styles.sender}>— {senderName}</Text>

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
    backgroundColor: '#f5f2ec',
    fontFamily: "'DM Sans', Helvetica, Arial, sans-serif",
    margin: '0',
    padding: '40px 0',
  },
  container: {
    maxWidth: '560px',
    margin: '0 auto',
  },
  accentBar: {
    backgroundColor: '#c8440a',
    height: '4px',
    borderRadius: '2px 2px 0 0',
  },
  card: {
    backgroundColor: '#faf8f4',
    border: '1px solid #d8d0c4',
    borderTop: 'none',
    borderRadius: '0 0 6px 6px',
    padding: '40px 44px',
  },
  eyebrow: {
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '0.14em',
    color: '#c8440a',
    margin: '0 0 16px 0',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '400',
    lineHeight: '1.25',
    color: '#0f0e0d',
    margin: '0 0 20px 0',
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  body_text: {
    fontSize: '15px',
    lineHeight: '1.65',
    color: '#555048',
    margin: '0 0 16px 0',
    fontWeight: '300',
  },
  deadline_text: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#0f0e0d',
    backgroundColor: '#fdf4ef',
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
    color: '#f5f2ec',
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.03em',
    padding: '13px 32px',
    borderRadius: '4px',
    textDecoration: 'none',
    display: 'inline-block',
  },
  hr: {
    borderColor: '#d8d0c4',
    borderTopWidth: '1px',
    margin: '28px 0',
  },
  small_heading: {
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#8a8070',
    margin: '0 0 12px 0',
  },
  bullet_col: {
    padding: '0',
  },
  bullet: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#555048',
    margin: '0 0 8px 0',
    fontWeight: '300',
  },
  signoff: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#555048',
    margin: '0 0 6px 0',
    fontWeight: '300',
  },
  sender: {
    fontSize: '15px',
    color: '#0f0e0d',
    fontWeight: '500',
    margin: '0',
  },
  footer: {
    padding: '20px 8px 0',
  },
  footer_text: {
    fontSize: '11px',
    color: '#8a8070',
    lineHeight: '1.6',
    textAlign: 'center',
    fontWeight: '300',
  },
};
