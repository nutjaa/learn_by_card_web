interface IconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function CrownIcon({
  className = 'w-4 h-4',
  width = 16,
  height = 16,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z"></path>
    </svg>
  );
}
