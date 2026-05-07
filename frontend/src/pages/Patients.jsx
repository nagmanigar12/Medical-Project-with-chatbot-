import React, { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import api from "../lib/api";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPatients = patients.filter((p) =>
    `${p.firstName} ${p.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 grid grid-cols-12 gap-6">
      {/* LEFT PANEL */}
      <div className="col-span-5 bg-white rounded-xl shadow p-4">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-lg">Patients</h2>

          <button className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded">
            <Plus size={16} />
            New
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center bg-gray-100 rounded px-3 mb-4">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* List */}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-2">
            {filteredPatients.map((p) => (
              <div
                key={p._id}
                onClick={() => setSelectedPatient(p)}
                className="p-3 border rounded cursor-pointer hover:bg-gray-50"
              >
                <h3 className="font-medium">
                  {p.firstName} {p.lastName}
                </h3>
                <p className="text-sm text-gray-500">
                  {p.gender} • {p.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="col-span-7 bg-white rounded-xl shadow p-6">
        {!selectedPatient ? (
          <div className="text-center text-gray-400 mt-20">
            Select a patient to view details
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold mb-3">Patient Record</h3>
              <div className="grid gap-2">
                <p className="text-sm text-gray-700">
                  Name: {selectedPatient.firstName} {selectedPatient.lastName}
                </p>
                <p className="text-sm text-gray-700">
                  Status: {selectedPatient.status}
                </p>
                <p className="text-sm text-gray-700">
                  Blood Type: {selectedPatient.bloodType}
                </p>
                {selectedPatient._id && (
                  <p className="text-sm text-gray-700">
                    Patient ID: {selectedPatient._id}
                  </p>
                )}
              </div>
            </div>

            {selectedPatient.createdBy ? (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3">Assigned Doctor</h3>
                <p className="text-sm text-gray-700">
                  Name: {selectedPatient.createdBy.name}
                </p>
                {selectedPatient.createdBy.role && (
                  <p className="text-sm text-gray-700">
                    Role: {selectedPatient.createdBy.role}
                  </p>
                )}
                {selectedPatient.createdBy.organization && (
                  <p className="text-sm text-gray-700">
                    Organization: {selectedPatient.createdBy.organization}
                  </p>
                )}
                {selectedPatient.createdBy.department && (
                  <p className="text-sm text-gray-700">
                    Department: {selectedPatient.createdBy.department}
                  </p>
                )}
                {selectedPatient.createdBy.specialization && (
                  <p className="text-sm text-gray-700">
                    Specialization: {selectedPatient.createdBy.specialization}
                  </p>
                )}
                {selectedPatient.createdBy.experienceYears !== undefined &&
                  selectedPatient.createdBy.experienceYears !== null && (
                    <p className="text-sm text-gray-700">
                      Experience: {selectedPatient.createdBy.experienceYears}{" "}
                      years
                    </p>
                  )}
                {selectedPatient.createdBy.qualifications?.length > 0 && (
                  <p className="text-sm text-gray-700">
                    Qualifications:{" "}
                    {selectedPatient.createdBy.qualifications.join(", ")}
                  </p>
                )}
                {selectedPatient.createdBy.email && (
                  <p className="text-sm text-gray-700">
                    Email: {selectedPatient.createdBy.email}
                  </p>
                )}
                {selectedPatient.createdBy.phone && (
                  <p className="text-sm text-gray-700">
                    Phone: {selectedPatient.createdBy.phone}
                  </p>
                )}
                {selectedPatient.createdBy.bio && (
                  <p className="text-sm text-gray-700">
                    Bio: {selectedPatient.createdBy.bio}
                  </p>
                )}
                {selectedPatient.createdBy.createdAt && (
                  <p className="text-sm text-gray-700">
                    Joined:{" "}
                    {new Date(
                      selectedPatient.createdBy.createdAt,
                    ).toLocaleDateString()}
                  </p>
                )}
                {selectedPatient.createdBy._id && (
                  <p className="text-sm text-gray-700">
                    Doctor ID: {selectedPatient.createdBy._id}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3">Assigned Doctor</h3>
                <p className="text-sm text-gray-500">
                  No doctor assigned to this patient yet.
                </p>
              </div>
            )}

            {doctors.length > 0 && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Clinician Directory</h3>
                  <span className="text-xs text-slate-500">
                    {doctors.length} doctors
                  </span>
                </div>
                <div className="space-y-3">
                  {doctors.map((doc) => (
                    <div
                      key={doc._id}
                      className={`rounded-lg border px-3 py-2 ${
                        selectedPatient.createdBy?._id === doc._id
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-900">
                          {doc.name}
                        </p>
                        <span className="text-xs text-slate-500">
                          {doc.role}
                        </span>
                      </div>
                      {doc.specialization && (
                        <p className="text-sm text-gray-700">
                          Specialization: {doc.specialization}
                        </p>
                      )}
                      {doc.department && (
                        <p className="text-sm text-gray-700">
                          Department: {doc.department}
                        </p>
                      )}
                      {doc.experienceYears !== undefined &&
                        doc.experienceYears !== null && (
                          <p className="text-sm text-gray-700">
                            Experience: {doc.experienceYears} years
                          </p>
                        )}
                      {doc.qualifications?.length > 0 && (
                        <p className="text-sm text-gray-700">
                          Qualifications: {doc.qualifications.join(", ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BP */}
            {selectedPatient.bp && (
              <p>
                BP: {selectedPatient.bp.systolic}/{selectedPatient.bp.diastolic}
              </p>
            )}

            {/* Risk */}
            <div>
              <p>Risk Score: {selectedPatient.riskScore || 0}%</p>

              <div className="w-full bg-gray-200 h-2 rounded mt-1">
                <div
                  className="bg-indigo-500 h-2 rounded"
                  style={{
                    width: `${selectedPatient.riskScore || 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Blood Report */}
            {selectedPatient.bloodReport && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>Hb: {selectedPatient.bloodReport.hemoglobin}</div>

                <div>Glucose: {selectedPatient.bloodReport.glucose}</div>

                <div>WBC: {selectedPatient.bloodReport.whiteCellCount}</div>

                <div>Creatinine: {selectedPatient.bloodReport.creatinine}</div>
              </div>
            )}

            {/* History */}
            <div className="mt-4">
              <h3 className="font-semibold">Allergies</h3>
              <ul className="list-disc ml-5 text-sm">
                {(selectedPatient.allergies || []).map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>

              <h3 className="font-semibold mt-3">Medical History</h3>
              <ul className="list-disc ml-5 text-sm">
                {(selectedPatient.medicalHistory || []).map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
