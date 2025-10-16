type seatData = {
    ticketNum: number;
    seatNum: number;
    lineNum: number;
    movieTitle?: string;
    movieDate?: string;
    movieImage?: string;
}

export default function Ticket({ticketNum, seatNum, lineNum, movieDate, movieImage, movieTitle}: seatData) {
  return (
     <svg
      className="w-[90%] min-h-[10vh] h-[13vh]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 220"
      role="img"
      aria-labelledby="titleDesc"
    >
      <title id="titleDesc">Ticket de cine</title>
      <defs>
        <style>{`
          .card { fill:#fff; stroke:#e5e7eb; strokeWidth:1; }
          .muted { fill:#6b7280; }
          .text-large { font: 700 28px/1.1 "Helvetica Neue", Arial, sans-serif; fill:#0f172a; }
          .text-medium { font: 600 20px/1 "Helvetica Neue", Arial, sans-serif; fill:#0f172a; }
          .text-small { font: 500 17px/1 "Helvetica Neue", Arial, sans-serif; fill:#374151; }
          .perforation { stroke:#d1d5db; strokeDasharray:"4 6"; strokeWidth:2; }
        `}</style>
      </defs>

      {/* Fondo general */}
      <rect x={10} y={10} width={580} height={200} rx={14} ry={14} className="card" />

      {/* Área izquierda (info) */}
      <g transform="translate(20,20)">
        <text x={12} y={28} className="text-small muted">CINE</text>
        <text x={12} y={60} className="text-large">{movieTitle}</text>
        <text x={12} y={95} className="text-small muted">FECHA</text>
        <text x={12} y={115} className="text-medium">{movieDate}</text>

        {/* Número, asiento y fila */}
        <g transform="translate(260,80)">
          <text x={0} y={-4} className="text-small muted">NÚMERO</text>
          <text x={0} y={18} className="text-medium">{`TICKET-${ticketNum}`}</text>
        </g>

        <g transform="translate(12,140)">
          <text x={0} y={-4} className="text-small muted">ASIENTO</text>
          <text x={0} y={18} className="text-medium">{seatNum}</text>
        </g>

        <g transform="translate(140,140)">
          <text x={0} y={-4} className="text-small muted">FILA</text>
          <text x={0} y={18} className="text-medium">{lineNum}</text>
        </g>
      </g>

      {/* Línea de perforación */}
      <line x1={420} y1={20} x2={420} y2={200} className="perforation" />

      {/* Área derecha (imagen de la película) */}
      <g transform="translate(430,20)">
        <image
          href={movieImage}
          x={0}
          y={0}
          width={150}
          height={180}
          preserveAspectRatio="cover"
          style={{ borderRadius: '8px' }}
        />
      </g>
    </svg>
  );
} 