import { Html, Text, useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()
  return <Html center ><Text>{progress} % loaded</Text></Html>
}
