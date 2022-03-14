import { useStateContext } from "@/context/ContextProvider";
import { StreamChat } from "stream-chat";
const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY);
export default function SignOut() {
    const { setAccessToken, setUser } = useStateContext();
    return (
        <button
            onClick={() => {
                localStorage.clear();
                setUser({});
                setAccessToken("");
                client.disconnectUser();
            }}
        >
            Sign out
        </button>
    );
}
