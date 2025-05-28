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
  const ambientLightControls = useControls('תאורת בסיס', {
    intensity: { value: 0.2, min: 0, max: 1, step: 0.1 },
    color: { value: '#8b7a5c' }
  });

  const mainWindowLightControls = useControls('אור ראשי מהחלון', {
    intensity: { value: 2, min: 0, max: 30, step: 0.5 },
    color: { value: '#fdf4e3' },
    angle: { value: Math.PI / 4, min: 0, max: Math.PI / 2, step: 0.1 },
    penumbra: { value: 0.5, min: 0, max: 1, step: 0.1 },
    distance: { value: 20, min: 0, max: 50, step: 1 },
    decay: { value: 1.5, min: 0, max: 5, step: 0.1 }
  });

  const secondaryWindowLightControls = useControls('אור משני מהחלון', {
    intensity: { value: 2, min: 0, max: 30, step: 0.5 },
    color: { value: '#fff5e6' },
    angle: { value: Math.PI / 3, min: 0, max: Math.PI / 2, step: 0.1 },
    penumbra: { value: 0.7, min: 0, max: 1, step: 0.1 },
    distance: { value: 15, min: 0, max: 50, step: 1 },
    decay: { value: 1.8, min: 0, max: 5, step: 0.1 },
    positionX: { value: 4, min: -10, max: 10, step: 0.1 },
    positionY: { value: 3, min: -10, max: 10, step: 0.1 },
    positionZ: { value: -1, min: -10, max: 10, step: 0.1 }
  });

  const diffuseLightControls = useControls('אור מפוזר מהחלון', {
    intensity: { value: 2, min: 0, max: 30, step: 0.5 },
    color: { value: '#fffaf0' },
    distance: { value: 12, min: 0, max: 50, step: 1 },
    decay: { value: 2, min: 0, max: 5, step: 0.1 }
  });

  const floorReflectionControls = useControls('אור החזרה מהרצפה', {
    intensity: { value: 4, min: 0, max: 30, step: 0.5 },
    color: { value: '#fff5e6' },
    distance: { value: 8, min: 0, max: 50, step: 1 },
    decay: { value: 2.5, min: 0, max: 5, step: 0.1 },
    positionX: { value: 2, min: -10, max: 10, step: 0.1 },
    positionY: { value: 0, min: -10, max: 10, step: 0.1 },
    positionZ: { value: 0, min: -10, max: 10, step: 0.1 }
  });

  const deskLampControls = useControls('תאורת מנורת שולחן', {
    intensity: { value: 2, min: 0, max: 30, step: 0.5 },
    color: { value: '#f7dc6f' },
    angle: { value: Math.PI / 3.5, min: 0, max: Math.PI / 2, step: 0.1 },
    penumbra: { value: 0.3, min: 0, max: 1, step: 0.1 },
    distance: { value: 8, min: 0, max: 50, step: 1 },
    decay: { value: 1.0, min: 0, max: 5, step: 0.1 }
  });

  const additionalDeskLightControls = useControls('תאורה נוספת לשולחן', {
    intensity: { value: 4.2, min: 0, max: 30, step: 0.5 },
    color: { value: '#f4d03f' },
    distance: { value: 10, min: 0, max: 50, step: 1 },
    decay: { value: 1.4, min: 0, max: 5, step: 0.1 },
    positionX: { value: 0, min: -10, max: 10, step: 0.1 },
    positionY: { value: 3.8, min: -10, max: 10, step: 0.1 },
    positionZ: { value: 2.5, min: -10, max: 10, step: 0.1 }
  });

  const computerScreenControls = useControls('אור ממסך המחשב', {
    intensity: { value: 6.8, min: 0, max: 30, step: 0.5 },
    color: { value: '#e74c3c' },
    distance: { value: 9, min: 0, max: 50, step: 1 },
    decay: { value: 1.3, min: 0, max: 5, step: 0.1 }
  });

  const computerSideLightControls = useControls('תאורה צדדית למחשב', {
    intensity: { value: 2, min: 0, max: 30, step: 0.5 },
    color: { value: '#ff6b6b' },
    angle: { value: Math.PI / 4, min: 0, max: Math.PI / 2, step: 0.1 },
    penumbra: { value: 0.2, min: 0, max: 1, step: 0.1 },
    distance: { value: 7, min: 0, max: 50, step: 1 },
    decay: { value: 1.2, min: 0, max: 5, step: 0.1 },
    positionX: { value: 0.8, min: -10, max: 10, step: 0.1 },
    positionY: { value: 3.5, min: -10, max: 10, step: 0.1 },
    positionZ: { value: 3.0, min: -10, max: 10, step: 0.1 }
  });

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
            <color attach="background" args={['#050505']} />
            <fog attach="fog" args={['#050505', 3, 10]} />
            
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
                
                {/* תאורת בסיס עדינה */}
                <ambientLight 
                  intensity={ambientLightControls.intensity} 
                  color={ambientLightControls.color} 
                />

                {/* אור ראשי מהחלון */}
                <spotLight
                  position={[4, 4, -2]}
                  angle={mainWindowLightControls.angle}
                  penumbra={mainWindowLightControls.penumbra}
                  intensity={mainWindowLightControls.intensity}
                  color={mainWindowLightControls.color}
                  distance={mainWindowLightControls.distance}
                  decay={mainWindowLightControls.decay}
                  castShadow
                />

                {/* אור משני מהחלון */}
                <spotLight
                  position={[
                    secondaryWindowLightControls.positionX,
                    secondaryWindowLightControls.positionY,
                    secondaryWindowLightControls.positionZ
                  ]}
                  angle={secondaryWindowLightControls.angle}
                  penumbra={secondaryWindowLightControls.penumbra}
                  intensity={secondaryWindowLightControls.intensity}
                  color={secondaryWindowLightControls.color}
                  distance={secondaryWindowLightControls.distance}
                  decay={secondaryWindowLightControls.decay}
                />

                {/* אור מפוזר מהחלון */}
                <pointLight
                  position={[3.5, 2, -1.5]}
                  intensity={diffuseLightControls.intensity}
                  color={diffuseLightControls.color}
                  distance={diffuseLightControls.distance}
                  decay={diffuseLightControls.decay}
                />

                {/* אור החזרה מהרצפה */}
                <pointLight
                  position={[
                    floorReflectionControls.positionX,
                    floorReflectionControls.positionY,
                    floorReflectionControls.positionZ
                  ]}
                  intensity={floorReflectionControls.intensity}
                  color={floorReflectionControls.color}
                  distance={floorReflectionControls.distance}
                  decay={floorReflectionControls.decay}
                />

                {/* תאורת מנורת שולחן */}
                <spotLight
                  position={[-1.2, 4.5, 2.2]}
                  angle={deskLampControls.angle}
                  penumbra={deskLampControls.penumbra}
                  intensity={deskLampControls.intensity}
                  color={deskLampControls.color}
                  distance={deskLampControls.distance}
                  decay={deskLampControls.decay}
                />

                {/* תאורה נוספת לשולחן */}
                <pointLight
                  position={[
                    additionalDeskLightControls.positionX,
                    additionalDeskLightControls.positionY,
                    additionalDeskLightControls.positionZ
                  ]}
                  intensity={additionalDeskLightControls.intensity}
                  color={additionalDeskLightControls.color}
                  distance={additionalDeskLightControls.distance}
                  decay={additionalDeskLightControls.decay}
                />

                {/* אור ממסך המחשב */}
                <pointLight
                  position={[0, 3, 3.2]}
                  intensity={computerScreenControls.intensity}
                  color={computerScreenControls.color}
                  distance={computerScreenControls.distance}
                  decay={computerScreenControls.decay}
                />

                {/* תאורה צדדית למחשב */}
                <spotLight
                  position={[
                    computerSideLightControls.positionX,
                    computerSideLightControls.positionY,
                    computerSideLightControls.positionZ
                  ]}
                  angle={computerSideLightControls.angle}
                  penumbra={computerSideLightControls.penumbra}
                  intensity={computerSideLightControls.intensity}
                  color={computerSideLightControls.color}
                  distance={computerSideLightControls.distance}
                  decay={computerSideLightControls.decay}
                />
                
                <Room3d />
            </Suspense>
        </Canvas>
    </section>
  )
}

export default Room