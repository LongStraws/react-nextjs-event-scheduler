import { convertFileToUrl } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  previewUrl: string;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  setPreviewUrl: Dispatch<SetStateAction<string | null>>;
};
const FileUploader = ({
  onFieldChange,
  previewUrl,
  file,
  setFile,
}: FileUploaderProps) => {
  const onDrop = (acceptedFile: File) => {
    setFile(acceptedFile);
    onFieldChange(convertFileToUrl(acceptedFile));
    console.log(previewUrl);
  };
  return (
    <>
      {previewUrl && file && (
        <div className='w-20 h-20 mt-4'>
          {file.type.startsWith("image/") ? (
            <img src={previewUrl} alt='Selected file' />
          ) : file.type.startsWith("video/") ? (
            <video src={previewUrl} controls />
          ) : null}
        </div>
      )}
      <label className='flex'>
        <svg
          className='w-10 h-10 hover:cursor-pointer transform-gpu active:scale-75 transition-all text-neutral-500'
          aria-label='Attach media'
          role='img'
          viewBox='0 0 20 20'
        >
          <title>Attach media</title>
          <path
            d='M13.9455 9.0196L8.49626 14.4688C7.16326 15.8091 5.38347 15.692 4.23357 14.5347C3.07634 13.3922 2.9738 11.6197 4.30681 10.2794L11.7995 2.78669C12.5392 2.04694 13.6745 1.85651 14.4289 2.60358C15.1833 3.3653 14.9855 4.4859 14.2458 5.22565L6.83367 12.6524C6.57732 12.9088 6.28435 12.8355 6.10124 12.6671C5.94011 12.4986 5.87419 12.1983 6.12322 11.942L11.2868 6.78571C11.6091 6.45612 11.6164 5.97272 11.3088 5.65778C10.9938 5.35749 10.5031 5.35749 10.1808 5.67975L4.99529 10.8653C4.13835 11.7296 4.1823 13.0626 4.95134 13.8316C5.77898 14.6592 7.03874 14.6446 7.903 13.7803L15.3664 6.32428C16.8678 4.81549 16.8312 2.83063 15.4909 1.4903C14.1799 0.179264 12.1584 0.106021 10.6496 1.60749L3.10564 9.16608C1.16472 11.1143 1.27458 13.9268 3.06169 15.7139C4.8488 17.4937 7.6613 17.6109 9.60955 15.6773L15.1027 10.1841C15.4103 9.87653 15.4103 9.30524 15.0881 9.00495C14.7878 8.68268 14.2677 8.70465 13.9455 9.0196Z'
            className='fill-current'
          ></path>
        </svg>

        <input
          className='bg-transparent flex-1 border-none outline-none hidden'
          name='media'
          type='file'
          accept='image/jpeg,image/png,image/jpg'
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onDrop(file);
            }
          }}
        />
      </label>
    </>
  );
};

export default FileUploader;
