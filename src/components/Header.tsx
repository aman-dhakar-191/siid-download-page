import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img 
                src="/logo.svg" 
                alt="SIID Logo" 
                className="w-10 h-10"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-brand-purple">SIID</h1>
              <div className="hidden md:block">
                <p className="text-sm text-gray-600">
                  Salesforce Intelligence Integrated Development
                </p>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a 
              href="https://github.com/Conscendotechnologies/AIpexium2" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-purple px-3 py-2 text-sm font-medium transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://github.com/Conscendotechnologies/AIpexium2/issues" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-purple px-3 py-2 text-sm font-medium transition-colors"
            >
              Issues
            </a>
            <a 
              href="https://github.com/Conscendotechnologies/AIpexium2/blob/main/README.md" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-brand-purple px-3 py-2 text-sm font-medium transition-colors"
            >
              Documentation
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};