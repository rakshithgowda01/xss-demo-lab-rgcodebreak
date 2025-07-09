
import React, { useState } from 'react';
import { Copy, Eye, EyeOff, Skull, Shield, Zap, AlertTriangle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface DefaceTemplate {
  id: number;
  name: string;
  description: string;
  template: string;
  style: 'classic' | 'modern' | 'minimal' | 'glitch' | 'professional';
  preview: string;
}

const DefaceTemplates = () => {
  const { toast } = useToast();
  const [editableTemplates, setEditableTemplates] = useState<{[key: number]: string}>({});
  const [showTemplate, setShowTemplate] = useState<{[key: number]: boolean}>({});
  const [previewMode, setPreviewMode] = useState<{[key: number]: boolean}>({});
  const [userName, setUserName] = useState<string>('Anonymous Hacker');

  const templates: DefaceTemplate[] = [
    {
      id: 1,
      name: "Classic Hacker",
      description: "Traditional black and green terminal-style defacement",
      style: 'classic',
      preview: "Black background with green Matrix-style text",
      template: `<html><head><title>System Compromised</title><style>
body{background:#000;color:#0f0;font-family:monospace;text-align:center;padding:50px;margin:0;}
.skull{font-size:100px;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
.message{font-size:24px;margin:20px 0;text-shadow:0 0 10px #0f0;}
.footer{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);font-size:14px;}
</style></head><body>
<div class="skull">☠</div>
<div class="message">SYSTEM COMPROMISED</div>
<div class="message">Your security has been breached</div>
<div class="message">XSS Vulnerability Exploited</div>
<div class="footer">Secured by: [Your Handle] | Time: <script>document.write(new Date())</script></div>
</body></html>`
    },
    {
      id: 2,
      name: "Modern Cyber",
      description: "Sleek modern design with neon effects and animations",
      style: 'modern',
      preview: "Dark theme with cyan and red neon glows",
      template: `<html><head><title>Security Breach Detected</title><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:linear-gradient(45deg,#000,#111);color:#fff;font-family:'Arial',sans-serif;overflow:hidden;height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;}
.container{text-align:center;z-index:2;}
.warning{font-size:64px;color:#ff0040;text-shadow:0 0 20px #ff0040;animation:flicker 1.5s infinite;}
.title{font-size:32px;margin:20px 0;background:linear-gradient(90deg,#00ff88,#0088ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:glow 2s ease-in-out infinite alternate;}
.message{font-size:18px;margin:10px 0;color:#ccc;}
.footer{position:absolute;bottom:30px;font-size:12px;color:#666;}
@keyframes flicker{0%,100%{opacity:1}50%{opacity:0.3}}
@keyframes glow{from{text-shadow:0 0 20px #00ff88}to{text-shadow:0 0 30px #0088ff}}
.bg{position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle,rgba(0,255,136,0.1) 0%,transparent 70%);animation:rotate 20s linear infinite;}
@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
</style></head><body>
<div class="bg"></div>
<div class="container">
<div class="warning">⚠</div>
<div class="title">SECURITY BREACH</div>
<div class="message">Cross-Site Scripting vulnerability detected and exploited</div>
<div class="message">System access compromised via XSS injection</div>
<div class="message">Please contact your system administrator</div>
</div>
<div class="footer">Penetration Test by: [Security Researcher] | <script>document.write(new Date().toLocaleString())</script></div>
</body></html>`
    },
    {
      id: 3,
      name: "Anonymous Style",
      description: "Guy Fawkes mask themed defacement page",
      style: 'professional',
      preview: "Anonymous-inspired design with mask imagery",
      template: `<html><head><title>Message from Anonymous</title><style>
body{background:#000 url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="%23333" opacity="0.5"/></svg>');color:#fff;font-family:monospace;text-align:center;padding:20px;}
.mask{font-size:150px;margin:20px 0;filter:drop-shadow(0 0 20px #ff0000);}
.title{font-size:36px;color:#ff0000;text-shadow:2px 2px 4px #000;margin:20px 0;letter-spacing:3px;}
.message{font-size:16px;line-height:1.6;max-width:600px;margin:20px auto;background:rgba(255,0,0,0.1);padding:20px;border:1px solid #ff0000;border-radius:5px;}
.signature{font-size:18px;color:#ff0000;margin:30px 0;font-weight:bold;}
.warning{background:rgba(255,255,0,0.2);color:#ff0;padding:15px;margin:20px auto;max-width:500px;border:2px solid #ff0;animation:blink 2s infinite;}
@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0.3}}
</style></head><body>
<div class="mask">🎭</div>
<div class="title">WE ARE ANONYMOUS</div>
<div class="message">
Greetings,<br><br>
Your website has been successfully compromised through an XSS vulnerability. This is a demonstration of your security weaknesses.<br><br>
We do not forgive. We do not forget.<br>
Expect us.
</div>
<div class="warning">XSS VULNERABILITY EXPLOITED - PATCH YOUR SYSTEM IMMEDIATELY</div>
<div class="signature">- Anonymous</div>
<script>console.log('Anonymous was here - XSS successful');</script>
</body></html>`
    },
    {
      id: 4,
      name: "Glitch Effect",
      description: "Digital corruption themed page with glitch animations",
      style: 'glitch',
      preview: "Distorted text with digital glitch effects",
      template: `<html><head><title>System Error</title><style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;900&display=swap');
body{margin:0;padding:0;background:#000;color:#0ff;font-family:'Orbitron',monospace;overflow:hidden;height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;}
.glitch{font-size:64px;font-weight:900;text-transform:uppercase;position:relative;display:inline-block;animation:glitch 2s infinite;}
.glitch:before,.glitch:after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;}
.glitch:before{animation:glitch-1 0.5s infinite;color:#ff0040;z-index:-1;}
.glitch:after{animation:glitch-2 0.5s infinite;color:#00ff40;z-index:-2;}
@keyframes glitch{0%,100%{transform:translate(0)}20%{transform:translate(-2px,2px)}40%{transform:translate(-2px,-2px)}60%{transform:translate(2px,2px)}80%{transform:translate(2px,-2px)}}
@keyframes glitch-1{0%{transform:translate(0)}20%{transform:translate(2px,2px)}40%{transform:translate(-2px,2px)}60%{transform:translate(2px,-2px)}80%{transform:translate(-2px,-2px)}100%{transform:translate(0)}}
@keyframes glitch-2{0%{transform:translate(0)}20%{transform:translate(-2px,-2px)}40%{transform:translate(2px,-2px)}60%{transform:translate(-2px,2px)}80%{transform:translate(2px,2px)}100%{transform:translate(0)}}
.error{font-size:24px;margin:30px 0;animation:flicker 1s infinite;}
.code{font-size:16px;color:#666;margin:20px 0;letter-spacing:2px;}
@keyframes flicker{0%,100%{opacity:1}50%{opacity:0.1}}
.scan{position:absolute;top:0;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,#0ff,transparent);animation:scan 3s infinite;}
@keyframes scan{0%{top:0%}100%{top:100%}}
</style></head><body>
<div class="scan"></div>
<div class="glitch" data-text="ERROR">ERROR</div>
<div class="error">SYSTEM CORRUPTED</div>
<div class="code">XSS_INJECTION_SUCCESSFUL</div>
<div class="code">SECURITY_PROTOCOLS_BREACHED</div>
<div class="code">DATA_INTEGRITY_COMPROMISED</div>
<script>
setInterval(function(){
document.body.style.filter = Math.random() > 0.9 ? 'hue-rotate(90deg) saturate(2)' : 'none';
}, 100);
</script>
</body></html>`
    },
    {
      id: 5,
      name: "Professional Warning",
      description: "Clean, professional security warning page",
      style: 'professional',
      preview: "Corporate-style security notification",
      template: `<html><head><title>Security Advisory</title><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;}
.container{background:#fff;border-radius:15px;box-shadow:0 20px 40px rgba(0,0,0,0.1);max-width:600px;padding:40px;text-align:center;}
.icon{font-size:80px;color:#e74c3c;margin-bottom:20px;}
.title{font-size:32px;color:#2c3e50;margin-bottom:15px;font-weight:600;}
.subtitle{font-size:18px;color:#7f8c8d;margin-bottom:30px;}
.message{font-size:16px;line-height:1.6;color:#34495e;margin-bottom:30px;text-align:left;}
.details{background:#ecf0f1;padding:20px;border-radius:8px;margin:20px 0;font-family:monospace;font-size:14px;color:#2c3e50;}
.button{display:inline-block;background:#3498db;color:#fff;padding:12px 30px;border-radius:25px;text-decoration:none;font-weight:500;margin-top:20px;transition:background 0.3s;}
.button:hover{background:#2980b9;}
.footer{font-size:12px;color:#95a5a6;margin-top:30px;}
</style></head><body>
<div class="container">
<div class="icon">🛡️</div>
<div class="title">Security Vulnerability Detected</div>
<div class="subtitle">Cross-Site Scripting (XSS) Attack Successful</div>
<div class="message">
<strong>Impact Assessment:</strong><br>
• Unauthorized script execution detected<br>
• Client-side code injection successful<br>
• User session potentially compromised<br>
• Input validation bypass confirmed
</div>
<div class="details">
Vulnerability Type: Reflected XSS<br>
Severity Level: HIGH<br>
Attack Vector: User Input Field<br>
Timestamp: <script>document.write(new Date().toISOString())</script>
</div>
<div class="message">
<strong>Recommended Actions:</strong><br>
1. Implement proper input validation<br>
2. Use Content Security Policy (CSP)<br>
3. Sanitize all user inputs<br>
4. Apply output encoding
</div>
<a href="#" class="button">Contact Security Team</a>
<div class="footer">Security assessment performed by authorized personnel</div>
</div>
</body></html>`
    },
    {
      id: 6,
      name: "Matrix Style",
      description: "Green rain effect with Matrix movie theme",
      style: 'classic',
      preview: "Falling green characters on black background",
      template: `<html><head><title>The Matrix Has You</title><style>
body{margin:0;padding:0;background:#000;color:#0f0;font-family:monospace;overflow:hidden;height:100vh;}
canvas{position:absolute;top:0;left:0;}
.content{position:relative;z-index:2;text-align:center;top:50%;transform:translateY(-50%);}
.title{font-size:48px;text-shadow:0 0 20px #0f0;margin:20px 0;animation:pulse 3s infinite;}
.message{font-size:20px;margin:15px 0;opacity:0.8;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
.wake-up{font-size:24px;color:#ff0040;text-shadow:0 0 10px #ff0040;margin:30px 0;animation:blink 1s infinite;}
@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}
</style></head><body>
<canvas id="matrix"></canvas>
<div class="content">
<div class="title">THE MATRIX HAS YOU...</div>
<div class="message">Following the white rabbit led to an XSS vulnerability</div>
<div class="message">Your reality has been compromised</div>
<div class="wake-up">WAKE UP, NEO</div>
<div class="message">XSS injection successful - <script>document.write(new Date().toLocaleTimeString())</script></div>
</div>
<script>
const canvas=document.getElementById('matrix');
const ctx=canvas.getContext('2d');
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()';
const lettersArray=letters.split('');
const fontSize=10;
const columns=canvas.width/fontSize;
const drops=[];
for(let x=0;x<columns;x++)drops[x]=1;
function draw(){
ctx.fillStyle='rgba(0,0,0,0.05)';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle='#0F0';
ctx.font=fontSize+'px monospace';
for(let i=0;i<drops.length;i++){
const text=lettersArray[Math.floor(Math.random()*lettersArray.length)];
ctx.fillText(text,i*fontSize,drops[i]*fontSize);
if(drops[i]*fontSize>canvas.height&&Math.random()>0.975)drops[i]=0;
drops[i]++;
}
}
setInterval(draw,35);
</script>
</body></html>`
    },
    {
      id: 7,
      name: "Skull Warning",
      description: "Dark themed page with skull imagery and warnings",
      style: 'classic',
      preview: "Gothic style with skull animations",
      template: `<html><head><title>Access Denied</title><style>
body{background:radial-gradient(circle,#1a0000,#000);color:#ff6b6b;font-family:'Courier New',monospace;text-align:center;padding:20px;min-height:100vh;display:flex;flex-direction:column;justify-content:center;}
.skull-container{font-size:120px;margin:30px 0;animation:float 3s ease-in-out infinite;}
@keyframes float{0%,100%{transform:translateY(0px)}50%{transform:translateY(-20px)}}
.title{font-size:40px;color:#ff0000;text-shadow:3px 3px 6px #000;margin:20px 0;letter-spacing:4px;}
.warning{font-size:24px;color:#ffff00;background:rgba(255,0,0,0.2);padding:20px;border:2px solid #ff0000;margin:20px auto;max-width:600px;animation:pulse-border 2s infinite;}
@keyframes pulse-border{0%{border-color:#ff0000}50%{border-color:#ffff00}100%{border-color:#ff0000}}
.message{font-size:18px;margin:15px 0;color:#ccc;}
.footer{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);font-size:14px;color:#666;}
.blood{color:#8b0000;font-weight:bold;}
</style></head><body>
<div class="skull-container">💀</div>
<div class="title">DANGER ZONE</div>
<div class="warning">
⚠️ UNAUTHORIZED ACCESS DETECTED ⚠️<br>
XSS VULNERABILITY EXPLOITED
</div>
<div class="message">Your system has been <span class="blood">COMPROMISED</span></div>
<div class="message">Security barriers have been bypassed</div>
<div class="message">All activities are being logged</div>
<div class="footer">
Breach detected at: <script>document.write(new Date().toString())</script><br>
Status: <span class="blood">CRITICAL</span>
</div>
<script>
document.addEventListener('click', function() { 
alert('Access Denied - System Compromised via XSS'); 
});
</script>
</body></html>`
    },
    {
      id: 8,
      name: "Minimal Clean",
      description: "Simple, clean design focusing on the message",
      style: 'minimal',
      preview: "Clean white design with red accents",
      template: `<html><head><title>Security Notice</title><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8f9fa;color:#333;line-height:1.6;}
.container{max-width:800px;margin:100px auto;padding:60px;background:#fff;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,0.1);}
.icon{font-size:64px;text-align:center;margin-bottom:30px;}
.title{font-size:36px;text-align:center;color:#e74c3c;margin-bottom:20px;font-weight:300;}
.subtitle{font-size:18px;text-align:center;color:#7f8c8d;margin-bottom:40px;}
.content{font-size:16px;margin-bottom:30px;}
.highlight{background:#fff5f5;border-left:4px solid #e74c3c;padding:20px;margin:20px 0;}
.code{background:#f1f2f6;padding:15px;border-radius:5px;font-family:monospace;font-size:14px;margin:15px 0;}
.footer{text-align:center;font-size:14px;color:#95a5a6;margin-top:40px;padding-top:20px;border-top:1px solid #ecf0f1;}
</style></head><body>
<div class="container">
<div class="icon">🔒</div>
<div class="title">Security Vulnerability Identified</div>
<div class="subtitle">Cross-Site Scripting (XSS) Attack Demonstration</div>
<div class="content">
This page demonstrates a successful XSS attack on your web application. The vulnerability allows attackers to inject malicious scripts that execute in users' browsers.
</div>
<div class="highlight">
<strong>Vulnerability Details:</strong><br>
• Type: Cross-Site Scripting (XSS)<br>
• Severity: High<br>
• Impact: Code execution in user's browser<br>
• Status: Successfully exploited
</div>
<div class="code">
Attack Vector: User input field<br>
Payload Type: JavaScript injection<br>
Execution Time: <script>document.write(new Date().toISOString())</script>
</div>
<div class="content">
<strong>Recommendations:</strong><br>
1. Implement proper input validation and sanitization<br>
2. Use Content Security Policy (CSP) headers<br>
3. Apply output encoding for user-generated content<br>
4. Regular security audits and penetration testing
</div>
<div class="footer">
This is a controlled security demonstration<br>
Performed by: [Security Researcher] | Report generated automatically
</div>
</div>
</body></html>`
    },
    {
      id: 9,
      name: "Cyber Neon",
      description: "Futuristic neon-styled defacement with animations",
      style: 'modern',
      preview: "Electric blue and pink neon effects",
      template: `<html><head><title>Cyber Breach</title><style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#000;color:#fff;font-family:'Orbitron',sans-serif;overflow:hidden;height:100vh;position:relative;}
.grid{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(90deg,transparent 0%,rgba(0,255,255,0.03) 50%,transparent 100%),linear-gradient(0deg,transparent 0%,rgba(255,0,255,0.03) 50%,transparent 100%);background-size:50px 50px;animation:gridMove 20s linear infinite;}
@keyframes gridMove{0%{transform:translate(0,0)}100%{transform:translate(50px,50px)}}
.container{position:relative;z-index:2;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;}
.title{font-size:72px;font-weight:900;background:linear-gradient(45deg,#00ffff,#ff00ff,#ffff00,#00ffff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:300% 300%;animation:gradientShift 3s ease-in-out infinite,neonGlow 2s ease-in-out infinite alternate;text-shadow:0 0 30px #00ffff;}
@keyframes gradientShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes neonGlow{from{filter:drop-shadow(0 0 20px #00ffff)}to{filter:drop-shadow(0 0 40px #ff00ff)}}
.subtitle{font-size:24px;margin:20px 0;color:#00ffff;text-shadow:0 0 15px #00ffff;animation:pulse 2s infinite;}
.message{font-size:16px;margin:10px 0;color:#ccc;opacity:0.8;}
.hacker-name{color:#ff00ff;font-weight:bold;text-shadow:0 0 15px #ff00ff;}
.warning{border:2px solid #ffff00;padding:20px;margin:30px 0;background:rgba(255,255,0,0.1);color:#ffff00;text-shadow:0 0 10px #ffff00;animation:warningPulse 1.5s infinite;}
@keyframes warningPulse{0%,100%{box-shadow:0 0 20px rgba(255,255,0,0.5)}50%{box-shadow:0 0 40px rgba(255,255,0,0.8)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}
.footer{position:absolute;bottom:20px;font-size:14px;color:#666;}
</style></head><body>
<div class="grid"></div>
<div class="container">
<div class="title">CYBER BREACH</div>
<div class="subtitle">NEURAL NETWORK COMPROMISED</div>
<div class="message">System infiltration successful via XSS vulnerability</div>
<div class="message">Firewall bypassed • Security protocols disabled</div>
<div class="warning">
⚡ UNAUTHORIZED ACCESS GRANTED ⚡<br>
ADMINISTRATOR PRIVILEGES OBTAINED
</div>
<div class="message">Breach executed by: <span class="hacker-name">[HACKER_NAME]</span></div>
</div>
<div class="footer">Timestamp: <script>document.write(new Date().toISOString())</script></div>
<script>
setInterval(()=>{
document.body.style.background = Math.random()>0.95 ? 'linear-gradient(45deg,#000,#001122,#000)' : '#000';
},200);
</script>
</body></html>`
    },
    {
      id: 10,
      name: "Dark Web Terminal",
      description: "Underground hacker style with terminal aesthetics",
      style: 'classic',
      preview: "Dark terminal with green text and ASCII art",
      template: `<html><head><title>DarkNet Access</title><style>
@import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
body{background:#0a0a0a;color:#00ff41;font-family:'Courier Prime',monospace;padding:20px;line-height:1.4;overflow-x:auto;}
.terminal{background:#111;border:2px solid #00ff41;border-radius:8px;padding:20px;box-shadow:0 0 30px rgba(0,255,65,0.3);max-width:1000px;margin:0 auto;}
.prompt{color:#00ff41;margin-bottom:10px;}
.output{margin-bottom:15px;white-space:pre-line;}
.ascii-art{font-size:12px;line-height:1;color:#00ff41;text-shadow:0 0 10px #00ff41;margin:20px 0;}
.warning{background:rgba(255,0,0,0.1);border:1px solid #ff0040;padding:15px;margin:20px 0;color:#ff0040;text-shadow:0 0 10px #ff0040;}
.hacker-info{color:#ffff00;text-shadow:0 0 10px #ffff00;}
.blinking{animation:blink 1s infinite;}
@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}
.status{color:#00ff41;background:rgba(0,255,65,0.1);padding:5px;display:inline-block;margin:5px 0;}
</style></head><body>
<div class="terminal">
<div class="prompt">darknet@anonymous:~$ exploit --target=website --method=xss</div>
<div class="output">Initializing XSS payload injection...
Scanning for vulnerabilities...
[████████████████████████████████████████] 100%
Vulnerability found: Reflected XSS
</div>
<div class="ascii-art">    ▓█████▄  ▄▄▄       ██▀███   ██ ▄█▀    ███▄    █ ▓█████▄▄▄█████▓
    ▒██▀ ██▌▒████▄    ▓██ ▒ ██▒ ██▄█▒     ██ ▀█   █ ▓█   ▀▓  ██▒ ▓▒
    ░██   █▌▒██  ▀█▄  ▓██ ░▄█ ▒▓███▄░    ▓██  ▀█ ██▒▒███  ▒ ▓██░ ▒░
    ░▓█▄   ▌░██▄▄▄▄██ ▒██▀▀█▄  ▓██ █▄    ▓██▒  ▐▌██▒▒▓█  ▄░ ▓██▓ ░ 
    ░▒████▓  ▓█   ▓██▒░██▓ ▒██▒▒██▒ █▄   ▒██░   ▓██░░▒████▒ ▒██▒ ░ 
     ▒▒▓  ▒  ▒▒   ▓▒█░░ ▒▓ ░▒▓░▒ ▒▒ ▓▒   ░ ▒░   ▒ ▒ ░░ ▒░ ░ ▒ ░░   
     ░ ▒  ▒   ▒   ▒▒ ░  ░▒ ░ ▒░░ ░▒ ▒░   ░ ░░   ░ ▒░ ░ ░  ░   ░    
     ░ ░  ░   ░   ▒     ░░   ░ ░ ░░ ░       ░   ░ ░    ░    ░      
       ░          ░  ░   ░     ░  ░               ░    ░  ░        </div>
<div class="status">[SUCCESS] XSS PAYLOAD EXECUTED SUCCESSFULLY</div>
<div class="output">darknet@anonymous:~$ whoami
<span class="hacker-info">[HACKER_NAME] - Elite Security Researcher</span>

darknet@anonymous:~$ cat /proc/exploit_info
Target: Website Security Assessment
Method: Cross-Site Scripting (XSS)
Status: COMPROMISED
Access Level: CLIENT-SIDE CODE EXECUTION

darknet@anonymous:~$ echo "Mission accomplished"
Mission accomplished
</div>
<div class="warning">
⚠️  SECURITY BREACH DETECTED  ⚠️
Unauthorized script execution confirmed
System integrity compromised
</div>
<div class="output">darknet@anonymous:~$ date
<script>document.write(new Date().toString())</script>

darknet@anonymous:~$ <span class="blinking">_</span></div>
</div>
</body></html>`
    },
    {
      id: 11,
      name: "Retro Synthwave",
      description: "80s-style retro hacker aesthetic with synthwave colors",
      style: 'classic',
      preview: "Purple and pink retro synthwave design",
      template: `<html><head><title>Retrowave Hack</title><style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
*{margin:0;padding:0;box-sizing:border-box;}
body{background:linear-gradient(135deg,#0f0f23 0%,#1a0033 50%,#330066 100%);color:#fff;font-family:'Orbitron',sans-serif;min-height:100vh;overflow:hidden;position:relative;}
.scanlines{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(transparent 50%,rgba(255,0,128,0.03) 50%);background-size:100% 4px;animation:scanlines 0.1s linear infinite;pointer-events:none;}
@keyframes scanlines{0%{transform:translateY(0)}100%{transform:translateY(4px)}}
.grid{position:absolute;top:0;left:0;width:100%;height:100%;background-image:linear-gradient(rgba(255,0,128,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,0,128,0.1) 1px,transparent 1px);background-size:50px 50px;animation:gridMove 10s linear infinite;}
@keyframes gridMove{0%{transform:translate(0,0)}100%{transform:translate(50px,50px)}}
.container{position:relative;z-index:2;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:20px;}
.title{font-size:64px;font-weight:900;background:linear-gradient(45deg,#ff0080,#00ffff,#8000ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% 200%;animation:retroGlow 3s ease-in-out infinite;text-shadow:0 0 20px #ff0080,0 0 40px #ff0080;}
@keyframes retroGlow{0%,100%{background-position:0% 50%;filter:drop-shadow(0 0 20px #ff0080)}50%{background-position:100% 50%;filter:drop-shadow(0 0 20px #00ffff)}}
.subtitle{font-size:28px;color:#00ffff;text-shadow:0 0 15px #00ffff;margin:20px 0;animation:pulse 2s infinite;}
.message{font-size:18px;margin:15px 0;color:#ff0080;text-shadow:0 0 10px #ff0080;}
.hack-info{background:rgba(255,0,128,0.1);border:2px solid #ff0080;padding:20px;margin:30px 0;border-radius:10px;box-shadow:0 0 30px rgba(255,0,128,0.3);}
.hacker{color:#00ffff;font-weight:bold;text-shadow:0 0 15px #00ffff;}
.warning{color:#ffff00;text-shadow:0 0 15px #ffff00;animation:flashWarning 1s infinite;}
@keyframes flashWarning{0%,100%{opacity:1}50%{opacity:0.3}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}
.footer{position:absolute;bottom:20px;font-size:14px;color:#8000ff;text-shadow:0 0 10px #8000ff;}
</style></head><body>
<div class="scanlines"></div>
<div class="grid"></div>
<div class="container">
<div class="title">RETROWAVE HACK</div>
<div class="subtitle">█ SYSTEM BREACHED █</div>
<div class="message">Welcome to the neon underground</div>
<div class="hack-info">
<div class="warning">⚡ XSS VULNERABILITY EXPLOITED ⚡</div>
<br>
<div>Target infiltrated successfully</div>
<div>Neural pathways compromised</div>
<div>Digital consciousness uploaded</div>
<br>
<div>Executed by: <span class="hacker">[HACKER_NAME]</span></div>
<div>Skill Level: █████████░ 90%</div>
</div>
<div class="message">The future is now, and security is an illusion</div>
</div>
<div class="footer">Nexus timestamp: <script>document.write(new Date().toISOString())</script></div>
<script>
setInterval(()=>{
if(Math.random()>0.97){
document.body.style.filter='hue-rotate(45deg) brightness(1.2)';
setTimeout(()=>document.body.style.filter='none',100);
}
},100);
</script>
</body></html>`
    },
    {
      id: 12,
      name: "Virus Alert",
      description: "Fake antivirus warning style defacement",
      style: 'modern',
      preview: "Red warning alerts with virus-style messaging",
      template: `<html><head><title>VIRUS DETECTED</title><style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#1a0000;color:#fff;font-family:'Arial',sans-serif;overflow:hidden;}
.warning-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle,#330000,#1a0000);z-index:1000;}
.virus-alert{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;border:3px solid #ff0000;background:linear-gradient(45deg,#330000,#1a0000);padding:40px;border-radius:15px;box-shadow:0 0 50px #ff0000;animation:alertShake 0.5s infinite;}
@keyframes alertShake{0%,100%{transform:translate(-50%,-50%)}25%{transform:translate(-52%,-48%)}75%{transform:translate(-48%,-52%)}}
.virus-icon{font-size:80px;color:#ff0000;animation:virusPulse 1s infinite;margin-bottom:20px;}
@keyframes virusPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.alert-title{font-size:36px;color:#ff0000;font-weight:bold;margin-bottom:15px;text-shadow:0 0 20px #ff0000;animation:textFlicker 0.3s infinite;}
@keyframes textFlicker{0%,100%{opacity:1}50%{opacity:0.8}}
.alert-message{font-size:18px;color:#ffff00;margin:10px 0;text-shadow:0 0 10px #ffff00;}
.virus-info{background:rgba(255,0,0,0.2);border:2px solid #ff0000;padding:20px;margin:20px 0;border-radius:10px;}
.scanning{font-size:16px;color:#00ff00;margin:15px 0;font-family:monospace;}
.progress-bar{width:100%;height:20px;background:#333;border:2px solid #ff0000;border-radius:10px;overflow:hidden;margin:15px 0;}
.progress-fill{height:100%;background:linear-gradient(90deg,#ff0000,#ff6600);width:87%;animation:progressUpdate 3s ease-in-out infinite;}
@keyframes progressUpdate{0%{width:0%}100%{width:87%}}
.hacker-credit{color:#00ff00;font-weight:bold;text-shadow:0 0 10px #00ff00;}
.warning-text{color:#ff0000;font-weight:bold;animation:warningBlink 1s infinite;}
@keyframes warningBlink{0%,100%{opacity:1}50%{opacity:0.3}}
</style></head><body>
<div class="warning-overlay">
<div class="virus-alert">
<div class="virus-icon">🦠</div>
<div class="alert-title">CRITICAL VIRUS DETECTED!</div>
<div class="alert-message">Your system has been compromised!</div>
<div class="virus-info">
<div class="warning-text">⚠️ IMMEDIATE ACTION REQUIRED ⚠️</div>
<div class="scanning">Scanning system... Threats found: 47</div>
<div class="progress-bar">
<div class="progress-fill"></div>
</div>
<div>Malware Type: XSS Injection Trojan</div>
<div>Severity Level: CRITICAL</div>
<div>Files Infected: 1,247</div>
<div>Data at Risk: ALL PERSONAL FILES</div>
</div>
<div class="alert-message">This is actually an XSS vulnerability demonstration</div>
<div class="alert-message">Your web application is not properly sanitizing inputs</div>
<div class="alert-message">Security audit by: <span class="hacker-credit">[HACKER_NAME]</span></div>
<div class="alert-message">Timestamp: <script>document.write(new Date().toLocaleString())</script></div>
</div>
</div>
<script>
setInterval(()=>{
document.body.style.backgroundColor = Math.random()>0.9 ? '#330000' : '#1a0000';
},200);
</script>
</body></html>`
    }
  ];

  const copyToClipboard = (text: string, templateName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Template copied",
        description: `${templateName} template copied to clipboard`,
      });
    });
  };

  const toggleTemplateVisibility = (id: number) => {
    setShowTemplate(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePreview = (id: number) => {
    setPreviewMode(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateTemplate = (id: number, newTemplate: string) => {
    setEditableTemplates(prev => ({ ...prev, [id]: newTemplate }));
  };

  const getCurrentTemplate = (template: DefaceTemplate) => {
    const templateContent = editableTemplates[template.id] || template.template;
    return templateContent.replace(/\[HACKER_NAME\]/g, userName);
  };

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'classic': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'modern': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
      case 'minimal': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      case 'glitch': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'professional': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Name Input Section */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center">
            <User className="h-4 w-4 mr-2 text-cyan-400" />
            Personalize Templates
          </CardTitle>
          <CardDescription className="text-gray-300">
            Enter your hacker handle to personalize all defacement templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value || 'Anonymous Hacker')}
            placeholder="Enter your hacker name..."
            className="bg-black/50 border-gray-600 text-white placeholder:text-gray-400"
          />
          <p className="text-xs text-gray-400 mt-2">
            This name will replace [HACKER_NAME] in all templates
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.id} className="bg-gray-900/50 border-gray-700 hover:border-red-500/50 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-white flex items-center">
                  <Skull className="h-4 w-4 mr-2 text-red-400" />
                  {template.name}
                </CardTitle>
                <div className={`text-xs px-2 py-1 rounded border ${getStyleColor(template.style)}`}>
                  {template.style.toUpperCase()}
                </div>
              </div>
              <CardDescription className="text-gray-300 text-sm">
                {template.description}
              </CardDescription>
              <div className="text-xs text-gray-400 italic">
                Preview: {template.preview}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {previewMode[template.id] ? (
                <div className="bg-white rounded border min-h-[200px] relative">
                  <iframe
                    srcDoc={getCurrentTemplate(template)}
                    className="w-full h-[300px] border-0 rounded"
                    title={`Preview of ${template.name}`}
                    sandbox="allow-scripts"
                  />
                </div>
              ) : (
                <div className="relative">
                  <Textarea
                    value={showTemplate[template.id] ? getCurrentTemplate(template) : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
                    onChange={(e) => updateTemplate(template.id, e.target.value)}
                    className="bg-black/50 border-gray-600 text-red-100 font-mono text-xs min-h-[150px] resize-vertical"
                    placeholder="Defacement template HTML..."
                    readOnly={!showTemplate[template.id]}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-gray-700"
                    onClick={() => toggleTemplateVisibility(template.id)}
                  >
                    {showTemplate[template.id] ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(getCurrentTemplate(template), template.name)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Template
                </Button>
                <Button
                  onClick={() => togglePreview(template.id)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  size="sm"
                >
                  {previewMode[template.id] ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => updateTemplate(template.id, template.template)}
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

      <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mt-8">
        <div className="flex items-center text-yellow-400 mb-2">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span className="font-semibold">Important Security Notice</span>
        </div>
        <p className="text-yellow-100 text-sm leading-relaxed">
          These templates are designed for authorized security testing and educational purposes only. 
          Using these on websites without explicit permission is illegal and unethical. Always ensure 
          you have proper authorization before conducting any security tests.
        </p>
      </div>
    </div>
  );
};

export default DefaceTemplates;
