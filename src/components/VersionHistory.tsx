import React, { useState, useEffect } from 'react';
import { Download, User, Users, Hash, ExternalLink, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { GitHubService } from '../services/github';
import type { ParsedRelease } from '../types/github';

export const VersionHistory: React.FC = () => {
  const [releases, setReleases] = useState<ParsedRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedReleases, setExpandedReleases] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        setLoading(true);
        const allReleases = await GitHubService.getAllReleases();
        setReleases(allReleases);
        setError(null);
      } catch (err) {
        setError('Failed to fetch release history. Please try again later.');
        console.error('Error fetching releases:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReleases();
  }, []);

  const toggleReleaseExpansion = (version: string) => {
    const newExpanded = new Set(expandedReleases);
    if (newExpanded.has(version)) {
      newExpanded.delete(version);
    } else {
      newExpanded.add(version);
    }
    setExpandedReleases(newExpanded);
  };

  const handleDownload = (url: string, filename: string) => {
    console.log(`Downloading: ${filename} from ${url}`);
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <section id="version-history" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading version history...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || releases.length === 0) {
    return (
      <section id="version-history" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error || 'No release history available'}</p>
          </div>
        </div>
      </section>
    );
  }

  const displayedReleases = showAll ? releases : releases.slice(0, 5);

  return (
    <section id="version-history" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Version History
          </h2>
          <p className="text-lg text-gray-600">
            Browse and download previous versions of SIID IDE
          </p>
        </div>

        <div className="space-y-6">
          {displayedReleases.map((release, index) => {
            const isExpanded = expandedReleases.has(release.version);
            const isLatest = index === 0;

            return (
              <div
                key={release.version}
                className={`bg-white rounded-lg border ${
                  isLatest ? 'border-blue-200 ring-2 ring-blue-100' : 'border-gray-200'
                } overflow-hidden`}
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleReleaseExpansion(release.version)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {release.version}
                          </h3>
                          {isLatest && (
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Latest
                            </span>
                          )}
                          {release.isPrerelease && (
                            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Pre-release
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{GitHubService.formatDate(release.publishedAt)}</span>
                          </div>
                          {release.buildDate && (
                            <div className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              Build: {release.buildDate}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {isExpanded ? 'Hide details' : 'Show details'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      {/* User Setup */}
                      {release.userSetup && (
                        <div className="bg-gradient-to-br from-white to-primary-50 rounded-xl p-4 border border-primary-200">
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-brand-purple to-purple-600 rounded-lg flex items-center justify-center mr-3">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="font-medium text-brand-purple">User Installation</h4>
                          </div>
                          
                          <div className="space-y-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(release.userSetup!.browser_download_url, release.userSetup!.name);
                              }}
                              className="w-full flex items-center justify-center px-3 py-2 bg-gradient-to-r from-brand-purple to-purple-600 text-white rounded-lg hover:from-primary-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </button>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{GitHubService.formatFileSize(release.userSetup.size)}</span>
                              <span>{release.userSetup.download_count} downloads</span>
                            </div>
                            
                            {release.userChecksum && (
                              <a
                                href={release.userChecksum.browser_download_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center text-xs text-brand-purple hover:text-primary-600"
                              >
                                <Hash className="w-3 h-3 mr-1" />
                                Checksum
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* System Setup */}
                      {release.systemSetup && (
                        <div className="bg-gradient-to-br from-white to-secondary-50 rounded-xl p-4 border border-secondary-200">
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-brand-orange to-orange-600 rounded-lg flex items-center justify-center mr-3">
                              <Users className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="font-medium text-brand-purple">System Installation</h4>
                          </div>
                          
                          <div className="space-y-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(release.systemSetup!.browser_download_url, release.systemSetup!.name);
                              }}
                              className="w-full flex items-center justify-center px-3 py-2 bg-gradient-to-r from-brand-orange to-orange-600 text-white rounded-lg hover:from-secondary-600 hover:to-orange-700 transition-all duration-300 text-sm font-medium"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </button>
                            
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{GitHubService.formatFileSize(release.systemSetup.size)}</span>
                              <span>{release.systemSetup.download_count} downloads</span>
                            </div>
                            
                            {release.systemChecksum && (
                              <a
                                href={release.systemChecksum.browser_download_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center text-xs text-brand-purple hover:text-primary-600"
                              >
                                <Hash className="w-3 h-3 mr-1" />
                                Checksum
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {release.description && (
                      <div className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-200 text-sm">
                        <h5 className="font-medium text-brand-purple mb-1">Release Notes</h5>
                        <div className="text-gray-700 whitespace-pre-line line-clamp-3">
                          {release.description}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {releases.length > 5 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              {showAll ? (
                <>
                  Show Less
                  <ChevronUp className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  Show All {releases.length} Releases
                  <ChevronDown className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};