const AVATAR_COLORS = [
  "bg-pink-200 text-pink-700",
  "bg-rose-200 text-rose-700",
  "bg-fuchsia-200 text-fuchsia-700",
  "bg-pink-300 text-pink-800",
];

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function getAvatarColor(name: string): string {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

export function formatStatus(status: string): string {
  const map: Record<string, string> = {
    PENDING: "Pendente",
    FINISHED: "Finalizada",
    CANCELED: "Cancelada",
  };
  return map[status] ?? status;
}
