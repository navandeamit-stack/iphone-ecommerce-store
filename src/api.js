const API_URL = import.meta.env.VITE_API_URL || "https://iphone-ecommerce-store-backend.onrender.com";

// Get all products
export const getProducts = async () => {
    const response = await fetch(`${API_URL}/api/products/`);

    if (!response.ok) {
        throw new Error("Failed to load products");
    }

    return response.json();
};

// Get a single product by ID
export const getProduct = async (productId) => {
    const response = await fetch(`${API_URL}/api/products/${productId}`);

    if (!response.ok) {
        throw new Error("Failed to load product details");
    }

    return response.json();
};

// Place order
export const placeOrder = async (order) => {
    const response = await fetch(`${API_URL}/api/orders/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    });

    if (!response.ok) {
        let message = "Order failed";
        try {
            const detail = await response.json();
            message = detail.detail || message;
        } catch {
            // Keep the fallback message if the response is not JSON.
        }
        throw new Error(message);
    }

    return response.json();
};