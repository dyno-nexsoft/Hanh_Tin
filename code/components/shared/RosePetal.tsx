'use client';

/// Cánh hoa rơi nhẹ nhàng — thay thế confetti burst
/// Được dùng trong EnvelopeCover khi khách mở thiệp

interface RosePetalProps {
  color: string;
  size: number;
  startX: number;
  delay: number;
  duration: number;
  rotation: number;
}

function RosePetal({ color, size, startX, delay, duration, rotation }: RosePetalProps) {
  return (
    <svg
      style={{
        position: 'absolute',
        top: '-5vh',
        left: `${startX}%`,
        width: size,
        height: size * 0.8,
        animation: `petalFall ${duration}s ${delay}s ease-in forwards`,
        opacity: 0,
        willChange: 'transform, opacity',
      }}
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="20"
        cy="16"
        rx="18"
        ry="12"
        fill={color}
        transform={`rotate(${rotation} 20 16)`}
      />
      <ellipse
        cx="20"
        cy="16"
        rx="10"
        ry="6"
        fill={color}
        fillOpacity="0.5"
        transform={`rotate(${rotation + 45} 20 16)`}
      />
    </svg>
  );
}

interface RosePetalShowerProps {
  count?: number;
}

const PETAL_COLORS = [
  'rgba(201, 168, 76, 0.55)',  // gold
  'rgba(232, 201, 122, 0.45)', // light gold
  'rgba(248, 243, 232, 0.45)', // ivory
  'rgba(201, 168, 76, 0.35)',  // gold transparent
  'rgba(245, 230, 192, 0.5)',  // pale gold
];

export default function RosePetalShower({ count = 20 }: RosePetalShowerProps) {
  const petals = Array.from({ length: count }, (_, i) => ({
    id: i,
    color: PETAL_COLORS[i % PETAL_COLORS.length],
    size: 12 + (i % 4) * 5,
    startX: (i * 97 / count + 3) % 95,
    delay: (i * 0.18) % 2.5,
    duration: 3.5 + (i % 5) * 0.4,
    rotation: (i * 37) % 180,
  }));

  return (
    <div
      className="fixed inset-0 z-[110] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <RosePetal key={p.id} {...p} />
      ))}
    </div>
  );
}
