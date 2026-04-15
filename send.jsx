/**
 * send.js
 * Sends the FormInviteEmail via Resend.
 *
 * Setup:
 *   npm install resend @react-email/render react react-dom
 *
 * Run:
 *   RESEND_API_KEY=re_xxxx node send.js
 *   — or add RESEND_API_KEY to a .env file and use dotenv
 */

import React from 'react';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import FormInviteEmail from './FormInviteEmail.jsx';

// ─── CONFIG ───────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

const SENDER   = 'Living Well Stores <servicenetwork@livingwellstores.com>'; // test sender — replace with verified domain for production
const FORM_URL = 'https://jag8932.github.io/servicer-survey.github.io/';           // your hosted form URL
const DEADLINE = 'Friday, April 11th';             // set to null to hide
// ──────────────────────────────────────────────────────────────

// Single send — one recipient
async function sendOne({ to, name, company }) {
  const html = await render(
    <FormInviteEmail
      recipientName={name}
      companyName={company}
      formUrl={FORM_URL}
      senderName="Living Well Stores"
      deadline={DEADLINE}
    />
  );

  const { data, error } = await resend.emails.send({
    from:    SENDER,
    to,
    subject: `Survey from Living Well Stores coming`,
    html,
  });

  if (error) {
    console.error(`✗ Failed to send to ${to}:`, error);
  } else {
    console.log(`✓ Sent to ${to} — ID: ${data.id}`);
  }
}

// Bulk send — list of recipients
async function sendBulk(recipients) {
  for (const recipient of recipients) {
    await sendOne(recipient);
    // Small delay to stay within rate limits
    await new Promise(r => setTimeout(r, 300));
  }
}

// ─── RECIPIENTS ───────────────────────────────────────────────
const recipients = [
  { to: 'larry.berk@gmail.com',  name: 'Larry', company: 'Berk Services'      },
  { to: '4amystone@gmail.com',   name: 'Amy',   company: 'Stone Repair Co.'   },
  { to: 'jw@dangerousmedia.com', name: 'Jeff',  company: 'Dangerous Media'    },
  { to: 'jacobgoodwillie@gmail.com', name: 'Jacob', company: 'Jacob Goodwillie Developer'}
];
// ──────────────────────────────────────────────────────────────

sendBulk(recipients);
