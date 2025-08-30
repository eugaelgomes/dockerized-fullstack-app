import React from "react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col p-4 space-y-6">
      <div className="bg-gray-300/50 p-1 rounded-sm text-center shadow-md">
        <h2 className="text-black text-2xl font-bold">Dashboard</h2>
      </div>
      <div className="bg-red-100 w-full  h-96 flex justify-center items-center shadow-lg rounded-sm">
        <iframe
          title="Relatório Power BI"
          width="100%"
          height="100%"
          src="https://app.powerbi.com/view?r=eyJrIjoiMjU0OTQ4OWQtNGZmNy00MjRhLThmMjAtN2Y3Mzk0MGRkOWYwIiwidCI6IjlkYmE0ODBjLTRmYTctNDJmNC1iYmEzLTBmYjEzNzVmYmU1ZiJ9&pageName=ReportSection"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  );
}
