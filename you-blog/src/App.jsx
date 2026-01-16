import React, { useEffect, useRef } from "react";
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
  Sparkles,
  Rocket,
} from "lucide-react";

const FavoriteItem = ({ icon, title, description, details, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ scale: 1.05, rotateY: 5 }}
    className="group relative flex items-start gap-4 p-6 bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-300 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
    <div className="relative z-10 p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
      {icon}
    </div>
    <div className="relative z-10 flex-1">
      <h3 className="font-bold text-lg text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      {details && (
        <div className="flex gap-2 flex-wrap">
          {details.map((detail, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.1, y: -2 }}
              className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-800 border border-blue-200/50 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              {detail}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-x-hidden">
      <AnimatedBackground />

      {/* Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 -right-48 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <Toaster />

      {/* Hero Header */}
      <motion.header
        style={{ opacity, scale }}
        className="relative z-10 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-2xl border-b border-white/20 shadow-2xl"
      >
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-12 h-12 text-yellow-500 drop-shadow-glow" />
            </motion.div>
            <h1 className="text-6xl font-black mb-2">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg animate-gradient bg-[length:200%_auto]">
                Khushvendra's Blog
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-lg font-medium"
            >
              Code • Anime • Technology
            </motion.p>
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
          className="relative bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl mb-12 border border-white/30 overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg mr-4"
              >
                <Code2 className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                About Me
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
                <Rocket className="w-8 h-8 text-purple-500" />
              </motion.div>
            </div>

            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              Hello! I'm{" "}
              <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Khushvendra
              </span>
              , a passionate coder who loves to explore and create with
              technology. When I'm not immersed in code, you'll find me watching
              anime or experimenting with different code editors. I believe in
              the power of coding to transform ideas into reality and enjoy
              sharing my journey through this blog. My dedication to coding is
              matched only by my enthusiasm for anime and discovering new ways
              to enhance my development workflow.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-4 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-4 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
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
                scale: [1, 1.1, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-10 h-10 text-red-500 fill-red-500 mr-4 drop-shadow-lg" />
            </motion.div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              My Favorite Things
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <FavoriteItem
              icon={<MonitorPlay className="w-7 h-7 text-white" />}
              title="Anime"
              description="I love diving into different anime series. Here are my absolute favorites!"
              details={["Naruto", "One Punch Man"]}
              index={0}
            />
            <FavoriteItem
              icon={<Terminal className="w-7 h-7 text-white" />}
              title="Editors"
              description="My preferred code editors that help me write better code"
              details={["VS Code", "Zed"]}
              index={1}
            />
            <FavoriteItem
              icon={<Cpu className="w-7 h-7 text-white" />}
              title="Programming Languages"
              description="My preferred languages for bringing ideas to life"
              details={["Python", "C", "C++"]}
              index={2}
            />
            <FavoriteItem
              icon={<Zap className="w-7 h-7 text-white" />}
              title="Current Learning Goals"
              description="Always expanding my knowledge in different areas of programming"
              details={["Data Structures & Algorithms", "Backend Development"]}
              index={3}
            />
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-2xl border-t border-white/20 shadow-2xl mt-16"
      >
        <div className="container mx-auto px-4 py-8">
          <motion.p
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 font-medium"
          >
            © 2023 Khushvendra's Blog. All rights reserved.
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
