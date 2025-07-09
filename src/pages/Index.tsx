
import React, { useState } from 'react';
import { Copy, Shield, AlertTriangle, Code, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import XSSPayloads from '@/components/XSSPayloads';
import DefaceTemplates from '@/components/DefaceTemplates';

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('payloads');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,0,100,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-cyan-400" />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-red-400 bg-clip-text text-transparent">
                    XSS Security Lab
                  </h1>
                  <p className="text-sm text-gray-400">Educational XSS Testing Platform</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm font-medium">For Educational Use Only</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-300 to-red-300 bg-clip-text text-transparent">
              Cross-Site Scripting Demonstration
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Professional XSS payload collection and defacement templates for security research and penetration testing. 
              Use responsibly and only on systems you own or have explicit permission to test.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-900/50 border border-gray-700">
                <TabsTrigger 
                  value="payloads" 
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
                >
                  <Code className="h-4 w-4 mr-2" />
                  XSS Payloads
                </TabsTrigger>
                <TabsTrigger 
                  value="deface" 
                  className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Deface Templates
                </TabsTrigger>
              </TabsList>

              <TabsContent value="payloads" className="mt-6">
                <XSSPayloads />
              </TabsContent>

              <TabsContent value="deface" className="mt-6">
                <DefaceTemplates />
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-800 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-400 mb-4">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">
                This tool is for educational and authorized testing purposes only. 
                Unauthorized use is illegal and unethical.
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Always obtain proper authorization before testing security vulnerabilities.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
