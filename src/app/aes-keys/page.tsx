import { Metadata } from "next";
import AESKeysClient from "./AESKeysClient";

export const metadata: Metadata = {
  title: "AES Key Management",
  description: "Generate and manage AES encryption keys for symmetric encryption",
};

export default function AESKeysPage() {
  return <AESKeysClient />;
}
