(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[698],{2940:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});var a=s(5155),d=s(2115),r=s(6874),l=s.n(r);function i(){let[e,t]=(0,d.useState)({totalSales:0,totalOrders:0,pendingOrders:0,totalProducts:0}),[s,r]=(0,d.useState)(!0),[i,n]=(0,d.useState)([]);return((0,d.useEffect)(()=>{let e=setTimeout(()=>{t({totalSales:12589.99,totalOrders:42,pendingOrders:7,totalProducts:24}),n([{id:"ORD-7851",customer:"John Doe",date:"2023-10-12",amount:299.99,status:"Delivered"},{id:"ORD-7850",customer:"Jane Smith",date:"2023-10-11",amount:149.95,status:"Processing"},{id:"ORD-7849",customer:"Mike Johnson",date:"2023-10-10",amount:89.9,status:"Pending"},{id:"ORD-7848",customer:"Sarah Williams",date:"2023-10-09",amount:199.5,status:"Delivered"},{id:"ORD-7847",customer:"Alex Brown",date:"2023-10-08",amount:459.99,status:"Delivered"}]),r(!1)},1e3);return()=>clearTimeout(e)},[]),s)?(0,a.jsx)("div",{className:"flex items-center justify-center h-full",children:(0,a.jsx)("p",{className:"text-xl text-teal-800",children:"Loading dashboard data..."})}):(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{className:"text-3xl font-bold text-teal-800 mb-8",children:"Dashboard"}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",children:[(0,a.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500",children:[(0,a.jsx)("p",{className:"text-sm text-gray-500 mb-1",children:"Total Sales"}),(0,a.jsxs)("p",{className:"text-2xl font-bold text-teal-800",children:["$",e.totalSales.toFixed(2)]})]}),(0,a.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500",children:[(0,a.jsx)("p",{className:"text-sm text-gray-500 mb-1",children:"Total Orders"}),(0,a.jsx)("p",{className:"text-2xl font-bold text-teal-800",children:e.totalOrders})]}),(0,a.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500",children:[(0,a.jsx)("p",{className:"text-sm text-gray-500 mb-1",children:"Pending Orders"}),(0,a.jsx)("p",{className:"text-2xl font-bold text-teal-800",children:e.pendingOrders})]}),(0,a.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500",children:[(0,a.jsx)("p",{className:"text-sm text-gray-500 mb-1",children:"Total Products"}),(0,a.jsx)("p",{className:"text-2xl font-bold text-teal-800",children:e.totalProducts})]})]}),(0,a.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow-md",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,a.jsx)("h2",{className:"text-xl font-semibold text-teal-800",children:"Recent Orders"}),(0,a.jsx)(l(),{href:"/admin/orders",className:"text-sm text-orange-500 hover:text-orange-700",children:"View All Orders"})]}),(0,a.jsx)("div",{className:"overflow-x-auto",children:(0,a.jsxs)("table",{className:"w-full text-sm",children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{className:"bg-gray-50",children:[(0,a.jsx)("th",{className:"px-4 py-2 text-left text-gray-500 font-medium",children:"Order ID"}),(0,a.jsx)("th",{className:"px-4 py-2 text-left text-gray-500 font-medium",children:"Customer"}),(0,a.jsx)("th",{className:"px-4 py-2 text-left text-gray-500 font-medium",children:"Date"}),(0,a.jsx)("th",{className:"px-4 py-2 text-left text-gray-500 font-medium",children:"Amount"}),(0,a.jsx)("th",{className:"px-4 py-2 text-left text-gray-500 font-medium",children:"Status"}),(0,a.jsx)("th",{className:"px-4 py-2 text-right text-gray-500 font-medium",children:"Action"})]})}),(0,a.jsx)("tbody",{className:"divide-y divide-gray-100",children:i.map(e=>(0,a.jsxs)("tr",{className:"hover:bg-gray-50",children:[(0,a.jsx)("td",{className:"px-4 py-3 text-teal-800 font-medium",children:e.id}),(0,a.jsx)("td",{className:"px-4 py-3 text-gray-700",children:e.customer}),(0,a.jsx)("td",{className:"px-4 py-3 text-gray-700",children:e.date}),(0,a.jsxs)("td",{className:"px-4 py-3 text-gray-700",children:["$",e.amount.toFixed(2)]}),(0,a.jsx)("td",{className:"px-4 py-3",children:(0,a.jsx)("span",{className:"inline-block px-2 py-1 rounded-full text-xs font-medium ".concat("Delivered"===e.status?"bg-green-100 text-green-800":"Processing"===e.status?"bg-blue-100 text-blue-800":"bg-orange-100 text-orange-800"),children:e.status})}),(0,a.jsx)("td",{className:"px-4 py-3 text-right",children:(0,a.jsx)(l(),{href:"/admin/orders/".concat(e.id),className:"text-teal-600 hover:text-teal-800",children:"View"})})]},e.id))})]})})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mt-8",children:[(0,a.jsxs)(l(),{href:"/admin/products/new",className:"bg-white p-6 rounded-lg shadow-md hover:shadow-lg text-center",children:[(0,a.jsx)("div",{className:"text-orange-500 font-semibold",children:"Add New Product"}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-2",children:"Create a new product listing"})]}),(0,a.jsxs)(l(),{href:"/admin/orders?status=pending",className:"bg-white p-6 rounded-lg shadow-md hover:shadow-lg text-center",children:[(0,a.jsx)("div",{className:"text-orange-500 font-semibold",children:"Process Pending Orders"}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-2",children:"View and update order status"})]}),(0,a.jsxs)(l(),{href:"/admin/settings",className:"bg-white p-6 rounded-lg shadow-md hover:shadow-lg text-center",children:[(0,a.jsx)("div",{className:"text-orange-500 font-semibold",children:"Store Settings"}),(0,a.jsx)("p",{className:"text-sm text-gray-500 mt-2",children:"Update store configurations"})]})]})]})}},8761:(e,t,s)=>{Promise.resolve().then(s.bind(s,2940))}},e=>{var t=t=>e(e.s=t);e.O(0,[874,441,684,358],()=>t(8761)),_N_E=e.O()}]);