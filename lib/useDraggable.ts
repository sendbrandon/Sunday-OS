'use client';

import { useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

/**
 * Drag-by-titlebar hook. Listens to mousedown on any descendant element
 * with `data-drag-handle`, tracks pointer movement on window, updates
 * absolute position. Vanilla — no react-draggable, no DnD library.
 */
export function useDraggable(initial: Position) {
  const ref = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState<Position>(initial);
  const dragging = useRef(false);
  const offset = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-drag-handle]')) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      dragging.current = true;
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      setPos({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    };

    const onPointerUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const style: React.CSSProperties = {
    position: 'absolute',
    left: pos.x,
    top: pos.y,
    right: 'auto',
    bottom: 'auto',
    transform: 'none',
  };

  return { ref, style };
}
