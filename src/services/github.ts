import axios from 'axios';
import type { GitHubRelease, ParsedRelease } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';
const REPO_OWNER = 'Conscendotechnologies';
const REPO_NAME = 'AIpexium2';

export class GitHubService {
  private static async fetchReleases(): Promise<GitHubRelease[]> {
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/releases`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching releases:', error);
      throw new Error('Failed to fetch releases from GitHub');
    }
  }

  private static parseRelease(release: GitHubRelease): ParsedRelease {
    // Extract build date from tag name (format: release-2025.10.25-124650)
    const buildDateMatch = release.tag_name.match(/(\d{4}\.\d{2}\.\d{2}-\d{6})/);
    const buildDate = buildDateMatch ? buildDateMatch[1] : '';
    
    // Find assets
    const userSetup = release.assets.find(asset => 
      asset.name.toLowerCase().includes('usersetup.exe')
    );
    const systemSetup = release.assets.find(asset => 
      asset.name.toLowerCase().includes('systemsetup.exe')
    );
    const userChecksum = release.assets.find(asset => 
      asset.name.toLowerCase().includes('usersetup') && asset.name.endsWith('.sha256')
    );
    const systemChecksum = release.assets.find(asset => 
      asset.name.toLowerCase().includes('systemsetup') && asset.name.endsWith('.sha256')
    );

    return {
      version: release.tag_name,
      buildDate,
      publishedAt: release.published_at,
      userSetup,
      systemSetup,
      userChecksum,
      systemChecksum,
      isPrerelease: release.prerelease,
      description: release.body || release.name,
    };
  }

  static async getLatestRelease(): Promise<ParsedRelease | null> {
    try {
      const releases = await this.fetchReleases();
      const latestRelease = releases.find(release => !release.draft);
      return latestRelease ? this.parseRelease(latestRelease) : null;
    } catch (error) {
      console.error('Error getting latest release:', error);
      return null;
    }
  }

  static async getAllReleases(): Promise<ParsedRelease[]> {
    try {
      const releases = await this.fetchReleases();
      return releases
        .filter(release => !release.draft)
        .map(release => this.parseRelease(release))
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } catch (error) {
      console.error('Error getting all releases:', error);
      return [];
    }
  }

  static formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}