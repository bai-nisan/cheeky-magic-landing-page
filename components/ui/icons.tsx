import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export const MetaIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="none"
  >
    <path
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      fill="currentColor"
    />
  </svg>
);

export const GoogleIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="none"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export const ShopifyIcon: React.FC<IconProps> = ({
  className = "",
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M15.7 4.3c-.1 0-.3 0-.4-.1-.1 0-.2-.1-.3-.1-1.5-.2-3.3 1.2-3.3 3.3 0 .3.1.6.2.9l-1.9.6c-.1 0-.1.1-.1.2v.1l-.7 5.3L18 15.5l-.9-2.8c0-.2-.1-.4-.2-.5l-1.2-7.9zm-3.1 3.5c0-.3.2-.6.5-.6.3 0 .5.3.5.6s-.2.6-.5.6c-.3 0-.5-.3-.5-.6z" />
  </svg>
);

// Alternative simplified versions for smaller contexts
export const MetaIconSimple: React.FC<IconProps> = ({
  className = "",
  size = 16,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="none"
  >
    <rect x="2" y="2" width="20" height="20" rx="10" fill="#1877F2" />
    <path
      d="M16.5 12.5h-2v7h-3v-7h-1.5v-2.5h1.5V8.5c0-1.5 1-2.5 2.5-2.5h2v2.5h-1.5c-.5 0-.5.5-.5 1v1h2l-.5 2.5z"
      fill="white"
    />
  </svg>
);

export const GoogleIconSimple: React.FC<IconProps> = ({
  className = "",
  size = 16,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="none"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="10"
      fill="white"
      stroke="#dadce0"
    />
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export const ShopifyIconSimple: React.FC<IconProps> = ({
  className = "",
  size = 16,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="none"
  >
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#96BF48" />
    <path
      d="M16.8 7.2c-.1-.1-.3-.1-.5 0l-.7.2c-.2-.6-.6-1.1-1.2-1.3-.1 0-.1 0-.2-.1-.1-.1-.2-.1-.3-.1-.7-.1-1.3.2-1.8.8-.4.4-.6 1-.7 1.5l-1.4.4c-.4.1-.4.1-.5.5l-.9 6.9 6.5 1.2 3.7-.9-3-8.1zm-4.8.8c-.2.1-.5.1-.7.2v-.3c0-.3-.1-.7-.3-.9.4-.2.7-.1 1 1zm-1.5.5l-.9.3c.1-.4.3-.8.5-1 .1-.1.3-.2.4-.2v.9zm1.1-1.2c.1.2.2.5.2.8v.1l-.6.2c-.1-.4-.3-.8-.6-1 .3-.1.7-.1 1-.1z"
      fill="white"
    />
  </svg>
);

// Utility component to get the right icon based on platform name
interface PlatformIconProps extends IconProps {
  platform: "meta" | "google" | "shopify";
  variant?: "full" | "simple";
}

export const PlatformIcon: React.FC<PlatformIconProps> = ({
  platform,
  variant = "simple",
  ...props
}) => {
  const IconMap = {
    meta: variant === "simple" ? MetaIconSimple : MetaIcon,
    google: variant === "simple" ? GoogleIconSimple : GoogleIcon,
    shopify: variant === "simple" ? ShopifyIconSimple : ShopifyIcon,
  };

  const IconComponent = IconMap[platform];
  return <IconComponent {...props} />;
};

// Additional helper icons that might be useful
export const AIIcon: React.FC<IconProps> = ({ className = "", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="none"
  >
    <rect x="3" y="3" width="18" height="18" rx="9" fill="url(#aiGradient)" />
    <defs>
      <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <path
      d="M12 8l2 4h-1l-1-2-1 2h-1l2-4zm-2 6h4v1h-4v-1z"
      fill="white"
      fontSize="12"
      fontWeight="bold"
    />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fill="white"
      fontSize="8"
      fontWeight="bold"
    >
      AI
    </text>
  </svg>
);

export const DataFlowIcon: React.FC<IconProps> = ({
  className = "",
  size = 16,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
