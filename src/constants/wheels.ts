import { CircleDot, Aperture, Crosshair, Fan, CircleDashed, Settings } from 'lucide-react';

export const WHEELS = [
  {
    id: 0,
    name: "CLASSIC",
    icon: CircleDot
  },
  {
    id: 1,
    name: "TURBO",
    icon: Aperture
  },
  {
    id: 2,
    name: "RALLY",
    icon: Crosshair
  },
  {
    id: 3,
    name: "AERO",
    icon: Fan
  },
  {
    id: 4,
    name: "BEADLOCK",
    icon: CircleDashed
  },
  {
    id: 5,
    name: "MECHA",
    icon: Settings
  }
];

export const CURSOR_COLORS = [
  { id: 'neon-blue', value: '#00D4FF', name: 'CYAN' },
  { id: 'neon-green', value: '#32CD32', name: 'LIME' },
  { id: 'neon-orange', value: '#FF6B35', name: 'LAVA' },
  { id: 'neon-pink', value: '#FF1493', name: 'HOT PINK' },
  { id: 'neon-purple', value: '#9D00FF', name: 'UV' },
  { id: 'neon-yellow', value: '#FFD700', name: 'GOLD' },
  { id: 'white', value: '#FFFFFF', name: 'PURE' },
  { id: 'red', value: '#FF0000', name: 'CRIMSON' },
];
