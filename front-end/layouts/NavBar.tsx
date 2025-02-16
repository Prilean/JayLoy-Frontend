import React from "react";
import { Icon } from "@iconify/react";

const NavBar: React.FC = () => {
  return (
    <div>
 
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2   rounded-full bottom-4 left-1/2 shadow-lg dark:bg-white  ">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray dark:hover:bg-variant group"
          >
            <Icon icon="lucide:house" width="24" height="24" />
            <span className="sr-only">Home</span>
          </button>

          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray dark:hover:bg-variant group"
          >
            <Icon icon="gg:chart" width="24" height="24" />
            <span className="sr-only">Chart</span>
          </button>

          <div className="flex items-center justify-center">
            <button
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 font-medium bg-variant rounded-full
               hover:bg-primary group focus:ring-4
                focus:ring-variant focus:outline-none dark:focus:ring-variant"
            >
              <Icon icon="gg:add" width="24" height="24" />
              <span className="sr-only">New item</span>
            </button>
          </div>

          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray dark:hover:bg-variant group"
          >
            <Icon icon="mi:document" width="24" height="24" />
            <span className="sr-only">Report</span>
          </button>

          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray dark:hover:bg-variant group"
          >
            <Icon icon="iconamoon:profile-duotone" width="24" height="24" />
            <span className="sr-only">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
