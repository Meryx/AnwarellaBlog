import vertexShaderText from "@shaders/vertexShader.js";
import fragmentShaderText from "@shaders/fragShader.js";

var Signal;
var Query;

const Main = async () => {
  var canvas = document.getElementById("canvas");
  var gl = canvas.getContext("webgl");

  if (!gl) {
    console.log("WebGL not supported, falling back on experimental-webgl");
    gl = canvas.getContext("experimental-webgl");
  }

  if (!gl) {
    alert("Your browser does not support WebGL");
  }

  gl.clearColor(0.18, 0.188, 0.278, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //
  // Create shaders
  //
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(
      "ERROR compiling vertex shader!",
      gl.getShaderInfoLog(vertexShader)
    );
    return;
  }

  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(
      "ERROR compiling fragment shader!",
      gl.getShaderInfoLog(fragmentShader)
    );
    return;
  }

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("ERROR linking program!", gl.getProgramInfoLog(program));
    return;
  }
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error("ERROR validating program!", gl.getProgramInfoLog(program));
    return;
  }
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);

  //
  // Create buffer
  //

  //   const color = [
  //     1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  //     1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  //   ];

  //   const lineBuffer = gl.createBuffer();
  //   const colorBuffer = gl.createBuffer();
  //   gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
  //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lines), gl.STATIC_DRAW);

  //   var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");

  //   gl.vertexAttribPointer(
  //     positionAttribLocation, // Attribute location
  //     2, // Number of elements per attribute
  //     gl.FLOAT, // Type of elements
  //     gl.FALSE,
  //     0, // Size of an individual vertex
  //     0 // Offset from the beginning of a single vertex to this attribute
  //   );
  //   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
  //   var colorAttribLocation = gl.getAttribLocation(program, "vertColor");
  //   gl.vertexAttribPointer(
  //     colorAttribLocation, // Attribute location
  //     3, // Number of elements per attribute
  //     gl.FLOAT, // Type of elements
  //     gl.FALSE,
  //     0, // Size of an individual vertex
  //     0 // Offset from the beginning of a single vertex to this attribute
  //   );

  //   var triangleVertices = [
  //     // X, Y,       R, G, B
  //     -1.0, 1.0, 0.231, 0.729, 0.612, -0.34, 1.0, 0.231, 0.729, 0.612, -1.0,
  //     0.345, 0.231, 0.729, 0.612, -0.34, 1.0, 0.231, 0.729, 0.612, -0.34, 0.345,
  //     0.231, 0.729, 0.612, -1.0, 0.345, 0.231, 0.729, 0.612,
  //   ];

  //   var triangleVertexBufferObject = gl.createBuffer();
  //     gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  //     gl.bufferData(
  //       gl.ARRAY_BUFFER,
  //       new Float32Array(triangleVertices),
  //       gl.STATIC_DRAW
  //     );
  //     gl.vertexAttribPointer(
  //       positionAttribLocation, // Attribute location
  //       2, // Number of elements per attribute
  //       gl.FLOAT, // Type of elements
  //       gl.FALSE,
  //       5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
  //       0 // Offset from the beginning of a single vertex to this attribute
  //     );
  //     gl.vertexAttribPointer(
  //       colorAttribLocation, // Attribute location
  //       3, // Number of elements per attribute
  //       gl.FLOAT, // Type of elements
  //       gl.FALSE,
  //       5 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
  //       2 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
  //     );

  //   gl.enableVertexAttribArray(positionAttribLocation);
  //   gl.enableVertexAttribArray(colorAttribLocation);

  //
  // Main render loop
  //

  //   const lines = [
  //     -0.329, 1.0, -0.329, -1.0, 0.341, 1.0, 0.341, -1.0, -1.0, -0.329, 1.0,
  //     -0.329, -1.0, 0.341, 1.0, 0.341,
  //   ];
  const pxSize = 168;
  const size = 3;
  const lines = [];
  for (let i = 1; i < size; i++) {
    const x = (i / size) * 2 - 1;
    lines.push(x, -1, 0);
    lines.push(1.0, 1.0, 1.0);
    lines.push(x, 1, 0);
    lines.push(1.0, 1.0, 1.0);
  }
  for (let i = 1; i < size; i++) {
    const y = (i / size) * 2 - 1;
    lines.push(-1, y, 0);
    lines.push(1.0, 1.0, 1.0);
    lines.push(1, y, 0);
    lines.push(1.0, 1.0, 1.0);
  }

  const lineBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lines), gl.STATIC_DRAW);
  var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
  gl.vertexAttribPointer(
    positionAttribLocation, // Attribute location
    3, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 // Offset from the beginning of a single vertex to this attribute
  );
  var colorAttribLocation = gl.getAttribLocation(program, "vertColor");
  gl.vertexAttribPointer(
    colorAttribLocation, // Attribute location
    3, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
  );

  const triangleBuffers = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      triangleBuffers.push(gl.createBuffer());
    }
  }
  const triangleVertices = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffers[i * size + j]);
      let x = (i / size) * 2 - 1;
      let y = (j / size) * 2 - 1;
      const offset = 2 / (pxSize - 1);
      const step = (1 / size) * 2;

      const triangles = [];
      triangles.push(x, y, 1.0);
      triangles.push(0.231, 0.729, 0.612);
      triangles.push(x + step, y, 1.0);
      triangles.push(0.231, 0.729, 0.612);
      triangles.push(x, y + step, 1.0);
      triangles.push(0.231, 0.729, 0.612);
      triangles.push(x + step, y, 1.0);
      triangles.push(0.231, 0.729, 0.612);
      triangles.push(x, y + step, 1.0);
      triangles.push(0.231, 0.729, 0.612);
      triangles.push(x + step, y + step, 1.0);
      triangles.push(0.231, 0.729, 0.612);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(triangles),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(
        positionAttribLocation, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
      );
      gl.vertexAttribPointer(
        colorAttribLocation, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
      );
      triangleVertices.push(triangles);
    }
  }
  console.log(triangleVertices);
  //   gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
  gl.enableVertexAttribArray(positionAttribLocation);
  gl.enableVertexAttribArray(colorAttribLocation);

  //   const enabledTriangles = new Array(triangleVertices.length);

  let arrSize = triangleVertices.length; // Size of the array
  let enabledTriangles = Array.from(
    { length: arrSize },
    () => Math.random() > 0.5
  );
  //   console.log(array); // Outputs an array of size 10 with random true/false values

  const loop = () => {
    gl.clearColor(0.18, 0.188, 0.278, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
    gl.vertexAttribPointer(
      positionAttribLocation, // Attribute location
      3, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      0 // Offset from the beginning of a single vertex to this attribute
    );
    gl.vertexAttribPointer(
      colorAttribLocation, // Attribute location
      3, // Number of elements per attribute
      gl.FLOAT, // Type of elements
      gl.FALSE,
      6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
      3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );
    gl.drawArrays(gl.LINES, 0, 8);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!enabledTriangles[i * size + j]) continue;
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffers[i * size + j]);
        gl.vertexAttribPointer(
          positionAttribLocation, // Attribute location
          3, // Number of elements per attribute
          gl.FLOAT, // Type of elements
          gl.FALSE,
          6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
          0 // Offset from the beginning of a single vertex to this attribute
        );
        gl.vertexAttribPointer(
          colorAttribLocation, // Attribute location
          3, // Number of elements per attribute
          gl.FLOAT, // Type of elements
          gl.FALSE,
          6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
          3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
        );
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
    }

    requestAnimationFrame(loop);
    Signal = (x, y) => {
      if (enabledTriangles.every((x) => x)) {
        return false;
      }
      const step = 1 / size;
      const row = x / pxSize;
      let column = y / pxSize;
      let rowNo = Math.floor(row / step);

      let columnNo = Math.floor(column / step);
      columnNo = Math.max(0, size - 1 - columnNo);
      let normalized = rowNo * size + columnNo;
      console.log(rowNo, columnNo);
      enabledTriangles[normalized] = !enabledTriangles[normalized];

      let modRow = rowNo + 1;
      let modCol = columnNo;
      normalized = modRow * size + modCol;
      if (modRow > -1 && modCol > -1 && modRow < size && modCol < size)
        enabledTriangles[normalized] = !enabledTriangles[normalized];

      modRow = rowNo;
      modCol = columnNo + 1;
      normalized = modRow * size + modCol;
      if (modRow > -1 && modCol > -1 && modRow < size && modCol < size)
        enabledTriangles[normalized] = !enabledTriangles[normalized];

      modRow = rowNo - 1;
      modCol = columnNo;
      normalized = modRow * size + modCol;
      if (modRow > -1 && modCol > -1 && modRow < size && modCol < size)
        enabledTriangles[normalized] = !enabledTriangles[normalized];

      modRow = rowNo;
      modCol = columnNo - 1;
      normalized = modRow * size + modCol;
      if (modRow > -1 && modCol > -1 && modRow < size && modCol < size)
        enabledTriangles[normalized] = !enabledTriangles[normalized];
      return true;
    };

    Query = () => {
      return enabledTriangles.every((x) => x);
    };
  };
  requestAnimationFrame(loop);
};

export { Main, Signal, Query };
