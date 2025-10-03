import { Metadata } from "next";
import ECCKeysClient from "./ECCKeysClient";

export const metadata: Metadata = {
  title: "ECC Key Management",
  description: "Generate and manage Elliptic Curve Cryptography key pairs",
};

export default function ECCKeysPage() {
  return <ECCKeysClient />;
}
