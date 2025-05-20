module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/context/CartContext.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CartProvider": (()=>CartProvider),
    "useCart": (()=>useCart)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// Import necessary React hooks for state management and context creation
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client'; // This directive is needed for client-side components in Next.js
;
;
// Create a Context for our shopping cart
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
function CartProvider({ children }) {
    // State to store the cart items
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // State to track the total number of items in cart
    const [cartCount, setCartCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // This effect runs once when the component mounts
    // It loads any saved cart data from the browser's localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Try to get cart data from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            // If cart data exists, convert it from JSON string to JavaScript object
            setCart(JSON.parse(savedCart));
        }
    }, []);
    // This effect runs whenever the cart changes
    // It updates localStorage and recalculates the total item count
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Save the current cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        // Calculate the total quantity of all items
        setCartCount(cart.reduce((total, item)=>total + item.quantity, 0));
    }, [
        cart
    ]);
    // Function to add a product to the cart
    const addToCart = (product)=>{
        setCart((prevCart)=>{
            // Check if the product is already in the cart
            const existingItem = prevCart.find((item)=>item.id === product.id);
            if (existingItem) {
                // If it exists, increase its quantity by 1
                return prevCart.map((item)=>item.id === product.id ? {
                        ...item,
                        quantity: item.quantity + 1
                    } : item);
            }
            // If it's a new item, add it to the cart with quantity 1
            return [
                ...prevCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    };
    // Function to remove a product from the cart
    const removeFromCart = (productId)=>{
        // Filter out the item with the matching ID
        setCart((prevCart)=>prevCart.filter((item)=>item.id !== productId));
    };
    // Function to update the quantity of a specific item
    const updateQuantity = (productId, quantity)=>{
        // If quantity is less than 1, remove the item completely
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }
        // Otherwise update the quantity of the specific item
        setCart((prevCart)=>prevCart.map((item)=>item.id === productId ? {
                    ...item,
                    quantity
                } : item));
    };
    // Function to empty the cart
    const clearCart = ()=>{
        setCart([]);
    };
    // Function to calculate the total price of all items in the cart
    const getCartTotal = ()=>{
        return cart.reduce((total, item)=>total + item.price * item.quantity, 0);
    };
    // Function to process an order - will integrate with Strapi
    const processOrder = async (orderDetails)=>{
        try {
            // Prepare the order data
            const orderData = {
                items: cart,
                total: getCartTotal(),
                ...orderDetails,
                orderDate: new Date().toISOString()
            };
            // Create a random order ID for now (this will be handled by Strapi in production)
            const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
            // Store order details in localStorage for the confirmation page
            localStorage.setItem('lastOrder', JSON.stringify({
                orderId,
                items: cart,
                total: getCartTotal(),
                shipping: orderDetails.shipping,
                paymentMethod: orderDetails.paymentMethod
            }));
            // Handle online payment if selected
            if (orderDetails.paymentMethod === 'ONLINE') {
                // This would integrate with a payment gateway
                // For Strapi, we could use the Strapi payment plugins
                // Example of payment processing - will be replaced with Strapi API call
                const paymentResponse = await fetch('/api/process-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        amount: getCartTotal(),
                        paymentDetails: orderDetails.paymentDetails
                    })
                });
                if (!paymentResponse.ok) {
                    throw new Error('Payment processing failed');
                }
            }
            // STRAPI INTEGRATION:
            // Send the order to Strapi backend
            // Replace '/api/orders' with your Strapi endpoint, e.g., 'http://localhost:1337/api/orders'
            const response = await fetch(`${("TURBOPACK compile-time value", "http://localhost:1337")}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: orderData
                })
            });
            if (!response.ok) {
                throw new Error('Failed to process order');
            }
            // Clear the cart after successful order
            clearCart();
            return {
                success: true,
                orderId
            };
        } catch (error) {
            console.error('Error processing order:', error);
            return {
                success: false,
                error: error.message
            };
        }
    };
    // Provide all cart functions and state to the application
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            cart,
            cartCount,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            processOrder
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/CartContext.js",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
function useCart() {
    // Get the context
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    // If we try to use the context outside of a CartProvider, throw an error
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    // Return the context
    return context;
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__7ce8b4d5._.js.map