import { Metadata } from "next";
import RSAKeysClient from "./RSAKeysClient";

export const metadata: Metadata = {
  title: "RSA Key Management",
  description: "Generate and manage RSA encryption key pairs for asymmetric encryption",
};

export default function RSAKeysPage() {
  return <RSAKeysClient />;
}
