import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import { execSync } from 'child_process';

// Get git commit hash at build time
const getGitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'dev';
  }
};

// Get version from package.json and append git hash
const getVersion = () => {
  try {
    const pkg = require('./package.json');
    const hash = getGitHash();
    return `${pkg.version}.${hash}`;
  } catch {
    return `0.1.0.${getGitHash()}`;
  }
};

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  env: {
    NEXT_PUBLIC_VERSION: getVersion(),
    NEXT_PUBLIC_GIT_HASH: getGitHash(),
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
