import { useState, useEffect, useRef } from 'react'
import '../index.css'

import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSpotify } from "react-icons/fa";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown } from "react-icons/fa";

function App() {
  const [showContent, setShowContent] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  
  // Audio player state
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.05) // Starting at a very low volume (0.1 or 10%)
  const [currentTrack] = useState({
    title: "#voyuitwaaien",
    artist: "latex fruit",
    url: "https://audio.jukehost.co.uk/ltrRUcNkbhwe9KaElcAl0KsyDvCUtKQk", // The song you specified
    cover: "https://i1.sndcdn.com/artworks-vjek86KmUfpC0qTc-TtUSZQ-t500x500.png"
  })

  // Set initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [audioRef, volume]);

  // Handle the transition with a slight delay for a smoother effect
  useEffect(() => {
    let timer;
    if (showContent) {
      // Small delay before showing content to allow animation to work properly
      timer = setTimeout(() => {
        setContentVisible(true)
      }, 50)

      // Start playing audio when user enters the site
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => {
            console.error("Failed to autoplay audio:", err);
          });
      }
    } else {
      setContentVisible(false)
    }
    return () => clearTimeout(timer)
  }, [showContent, isPlaying])

  // Audio player functions
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleEnded = () => {
    // Simply stop playing when the track ends or loop it if you want
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  const handleProgressChange = (e) => {
    const newTime = e.target.value
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  // Format time in MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div 
      className={`min-h-screen font-jetbrains flex justify-center items-center bg-[url('./assets/musashi.jpg')] bg-cover bg-center bg-no-repeat relative
        ${showContent ? 'before:content-[""] before:absolute before:inset-0 before:backdrop-blur-sm before:bg-black/30 before:z-10 before:animate-blur-transition' : ''}`}
    >
      {/* Audio element for playing the Vocaroo song */}
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {!showContent ? (
        <div 
          className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 backdrop-blur-[15px] bg-black/60 z-10 cursor-pointer transition-opacity duration-800 ease-out"
          onClick={() => setShowContent(true)}
        >
          <span className="text-white text-xl transition-all duration-300 ease hover:scale-105 hover:text-shadow">
            click to enter
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center z-20">
          {/* Main profile card */}
          <div 
            className={`rounded-2xl w-[100%] backdrop-blur-2xl bg-[#212121]/25 max-w-[1000px] shadow-lg relative z-20 overflow-hidden
              transform translate-y-[30px] opacity-0 transition-all duration-800 ease-out
              ${contentVisible ? 'opacity-100 translate-y-0' : ''}`}
          >
            <div className="px-8 pt-8 pb-8 text-center">
              {/* Profile avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img src="https://i.ibb.co/zWxKF2xS/cat.jpg" className="w-full h-full" />
                </div>
              </div>
              
              <h2 className="text-3xl mb-2 text-white font-semibold">czapladaw</h2>
              <p className="mb-6 text-gray-300 leading-relaxed">
                developer who writes garbage code that works
                <br />
                (c++, js, python)
              </p>
              
              <div className="flex justify-center gap-4 mb-4">
                <a href="https://x.com/ironfistingdaw" target="_blank" className="px-4 py-2 rounded-full transition-all duration-300 hover:text-white text-gray-300"><FaSquareXTwitter className="text-2xl" /></a>
                <a href="https://github.com/dawc17" target='_blank' className="px-4 py-2 rounded-full transition-all duration-300 hover:text-white text-gray-300"><FaGithub className="text-2xl" /></a>
                <a href="https://open.spotify.com/user/lidffaipaezz876b01wqxv5ac?si=93a7e4abe2844008" target='_blank' className="px-4 py-2 rounded-full transition-all duration-300 hover:text-white text-gray-300"><FaSpotify className="text-2xl" /></a>
              </div>
            </div>
          </div>
          
          {/* Audio player card - now playing your Vocaroo song */}
          <div 
            className={`rounded-2xl w-[90%] backdrop-blur-2xl bg-[#212121]/25 max-w-[600px] shadow-lg relative z-20 mt-4 overflow-hidden
              transform translate-y-[30px] opacity-0 transition-all duration-800 ease-out
              ${contentVisible ? 'opacity-100 translate-y-0 delay-100' : ''}`}
          >
            <div className="px-6 py-4 flex items-center">
              <div className="w-12 h-12 rounded overflow-hidden mr-3 flex-shrink-0">
                <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <div className="text-gray-200 text-sm mb-1 font-medium">{currentTrack.title}</div>
                <div className="text-gray-400 text-xs mb-2">{currentTrack.artist}</div>
                <div className="relative h-1.5 bg-gray-700 rounded-full">
                  <input 
                    type="range" 
                    min="0" 
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div 
                    className="h-full bg-blue-400 rounded-full" 
                    style={{width: `${(currentTime / (duration || 1)) * 100}%`}}
                  ></div>
                </div>
                <div className="flex justify-between text-gray-400 text-xs mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <div className="flex ml-4 space-x-3 text-gray-300">
                <button onClick={togglePlayPause} className="p-1 hover:text-white transition">
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
              </div>
            </div>
            
            {/* Volume control */}
            <div className="px-6 pb-4 flex items-center">
              <div className="text-gray-300 mr-2">
                {volume > 0.5 ? <FaVolumeUp /> : <FaVolumeDown />}
              </div>
              <div className="relative w-24 h-1.5 bg-gray-700 rounded-full">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div 
                  className="h-full bg-green-400 rounded-full" 
                  style={{width: `${volume * 100}%`}}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
