import * as React from "react";
import { cn } from "@/lib/utils";

interface DancePageBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {}

const DancePageBackground = React.forwardRef<HTMLDivElement, DancePageBackgroundProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "fixed top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#fafafa] to-[#f5f5f5]",
          className
        )}
        {...props}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 390 760"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <g clipPath="url(#clip0_2411_6795)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M58.6119 873.657C0.122595 835.313 10.6847 747.689 -16.7725 683.367C-43.5995 620.521 -116.484 567.984 -100.199 501.62C-83.8741 435.089 7.8967 425.191 58.0334 378.51C109.541 330.552 129.157 247.31 196.136 225.707C266.857 202.898 353.44 216.824 410.03 264.983C464.58 311.406 447.545 398.235 476.075 463.937C504.182 528.666 581.925 574.924 575.116 645.163C568.252 715.961 500.849 764.694 442.918 805.968C390.18 843.542 327.327 855.908 263.554 867.141C194.553 879.294 117.206 912.07 58.6119 873.657Z"
              stroke="#E6E6E6"
              strokeWidth="2"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M77.5439 842.687C25.069 808.286 34.545 729.673 9.9112 671.964C-14.1572 615.581 -79.5467 568.446 -64.937 508.907C-50.2904 449.217 32.0437 440.337 77.0249 398.456C123.236 355.43 140.835 280.747 200.927 261.366C264.376 240.902 342.055 253.396 392.826 296.603C441.767 338.252 426.483 416.152 452.08 475.098C477.297 533.171 547.045 574.673 540.936 637.689C534.778 701.207 474.306 744.928 422.332 781.958C375.017 815.669 318.627 826.764 261.412 836.841C199.506 847.745 130.113 877.15 77.5439 842.687Z"
              stroke="#E6E6E6"
              strokeWidth="2"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.9765 904.141C-24.433 861.916 -12.8018 765.423 -43.0382 694.591C-72.5805 625.384 -152.842 567.528 -134.909 494.448C-116.932 421.183 -15.872 410.283 39.3395 358.876C96.0601 306.065 117.662 214.396 191.421 190.607C269.3 165.489 364.646 180.825 426.964 233.859C487.036 284.98 468.277 380.598 499.695 452.95C530.647 524.231 616.258 575.171 608.76 652.519C601.202 730.484 526.976 784.149 463.182 829.601C405.105 870.978 335.89 884.596 265.662 896.966C189.677 910.349 104.502 946.442 39.9765 904.141Z"
              stroke="#E6E6E6"
              strokeWidth="2"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.1304 936.607C-50.584 890.248 -37.8142 784.31 -71.0104 706.544C-103.445 630.562 -191.563 567.043 -171.875 486.809C-152.137 406.373 -41.185 394.406 19.431 337.967C81.7038 279.986 105.42 179.344 186.399 153.227C271.902 125.65 376.581 142.487 444.999 200.712C510.951 256.837 490.356 361.815 524.849 441.25C558.831 519.508 652.822 575.435 644.59 660.354C636.293 745.951 554.801 804.869 484.762 854.769C421.001 900.197 345.01 915.148 267.908 928.729C184.485 943.422 90.9716 983.048 20.1304 936.607Z"
              stroke="#E6E6E6"
              strokeWidth="2"
            />
            <ellipse
              cx="285.5"
              cy="571"
              rx="285.5"
              ry="392"
              fill="url(#paint0_radial_2411_6795)"
            />
          </g>
          <defs>
            <radialGradient
              id="paint0_radial_2411_6795"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(285.5 571) rotate(90) scale(392 285.5)"
            >
              <stop stopColor="#757575" />
              <stop offset="1" stopOpacity="0" />
            </radialGradient>
            <clipPath id="clip0_2411_6795">
              <rect width="390" height="760" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }
);

DancePageBackground.displayName = "DancePageBackground";

export { DancePageBackground };
