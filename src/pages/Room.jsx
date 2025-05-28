import React, { useEffect } from 'react'
import { Suspense } from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Loader from '../components/Loader'
import Room3d from '../components/Dor9'
import { useControls } from 'leva'

const KeyboardControls = () => {
  const { camera } = useThree()
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      const speed = 0.15
      switch(event.key) {
        case 'ArrowUp':
          if (camera.position.length() > -5) {
            camera.position.multiplyScalar(0.95)
          }
          break
        case 'ArrowDown':
          if (camera.position.length() < 5) {
            camera.position.multiplyScalar(1.05)
          }
          break
        case 'ArrowLeft':
          const leftRotation = Math.atan2(camera.position.z, camera.position.x)
          if (leftRotation < 1.2) {
            camera.position.x = camera.position.x * Math.cos(0.1) - camera.position.z * Math.sin(0.1)
            camera.position.z = camera.position.x * Math.sin(0.1) + camera.position.z * Math.cos(0.1)
          }
          break
        case 'ArrowRight':
          const rightRotation = Math.atan2(camera.position.z, camera.position.x)
          if (rightRotation > -1.2) {
            camera.position.x = camera.position.x * Math.cos(-0.1) - camera.position.z * Math.sin(-0.1)
            camera.position.z = camera.position.x * Math.sin(-0.1) + camera.position.z * Math.cos(-0.1)
          }
          break
        case 'c': // הדפסת מיקום נוכחי
          console.log('=== CURRENT CAMERA SETTINGS ===')
          console.log('Position:', [
            camera.position.x.toFixed(2), 
            camera.position.y.toFixed(2), 
            camera.position.z.toFixed(2)
          ])
          console.log('Distance:', Math.sqrt(
            camera.position.x ** 2 + 
            camera.position.y ** 2 + 
            camera.position.z ** 2
          ).toFixed(2))
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
  // const lightControls = useControls('תאורה', {
  //   ambientIntensity: { value: 0.3, min: 0, max: 2, step: 0.1, label: 'עוצמת תאורת סביבה' },
  //   directionalIntensity: { value: 1.5, min: 0, max: 3, step: 0.1, label: 'עוצמת תאורה ישירה' },
  //   pointIntensity: { value: 1.0, min: 0, max: 2, step: 0.1, label: 'עוצמת נקודת אור' },
  //   hemisphereIntensity: { value: 0.5, min: 0, max: 2, step: 0.1, label: 'עוצמת תאורת חצי כדור' },
  // });

  // const cameraControls = useControls('מצלמה', {
  //   minDistance: { value: 1.0, min: 1, max: 5, step: 0.1, label: 'מרחק מינימלי' },
  //   maxDistance: { value: 1.7, min: 1, max: 5, step: 0.1, label: 'מרחק מקסימלי' },
  //   rotateSpeed: { value: 0.3, min: 0.1, max: 1, step: 0.1, label: 'מהירות סיבוב' },
  //   zoomSpeed: { value: 0.3, min: 0.1, max: 1, step: 0.1, label: 'מהירות זום' },
  //   minAzimuthAngle: { value: 0.0, min: -Math.PI, max: Math.PI, step: 0.1, label: 'הגבלת סיבוב אופקי מינימלי' },
  //   maxAzimuthAngle: { value: -0.4, min: -Math.PI, max: Math.PI, step: 0.1, label: 'הגבלת סיבוב אופקי מקסימלי' },
  //   minPolarAngle: { value: 1.5, min: 0, max: Math.PI, step: 0.1, label: 'הגבלת סיבוב אנכי מינימלי' },
  //   maxPolarAngle: { value: 1.2, min: 0, max: Math.PI, step: 0.1, label: 'הגבלת סיבוב אנכי מקסימלי' },
  // });

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
            fov: 62,
            near: 0.1,
            far: 1000,
            up: [0, 1, 0]
          }}
        >
            <color attach="background" args={['#0a0a0a']} />
            <fog attach="fog" args={['#0a0a0a', 5, 15]} />
            
            <Suspense fallback={<Loader />}>
                <KeyboardControls />
                <OrbitControls 
                  enableZoom={true}
                  enableRotate={true}
                  enablePan={false}
                  minDistance={1.5}
                  maxDistance={1.7}
                  minAzimuthAngle={1}
                  maxAzimuthAngle={1}
                  minPolarAngle={1.5}
                  maxPolarAngle={1.5}
                  rotateSpeed={0.3}
                  zoomSpeed={0.3}
                  enableDamping={true}
                  dampingFactor={0.05}
                  target={[0, 0.3, 0]}
                />
                
                <ambientLight intensity={0.15} />
                <directionalLight position={[1, 1, 1]} intensity={0.8} castShadow />
                <pointLight position={[0, 2, 0]} intensity={0.5} color="#2a2a3f" />
                <hemisphereLight skyColor="#1a1a2a" groundColor="#000000" intensity={0.3} />
                
                <Room3d />
            </Suspense>
        </Canvas>
    </section>
  )
}

export default Room