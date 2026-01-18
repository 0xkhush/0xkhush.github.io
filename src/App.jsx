import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Toaster } from "./components/ui/toaster";
import {
  Code2,
  Github,
  Linkedin,
  Mail,
  Heart,
  MonitorPlay,
  Terminal,
  Cpu,
  Zap,
  Shield,
  Lock,
} from "lucide-react";

const FavoriteItem = ({ icon, title, description, details, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15, duration: 0.5 }}
    whileHover={{ scale: 1.02, x: 10 }}
    className="group relative flex items-start gap-4 p-6 bg-black/90 backdrop-blur-xl rounded-lg border-2 border-green-500/30 hover:border-green-500 transition-all duration-300 overflow-hidden terminal-border scanline"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute top-0 left-0 w-full h-px bg-green-500/50 animate-pulse-glow-green" />

    <div className="relative z-10 p-3 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-lg border border-green-500/50 box-neon-green group-hover:animate-pulse-glow-green transition-all duration-300">
      {icon}
    </div>

    <div className="relative z-10 flex-1">
      <h3 className="font-bold text-lg text-green-400 mb-1 group-hover:text-neon-green transition-colors font-mono">
        <span className="text-cyan-400">$</span> {title}
      </h3>
      <p className="text-gray-400 text-sm mb-3 font-mono">{description}</p>
      {details && (
        <div className="flex gap-2 flex-wrap">
          {details.map((detail, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-block px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded border border-cyan-500/50 text-sm font-semibold text-cyan-400 hover:text-neon-cyan hover:border-cyan-500 transition-all cursor-pointer font-mono"
            >
              [{detail}]
            </motion.span>
          ))}
        </div>
      )}
    </div>
    <div className="absolute bottom-0 right-0 text-green-500/10 text-6xl font-mono font-bold">
      {String(index + 1).padStart(2, "0")}
    </div>
  </motion.div>
);

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillStyle =
          drops[i] * fontSize > canvas.height * 0.95 ? "#00ff0050" : "#00ff00";
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
    />
  );
};

const ScanlineEffect = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse" />
  </div>
);

const TerminalHeader = () => {
  const [text, setText] = useState("");
  const fullText = "root@0xkhush:~# Welcome to the Matrix";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-green-400">
      {text}
      <span className="animate-blink">_</span>
    </div>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden crt-screen">
      <MatrixRain />
      <ScanlineEffect />

      {/* Grid Background */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none z-0" />

      {/* Glowing Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 -right-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Toaster />

      {/* Hero Header */}
      <motion.header
        style={{ opacity, scale }}
        className="relative z-10 bg-black/95 backdrop-blur-xl border-b-2 border-green-500/50 shadow-2xl"
      >
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Terminal Window Header */}
            <div className="max-w-4xl mx-auto mb-8 bg-gray-900/50 border-2 border-green-500/50 rounded-lg overflow-hidden terminal-border">
              <div className="bg-gray-800/80 px-4 py-2 flex items-center gap-2 border-b border-green-500/30">
                <div className="w-3 h-3 rounded-full bg-red-500 box-neon-red animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 box-neon-green animate-pulse"></div>
                <span className="ml-4 text-green-400 text-sm font-mono">
                  terminal@portfolio
                </span>
              </div>
              <div className="p-6 font-mono text-left">
                <TerminalHeader />
              </div>
            </div>

            <motion.div
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: "linear",
              }}
              className="inline-block mb-4"
            >
              <Shield className="w-12 h-12 text-green-500 box-neon-green" />
            </motion.div>

            <h1 className="text-7xl font-black mb-4 font-mono">
              <span className="text-neon-green animate-flicker">0x</span>
              <span className="text-neon-cyan">Khush</span>
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-green-400 text-lg font-mono flex items-center justify-center gap-2"
            >
              <span className="text-cyan-400">[</span>
              <Terminal className="w-5 h-5 text-green-500" />
              <span>Hacker</span>
              <span className="text-red-500">•</span>
              <span>Coder</span>
              <span className="text-red-500">•</span>
              <span>Anime Fan</span>
              <span className="text-cyan-400">]</span>
            </motion.div>

            {/* Status Bar */}
            <div className="mt-6 flex justify-center gap-4 text-xs font-mono">
              <span className="text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse box-neon-green"></span>
                SYSTEM: ONLINE
              </span>
              <span className="text-cyan-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse box-neon-cyan"></span>
                ACCESS: GRANTED
              </span>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-black/90 backdrop-blur-xl p-10 rounded-lg mb-12 border-2 border-green-500/50 terminal-border overflow-hidden group scanline"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Section Header */}
            <div className="flex items-center mb-8">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="p-4 bg-gradient-to-br from-green-500/30 to-cyan-500/30 rounded-lg border-2 border-green-500/50 box-neon-green mr-4"
              >
                <Code2 className="w-8 h-8 text-green-400" />
              </motion.div>
              <h2 className="text-4xl font-bold text-neon-green font-mono">
                <span className="text-cyan-400">&gt;&gt;</span> whoami
              </h2>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="ml-auto"
              >
                <Lock className="w-8 h-8 text-cyan-500 box-neon-cyan" />
              </motion.div>
            </div>

            {/* Terminal Output Style */}
            <div className="bg-gray-900/50 p-6 rounded-lg border border-green-500/30 mb-6 font-mono text-sm">
              <div className="text-green-400 mb-2">
                <span className="text-cyan-400">$</span> cat about.txt
              </div>
              <div className="text-gray-300 leading-relaxed space-y-3">
                <p>
                  <span className="text-cyan-400">&gt;</span> Hello! I'm{" "}
                  <span className="text-neon-green font-bold">Khushvendra</span>
                  , a passionate coder who loves to explore and create with
                  technology.
                </p>
                <p>
                  <span className="text-cyan-400">&gt;</span> When I'm not
                  immersed in code, you'll find me watching anime or
                  experimenting with different code editors.
                </p>
                <p>
                  <span className="text-cyan-400">&gt;</span> I believe in the
                  power of coding to transform ideas into reality and enjoy
                  sharing my journey through this blog.
                </p>
                <p>
                  <span className="text-cyan-400">&gt;</span> My dedication to
                  coding is matched only by my enthusiasm for anime and
                  discovering new ways to enhance my development workflow.
                </p>
              </div>
              <div className="mt-4 text-green-400">
                <span className="text-cyan-400">$</span>{" "}
                <span className="animate-blink">_</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/0xkhush"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-black/80 border-2 border-gray-500/50 hover:border-gray-400 rounded-lg transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Github className="w-6 h-6 text-gray-400 group-hover:text-white relative z-10 transition-colors" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/khushvendra-singh/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-black/80 border-2 border-cyan-500/50 hover:border-cyan-500 box-neon-cyan rounded-lg transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Linkedin className="w-6 h-6 text-cyan-400 group-hover:text-neon-cyan relative z-10 transition-colors" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:0xkhush@gmail.com"
                className="p-4 bg-black/80 border-2 border-green-500/50 hover:border-green-500 box-neon-green rounded-lg transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Mail className="w-6 h-6 text-green-400 group-hover:text-neon-green relative z-10 transition-colors" />
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* Favorites Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center mb-8">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-10 h-10 text-red-500 fill-red-500 mr-4 box-neon-red" />
            </motion.div>
            <h2 className="text-4xl font-bold text-neon-red font-mono">
              <span className="text-cyan-400">&gt;&gt;</span> favorites.json
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <FavoriteItem
              icon={<MonitorPlay className="w-7 h-7 text-green-400" />}
              title="anime_list"
              description="// My favorite anime series that keep me inspired"
              details={["Naruto", "One Punch Man"]}
              index={0}
            />
            <FavoriteItem
              icon={<Terminal className="w-7 h-7 text-cyan-400" />}
              title="code_editors"
              description="// Tools I use to craft clean code"
              details={["VS Code", "Zed"]}
              index={1}
            />
            <FavoriteItem
              icon={<Cpu className="w-7 h-7 text-green-400" />}
              title="languages"
              description="// Programming languages I master"
              details={["Python", "C", "C++"]}
              index={2}
            />
            <FavoriteItem
              icon={<Zap className="w-7 h-7 text-cyan-400" />}
              title="learning_path"
              description="// Current skill upgrades in progress"
              details={["Data Structures & Algorithms", "Backend Development"]}
              index={3}
            />
          </div>
        </motion.section>

        {/* System Info Panel */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black/90 border-2 border-cyan-500/50 rounded-lg p-6 font-mono text-sm terminal-border scanline"
        >
          <div className="text-cyan-400 mb-4">
            <span className="text-green-400">$</span> system_status --verbose
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-gray-400">
            <div>
              <span className="text-green-400">Status:</span> Active
            </div>
            <div>
              <span className="text-green-400">Mode:</span> Development
            </div>
            <div>
              <span className="text-green-400">Uptime:</span> 99.9%
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 bg-black/95 backdrop-blur-xl border-t-2 border-green-500/50 shadow-2xl mt-16"
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-green-400 font-mono mb-2">
              <span className="text-cyan-400">[</span>© 2023 0xKhush - All
              Systems Operational
              <span className="text-cyan-400">]</span>
            </p>
            <p className="text-gray-500 text-sm font-mono">
              <span className="text-red-500">⚠</span> Unauthorized access is
              prohibited <span className="text-red-500">⚠</span>
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
