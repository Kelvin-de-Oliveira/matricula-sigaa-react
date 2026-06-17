export function formatarHorario(horario: string): string {
  return horario.split(' ').join(' · ')
}