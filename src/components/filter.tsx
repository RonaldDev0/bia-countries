
const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

export default function Filter () {
  return (
    <select className='bg-slate-800 p-3 h-full rounded-lg'>
      <option>Filter by Region</option>
      {regions.map(region => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  )
}