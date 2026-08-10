export type Sesion = {
  id: string;
  startAt: string; // ISO, UTC
  endAt: string;
  estado: "PROGRAMADA" | "CONFIRMADA" | "CANCELADA" | "COMPLETADA" | "AUSENTE";
  metodosPago: string[];
  consultorio: { id: string; nombre: string };
  tipoSesion: { id: string; nombre: string; duracionMinutos: number };
  paciente: { id: string; nombre: string } | null;
};

export async function fetchSesiones(desde: Date, hasta: Date): Promise<Sesion[]> {
  const params = new URLSearchParams({ desde: desde.toISOString(), hasta: hasta.toISOString() });
  const res = await fetch(`/api/sesiones?${params.toString()}`);
  if (!res.ok) throw new Error("No se pudieron cargar las sesiones");
  return res.json();
}
