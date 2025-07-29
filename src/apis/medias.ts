import http from "@/lib/http";
import { UploadImageResType } from "@/schema-validation/media-schema";

const mediaRequestApi = {
  upload: (formData: FormData) => {
    return http.post<UploadImageResType>("/media/upload", formData);
  },
};
export default mediaRequestApi;
