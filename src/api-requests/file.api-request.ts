import { apiConfig, uploadOptions } from '@/constants';
import { ApiResponse, UploadImageResponseType } from '@/types';
import { http } from '@/utils';

const fileApiRequest = {
  image: (file: Blob) =>
    http.post<ApiResponse<UploadImageResponseType>>(apiConfig.file.upload, {
      body: {
        file: file,
        kind: uploadOptions.AVATAR
      }
    })
};

export default fileApiRequest;
