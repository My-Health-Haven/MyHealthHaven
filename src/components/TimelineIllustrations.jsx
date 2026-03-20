import React from 'react';

// Common Palette
const PALETTE = {
  navy: '#1E3A8A',
  blue: '#3B82F6',
  lightBlue: '#BFDBFE',
  teal: '#0D9488',
  lightTeal: '#99F6E4',
  green: '#10B981',
  red: '#EF4444',
  yellow: '#F59E0B',
  gray: '#9CA3AF',
  lightGray: '#F3F4F6',
  white: '#FFFFFF',
  dark: '#1F2937'
};

export const PhoneIllustration = (props) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background glow or circle (optional, provides depth) */}
    <circle cx="32" cy="32" r="28" fill={PALETTE.lightBlue} opacity="0.3" />
    {/* Phone Body */}
    <rect x="18" y="10" width="28" height="46" rx="4" fill={PALETTE.navy} />
    {/* Phone Screen */}
    <rect x="20" y="14" width="24" height="34" rx="2" fill={PALETTE.lightGray} />
    {/* Phone Speaker */}
    <rect x="28" y="12" width="8" height="1" rx="0.5" fill={PALETTE.blue} />
    {/* Heart on screen */}
    <path d="M32 30c-2-3-7-3-7 1 0 5 7 9 7 9s7-4 7-9c0-4-5-4-7-1z" fill={PALETTE.red} />
    {/* Chat bubbles */}
    <rect x="22" y="18" width="14" height="4" rx="2" fill={PALETTE.blue} />
    <rect x="28" y="24" width="14" height="4" rx="2" fill={PALETTE.teal} />
    {/* Call Button */}
    <circle cx="32" cy="52" r="3" fill={PALETTE.green} />
    <path d="M30.5 52a1.5 1.5 0 003 0" stroke={PALETTE.white} strokeWidth="1" />
  </svg>
);

export const ClipboardIllustration = (props) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill={PALETTE.lightTeal} opacity="0.4" />
    {/* Clipboard Board */}
    <rect x="16" y="14" width="32" height="42" rx="2" fill={PALETTE.yellow} />
    {/* Paper */}
    <rect x="18" y="20" width="28" height="34" fill={PALETTE.white} />
    {/* Clip */}
    <path d="M26 12h12v4H26v-4z" fill={PALETTE.gray} />
    <path d="M30 10h4v2h-4v-2z" fill={PALETTE.dark} />
    <rect x="22" y="14" width="20" height="2" fill={PALETTE.navy} />
    {/* Checklist items */}
    <rect x="26" y="26" width="16" height="2" rx="1" fill={PALETTE.gray} />
    <rect x="26" y="32" width="12" height="2" rx="1" fill={PALETTE.gray} />
    <rect x="26" y="38" width="14" height="2" rx="1" fill={PALETTE.gray} />
    <rect x="26" y="44" width="8" height="2" rx="1" fill={PALETTE.gray} />
    {/* Checkmarks */}
    <path d="M21 27l1.5 1.5L24 25" stroke={PALETTE.green} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21 33l1.5 1.5L24 31" stroke={PALETTE.green} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M21 39l1.5 1.5L24 37" stroke={PALETTE.green} strokeWidth="1.5" strokeLinecap="round" />
    {/* Pencil */}
    <g transform="translate(18, -4) rotate(15)">
      <rect x="34" y="20" width="4" height="26" fill={PALETTE.red} />
      <path d="M34 46l2 4 2-4h-4z" fill={PALETTE.yellow} />
      <path d="M35.5 49l.5 1 .5-1h-1z" fill={PALETTE.dark} />
      <rect x="34" y="18" width="4" height="2" fill={PALETTE.gray} />
    </g>
  </svg>
);

export const VirtualConsultIllustration = (props) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill={PALETTE.lightBlue} opacity="0.3" />
    {/* Laptop Base */}
    <rect x="10" y="44" width="44" height="4" rx="2" fill={PALETTE.gray} />
    {/* Laptop Screen */}
    <rect x="14" y="20" width="36" height="24" rx="2" fill={PALETTE.navy} />
    {/* Screen Content */}
    <rect x="16" y="22" width="32" height="20" fill={PALETTE.lightBlue} />
    {/* Doctor 1 */}
    <rect x="18" y="24" width="13" height="16" rx="2" fill={PALETTE.blue} />
    <circle cx="24.5" cy="29" r="3" fill="#FCD34D" />
    <path d="M20 37c0-2 2-4 4.5-4s4.5 2 4.5 4v3h-9v-3z" fill={PALETTE.white} />
    {/* Doctor 2 */}
    <rect x="33" y="24" width="13" height="16" rx="2" fill={PALETTE.teal} />
    <circle cx="39.5" cy="29" r="3" fill="#FCD34D" />
    <path d="M35 37c0-2 2-4 4.5-4s4.5 2 4.5 4v3h-9v-3z" fill={PALETTE.white} />
    {/* Webcam */}
    <circle cx="32" cy="21" r="1.5" fill={PALETTE.white} />
    {/* Connection icon */}
    <path d="M32 32h-8M32 32h8" stroke={PALETTE.green} strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

export const CalendarIllustration = (props) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill={PALETTE.lightBlue} opacity="0.3" />
    {/* Calendar Back */}
    <rect x="18" y="18" width="28" height="32" rx="2" fill={PALETTE.white} />
    {/* Calendar Header */}
    <rect x="18" y="18" width="28" height="10" rx="2" fill={PALETTE.blue} />
    {/* Rings */}
    <rect x="22" y="14" width="2" height="6" rx="1" fill={PALETTE.gray} />
    <rect x="40" y="14" width="2" height="6" rx="1" fill={PALETTE.gray} />
    {/* Grid */}
    <rect x="22" y="32" width="6" height="4" fill={PALETTE.lightGray} />
    <rect x="30" y="32" width="6" height="4" fill={PALETTE.teal} />
    <rect x="38" y="32" width="6" height="4" fill={PALETTE.lightGray} />
    <rect x="22" y="38" width="6" height="4" fill={PALETTE.lightGray} />
    <rect x="30" y="38" width="6" height="4" fill={PALETTE.lightGray} />
    <rect x="38" y="38" width="6" height="4" fill={PALETTE.lightGray} />
    <rect x="22" y="44" width="6" height="4" fill={PALETTE.lightGray} />
    {/* Clock overlaid */}
    <circle cx="44" cy="44" r="10" fill={PALETTE.yellow} />
    <circle cx="44" cy="44" r="8" fill={PALETTE.white} />
    <path d="M44 38v6l4 3" stroke={PALETTE.dark} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TravelIllustration = (props) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill={PALETTE.lightTeal} opacity="0.4" />
    {/* Ticket 1 */}
    <g transform="rotate(-10 32 32)">
      <rect x="14" y="24" width="36" height="16" rx="2" fill={PALETTE.yellow} />
      <path d="M28 24v16" stroke={PALETTE.gray} strokeWidth="1" strokeDasharray="3 3" />
      <rect x="18" y="28" width="6" height="2" fill={PALETTE.dark} />
      <rect x="18" y="32" width="4" height="2" fill={PALETTE.red} />
    </g>
    {/* Passport */}
    <g transform="rotate(5 32 32)">
      <rect x="22" y="14" width="26" height="36" rx="3" fill={PALETTE.navy} />
      <path d="M35 24A4 4 0 1 0 35 32A4 4 0 1 0 35 24Z" fill={PALETTE.yellow} />
      <rect x="26" y="36" width="18" height="2" fill={PALETTE.white} />
      <rect x="28" y="40" width="14" height="2" fill={PALETTE.white} />
      <text x="35" y="20" fontSize="4" fill={PALETTE.yellow} textAnchor="middle" fontWeight="bold">PASSPORT</text>
    </g>
    {/* Airplane */}
    <path d="M12 44l10-10 16 2 8-8 8 2-6 10 2 12-10-6-8 8-4-4-2 6-8-12z" fill={PALETTE.lightBlue} />
    <path d="M14 42l8-8 12 2 6-6 6 2-4 8 2 10-8-5-6 6-3-3-2 5-6-9z" fill={PALETTE.white} />
    <path d="M22 34l12 2 6-6 6 2M14 42l7 6" stroke={PALETTE.blue} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ArrivalIllustration = (props) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill={PALETTE.lightBlue} opacity="0.3" />
    {/* Map Base */}
    <path d="M14 42l12-6 12 6 12-6v16l-12 6-12-6-12 6V42z" fill={PALETTE.teal} opacity="0.6" />
    <path d="M26 36v16M38 42v16" stroke={PALETTE.white} strokeWidth="1" />
    {/* Pathway */}
    <path d="M18 48Q26 40 38 48" stroke={PALETTE.white} strokeWidth="2" strokeDasharray="4 2" />
    {/* Map Pin */}
    <path d="M32 12c-5.5 0-10 4.5-10 10 0 7.5 10 18 10 18s10-10.5 10-18c0-5.5-4.5-10-10-10z" fill={PALETTE.red} />
    {/* Person in Pin */}
    <circle cx="32" cy="19" r="3" fill="#FCD34D" />
    <path d="M28 26c0-2 2-3 4-3s4 1 4 3v2h-8v-2z" fill={PALETTE.white} />
  </svg>
);

export const EvalIllustration = (props) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill={PALETTE.lightTeal} opacity="0.4" />
    {/* Document */}
    <rect x="26" y="14" width="24" height="30" rx="2" fill={PALETTE.white} />
    <rect x="30" y="20" width="16" height="2" fill={PALETTE.gray} />
    <rect x="30" y="26" width="12" height="2" fill={PALETTE.gray} />
    <rect x="30" y="32" width="14" height="2" fill={PALETTE.gray} />
    <path d="M42 38l2 2 4-4" stroke={PALETTE.green} strokeWidth="2" strokeLinecap="round" />
    {/* Test Tube Rack */}
    <rect x="12" y="38" width="20" height="12" rx="2" fill={PALETTE.navy} />
    {/* Test Tube 1 */}
    <path d="M16 26v18a3 3 0 006 0V26h-6z" fill={PALETTE.lightGray} opacity="0.8" />
    <path d="M16 34v10a3 3 0 006 0V34h-6z" fill={PALETTE.red} />
    <rect x="15" y="24" width="8" height="2" rx="1" fill={PALETTE.gray} />
    {/* Test Tube 2 */}
    <path d="M24 22v22a3 3 0 006 0V22h-6z" fill={PALETTE.lightGray} opacity="0.8" />
    <path d="M24 30v14a3 3 0 006 0V30h-6z" fill={PALETTE.blue} />
    <rect x="23" y="20" width="8" height="2" rx="1" fill={PALETTE.gray} />
  </svg>
);

export const ProcedureIllustration = (props) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill={PALETTE.lightBlue} opacity="0.3" />
    {/* Cross / Medical Sign */}
    <path d="M26 14h12v12h12v12H38v12H26V38H14V26h12V14z" fill={PALETTE.teal} opacity="0.15" />
    {/* Main Doctor */}
    <rect x="26" y="32" width="12" height="18" rx="2" fill={PALETTE.navy} />
    <circle cx="32" cy="25" r="5" fill="#FCD34D" />
    <path d="M26 32l6 6 6-6" fill={PALETTE.white} />
    {/* Stethoscope around neck */}
    <path d="M28 32v6a4 4 0 008 0v-6" stroke={PALETTE.teal} strokeWidth="1.5" />
    {/* Nurse / Doctor Left */}
    <rect x="16" y="36" width="10" height="14" rx="2" fill={PALETTE.blue} />
    <circle cx="21" cy="29" r="4" fill="#FCD34D" />
    <path d="M16 36l5 5 5-5" fill={PALETTE.white} />
    {/* Nurse / Doctor Right */}
    <rect x="38" y="36" width="10" height="14" rx="2" fill={PALETTE.teal} />
    <circle cx="43" cy="29" r="4" fill="#FCD34D" />
    <path d="M38 36l5 5 5-5" fill={PALETTE.white} />
  </svg>
);

export const RecoveryIllustration = (props) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill={PALETTE.lightTeal} opacity="0.4" />
    {/* Monitor */}
    <rect x="36" y="16" width="18" height="14" rx="2" fill={PALETTE.dark} />
    <path d="M38 23l2-2 2 6 2-8 2 4h4" stroke={PALETTE.green} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="42" y="30" width="6" height="16" fill={PALETTE.gray} />
    {/* Bed */}
    <rect x="10" y="44" width="44" height="6" rx="2" fill={PALETTE.navy} />
    <rect x="12" y="34" width="8" height="10" rx="2" fill={PALETTE.white} />
    {/* Patient */}
    <circle cx="16" cy="34" r="3" fill="#FCD34D" />
    {/* Blanket */}
    <path d="M20 38h26a4 4 0 014 4v2H20v-6z" fill={PALETTE.blue} />
    <path d="M30 46v4M48 46v4M16 46v4" stroke={PALETTE.gray} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const HomeIllustration = (props) => (
  <svg viewBox="0 0 64 64" width="100%" height="100%" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="28" fill={PALETTE.lightBlue} opacity="0.3" />
    {/* Shield */}
    <path d="M32 14l14 4v12c0 10-14 20-14 20S18 40 18 30V18l14-4z" fill={PALETTE.teal} opacity="0.2" />
    <path d="M32 14l14 4v12c0 10-14 20-14 20S18 40 18 30V18l14-4z" stroke={PALETTE.teal} strokeWidth="1.5" />
    {/* House */}
    <path d="M32 24l10 8v12H22V32l10-8z" fill={PALETTE.blue} />
    <path d="M32 20l12 10M32 20L20 30" stroke={PALETTE.navy} strokeWidth="2" strokeLinecap="round" />
    {/* Door */}
    <rect x="28" y="36" width="8" height="8" fill={PALETTE.white} />
    {/* Cross */}
    <path d="M30 28h4v4h-4zM32 26v8M28 30h8" stroke={PALETTE.white} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
