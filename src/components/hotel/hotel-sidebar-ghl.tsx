// src/components/hotel/hotel-sidebar-ghl.tsx
"use client";

import { useEffect, useRef, useState } from 'react';

interface HotelSidebarGHLProps {
  widgetId: string;
  locationId?: string;
  className?: string;
}

declare global {
  interface Window {
    leadConnector?: {
      chatWidget: {
        openWidget: () => void;
        closeWidget: () => void;
        isActive: () => boolean;
        localizeWidget: (labels: Record<string, string>) => void;
      };
    };
  }
}

export function HotelSidebarGHL({ widgetId, locationId = "t8gRxt7gwc25cXQi8kYp", className = "" }: HotelSidebarGHLProps) {
  const [loadingStatus, setLoadingStatus] = useState('Iniciando...');
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    // Simple approach: load script and use CSS + interval to hide floating button
    loadGHLScriptSimple();
    startFloatingButtonKiller();
  }, [widgetId]);

  const loadGHLScriptSimple = () => {
    setLoadingStatus('Cargando script de GHL...');

    // Simple script loading without overrides
    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', widgetId);

    script.onload = () => {
      console.log('GHL script loaded');
      setLoadingStatus('Script cargado, configurando widget...');
      setWidgetLoaded(true);
      
      // Wait and try to open widget
      setTimeout(() => {
        tryOpenWidget();
      }, 2000);
    };

    script.onerror = () => {
      setLoadingStatus('Error cargando script');
    };

    document.head.appendChild(script);
  };

  const tryOpenWidget = () => {
    try {
      if (window.leadConnector?.chatWidget) {
        setLoadingStatus('Abriendo widget automáticamente...');
        window.leadConnector.chatWidget.openWidget();
        
        setTimeout(() => {
          const isActive = window.leadConnector?.chatWidget?.isActive();
          setLoadingStatus(isActive ? 'Widget activo' : 'Widget cargado');
        }, 1000);
      } else {
        setLoadingStatus('Esperando API de GHL...');
        setTimeout(tryOpenWidget, 1000);
      }
    } catch (error) {
      console.warn('Error opening widget:', error);
      setLoadingStatus('Widget cargado con limitaciones');
    }
  };

  const startFloatingButtonKiller = () => {
    // Enhanced CSS to control widget height and hide floating buttons
    const addHidingCSS = () => {
      const style = document.getElementById('ghl-hide-floating') || document.createElement('style');
      style.id = 'ghl-hide-floating';
      style.textContent = `
        /* Hide GHL floating buttons - all possible selectors */
        .lc_text-widget--bubble,
        #lc_text-widget,
        .lc_text-widget--box,
        .lc-chat-bubble,
        .lc-chat-launcher,
        .leadconnector-chat-bubble,
        button[aria-label*="Select to close"],
        button[aria-label*="chat widget"],
        /* Hide the blue floating button from screenshot */
        button[style*="position: fixed"],
        button[style*="bottom:"],
        button[style*="right:"],
        div[style*="position: fixed"][style*="bottom:"][style*="right:"],
        /* Generic floating elements */
        [class*="floating-chat"],
        [id*="floating-chat"],
        /* Bottom right positioned elements */
        *[style*="position: fixed; right: 20px; bottom: 20px"],
        *[style*="position: fixed; bottom: 20px; right: 20px"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
          position: absolute !important;
          left: -9999px !important;
          width: 0 !important;
          height: 0 !important;
          z-index: -1 !important;
        }
        
        /* Hide any element positioned in bottom-right corner */
        *[style*="position: fixed"][style*="bottom:"][style*="right:"] {
          display: none !important;
        }
        
        /* FORCE GHL WIDGET TO FULL HEIGHT AND SPECIFIC WIDTH - Enhanced selectors */
        .lc-chat-widget,
        .leadconnector-chat-widget,
        .lc-widget-container,
        .lc-chat-container,
        iframe[src*="leadconnectorhq.com"],
        iframe[src*="msgsndr.com"],
        /* Target any GHL widget container */
        [class*="lc-"],
        [class*="leadconnector"],
        [id*="lc-"],
        /* Target widget wrapper elements */
        div[data-widget-id],
        div[data-location-id] {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          /* TESTING: Set specific width to 500px */
          width: 500px !important;
          min-width: 500px !important;
          max-width: 500px !important;
          height: 100% !important;
          min-height: 100vh !important;
          max-height: none !important;
          position: static !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          border: none !important;
          border-radius: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          box-sizing: border-box !important;
          transform: none !important;
          overflow: visible !important;
        }
        
        /* Force iframe content to specific width and full height */
        iframe[src*="leadconnectorhq.com"],
        iframe[src*="msgsndr.com"] {
          /* TESTING: Set specific width to 500px */
          width: 500px !important;
          min-width: 500px !important;
          max-width: 500px !important;
          height: 100% !important;
          min-height: 100vh !important;
          border: none !important;
          display: block !important;
        }
        
        /* Force any nested containers to full height */
        .lc-chat-widget > *,
        .leadconnector-chat-widget > *,
        [class*="lc-"] > *,
        div[data-widget-id] > * {
          height: 100% !important;
          min-height: inherit !important;
        }
        
        /* Override any height restrictions */
        .lc-chat-widget,
        .leadconnector-chat-widget,
        [class*="lc-"]:not([class*="bubble"]):not([class*="launcher"]) {
          max-height: none !important;
          height: 100% !important;
          flex: 1 !important;
          flex-grow: 1 !important;
        }
      `;
      
      if (!document.head.contains(style)) {
        document.head.appendChild(style);
      }
    };

    // Apply CSS immediately and periodically
    addHidingCSS();
    
    // Enhanced interval with height forcing and debugging
    const interval = setInterval(() => {
      try {
        // Re-apply CSS
        addHidingCSS();
        
        // Debug: Log all elements found in the sidebar
        console.log('=== GHL Widget Debug ===');
        const sidebarContainer = document.querySelector('.fixed.right-0.top-0');
        if (sidebarContainer) {
          console.log('Sidebar container found:', sidebarContainer);
          console.log('Sidebar children:', sidebarContainer.children);
          
          // Log all elements inside sidebar
          const allElements = sidebarContainer.querySelectorAll('*');
          console.log('All elements in sidebar:', allElements.length);
          allElements.forEach((el, index) => {
            if (index < 10) { // Only log first 10 to avoid spam
              console.log(`Element ${index}:`, el.tagName, el.className, el.id);
            }
          });
        }
        
        // Force height on any GHL widget elements found
        const widgetSelectors = [
          '.lc-chat-widget',
          '.leadconnector-chat-widget', 
          '.lc-widget-container',
          'iframe[src*="leadconnectorhq.com"]',
          'iframe[src*="msgsndr.com"]',
          '[class*="lc-"]:not([class*="bubble"])',
          'div[data-widget-id]',
          // Add more generic selectors
          'iframe',
          'div[style*="height"]',
          '*[class*="chat"]',
          '*[class*="widget"]'
        ];
        
        let elementsFound = 0;
        widgetSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          if (elements.length > 0) {
            console.log(`Found ${elements.length} elements with selector: ${selector}`);
            elementsFound += elements.length;
          }
          
          elements.forEach((element, index) => {
            const htmlElement = element as HTMLElement;
            console.log(`Modifying element ${index} (${selector}):`, htmlElement);
            
            // TESTING: Force specific width to 500px and full height
            htmlElement.style.cssText = `
              width: 500px !important;
              min-width: 500px !important;
              max-width: 500px !important;
              height: 100% !important;
              min-height: 100vh !important;
              max-height: none !important;
              position: static !important;
              display: block !important;
              border: 2px solid red !important;
              background: yellow !important;
              flex: 1 !important;
              flex-grow: 1 !important;
            `;
            
            console.log('Applied styles to:', htmlElement, 'Current width:', htmlElement.offsetWidth);
          });
        });
        
        console.log(`Total elements found and modified: ${elementsFound}`);
        console.log('=== End Debug ===');
        
        // Remove floating elements (existing code)
        const floatingSelectors = [
          '.lc_text-widget--bubble',
          '#lc_text-widget',
          '.lc-chat-bubble',
          'button[style*="position: fixed"][style*="bottom:"]',
          'div[style*="position: fixed"][style*="bottom:"][style*="right:"]'
        ];
        
        floatingSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            try {
              // Check if it's actually a floating button (positioned bottom-right)
              const style = window.getComputedStyle(element);
              const isBottomRight = style.position === 'fixed' && 
                                   (style.bottom !== 'auto' || style.right !== 'auto');
              
              if (isBottomRight || element.matches('.lc_text-widget--bubble, #lc_text-widget, .lc-chat-bubble')) {
                if (element && element.parentNode && element.parentNode.contains(element)) {
                  element.parentNode.removeChild(element);
                  console.log('Removed floating element:', selector);
                }
              }
            } catch (e) {
              // If removeChild fails, just hide it
              (element as HTMLElement).style.display = 'none';
              (element as HTMLElement).style.visibility = 'hidden';
            }
          });
        });
        
      } catch (error) {
        console.warn('Error in floating button killer:', error);
      }
    }, 3000); // Increased to 3 seconds for easier debugging

    // Store interval reference for cleanup if needed
    (window as any).ghlKillerInterval = interval;
  };

  const handleRefresh = () => {
    // Clean up interval
    if ((window as any).ghlKillerInterval) {
      clearInterval((window as any).ghlKillerInterval);
    }
    
    setLoadingStatus('Reiniciando...');
    window.location.reload();
  };

  const handleToggleWidget = () => {
    try {
      if (window.leadConnector?.chatWidget) {
        if (window.leadConnector.chatWidget.isActive()) {
          window.leadConnector.chatWidget.closeWidget();
        } else {
          window.leadConnector.chatWidget.openWidget();
        }
      }
    } catch (error) {
      console.warn('Error toggling widget:', error);
    }
  };

  return (
    <div className={`hidden lg:block fixed right-0 top-0 h-screen w-[525px] bg-white border-l border-border z-50 ${className}`}>
      <div className="h-full w-full relative overflow-hidden">
        
        {/* Main widget container - full height without header */}
        <div 
          className="h-full w-full relative bg-white"
        >
          {/* Loading overlay */}
          {!widgetLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center max-w-xs">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground font-medium">{loadingStatus}</p>
                <div className="mt-4 p-3 bg-muted rounded-lg text-left">
                  <p className="text-xs text-muted-foreground mb-2">
                    <strong>Método:</strong> Simple y seguro
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Widget:</strong> {widgetId}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Sin header - apariencia unificada con el bot
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom controls bar - floating over the widget */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-border/20 p-3 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <div className={`w-2 h-2 rounded-full ${
                widgetLoaded ? 'bg-green-400' : 'bg-yellow-400'
              }`}></div>
              <span className="text-xs font-medium">
                {widgetLoaded ? 'Bot Activo' : 'Cargando...'}
              </span>
            </div>
            
            <div className="flex gap-2 items-center">
              {widgetLoaded && (
                <button
                  onClick={handleToggleWidget}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-md text-xs transition-all duration-200 flex items-center gap-1"
                  title="Abrir/Cerrar chat"
                >
                  💬 <span className="hidden sm:inline">Chat</span>
                </button>
              )}
              <button
                onClick={handleRefresh}
                className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-md text-xs transition-all duration-200 flex items-center gap-1"
                title="Recargar widget"
              >
                ↻ <span className="hidden sm:inline">Recargar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}