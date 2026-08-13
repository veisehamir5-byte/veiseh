import EquipmentDashboard from '@/components/EquipmentDashboard'

export const metadata = {
  title: 'Veiseh Finder',
  description: 'جستجوی تجهیزات سنگین',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <EquipmentDashboard />
    </main>
  )
}
