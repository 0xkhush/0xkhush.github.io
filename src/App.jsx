import React from "react";
import { motion } from "framer-motion";
import { Toaster } from "./components/ui/toaster";
import { Code2, Github, Linkedin, Mail, Heart, MonitorPlay, Terminal, Cpu, Zap } from "lucide-react";

const BlogPost = ({ title, date, excerpt }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-lg shadow-md mb-6"
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-500 mb-3">{date}</p>
    <p className="text-gray-700">{excerpt}</p>
  </motion.div>
);

const FavoriteItem = ({ icon, title, description, details }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm"
  >
    {icon}
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      {details && (
        <div className="mt-2 flex gap-2 flex-wrap">
          {details.map((detail, index) => (
            <span 
              key={index}
              className="inline-block px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
            >
              {detail}
            </span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-sm"
      >
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">Khush</h1>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* About Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-8 rounded-lg shadow-md mb-8"
        >
          <div className="flex items-center mb-6">
            <Code2 className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">About Me</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Hello! I'm Khushvendra, a passionate coder who loves to explore and create with technology. 
            When I'm not immersed in code, you'll find me watching anime or experimenting with different code editors. 
            I believe in the power of coding to transform ideas into reality and enjoy sharing my journey 
            through this blog. My dedication to coding is matched only by my enthusiasm for anime and 
            discovering new ways to enhance my development workflow.
            </p>
          
          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            <a href="https://github.com/0xkhush" className="text-gray-600 hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/khushvendra-singh" className="text-gray-600 hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:0xkhush@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          </motion.section>
          

        {/* Favorites Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 text-red-500 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">My Favorite Things</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <FavoriteItem 
              icon={<MonitorPlay className="w-6 h-6 text-purple-500" />}
              title="Anime"
              description="I love diving into different anime series. Here are my absolute favorites!"
              details={["Naruto", "One Punch Man"]}
            />
            <FavoriteItem 
              icon={<Terminal className="w-6 h-6 text-green-500" />}
              title="Editors"
              description="My preferred code editors that help me write better code"
              details={["VS Code", "Zed"]}
            />
            <FavoriteItem 
              icon={<Cpu className="w-6 h-6 text-blue-500" />}
              title="Programming Languages"
              description="My preferred languages for bringing ideas to life"
              details={["Python", "C","C++"]}
            />
            <FavoriteItem 
              icon={<Zap className="w-6 h-6 text-yellow-500" />}
              title="Current Learning Goals"
              description="Always expanding my knowledge in different areas of programming"
              details={["Advanced Python", "System Programming in C++","Data Structures and Algorithms"]}
            />
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-sm mt-12">
  <div className="container mx-auto px-4 py-6">
    <div className="flex justify-between items-center">
      <p className="text-left text-gray-600">© Designed & Developed by Khushvendra</p>
      <a href="mailto:0xkhush@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
        <Mail className="w-6 h-6 mr-2" />
        Contact me
      </a>
    </div>
  </div>
</footer>
    </div>
  );
}

export default App;