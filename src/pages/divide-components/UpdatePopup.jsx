import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProject } from "@/store/slices/projectSlice";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
// import { Modal } from "@/components/ui/modal";


const UpdatePopup = ({ isOpen, project, closePopup }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: project?.name || "",
    technologies: project?.technologies?.join(", ") || "",
    deployed: project?.deployed || false,
  });

  useEffect(() => {
    setFormData({
      name: project?.name || "",
      technologies: project?.technologies?.join(", ") || "",
      deployed: project?.deployed || false,
    });
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = () => {
    const updatedProjectData = {
      ...formData,
      technologies: formData.technologies.split(",").map((tech) => tech.trim()),
    };
    dispatch(updateProject(project._id, updatedProjectData));
    closePopup();
  };

  return (
    <Modal isOpen={isOpen} onClose={closePopup}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Update Project</h2>
        <form>
          <div className="mt-4">
            <label htmlFor="name" className="block font-medium">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="technologies" className="block font-medium">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              name="deployed"
              checked={formData.deployed}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="deployed" className="font-medium">
              Deployed
            </label>
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSubmit} className="mr-4">
              Update
            </Button>
            <Button onClick={closePopup} variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdatePopup;
