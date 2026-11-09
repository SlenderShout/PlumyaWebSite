/** Plumya mark: a pixel plum with one leaf. Drawn in code, no image file needed. */
export default function Logo({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      shapeRendering="crispEdges"
      className={className}
      role="img"
      aria-label="Plumya"
    >
      <rect x="5" y="0" width="3" height="1" fill="#86c34f" />
      <rect x="4" y="1" width="3" height="1" fill="#5f9a36" />
      <rect x="4" y="2" width="1" height="1" fill="#5a3b25" />
      <rect x="2" y="3" width="6" height="1" fill="#cf4a78" />
      <rect x="1" y="4" width="8" height="4" fill="#cf4a78" />
      <rect x="2" y="8" width="6" height="1" fill="#b53a64" />
      <rect x="3" y="9" width="4" height="1" fill="#912e50" />
      <rect x="2" y="4" width="2" height="1" fill="#ee93b4" />
      <rect x="2" y="5" width="1" height="1" fill="#ee93b4" />
      <rect x="6" y="7" width="2" height="1" fill="#b53a64" />
    </svg>
  );
}
