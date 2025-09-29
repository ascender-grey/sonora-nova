import { Link } from "react-router-dom";
import { Play, Music, Headphones, Star } from "lucide-react";
import MusicGalaxyBackground from "@/components/MusicGalaxyBackground";
import { SonoraButton } from "@/components/ui/sonora-button";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* 3D Animated Background */}
      <MusicGalaxyBackground />
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full z-20 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-glow">
              <Music className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Sonora
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <a href="#features" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Features
            </a>
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight">
              Experience Music
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Dive into a cosmic journey of sound with Sonora's premium 3D-enhanced music streaming platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/music">
                <SonoraButton variant="hero" size="xl" className="group">
                  <Play className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                  Enter Sonora Universe
                </SonoraButton>
              </Link>
              
              <SonoraButton variant="outline" size="xl" className="group">
                <Headphones className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                Watch Demo
              </SonoraButton>
            </div>
          </motion.div>

          {/* Feature highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-glow">
                <Music className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">3D Immersive</h3>
              <p className="text-foreground/60">Experience music in stunning 3D environments</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-glow">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-foreground/60">Crystal clear audio with spatial sound</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-glow">
                <Headphones className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Discovery</h3>
              <p className="text-foreground/60">AI-powered recommendations just for you</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating elements for depth */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-primary rounded-full opacity-60 animate-float"></div>
      <div className="absolute top-40 right-20 w-2 h-2 bg-accent rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
    </main>
  );
};

export default Index;
