import mediaRequestApi from "@/apis/medias";
import { useMutation } from "@tanstack/react-query";

export const useUploadAvatarMutation = () => {
  return useMutation({
    mutationFn: mediaRequestApi.upload,
  });
};
