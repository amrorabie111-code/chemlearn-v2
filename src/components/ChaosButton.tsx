import { useEffect, useRef } from 'react';

// Vertex shader - pass through UV coordinates
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment shader - converted from Metal shader
const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_tap;
  uniform float u_speed;
  uniform float u_amplitude;
  uniform float u_pulseMin;
  uniform float u_pulseMax;
  uniform float u_noiseType;

  // Hash-based noise (original)
  float hash(float n) {
    return fract(sin(n) * 753.5453123);
  }

  float noiseHash(vec2 x) {
    vec2 p = floor(x);
    vec2 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);

    float n = p.x + p.y * 157.0;
    return mix(
      mix(hash(n + 0.0), hash(n + 1.0), f.x),
      mix(hash(n + 157.0), hash(n + 158.0), f.x),
      f.y
    );
  }

  // Trigonometric noise (more periodic)
  float noiseTrig(vec2 p) {
    float x = p.x;
    float y = p.y;

    float n = sin(x * 1.0 + sin(y * 1.3)) * 0.5;
    n += sin(y * 1.0 + sin(x * 1.1)) * 0.5;
    n += sin((x + y) * 0.5) * 0.25;
    n += sin((x - y) * 0.7) * 0.25;

    return n * 0.5 + 0.5;
  }

  // Noise dispatcher
  float noise(vec2 p) {
    if (u_noiseType < 0.5) {
      return noiseHash(p);
    } else {
      return noiseTrig(p);
    }
  }

  // Fractional Brownian Motion
  float fbm(vec2 p, vec3 a) {
    float v = 0.0;
    v += noise(p * a.x) * 0.50;
    v += noise(p * a.y) * 1.50;
    v += noise(p * a.z) * 0.125 * 0.1;
    return v;
  }

  // Draw animated lines
  vec3 drawLines(vec2 uv, vec3 fbmOffset, vec3 color1, float secs) {
    float timeVal = secs * 0.1;
    vec3 finalColor = vec3(0.0);

    vec3 colorSets[4];
    colorSets[0] = vec3(0.7, 0.05, 1.0);
    colorSets[1] = vec3(1.0, 0.19, 0.0);
    colorSets[2] = vec3(0.0, 1.0, 0.3);
    colorSets[3] = vec3(0.0, 0.38, 1.0);

    // First pass - base lines
    for(int i = 0; i < 4; i++) {
      float indexAsFloat = float(i);
      float amp = u_amplitude + (indexAsFloat * 0.0);
      float period = 2.0 + (indexAsFloat + 2.0);
      float thickness = mix(0.4, 0.2, noise(uv * 2.0));

      float t = abs(1.0 / (sin(uv.y + fbm(uv + timeVal * period, fbmOffset)) * amp) * thickness);

      finalColor += t * colorSets[i];
    }

    // Second pass - secondary lines
    for(int i = 0; i < 4; i++) {
      float indexAsFloat = float(i);
      float amp = (u_amplitude * 0.5) + (indexAsFloat * 5.0);
      float period = 9.0 + (indexAsFloat + 2.0);
      float thickness = mix(0.1, 0.1, noise(uv * 12.0));

      float t = abs(1.0 / (sin(uv.y + fbm(uv + timeVal * period, fbmOffset)) * amp) * thickness);

      finalColor += t * colorSets[i] * color1;
    }

    return finalColor;
  }

  void main() {
    // Normalize coordinates matching original Metal shader
    vec2 uv = (gl_FragCoord.xy / u_resolution.x) * 1.0 - 1.0;
    uv *= 1.5;

    vec3 lineColor1 = vec3(1.0, 0.0, 0.5);
    vec3 lineColor2 = vec3(0.3, 0.5, 1.5);

    float spread = abs(u_tap);
    vec3 finalColor = vec3(0.0);

    float t = sin(u_time) * 0.5 + 0.5;
    float pulse = mix(u_pulseMin, u_pulseMax, t);

    // Combine both line passes
    finalColor = drawLines(uv, vec3(65.2, 40.0, 4.0), lineColor1, u_time * u_speed) * pulse;
    finalColor += drawLines(uv, vec3(5.0 * spread / 2.0, 2.1 * spread, 1.0), lineColor2, u_time * u_speed);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface ChaosButtonProps {
  onClick?: () => void;
  label?: string;
}

export default function ChaosButton({ onClick, label = 'ابدا' }: ChaosButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformLocationsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const animationIdRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());
  const lastTimeRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);
  const isActiveRef = useRef<boolean>(false);

  // Animated values (using refs for smooth animation without React re-renders)
  const currentSpeedRef = useRef<number>(0.35);
  const currentAmplitudeRef = useRef<number>(80);
  const currentPulseMinRef = useRef<number>(0.05);
  const currentPulseMaxRef = useRef<number>(0.2);
  const currentTapRef = useRef<number>(1.0);

  // Target values for animation
  const targetSpeedRef = useRef<number>(0.35);
  const targetAmplitudeRef = useRef<number>(80);
  const targetPulseMinRef = useRef<number>(0.05);
  const targetPulseMaxRef = useRef<number>(0.2);
  const targetTapRef = useRef<number>(1.0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const button = buttonRef.current;
    if (!canvas || !button) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true });
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    glRef.current = gl;

    // Compile shaders
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    programRef.current = program;
    gl.useProgram(program);

    // Set up geometry (fullscreen quad)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    uniformLocationsRef.current = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      tap: gl.getUniformLocation(program, 'u_tap'),
      speed: gl.getUniformLocation(program, 'u_speed'),
      amplitude: gl.getUniformLocation(program, 'u_amplitude'),
      pulseMin: gl.getUniformLocation(program, 'u_pulseMin'),
      pulseMax: gl.getUniformLocation(program, 'u_pulseMax'),
      noiseType: gl.getUniformLocation(program, 'u_noiseType'),
    };

    // Resize function
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = button.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniformLocationsRef.current.resolution, canvas.width, canvas.height);
    };
    resize();

    // Animation loop with smooth value interpolation
    const animate = () => {
      const time = (Date.now() - startTimeRef.current) / 1000;
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Smooth interpolation for values (simple lerp)
      const lerp = (current: number, target: number, factor: number) => {
        return current + (target - current) * factor;
      };

      // Interpolate values
      currentSpeedRef.current = lerp(currentSpeedRef.current, targetSpeedRef.current, isActiveRef.current ? 0.1 : 0.05);
      currentAmplitudeRef.current = lerp(currentAmplitudeRef.current, targetAmplitudeRef.current, isActiveRef.current ? 0.1 : 0.05);
      currentPulseMinRef.current = lerp(currentPulseMinRef.current, targetPulseMinRef.current, 0.1);
      currentPulseMaxRef.current = lerp(currentPulseMaxRef.current, targetPulseMaxRef.current, 0.1);
      currentTapRef.current = lerp(currentTapRef.current, targetTapRef.current, isActiveRef.current ? 0.1 : 0.05);

      // Accumulate phase smoothly
      phaseRef.current += deltaTime * currentSpeedRef.current;
      if (phaseRef.current > 1000) {
        phaseRef.current = phaseRef.current % 1000;
      }

      gl.uniform1f(uniformLocationsRef.current.time, phaseRef.current);
      gl.uniform1f(uniformLocationsRef.current.tap, currentTapRef.current);
      gl.uniform1f(uniformLocationsRef.current.speed, 1.0);
      gl.uniform1f(uniformLocationsRef.current.amplitude, currentAmplitudeRef.current);
      gl.uniform1f(uniformLocationsRef.current.pulseMin, currentPulseMinRef.current);
      gl.uniform1f(uniformLocationsRef.current.pulseMax, currentPulseMaxRef.current);
      gl.uniform1f(uniformLocationsRef.current.noiseType, 1.0); // trig noise

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Event handlers
    const handleMouseDown = () => {
      isActiveRef.current = true;
      targetSpeedRef.current = 2.8;
      targetAmplitudeRef.current = 10;
      targetPulseMinRef.current = 0.05;
      targetPulseMaxRef.current = 0.4;
      targetTapRef.current = 1.0;
    };

    const handleMouseUp = () => {
      isActiveRef.current = false;
      targetSpeedRef.current = 0.35;
      targetAmplitudeRef.current = 80;
      targetPulseMinRef.current = 0.05;
      targetPulseMaxRef.current = 0.2;
      targetTapRef.current = 1.0;
    };

    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);
    button.addEventListener('mouseleave', handleMouseUp);
    button.addEventListener('touchstart', handleMouseDown, { passive: true });
    button.addEventListener('touchend', handleMouseUp);

    window.addEventListener('resize', resize);

    return () => {
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
      button.removeEventListener('mouseleave', handleMouseUp);
      button.removeEventListener('touchstart', handleMouseDown);
      button.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="chaos-button"
      style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
        minWidth: '240px',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="chaos-canvas" 
        style={{ position: 'absolute', inset: '2px', borderRadius: 'inherit' }}
      />
      <span className="chaos-label" style={{ position: 'relative', zIndex: 2 }}>{label}</span>
    </button>
  );
}
