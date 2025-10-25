export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  assets: GitHubAsset[];
  prerelease: boolean;
  draft: boolean;
}

export interface GitHubAsset {
  id: number;
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
  content_type: string;
}

export interface ParsedRelease {
  version: string;
  buildDate: string;
  publishedAt: string;
  userSetup?: GitHubAsset;
  systemSetup?: GitHubAsset;
  userChecksum?: GitHubAsset;
  systemChecksum?: GitHubAsset;
  isPrerelease: boolean;
  description: string;
}