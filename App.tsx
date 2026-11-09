import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Canvas, Circle, Rect } from '@shopify/react-native-skia';
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

// Minimal native-Skia 2D test: bouncing ball + tap-to-move player.
// No WebView, no DOM — draws straight to GPU via Skia (C++ native).
// Skia 2.x: Reanimated shared values are passed straight to Canvas props.
export default function App() {
  const [score, setScore] = useState(0);
  const ballX = useSharedValue(200);
  const ballY = useSharedValue(300);
  const playerX = useSharedValue(180);

  useEffect(() => {
    ballX.value = withRepeat(withTiming(350, { duration: 1200 }), -1, true);
    ballY.value = withRepeat(withTiming(480, { duration: 900 }), -1, true);
  }, [ballX, ballY]);

  return (
    <View style={styles.container}>
      <Canvas
        style={styles.canvas}
        onTouchStart={(e) => {
          playerX.value = e.nativeEvent.locationX - 45;
          setScore((s) => s + 1);
        }}
      >
        <Rect x={0} y={0} width={400} height={800} color="#0f172a" />
        <Circle cx={ballX} cy={ballY} r={28} color="#ef4444" />
        <Rect x={playerX} y={650} width={90} height={18} color="#22c55e" />
      </Canvas>
      <Text style={styles.label}>Skia native 2D test — tap: {score}</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  canvas: { flex: 1 },
  label: { color: '#fff', textAlign: 'center', padding: 16, fontSize: 16 },
});
