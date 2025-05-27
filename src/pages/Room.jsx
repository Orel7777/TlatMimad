import React from 'react'
import { Suspense } from 'react'
import {Canvas} from '@react-three/fiber'
import Loader from '../components/Loader'
import Room3d from '../components/Dor9'
const Room = () => {
  return (
    <section className='w-full h-screen relative'>
        <Canvas className='w-full h-full bg-transparent' camera={{near: 0.1, far: 1000}}>
            <Suspense fallback={<Loader />}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[0, 10, 0]} angle={Math.PI / 4} penumbra={1} intensity={1} />
                <hemisphereLight skyColor={0xffffff} groundColor={0xffffff} intensity={1} />
                <Room3d />
            </Suspense>
        </Canvas>
    </section>
    
  )
}

export default Room