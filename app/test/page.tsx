export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Tailwind CSS Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Red Card</h2>
            <p>This should be red background with white text.</p>
          </div>
          
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Green Card</h2>
            <p>This should be green background with white text.</p>
          </div>
          
          <div className="bg-yellow-500 text-black p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Yellow Card</h2>
            <p>This should be yellow background with black text.</p>
          </div>
        </div>
        
        <div className="mt-8 bg-white/20 backdrop-blur rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Tailwind Classes Test</h2>
          <div className="space-y-2 text-white">
            <div className="bg-blue-500 p-2 rounded">bg-blue-500</div>
            <div className="bg-green-500 p-2 rounded">bg-green-500</div>
            <div className="bg-red-500 p-2 rounded">bg-red-500</div>
            <div className="bg-yellow-500 p-2 rounded text-black">bg-yellow-500</div>
            <div className="bg-purple-500 p-2 rounded">bg-purple-500</div>
          </div>
        </div>
      </div>
    </div>
  )
} 