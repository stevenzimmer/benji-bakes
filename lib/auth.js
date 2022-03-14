// import Cookies from "universal-cookie";
// const cookies = new Cookies();
import Iron from "@hapi/iron";
const MAX_AGE = 60 * 60 * 60 * 8;

const setTokenCookie = (res, token) => {
    const cookieOptions = {
        path: "/",
        maxAge: MAX_AGE,
        httpOnly: true,
    };
    // const cookie = serialize("magic_token", token, cookieOptions);
    // const magicTokenCookie =
    // cookies.set("magic_token", token);
    // res.setHeader("Set-Cookie", cookies.set("magic_token", token));
};
export const setLoginSession = async (res, metadata) => {
    const session = {
        ...metadata,
        // createdAt: Date.now(),
        // maxAge: MAX_AGE,
    };
    const token = await Iron.seal(
        session,
        process.env.IRON_TOKEN_SECRET,
        Iron.defaults
    );
    // console.log({ cookies });
    // setTokenCookie(res, token);
    // cookies.set("magic_token", token);
    return { token };
};
