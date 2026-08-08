import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InteractiveCinnamoroll from './InteractiveCinnamoroll';

describe('InteractiveCinnamoroll', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it('renders the component when isVisible is true', () => {
    render(<InteractiveCinnamoroll isVisible={true} />);
    const container = screen.getByText('Toca para animar');
    expect(container).toBeInTheDocument();
  });

  it('does not render when isVisible is false', () => {
    const { container } = render(<InteractiveCinnamoroll isVisible={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders with default isVisible value of true', () => {
    render(<InteractiveCinnamoroll />);
    const container = screen.getByText('Toca para animar');
    expect(container).toBeInTheDocument();
  });

  it('triggers animation on screen click', async () => {
    render(<InteractiveCinnamoroll isVisible={true} />);
    
    // Simular clic en la pantalla
    fireEvent.click(document);
    
    // Esperar a que aparezca el contador de interacciones
    await waitFor(() => {
      expect(screen.getByText(/interacciones/)).toBeInTheDocument();
    });
  });

  it('increments click counter on multiple clicks', async () => {
    render(<InteractiveCinnamoroll isVisible={true} />);
    
    // Primer clic
    fireEvent.click(document);
    await waitFor(() => {
      expect(screen.getByText('¡1 interacciones! 💕')).toBeInTheDocument();
    });
    
    // Esperar a que termine la animación
    await waitFor(() => {
      expect(screen.queryByText('¡1 interacciones! 💕')).not.toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Segundo clic
    fireEvent.click(document);
    await waitFor(() => {
      expect(screen.getByText('¡2 interacciones! 💕')).toBeInTheDocument();
    });
  });

  it('ignores clicks on buttons', async () => {
    const { container } = render(
      <>
        <button>Test Button</button>
        <InteractiveCinnamoroll isVisible={true} />
      </>
    );
    
    const button = screen.getByText('Test Button');
    fireEvent.click(button);
    
    // No debería mostrar el contador
    await waitFor(() => {
      expect(screen.queryByText(/interacciones/)).not.toBeInTheDocument();
    }, { timeout: 500 });
  });

  it('ignores clicks on dialogs', async () => {
    const { container } = render(
      <>
        <div role="dialog">Dialog Content</div>
        <InteractiveCinnamoroll isVisible={true} />
      </>
    );
    
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    
    // No debería mostrar el contador
    await waitFor(() => {
      expect(screen.queryByText(/interacciones/)).not.toBeInTheDocument();
    }, { timeout: 500 });
  });

  it('handles touch events', async () => {
    render(<InteractiveCinnamoroll isVisible={true} />);
    
    // Simular evento táctil
    fireEvent.touchEnd(document);
    
    // Esperar a que aparezca el contador
    await waitFor(() => {
      expect(screen.getByText(/interacciones/)).toBeInTheDocument();
    });
  });

  it('dispatches keyboard events for animations', async () => {
    const dispatchEventSpy = vi.spyOn(window, 'dispatchEvent');
    
    render(<InteractiveCinnamoroll isVisible={true} />);
    
    fireEvent.click(document);
    
    await waitFor(() => {
      // Verificar que se despachó un evento KeyboardEvent
      const keyboardEvents = dispatchEventSpy.mock.calls.filter(
        (call) => call[0] instanceof KeyboardEvent
      );
      expect(keyboardEvents.length).toBeGreaterThan(0);
    });
    
    dispatchEventSpy.mockRestore();
  });

  it('has correct styling and positioning', () => {
    const { container } = render(<InteractiveCinnamoroll isVisible={true} />);
    
    const mainDiv = container.querySelector('.fixed');
    expect(mainDiv).toHaveClass('bottom-4', 'right-4', 'z-30', 'pointer-events-none');
  });

  it('displays Cinnamoroll3D component', () => {
    const { container } = render(<InteractiveCinnamoroll isVisible={true} />);
    
    // Verificar que existe el canvas de Three.js
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
});
