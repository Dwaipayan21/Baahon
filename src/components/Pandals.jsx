import { useEffect, useState } from "react";
import axios from "axios";

const Pandals = () => {
  const [pandals, setPandals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPandals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/pandals"
        );

        setPandals(response.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load pandals");
      } finally {
        setLoading(false);
      }
    };

    fetchPandals();
  }, []);

  if (loading) return <p>Loading pandals...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      {pandals.map((pandal) => (
        <div key={pandal._id}>
          <h2>{pandal.name}</h2>
          <p>{pandal.address}</p>
          <p>{pandal.area}</p>
        </div>
      ))}
    </div>
  );
};

export default Pandals;