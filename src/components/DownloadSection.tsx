import React, { useState, useEffect } from 'react';
import { Download, User, Users, Hash, ExternalLink, Calendar, Tag } from 'lucide-react';
import { GitHubService } from '../services/github';
import type { ParsedRelease } from '../types/github';

export const DownloadSection: React.FC = () => {
  const [latestRelease, setLatestRelease] = useState<ParsedRelease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        setLoading(true);
        const release = await GitHubService.getLatestRelease();
        setLatestRelease(release);
        setError(null);
      } catch (err) {
        setError('Failed to fetch the latest release. Please try again later.');
        console.error('Error fetching latest release:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRelease();
  }, []);

  const handleDownload = (url: string, filename: string) => {
    // Track download analytics if needed
    console.log(`Downloading: ${filename} from ${url}`);
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading latest release...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !latestRelease) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error || 'No releases available'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/5 to-brand-orange/5"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-purple mb-6">
            Download SIID IDE
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get the latest version of the Salesforce Intelligence Integrated Development IDE
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-10 shadow-2xl border border-primary-100 mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-brand-purple mb-3">
                Latest Release
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Tag className="w-4 h-4" />
                  <span>{latestRelease.version}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{GitHubService.formatDate(latestRelease.publishedAt)}</span>
                </div>
                {latestRelease.buildDate && (
                  <div className="inline-flex items-center text-xs bg-gradient-to-r from-secondary-100 to-secondary-200 text-secondary-800 px-3 py-1.5 rounded-full font-medium">
                    <span className="w-2 h-2 bg-brand-orange rounded-full mr-2"></span>
                    Build: {latestRelease.buildDate}
                  </div>
                )}
              </div>
            </div>
            {latestRelease.isPrerelease && (
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Pre-release
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* User Setup */}
            {latestRelease.userSetup && (
              <div className="group bg-gradient-to-br from-white to-primary-50 rounded-2xl p-8 border-2 border-primary-200 hover:border-brand-purple hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-purple to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-purple">User Installation</h4>
                    <p className="text-sm text-gray-600">Installs for current user only</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={() => handleDownload(latestRelease.userSetup!.browser_download_url, latestRelease.userSetup!.name)}
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-brand-purple to-purple-600 text-white rounded-xl hover:from-primary-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl group-hover:scale-105 transform"
                  >
                    <Download className="w-5 h-5 mr-3" />
                    Download User Setup
                  </button>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{GitHubService.formatFileSize(latestRelease.userSetup.size)}</span>
                    <span>{latestRelease.userSetup.download_count} downloads</span>
                  </div>
                  
                  {latestRelease.userChecksum && (
                    <a
                      href={latestRelease.userChecksum.browser_download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-brand-purple hover:text-primary-600"
                    >
                      <Hash className="w-4 h-4 mr-1" />
                      Checksum (SHA256)
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* System Setup */}
            {latestRelease.systemSetup && (
              <div className="group bg-gradient-to-br from-white to-secondary-50 rounded-2xl p-8 border-2 border-secondary-200 hover:border-brand-orange hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-purple">System Installation</h4>
                    <p className="text-sm text-gray-600">Installs for all users (requires admin)</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={() => handleDownload(latestRelease.systemSetup!.browser_download_url, latestRelease.systemSetup!.name)}
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-brand-orange to-orange-600 text-white rounded-xl hover:from-secondary-600 hover:to-orange-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl group-hover:scale-105 transform"
                  >
                    <Download className="w-5 h-5 mr-3" />
                    Download System Setup
                  </button>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{GitHubService.formatFileSize(latestRelease.systemSetup.size)}</span>
                    <span>{latestRelease.systemSetup.download_count} downloads</span>
                  </div>
                  
                  {latestRelease.systemChecksum && (
                    <a
                      href={latestRelease.systemChecksum.browser_download_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-brand-purple hover:text-primary-600"
                    >
                      <Hash className="w-4 h-4 mr-1" />
                      Checksum (SHA256)
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {latestRelease.description && (
            <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-200">
              <h5 className="text-lg font-bold text-brand-purple mb-3 flex items-center">
                <span className="w-2 h-2 bg-brand-orange rounded-full mr-3"></span>
                Release Notes
              </h5>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {latestRelease.description}
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Need an older version or want to see what's changed?
          </p>
          <a
            href="#version-history"
            className="inline-flex items-center text-brand-purple hover:text-primary-600 font-medium"
          >
            View All Releases
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};