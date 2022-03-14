import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
    doc,
    getDoc,
    collection,
    getDocs,
    addDoc,
    setDoc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase-app";
import { useAuth } from "@/context/AuthContext";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
    getTotal,
    decrementCart,
    incrementCart,
    itemsPrice,
} from "@/lib/helpers";
import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    VisuallyHidden,
    List,
    ListItem,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@chakra-ui/react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
// import { MdLocalShipping } from "react-icons/md";
export default function Product({ product }) {
    const { cart, setCart } = useAuth();
    console.log({ product });
    return (
        <>
            <Head>
                <title>{product.name} | Benji Bakes</title>
            </Head>
            <Container maxW={"7xl"}>
                <Breadcrumb
                    spacing="8px"
                    separator={<ChevronRightIcon color="gray.500" />}
                    py={{ base: 18, md: 6 }}
                >
                    <BreadcrumbItem>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <Link href="/products/">
                            <a>Products</a>
                        </Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <Text color="gray.500">{product.name}</Text>
                    </BreadcrumbItem>
                </Breadcrumb>
                <SimpleGrid
                    columns={{ base: 1, lg: 2 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 18, md: 6 }}
                >
                    <Flex width={`100%`}>
                        <Image
                            rounded={"xl"}
                            shadow={`2xl`}
                            alt={`${product.name} thumbnail image`}
                            src={
                                "https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080"
                            }
                            fit={"cover"}
                            align={"center"}
                            w={"100%"}
                            h={{ base: "100%", sm: "400px", lg: "500px" }}
                        />
                    </Flex>
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Box as={"header"}>
                            <Heading
                                lineHeight={1.1}
                                fontWeight={600}
                                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                            >
                                {product.name}
                            </Heading>
                            <Text
                                color={useColorModeValue(
                                    "gray.900",
                                    "gray.400"
                                )}
                                fontWeight={300}
                                fontSize={"2xl"}
                            >
                                ${product.amount} USD
                            </Text>
                        </Box>

                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={"column"}
                            divider={
                                <StackDivider
                                    borderColor={useColorModeValue(
                                        "gray.200",
                                        "gray.600"
                                    )}
                                />
                            }
                        >
                            <VStack spacing={{ base: 4, sm: 6 }}>
                                <Text
                                    color={useColorModeValue(
                                        "gray.500",
                                        "gray.400"
                                    )}
                                    fontSize={"2xl"}
                                    fontWeight={"300"}
                                >
                                    {product.description}
                                </Text>
                                {/* <Text fontSize={"lg"}>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Ad aliquid amet at
                                    delectus doloribus dolorum expedita hic,
                                    ipsum maxime modi nam officiis porro, quae,
                                    quisquam quos reprehenderit velit? Natus,
                                    totam.
                                </Text> */}
                            </VStack>
                            <div className="flex items-center">
                                <div
                                    onClick={() =>
                                        incrementCart(product, cart, setCart)
                                    }
                                >
                                    <AddIcon />
                                </div>
                                <div
                                    onClick={() =>
                                        decrementCart(product, cart, setCart)
                                    }
                                >
                                    <RemoveIcon />
                                </div>
                            </div>
                            <Box>
                                <Text
                                    fontSize={{ base: "16px", lg: "18px" }}
                                    color={useColorModeValue(
                                        "yellow.500",
                                        "yellow.300"
                                    )}
                                    fontWeight={"500"}
                                    textTransform={"uppercase"}
                                    mb={"4"}
                                >
                                    Ingredients
                                </Text>

                                <SimpleGrid
                                    columns={{ base: 1, md: 2 }}
                                    spacing={10}
                                >
                                    {/* <List spacing={2}>
                                        <ListItem>Chronograph</ListItem>
                                        <ListItem>
                                            Master Chronometer Certified
                                        </ListItem>{" "}
                                        <ListItem>Tachymeter</ListItem>
                                    </List>
                                    <List spacing={2}>
                                        <ListItem>Anti‑magnetic</ListItem>
                                        <ListItem>Chronometer</ListItem>
                                        <ListItem>Small seconds</ListItem>
                                    </List> */}
                                </SimpleGrid>
                            </Box>
                            <Box>
                                <Text
                                    fontSize={{ base: "16px", lg: "18px" }}
                                    color={useColorModeValue(
                                        "yellow.500",
                                        "yellow.300"
                                    )}
                                    fontWeight={"500"}
                                    textTransform={"uppercase"}
                                    mb={"4"}
                                >
                                    Baking instructions
                                </Text>

                                {/* <List spacing={2}>
                                    <ListItem>
                                        <Text as={"span"} fontWeight={"bold"}>
                                            Between lugs:
                                        </Text>{" "}
                                        20 mm
                                    </ListItem>
                                    <ListItem>
                                        <Text as={"span"} fontWeight={"bold"}>
                                            Bracelet:
                                        </Text>{" "}
                                        leather strap
                                    </ListItem>
                                    <ListItem>
                                        <Text as={"span"} fontWeight={"bold"}>
                                            Case:
                                        </Text>{" "}
                                        Steel
                                    </ListItem>
                                    <ListItem>
                                        <Text as={"span"} fontWeight={"bold"}>
                                            Case diameter:
                                        </Text>{" "}
                                        42 mm
                                    </ListItem>
                                    <ListItem>
                                        <Text as={"span"} fontWeight={"bold"}>
                                            Dial color:
                                        </Text>{" "}
                                        Black
                                    </ListItem>
                                    <ListItem>
                                        <Text as={"span"} fontWeight={"bold"}>
                                            Crystal:
                                        </Text>{" "}
                                        Domed, scratch‑resistant sapphire
                                        crystal with anti‑reflective treatment
                                        inside
                                    </ListItem>
                                    <ListItem>
                                        <Text as={"span"} fontWeight={"bold"}>
                                            Water resistance:
                                        </Text>{" "}
                                        5 bar (50 metres / 167 feet){" "}
                                    </ListItem> */}
                                {/* </List> */}
                            </Box>
                        </Stack>

                        <Button
                            rounded={"none"}
                            w={"full"}
                            mt={8}
                            size={"lg"}
                            py={"7"}
                            bg={useColorModeValue("gray.900", "gray.50")}
                            color={useColorModeValue("white", "gray.900")}
                            textTransform={"uppercase"}
                            _hover={{
                                transform: "translateY(2px)",
                                boxShadow: "lg",
                            }}
                        >
                            Add to cart
                        </Button>

                        {/* <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent={"center"}
                        > */}
                        {/* <MdLocalShipping /> */}
                        {/* <Text>2-3 business days delivery</Text>
                        </Stack> */}
                    </Stack>
                </SimpleGrid>
            </Container>
        </>
    );
}

export async function getServerSideProps(context) {
    console.log(context.params.id);
    // const router = useRouter();
    // console.log(context.params.id);
    // const checkoutSession = await retrieveCheckoutSession(context.params.id);
    // if (!checkoutSession) {
    //     router.push("/");
    // }
    // const id = cookies.get("customer");
    // const serverCookies = new Cookies(context.req.cookies);
    // const customerCookies = await serverCookies.get("customer");
    // console.log({ customerCookies });

    const retrieveProduct = await getDoc(
        doc(db, "products", context.params.id)
    );

    // const customer = await retrieveCustomer(customerCookies.id);
    // const paymentIntents = await retrievePaymentIntents(customerCookies.id);
    // const charges = await retrieveCharges(customerCookies.id);

    return {
        props: {
            product: { id: retrieveProduct.id, ...retrieveProduct.data() },
            // customer,
            // paymentIntents,
            // charges,
        }, // will be passed to the page component as props
    };
}
