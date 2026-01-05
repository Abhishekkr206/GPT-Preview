import React from 'react';
import { 
  Code2, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Eye, 
  Layers, 
  Terminal,
  Github,
  Twitter
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-slate-100">
      
      {/* Navbar */}
      <nav className="fixed w-full border-b border-slate-100 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-black text-white p-1 rounded">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span>GPT Preview</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#concept" className="hover:text-black transition-colors">The Concept</a>
            <a href="#how-it-works" className="hover:text-black transition-colors">How it Works</a>
            <a href="#security" className="hover:text-black transition-colors">Security</a>
          </div>
          <button className="bg-black text-white sm:px-5 py-2 px-3 sm:py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-all">
            Add to Chrome
          </button>
        </div>
      </nav>

      {/* Hero Section - NOW FULL SCREEN */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-16 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            v1.5 is now live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-950">
            See your code <br />
            <span className="text-slate-400">come to life.</span>
          </h1>
          
          <p className="text-md md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            The bridge between ChatGPT's static code blocks and a live execution environment. 
            Preview HTML, CSS, and JS instantly without copy-pasting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="">
                <button className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                  Install Extension <ArrowRight className="w-4 h-4" />
                </button>
            </a>
            <a href="https://github.com/Abhishekkr206/GPT-Preview">
                <button className="flex items-center gap-2 px-8 py-3 rounded-lg font-medium text-slate-600 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200">
                  View on GitHub
                 </button>
            </a>
          </div>
        </div>

        {/* Scroll Indicator (Optional, helps visual balance) */}
        <div className="absolute bottom-10 animate-bounce text-slate-300">
            <ArrowRight className="w-6 h-6 rotate-90" />
        </div>
      </section>

      {/* The Visual Metaphor (The Bridge) */}
      <section id="concept" className="py-24 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">The Core Concept: <br/>The Bridge</h2>
              <p className="text-slate-600 leading-relaxed">
                Think of ChatGPT as a secure prison. It has code inside it, but that code is just "dead text." 
                You cannot run it there because of security restrictions.
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong>GPT Preview</strong> acts as a delivery truck. It sits inside the browser, 
                grabs that dead text, and smuggles it out to our "Preview Sandbox" where it can finally come alive.
              </p>
              <ul className="space-y-3 pt-4">
                {['Secure Extraction', 'One-Click Transport', 'Isolated Execution'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-green-600">
                      <ShieldCheck className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Visual Representation */}
            <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-200 to-slate-100 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-auto text-xs text-slate-400">ChatGPT Interface</div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                  <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg relative overflow-hidden group/code">
                  <div className="text-xs text-slate-400 font-mono mb-2">index.html</div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-full bg-slate-700 rounded opacity-50"></div>
                    <div className="h-1.5 w-2/3 bg-slate-700 rounded opacity-50"></div>
                    <div className="h-1.5 w-4/5 bg-slate-700 rounded opacity-50"></div>
                  </div>
                  <div className="absolute top-3 right-3 bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded shadow-lg flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform">
                    <Eye className="w-3 h-3" /> GPT Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features (The 3 Jobs) */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-4">What the Extension Actually Does</h2>
            <p className="text-slate-500">The extension is not the previewer. The extension is the delivery truck. It performs three specific jobs to get your code from A to B.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Job A */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-slate-900 border border-slate-200">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Job A: The Injection</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                ChatGPT doesn't have a "Preview" button. We force one in. It scans the HTML for code blocks and injects a sleek UI button that looks like a native feature.
              </p>
            </div>

            {/* Job B */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-slate-900 border border-slate-200">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Job B: The Scraper</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                When clicked, the extension wakes up. It identifies the language (HTML/CSS/JS) and extracts the text content. No highlighting or copy-pasting required.
              </p>
            </div>

            {/* Job C */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 text-slate-900 border border-slate-200">
                <ExternalLink className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Job C: The Dispatcher</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Since running code locally is unsafe, the extension packages it into a JSON object and dispatches it to our secure sandbox website for execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Secret Sauce (Security) */}
      <section id="security" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
            <Terminal className="w-3 h-3" /> The Secret Sauce
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why separation matters.
          </h2>
          
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Most beginners try to run code inside the extension popup. That is a bad idea.
            By using the extension only to transport code to a separate sandbox website, 
            we separate the <strong>Source</strong> (ChatGPT) from the <strong>Execution</strong> (GPT Preview).
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-6 text-left">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-red-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> The Risk
              </div>
              <p className="text-sm text-slate-400">Running user code directly in the extension can trigger viruses or break the ChatGPT layout styles.</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-green-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> The Solution
              </div>
              <p className="text-sm text-slate-400">Our architecture isolates the code on a remote URL, ensuring your browser remains 100% safe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between md:items-center gap-4">
                    
            {/* TOP ROW: Logo (Left) + GitHub (Right on Mobile) */}
            <div className="flex justify-between items-center w-full md:w-auto">
              <div className="flex items-center gap-2 font-bold text-lg text-slate-900">
                <div className="bg-black text-white p-1 rounded">
                  <Eye className="w-4 h-4" />
                </div>
                <span>GPT Preview</span>
              </div>
                    
              {/* GitHub Icon - Visible here ONLY on Mobile to save space */}
              <a 
                href="https://github.com/Abhishekkr206/GPT-Preview" 
                className="md:hidden text-slate-400 hover:text-slate-900 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
                    
            {/* BOTTOM ROW: Developer Badge + Copyright */}
            <div className="flex flex-row-reverse md:flex-row justify-between md:justify-end items-center gap-4 text-sm text-slate-500 w-full md:w-auto">
                    
              {/* Developer Badge */}
              <a 
                href="https://x.com/Abhishek_kr28" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1.5 hover:text-slate-900 transition-colors px-3 py-1 bg-slate-50 rounded-full border border-slate-100"
              >
                <span className="text-xs font-medium">Developed by</span>
                <span className="font-semibold text-slate-900">@Abhishek</span>
              </a>
                    
              {/* Copyright */}
              <span className="text-xs md:text-sm">© 2024</span>
            </div>
                    
            {/* GitHub Icon - Visible here ONLY on Desktop */}
            <div className="hidden md:flex gap-6">
              <a 
                href="https://github.com/Abhishekkr206/GPT-Preview" 
                className="text-slate-400 hover:text-slate-900 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
    </div>
  );
};

export default LandingPage;