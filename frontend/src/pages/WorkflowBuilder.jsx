import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import api from '../lib/api';

const FIELD_TYPES = ['text', 'number', 'dropdown', 'checkbox', 'date'];

const WorkflowBuilder = () => {
  const [fields, setFields] = useState([]);
  const [activeTab, setActiveTab] = useState('build');
  const [workflowName, setWorkflowName] = useState('');

  const addField = (type) => {
    setFields([
      ...fields,
      {
        id: uuidv4(),
        label: `${type} field`,
        type,
        required: false,
        options: []
      }
    ]);
  };

  const removeField = (id) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id, key, value) => {
    setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  const handleSave = async () => {
    await api.post('/workflows', {
      name: workflowName,
      fields
    });
    alert('Saved!');
  };

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-xl font-bold">Workflow Builder</h1>

      {/* Tabs */}
      <div className="flex gap-2">
        <button onClick={() => setActiveTab('build')}>Build</button>
        <button onClick={() => setActiveTab('preview')}>Preview</button>
      </div>

      {/* Add Fields */}
      <div className="flex gap-2 flex-wrap">
        {FIELD_TYPES.map(type => (
          <button
            key={type}
            onClick={() => addField(type)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            {type}
          </button>
        ))}
      </div>

      {/* BUILD */}
      {activeTab === 'build' && (
        <div className="space-y-3">
          {fields.map(field => (
            <div key={field.id} className="border p-3 rounded">

              <input
                value={field.label}
                onChange={(e) =>
                  updateField(field.id, 'label', e.target.value)
                }
              />

              <label>
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    updateField(field.id, 'required', e.target.checked)
                  }
                />
                Required
              </label>

              {field.type === 'dropdown' && (
                <input
                  placeholder="Option1, Option2"
                  onChange={(e) =>
                    updateField(
                      field.id,
                      'options',
                      e.target.value.split(',')
                    )
                  }
                />
              )}

              <button onClick={() => removeField(field.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* PREVIEW */}
      {activeTab === 'preview' && (
        <div className="space-y-3">
          {fields.map(field => (
            <div key={field.id}>
              <label>
                {field.label} {field.required && '*'}
              </label>

              {field.type === 'text' && <input />}
              {field.type === 'number' && <input type="number" />}
              {field.type === 'date' && <input type="date" />}

              {field.type === 'dropdown' && (
                <select>
                  {field.options.map(opt => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              )}

              {field.type === 'checkbox' && <input type="checkbox" />}
            </div>
          ))}
        </div>
      )}

      <button onClick={handleSave} className="bg-indigo-600 text-white px-4 py-2 rounded">
        Save Workflow
      </button>

    </div>
  );
};

export default WorkflowBuilder;