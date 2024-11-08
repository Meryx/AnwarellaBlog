import vertexShaderText from "@shaders/vertexShader.js";
import fragmentShaderText from "@shaders/fragShader.js";

var Signal;
var Query;
var Reset;
var Mode;
var pxSize;
var size;
var Solve;
var linesNo = 8;

pxSize = 300;
size = 3;

function gaussianEliminationMod2(matrix, vector) {
  const size = matrix.length;

  // Forward Elimination
  for (let col = 0; col < size; col++) {
    // Ensure the diagonal contains a 1
    if (matrix[col][col] === 0) {
      for (let row = col + 1; row < size; row++) {
        if (matrix[row][col] === 1) {
          // Swap rows in matrix
          [matrix[col], matrix[row]] = [matrix[row], matrix[col]];
          // Swap values in vector
          [vector[col], vector[row]] = [vector[row], vector[col]];
          break;
        }
      }
    }

    // Make all rows below this one 0 in current column
    for (let row = col + 1; row < size; row++) {
      if (matrix[row][col] === 1) {
        for (let k = 0; k < size; k++) {
          matrix[row][k] = (matrix[row][k] + matrix[col][k]) % 2;
        }
        vector[row] = (vector[row] + vector[col]) % 2;
      }
    }
  }

  // Backward Substitution
  for (let col = size - 1; col >= 0; col--) {
    for (let row = 0; row < col; row++) {
      if (matrix[row][col] === 1) {
        matrix[row][col] = (matrix[row][col] + matrix[col][col]) % 2;
        vector[row] = (vector[row] + vector[col]) % 2;
      }
    }
  }

  return vector;
}

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

  console.log(lines);

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

  const dotsBuffer = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      dotsBuffer.push(gl.createBuffer());
    }
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      gl.bindBuffer(gl.ARRAY_BUFFER, dotsBuffer[i * size + j]);
      const halfStep = 1 / size;
      let x = (i / size) * 2 - 1 + halfStep;
      let y = (j / size) * 2 - 1 + halfStep;
      const dots = [];
      dots.push(x, y, 2.0);
      dots.push(1, 1, 1);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dots), gl.STATIC_DRAW);
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
    }
  }

  //   gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
  gl.enableVertexAttribArray(positionAttribLocation);
  gl.enableVertexAttribArray(colorAttribLocation);

  //   const enabledTriangles = new Array(triangleVertices.length);

  let arrSize = triangleVertices.length; // Size of the array
  let enabledTriangles = Array.from(
    { length: arrSize },
    () => Math.random() > 1.0
  );

  let solveArray = Array.from({ length: arrSize }, () => false);

  const click = (rowNo, columnNo) => {
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
  };

  for (let i = 0; i < enabledTriangles.length; i++) {
    if (Math.random() > 0.5) {
      let rowNo = Math.floor(i / size);
      let columnNo = i % size;
      click(rowNo, columnNo);
    }
  }

  Reset = () => {
    enabledTriangles = Array.from(
      { length: arrSize },
      () => Math.random() > 1.0
    );
    for (let i = 0; i < enabledTriangles.length; i++) {
      if (Math.random() > 0.5) {
        let rowNo = Math.floor(i / size);
        let columnNo = i % size;
        click(rowNo, columnNo);
      }
    }
  };

  function toReverseColumnOrder(matrix) {
    let size = Math.sqrt(matrix.length);
    let newMatrix = [];

    for (let row = 0; row < size; row++) {
      for (let col = size - 1; col >= 0; col--) {
        newMatrix.push(matrix[col * size + row]);
      }
    }

    return newMatrix;
  }

  function convertReversedColumnToRowMajor(vectorizedMatrix, size) {
    let rowMajorMatrix = new Array(vectorizedMatrix.length);

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        // In the original reversed column-major matrix, index = col * size + (size - 1 - row)
        // In the new row-major matrix, index = row * size + col
        rowMajorMatrix[row * size + col] =
          vectorizedMatrix[col * size + (size - 1 - row)];
      }
    }

    return rowMajorMatrix;
  }

  Solve = () => {
    const gameMatrix = enabledTriangles.map((x) => (x ? 0 : 1));
    const movesMatrix3x3 = [
      [1, 1, 0, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1, 0, 1, 0, 0],
      [0, 1, 0, 1, 1, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 1, 0, 0, 1],
      [0, 0, 0, 1, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 0, 1, 1],
    ];

    const movesMatrix4x4 = [
      [1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
    ];

    const movesMatrix5x5 = [
      [
        1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0,
        0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0,
        0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0,
        0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0,
        0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1,
        0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        1,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0,
        0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0,
        0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1,
        0,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
        1,
      ],
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
        1,
      ],
    ];

    let movesMatrix;

    if (size === 3) {
      movesMatrix = movesMatrix3x3;
    } else if (size === 4) {
      movesMatrix = movesMatrix4x4;
    } else {
      movesMatrix = movesMatrix5x5;
    }

    const solution = gaussianEliminationMod2(
      movesMatrix,
      convertReversedColumnToRowMajor(gameMatrix, size)
    );
    solveArray = toReverseColumnOrder(solution).map((x) =>
      x === 1 ? true : false
    );
    console.log(toReverseColumnOrder(solution));
  };
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
    gl.drawArrays(gl.LINES, 0, linesNo);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!solveArray[i * size + j]) continue;
        gl.bindBuffer(gl.ARRAY_BUFFER, dotsBuffer[i * size + j]);
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
        gl.drawArrays(gl.POINTS, 0, 1);
      }
    }

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
      solveArray[normalized] = false;

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

Mode = () => {
  console.log("hellooo");
  if (size === 3) {
    size = 4;
    linesNo = 12;
    Main();
    return;
  }

  if (size === 4) {
    size = 5;
    linesNo = 16;
    Main();

    return;
  }
  if (size === 5) {
    size = 3;
    linesNo = 8;
    Main();
  }
};

export { Main, Signal, Query, Reset, Mode, Solve };
