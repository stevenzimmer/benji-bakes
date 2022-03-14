import { Avatar, AvatarBadge, AvatarGroup, Icon } from "@chakra-ui/react";

import CookieIcon from "@mui/icons-material/Cookie";
import { useAuth } from "@/context/AuthContext";

import { getQuantity } from "@/lib/helpers";

export default function Nav({}) {
    const { logout, signInWithGoogle, currentUser, cart } = useAuth();

    return (
        <nav>
            <div className="flex items-center justify-between py-12">
                <div>
                    <p>Benji Bakes</p>
                </div>

                <div className="flex items-center">
                    {currentUser && (
                        <Avatar
                            name={currentUser?.displayName}
                            // src="https://bit.ly/dan-abramov"
                        />
                    )}
                    {!currentUser && (
                        <div onClick={signInWithGoogle}>
                            Sign In with google
                        </div>
                    )}
                    {currentUser && <div onClick={logout}>Logout</div>}
                    <div className="text-blue-500">
                        <Icon as={CookieIcon} w={10} h={10} />
                    </div>

                    {getQuantity(cart)}
                </div>
            </div>
        </nav>
    );
}
