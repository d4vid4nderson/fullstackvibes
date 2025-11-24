'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { FiMaximize, FiMinimize, FiZoomIn, FiZoomOut, FiX } from 'react-icons/fi';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize mermaid with custom theme
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#14b8a6',
        primaryTextColor: '#fff',
        primaryBorderColor: '#06b6d4',
        lineColor: '#06b6d4',
        secondaryColor: '#0891b2',
        tertiaryColor: '#1a1a1a',
        background: '#0f0f0f',
        mainBkg: '#1a1a1a',
        secondBkg: '#0a0a0a',
        textColor: '#fff',
        border1: '#06b6d4',
        border2: '#14b8a6',
        arrowheadColor: '#06b6d4',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '14px',
      },
      flowchart: {
        curve: 'basis',
        padding: 20,
      },
    });

    const renderDiagram = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
        setError('');
      } catch (err) {
        console.error('Mermaid rendering error:', err);
        setError('Failed to render diagram');
      }
    };

    renderDiagram();
  }, [chart]);

  // Handle fullscreen escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1 || isFullscreen) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
    }
  };

  if (error) {
    return (
      <div className={`p-4 bg-red-500/10 border border-red-500/30 rounded-lg ${className}`}>
        <p className="text-red-300 text-sm">{error}</p>
      </div>
    );
  }

  const DiagramControls = () => (
    <div className="flex items-center gap-2 mb-3">
      <button
        onClick={handleZoomIn}
        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
        title="Zoom In"
      >
        <FiZoomIn className="w-4 h-4 text-gray-300" />
      </button>
      <button
        onClick={handleZoomOut}
        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
        title="Zoom Out"
      >
        <FiZoomOut className="w-4 h-4 text-gray-300" />
      </button>
      <button
        onClick={handleResetZoom}
        className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-xs text-gray-300"
        title="Reset View"
      >
        Reset
      </button>
      <div className="flex-1"></div>
      <span className="text-xs text-gray-400">{Math.round(scale * 100)}%</span>
      <button
        onClick={() => {
          setIsFullscreen(true);
          setScale(1);
          setPosition({ x: 0, y: 0 });
        }}
        className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg transition-colors"
        title="Fullscreen"
      >
        <FiMaximize className="w-4 h-4 text-cyan-400" />
      </button>
    </div>
  );

  const DiagramContent = () => (
    <div
      ref={diagramRef}
      className={`mermaid-diagram-content ${isDragging ? 'cursor-grabbing' : scale > 1 || isFullscreen ? 'cursor-grab' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        transformOrigin: 'center center',
        transition: isDragging ? 'none' : 'transform 0.1s ease-out',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );

  return (
    <>
      {/* Normal View */}
      <div className={className}>
        <DiagramControls />
        <div
          ref={containerRef}
          className="mermaid-container overflow-hidden bg-[#0f0f0f] rounded-lg p-6 border border-white/10 relative"
          style={{ minHeight: '400px' }}
          onWheel={handleWheel}
        >
          <DiagramContent />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          💡 Use Ctrl+Scroll to zoom, drag to pan, or click fullscreen for better view
        </p>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm">
          <div className="h-full flex flex-col">
            {/* Fullscreen Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#1a1a1a]">
              <h3 className="text-lg font-bold text-white">System Architecture - Interactive View</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                  title="Zoom Out"
                >
                  <FiZoomOut className="w-5 h-5 text-gray-300" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors text-sm text-gray-300"
                  title="Reset View"
                >
                  Reset ({Math.round(scale * 100)}%)
                </button>
                <button
                  onClick={handleZoomIn}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                  title="Zoom In"
                >
                  <FiZoomIn className="w-5 h-5 text-gray-300" />
                </button>
                <div className="w-px h-6 bg-white/10 mx-2"></div>
                <button
                  onClick={() => {
                    setIsFullscreen(false);
                    setScale(1);
                    setPosition({ x: 0, y: 0 });
                  }}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                  title="Exit Fullscreen (ESC)"
                >
                  <FiX className="w-5 h-5 text-gray-300" />
                </button>
              </div>
            </div>

            {/* Fullscreen Content */}
            <div
              className="flex-1 overflow-hidden relative flex items-center justify-center"
              onWheel={handleWheel}
            >
              <DiagramContent />
            </div>

            {/* Fullscreen Footer */}
            <div className="p-3 border-t border-white/10 bg-[#1a1a1a]">
              <p className="text-xs text-gray-400 text-center">
                💡 Drag to pan • Scroll to move • Ctrl+Scroll to zoom • ESC to exit
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
