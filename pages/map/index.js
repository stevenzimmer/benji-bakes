import { useRef, useState } from "react";
import {
    Flex,
    Box,
    HStack,
    Input,
    ButtonGroup,
    Button,
    IconButton,
    Text,
    Skeleton,
    SkeletonText,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    AutocompleteProps,
    DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 38.829012046345916, lng: -121.25028977951666 };
const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
};
export default function Map() {
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef();
    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef();

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    if (!isLoaded) {
        return <SkeletonText />;
    }
    // https://www.youtube.com/watch?v=iP3DnhCUIsE

    const calculateRoute = async () => {
        if (
            originRef.current.value === "" ||
            destinationRef.current.value === ""
        ) {
            return;
        }
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode["DRIVING"],
        });

        console.log({ results });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
    };

    const clearRoute = () => {
        setDirectionsResponse(null);
        setDistance("");
        setDuration("");
        originRef.current.value = "";
        destinationRef.current.value = "";
    };

    return (
        <Flex
            position={"relative"}
            flexDirection="column"
            alignItems={"center"}
            h="100vh"
            w="100vw"
        >
            <Box position={"absolute"} left={0} top={0} h="100%" w="100%">
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        bounds: defaultBounds,
                        componentRestrictions: { country: "us" },
                        fields: ["address_components"],
                        strictBounds: true,
                        types: ["address"],
                    }}
                    onLoad={(map) => setMap(map)}
                >
                    <Marker position={center} />
                    {directionsResponse && (
                        <DirectionsRenderer directions={directionsResponse} />
                    )}
                </GoogleMap>
            </Box>
            <Box
                p={4}
                borderRadius="lg"
                m={4}
                bgColor="white"
                shadow={"base"}
                minW="container.md"
                zIndex={100}
            >
                <HStack spacing={4}>
                    <Autocomplete>
                        <Input
                            ref={originRef}
                            type="text"
                            placeholder="Origin"
                        />
                    </Autocomplete>
                    <Autocomplete>
                        <Input
                            ref={destinationRef}
                            type="text"
                            placeholder="Destination"
                        />
                    </Autocomplete>
                    <ButtonGroup>
                        <Button
                            colorScheme={"pink"}
                            type="submit"
                            onClick={calculateRoute}
                        >
                            Calculate Route
                        </Button>
                        <IconButton
                            aria-label="Center back"
                            icon={<FaTimes />}
                            onClick={clearRoute}
                        />
                    </ButtonGroup>
                </HStack>
                <HStack spacing={4} mt={4} justifyContent="space-between">
                    <Text>Distance: {distance}</Text>
                    <Text>Duration: {duration}</Text>
                    <IconButton
                        aria-label="Center back"
                        icon={<FaLocationArrow />}
                        onClick={() => map.panTo(center)}
                    />
                </HStack>
            </Box>
        </Flex>
    );
}
