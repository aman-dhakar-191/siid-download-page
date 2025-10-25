import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SIID IDE</h3>
            <p className="text-gray-300 text-sm">
              Salesforce Intelligence Integrated Development - 
              A specialized VS Code distribution for Salesforce development.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com/Conscendotechnologies/AIpexium2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white flex items-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Source Code
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Conscendotechnologies/AIpexium2/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white flex items-center"
                >
                  Report Issues
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Conscendotechnologies/AIpexium2/blob/main/README.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white flex items-center"
                >
                  Documentation
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Conscendotechnologies/AIpexium2/releases" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white flex items-center"
                >
                  All Releases
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
              <li>
                <a 
                  href="/privacy.html"
                  className="text-gray-300 hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">License</h3>
            <p className="text-gray-300 text-sm mb-4">
              Released under the MIT License.
            </p>
            <p className="text-gray-400 text-xs">
              Based on Visual Studio Code by Microsoft.
              © 2025 Conscendo Technologies.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            Built with ❤️ for the Salesforce development community
          </p>
        </div>
      </div>
    </footer>
  );
};