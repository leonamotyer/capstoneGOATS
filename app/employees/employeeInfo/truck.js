export default function TrucksPage() {
  return (
    <div className="trucks-page">
      <h2 className="text-2xl font-bold mb-4">Truck List</h2>
      <h3 className="text-xl font-bold mb-2">Monthly View</h3>
      <TruckList trucks={exampleTrucks} viewMode="compact" />
      <h3 className="text-xl font-bold mt-6 mb-2">Weekly View</h3>
      <TruckList trucks={exampleTrucks} viewMode="detailed" />
    </div>
  );
}