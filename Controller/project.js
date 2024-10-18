import Project from "../Models/project.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;

    // Ensure that required fields are provided
    if (!name || !description || !startDate) {
      return res
        .status(400)
        .json({ msg: "Name, description, and start date are required" });
    }

    // Get the logged-in user's ID from the request (set by authMiddleware)
    const userId = req.user.id;

    // Create a new project
    const project = new Project({
      name,
      description,
      startDate,
      endDate,
      status,
      userId, // Associate the project with the logged-in user
    });

    // Save the project to the database
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.error("Error creating project:", err.message);
    res.status(500).send("Server error");
  }
};

// Get all projects for the logged-in user
export const getProjectsByUser = async (req, res) => {
  try {
    // Get the logged-in user's ID from the request object (set by authMiddleware)
    const userId = req.user.id;

    // Fetch projects where the user is the owner
    const projects = await Project.find({ userId });

    if (!projects || projects.length === 0) {
      return res.status(404).json({ msg: "No projects found for this user" });
    }

    // Return the projects
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching user projects:", err.message);
    res.status(500).send("Server error");
  }
};

// Get a single project by its ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the project by ID and ensure it belongs to the logged-in user
    const project = await Project.findOne({ _id: id, userId });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.status(200).json(project);
  } catch (err) {
    console.error("Error fetching project:", err.message);
    res.status(500).send("Server error");
  }
};

// Update an existing project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, endDate, status } = req.body;
    const userId = req.user.id;

    // Find the project by ID and ensure it belongs to the logged-in user
    let project = await Project.findOne({ _id: id, userId });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Update the project's fields
    project.name = name || project.name;
    project.description = description || project.description;
    project.startDate = startDate || project.startDate;
    project.endDate = endDate || project.endDate;
    project.status = status || project.status;

    // Save the updated project
    await project.save();

    res.status(200).json(project);
  } catch (err) {
    console.error("Error updating project:", err.message);
    res.status(500).send("Server error");
  }
};

// Delete a project by its ID
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find the project by ID and ensure it belongs to the logged-in user
    const project = await Project.findOneAndDelete({ _id: id, userId });

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.status(200).json({ msg: "Project deleted successfully" });
  } catch (err) {
    console.error("Error deleting project:", err.message);
    res.status(500).send("Server error");
  }
};
