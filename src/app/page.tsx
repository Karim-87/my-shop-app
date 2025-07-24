export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Shop Management (Offline)</h1>
      <p className="text-gray-600 mt-2">Manage stock, sales, and customers — even without internet!</p>
    </div>
  );
}


// import Image from "next/image";
// import Home from "./components/Home";
// import AddProduct from "./components/AddProducts";
// import SellProduct from "./components/SellProduct";
// import Customers from "./components/Customers";
// export default function Hero() {
//   return (
//     <main>

//       <Home/>
//       <AddProduct/>
//       <SellProduct/>
//       <Customers/>

//     </main>
//   )
  
// }



// // 6. utils/exportToPDF.ts
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// export const exportToPDF = (data: any[], title: string) => {
//   const doc = new jsPDF();
//   doc.text(title, 10, 10);
//   // doc.autoTable({
//   //   head: [Object.keys(data[0])],
//   //   body: data.map((item) => Object.values(item)),
//   // });
//   doc.save(`${title}.pdf`);
// };

// // 7. utils/exportToExcel.ts
// import * as XLSX from "xlsx";

// export const exportToExcel = (data: any[], fileName: string) => {
//   const worksheet = XLSX.utils.json_to_sheet(data);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//   XLSX.writeFile(workbook, `${fileName}.xlsx`);
// };

// // 📌 To use these utils:
// // import { exportToPDF } from "@/utils/exportToPDF";
// // import { exportToExcel } from "@/utils/exportToExcel";
// // Then call with your data array and title/file name.
