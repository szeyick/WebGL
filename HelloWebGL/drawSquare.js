/**
* Draw a square with WebGL.
* 
* In this example, we have the following steps -
*
* 1. Create the vertex and index array data.
* 2. Bind the array data to their respective buffered objects.
* 3. Create the shader code (vertex and fragment) and compile. 
* 4. Create the shader program by attaching the compiled shader sources.
* 5. Associate the buffered objects to the shader program.
* 6. Clear the current canvas and enable WebGL properties.
* 7. Draw.
**/
   var canvas = document.getElementById('myWebGLCanvas');
   gl = canvas.getContext('experimental-webgl');
      
   //======================= Step 1 ==========================//
      
   // Define the square.
   var vertices = [-0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5];
   var indices = [0, 1, 2, 0, 2, 3];
         
   //======================= Step 2 ==========================//
         
   // Create a buffered object and associate the vertex array to it.
   var vertex_buffer = gl.createBuffer();

   // Use the vertex buffer we have created and set the vertices array to it.
   gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

   // Unbind the vertex buffer as we are finished using it for now.
   gl.bindBuffer(gl.ARRAY_BUFFER, null);

   // Create a buffered object and associate the index array to it.
   var index_buffer = gl.createBuffer();

   // Use the index buffer we have created and set the indices array to it.
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
         
   // Unbind the vertex buffer as we are finished using it for now.
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

   //======================= Step 3 ==========================//

   // Write the vertex shader code and compile it to make a program.
   var vertCode =
      // The vector (x,y) that contains the position data for a single vertex.
      'attribute vec2 coordinates;' +
				
      // The program main.
      'void main(void) {' +
         // Pass the position data webGL.
         ' gl_Position = vec4(coordinates, 0.0, 1.0);' +
      '}';
            
      // Create the vertex shader object, attach the source code and compile.
      var vertShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertShader, vertCode);
      gl.compileShader(vertShader);

      // Write the fragment shader code and compile it to make a program.
      var fragCode =

         // The program main.
         'void main(void) {' +
            // Set a colour to the pixel.
            ' gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' +
         '}';
            
      // Create the fragment shader object, attach the source code and compile.
      var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragShader, fragCode); 
      gl.compileShader(fragShader);

      //======================= Step 4 ==========================//
      
      // Create a shader program object and add the vertex and fragment shaders.
      var shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertShader);
      gl.attachShader(shaderProgram, fragShader);
      gl.linkProgram(shaderProgram);
      gl.useProgram(shaderProgram);

      //======================= Step 5 ==========================//

      // Associate the VBO and IBO to the shader program.
      // Bind the vertex and index buffers as the current buffers we want to work on.
      gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
         
      // Retrieve the coordinates attribute from the shader program.
      var coord = gl.getAttribLocation(shaderProgram, "coordinates");

      // Point the coordinates attribute to the currently bound VBO (vertex_buffer)
      gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0); 
         
      //======================= Step 6 ==========================//
      
      // Enable the attribute
      gl.enableVertexAttribArray(coord);

      // Draw the square.
      // Clear the canvas colour (RGBA)
      gl.clearColor(0.5, 0.5, 0.5, 0.9);

      // Enable depth test and clear the colour buffer bit.
      gl.enable(gl.DEPTH_TEST);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Set the view port.
      gl.viewport(0,0,canvas.width,canvas.height);

      //======================= Step 7 ==========================//
      
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);
