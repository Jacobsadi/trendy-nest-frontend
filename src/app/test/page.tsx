// "use client";

// import { SignUpButton } from "@clerk/nextjs";
// import { useState } from "react";

// export default function RoleSelector() {
//   const [selected, setSelected] = useState<"BUYER" | "SELLER" | null>(null);

//   const handleSelect = (role: "BUYER" | "SELLER") => {
//     localStorage.setItem("selectedRole", role);
//     setSelected(role);
//   };

//   if (selected) return <SignUpButton />;

//   return (
//     <div className="flex flex-col gap-4 items-center mt-20">
//       <h2 className="text-xl">Choose your role:</h2>
//       <button onClick={() => handleSelect("BUYER")} className="btn">
//         Sign Up as Buyer
//       </button>
//       <button onClick={() => handleSelect("SELLER")} className="btn">
//         Sign Up as Seller
//       </button>
//     </div>
//   );
// }

"use client";

import { SignUpButton } from "@clerk/nextjs";

import { useState } from "react";

export default function RoleSelector() {
  const [selected, setSelected] = useState<"BUYER" | "SELLER" | null>(null);

  const handleSelect = (role: "BUYER" | "SELLER") => {
    localStorage.setItem("selectedRole", role);

    setSelected(role);
  };

  if (selected) return <SignUpButton />;

  return (
    <div className="flex flex-col gap-4 items-center mt-20">
      <h2 className="text-xl">Choose your role:</h2>{" "}
      <button onClick={() => handleSelect("BUYER")} className="btn">
        Sign Up as Buyer{" "}
      </button>{" "}
      <button onClick={() => handleSelect("SELLER")} className="btn">
        Sign Up as Seller{" "}
      </button>{" "}
    </div>
  );
}
