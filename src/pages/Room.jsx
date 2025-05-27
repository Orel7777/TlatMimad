import React, { useEffect } from 'react'
import { Suspense } from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Loader from '../components/Loader'
import Room3d from '../components/Dor9'

const KeyboardControls = () => {
  const { camera } = useThree()
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      const speed = 0.15
      switch(event.key) {
        case 'ArrowUp':
          if (camera.position.length() > 3) {
            camera.position.multiplyScalar(0.95)
          }
          break
        case 'ArrowDown':
          if (camera.position.length() < 4) {
            camera.position.multiplyScalar(1.05)
          }
          break
        case 'ArrowLeft':
          const leftRotation = Math.atan2(camera.position.z, camera.position.x)
          if (leftRotation < 0.8) {
            camera.position.x = camera.position.x * Math.cos(0.1) - camera.position.z * Math.sin(0.1)
            camera.position.z = camera.position.x * Math.sin(0.1) + camera.position.z * Math.cos(0.1)
          }
          break
        case 'ArrowRight':
          const rightRotation = Math.atan2(camera.position.z, camera.position.x)
          if (rightRotation > -0.8) {
            camera.position.x = camera.position.x * Math.cos(-0.1) - camera.position.z * Math.sin(-0.1)
            camera.position.z = camera.position.x * Math.sin(-0.1) + camera.position.z * Math.cos(-0.1)
          }
          break
      }
      camera.lookAt(0, 0.8, 0)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [camera])

  return null
}

const Room = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
      <div className="w-full max-w-[2042px] h-[1080px] relative">
        <Canvas 
          className='w-full h-full bg-transparent' 
          camera={{
            position: [3.2, 1.5, 3.2], // זווית מותאמת לתמונה
            fov: 45, // שדה ראייה צר יותר
            near: 0.1,
            far: 1000,
            up: [0, 1, 0]
          }}
        >
            <color attach="background" args={['#0a0a0a']} />
            <fog attach="fog" args={['#0a0a0a', 6, 10]} />
            
            <Suspense fallback={<Loader />}>
                <KeyboardControls />
                <OrbitControls 
                  enableZoom={true}
                  maxPolarAngle={Math.PI / 2.1} // הגבלת זווית אנכית
                  minPolarAngle={Math.PI / 2.4}
                  maxAzimuthAngle={Math.PI / 4} // הגבלת סיבוב אופקי
                  minAzimuthAngle={-Math.PI / 4}
                  enableDamping={true}
                  dampingFactor={0.07}
                  rotateSpeed={0.4}
                  zoomSpeed={0.6}
                  minDistance={3} // מרחק מינימלי מותאם
                  maxDistance={4} // מרחק מקסימלי מותאם
                  enablePan={false}
                  target={[0, 0.8, 0]} // נקודת מבט מותאמת לשולחן
                />
                
                <ambientLight intensity={0.35} />
                <directionalLight 
                  position={[2, 2, 1]} 
                  intensity={1.2} 
                  castShadow
                />
                <pointLight 
                  position={[0, 2.5, 0]} 
                  intensity={0.8} 
                  color="#4f4f4f" 
                />
                <hemisphereLight 
                  skyColor="#4f4f4f" 
                  groundColor="#000000" 
                  intensity={0.4} 
                />
                
                <Room3d />
            </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default Room