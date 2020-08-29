import axios from "axios";

const dbApi = axios.create({
  baseURL: `${process.env.BACK_URL}`
});

export const getOptions = async () => {
  const res = await dbApi.get(`/options`);
  return res;
}
