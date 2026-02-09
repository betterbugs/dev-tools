import Link from 'next/link';
import React from 'react';
import { WEB_URL } from '@/app/libs/constants';

interface TagComponentProps {
  tags: any;
}

const TagComponent: React.FC<TagComponentProps> = ({ tags }) => {
  return (
    <>
      <Link href={`${WEB_URL}/blog`} target="_blank">
        <div className="bg-white/10 hover:bg-white/15 rounded-[30px] py-2 px-6 inline text-base lg:text-base 2xl:text-xl font-base text-white/80 hover:text-white cursor-pointer mr-2">
          <label className="text-base text-white font-normal px-2 py-1 capitalize cursor-pointer">
            All topics
          </label>
        </div>
      </Link>
      <div className="bg-white/10 hover:bg-white/15 rounded-[30px] py-2 px-6 inline text-base lg:text-base 2xl:text-xl font-base text-white/80 hover:text-white cursor-pointer mr-2">
        <label className="text-base text-white font-normal px-2 py-1 capitalize cursor-pointer">
          {tags}
        </label>
      </div>
    </>
  );
};

export default TagComponent;
