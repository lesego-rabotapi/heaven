// A round badge beside the door. Its ring turns slowly unless the visitor asks for less motion.
export function Sticker() {
  return (
    <div className="sticker" role="img" aria-label="Established 2017, Burg Street">
      <svg className="sticker-ring" viewBox="0 0 150 150" aria-hidden="true" focusable="false">
        <defs>
          <path id="sticker-path" d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
        </defs>
        <text>
          <textPath href="#sticker-path" textLength="360" lengthAdjust="spacing">est. 2017 · burg street · </textPath>
        </text>
      </svg>
      <svg className="sticker-arch" viewBox="0 0 24 32" aria-hidden="true" focusable="false">
        <path d="M2 31V14C2 7.4 6.5 2.6 12 1c5.5 1.6 10 6.4 10 13v17" />
        <path d="M2 31h20" />
      </svg>
    </div>
  );
}
