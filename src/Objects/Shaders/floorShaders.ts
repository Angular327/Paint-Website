export let vertexShader = `
  varying vec2 v_UV;

  void main() {
    v_UV = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export let fragmentShader = `
  uniform vec3 color1;
  uniform vec3 color2;

  uniform vec2 u_resolution;
  uniform vec2 u_bl;
  uniform vec2 u_tr;
  varying vec2 v_UV;

  void main() {
    // Offset the uv coordinates by u_scroll

    // Calculate the distance from the center
    vec2 bl = step(u_bl, v_UV);
    vec2 tr = step(v_UV, u_tr);

    float dist = bl.x * bl.y * tr.x * tr.y;

    vec3 finalColor = mix(color1, color2, dist);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
