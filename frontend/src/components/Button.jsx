import React from "react";

const Button = ({ rollNumber, inputValues }) => {
  const handleClick = async () => {
    const url = `http://localhost:8080/getReport`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          rollNumber: rollNumber,
          inputValues: inputValues,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob(); 

      
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "report_card.pdf";  
      link.click();  
 
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      onClick={handleClick}
    >
      Generate Report Card
    </button>
  );
};

export default Button;
