export default function TrustBar() {
  const items = [
    "Verified local partners",
    "Transparent pricing",
    "Secure payments",
    "Trusted by 10k+ travelers",
  ];

  return (
    <section className="py-8 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-full border border-gray-200 px-4 py-2 bg-gray-50"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
