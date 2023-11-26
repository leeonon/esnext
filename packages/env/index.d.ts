export const env: Readonly<{
  DATABASE_URL: string;
  NODE_ENV: 'development' | 'test' | 'production';
  NEXTAUTH_URL: string;
  DISCORD_CLIENT_ID: string;
  DISCORD_CLIENT_SECRET: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  NEXTAUTH_SECRET?: string | undefined;
  COS_SECRET_ID: string;
  COS_SECRET_KEY: string;
  COS_REGION: string;
  COS_BUCKET: string;
  COS_PATH: string;
}> = {};
