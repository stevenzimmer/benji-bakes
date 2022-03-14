export const getQuantity = (arr) => {
    let quantity = 0;
    console.log(arr);
    if (arr !== null) {
        for (let i = 0; i < arr.length; i++) {
            // console.log(arr[i].quantity);
            quantity += arr[i].quantity;
        }
    }

    return quantity;
};
export const getTotal = (arr) => {
    let sum = 0;
    if (arr !== null) {
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i].amount * arr[i].quantity;
        }
    }

    return sum / 100;
};

export const itemsPrice = (cartItems) =>
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0);

export const incrementCart = (product, cart, setCart) => {
    const exist = cart.find((x) => x.id === product.id);

    // console.log({ exist });

    if (exist) {
        const existCartArr = cart.map((x) =>
            x.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : x
        );
        setCart(existCartArr);
        localStorage.setItem("cart", JSON.stringify(existCartArr));
    } else {
        const cartArr = [...cart, { ...product, quantity: 1 }];
        setCart(cartArr);
        localStorage.setItem("cart", JSON.stringify(cartArr));
    }
};

export const decrementCart = (product, cart, setCart) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist) {
        if (exist.quantity === 1) {
            const cartFilter = cart.filter((x) => x.id !== product.id);
            setCart(cartFilter);
            localStorage.setItem("cart", JSON.stringify(cartFilter));
        } else {
            const cartMap = cart.map((x) =>
                x.id === product.id
                    ? { ...exist, quantity: exist.quantity - 1 }
                    : x
            );
            setCart(cartMap);
            localStorage.setItem("cart", JSON.stringify(cartMap));
        }
    }
};

export const reverseGeocode = (coords) => {
    const lat = coords.latitude;
    const lng = coords.longitude;

    const url = `${geocodeJson}?key=${GmapApi}&latlng=${lat},${lng}`;
    fetch(url)
        .then((res) => res.json())
        .then((location) => {
            console.log(
                "geocode results:",
                extractAddress(location.results[0])
            );
            console.log(
                "is deliverable",
                zipCodes.includes(extractAddress(location.results[0]).zip)
            );
            setIsDeliverable(
                zipCodes.includes(extractAddress(location.results[0]).zip)
            );

            setAddress(extractAddress(location.results[0]));
        });
};

const extractAddress = (place) => {
    const address = {
        streetNumber: "",
        streetName: "",
        city: "",
        state: "",
        zip: "",
        county: "",
        country: "",
    };
    if (!Array.isArray(place?.address_components)) return address;

    place.address_components.forEach((component) => {
        const types = component.types;
        const value = component.long_name;

        if (types.includes("street_number")) {
            address.streetNumber = value;
        }

        if (types.includes("route")) {
            address.streetName = value;
        }

        if (types.includes("locality")) {
            address.city = value;
        }

        if (types.includes("administrative_area_level_1")) {
            address.state = value;
        }

        if (types.includes("administrative_area_level_2")) {
            address.county = value;
        }

        if (types.includes("postal_code")) {
            address.zip = value;
        }

        if (types.includes("country")) {
            address.country = value;
        }
    });

    return address;
};

export const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    console.log({ place });
    console.log("on change address");

    return extractAddress(place);
};
