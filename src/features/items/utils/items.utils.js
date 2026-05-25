export const MONTHS = [
  'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
  'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro',
]

export function parseMonth(month) {
  const [year, m] = month.split('-').map(Number)
  return { year, m }
}

export function formatMonth(month) {
  const { year, m } = parseMonth(month)
  return { name: MONTHS[m - 1], year }
}

export function addMonths(month, delta) {
  const { year, m } = parseMonth(month)
  const d = new Date(year, m - 1 + delta, 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

export function currentMonth() {
  return new Date().toISOString().slice(0, 7)
}
