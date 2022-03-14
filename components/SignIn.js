import { auth, db, provider } from "@/lib/firebase-app";
import { signInWithPopup } from "firebase/auth";
import {
    collection,
    getDocs,
    getDoc,
    doc,
    setDoc,
    addDoc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

import { useStateContext } from "@/context/ContextProvider";
// import { StreamChat } from "stream-chat";
// const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY);

export default function SignIn() {
    const { setUser } = useStateContext();
    const signInHandler = async () => {
        // Get users
        // const usersCollectionRef = collection(db, "users");
        // const usersDocs = await getDocs(usersCollectionRef);
        // // console.log(collectionDocs.data());
        // const users = usersDocs.docs.map((doc) => {
        //     return { ...doc.data(), id: doc.id };
        // });
        // console.log({ users });
        // Sign in Users
        try {
            const { user } = await signInWithPopup(auth, provider);

            const { uid, email, displayName, refreshToken } = user;

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

                const docRef = doc(collection(db, "users"), uid);

                setDoc(
                    docRef,
                    { email, stripe_customer_id: customerRes.id, displayName },
                    { merge: true }
                );

                const userDoc = {
                    uid,
                    email,
                    stripe_customer_id: customerRes.id,
                    displayName,
                    // chatToken,
                };
                // client.connectUser(
                //     {
                //         id: customerRes.id,
                //         name: displayName || email,
                //         email: email,
                //     },
                //     chatToken
                // );
                // localStorage.setItem("chatToken", JSON.stringify(chatToken));
                // localStorage.setItem(
                //     "accessToken",
                //     JSON.stringify(refreshToken)
                // );
                localStorage.setItem("user", JSON.stringify(userDoc));

                // window.location.reload();
                setUser(userDoc);
                // setAccessToken(refreshToken);
            } catch (err) {
                console.log({ err });
            }
        } catch (err) {
            console.log({ err });
        }
    };
    return (
        <div>
            <button onClick={signInHandler}>Sign in with google</button>
        </div>
    );
}
