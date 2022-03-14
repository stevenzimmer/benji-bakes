import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase-app";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { getAccessToken, getUser, getCart } from "@/lib/local-storage";

const Context = createContext();

export const ContextProvider = ({ children }) => {
    const productsCollectionRef = collection(db, "products");

    const [products, setProducts] = useState([]);
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState({});

    const [cart, setCart] = useState([]);

    const getProducts = async () => {
        const data = await getDocs(productsCollectionRef);
        setProducts(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getProducts();
        setUser(getUser());
        setAccessToken(getAccessToken());
    }, []);

    useEffect(() => {
        setCart(
            getCart() !== null && getCart().length
                ? getCart()
                : products.map((product, i) => {
                      return {
                          quantity: 0,
                          name: product.name,
                          description: product.description,
                          amount: product.amount,
                          currency: product.currency,
                      };
                  })
        );
    }, [products]);

    return (
        <Context.Provider
            value={{
                user,
                setUser,
                accessToken,
                setAccessToken,
                cart,
                setCart,
                products,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateContext = () => useContext(Context);
