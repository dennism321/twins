import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 1.67a8.24 8.24 0 0 1 8.24 8.24 8.24 8.24 0 0 1-8.24 8.24c-1.5 0-2.97-.41-4.25-1.18l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.35 8.24 8.24 0 0 1 8.3-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01" />
    </svg>
  );
}

export function ViberIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M11.4 1.5c-1.4.02-4.5.26-6.2 1.84C3.9 4.6 3.4 6.4 3.3 8.7c-.07 2.3-.14 6.5 3.9 7.7v1.8s0 .7.4.9c.5.2.8-.3 1.3-.9l1-1.1c2.8.2 4.9-.3 5.2-.4.5-.2 3.6-.6 4.1-4.7.5-4.3-.3-7-1.6-8.2-.4-.4-2.1-1.7-5.7-1.8-.1 0-.4-.1-.5-.1m.1 1.5c3.1.1 4.5 1.1 4.8 1.4 1.1 1 1.6 3.3 1.2 6.8-.4 3.3-2.8 3.6-3.3 3.7-.2.1-2.1.5-4.6.4 0 0-1.8 2.2-2.4 2.8-.1.1-.2.1-.3.1-.1 0-.1-.2-.1-.3v-3c-3.4-.9-3.2-4.5-3.1-6.4.1-1.9.4-3.4 1.5-4.5C6.6 3.2 9.3 3 11.5 3m.4 2.1c-.2 0-.3.2-.3.3 0 .2.1.3.3.3 1.4 0 2.6.5 3.5 1.4.9.9 1.3 2.1 1.3 3.5 0 .2.2.3.3.3.2 0 .3-.1.3-.3 0-1.5-.5-2.9-1.5-4-1.1-1-2.4-1.5-3.9-1.5m-2.3.4c-.3-.1-.6 0-.8.2l-.6.8c-.4.5-.3 1 0 1.5 0 0 .1.1.1.2.1.1.2.3.3.5.3.5.7 1.1 1.4 1.9.7.8 1.5 1.4 2.1 1.8.3.2.6.4.8.5h.1c.5.3 1.1.3 1.5-.1l.7-.7c.3-.3.3-.7.1-1l-1.3-1c-.3-.2-.7-.2-1 .1l-.4.4c-.1.1-.2.1-.4.1-.6-.3-1.1-.7-1.6-1.2-.5-.5-.9-1-1.1-1.6 0-.1 0-.3.1-.4l.4-.4c.2-.3.3-.7.1-1l-.5-1.4c-.1-.2-.2-.3-.4-.4m2.6.9c-.2 0-.3.1-.3.3s.1.3.3.3c.9.1 1.6.4 2.1.9.5.5.8 1.2.8 2.1 0 .2.2.3.3.3.2 0 .3-.2.3-.3 0-1-.4-1.9-1-2.5-.6-.6-1.5-1-2.5-1.1m.3 1.4c-.2 0-.3.1-.3.3 0 .2.1.3.3.3.4 0 .7.1.9.4.2.2.3.5.4.9 0 .2.2.3.3.3.2 0 .3-.2.3-.3 0-.5-.2-1-.5-1.4-.4-.3-.9-.5-1.4-.5" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 8h2.5V4.5H14A3.5 3.5 0 0 0 10.5 8v2.5H8V14h2.5v6h3.5v-6h2.5l.5-3.5H14V8.5c0-.3.2-.5.5-.5Z" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-6-5.3-6-11a6 6 0 1 1 12 0c0 5.7-6 11-6 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function ScissorsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <path d="M8.3 8.3 20 20M8.3 15.7 20 4M13 13l-1.5-1.5" />
    </svg>
  );
}

export function NailPolishIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.5 3h5v4.5h-5zM10.5 7.5h3v3h-3z" />
      <path d="M7 13.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-5.5Z" />
      <path d="M7 15.5h10" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5Z" />
      <path d="M18.5 15.5c.3 1.8 1 2.5 2.8 2.8-1.8.3-2.5 1-2.8 2.8-.3-1.8-1-2.5-2.8-2.8 1.8-.3 2.5-1 2.8-2.8Z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M7.5 6C5 6 3 8.2 3 11.1c0 2.8 1.9 4.9 4.4 4.9.3 0 .5 0 .8-.1-.5 1.6-1.7 2.7-3.4 3.3l.6 1.3c3.6-1 6-3.8 6-8.3C11.4 8.4 9.8 6 7.5 6Zm9.6 0C14.6 6 12.6 8.2 12.6 11.1c0 2.8 1.9 4.9 4.4 4.9.3 0 .5 0 .8-.1-.5 1.6-1.7 2.7-3.4 3.3l.6 1.3c3.6-1 6-3.8 6-8.3C21 8.4 19.4 6 17.1 6Z" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9L12 2.8Z" />
    </svg>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}
