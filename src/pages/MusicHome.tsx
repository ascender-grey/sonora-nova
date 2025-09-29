import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Search, Home, Library, User } from "lucide-react";
import { SonoraButton } from "@/components/ui/sonora-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const MusicHome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState({
    title: "Cosmic Journey",
    artist: "Stellar Waves",
    album: "Galaxy Dreams",
    duration: "3:45"
  });

  const trendingSongs = [
    { id: 1, title: "Nebula Dance", artist: "Space Echo", duration: "4:12" },
    { id: 2, title: "Starlight Melody", artist: "Cosmic Vibes", duration: "3:28" },
    { id: 3, title: "Aurora Beats", artist: "Northern Lights", duration: "5:15" },
    { id: 4, title: "Galactic Rhythm", artist: "Void Runners", duration: "3:52" },
  ];

  const recentlyPlayed = [
    { id: 1, title: "Interstellar", artist: "Deep Space", album: "Beyond", cover: "/api/placeholder/60/60" },
    { id: 2, title: "Moonbeam", artist: "Luna", album: "Satellite", cover: "/api/placeholder/60/60" },
    { id: 3, title: "Solar Flare", artist: "Sun Rays", album: "Corona", cover: "/api/placeholder/60/60" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-card border-r border-border p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sonora
          </span>
        </div>

        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent/10">
            <Home size={20} />
            Home
          </a>
          <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent/10">
            <Search size={20} />
            Search
          </a>
          <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent/10">
            <Library size={20} />
            Your Library
          </a>
          <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent/10">
            <Heart size={20} />
            Liked Songs
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 pb-32">
        {/* Header */}
        <header className="bg-card/50 backdrop-blur-sm border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SonoraButton variant="outline" size="icon">
                <Search size={16} />
              </SonoraButton>
              <Input 
                placeholder="What do you want to listen to?" 
                className="w-80 bg-background/50 border-border"
              />
            </div>
            <div className="flex items-center gap-4">
              <SonoraButton variant="ghost" size="icon">
                <User size={20} />
              </SonoraButton>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-8">
          {/* Welcome Section */}
          <section>
            <h1 className="text-3xl font-bold mb-2">Good evening</h1>
            <p className="text-muted-foreground">Ready to discover your next favorite song?</p>
          </section>

          {/* Recently Played */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Recently Played</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentlyPlayed.map((song) => (
                <Card key={song.id} className="p-4 hover:bg-accent/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-accent rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎵</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{song.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                    </div>
                    <SonoraButton variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={16} />
                    </SonoraButton>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Trending */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
            <div className="space-y-2">
              {trendingSongs.map((song, index) => (
                <div key={song.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/10 transition-colors group cursor-pointer">
                  <span className="text-muted-foreground w-4 text-center">{index + 1}</span>
                  <SonoraButton variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={16} />
                  </SonoraButton>
                  <div className="flex-1">
                    <h3 className="font-medium">{song.title}</h3>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </div>
                  <span className="text-muted-foreground text-sm">{song.duration}</span>
                  <SonoraButton variant="ghost" size="icon">
                    <Heart size={16} />
                  </SonoraButton>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex items-center justify-between">
          {/* Currently Playing */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-14 h-14 bg-gradient-accent rounded-lg flex items-center justify-center">
              <span className="text-xl animate-rotate-slow">🎵</span>
            </div>
            <div>
              <h4 className="font-medium">{currentSong.title}</h4>
              <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
            </div>
            <SonoraButton variant="ghost" size="icon">
              <Heart size={16} />
            </SonoraButton>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 flex-1 justify-center">
            <SonoraButton variant="ghost" size="icon">
              <SkipBack size={20} />
            </SonoraButton>
            <SonoraButton 
              variant="glow" 
              size="icon" 
              className="w-12 h-12"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </SonoraButton>
            <SonoraButton variant="ghost" size="icon">
              <SkipForward size={20} />
            </SonoraButton>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            <Volume2 size={20} />
            <div className="w-24 h-1 bg-muted rounded-full">
              <div className="w-3/4 h-full bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicHome;