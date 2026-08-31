import { useEffect, useState, ChangeEvent } from "react";

// 🔹 Scheme type matches your FastAPI schema
interface Scheme {
  id: number;
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
  start_date: string;
  status: string;
  state: string;
}

const Schemes_Page: React.FC = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [stateFilter, setStateFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch schemes from backend
  const fetchSchemes = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8000/schemes?skip=0&limit=100`;
      if (stateFilter) url += `&state=${encodeURIComponent(stateFilter)}`;
      const res = await fetch(url);
      const data: Scheme[] = await res.json();
      setSchemes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [stateFilter]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStateFilter(e.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Government Schemes</h1>

      {/* Filter by State */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Filter by state"
          value={stateFilter}
          onChange={handleFilterChange}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={fetchSchemes}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Loading & No Data */}
      {loading ? (
        <p>Loading schemes...</p>
      ) : schemes.length === 0 ? (
        <p>No schemes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{scheme.name}</h2>
              <p><strong>State:</strong> {scheme.state}</p>
              <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
              <p><strong>Benefits:</strong> {scheme.benefits}</p>
              <p><strong>Start Date:</strong> {scheme.start_date}</p>
              <p><strong>Status:</strong> {scheme.status}</p>
              <p className="text-gray-600 mt-2">{scheme.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};




export default Schemes_Page;
