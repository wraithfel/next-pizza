import { Container, GroupVariants, ProductImage, Title } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductModalPage(props: { params: Promise<{ id: string}>}) {
    return <h1>1212123123</h1>
}