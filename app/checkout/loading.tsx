export default function CheckoutLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-md mb-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm animate-pulse">
          <div className="h-8 bg-gray-200 rounded-md mb-6 w-1/3"></div>
          <div className="space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center border-b pb-4">
                <div className="h-20 w-20 bg-gray-200 rounded-md"></div>
                <div className="ml-4 flex-1">
                  <div className="h-5 bg-gray-200 rounded-md mb-2 w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded-md mb-2 w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-1/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm h-fit animate-pulse">
          <div className="h-6 bg-gray-200 rounded-md mb-4 w-2/3"></div>
          <div className="space-y-3 mb-4">
            {[1, 2].map((item) => (
              <div key={item} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/6"></div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/6"></div>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t">
              <div className="h-5 bg-gray-200 rounded-md w-1/4"></div>
              <div className="h-5 bg-gray-200 rounded-md w-1/6"></div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-10 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
