import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type PostsTableProps = {
  elements: {
    _id: string;
    title: string;
    description: string;
    author: string;
    state: string;
    read_count: number;
    reading_time: number;
    tags: string[];
    body: string;
    timeStamp: string;
  }[];
};

const PostsTable = ({ elements }: PostsTableProps) => {
  const pathname = usePathname();
  const rows = elements.map((element, index) => (
    <tr key={index} className=' border-b '>
      <td>
        <p className='text-[14px] font-medium'>{element.title}</p>
      </td>
      <td className='my-6 flex gap-1 '>
        {element.tags.map((tag, index) => (
          <p
            key={index}
            className='bg-primary-100/20 flex rounded-sm px-2 text-[14px] font-medium'
          >
            {tag}
          </p>
        ))}
      </td>
      <td>
        <p className='text-[14px] font-medium'>{element.state}</p>
      </td>
      <td>
        <p className='text-[14px] font-medium'>{element.author}</p>
      </td>
      <td>
        <p className='text-[14px] font-medium'>{element.read_count}</p>
      </td>
      <td>
        <p className='text-[14px] font-medium'>{element.reading_time}</p>
      </td>
      <td>
        <Link href={`${pathname}/${element._id}`}>
          <div className='my-6'>
            <p className='text-primary-100'>View Post</p>
          </div>
        </Link>
      </td>
    </tr>
  ));

  const tableHeader = [
    { list: 'Title' },
    { list: 'Tags' },
    { list: 'State' },
    { list: 'Author' },
    { list: 'Read Count' },
    { list: 'Reading Time' },
  ];
  return (
    <>
      <div className='hidden lg:block'>
        <table className='mt-8 w-full'>
          <thead className='border-b text-left'>
            <tr>
              {tableHeader.map((item, index) => (
                <th key={index} className='text-[12px] font-normal capitalize'>
                  <p>{item.list}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='space-y-10'>{rows}</tbody>
        </table>
      </div>
    </>
  );
};

export default PostsTable;
