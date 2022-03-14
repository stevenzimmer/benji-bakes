import { createContext, useContext, useState, useEffect } from "react";
import { auth, db, provider } from "@/lib/firebase-app";
import {
    doc,
    getDoc,
    collection,
    getDocs,
    addDoc,
    setDoc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { getUser, getCart, getAddress } from "@/lib/local-storage";

const AuthContext = createContext({
    currentUser: null,
    cart: [],
    logout: () => Promise,
    signInWithGoogle: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const [cart, setCart] = useState([]);

    const [address, setAddress] = useState({});

    useEffect(() => {
        // getProducts();
        setCurrentUser(getUser());
        setAddress(getAddress());
        setCart(getCart());

        // const unsubscribe = onAuthStateChanged(auth, async (user) => {
        //     console.log("auth state changed", user);
        //     // if (user) {
        //     // if (user !== undefined) {
        //     //     console.log("There is a user");
        //     //     console.log({ user });
        //     //     const userRef = doc(collection(db, "users"), user?.uid);
        //     //     const user = getDocs(userRef);
        //     //     console.log("auth state changed", user);
        //     // }
        //     // const userSnap = await getDoc(userRef);
        //     // // setCurrentUser({...user, userSnap.data() });
        //     // // }
        //     // if (userSnap.exists()) {
        //     //     console.log(userSnap.data());
        //     //     setCurrentUser({ ...user, data: userSnap.data() });
        //     // } else {
        //     // }
        //     setCurrentUser(user);
        // });
        // return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        const { user } = await signInWithPopup(auth, provider);

        const { uid, email } = user;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ email, uid }),
                }
            );
            const { customerRes } = await res.json();

            const userRef = doc(collection(db, "users"), uid);

            const metaDoc = {
                stripe_customer_id: customerRes.id,
                isOnline: true,
            };

            setDoc(userRef, metaDoc, { merge: true });

            const userDoc = {
                ...user,
                ...metaDoc,
            };

            localStorage.setItem("user", JSON.stringify(userDoc));

            // window.location.reload();
            setCurrentUser(userDoc);
        } catch (err) {
            console.log({ err });
        }
    };

    const logout = async () => {
        await updateDoc(doc(db, "users", currentUser.uid), {
            isOnline: false,
        });
        await signOut(auth);
        setCurrentUser(null);
        setCart([]);
        localStorage.clear();
    };

    const value = {
        currentUser,
        logout,
        signInWithGoogle,
        cart,
        setCart,
        address,
        setAddress,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
