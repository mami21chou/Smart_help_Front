import axios from "axios"

const API_URL= "http://127.0.0.1:8000";

export const createSupportTicket = async ({ description, image, audio }) => {
  const formData = new FormData();

  if (description) {
    formData.append("description", description);
  }

  if (image) {
    formData.append("image", image);
  }

  if (audio) {
    formData.append("audio", audio);
  }

  const response = await axios.post(
    `${API_URL}/support-ticket`,
    formData
  );

  return response.data;
};