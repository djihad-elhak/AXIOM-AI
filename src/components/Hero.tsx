
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Search, Filter } from "lucide-react";
import heroImage from "@/assets/hero-ai-agents.jpg";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Removed Lottie animation loading

  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      
      const {
        left,
        top,
        width,
        height
      } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);
  
  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  return (
    <section 
      className="overflow-hidden relative bg-gradient-to-br from-axiom-50 to-white" 
      id="hero" 
      style={{
        padding: isMobile ? '100px 12px 60px' : '120px 20px 80px'
      }}
    >
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-axiom-gradient opacity-20 blur-3xl rounded-full"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div 
              className="axiom-chip mb-3 sm:mb-6 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-axiom-500 text-white mr-2">AI</span>
              <span>Marketplace</span>
            </div>
            
            <h1 
              className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.3s" }}
            >
              AXIOM AI<br className="hidden sm:inline" />Agents Marketplace
            </h1>
            
            <p 
              style={{ animationDelay: "0.5s" }} 
              className="section-subtitle mt-3 sm:mt-6 mb-4 sm:mb-8 leading-relaxed opacity-0 animate-fade-in text-gray-950 font-normal text-base sm:text-lg text-left"
            >
              Discover, customize, and deploy intelligent AI agents tailored for your business needs.
            </p>
            
            {/* Search Bar */}
            <div 
              className="relative mb-6 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.6s" }}
            >
              <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-2">
                <Search className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search AI agents (RAG, N8N, Fine-tuning...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 text-gray-700 bg-transparent border-none outline-none placeholder-gray-400"
                />
                <button className="bg-axiom-500 hover:bg-axiom-600 text-white px-6 py-3 rounded-full transition-colors">
                  Search
                </button>
              </div>
            </div>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.8s" }}
            >
              <a 
                href="#marketplace" 
                className="button-primary flex items-center justify-center group w-full sm:w-auto"
              >
                Browse Marketplace
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#features" 
                className="button-secondary flex items-center justify-center w-full sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            <div className="relative z-10 animate-fade-in" style={{ animationDelay: "0.9s" }}>
              <div className="absolute inset-0 bg-axiom-100 rounded-2xl sm:rounded-3xl -z-10 shadow-xl"></div>
              <div className="relative transition-all duration-500 ease-out overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                <img 
                  ref={imageRef} 
                  src={heroImage} 
                  alt="AXIOM AI Agents" 
                  className="w-full h-auto object-cover transition-transform duration-500 ease-out" 
                  style={{ transformStyle: 'preserve-3d' }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-axiom-600/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-axiom-100/30 rounded-full blur-3xl -z-10 parallax" data-speed="0.05"></div>
    </section>
  );
};

export default Hero;
