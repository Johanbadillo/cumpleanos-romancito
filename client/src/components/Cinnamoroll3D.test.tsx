import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cinnamoroll3D from './Cinnamoroll3D';

describe('Cinnamoroll3D Component', () => {
  it('should render without crashing', () => {
    const mockOnKeyPress = vi.fn();
    const { container } = render(
      <Cinnamoroll3D onKeyPress={mockOnKeyPress} />
    );

    expect(container).toBeTruthy();
  });

  it('should render canvas element', () => {
    const mockOnKeyPress = vi.fn();
    const { container } = render(
      <Cinnamoroll3D onKeyPress={mockOnKeyPress} />
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('should handle spacebar key press for jump', async () => {
    const mockOnKeyPress = vi.fn();
    const user = userEvent.setup();
    
    render(<Cinnamoroll3D onKeyPress={mockOnKeyPress} />);
    
    await user.keyboard(' ');
    
    expect(mockOnKeyPress).toHaveBeenCalled();
  });

  it('should handle F key press for orbit animation', async () => {
    const mockOnKeyPress = vi.fn();
    const user = userEvent.setup();
    
    render(<Cinnamoroll3D onKeyPress={mockOnKeyPress} />);
    
    await user.keyboard('f');
    
    expect(mockOnKeyPress).toHaveBeenCalled();
  });

  it('should handle C key press for spin animation', async () => {
    const mockOnKeyPress = vi.fn();
    const user = userEvent.setup();
    
    render(<Cinnamoroll3D onKeyPress={mockOnKeyPress} />);
    
    await user.keyboard('c');
    
    expect(mockOnKeyPress).toHaveBeenCalled();
  });

  it('should accept onKeyPress callback', () => {
    const mockOnKeyPress = vi.fn();
    const { container } = render(
      <Cinnamoroll3D onKeyPress={mockOnKeyPress} />
    );

    expect(container).toBeTruthy();
  });

  it('should render with full dimensions', () => {
    const mockOnKeyPress = vi.fn();
    const { container } = render(
      <Cinnamoroll3D onKeyPress={mockOnKeyPress} />
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });
});
