import React from 'react'
import { useRouter } from 'next/router';
import SimpleBackLayout from '@/components/layouts/simpleBack/SimpleBackLayout';

export default function Smartkey() {
  const router = useRouter();
  const rentId = router.query.rentId;
  console.log(router.query.rentId)
  return (
    <main>
      <section>
      {`대여번호: ${rentId}`}
      </section>
    </main>
  
    )
    
}

Smartkey.getLayout = function getLayout(Page: React.ReactNode) {
  return <SimpleBackLayout title={`스마트키`}>{Page}</SimpleBackLayout>;
};
