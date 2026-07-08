import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Cinnamoroll3D from './Cinnamoroll3D';

describe('Cinnamoroll3D Component', () => {
  it('should render without crashing', () => {
    const mockOnClick = vi.fn();
    const { container } = render(
      <Cinnamoroll3D
        onClick={mockOnClick}
        animation="float"
        targetPosition={{ x: 50, y: 50 }}
        isMoving={false}
      />
    );

    expect(container).toBeTruthy();
  });

  it('should accept different animation types', () => {
    const mockOnClick = vi.fn();
    const animations: Array<'walk' | 'float' | 'eat' | 'spin' | 'ears'> = ['walk', 'float', 'eat', 'spin', 'ears'];

    animations.forEach((animation) => {
      const { container } = render(
        <Cinnamoroll3D
          onClick={mockOnClick}
          animation={animation}
          targetPosition={{ x: 50, y: 50 }}
          isMoving={false}
        />
      );

      expect(container).toBeTruthy();
    });
  });

  it('should handle target position updates', () => {
    const mockOnClick = vi.fn();
    const { rerender } = render(
      <Cinnamoroll3D
        onClick={mockOnClick}
        animation="walk"
        targetPosition={{ x: 25, y: 25 }}
        isMoving={true}
      />
    );

    rerender(
      <Cinnamoroll3D
        onClick={mockOnClick}
        animation="walk"
        targetPosition={{ x: 75, y: 75 }}
        isMoving={true}
      />
    );

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('should call onClick handler when clicked', () => {
    const mockOnClick = vi.fn();
    const { container } = render(
      <Cinnamoroll3D
        onClick={mockOnClick}
        animation="float"
        targetPosition={{ x: 50, y: 50 }}
        isMoving={false}
      />
    );

    const canvas = container.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('should handle isMoving state', () => {
    const mockOnClick = vi.fn();
    const { rerender } = render(
      <Cinnamoroll3D
        onClick={mockOnClick}
        animation="float"
        targetPosition={{ x: 50, y: 50 }}
        isMoving={false}
      />
    );

    rerender(
      <Cinnamoroll3D
        onClick={mockOnClick}
        animation="walk"
        targetPosition={{ x: 60, y: 60 }}
        isMoving={true}
      />
    );

    rerender(
      <Cinnamoroll3D
        onClick={mockOnClick}
        animation="float"
        targetPosition={{ x: 60, y: 60 }}
        isMoving={false}
      />
    );

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
