import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  User as UserIcon,
  ShieldCheck,
  Search
} from 'lucide-react';
import { MOCK_INCIDENTS, ORGANIZATIONS } from '../constants';
import { cn, formatDate } from '../utils/utils';

const QAView = () => {
  const [selectedReport, setSelectedReport] = useState(MOCK_INCIDENTS[0]);
  const [filterOrg, setFilterOrg] = useState('all');

  const filteredIncidents =
    filterOrg === 'all'
      ? MOCK_INCIDENTS
      : MOCK_INCIDENTS.filter(i => i.organizationId === filterOrg);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* FILTER */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-3">Filters</h3>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <select
              value={filterOrg}
              onChange={(e) => setFilterOrg(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded"
            >
              <option value="all">All Organizations</option>
              {ORGANIZATIONS.map(org => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* QUEUE */}
        <div className="bg-white p-4 rounded-xl shadow col-span-2 space-y-3">
          <h3 className="font-semibold">
            Review Queue ({filteredIncidents.length})
          </h3>

          {filteredIncidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => setSelectedReport(incident)}
              className={cn(
                "p-3 border rounded cursor-pointer",
                selectedReport?.id === incident.id
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-50"
              )}
            >
              <div className="flex justify-between">
                <span>{incident.id}</span>
                <span>{incident.transportDetails.priority}</span>
              </div>

              <p className="text-sm">
                {incident.chiefComplaint}
              </p>

              <p className="text-xs text-gray-500">
                {formatDate(incident.incidentTime)}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* DETAIL PANEL */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow">

        {!selectedReport ? (
          <p>Select a report</p>
        ) : (
          <div className="space-y-4">

            <h2 className="text-xl font-bold">
              Case: {selectedReport.id}
            </h2>

            <p>
              Patient: {selectedReport.patientId}
            </p>

            <p>
              Date: {formatDate(selectedReport.incidentTime)}
            </p>

            <p>
              Destination: {selectedReport.transportDetails.destination}
            </p>

            <p>
              Priority: {selectedReport.transportDetails.priority}
            </p>

            <div>
              <h3 className="font-semibold">Narrative</h3>
              <p className="text-sm text-gray-600">
                {selectedReport.narrative}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Interventions</h3>
              <ul className="list-disc ml-5">
                {selectedReport.treatmentAdministered.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-red-500 text-white rounded">
                Reject
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded">
                Approve
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default QAView;