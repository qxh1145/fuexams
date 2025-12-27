import React from "react";

const FueNegativeBoxLogo = ({ size = 64, className = "", ...props }) => {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Group chung thiết lập nét đen */}
      <g stroke="black" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        
        {/* --- CHỮ U: CÁI KẸP FILE LỚN BÊN NGOÀI --- */}
        {/* Nó bao bọc lấy không gian bên trong */}
        <path d="M15 20 V60 C15 70 25 75 50 75 C75 75 85 70 85 60 V20" />

        {/* --- CHỮ F & E: CÁC XẤP GIẤY BÊN TRONG --- */}
        {/* Chữ F cách điệu (bên trái) */}
        <path d="M30 30 H45" /> {/* Nét ngang trên F */}
        <path d="M30 45 H42" /> {/* Nét ngang giữa F */}
        <path d="M30 25 V55" /> {/* Nét dọc F */}

        {/* Chữ E cách điệu (bên phải) */}
        <path d="M70 30 H55" /> {/* Nét ngang trên E */}
        <path d="M70 45 H58" /> {/* Nét ngang giữa E */}
        <path d="M70 60 H55" /> {/* Nét ngang dưới E */}
        <path d="M70 25 V60" /> {/* Nét dọc E */}
      </g>
    </svg>
  );
};

export default FueNegativeBoxLogo;