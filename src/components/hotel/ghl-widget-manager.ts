// src/components/hotel/ghl-widget-manager.ts
// Utility functions to manage Go High Level widget behavior

export class GHLWidgetManager {
  private widgetId: string;
  private checkInterval: NodeJS.Timeout | null = null;
  private customStylesId = 'ghl-widget-custom-styles';

  constructor(widgetId: string) {
    this.widgetId = widgetId;
  }

  // Force the widget to behave like an embedded iframe instead of floating chat
  public forceEmbeddedMode(): void {
    this.injectCustomStyles();
    this.startWidgetMonitoring();
    this.autoOpenWidget();
  }

  private injectCustomStyles(): void {
    // Remove existing styles if any
    const existingStyles = document.getElementById(this.customStylesId);
    if (existingStyles) {
      existingStyles.remove();
    }

    // Create new style element
    const style = document.createElement('style');
    style.id = this.customStylesId;
    style.textContent = `
      /* Force the chat widget to be embedded instead of floating */
      [data-widget-id="${this.widgetId}"],
      .leadconnector-chat-widget,
      .chat-widget-container,
      .lc-chat-widget {
        position: static !important;
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
        min-height: 400px !important;
        bottom: auto !important;
        right: auto !important;
        left: auto !important;
        top: auto !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        transform: none !important;
        margin: 0 !important;
        border: none !important;
      }
      
      /* Hide floating elements */
      .chat-bubble,
      .floating-chat-button,
      .lc-chat-bubble,
      .chat-launcher {
        display: none !important;
      }
      
      /* Hide minimize/close buttons */
      .chat-widget-minimize,
      .chat-widget-close,
      .lc-minimize,
      .lc-close,
      [class*="minimize"],
      [class*="close"]:not(.close-message) {
        display: none !important;
      }
      
      /* Ensure the chat interface fills the container */
      .chat-widget-content,
      .chat-interface,
      .chat-container,
      .lc-chat-content,
      .lc-chat-interface {
        width: 100% !important;
        height: 100% !important;
        min-height: 400px !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }
      
      /* Style the iframe if it exists */
      iframe[src*="leadconnectorhq.com"],
      iframe[src*="gohighlevel.com"] {
        width: 100% !important;
        height: 100% !important;
        min-height: 400px !important;
        border: none !important;
        border-radius: 0 !important;
      }
      
      /* Ensure input areas are properly sized */
      .chat-input,
      .lc-input,
      .message-input {
        width: 100% !important;
      }
    `;
    
    document.head.appendChild(style);
  }

  private startWidgetMonitoring(): void {
    // Clear any existing interval
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    // Monitor and adjust widget every 2 seconds
    this.checkInterval = setInterval(() => {
      this.adjustWidget();
    }, 2000);

    // Stop monitoring after 60 seconds to avoid performance issues
    setTimeout(() => {
      if (this.checkInterval) {
        clearInterval(this.checkInterval);
        this.checkInterval = null;
      }
    }, 60000);
  }

  private adjustWidget(): void {
    const selectors = [
      `[data-widget-id="${this.widgetId}"]`,
      '.leadconnector-chat-widget',
      '.lc-chat-widget',
      '.chat-widget-container'
    ];

    for (const selector of selectors) {
      const widget = document.querySelector(selector) as HTMLElement;
      if (widget) {
        // Ensure widget is visible and properly positioned
        widget.style.display = 'block';
        widget.style.visibility = 'visible';
        widget.style.position = 'static';
        widget.style.width = '100%';
        widget.style.height = '100%';
        
        // Look for any iframes inside and adjust them too
        const iframes = widget.querySelectorAll('iframe');
        iframes.forEach(iframe => {
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.minHeight = '400px';
        });
      }
    }
  }

  private autoOpenWidget(): void {
    // Multiple strategies to open the widget
    setTimeout(() => {
      this.tryOpenMethods();
    }, 1000);

    // Retry opening after 3 seconds
    setTimeout(() => {
      this.tryOpenMethods();
    }, 3000);

    // Final attempt after 5 seconds
    setTimeout(() => {
      this.tryOpenMethods();
    }, 5000);
  }

  private tryOpenMethods(): void {
    const methods = [
      // Method 1: Click widget button
      () => {
        const button = document.querySelector(`[data-widget-id="${this.widgetId}"]`);
        if (button && button instanceof HTMLElement) {
          button.click();
          return true;
        }
        return false;
      },
      
      // Method 2: Trigger chat open event
      () => {
        const buttons = document.querySelectorAll('button, [role="button"]');
        for (const button of buttons) {
          const text = button.textContent?.toLowerCase() || '';
          if (text.includes('chat') || text.includes('help') || text.includes('support')) {
            (button as HTMLElement).click();
            return true;
          }
        }
        return false;
      },
      
      // Method 3: Dispatch custom events
      () => {
        try {
          window.dispatchEvent(new CustomEvent('openChat'));
          window.dispatchEvent(new CustomEvent('lc:open-chat'));
          return true;
        } catch {
          return false;
        }
      }
    ];

    // Try each method
    for (const method of methods) {
      if (method()) {
        console.log('GHL Widget opened successfully');
        break;
      }
    }
  }

  // Clean up method
  public destroy(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }

    const styles = document.getElementById(this.customStylesId);
    if (styles) {
      styles.remove();
    }
  }
}