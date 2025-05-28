import { Container, GroupVariants, ProductImage, Title } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage(props: { params: Promise<{ id: string}>}) {
    const params = await props.params;

    const {
        id
    } = params;

    const product = await prisma.product.findFirst( { where: { id: Number(id) } });

    if (!product) {
        return notFound();
    }

    return (
    <Container className="flex my-10">
        <div className='flex flex-1'>
        <ProductImage imageUrl={product.imageUrl} size={40} className="relative" />
        <div className="w-[490px] bg-[#FCFCFC] p-7">
            <Title text={product.name} size="md" className="font-extrabold mb-1" />
             
             <p className="text-gray-400 mb-8">Lorem ipsum dolor sit ferrragamo</p>

             <GroupVariants 
             selectedValue="2"
             items={[
                {  
                    name:'Маленькая',
                    value: '1'
                },
                {  
                    name:'Средняя',
                    value: '2'
                },
                {  
                    name:'Большая',
                    value: '3'
                },
             ]} />
             </div>
        </div>
    </Container>
    )
}