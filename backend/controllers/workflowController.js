import Workflow from "../models/Workflow.js";

export const getWorkflows = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role !== "Admin") {
      filter.organizationId = req.user.organization;
    }
    const workflows = await Workflow.find(filter);
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createWorkflow = async (req, res) => {
  try {
    const workflowData = {
      ...req.body,
      organizationId: req.user.organization,
      createdBy: req.user._id
    };
    const workflow = await Workflow.create(workflowData);
    res.status(201).json(workflow);
  } catch (error) {
    res.status(400).json({ error: "Invalid workflow data" });
  }
};

export const getWorkflowById = async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    if (!workflow) return res.status(404).json({ error: "Not found" });
    
    if (req.user.role !== "Admin" && workflow.organizationId !== req.user.organization) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(workflow);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


