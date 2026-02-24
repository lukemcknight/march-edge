Landing Page:
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>BracketBrain - AI Powered Bracket Builder</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Theme Configuration -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        primary: "#ff6933",
                        "background-light": "#f8f6f5",
                        "background-dark": "#0f172a", // Deep navy/charcoal as requested
                        "surface-dark": "#1e293b", // Slightly lighter for cards
                    },
                    fontFamily: {
                        display: ["Inter", "sans-serif"],
                        sans: ["Inter", "sans-serif"],
                    },
                    borderRadius: {
                        "DEFAULT": "0.375rem", // rounded-md
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "2xl": "1rem",
                    },
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Inter', sans-serif;
        }
        /* Gradient Text Utility */
        .text-gradient {
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-image: linear-gradient(to right, #ff6933, #ff9470);
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden">
<div class="relative flex flex-col min-h-screen w-full">
<!-- Navbar -->
<header class="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex items-center justify-between h-16">
<!-- Logo -->
<div class="flex items-center gap-2">
<div class="text-primary">
<span class="material-symbols-outlined text-3xl">psychology</span>
</div>
<h1 class="text-xl font-black tracking-tighter uppercase dark:text-white">Bracket<span class="text-primary">Brain</span></h1>
</div>
<!-- Desktop Nav -->
<nav class="hidden md:flex gap-8">
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Features</a>
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Pricing</a>
<a class="text-sm font-medium hover:text-primary transition-colors" href="#">Methodology</a>
</nav>
<!-- Actions -->
<div class="flex items-center gap-3">
<button class="hidden sm:flex items-center justify-center px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 bg-transparent hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors">
                            Log In
                        </button>
<button class="flex items-center justify-center px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-md shadow-lg shadow-primary/25 transition-all transform hover:scale-105">
                            Build My Bracket
                        </button>
</div>
</div>
</div>
</header>
<!-- Main Content Area -->
<main class="flex-grow">
<!-- Hero Section -->
<section class="relative pt-12 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
<!-- Background decorative elements -->
<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
<div class="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl mix-blend-screen"></div>
<div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl mix-blend-screen"></div>
</div>
<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
<!-- Hero Content -->
<div class="flex-1 text-center lg:text-left z-10">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-dark border border-slate-700 mb-6">
<span class="relative flex h-2 w-2">
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
<span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
</span>
<span class="text-xs font-semibold text-slate-300 uppercase tracking-wider">Tournament Mode Active</span>
</div>
<h1 class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-white">
                            Dominate March with <span class="text-gradient">AI Precision</span>
</h1>
<p class="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                            Stop guessing. BracketBrain analyzes 10,000+ simulations per matchup to build the perfect bracket optimized for your specific pool size and scoring rules.
                        </p>
<div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
<button class="flex items-center justify-center h-12 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-md transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 text-lg">
<span class="material-symbols-outlined mr-2">smart_toy</span>
                                Build My Bracket
                            </button>
<button class="flex items-center justify-center h-12 px-8 bg-surface-dark border border-slate-700 hover:border-slate-500 text-white font-bold rounded-md transition-all text-lg">
                                View Demo
                            </button>
</div>
<div class="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium">
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
<span>Data updated hourly</span>
</div>
<div class="flex items-center gap-1">
<span class="material-symbols-outlined text-green-500 text-lg">check_circle</span>
<span>ESPN &amp; Yahoo Compatible</span>
</div>
</div>
</div>
<!-- Hero Visual / Dashboard Preview -->
<div class="flex-1 w-full max-w-[600px] lg:max-w-none perspective-1000 relative">
<div class="relative bg-surface-dark border border-slate-700 rounded-xl shadow-2xl overflow-hidden transform rotate-y-6 hover:rotate-y-0 transition-transform duration-700 ease-out group">
<!-- Header of Card -->
<div class="px-4 py-3 border-b border-slate-700 bg-slate-900/50 flex items-center justify-between">
<div class="flex gap-1.5">
<div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
<div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
<div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
</div>
<div class="text-xs font-mono text-slate-500">simulation_v4.2.0_running...</div>
</div>
<!-- Card Content - Abstract Bracket Visualization -->
<div class="p-6 relative bg-gradient-to-br from-surface-dark to-slate-900">
<!-- Abstract Bracket Lines -->
<div class="absolute inset-0 opacity-10 bg-[radial-gradient(#ff6933_1px,transparent_1px)] [background-size:16px_16px]"></div>
<div class="relative z-10 flex flex-col gap-6">
<div class="flex items-center justify-between">
<div>
<p class="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Projected Champion</p>
<div class="flex items-center gap-3">
<div class="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-900 font-black text-xl">H</div>
<div>
<p class="text-white font-bold text-xl">Houston</p>
<p class="text-primary text-sm font-bold">98.4 AI Score</p>
</div>
</div>
</div>
<div class="text-right">
<p class="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Win Probability</p>
<p class="text-3xl font-black text-white">24.8%</p>
<p class="text-green-500 text-xs font-bold">+2.4% vs Field</p>
</div>
</div>
<!-- Mini Matchup Visual -->
<div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 backdrop-blur-sm">
<div class="flex justify-between items-center mb-2">
<span class="text-xs font-bold text-slate-400">FINAL FOUR PREDICTION</span>
<span class="text-xs font-bold text-primary animate-pulse">LIVE</span>
</div>
<div class="flex items-center justify-between gap-4">
<div class="flex-1 text-center">
<div class="text-lg font-bold text-white">UCONN</div>
<div class="text-xs text-slate-400">#1 Seed</div>
</div>
<div class="flex flex-col items-center px-4">
<span class="text-xs font-bold text-slate-500">VS</span>
<div class="h-px w-12 bg-slate-600 my-2"></div>
<span class="text-xs font-bold text-primary">52% / 48%</span>
</div>
<div class="flex-1 text-center">
<div class="text-lg font-bold text-white">PURDUE</div>
<div class="text-xs text-slate-400">#1 Seed</div>
</div>
</div>
<!-- Probability Bar -->
<div class="mt-3 h-2 w-full bg-slate-700 rounded-full overflow-hidden flex">
<div class="h-full bg-primary w-[52%]"></div>
<div class="h-full bg-slate-500 w-[48%]"></div>
</div>
</div>
</div>
</div>
</div>
<!-- Floating decorative elements behind card -->
<div class="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/20 rounded-full blur-xl -z-10"></div>
</div>
</div>
</section>
<!-- Pre-Tournament Insights Grid -->
<section class="py-16 bg-slate-900/50 border-y border-slate-800">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="flex items-center justify-between mb-10">
<div>
<h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Pre-Tournament Insights</h2>
<p class="text-slate-400 mt-1">Real-time analysis based on efficiency metrics and injury reports.</p>
</div>
<a class="hidden sm:flex items-center text-primary font-bold hover:text-primary/80 transition-colors" href="#">
                            View All Data <span class="material-symbols-outlined ml-1">arrow_forward</span>
</a>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Card 1: Power Ranking -->
<div class="bg-surface-dark border border-slate-700 rounded-lg p-6 hover:border-primary/50 transition-colors group">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-slate-800 rounded-md text-slate-300 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined">leaderboard</span>
</div>
<span class="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">+2.4% Rise</span>
</div>
<h3 class="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Power Rankings Leader</h3>
<div class="flex items-baseline gap-2 mb-2">
<span class="text-3xl font-black text-white">Houston</span>
<span class="text-lg text-slate-500 font-medium">#1</span>
</div>
<p class="text-sm text-slate-300">
                                Adjusted offensive efficiency ranks 1st nationally. Defense holding opponents to <span class="text-white font-bold">57.2 PPG</span>.
                            </p>
<div class="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center text-sm">
<span class="text-slate-500">AI Trust Score</span>
<span class="font-bold text-white">98.4/100</span>
</div>
</div>
<!-- Card 2: Upset Alert -->
<div class="bg-surface-dark border border-slate-700 rounded-lg p-6 hover:border-primary/50 transition-colors group">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-slate-800 rounded-md text-slate-300 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined">warning</span>
</div>
<span class="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">High Risk</span>
</div>
<h3 class="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Upset Watch</h3>
<div class="flex items-baseline gap-2 mb-2">
<span class="text-3xl font-black text-white">#12 Seed</span>
<span class="text-lg text-slate-500 font-medium">vs #5</span>
</div>
<p class="text-sm text-slate-300">
                                64% win probability detected. Opponent struggles against zone defense which the #12 seed utilizes <span class="text-white font-bold">78% of possessions</span>.
                            </p>
<div class="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center text-sm">
<span class="text-slate-500">Spread Value</span>
<span class="font-bold text-primary">-5.1% Edge</span>
</div>
</div>
<!-- Card 3: Sleeper Pick -->
<div class="bg-surface-dark border border-slate-700 rounded-lg p-6 hover:border-primary/50 transition-colors group">
<div class="flex justify-between items-start mb-4">
<div class="p-2 bg-slate-800 rounded-md text-slate-300 group-hover:text-primary transition-colors">
<span class="material-symbols-outlined">visibility</span>
</div>
<span class="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded">Undervalued</span>
</div>
<h3 class="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Sleeper Pick</h3>
<div class="flex items-baseline gap-2 mb-2">
<span class="text-3xl font-black text-white">San Diego St.</span>
</div>
<p class="text-sm text-slate-300">
                                Currently projected as a #5 seed but performing like a #2. Deep bench rotation favors tournament endurance.
                            </p>
<div class="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center text-sm">
<span class="text-slate-500">ROI Potential</span>
<span class="font-bold text-green-500">+12%</span>
</div>
</div>
</div>
</div>
</section>
<!-- How It Works Section -->
<section class="py-20 lg:py-28 relative">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="text-center max-w-3xl mx-auto mb-16">
<h2 class="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">From Raw Data to <span class="text-primary">Perfect Bracket</span></h2>
<p class="text-slate-400 text-lg">We don't just flip coins. Our process involves three rigorous stages of data ingestion and neural processing.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
<!-- Connector Line (Desktop Only) -->
<div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-slate-700 via-primary to-slate-700 z-0"></div>
<!-- Step 1 -->
<div class="relative z-10 flex flex-col items-center text-center group">
<div class="w-24 h-24 rounded-2xl bg-surface-dark border border-slate-700 flex items-center justify-center mb-6 shadow-lg group-hover:border-primary transition-colors duration-300">
<span class="material-symbols-outlined text-4xl text-slate-300 group-hover:text-primary transition-colors">database</span>
</div>
<h3 class="text-xl font-bold text-white mb-2">1. Data Ingestion</h3>
<p class="text-slate-400 text-sm leading-relaxed px-4">
                                We scrape historical stats, player efficiency ratings (PER), and real-time injury reports from 50+ sources.
                            </p>
</div>
<!-- Step 2 -->
<div class="relative z-10 flex flex-col items-center text-center group">
<div class="w-24 h-24 rounded-2xl bg-surface-dark border border-slate-700 flex items-center justify-center mb-6 shadow-lg group-hover:border-primary transition-colors duration-300">
<span class="material-symbols-outlined text-4xl text-slate-300 group-hover:text-primary transition-colors">memory</span>
</div>
<h3 class="text-xl font-bold text-white mb-2">2. AI Processing</h3>
<p class="text-slate-400 text-sm leading-relaxed px-4">
                                Our proprietary neural network runs 10,000+ simulations for every possible matchup in the bracket.
                            </p>
</div>
<!-- Step 3 -->
<div class="relative z-10 flex flex-col items-center text-center group">
<div class="w-24 h-24 rounded-2xl bg-surface-dark border border-slate-700 flex items-center justify-center mb-6 shadow-lg group-hover:border-primary transition-colors duration-300">
<span class="material-symbols-outlined text-4xl text-slate-300 group-hover:text-primary transition-colors">emoji_events</span>
</div>
<h3 class="text-xl font-bold text-white mb-2">3. The Perfect Bracket</h3>
<p class="text-slate-400 text-sm leading-relaxed px-4">
                                You receive a customized bracket optimized specifically for your pool size and unique scoring rules.
                            </p>
</div>
</div>
</div>
</section>
<!-- Trust/CTA Section -->
<section class="py-20 border-t border-slate-800 bg-surface-dark/30">
<div class="max-w-4xl mx-auto px-4 text-center">
<h2 class="text-2xl font-bold text-white mb-8">Trusted by data enthusiasts from</h2>
<div class="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 mb-12">
<!-- Placeholder Logos using Text for simplicity but styled to look like logos -->
<div class="text-xl font-black text-slate-300">SBNATION</div>
<div class="text-xl font-black text-slate-300">THE ATHLETIC</div>
<div class="text-xl font-black text-slate-300">fivethirtyeight</div>
<div class="text-xl font-black text-slate-300">ESPN</div>
</div>
<div class="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 md:p-12 relative overflow-hidden">
<div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
<h2 class="text-3xl md:text-4xl font-black text-white mb-4 relative z-10">Ready to Win Your Pool?</h2>
<p class="text-slate-400 mb-8 max-w-lg mx-auto relative z-10">Join 50,000+ users who are building smarter brackets this season.</p>
<div class="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
<button class="flex items-center justify-center h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold rounded-md transition-all shadow-lg text-lg w-full sm:w-auto">
                                Start Building Free
                            </button>
</div>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="bg-background-dark border-t border-slate-800 pt-16 pb-8">
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
<div class="col-span-2 md:col-span-1">
<div class="flex items-center gap-2 mb-4">
<span class="material-symbols-outlined text-primary text-2xl">psychology</span>
<span class="text-lg font-black text-white">BracketBrain</span>
</div>
<p class="text-slate-500 text-sm">
                            The smartest way to build your March Madness bracket. Powered by machine learning and advanced analytics.
                        </p>
</div>
<div>
<h4 class="text-white font-bold mb-4">Product</h4>
<ul class="space-y-2 text-sm text-slate-400">
<li><a class="hover:text-primary transition-colors" href="#">Features</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Pricing</a></li>
<li><a class="hover:text-primary transition-colors" href="#">API Access</a></li>
</ul>
</div>
<div>
<h4 class="text-white font-bold mb-4">Resources</h4>
<ul class="space-y-2 text-sm text-slate-400">
<li><a class="hover:text-primary transition-colors" href="#">Methodology</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Blog</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Support</a></li>
</ul>
</div>
<div>
<h4 class="text-white font-bold mb-4">Legal</h4>
<ul class="space-y-2 text-sm text-slate-400">
<li><a class="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
<li><a class="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
</ul>
</div>
</div>
<div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
<p class="text-slate-600 text-xs text-center md:text-left">© 2024 BracketBrain Analytics. All rights reserved.</p>
<div class="flex gap-4">
<a class="text-slate-500 hover:text-white transition-colors" href="#"><span class="sr-only">Twitter</span>
<!-- Simple SVG Icon for social placeholder -->
<svg class="w-5 h-5" fill="currentColor" viewbox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
</a>
</div>
</div>
</div>
</footer>
</div>
</body></html>

<!-- Matchup Card Builder -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Matchup Card Builder - BracketAI</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script>
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary": "#ff6933",
              "background-light": "#f8f6f5",
              "background-dark": "#23140f",
            },
            fontFamily: {
              "display": ["Inter", "sans-serif"]
            },
            borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
            backgroundImage: {
               'mesh': "radial-gradient(at 0% 0%, hsla(25, 78%, 15%, 1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(25, 78%, 15%, 1) 0, transparent 50%)"
            }
          },
        },
      }
    </script>
<style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .material-symbols-outlined {
          font-variation-settings:
          'FILL' 0,
          'wght' 400,
          'GRAD' 0,
          'opsz' 24
        }
        .glass-panel {
            background: rgba(46, 29, 23, 0.4);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display selection:bg-primary selection:text-white">
<!-- Top Navigation -->
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#3a2c27] px-6 py-3 bg-white dark:bg-[#1a110d] sticky top-0 z-50">
<div class="flex items-center gap-8">
<div class="flex items-center gap-3 text-slate-900 dark:text-white">
<div class="size-8 text-primary">
<span class="material-symbols-outlined !text-3xl">sports_basketball</span>
</div>
<h2 class="text-xl font-bold leading-tight tracking-[-0.015em]">BracketAI</h2>
</div>
<nav class="hidden md:flex items-center gap-6">
<a class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">My Brackets</a>
<a class="text-primary text-sm font-medium" href="#">Analysis</a>
<a class="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors" href="#">Leaderboard</a>
</nav>
</div>
<div class="flex items-center gap-4">
<!-- Search -->
<div class="hidden md:flex items-center bg-slate-100 dark:bg-[#3a2c27] rounded-lg h-10 px-3 w-64 border border-transparent focus-within:border-primary transition-colors">
<span class="material-symbols-outlined text-slate-400">search</span>
<input class="bg-transparent border-none focus:ring-0 text-sm w-full text-slate-900 dark:text-white placeholder-slate-500" placeholder="Search teams..."/>
</div>
<button class="flex items-center justify-center size-10 rounded-lg hover:bg-slate-100 dark:hover:bg-[#3a2c27] text-slate-600 dark:text-slate-300 transition-colors relative">
<span class="material-symbols-outlined">notifications</span>
<span class="absolute top-2 right-2 size-2 bg-primary rounded-full"></span>
</button>
<div class="size-9 rounded-full bg-cover bg-center ring-2 ring-slate-200 dark:ring-[#3a2c27]" data-alt="User profile avatar" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_pzIJg_KKPXBaRUvd02Fk6cwe0rmK6ay6M0dy6aFTIVAeGzwvHzBQpvHScrOSwfq9epBrheZTQ8nkbJ3nqc3cqtPRTbEgxqTsBAGAVRbmnWAYwKX20nW78K2lvewKerHbFymsYW9sgTFT2DCD6f8A2KFeZRGXB9yn3fPC1RMPOI-KU-n0aPRQdc28-lUqlOJD6-yF9AQaXaLoQfe7yHcMPLw4U1efsCnppHvCyzAJP2ar793blU9ran-Gwx9p2R9rF0CDUzf-VA');"></div>
</div>
</header>
<!-- Main Content Area -->
<main class="flex-1 flex flex-col items-center w-full px-4 py-6 md:px-8 bg-mesh">
<div class="w-full max-w-7xl flex flex-col gap-6">
<!-- Tournament Header -->
<div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-slate-200 dark:border-[#3a2c27]/50">
<div>
<div class="flex items-center gap-2 mb-1">
<span class="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">East Region</span>
<span class="text-slate-500 dark:text-slate-400 text-xs font-medium">Matchup 4 of 32</span>
</div>
<h1 class="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Round of 64</h1>
</div>
<div class="flex flex-col gap-2 w-full md:w-64">
<div class="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
<span>Tournament Progress</span>
<span class="text-primary">12%</span>
</div>
<div class="h-2 w-full bg-slate-200 dark:bg-[#3a2c27] rounded-full overflow-hidden">
<div class="h-full bg-primary rounded-full" style="width: 12%"></div>
</div>
</div>
</div>
<!-- Matchup Area -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative">
<!-- Background Glow Effect behind Center -->
<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-primary/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
<!-- LEFT TEAM: DUKE -->
<div class="lg:col-span-4 flex flex-col">
<div class="glass-panel rounded-xl p-6 h-full flex flex-col gap-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
<!-- Decorative BG -->
<div class="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
<div class="flex items-center justify-between relative z-10">
<span class="bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white text-xs font-bold px-3 py-1 rounded-full">Seed #4</span>
<span class="text-slate-500 dark:text-slate-400 text-sm font-medium">24-6 (14-4 ACC)</span>
</div>
<div class="flex flex-col items-center text-center gap-4 relative z-10">
<div class="size-32 rounded-full bg-slate-100 dark:bg-[#1a110d] flex items-center justify-center p-4 shadow-lg shadow-blue-900/20 border border-slate-200 dark:border-white/5">
<img alt="Duke Logo" class="w-full h-auto object-contain" data-alt="Duke Blue Devils Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjEf07JItCVmexLEzS85Hd50HRvRezsoRKpfjfQnM3M39pcwCMUhB5goZapQF23nn4B7KgDHIlGBl6rCbjG2NbDTVxbSpmwtftpmscpDKEvYwuRJhaNVA0oO8u5F7Q3hMUZUQj-Ba0_55JjzQuDoCIGI-qz2b8R2bcAWRMVBd_NqMXCaqtn3Gl8AwlZiSWtJt46PICgxtd6d-P9ieEc6VMRMfex0HIu4tew3dcTkPEeHbvQiiHuAMcEF_6OaDfDQglq2aWaIpMGg"/>
</div>
<div>
<h2 class="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">Blue Devils</h2>
<p class="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm">Duke</p>
</div>
</div>
<div class="space-y-3 mt-auto relative z-10">
<div class="flex items-center justify-between p-3 rounded bg-slate-100/50 dark:bg-[#1a110d]/50">
<span class="text-sm text-slate-500 dark:text-slate-400">Points Per Game</span>
<div class="flex items-center gap-2">
<span class="font-bold text-slate-900 dark:text-white">79.8</span>
<span class="text-xs text-green-500 flex items-center"><span class="material-symbols-outlined text-[14px]">trending_up</span></span>
</div>
</div>
<div class="flex items-center justify-between p-3 rounded bg-slate-100/50 dark:bg-[#1a110d]/50">
<span class="text-sm text-slate-500 dark:text-slate-400">Rebounds</span>
<span class="font-bold text-slate-900 dark:text-white">36.2</span>
</div>
<div class="flex items-center justify-between p-3 rounded bg-slate-100/50 dark:bg-[#1a110d]/50">
<span class="text-sm text-slate-500 dark:text-slate-400">Def Efficiency</span>
<span class="font-bold text-slate-900 dark:text-white">94.1</span>
</div>
</div>
<button class="w-full mt-4 py-3 rounded-lg border-2 border-slate-200 dark:border-white/10 hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 font-bold text-slate-400 transition-colors flex items-center justify-center gap-2 group-hover:bg-blue-600/5">
<span>Pick Duke</span>
</button>
</div>
</div>
<!-- CENTER AI MODULE -->
<div class="lg:col-span-4 flex flex-col justify-center gap-6 py-4">
<!-- Score Prediction -->
<div class="text-center">
<p class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Predicted Score</p>
<div class="flex items-center justify-center gap-4 text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
<span class="text-primary drop-shadow-[0_0_15px_rgba(255,105,51,0.5)]">82</span>
<span class="text-slate-300 dark:text-[#3a2c27] text-2xl font-medium">-</span>
<span class="opacity-60">71</span>
</div>
</div>
<!-- Win Probability Bar -->
<div class="flex flex-col gap-2">
<div class="flex justify-between text-sm font-bold px-1">
<span class="text-primary">72%</span>
<span class="text-slate-400 dark:text-slate-600">28%</span>
</div>
<div class="h-4 w-full bg-[#1a110d] rounded-full flex overflow-hidden ring-1 ring-white/10">
<div class="h-full bg-gradient-to-r from-orange-600 to-primary w-[72%] relative">
<div class="absolute right-0 top-0 bottom-0 w-px bg-white/50 shadow-[0_0_10px_white]"></div>
</div>
<div class="h-full bg-slate-800 w-[28%]"></div>
</div>
<div class="text-center text-xs text-slate-500 mt-1">AI Win Probability Model v2.4</div>
</div>
<!-- Recommendation Card -->
<div class="bg-[#1a110d] border border-primary/30 rounded-xl p-5 relative shadow-[0_0_30px_rgba(255,105,51,0.1)]">
<!-- Badge -->
<div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
<span class="material-symbols-outlined text-[16px]">verified</span>
                            HIGH CONFIDENCE
                        </div>
<div class="mt-3 flex flex-col gap-3">
<div class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-0.5">psychology</span>
<div>
<h3 class="text-white font-bold text-sm mb-1">Recommendation: Duke -5.5</h3>
<p class="text-slate-400 text-sm leading-relaxed">
                                        Duke's defensive efficiency in the paint outperforms Oral Roberts' reliance on perimeter shooting. Historical data suggests #4 seeds cover 65% of the time against similar defensive matchups.
                                    </p>
</div>
</div>
</div>
</div>
<div class="flex justify-center">
<button class="text-slate-500 hover:text-white text-sm flex items-center gap-2 transition-colors">
<span class="material-symbols-outlined text-[18px]">tune</span>
                            Customize Simulation Parameters
                        </button>
</div>
</div>
<!-- RIGHT TEAM: ORAL ROBERTS -->
<div class="lg:col-span-4 flex flex-col">
<div class="glass-panel rounded-xl p-6 h-full flex flex-col gap-6 relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-300">
<!-- Decorative BG -->
<div class="absolute top-0 left-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl -ml-10 -mt-10"></div>
<div class="flex items-center justify-between relative z-10">
<span class="bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white text-xs font-bold px-3 py-1 rounded-full">Seed #13</span>
<span class="text-slate-500 dark:text-slate-400 text-sm font-medium">29-4 (18-0 Summit)</span>
</div>
<div class="flex flex-col items-center text-center gap-4 relative z-10">
<div class="size-32 rounded-full bg-slate-100 dark:bg-[#1a110d] flex items-center justify-center p-4 shadow-lg shadow-yellow-900/20 border border-slate-200 dark:border-white/5">
<img alt="Oral Roberts Logo" class="w-full h-auto object-contain" data-alt="Oral Roberts Golden Eagles Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhlu8x-LusijEcBYvUg5IKYRW8woBcieNMZmMekOiAUs1a6YM-776Y33hGOnX3CFZQ2dTUcYWoV9IJPE7RVRjMPmCZVFMOWlkE0bGMu_Rv5eZj6dD9Fwose8QBdqgg7RQufx8NYkQnRdhHxjQGI1u98PJ1GqsnDwLg2nJAIRNNk3_48QiMLr0KTcm4KVEiqjoC0jMqUV0TWx_JCmZb24PhSfLZHpdzr-d818EQqwSvZad58ESsnlu7tl5CsD18j59O6lWMVJ6IIg"/>
</div>
<div>
<h2 class="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">Golden Eagles</h2>
<p class="text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-widest text-sm">Oral Roberts</p>
</div>
</div>
<div class="space-y-3 mt-auto relative z-10">
<div class="flex items-center justify-between p-3 rounded bg-slate-100/50 dark:bg-[#1a110d]/50">
<span class="text-sm text-slate-500 dark:text-slate-400">Points Per Game</span>
<div class="flex items-center gap-2">
<span class="font-bold text-slate-900 dark:text-white">84.2</span>
<span class="text-xs text-green-500 flex items-center"><span class="material-symbols-outlined text-[14px]">trending_up</span></span>
</div>
</div>
<div class="flex items-center justify-between p-3 rounded bg-slate-100/50 dark:bg-[#1a110d]/50">
<span class="text-sm text-slate-500 dark:text-slate-400">Rebounds</span>
<span class="font-bold text-slate-900 dark:text-white">32.8</span>
</div>
<div class="flex items-center justify-between p-3 rounded bg-slate-100/50 dark:bg-[#1a110d]/50">
<span class="text-sm text-slate-500 dark:text-slate-400">Def Efficiency</span>
<span class="font-bold text-slate-900 dark:text-white">101.5</span>
</div>
</div>
<button class="w-full mt-4 py-3 rounded-lg border-2 border-slate-200 dark:border-white/10 hover:border-yellow-500 hover:text-yellow-600 dark:hover:border-yellow-500 dark:hover:text-yellow-400 font-bold text-slate-400 transition-colors flex items-center justify-center gap-2 group-hover:bg-yellow-500/5">
<span>Pick Oral Roberts</span>
</button>
</div>
</div>
</div>
<!-- Footer Action Bar -->
<div class="mt-4 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#1a110d] border border-slate-200 dark:border-white/5 shadow-xl">
<div class="flex items-center gap-4">
<div class="p-2 bg-slate-100 dark:bg-[#23140f] rounded-lg">
<span class="material-symbols-outlined text-slate-500">analytics</span>
</div>
<div>
<p class="text-sm font-bold text-slate-900 dark:text-white">Detailed Matchup Report</p>
<p class="text-xs text-slate-500">View head-to-head history and roster breakdown</p>
</div>
</div>
<div class="flex gap-3 w-full md:w-auto">
<button class="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                         Simulate Again
                     </button>
<button class="flex-1 md:flex-none px-8 py-2.5 rounded-lg bg-primary hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-900/20 transition-all transform active:scale-95 flex items-center justify-center gap-2">
                         Apply AI Pick
                         <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</main>
</body></html>

<!-- Bracket Overview Visualization -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Bracket Overview - BracketAI</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#ff6933",
                        "primary-dark": "#e55a2b",
                        "background-light": "#f8f6f5",
                        "background-dark": "#23140f",
                        "surface-dark": "#3a2c27",
                        "surface-darker": "#181210",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        /* Custom Scrollbar for the bracket container */
        .bracket-scroll::-webkit-scrollbar {
            height: 10px;
            width: 10px;
        }
        .bracket-scroll::-webkit-scrollbar-track {
            background: #23140f;
        }
        .bracket-scroll::-webkit-scrollbar-thumb {
            background: #3a2c27;
            border-radius: 5px;
        }
        .bracket-scroll::-webkit-scrollbar-thumb:hover {
            background: #564139;
        }

        /* Bracket Connector Lines */
        .bracket-line-vertical {
            position: absolute;
            right: -1rem; /* Adjust based on gap */
            top: 50%;
            width: 1rem;
            height: 100%; /* Dynamic based on spacing */
            border-right: 2px solid #564139;
        }
        
        .connector-path {
            position: absolute;
            z-index: 0;
            pointer-events: none;
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-hidden">
<!-- Top Navigation -->
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-surface-dark px-10 py-3 bg-surface-darker z-20">
<div class="flex items-center gap-4 text-white">
<div class="size-8 text-primary flex items-center justify-center">
<span class="material-symbols-outlined text-3xl">emoji_events</span>
</div>
<h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">BracketAI</h2>
</div>
<div class="flex flex-1 justify-end gap-8 items-center">
<div class="flex items-center gap-9 hidden md:flex">
<a class="text-white text-sm font-medium hover:text-primary transition-colors" href="#">My Brackets</a>
<a class="text-white text-sm font-medium hover:text-primary transition-colors" href="#">Global Leaderboard</a>
<a class="text-white text-sm font-medium hover:text-primary transition-colors" href="#">Analytics</a>
</div>
<div class="flex items-center gap-4">
<button class="flex items-center justify-center rounded-lg h-9 px-4 bg-surface-dark hover:bg-[#4a3932] text-white text-sm font-bold transition-colors">
<span class="material-symbols-outlined text-sm mr-2">logout</span>
<span class="truncate">Log Out</span>
</button>
<div class="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-surface-dark cursor-pointer" data-alt="User profile avatar showing a smiling person" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCXrVKx65x_7cRDy0yMLaXM_UJ96mlrsr9wSbUMWeYw_fWgyXCqJPZ2AJLTTJcC-HIXLQ0zrk6F3EbCQY2Sy-3p7r3izF7cgrMZeJBFLQs6sBbhnDSYmIerd8J994zleI7WZzIxXyklhj_gSgqzjP_NoSgmW2r7NXPzVDjndLVZ9TB6xgGBi_yEVAuUDv7nm-wfcyBDHpj1Km_8qirEOq5OGRNAPFjfbgj9D3Iz9lPk7pmRBaTy594bPiX0hG6UhOUMNqcs7vm56w");'></div>
</div>
</div>
</header>
<!-- Sub-Header / Dashboard Overview -->
<div class="bg-surface-darker border-b border-surface-dark">
<div class="px-6 lg:px-10 py-5 flex flex-wrap justify-between items-end gap-4">
<div class="flex flex-col gap-1">
<div class="flex items-center gap-2">
<p class="text-white text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">March Madness 2024</p>
<span class="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">Live</span>
</div>
<div class="flex items-center gap-4 text-[#bca39a] text-sm mt-1">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-base">psychology</span> AI Confidence: <span class="text-white font-bold">87%</span></span>
<span class="w-1 h-1 bg-[#bca39a] rounded-full"></span>
<span>Total Points: <span class="text-white font-bold">1,640</span></span>
<span class="w-1 h-1 bg-[#bca39a] rounded-full"></span>
<span>Rank: <span class="text-white font-bold">#245</span></span>
</div>
</div>
<div class="flex gap-3">
<button class="flex items-center justify-center rounded-lg h-10 px-4 bg-surface-dark hover:bg-[#4a3932] text-white text-sm font-bold border border-[#564139] transition-colors">
<span class="material-symbols-outlined mr-2 text-lg">settings</span>
                    Settings
                </button>
<button class="flex items-center justify-center rounded-lg h-10 px-6 bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-colors">
<span class="material-symbols-outlined mr-2 text-lg">edit</span>
                    Edit Picks
                </button>
</div>
</div>
<!-- Filter Tabs -->
<div class="px-6 lg:px-10 pt-2">
<div class="flex gap-8 overflow-x-auto no-scrollbar">
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-white pb-3 px-1 min-w-fit transition-colors" href="#">
<p class="text-sm font-bold tracking-[0.015em]">Full Bracket</p>
</a>
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#bca39a] hover:text-white pb-3 px-1 min-w-fit transition-colors" href="#">
<p class="text-sm font-bold tracking-[0.015em]">Round of 64</p>
</a>
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#bca39a] hover:text-white pb-3 px-1 min-w-fit transition-colors" href="#">
<p class="text-sm font-bold tracking-[0.015em]">Round of 32</p>
</a>
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#bca39a] hover:text-white pb-3 px-1 min-w-fit transition-colors" href="#">
<p class="text-sm font-bold tracking-[0.015em]">Sweet 16</p>
</a>
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#bca39a] hover:text-white pb-3 px-1 min-w-fit transition-colors" href="#">
<p class="text-sm font-bold tracking-[0.015em]">Elite 8</p>
</a>
<a class="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#bca39a] hover:text-white pb-3 px-1 min-w-fit transition-colors" href="#">
<p class="text-sm font-bold tracking-[0.015em]">Final 4</p>
</a>
</div>
</div>
</div>
<!-- Main Bracket Visualizer Area -->
<main class="flex-1 relative overflow-hidden bg-[#120a08]">
<!-- Background Grid Pattern -->
<div class="absolute inset-0 opacity-5 pointer-events-none" style="background-image: linear-gradient(#564139 1px, transparent 1px), linear-gradient(90deg, #564139 1px, transparent 1px); background-size: 40px 40px;">
</div>
<!-- Floating Action Button -->
<div class="absolute bottom-8 right-8 z-30">
<button class="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all transform hover:scale-105 active:scale-95 group">
<span class="material-symbols-outlined group-hover:animate-pulse">share</span>
                Share My Bracket
            </button>
</div>
<!-- Bracket Container (Scrollable/Zoomable Area) -->
<div class="bracket-scroll w-full h-full overflow-auto p-10 cursor-grab active:cursor-grabbing">
<div class="min-w-[1400px] min-h-[800px] flex justify-center items-center py-10">
<!-- Bracket Structure: 7 Columns (West/East - Final - Midwest/South) -->
<!-- Simplified for visual representation of the concept -->
<div class="flex gap-12 items-center relative">
<!-- COLUMN 1: Round of 16 (Left Side) -->
<div class="flex flex-col justify-around h-[800px] gap-8">
<!-- Matchup Node -->
<div class="bg-surface-dark border border-[#564139] rounded-lg w-48 shadow-lg relative group hover:border-primary transition-colors">
<div class="absolute -right-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div> <!-- Connector -->
<div class="flex justify-between items-center p-2 border-b border-[#564139]/50 bg-primary/10">
<span class="text-[10px] text-[#bca39a] uppercase font-bold">West Region</span>
<span class="text-[10px] text-green-400 font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[10px]">check_circle</span> Correct</span>
</div>
<div class="p-3 flex flex-col gap-2">
<div class="flex justify-between items-center opacity-50">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">16</span>
<span class="text-sm font-bold text-white">Howard</span>
</div>
<span class="text-sm font-mono text-[#bca39a]">68</span>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-primary font-mono">1</span>
<span class="text-sm font-bold text-white">Kansas</span>
</div>
<span class="text-sm font-mono text-primary font-bold">96</span>
</div>
</div>
</div>
<!-- Matchup Node -->
<div class="bg-surface-dark border border-[#564139] rounded-lg w-48 shadow-lg relative group hover:border-primary transition-colors">
<div class="absolute -right-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="absolute -right-6 h-[210px] w-[2px] bg-[#564139] top-[-105px]"></div> <!-- Vertical connector up -->
<div class="flex justify-between items-center p-2 border-b border-[#564139]/50">
<span class="text-[10px] text-[#bca39a] uppercase font-bold">West Region</span>
</div>
<div class="p-3 flex flex-col gap-2">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-primary font-mono">8</span>
<span class="text-sm font-bold text-white">Arkansas</span>
</div>
<span class="text-sm font-mono text-white">73</span>
</div>
<div class="flex justify-between items-center opacity-50">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">9</span>
<span class="text-sm font-bold text-white">Illinois</span>
</div>
<span class="text-sm font-mono text-[#bca39a]">63</span>
</div>
</div>
</div>
<!-- Matchup Node Spacer (repeating visual pattern) -->
<div class="bg-surface-dark border border-[#564139] rounded-lg w-48 shadow-lg relative group hover:border-primary transition-colors">
<div class="absolute -right-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="flex justify-between items-center p-2 border-b border-[#564139]/50">
<span class="text-[10px] text-[#bca39a] uppercase font-bold">West Region</span>
</div>
<div class="p-3 flex flex-col gap-2">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">5</span>
<span class="text-sm font-bold text-white">St. Mary's</span>
</div>
<span class="text-sm font-mono text-white">--</span>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">12</span>
<span class="text-sm font-bold text-white">VCU</span>
</div>
<span class="text-sm font-mono text-[#bca39a]">--</span>
</div>
</div>
</div>
<div class="bg-surface-dark border border-[#564139] rounded-lg w-48 shadow-lg relative group hover:border-primary transition-colors">
<div class="absolute -right-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="absolute -right-6 h-[210px] w-[2px] bg-[#564139] top-[-105px]"></div>
<div class="flex justify-between items-center p-2 border-b border-[#564139]/50">
<span class="text-[10px] text-[#bca39a] uppercase font-bold">West Region</span>
</div>
<div class="p-3 flex flex-col gap-2">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">4</span>
<span class="text-sm font-bold text-white">UConn</span>
</div>
<span class="text-sm font-mono text-white">--</span>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">13</span>
<span class="text-sm font-bold text-white">Iona</span>
</div>
<span class="text-sm font-mono text-[#bca39a]">--</span>
</div>
</div>
</div>
</div>
<!-- COLUMN 2: Quarter Finals (Left) -->
<div class="flex flex-col justify-around h-[600px] gap-32">
<!-- Round 2 Matchup -->
<div class="bg-surface-dark border-2 border-primary/50 shadow-[0_0_15px_rgba(255,105,51,0.15)] rounded-lg w-48 relative z-10">
<div class="absolute -right-6 top-1/2 w-6 h-[2px] bg-primary"></div>
<div class="absolute -left-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="flex justify-between items-center p-2 border-b border-primary/20 bg-primary/5">
<span class="text-[10px] text-primary uppercase font-bold">Round 32</span>
<span class="text-[10px] text-primary font-bold">92% Conf</span>
</div>
<div class="p-3 flex flex-col gap-2">
<div class="flex justify-between items-center relative">
<div class="flex items-center gap-2">
<span class="text-xs text-primary font-mono">1</span>
<span class="text-sm font-bold text-white">Kansas</span>
</div>
<span class="material-symbols-outlined text-sm text-primary absolute -right-1">chevron_left</span>
</div>
<div class="flex justify-between items-center opacity-50">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">8</span>
<span class="text-sm font-bold text-white">Arkansas</span>
</div>
</div>
</div>
</div>
<div class="bg-surface-dark border border-[#564139] rounded-lg w-48 relative">
<div class="absolute -right-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="absolute -right-6 h-[330px] w-[2px] bg-[#564139] top-[-165px]"></div> <!-- Vertical connector big -->
<div class="absolute -left-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="flex justify-between items-center p-2 border-b border-[#564139]/50">
<span class="text-[10px] text-[#bca39a] uppercase font-bold">Round 32</span>
</div>
<div class="p-3 flex flex-col gap-2">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">5</span>
<span class="text-sm font-bold text-white">St. Mary's</span>
</div>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">4</span>
<span class="text-sm font-bold text-white">UConn</span>
</div>
</div>
</div>
</div>
</div>
<!-- COLUMN 3: Semis (Left) -->
<div class="flex flex-col justify-center h-[600px]">
<div class="bg-surface-dark border-2 border-primary shadow-[0_0_20px_rgba(255,105,51,0.2)] rounded-lg w-52 relative scale-110 z-20">
<div class="absolute -right-8 top-1/2 w-8 h-[2px] bg-primary"></div>
<div class="absolute -left-6 top-1/2 w-6 h-[2px] bg-primary"></div>
<div class="flex justify-between items-center p-2 border-b border-primary/30 bg-primary/10">
<span class="text-[10px] text-primary uppercase font-bold">Sweet 16</span>
<span class="flex items-center gap-1 text-[10px] text-primary font-bold">
<span class="material-symbols-outlined text-[10px]">bolt</span> AI Pick
                                </span>
</div>
<div class="p-4 flex flex-col gap-3">
<div class="flex justify-between items-center">
<div class="flex items-center gap-3">
<img alt="Kansas Logo" class="w-6 h-6 object-contain" data-alt="Team logo: Blue bird" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP0nvMx2m1nIQBj6a-KWpiwZ0P0UdpsH1MsOHD28B-OlwiOZy6vuCZikHzCa4TE9xK0B-5acoCAlj6hhuM2Zb-EcRQ5stQWaoViPgx_bHui8ZHC3r5iw-hnHKQL1hy-zpojBlpRMsgkeQ8I51a6PRAix22w0-fOJ1hzdH9rKCZyw1oOiUyorhkjg3EpzEQvn2UPhzOZprYDxo1O8VGCUzBMiJZt1pX0Hd93asx33HM3w3dkfBIsVaqxgs4wEOM8u60BxLeRklvSg"/>
<div class="flex flex-col">
<span class="text-[10px] text-primary font-mono leading-none">#1</span>
<span class="text-base font-black text-white leading-none">Kansas</span>
</div>
</div>
<span class="text-lg font-mono text-primary font-bold">88</span>
</div>
<div class="w-full h-[1px] bg-white/10"></div>
<div class="flex justify-between items-center opacity-60">
<div class="flex items-center gap-3">
<div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]" data-alt="Team logo placeholder">U</div>
<div class="flex flex-col">
<span class="text-[10px] text-[#bca39a] font-mono leading-none">#4</span>
<span class="text-base font-bold text-white leading-none">UConn</span>
</div>
</div>
<span class="text-lg font-mono text-[#bca39a]">81</span>
</div>
</div>
</div>
</div>
<!-- COLUMN 4: CHAMPIONSHIP (Center) -->
<div class="flex flex-col justify-center items-center h-[700px] px-8 relative">
<!-- Trophy Icon above -->
<div class="mb-6 text-primary animate-bounce">
<span class="material-symbols-outlined text-6xl drop-shadow-[0_0_15px_rgba(255,105,51,0.5)]">emoji_events</span>
</div>
<!-- Championship Card -->
<div class="bg-[#181210] border-2 border-white/20 rounded-xl w-80 shadow-2xl relative z-30 overflow-hidden">
<!-- Background glow -->
<div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
<!-- Connectors -->
<div class="absolute -left-8 top-1/2 w-8 h-[2px] bg-primary"></div>
<div class="absolute -right-8 top-1/2 w-8 h-[2px] bg-[#564139]"></div>
<div class="flex justify-center items-center p-3 border-b border-white/10 bg-white/5">
<span class="text-xs text-white uppercase font-black tracking-widest">National Championship</span>
</div>
<div class="p-6 flex flex-col gap-6 items-center">
<!-- Winner -->
<div class="flex flex-col items-center gap-2 scale-110">
<div class="w-20 h-20 bg-white rounded-full p-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center">
<img alt="Kansas Logo" class="w-16 h-16 object-contain" data-alt="Kansas Jayhawks mascot logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSXIM7o2R0JGVMvsQXYyoFhSN-_hpLCSYqQABExlOl9ykbBw_x7HlKn7RJFIPojlSKEWBrxZClu8X75X53v0zO5s0bjhMdHEM09kr29a--0fHLRQa6hqR9_S0jwLzoPhj-D8-Mqs2x27aaDL0KvDqikWOxvY8m0eDWmQO2odjKr8PlrZJ7MPy1dFa7DxCTtqSLPk83S0yBJdcH6bGI447o--saURjBl002EK8e_Dd12frzsH5OqW-c1OwqemTuBlOMrwImUrQ4aA"/>
</div>
<div class="text-center">
<p class="text-primary font-bold text-sm tracking-wider mb-1">PREDICTED WINNER</p>
<h3 class="text-3xl font-black text-white leading-none">KANSAS</h3>
<p class="text-[#bca39a] text-sm font-medium mt-1">Seed #1</p>
</div>
</div>
<div class="text-2xl font-black text-white/20">VS</div>
<!-- Runner Up -->
<div class="flex items-center gap-4 opacity-70">
<div class="text-right">
<h4 class="text-xl font-bold text-white leading-none">Houston</h4>
<p class="text-[#bca39a] text-xs font-medium">Seed #1</p>
</div>
<div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-bold border border-white/20" data-alt="Houston Cougars logo placeholder">
                                        H
                                    </div>
</div>
</div>
<div class="bg-primary p-3 flex justify-between items-center">
<span class="text-black font-bold text-xs uppercase">Win Probability</span>
<span class="text-black font-black text-lg">64.2%</span>
</div>
</div>
</div>
<!-- COLUMN 5: Semis (Right - Placeholder structure) -->
<div class="flex flex-col justify-center h-[600px] opacity-60 hover:opacity-100 transition-opacity">
<div class="bg-surface-dark border border-[#564139] rounded-lg w-52 relative z-10">
<div class="absolute -left-8 top-1/2 w-8 h-[2px] bg-[#564139]"></div>
<div class="absolute -right-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="flex justify-between items-center p-2 border-b border-[#564139]/50">
<span class="text-[10px] text-[#bca39a] uppercase font-bold">Sweet 16</span>
</div>
<div class="p-4 flex flex-col gap-3">
<div class="flex justify-between items-center">
<div class="flex items-center gap-3">
<div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]" data-alt="Houston logo">H</div>
<div class="flex flex-col">
<span class="text-[10px] text-[#bca39a] font-mono leading-none">#1</span>
<span class="text-base font-bold text-white leading-none">Houston</span>
</div>
</div>
</div>
<div class="w-full h-[1px] bg-white/5"></div>
<div class="flex justify-between items-center opacity-60">
<div class="flex items-center gap-3">
<div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]" data-alt="Miami logo">M</div>
<div class="flex flex-col">
<span class="text-[10px] text-[#bca39a] font-mono leading-none">#5</span>
<span class="text-base font-bold text-white leading-none">Miami</span>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- COLUMN 6: Quarter Finals (Right - Placeholders) -->
<div class="flex flex-col justify-around h-[600px] gap-32 opacity-40">
<div class="bg-surface-dark border border-[#564139] rounded-lg w-48 relative">
<div class="absolute -left-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="absolute -right-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="flex justify-between items-center p-2 border-b border-[#564139]/50">
<span class="text-[10px] text-[#bca39a] uppercase font-bold">Round 32</span>
</div>
<div class="p-3 flex flex-col gap-2">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">1</span>
<span class="text-sm font-bold text-white">Houston</span>
</div>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">9</span>
<span class="text-sm font-bold text-white">Auburn</span>
</div>
</div>
</div>
</div>
<div class="bg-surface-dark border border-[#564139] rounded-lg w-48 relative">
<div class="absolute -left-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="absolute -left-6 h-[330px] w-[2px] bg-[#564139] top-[-165px]"></div>
<div class="absolute -right-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="flex justify-between items-center p-2 border-b border-[#564139]/50">
<span class="text-[10px] text-[#bca39a] uppercase font-bold">Round 32</span>
</div>
<div class="p-3 flex flex-col gap-2">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">5</span>
<span class="text-sm font-bold text-white">Miami</span>
</div>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">4</span>
<span class="text-sm font-bold text-white">Indiana</span>
</div>
</div>
</div>
</div>
</div>
<!-- COLUMN 7: Round of 16 (Right Side - Placeholders) -->
<div class="flex flex-col justify-around h-[800px] gap-8 opacity-30">
<!-- Matchup Node -->
<div class="bg-surface-dark border border-[#564139] rounded-lg w-48 relative">
<div class="absolute -left-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="flex justify-between items-center p-2 border-b border-[#564139]/50">
<span class="text-[10px] text-[#bca39a] uppercase font-bold">Midwest</span>
</div>
<div class="p-3 flex flex-col gap-2">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">1</span>
<span class="text-sm font-bold text-white">Houston</span>
</div>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">16</span>
<span class="text-sm font-bold text-white">N. Kent</span>
</div>
</div>
</div>
</div>
<!-- Matchup Node -->
<div class="bg-surface-dark border border-[#564139] rounded-lg w-48 relative">
<div class="absolute -left-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="absolute -left-6 h-[210px] w-[2px] bg-[#564139] top-[-105px]"></div>
<div class="flex justify-between items-center p-2 border-b border-[#564139]/50">
<span class="text-[10px] text-[#bca39a] uppercase font-bold">Midwest</span>
</div>
<div class="p-3 flex flex-col gap-2">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">8</span>
<span class="text-sm font-bold text-white">Iowa</span>
</div>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">9</span>
<span class="text-sm font-bold text-white">Auburn</span>
</div>
</div>
</div>
</div>
<!-- Matchup Node -->
<div class="bg-surface-dark border border-[#564139] rounded-lg w-48 relative">
<div class="absolute -left-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="flex justify-between items-center p-2 border-b border-[#564139]/50">
<span class="text-[10px] text-[#bca39a] uppercase font-bold">Midwest</span>
</div>
<div class="p-3 flex flex-col gap-2">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">5</span>
<span class="text-sm font-bold text-white">Miami</span>
</div>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">12</span>
<span class="text-sm font-bold text-white">Drake</span>
</div>
</div>
</div>
</div>
<!-- Matchup Node -->
<div class="bg-surface-dark border border-[#564139] rounded-lg w-48 relative">
<div class="absolute -left-6 top-1/2 w-6 h-[2px] bg-[#564139]"></div>
<div class="absolute -left-6 h-[210px] w-[2px] bg-[#564139] top-[-105px]"></div>
<div class="flex justify-between items-center p-2 border-b border-[#564139]/50">
<span class="text-[10px] text-[#bca39a] uppercase font-bold">Midwest</span>
</div>
<div class="p-3 flex flex-col gap-2">
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">4</span>
<span class="text-sm font-bold text-white">Indiana</span>
</div>
</div>
<div class="flex justify-between items-center">
<div class="flex items-center gap-2">
<span class="text-xs text-[#bca39a] font-mono">13</span>
<span class="text-sm font-bold text-white">Kent St.</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Sidebar / Drawer (Overlay on the right side) -->
<aside class="absolute top-0 right-0 h-full w-[360px] bg-surface-darker border-l border-surface-dark shadow-2xl transform translate-x-0 transition-transform duration-300 z-40 hidden lg:flex lg:flex-col">
<div class="flex items-center justify-between p-6 border-b border-surface-dark">
<h3 class="text-white font-bold text-lg">Matchup Analysis</h3>
<button class="text-[#bca39a] hover:text-white">
<span class="material-symbols-outlined">close</span>
</button>
</div>
<div class="p-6 flex-1 overflow-y-auto">
<div class="flex justify-between items-center mb-6">
<div class="flex flex-col items-center">
<img alt="Kansas Logo" class="w-12 h-12 object-contain mb-2" data-alt="Kansas logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSK09ob7okXULgganWCyEtUrn_oHCwFh9jFvzEV8lnBORMRemaGzzN4b9dGKWbs2Yh1zW2y7eanBgcKdsuEyAcznX-SmaBJZZjxsWMFW6kM_LNZNM6NYFZD9qFbL4L8WYiO8WMCN9tQmVzqfdy36-YamhSy5ujrlnFTme68uwP57HGiEEnMMDL4euqYVuty4_cpOK4NfrgrHH2OvizCrDU9O0lTk4oe0V16JikPqdPV2Qi8rvN3PNnqfeOU1ANQb9WDAYWPWeogw"/>
<span class="text-white font-bold">Kansas</span>
<span class="text-[#bca39a] text-xs">#1 Seed</span>
</div>
<div class="text-center">
<span class="text-2xl font-black text-white italic">VS</span>
<p class="text-primary text-xs font-bold mt-1">FINAL</p>
</div>
<div class="flex flex-col items-center opacity-60">
<div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white font-bold mb-2 text-xl" data-alt="Arkansas logo">A</div>
<span class="text-white font-bold">Arkansas</span>
<span class="text-[#bca39a] text-xs">#8 Seed</span>
</div>
</div>
<div class="space-y-6">
<div class="bg-surface-dark rounded-lg p-4 border border-[#564139]">
<p class="text-[#bca39a] text-xs font-bold uppercase mb-3">AI Prediction Model</p>
<div class="flex items-end justify-between mb-1">
<span class="text-white font-medium">Win Probability</span>
<span class="text-primary font-bold">92%</span>
</div>
<div class="w-full bg-white/10 rounded-full h-2 mb-4">
<div class="bg-primary h-2 rounded-full" style="width: 92%"></div>
</div>
<div class="flex items-end justify-between mb-1">
<span class="text-white font-medium">Predicted Margin</span>
<span class="text-white font-bold">+12.5</span>
</div>
<div class="w-full bg-white/10 rounded-full h-2">
<div class="bg-primary h-2 rounded-full" style="width: 75%"></div>
</div>
</div>
<div>
<p class="text-white font-bold mb-3">Key Factors</p>
<div class="flex flex-col gap-2">
<div class="flex items-center gap-3 p-3 bg-surface-dark rounded border border-[#564139]">
<span class="material-symbols-outlined text-green-500">trending_up</span>
<p class="text-sm text-[#bca39a]">Kansas rebounding efficiency (+8%)</p>
</div>
<div class="flex items-center gap-3 p-3 bg-surface-dark rounded border border-[#564139]">
<span class="material-symbols-outlined text-green-500">stars</span>
<p class="text-sm text-[#bca39a]">Star player injury recovery</p>
</div>
<div class="flex items-center gap-3 p-3 bg-surface-dark rounded border border-[#564139]">
<span class="material-symbols-outlined text-red-500">warning</span>
<p class="text-sm text-[#bca39a]">Arkansas turnover rate vs top defenses</p>
</div>
</div>
</div>
<div class="pt-4 border-t border-surface-dark">
<button class="w-full py-3 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-lg border border-white/10 transition-colors flex items-center justify-center gap-2">
                             Full Game Analysis
                             <span class="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>
</aside>
</main>
</body></html>

<!-- Team Deep Dive Analytics -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Team Deep Dive Analytics</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#ff6933",
                        "background-light": "#f8f6f5",
                        "background-dark": "#23140f",
                        "card-dark": "#2c1a14", // A slightly lighter shade for cards based on the primary hue
                        "accent-dark": "#3a2c27", // Provided in example
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        /* Custom scrollbar for fintech feel */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #23140f; 
        }
        ::-webkit-scrollbar-thumb {
            background: #3a2c27; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #ff6933; 
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col overflow-x-hidden">
<!-- Top Navigation -->
<div class="relative flex h-auto w-full flex-col bg-[#181210] border-b border-[#3a2c27]">
<div class="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
<div class="layout-content-container flex flex-col max-w-[1200px] flex-1">
<header class="flex items-center justify-between whitespace-nowrap px-4 py-3">
<div class="flex items-center gap-8">
<div class="flex items-center gap-4 text-white">
<div class="size-8 text-primary">
<span class="material-symbols-outlined text-3xl">analytics</span>
</div>
<h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Deep Dive Analytics</h2>
</div>
<div class="hidden md:flex items-center gap-9">
<a class="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Dashboard</a>
<a class="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Brackets</a>
<a class="text-white text-sm font-medium leading-normal border-b-2 border-primary pb-1" href="#">Teams</a>
<a class="text-slate-300 hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">AI Models</a>
</div>
</div>
<div class="flex flex-1 justify-end gap-8 items-center">
<label class="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
<div class="flex w-full flex-1 items-stretch rounded-lg h-full bg-[#3a2c27]/50 border border-[#3a2c27]">
<div class="text-[#bca39a] flex border-none items-center justify-center pl-4 rounded-l-lg border-r-0">
<span class="material-symbols-outlined text-[20px]">search</span>
</div>
<input class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-[#bca39a] px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" placeholder="Search team or player..." value=""/>
</div>
</label>
<div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-primary/20" data-alt="User profile picture showing a smiling man" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDqYToPEnuaToNqkTZsQcgQY1gc4ApGd0sGS0gqLOpbZcKUeOVZLWbW5eMO_i-dyn5enqd6xobMS_q_V1rAW1QaztWAxfW64ubrlQRQ16skfcYmrBAem5aU51IC38CHZkslmMxoxxyLXsDyNzVQos3e5vyXn5lMadIkr75lWreuc2zjobUzoqJZaeu4J639_ALZSZERagXc982s6nDjucuaj0JRKzAjynYAMFc0xXPqjbCeUKnKU_5hOj5-Ie4AFLD-XQBojL8G3A");'></div>
</div>
</header>
</div>
</div>
</div>
<!-- Main Content Area -->
<main class="flex-1 px-4 md:px-10 lg:px-40 flex justify-center py-8">
<div class="w-full max-w-[1200px] flex flex-col gap-6">
<!-- Hero Section -->
<div class="relative overflow-hidden rounded-xl bg-[#2c1a14] border border-[#3a2c27] shadow-xl">
<!-- Background with overlay -->
<div class="absolute inset-0 z-0">
<img alt="Basketball hoop silhouette against a dark arena background" class="w-full h-full object-cover opacity-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV9VsWTadWkt5te3UXre32IKpO6hNeSaFOm63_SoUnfv-lOmQ7P0Ms9ceDpIwlyuxz0_GJoQ17tgKulxVfjW7OcR0_V0s-hiGHQoDkSd7EtKUy-5j-kmNUZuqxr9F6Su_lnVQX6z0n8KvEiHHmMl9TsEmd2VHETcgZ5qmNeMWSZZrYOSl3KjOvWUKrHKVwSFNY_4wFjPEkdR82fLIMkAqxrvGbBgLTdxdqDYXAjDLqM1M7HrNXbHSZwv5PZfS5x9Sm5-Tt63tjMQ"/>
<div class="absolute inset-0 bg-gradient-to-r from-[#23140f] via-[#23140f]/90 to-transparent"></div>
</div>
<div class="relative z-10 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
<div class="flex items-center gap-6">
<div class="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#3a2c27]">
<span class="material-symbols-outlined text-6xl text-primary">sports_basketball</span>
</div>
<div>
<div class="flex items-center gap-3 mb-2">
<span class="bg-primary text-white text-xs font-bold px-2 py-1 rounded">SEED #1</span>
<span class="text-slate-400 text-sm font-medium tracking-wide uppercase">Big 12 Conference</span>
</div>
<h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">Houston Cougars</h1>
<div class="flex items-center gap-6 text-sm md:text-base">
<div class="flex items-center gap-2">
<span class="text-slate-400">Record</span>
<span class="text-white font-bold">32-3</span>
</div>
<div class="flex items-center gap-2">
<span class="text-slate-400">AP Rank</span>
<span class="text-white font-bold">#1</span>
</div>
<div class="flex items-center gap-2">
<span class="text-slate-400">NET</span>
<span class="text-white font-bold">1st</span>
</div>
</div>
</div>
</div>
<div class="flex gap-3 w-full md:w-auto">
<button class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#3a2c27] hover:bg-[#4a3c37] text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-medium border border-white/10">
<span class="material-symbols-outlined text-[18px]">favorite</span>
                            Watch
                        </button>
<button class="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-medium shadow-lg shadow-primary/20">
<span class="material-symbols-outlined text-[18px]">neurology</span>
                            Simulate Matchup
                        </button>
</div>
</div>
</div>
<!-- Ticker / Key Stats Grid -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
<div class="bg-[#2c1a14] p-4 rounded-lg border border-[#3a2c27] flex flex-col gap-1">
<span class="text-slate-400 text-xs font-medium uppercase tracking-wider">KenPom AdjEM</span>
<div class="flex items-baseline gap-2">
<span class="text-2xl font-bold text-white">+28.43</span>
<span class="text-[#0bda12] text-xs font-medium flex items-center">
<span class="material-symbols-outlined text-[14px]">arrow_upward</span> 1st
                        </span>
</div>
</div>
<div class="bg-[#2c1a14] p-4 rounded-lg border border-[#3a2c27] flex flex-col gap-1">
<span class="text-slate-400 text-xs font-medium uppercase tracking-wider">Off. Efficiency</span>
<div class="flex items-baseline gap-2">
<span class="text-2xl font-bold text-white">118.4</span>
<span class="text-slate-400 text-xs font-medium">11th</span>
</div>
</div>
<div class="bg-[#2c1a14] p-4 rounded-lg border border-[#3a2c27] flex flex-col gap-1">
<span class="text-slate-400 text-xs font-medium uppercase tracking-wider">Def. Efficiency</span>
<div class="flex items-baseline gap-2">
<span class="text-2xl font-bold text-white">89.9</span>
<span class="text-[#0bda12] text-xs font-medium flex items-center">
<span class="material-symbols-outlined text-[14px]">stars</span> 1st
                        </span>
</div>
</div>
<div class="bg-[#2c1a14] p-4 rounded-lg border border-[#3a2c27] flex flex-col gap-1">
<span class="text-slate-400 text-xs font-medium uppercase tracking-wider">Proj. Tempo</span>
<div class="flex items-baseline gap-2">
<span class="text-2xl font-bold text-white">63.5</span>
<span class="text-slate-400 text-xs font-medium">340th</span>
</div>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<!-- Main Stat Dashboard (Left 2/3) -->
<div class="lg:col-span-2 flex flex-col gap-6">
<!-- AI Insight Section -->
<div class="bg-gradient-to-br from-[#2c1a14] to-[#1e130f] rounded-xl border border-primary/30 shadow-[0_0_15px_rgba(255,105,51,0.05)] overflow-hidden">
<div class="p-5 border-b border-white/5 flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary animate-pulse">smart_toy</span>
<h3 class="text-white font-semibold text-lg">AI Scouting Report</h3>
</div>
<span class="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">MODEL v4.2 CONFIDENCE: HIGH</span>
</div>
<div class="p-6 relative">
<!-- Decorative binary background -->
<div class="absolute right-0 top-0 h-full w-1/3 opacity-5 pointer-events-none select-none overflow-hidden text-[10px] leading-tight text-primary font-mono text-right p-4">
                                01001001 00100000 01100001 01101101<br/>00100000 01100001 01101110 00100000<br/>01000001 01001001 00101110 00101110
                            </div>
<p class="text-slate-200 text-base leading-relaxed mb-4">
                                The model identifies Houston as a <span class="text-primary font-bold">Title Contender</span>. Their elite defensive metrics, specifically forcing turnovers on 24% of possessions, create a statistical anomaly that few opponents can simulate in practice.
                            </p>
<p class="text-slate-400 text-sm leading-relaxed mb-4">
<strong class="text-white">Weakness Detected:</strong> While elite defensively, their offensive efficiency drops significantly against zone defenses (0.88 PPP vs 1.02 PPP against Man). Teams with length that can disrupt their guard-heavy rotation pose the biggest threat in the Sweet 16 round.
                            </p>
<div class="mt-4 flex flex-wrap gap-2">
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#3a2c27] text-white border border-white/10">
<span class="w-1.5 h-1.5 rounded-full bg-[#0bda12]"></span> High Floor
                                </span>
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#3a2c27] text-white border border-white/10">
<span class="w-1.5 h-1.5 rounded-full bg-primary"></span> Final Four Prob: 42%
                                </span>
<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#3a2c27] text-white border border-white/10">
<span class="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Volatility: Low
                                </span>
</div>
</div>
</div>
<!-- Performance Visualization -->
<div class="bg-[#2c1a14] rounded-xl border border-[#3a2c27] p-6">
<h3 class="text-white font-semibold text-lg mb-6">Performance Metrics</h3>
<div class="space-y-6">
<!-- Metric 1 -->
<div>
<div class="flex justify-between mb-2">
<span class="text-sm text-slate-400">Effective FG% Offense</span>
<span class="text-sm text-white font-medium">52.1% <span class="text-slate-500 text-xs ml-1">(Avg: 50.5%)</span></span>
</div>
<div class="h-2 w-full bg-[#181210] rounded-full overflow-hidden">
<div class="h-full bg-slate-600 w-1/2 relative">
<!-- The team marker -->
<div class="absolute right-0 -top-1 w-1 h-4 bg-slate-400"></div>
</div>
<!-- Actual value bar -->
<div class="h-full bg-primary w-[55%] relative -mt-2 opacity-80"></div>
</div>
</div>
<!-- Metric 2 -->
<div>
<div class="flex justify-between mb-2">
<span class="text-sm text-slate-400">Effective FG% Defense</span>
<span class="text-sm text-white font-medium">42.5% <span class="text-[#0bda12] text-xs ml-1">(Elite)</span></span>
</div>
<div class="h-2 w-full bg-[#181210] rounded-full overflow-hidden relative">
<div class="absolute left-[50%] top-0 bottom-0 w-0.5 bg-slate-700 z-10" title="League Average"></div>
<div class="h-full bg-primary w-[88%] rounded-r-full"></div>
</div>
</div>
<!-- Metric 3 -->
<div>
<div class="flex justify-between mb-2">
<span class="text-sm text-slate-400">Turnover %</span>
<span class="text-sm text-white font-medium">15.4%</span>
</div>
<div class="h-2 w-full bg-[#181210] rounded-full overflow-hidden relative">
<div class="absolute left-[50%] top-0 bottom-0 w-0.5 bg-slate-700 z-10"></div>
<div class="h-full bg-slate-500 w-[45%] rounded-r-full"></div>
</div>
</div>
<!-- Metric 4 -->
<div>
<div class="flex justify-between mb-2">
<span class="text-sm text-slate-400">Offensive Rebound %</span>
<span class="text-sm text-white font-medium">37.2% <span class="text-[#0bda12] text-xs ml-1">(Top 10)</span></span>
</div>
<div class="h-2 w-full bg-[#181210] rounded-full overflow-hidden relative">
<div class="absolute left-[50%] top-0 bottom-0 w-0.5 bg-slate-700 z-10"></div>
<div class="h-full bg-primary w-[92%] rounded-r-full"></div>
</div>
</div>
</div>
</div>
<!-- Path to Championship -->
<div class="bg-[#2c1a14] rounded-xl border border-[#3a2c27] p-6">
<div class="flex items-center justify-between mb-6">
<h3 class="text-white font-semibold text-lg">Projected Path</h3>
<button class="text-primary text-xs font-medium hover:underline">View Full Bracket</button>
</div>
<div class="relative flex gap-4 overflow-x-auto pb-4 snap-x">
<!-- Round 1 -->
<div class="snap-start min-w-[200px] flex-1 bg-[#23140f] rounded-lg p-4 border border-[#3a2c27] relative group hover:border-primary/50 transition-colors">
<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0bda12] to-[#0bda12]/50"></div>
<div class="text-xs text-slate-500 uppercase font-bold mb-3">Round of 64</div>
<div class="flex items-center justify-between mb-2">
<div class="flex items-center gap-2">
<div class="w-6 h-6 bg-slate-700 rounded-full text-[10px] flex items-center justify-center text-white">16</div>
<span class="text-white text-sm font-medium">Longwood</span>
</div>
<span class="text-xs text-slate-400">#16</span>
</div>
<div class="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
<div>
<div class="text-[10px] text-slate-500">Win Prob</div>
<div class="text-xl font-bold text-[#0bda12]">99.1%</div>
</div>
<span class="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors">arrow_forward</span>
</div>
</div>
<!-- Round 2 -->
<div class="snap-start min-w-[200px] flex-1 bg-[#23140f] rounded-lg p-4 border border-[#3a2c27] relative group hover:border-primary/50 transition-colors">
<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0bda12] to-[#0bda12]/30"></div>
<div class="text-xs text-slate-500 uppercase font-bold mb-3">Round of 32</div>
<div class="flex items-center justify-between mb-2">
<div class="flex items-center gap-2">
<div class="w-6 h-6 bg-slate-700 rounded-full text-[10px] flex items-center justify-center text-white">9</div>
<span class="text-white text-sm font-medium">Texas A&amp;M</span>
</div>
<span class="text-xs text-slate-400">#9</span>
</div>
<div class="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
<div>
<div class="text-[10px] text-slate-500">Win Prob</div>
<div class="text-xl font-bold text-[#0bda12]">84.2%</div>
</div>
<span class="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors">arrow_forward</span>
</div>
</div>
<!-- Sweet 16 -->
<div class="snap-start min-w-[200px] flex-1 bg-[#23140f] rounded-lg p-4 border border-[#3a2c27] relative group hover:border-primary/50 transition-colors">
<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-500/30"></div>
<div class="text-xs text-slate-500 uppercase font-bold mb-3">Sweet 16</div>
<div class="flex items-center justify-between mb-2">
<div class="flex items-center gap-2">
<div class="w-6 h-6 bg-slate-700 rounded-full text-[10px] flex items-center justify-center text-white">4</div>
<span class="text-white text-sm font-medium">Duke</span>
</div>
<span class="text-xs text-slate-400">#4</span>
</div>
<div class="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
<div>
<div class="text-[10px] text-slate-500">Win Prob</div>
<div class="text-xl font-bold text-yellow-500">62.8%</div>
</div>
<span class="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors">arrow_forward</span>
</div>
</div>
<!-- Elite 8 -->
<div class="snap-start min-w-[200px] flex-1 bg-[#23140f] rounded-lg p-4 border border-[#3a2c27] relative group hover:border-primary/50 transition-colors opacity-60">
<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/30"></div>
<div class="text-xs text-slate-500 uppercase font-bold mb-3">Elite 8</div>
<div class="flex items-center justify-between mb-2">
<div class="flex items-center gap-2">
<div class="w-6 h-6 bg-slate-700 rounded-full text-[10px] flex items-center justify-center text-white">2</div>
<span class="text-white text-sm font-medium">Marquette</span>
</div>
<span class="text-xs text-slate-400">#2</span>
</div>
<div class="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
<div>
<div class="text-[10px] text-slate-500">Win Prob</div>
<div class="text-xl font-bold text-primary">51.4%</div>
</div>
<span class="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors">arrow_forward</span>
</div>
</div>
</div>
</div>
</div>
<!-- Right Sidebar (Roster & Info) -->
<div class="flex flex-col gap-6">
<!-- Key Players -->
<div class="bg-[#2c1a14] rounded-xl border border-[#3a2c27] overflow-hidden flex flex-col h-full">
<div class="p-5 border-b border-[#3a2c27] flex justify-between items-center bg-[#281712]">
<h3 class="text-white font-semibold text-lg">Key Contributors</h3>
<button class="text-xs text-slate-400 hover:text-white transition-colors">See All</button>
</div>
<div class="flex-1 overflow-y-auto">
<!-- Player 1 -->
<div class="p-4 border-b border-[#3a2c27] hover:bg-[#3a2c27]/20 transition-colors cursor-pointer group">
<div class="flex items-center gap-3 mb-2">
<div class="w-10 h-10 rounded-full bg-slate-700 bg-center bg-cover" data-alt="Portrait of basketball player looking focused" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAB-HNYRLa1FpqzQLgOeRnuO1ya9qSKiVdPjdvkcUIIqUoebK00Sep-lKW6QkAgNymMyKUFbvTQnP3Lt81Ufljfsy06EcIdE2RsV5aPOaVhn6Zyqr_cKbk2LWhm3QMhNCJP94O0fZUGEEs3viQKw7rSV-lI76kByg2FPMpa0aq34lUunFCXnRJ5A5ciRxYBnH-BeQSrZvOqD7053CMGpmO5mRxCuwfQ3U7206GN9yYR09DptbW2wKnYcNol2SlLuYtn-gmor7q6ow')"></div>
<div>
<div class="text-white font-medium text-sm">Jamal Shead</div>
<div class="text-xs text-slate-500">G • Senior • 6'1"</div>
</div>
<div class="ml-auto text-right">
<div class="text-primary font-bold text-lg">24.5</div>
<div class="text-[10px] text-slate-500 uppercase">PER</div>
</div>
</div>
<div class="grid grid-cols-3 gap-2 mt-2">
<div class="bg-[#181210] rounded p-2 text-center">
<div class="text-[10px] text-slate-500">PPG</div>
<div class="text-white font-semibold text-sm">13.2</div>
</div>
<div class="bg-[#181210] rounded p-2 text-center">
<div class="text-[10px] text-slate-500">APG</div>
<div class="text-white font-semibold text-sm">6.2</div>
</div>
<div class="bg-[#181210] rounded p-2 text-center">
<div class="text-[10px] text-slate-500">STL</div>
<div class="text-[#0bda12] font-semibold text-sm">2.3</div>
</div>
</div>
</div>
<!-- Player 2 -->
<div class="p-4 border-b border-[#3a2c27] hover:bg-[#3a2c27]/20 transition-colors cursor-pointer group">
<div class="flex items-center gap-3 mb-2">
<div class="w-10 h-10 rounded-full bg-slate-700 bg-center bg-cover" data-alt="Portrait of basketball player in uniform" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWltWYQ8I_QLXJbuhBw3zKXsXeFd1VgwcLlBZcAN7-pt-SXRgeadym8_1xuhVg_NSri6c5_TKlzhJqdWnMIT1FavsgNz8IGSveaGqsDC_CAQwtsKLyeSi3HOBYNPRTRur6aNI939K3CPHwHElX6l8A-LzaKkp2UipNl_AhrOMTZhigo-2E_V7bGqz3qDVVHfzPsqu_RIf-AzHYBjy0ggz2s4M_fR2EWVeBC4yfJDXyzy9iNJMu7vGtG5TmPp3yAhM1u9xCwNWjlQ')"></div>
<div>
<div class="text-white font-medium text-sm">L.J. Cryer</div>
<div class="text-xs text-slate-500">G • Senior • 6'1"</div>
</div>
<div class="ml-auto text-right">
<div class="text-white font-bold text-lg">18.2</div>
<div class="text-[10px] text-slate-500 uppercase">PER</div>
</div>
</div>
<div class="grid grid-cols-3 gap-2 mt-2">
<div class="bg-[#181210] rounded p-2 text-center">
<div class="text-[10px] text-slate-500">PPG</div>
<div class="text-white font-semibold text-sm">15.8</div>
</div>
<div class="bg-[#181210] rounded p-2 text-center">
<div class="text-[10px] text-slate-500">3P%</div>
<div class="text-[#0bda12] font-semibold text-sm">38.4</div>
</div>
<div class="bg-[#181210] rounded p-2 text-center">
<div class="text-[10px] text-slate-500">FT%</div>
<div class="text-white font-semibold text-sm">88.1</div>
</div>
</div>
</div>
<!-- Player 3 -->
<div class="p-4 hover:bg-[#3a2c27]/20 transition-colors cursor-pointer group">
<div class="flex items-center gap-3 mb-2">
<div class="w-10 h-10 rounded-full bg-slate-700 bg-center bg-cover" data-alt="Portrait of basketball player looking intense" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDDdyEBr3Ko-apY9tkIVd8OP1AxUDSn8pB7NhgVte6A5-0hevplLZNTRxLrUxbx53aTqePEES4kNh4hHKTiwCjtiaYze8CPBAL_3gk9Cg7yrsidUErq2pjXWUAxBmtKxXRdG-4UEC95_xmfjQerjnbgDem_UG9cWKFAajwaJm9inM4H0q4F75923mPWmDuJrGkmhC4YpvahynHmmx0Z0iWI7id34ii1itRTzcfB91hbeaNOEp_c7gtoXgD9UFYNu1AAMrrmclBWQ')"></div>
<div>
<div class="text-white font-medium text-sm">J'Wan Roberts</div>
<div class="text-xs text-slate-500">F • Senior • 6'7"</div>
</div>
<div class="ml-auto text-right">
<div class="text-white font-bold text-lg">21.9</div>
<div class="text-[10px] text-slate-500 uppercase">PER</div>
</div>
</div>
<div class="grid grid-cols-3 gap-2 mt-2">
<div class="bg-[#181210] rounded p-2 text-center">
<div class="text-[10px] text-slate-500">PPG</div>
<div class="text-white font-semibold text-sm">9.8</div>
</div>
<div class="bg-[#181210] rounded p-2 text-center">
<div class="text-[10px] text-slate-500">RPG</div>
<div class="text-white font-semibold text-sm">7.4</div>
</div>
<div class="bg-[#181210] rounded p-2 text-center">
<div class="text-[10px] text-slate-500">FG%</div>
<div class="text-white font-semibold text-sm">58.2</div>
</div>
</div>
</div>
</div>
</div>
<!-- Additional Info Card -->
<div class="bg-[#2c1a14] rounded-xl border border-[#3a2c27] p-5">
<h3 class="text-white font-semibold text-sm uppercase tracking-wide mb-4">Upcoming Schedule</h3>
<div class="space-y-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs shadow-sm">KU</div>
<div class="flex-1">
<div class="flex justify-between">
<span class="text-white text-sm font-medium">Kansas</span>
<span class="text-slate-400 text-xs">Mar 09</span>
</div>
<div class="text-xs text-slate-500">Home • ESPN</div>
</div>
</div>
<div class="flex items-center gap-3">
<div class="w-10 h-10 bg-[#500000] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm border border-white/20">OU</div>
<div class="flex-1">
<div class="flex justify-between">
<span class="text-white text-sm font-medium">Oklahoma</span>
<span class="text-slate-400 text-xs">Mar 12</span>
</div>
<div class="text-xs text-slate-500">Neutral • ESPN2</div>
</div>
</div>
</div>
<button class="w-full mt-5 py-2 text-xs text-center border border-dashed border-slate-600 rounded text-slate-400 hover:text-primary hover:border-primary transition-colors">
                            View Full Schedule
                        </button>
</div>
</div>
</div>
</div>
</main>
<!-- Footer -->
<footer class="border-t border-[#3a2c27] bg-[#181210] py-8 mt-10">
<div class="px-4 md:px-10 lg:px-40 flex flex-col items-center">
<div class="text-slate-500 text-sm mb-4">
                © 2024 Deep Dive Analytics. Powered by AI Models v4.2
            </div>
<div class="flex gap-6 text-slate-400 text-xs">
<a class="hover:text-primary" href="#">Privacy Policy</a>
<a class="hover:text-primary" href="#">Terms of Service</a>
<a class="hover:text-primary" href="#">Data Sources</a>
</div>
</div>
</footer>
</body></html>

<!-- Bracket Strategy Selector -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Bracket Strategy Selector - BracketAI</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script>
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#ff6933",
                        "primary-hover": "#e65020",
                        "background-light": "#f8f6f5",
                        "background-dark": "#0f1115", 
                        "surface-dark": "#181b21",
                        "surface-light": "#ffffff",
                        "border-dark": "#2d333b",
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"],
                        "body": ["Inter", "sans-serif"],
                    },
                },
            },
        }
    </script>
<style>
        /* Custom range slider styling */
        input[type=range] {
            -webkit-appearance: none; 
            background: transparent; 
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
        }
        input[type=range]:focus {
            outline: none; 
        }
    </style>
</head>
<body class="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
<!-- Header -->
<header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-border-dark bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
<div class="flex items-center gap-2 text-slate-900 dark:text-white">
<div class="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
<span class="material-symbols-outlined">analytics</span>
</div>
<h1 class="text-xl font-bold tracking-tight">BracketAI</h1>
</div>
<nav class="hidden md:flex items-center gap-8">
<a class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">Dashboard</a>
<a class="text-sm font-medium text-slate-900 dark:text-white" href="#">My Brackets</a>
<a class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">Leagues</a>
<a class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors" href="#">Analysis</a>
</nav>
<div class="flex items-center gap-4">
<button class="flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
<span class="material-symbols-outlined">notifications</span>
</button>
<div class="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-orange-400 p-[2px]">
<div class="h-full w-full rounded-full bg-background-dark overflow-hidden">
<img alt="User Avatar" class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxE-fC4xmF8sWKn2xPtCgjAM0oN4MeGgO7yZfYaXRvJadPcbDv-p9opJVMrv1jDD-K1fmqbhEaGFwmRyFJtmvn5sWptyYuXsLQdGcIv62Q3Jho5g4D2MjfULkHO2JyGbu5-hDvwV2vjlmMKoawMG0SNqi-q3srI_jp8v1NXXdvNNtp5JVpVNi0EpGf-_sJn75e_2hgMwJSRcHlIKa2IFlOZCyXd8mWoxEDuQ8MvdMsRAP5xqKfWGFjOWjPogFcAO-7vXXS9_Quig"/>
</div>
</div>
</div>
</div>
</header>
<main class="flex-grow flex flex-col items-center justify-start px-4 py-8 sm:px-6 lg:px-8">
<div class="w-full max-w-6xl flex flex-col gap-10">
<!-- Progress Stepper -->
<div class="w-full max-w-3xl mx-auto flex flex-col gap-4">
<div class="flex items-center justify-between text-sm font-medium text-slate-500 dark:text-slate-400">
<span class="text-primary">Strategy</span>
<span>Regionals</span>
<span>Final Four</span>
<span>Review</span>
</div>
<div class="relative h-2 w-full rounded-full bg-gray-200 dark:bg-border-dark overflow-hidden">
<div class="absolute left-0 top-0 h-full w-1/4 rounded-full bg-primary transition-all duration-500 ease-out"></div>
</div>
<div class="text-center mt-2">
<h2 class="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-2">Select Your Bracket Strategy</h2>
<p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Choose how our AI builds your bracket. Adapt your risk tolerance to your league size for the best chance of winning.
                    </p>
</div>
</div>
<!-- Strategy Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Card 1: Play It Safe -->
<div class="group relative flex flex-col rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-6 shadow-sm transition-all hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
<span class="material-symbols-outlined text-3xl">shield_lock</span>
</div>
<h3 class="text-xl font-bold text-slate-900 dark:text-white">Play It Safe</h3>
<p class="mt-2 flex-grow text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Optimized for favorites. High win probability, low variance. Ideal for small office pools where sticking to the chalk wins.
                    </p>
<div class="mt-6 pt-4 border-t border-gray-100 dark:border-border-dark/50">
<div class="flex items-center justify-between text-xs text-slate-500 mb-4">
<span>Risk Level</span>
<span class="font-semibold text-green-500">Low</span>
</div>
<button class="w-full rounded-lg bg-slate-100 dark:bg-border-dark py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-colors group-hover:bg-primary group-hover:text-white">
                            Select Strategy
                        </button>
</div>
</div>
<!-- Card 2: Balanced -->
<div class="group relative flex flex-col rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-6 shadow-sm transition-all hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 ring-2 ring-primary dark:ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark">
<div class="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                        Popular
                    </div>
<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
<span class="material-symbols-outlined text-3xl">balance</span>
</div>
<h3 class="text-xl font-bold text-slate-900 dark:text-white">Balanced</h3>
<p class="mt-2 flex-grow text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        The sweet spot. Smart upsets mixed with reliable picks. Best for medium pools (20-50 people).
                    </p>
<div class="mt-6 pt-4 border-t border-gray-100 dark:border-border-dark/50">
<div class="flex items-center justify-between text-xs text-slate-500 mb-4">
<span>Risk Level</span>
<span class="font-semibold text-blue-500">Medium</span>
</div>
<button class="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-hover">
                            Selected
                        </button>
</div>
</div>
<!-- Card 3: Chaos Mode -->
<div class="group relative flex flex-col rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-6 shadow-sm transition-all hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
<span class="material-symbols-outlined text-3xl">bolt</span>
</div>
<h3 class="text-xl font-bold text-slate-900 dark:text-white">Chaos Mode</h3>
<p class="mt-2 flex-grow text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Go big or go home. Targets high-value upsets and Cinderellas for maximum points in massive pools (100+).
                    </p>
<div class="mt-6 pt-4 border-t border-gray-100 dark:border-border-dark/50">
<div class="flex items-center justify-between text-xs text-slate-500 mb-4">
<span>Risk Level</span>
<span class="font-semibold text-purple-500">High</span>
</div>
<button class="w-full rounded-lg bg-slate-100 dark:bg-border-dark py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-colors group-hover:bg-primary group-hover:text-white">
                            Select Strategy
                        </button>
</div>
</div>
<!-- Card 4: Custom -->
<div class="group relative flex flex-col rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-6 shadow-sm transition-all hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 col-span-1 lg:col-span-1">
<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
<span class="material-symbols-outlined text-3xl">tune</span>
</div>
<h3 class="text-xl font-bold text-slate-900 dark:text-white">Custom</h3>
<p class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        You control the madness. Manually set your upset parameters.
                    </p>
<div class="mt-auto flex flex-col gap-4">
<div class="rounded-lg bg-slate-50 dark:bg-background-dark p-3 border border-gray-200 dark:border-border-dark">
<label class="flex justify-between text-xs font-medium text-slate-900 dark:text-slate-200 mb-2" for="upset-slider">
<span>Upset Tolerance</span>
<span class="text-primary">65%</span>
</label>
<input class="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&amp;::-webkit-slider-thumb]:appearance-none [&amp;::-webkit-slider-thumb]:w-4 [&amp;::-webkit-slider-thumb]:h-4 [&amp;::-webkit-slider-thumb]:rounded-full [&amp;::-webkit-slider-thumb]:bg-primary" id="upset-slider" max="100" min="0" type="range" value="65"/>
<div class="flex justify-between mt-1 text-[10px] text-slate-400 uppercase tracking-wide">
<span>Safe</span>
<span>Chaos</span>
</div>
</div>
<div class="pt-2 border-t border-gray-100 dark:border-border-dark/50">
<button class="w-full rounded-lg bg-slate-100 dark:bg-border-dark py-2.5 text-sm font-semibold text-slate-900 dark:text-white transition-colors group-hover:bg-primary group-hover:text-white">
                                Configure Custom
                            </button>
</div>
</div>
</div>
</div>
<!-- Additional Info Section -->
<div class="w-full rounded-xl bg-surface-dark border border-border-dark overflow-hidden relative">
<div class="absolute inset-0 bg-gradient-to-r from-surface-dark via-surface-dark to-transparent z-10"></div>
<img class="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity grayscale" data-alt="Abstract basketball court analytics pattern" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFVbpGYtJe4lOpnba4nUkd6wsGpkUFt1mac67U1m8bP2ZWxJO_bW769kLEjl2Hn56dz-Je5ePR5ZbsewIh0zmGkIcLTQiwV3ro_q1qzWbWva9TFXprbrfHmx13hCaY8RODA-bONhCamTVZCXcfxhrGzIJCDoMn2NDJQnVlMmRycLLIcdz0fx2lEySPmucTrmWyD4E1OdOvR0rJvVtr8J4QqzzsjmslM1Y0eWzQ7gFuXQQ2iImOBqDVVyyBE7M2fT6xbgg28rjU5A"/>
<div class="relative z-20 flex flex-col md:flex-row items-center justify-between p-8 gap-8">
<div class="flex-1 space-y-2">
<h3 class="text-xl font-bold text-white">Not sure which strategy to pick?</h3>
<p class="text-slate-400 text-sm">
                            Our "League Analyzer" can scan your pool's settings and recommend the optimal mathematical strategy to maximize your edge.
                        </p>
</div>
<div class="flex gap-4">
<button class="flex items-center gap-2 rounded-lg border border-border-dark bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5 transition-colors">
<span class="material-symbols-outlined text-[20px]">help</span>
                            How it works
                        </button>
<button class="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-slate-200 transition-colors">
<span class="material-symbols-outlined text-[20px]">magic_button</span>
                            Analyze My League
                        </button>
</div>
</div>
</div>
</div>
</main>
<!-- Footer -->
<footer class="mt-auto w-full border-t border-gray-200 dark:border-border-dark bg-white dark:bg-background-dark py-8">
<div class="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
<p>© 2024 BracketAI Inc. All rights reserved.</p>
<div class="flex gap-6">
<a class="hover:text-primary transition-colors" href="#">Methodology</a>
<a class="hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a class="hover:text-primary transition-colors" href="#">Support</a>
</div>
</div>
</footer>
</body></html>

<!-- Share & Export Bracket -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Share &amp; Export Bracket - BracketBrain</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#ff6933",
                        "background-light": "#f8f6f5",
                        "background-dark": "#23140f",
                        "surface-dark": "#2d1b15", // A slightly lighter dark for cards
                        "surface-border": "#4a3b36", // Border color derived from palette
                    },
                    fontFamily: {
                        "display": ["Inter", "sans-serif"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        /* Custom scrollbar for the bracket preview */
        .bracket-scroll::-webkit-scrollbar {
            height: 8px;
            width: 8px;
        }
        .bracket-scroll::-webkit-scrollbar-track {
            background: #23140f;
        }
        .bracket-scroll::-webkit-scrollbar-thumb {
            background: #4a3b36;
            border-radius: 4px;
        }
        .bracket-scroll::-webkit-scrollbar-thumb:hover {
            background: #ff6933;
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col overflow-hidden">
<!-- Top Navigation -->
<header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-surface-border px-8 py-4 bg-background-light dark:bg-background-dark z-20">
<div class="flex items-center gap-4 text-slate-900 dark:text-slate-100">
<div class="size-8 flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-3xl">sports_basketball</span>
</div>
<h2 class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">BracketBrain</h2>
</div>
<div class="flex flex-1 justify-end gap-8">
<nav class="hidden md:flex items-center gap-9">
<a class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Builder</a>
<a class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">My Brackets</a>
<a class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Leaderboard</a>
<a class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Analytics</a>
</nav>
<div class="flex gap-3 items-center">
<div class="hidden md:flex items-center gap-2 mr-4">
<div class="h-8 w-8 rounded-full bg-surface-border flex items-center justify-center text-xs font-bold">JD</div>
</div>
</div>
</div>
</header>
<!-- Main Content Layout -->
<main class="flex-1 flex overflow-hidden">
<!-- Left Side: Interactive Bracket Preview Canvas -->
<section class="flex-1 relative flex flex-col bg-[#1a100c] overflow-hidden">
<!-- Toolbar for Canvas -->
<div class="absolute top-4 left-4 z-10 flex gap-2">
<button class="bg-surface-dark/80 backdrop-blur border border-surface-border hover:bg-surface-border text-white p-2 rounded-lg transition-colors" title="Zoom In">
<span class="material-symbols-outlined text-lg">add</span>
</button>
<button class="bg-surface-dark/80 backdrop-blur border border-surface-border hover:bg-surface-border text-white p-2 rounded-lg transition-colors" title="Zoom Out">
<span class="material-symbols-outlined text-lg">remove</span>
</button>
<button class="bg-surface-dark/80 backdrop-blur border border-surface-border hover:bg-surface-border text-white p-2 rounded-lg transition-colors" title="Reset View">
<span class="material-symbols-outlined text-lg">fit_screen</span>
</button>
</div>
<!-- Canvas Area -->
<div class="flex-1 overflow-auto bracket-scroll flex items-center justify-center p-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-dark to-background-dark">
<!-- Abstract Representation of a Bracket -->
<div class="relative min-w-[1000px] min-h-[600px] bg-surface-dark/30 rounded-xl border border-surface-border p-8 shadow-2xl scale-90 origin-center">
<!-- Decorative connectors lines -->
<div class="absolute inset-0 opacity-20 pointer-events-none">
<!-- SVG Lines would go here in real app -->
<svg height="100%" width="100%">
<path class="text-slate-500" d="M50,50 H100 V150 H50" fill="none" stroke="currentColor" stroke-width="2"></path>
<path class="text-slate-500" d="M50,250 H100 V150" fill="none" stroke="currentColor" stroke-width="2"></path>
<path class="text-slate-500" d="M100,150 H150 V300 H200" fill="none" stroke="currentColor" stroke-width="2"></path>
<!-- Right side mirror -->
<path class="text-slate-500" d="M950,50 H900 V150 H950" fill="none" stroke="currentColor" stroke-width="2"></path>
<path class="text-slate-500" d="M950,250 H900 V150" fill="none" stroke="currentColor" stroke-width="2"></path>
</svg>
</div>
<!-- Bracket Winner Centerpiece -->
<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
<div class="text-primary font-bold uppercase tracking-widest text-xs mb-2">Champion Prediction</div>
<div class="h-24 w-24 rounded-full bg-white p-1 shadow-[0_0_40px_rgba(255,105,51,0.4)] relative group cursor-pointer transition-transform hover:scale-105">
<img alt="Champion Team Logo" class="h-full w-full rounded-full object-cover" data-alt="University Basketball Team Logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBqfRjPrvivk71OnHi8mdf--fQir_lvWb1wUb7QQ_BvHFFvEFYxwwyCmlCBgvQqwTxV1ihwhv1vFAMylDvx8KPrSy1jMmj6toM5NP5MHgUOyC3-TZNksgjG-U20cMOcL4m21o8r2M8sK804jCKlpiDW4vYkSrxWcHngIewOwFK_AVWb0MUPAi-mJEf-CXZNget6htgX9c1o9rwUw19K5S-nO9BewLCIinb5TuRPjRUZuUoLaKBt7OgTWBqfJEjx3yjSucnSfTCQw"/>
<div class="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                Wildcats
                            </div>
</div>
</div>
<!-- Left Bracket Branch Mockup -->
<div class="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-8 w-48">
<div class="bg-surface-dark border border-surface-border p-3 rounded flex justify-between items-center shadow-lg">
<div class="flex items-center gap-2">
<span class="text-xs text-slate-400">1</span>
<span class="text-sm font-semibold text-white">Duke</span>
</div>
<span class="text-xs font-mono text-primary">98%</span>
</div>
<div class="bg-surface-dark border border-surface-border p-3 rounded flex justify-between items-center shadow-lg opacity-60">
<div class="flex items-center gap-2">
<span class="text-xs text-slate-400">16</span>
<span class="text-sm font-semibold text-slate-300">NCCU</span>
</div>
</div>
</div>
<!-- Right Bracket Branch Mockup -->
<div class="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-8 w-48">
<div class="bg-surface-dark border border-surface-border p-3 rounded flex justify-between items-center shadow-lg">
<div class="flex items-center gap-2">
<span class="text-xs text-slate-400">2</span>
<span class="text-sm font-semibold text-white">Arizona</span>
</div>
<span class="text-xs font-mono text-primary">92%</span>
</div>
<div class="bg-surface-dark border border-surface-border p-3 rounded flex justify-between items-center shadow-lg opacity-60">
<div class="flex items-center gap-2">
<span class="text-xs text-slate-400">15</span>
<span class="text-sm font-semibold text-slate-300">LBSU</span>
</div>
</div>
</div>
</div>
</div>
<div class="absolute bottom-6 left-6 right-6 pointer-events-none flex justify-between items-end">
<div class="bg-background-dark/90 backdrop-blur px-4 py-2 rounded-lg border border-surface-border pointer-events-auto">
<p class="text-xs text-slate-400 uppercase tracking-wider font-semibold">Current View</p>
<p class="text-white text-sm font-medium">Final Four Region</p>
</div>
<button class="pointer-events-auto flex items-center gap-2 bg-surface-dark hover:bg-surface-border border border-surface-border text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg">
<span class="material-symbols-outlined text-lg">edit</span>
                    Edit Picks
                </button>
</div>
</section>
<!-- Right Side: Action Sidebar -->
<aside class="w-[400px] min-w-[400px] bg-background-dark border-l border-surface-border flex flex-col h-full overflow-y-auto z-10">
<div class="p-8 flex flex-col gap-8">
<!-- Header Info -->
<div class="space-y-2">
<div class="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
<span class="material-symbols-outlined text-base">check_circle</span>
                        Analysis Complete
                    </div>
<h1 class="text-3xl font-bold text-white leading-tight">Your Bracket is Ready!</h1>
<p class="text-slate-400 text-sm">BracketBrain #84920 • Generated March 14, 2024</p>
</div>
<!-- Insight Cards Grid -->
<div class="grid grid-cols-2 gap-3">
<!-- Confidence Card -->
<div class="bg-surface-dark border border-surface-border rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden group">
<div class="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-6xl text-primary">psychology</span>
</div>
<p class="text-slate-400 text-xs font-medium uppercase tracking-wider">AI Confidence</p>
<div class="flex items-baseline gap-1 mt-1">
<span class="text-3xl font-bold text-white font-mono">92</span>
<span class="text-sm font-bold text-primary">%</span>
</div>
<div class="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
<div class="bg-primary h-full w-[92%] rounded-full"></div>
</div>
<p class="text-[10px] text-slate-500 mt-2">Top 8% of predicted outcomes</p>
</div>
<!-- Upsets Card -->
<div class="bg-surface-dark border border-surface-border rounded-xl p-4 flex flex-col gap-2 relative overflow-hidden group">
<div class="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
<span class="material-symbols-outlined text-6xl text-orange-300">bolt</span>
</div>
<p class="text-slate-400 text-xs font-medium uppercase tracking-wider">Upsets Picked</p>
<div class="flex items-baseline gap-1 mt-1">
<span class="text-3xl font-bold text-white font-mono">5</span>
<span class="text-sm text-slate-400">Major</span>
</div>
<div class="flex -space-x-2 mt-2">
<div class="h-6 w-6 rounded-full border border-surface-dark bg-slate-600 flex items-center justify-center text-[8px] text-white font-bold">12</div>
<div class="h-6 w-6 rounded-full border border-surface-dark bg-slate-600 flex items-center justify-center text-[8px] text-white font-bold">11</div>
<div class="h-6 w-6 rounded-full border border-surface-dark bg-slate-600 flex items-center justify-center text-[8px] text-white font-bold">+3</div>
</div>
<p class="text-[10px] text-slate-500 mt-2">Risk Factor: Aggressive</p>
</div>
</div>
<hr class="border-surface-border"/>
<!-- Sharing Section -->
<div class="space-y-4">
<h3 class="text-white font-semibold text-lg flex items-center gap-2">
                        Share Bracket
                    </h3>
<!-- Copy Link Input -->
<div class="flex gap-2">
<div class="relative flex-1 group">
<div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-slate-500 text-lg">link</span>
</div>
<input class="w-full bg-surface-dark border border-surface-border text-slate-300 text-sm rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" readonly="" type="text" value="bracketbrain.ai/b/johndoe84"/>
</div>
<button class="bg-primary hover:bg-orange-600 text-white font-semibold rounded-lg px-4 py-2.5 transition-colors flex items-center justify-center gap-2 shrink-0">
                            Copy
                        </button>
</div>
<!-- Social Icons -->
<div class="grid grid-cols-4 gap-3">
<button class="flex items-center justify-center h-10 rounded-lg bg-surface-dark border border-surface-border hover:bg-slate-800 hover:text-white text-slate-400 transition-all">
<!-- X / Twitter Icon -->
<svg class="h-4 w-4 fill-current" viewbox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
</button>
<button class="flex items-center justify-center h-10 rounded-lg bg-surface-dark border border-surface-border hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] text-slate-400 transition-all">
<!-- Facebook -->
<svg class="h-5 w-5 fill-current" viewbox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
</button>
<button class="flex items-center justify-center h-10 rounded-lg bg-surface-dark border border-surface-border hover:bg-[#FF4500] hover:text-white hover:border-[#FF4500] text-slate-400 transition-all">
<!-- Reddit -->
<svg class="h-5 w-5 fill-current" viewbox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"></path></svg>
</button>
<button class="flex items-center justify-center h-10 rounded-lg bg-surface-dark border border-surface-border hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] text-slate-400 transition-all">
<!-- LinkedIn -->
<svg class="h-5 w-5 fill-current" viewbox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
</button>
</div>
</div>
<!-- Export Section -->
<div class="space-y-4">
<h3 class="text-white font-semibold text-lg flex items-center gap-2">
                        Export Image
                    </h3>
<div class="bg-surface-dark border border-surface-border p-4 rounded-xl flex flex-col gap-3">
<div class="flex items-center justify-between">
<span class="text-slate-300 text-sm font-medium">Format</span>
<div class="flex bg-background-dark rounded p-1">
<button class="px-3 py-1 rounded text-xs font-medium bg-surface-border text-white shadow-sm">PNG</button>
<button class="px-3 py-1 rounded text-xs font-medium text-slate-400 hover:text-white">PDF</button>
<button class="px-3 py-1 rounded text-xs font-medium text-slate-400 hover:text-white">CSV</button>
</div>
</div>
<div class="flex items-center justify-between">
<span class="text-slate-300 text-sm font-medium">Resolution</span>
<span class="text-slate-500 text-sm">High (2x)</span>
</div>
<button class="mt-2 w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-white text-background-dark font-bold text-sm py-3 rounded-lg transition-colors">
<span class="material-symbols-outlined text-lg">download</span>
                            Download Prediction
                        </button>
</div>
</div>
<div class="mt-auto pt-6 flex justify-center">
<a class="text-slate-500 hover:text-slate-300 text-sm flex items-center gap-1 transition-colors" href="#">
<span class="material-symbols-outlined text-sm">flag</span>
                        Report an issue
                    </a>
</div>
</div>
</aside>
</main>
</body></html>