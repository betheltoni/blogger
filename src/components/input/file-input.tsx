import React from 'react';
import { HiOutlineDocumentArrowDown } from 'react-icons/hi2';
import { LuUserSquare } from 'react-icons/lu';

const FileInput = ({
  id,
  label,
  onChange,
  multiple,
  type,
}: {
  id: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void;
  multiple?: boolean;
  type: 'profile' | 'file';
}) => {
  return (
    <>
      {label ? (
        <p className='mb-2 text-[14px] font-medium text-[#1B1C1E99] md:text-sm lg:text-[14px]'>
          {label}
        </p>
      ) : null}
      {type === 'file' ? (
        <div className='rounded-lg border border-[#E4E7EC] bg-[#F2F4F7] px-3 py-5'>
          <label>
            <input
              type='file'
              id={id}
              className='hidden'
              accept='image/*'
              multiple={multiple}
              onChange={onChange}
            />
            <div className='flex flex-col items-center justify-center gap-4 py-2 '>
              <div className='rounded-full bg-transparent'>
                <HiOutlineDocumentArrowDown size={20} color='#026AA2' />
              </div>
              <div className='flex flex-col gap-2 text-center text-[14px] font-medium text-[#667085]'>
                <p className=' text-[#1D2939] '>
                  Click or Drag a file here to upload{' '}
                </p>
                <p>
                  Please only use the following formats: .pdf, .doc, .docx,
                  .rtf, .txt.
                </p>
                <p>Max file size: 5MBs [Max files: 1]</p>
              </div>
            </div>
          </label>
        </div>
      ) : (
        <div className='flex items-center  gap-6'>
          <div className='rounded-full border border-[#E4E7EC] bg-[#F2F4F7] p-16 '>
            <label className='flex items-start'>
              <div>
                <input
                  type='file'
                  id={id}
                  className='hidden'
                  accept='image/*'
                  multiple={multiple}
                  onChange={onChange}
                />
                <div className='rounded-full bg-transparent'>
                  <LuUserSquare size={30} color='#026AA2' />
                </div>
              </div>
            </label>
          </div>
          <div className='flex flex-col items-center justify-center gap-4 py-2 '>
            <div className='flex flex-col gap-2 text-left text-[14px] font-medium text-[#667085]'>
              <p className=' text-[#1D2939] '>
                Click or Drag a file here to upload{' '}
              </p>
              <p>Please only use the following formats: .jpg, .png, .jpeg.</p>
              <p>Max file size: 5MBs [Max files: 1]</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FileInput;
