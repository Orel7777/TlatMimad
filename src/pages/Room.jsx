import React, { useEffect } from 'react'
import { Suspense } from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Loader from '../components/Loader'
import Room3d from '../components/Dor9'

const Room = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }, [])

  return (
    <section 
      className='w-[2042px] h-[1080px] relative bg-[#0a0a0a] mx-auto overflow-hidden'
      style={{
        maxWidth: '100vw',
        maxHeight: '100vh'
      }}
    >
        <Canvas 
          className='w-full h-full bg-transparent' 
          camera={{
            position: [1.99, 0.49, 0.52],
            rotation: [-0.35, 1.30, 0.33],
            fov: 50,
            near: 0.1,
            far: 1000,
            up: [0, 1, 0]
          }}
        >
            <color attach="background" args={['#0a0a0a']} />
            <fog attach="fog" args={['#0a0a0a', 5, 15]} />
            
            <Suspense fallback={<Loader />}>
                <OrbitControls 
                  enableZoom={false}
                  enableRotate={false}
                  enablePan={false}
                  target={[0, 0.3, 0]}
                />
                
                <ambientLight intensity={0.3} />
                <directionalLight position={[1, 1, 1]} intensity={1.5} castShadow />
                <pointLight position={[0, 2, 0]} intensity={1} color="#4f4f4f" />
                <hemisphereLight skyColor="#4f4f4f" groundColor="#000000" intensity={0.5} />
                
                <Room3d />
            </Suspense>
        </Canvas>
    </section>
  )
}

export default Room