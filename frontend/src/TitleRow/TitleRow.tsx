import React from "react";

const TitleRow = (props: any) => {
  return (
    <div className="w-full p-1 bg-black">
      <svg className="mx-10"
        width="152"
        height="82"
        viewBox="0 0 152 82"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect y="-28" width="152" height="139" fill="url(#pattern0)" />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0"
              transform="translate(0.0427632) scale(0.00182895 0.002)"
            />
          </pattern>
          <image
            id="image0"
            width="500"
            height="500"
            xlinkHref={props.logoSVG}
          />
        </defs>
      </svg>
    </div>
  );
};

export default TitleRow;
