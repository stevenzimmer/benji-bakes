// export const getAccessToken = () => {
//     const accessToken =
//         localStorage.getItem("accessToken") !== "undefined"
//             ? JSON.parse(localStorage.getItem("accessToken"))
//             : localStorage.clear();
//     return accessToken;
// };

export const getUser = () => {
    const localUser =
        localStorage.getItem("user") !== "undefined"
            ? JSON.parse(localStorage.getItem("user"))
            : null;
    return localUser;
};

export const getCart = () => {
    const localCart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];

    return localCart;
};

export const getAddress = () => {
    const localAddress = localStorage.getItem("address")
        ? JSON.parse(localStorage.getItem("address"))
        : {};

    return localAddress;
};
