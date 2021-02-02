import { parseISO, format } from 'date-fns'

export default function DateFormatter({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString} className="italic">{format(date, 'LLLL	d, yyyy')}</time>
}
