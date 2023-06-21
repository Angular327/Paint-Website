export let vertexShader = `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export let fragmentShader = `
    uniform vec3 color1;
    uniform vec3 color2;
    
    varying vec2 v_uv;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;

    float plot(vec2 st) {    
        return smoothstep(0.02, 0.0, abs(st.y - st.x));
    }

    void main() {
        vec2 st = gl_FragCoord.xy;
        gl_FragColor = vec4(color1, 1.0); 
    }
`;
