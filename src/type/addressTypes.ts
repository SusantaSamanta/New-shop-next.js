export type EditAddressType = {
    addressId: string;
    apiAddress: string;
    // city: string;
    // country: string;
    // state: string;
    // latitude: number;
    // longitude: number;

    house: string;
    street: string;
    landmark?: string | null;
    pincode: string;
    label: "HOME" | "WORK" | "OTHER";
}