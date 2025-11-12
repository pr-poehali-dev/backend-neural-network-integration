import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

const mockTracks: Track[] = [
  { id: 1, title: 'Midnight Dreams', artist: 'Luna Sky', duration: '3:45', cover: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=300&h=300&fit=crop' },
  { id: 2, title: 'Electric Pulse', artist: 'Nova Wave', duration: '4:12', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' },
  { id: 3, title: 'City Lights', artist: 'Urban Echo', duration: '3:28', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
  { id: 4, title: 'Ocean Waves', artist: 'Blue Horizon', duration: '5:01', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop' },
  { id: 5, title: 'Neon Nights', artist: 'Synthwave', duration: '3:56', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop' },
  { id: 6, title: 'Summer Vibes', artist: 'Tropical Mix', duration: '4:23', cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop' },
];

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([1, 3]);
  const [volume, setVolume] = useState([75]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (track?: Track) => {
    if (track && track.id !== currentTrack?.id) {
      setCurrentTrack(track);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFavorite = (trackId: number) => {
    setFavorites(prev =>
      prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const skipTrack = (direction: 'prev' | 'next') => {
    if (!currentTrack) return;
    const currentIndex = mockTracks.findIndex(t => t.id === currentTrack.id);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % mockTracks.length
      : (currentIndex - 1 + mockTracks.length) % mockTracks.length;
    setCurrentTrack(mockTracks[newIndex]);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            MusicStream
          </h1>
          <p className="text-muted-foreground text-lg">Твоя музыка, твой ритм</p>
        </header>

        <section className="mb-12 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Icon name="Heart" className="text-secondary" size={28} />
            Избранное
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTracks.filter(t => favorites.includes(t.id)).map((track) => (
              <Card
                key={track.id}
                className="group relative overflow-hidden bg-gradient-to-br from-card to-muted hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 cursor-pointer animate-scale-in"
                onClick={() => togglePlay(track)}
              >
                <div className="aspect-square relative">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="rounded-full w-16 h-16 bg-primary/90 hover:bg-primary hover:scale-110 transition-transform"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(track);
                      }}
                    >
                      <Icon
                        name={currentTrack?.id === track.id && isPlaying ? "Pause" : "Play"}
                        size={24}
                      />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg truncate">{track.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(track.id);
                      }}
                      className="text-secondary hover:scale-125 transition-transform"
                    >
                      <Icon name="Heart" size={18} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Icon name="Music" className="text-accent" size={28} />
            Рекомендации
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {mockTracks.map((track) => (
              <Card
                key={track.id}
                className={`p-4 flex items-center gap-4 hover:bg-muted/50 transition-all cursor-pointer group ${
                  currentTrack?.id === track.id ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-primary' : ''
                }`}
                onClick={() => togglePlay(track)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  {currentTrack?.id === track.id && isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                      <div className="flex gap-0.5">
                        <div className="w-1 bg-primary h-3 animate-pulse-glow" style={{ animationDelay: '0s' }}></div>
                        <div className="w-1 bg-primary h-4 animate-pulse-glow" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 bg-primary h-3 animate-pulse-glow" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{track.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{track.duration}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(track.id);
                    }}
                    className={`transition-all ${
                      favorites.includes(track.id)
                        ? 'text-secondary scale-110'
                        : 'text-muted-foreground hover:text-secondary'
                    }`}
                  >
                    <Icon
                      name="Heart"
                      size={18}
                      fill={favorites.includes(track.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(track);
                    }}
                  >
                    <Icon
                      name={currentTrack?.id === track.id && isPlaying ? "Pause" : "Play"}
                      size={18}
                    />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-card via-muted to-card border-t border-border backdrop-blur-xl shadow-2xl animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-16 h-16 rounded-lg object-cover shadow-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{currentTrack.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => skipTrack('prev')}
                  className="hover:bg-primary/10"
                >
                  <Icon name="SkipBack" size={20} />
                </Button>
                <Button
                  size="lg"
                  onClick={() => togglePlay()}
                  className="rounded-full w-12 h-12 bg-gradient-to-r from-primary to-secondary hover:scale-110 transition-transform shadow-lg shadow-primary/50"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => skipTrack('next')}
                  className="hover:bg-primary/10"
                >
                  <Icon name="SkipForward" size={20} />
                </Button>
              </div>

              <div className="hidden sm:flex items-center gap-3 w-32">
                <Icon name="Volume2" size={20} className="text-muted-foreground" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
