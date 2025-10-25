import React from 'react';
import { Code2, Zap, Shield } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-purple rounded-full opacity-10 -translate-x-48 -translate-y-48 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange rounded-full opacity-10 translate-x-48 translate-y-48 blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-8">
            <img 
              src="/logo.svg" 
              alt="SIID Logo" 
              className="w-24 h-24 mx-auto mb-6 drop-shadow-lg"
            />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-brand-purple to-brand-orange bg-clip-text text-transparent mb-6 tracking-tight">
              SIID IDE
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
            Salesforce Intelligence Integrated Development
          </p>
          <p className="text-lg text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
            A specialized distribution based on Visual Studio Code, 
            customized for Salesforce development workflows and intelligence features.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="group flex flex-col items-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-purple mb-3">
                Enhanced Development
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Comprehensive code editing, navigation, and understanding support 
                optimized for Salesforce development.
              </p>
            </div>
            
            <div className="group flex flex-col items-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-secondary-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-orange to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-purple mb-3">
                Intelligent Features
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Built-in intelligence features and lightweight debugging 
                for efficient development workflows.
              </p>
            </div>
            
            <div className="group flex flex-col items-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-primary-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-brand-purple mb-3">
                Open Source
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Based on VS Code with MIT license, ensuring transparency 
                and community-driven development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};