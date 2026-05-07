import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import api from "../lib/api";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        setDoctors(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    `${doc.name}`.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 grid grid-cols-12 gap-6">
      <div className="col-span-5 bg-white rounded-xl shadow p-4">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Doctors</h2>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded">
            <Plus size={16} />
            New
          </button>
        </div>

        <div className="flex items-center bg-gray-100 rounded px-3 mb-4">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search doctors..."
            className="bg-transparent outline-none px-2 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isLoading ? (
          <p>Loading doctors...</p>
        ) : (
          <div className="space-y-2">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc) => (
                <div
                  key={doc._id}
                  onClick={() => setSelectedDoctor(doc)}
                  className={`p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                    selectedDoctor?._id === doc._id
                      ? "border-indigo-500 bg-indigo-50"
                      : ""
                  }`}
                >
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-gray-500">
                    {doc.specialization || "General"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No doctors found.</p>
            )}
          </div>
        )}
      </div>

      <div className="col-span-7 bg-white rounded-xl shadow p-6">
        {!selectedDoctor ? (
          <div className="text-center text-gray-400 mt-20">
            Select a doctor to view profile details
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-3">Doctor Profile</h3>
              <div className="grid gap-2">
                <p className="text-sm text-gray-700">
                  Name: {selectedDoctor.name}
                </p>
                <p className="text-sm text-gray-700">
                  Role: {selectedDoctor.role}
                </p>
                {selectedDoctor.department && (
                  <p className="text-sm text-gray-700">
                    Department: {selectedDoctor.department}
                  </p>
                )}
                {selectedDoctor.specialization && (
                  <p className="text-sm text-gray-700">
                    Specialization: {selectedDoctor.specialization}
                  </p>
                )}
                {selectedDoctor.experienceYears !== undefined &&
                  selectedDoctor.experienceYears !== null && (
                    <p className="text-sm text-gray-700">
                      Experience: {selectedDoctor.experienceYears} years
                    </p>
                  )}
                {selectedDoctor.qualifications?.length > 0 && (
                  <p className="text-sm text-gray-700">
                    Qualifications: {selectedDoctor.qualifications.join(", ")}
                  </p>
                )}
                {selectedDoctor.phone && (
                  <p className="text-sm text-gray-700">
                    Phone: {selectedDoctor.phone}
                  </p>
                )}
                {selectedDoctor.email && (
                  <p className="text-sm text-gray-700">
                    Email: {selectedDoctor.email}
                  </p>
                )}
                {selectedDoctor.bio && (
                  <p className="text-sm text-gray-700">
                    Bio: {selectedDoctor.bio}
                  </p>
                )}
                {selectedDoctor.createdAt && (
                  <p className="text-sm text-gray-700">
                    Joined:{" "}
                    {new Date(selectedDoctor.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
