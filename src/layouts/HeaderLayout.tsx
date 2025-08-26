import type { FC, ReactElement } from 'react';

const HeaderLayout: FC = (): ReactElement => {
  return (
    <div className="pt-12 text-center px-4 sm:px-0">
      <h1 className="text-yellow-500 font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl">
        MoroSystems Todo App
      </h1>
      <h2 className="text-yellow-400 mt-1 text-sm sm:text-xl md:text-2xl">
        React Developer Hiring Assignment
      </h2>
    </div>
  );
};

export default HeaderLayout;
